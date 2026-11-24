import { connect, type TLSSocket } from "node:tls";
import { RFQ_INBOX } from "./rfqFormOptions";

const HOST = "smtp.gmail.com";
const DEADLINE_MS = 12_000;
const LINE = "\r\n";

export type SmtpConfig = { user: string; password: string };
export type RfqAttachment = { filename: string; mediaType: string; content: Uint8Array };
export type RfqMail = {
  replyTo: string;
  reference: string;
  text: string;
  submittedAt: Date;
  attachment?: RfqAttachment;
};

export function validMailbox(mailbox: string) {
  const [local, domain, excess] = mailbox.split("@");
  return excess === undefined && !!local && !!domain && mailbox.length <= 254 && local.length <= 64 &&
    /^[A-Za-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_{|}~-]+)*$/.test(local) &&
    /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/.test(domain);
}

export function readRfqSmtpConfig(env: NodeJS.ProcessEnv): SmtpConfig | null {
  // Vercel Preview and Development may never send real enquiries.
  if (env.RFQ_EMAIL_ENABLED !== "true" || env.NODE_ENV !== "production" ||
      env.VERCEL !== "1" || env.VERCEL_ENV !== "production") return null;
  const user = env.RFQ_SMTP_USER?.trim().toLowerCase() ?? "";
  const password = env.RFQ_SMTP_APP_PASSWORD?.replace(/\s/g, "") ?? "";
  return validMailbox(user) && user.endsWith("@tinkontech.com") && /^[a-z0-9]{16}$/i.test(password)
    ? { user, password }
    : null;
}

export class RfqTransportError extends Error {
  readonly mayHaveSent: boolean;
  constructor(mayHaveSent: boolean) {
    super("SMTP submission not confirmed");
    this.mayHaveSent = mayHaveSent;
  }
}

function b64(input: Uint8Array | string) {
  const bytes = typeof input === "string" ? Buffer.from(input, "utf8") : Buffer.from(input);
  return bytes.toString("base64");
}

function wrappedB64(input: Uint8Array | string) {
  return b64(input).match(/.{1,76}/g)?.join(LINE) ?? "";
}

export function buildRfqMessage(config: SmtpConfig, mail: RfqMail) {
  if (!validMailbox(config.user) || !config.user.endsWith("@tinkontech.com") || !validMailbox(mail.replyTo) ||
      !/^TK-[a-f0-9-]{36}$/.test(mail.reference) || !Number.isFinite(mail.submittedAt.valueOf())) throw new RfqTransportError(false);
  const { attachment } = mail;
  const headers = [
    "From: TINKON website <" + config.user + ">",
    "To: " + RFQ_INBOX,
    "Reply-To: " + mail.replyTo,
    "Subject: Wholesale enquiry " + mail.reference,
    "Date: " + mail.submittedAt.toUTCString().replace("GMT", "+0000"),
    "Message-ID: <" + mail.reference.toLowerCase() + "@tinkontech.com>",
    "MIME-Version: 1.0",
  ];
  const textPart = ["Content-Type: text/plain; charset=UTF-8", "Content-Transfer-Encoding: base64", "", wrappedB64(mail.text)];
  if (!attachment) return [...headers, ...textPart, ""].join(LINE);
  if (!/^[A-Za-z0-9_.-]{1,72}$/.test(attachment.filename) ||
      !["application/pdf", "image/jpeg", "image/png"].includes(attachment.mediaType)) throw new RfqTransportError(false);
  const boundary = "tinkon-rfq-" + mail.reference.toLowerCase();
  return [...headers, 'Content-Type: multipart/mixed; boundary="' + boundary + '"', "",
    "--" + boundary, ...textPart, "--" + boundary,
    "Content-Type: " + attachment.mediaType, "Content-Transfer-Encoding: base64",
    'Content-Disposition: attachment; filename="' + attachment.filename + '"', "",
    wrappedB64(attachment.content), "--" + boundary + "--", ""].join(LINE);
}

type Reply = { code: number; lines: string[] };

/** Bound all reads (including incomplete multiline SMTP replies) and reject malformed responses. */
function replyReader(socket: TLSSocket) {
  let buffer = "";
  let current: Reply | undefined;
  let stopped = false;
  const replies: Reply[] = [];
  let waiter: { resolve: (reply: Reply) => void; reject: () => void } | undefined;
  function stop() {
    stopped = true;
    waiter?.reject();
    waiter = undefined;
  }
  socket.setEncoding("ascii");
  socket.on("data", (chunk: string) => {
    if (stopped) return;
    buffer += chunk;
    if (buffer.length > 16_384) return stop();
    let i: number;
    while ((i = buffer.indexOf(LINE)) !== -1) {
      const line = buffer.slice(0, i);
      buffer = buffer.slice(i + LINE.length);
      const match = /^([2-5]\d\d)([- ])([\x20-\x7e]*)$/.exec(line);
      if (!match || line.length > 2_048 || (current && current.code !== Number(match[1]))) return stop();
      current ??= { code: Number(match[1]), lines: [] };
      current.lines.push(match[3]);
      if (current.lines.length > 32) return stop();
      if (match[2] === " ") {
        if (waiter) {
          const { resolve } = waiter;
          waiter = undefined;
          resolve(current);
        } else {
          replies.push(current);
          if (replies.length > 2) return stop();
        }
        current = undefined;
      }
    }
  });
  socket.on("end", stop);
  socket.on("close", stop);
  socket.on("error", stop);
  return () => new Promise<Reply>((resolve, reject) => {
    if (stopped || waiter) reject(new Error("SMTP connection ended"));
    else if (replies.length) resolve(replies.shift()!);
    else waiter = { resolve, reject: () => reject(new Error("SMTP connection ended")) };
  });
}

/** Resolve only after the configured SMTP server accepts the DATA transaction; this is not inbox delivery. */
export async function sendRfqMail(config: SmtpConfig, mail: RfqMail, dial: typeof connect = connect) {
  const message = buildRfqMessage(config, mail);
  let dataStarted = false;
  let socket: TLSSocket | undefined;
  let deadline: ReturnType<typeof setTimeout> | undefined;
  try {
    socket = dial({ host: HOST, port: 465, servername: HOST, rejectUnauthorized: true, minVersion: "TLSv1.2" });
    const next = replyReader(socket);
    deadline = setTimeout(() => socket?.destroy(new Error("SMTP deadline expired")), DEADLINE_MS);
    const expect = async (codes: number[]) => {
      const reply = await next();
      if (!codes.includes(reply.code)) {
        // A negative final DATA reply explicitly rejected receipt.
        if (dataStarted && reply.code >= 400) dataStarted = false;
        throw new Error("SMTP command rejected");
      }
      return reply;
    };
    const command = async (line: string, ...codes: number[]) => {
      socket!.write(line + LINE);
      return expect(codes);
    };
    await expect([220]);
    const ehlo = await command("EHLO tinkontech.com", 250);
    if (!ehlo.lines.some((line) => /^AUTH(?:\s|=).*\bPLAIN\b/i.test(line))) throw new Error("SMTP AUTH mechanism unavailable");
    await command("AUTH PLAIN " + b64("\0" + config.user + "\0" + config.password), 235);
    await command("MAIL FROM:<" + config.user + ">", 250);
    await command("RCPT TO:<" + RFQ_INBOX + ">", 250, 251);
    await command("DATA", 354);
    dataStarted = true;
    await command(message.replace(/(^|\r\n)\./g, "$1..") + ".", 250);
    socket.end("QUIT" + LINE);
  } catch {
    throw new RfqTransportError(dataStarted);
  } finally {
    clearTimeout(deadline);
    socket?.destroy();
  }
}
