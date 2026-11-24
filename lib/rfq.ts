import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";
import { RFQ_ATTACHMENT_BYTES, RFQ_BUYER_TYPES, type RfqSelection } from "./rfqFormOptions";
import { RfqTransportError, validMailbox, type RfqAttachment, type RfqMail, type SmtpConfig } from "./rfqMail";

const SITE = "https://tinkontech.com";
const MAX_REQUEST = RFQ_ATTACHMENT_BYTES + 65_536;
const TOKEN_LIFETIME = 2 * 60 * 60_000;
const RATE_WINDOW = 10 * 60_000;
const MAX_CACHE = 1_000;
const UNAVAILABLE = "Online submission is unavailable. Please contact us by email.";
const UNKNOWN_CONTEXT = "The selected product or category was not found. Please open the general enquiry form or contact us by email.";
const UNCERTAIN = "We could not confirm submission. Please email us with the reference before sending the enquiry again.";

type Source = { label: string; path: string; sku?: string };
type Dependencies = {
  lookup: (selection: RfqSelection) => Source | null;
  credentials: () => SmtpConfig | null;
  dispatch: (config: SmtpConfig, message: RfqMail) => Promise<void>;
  onVercel?: boolean;
  now?: () => number;
};

class InvalidForm extends Error {
  readonly status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function json(status: number, body: { [key: string]: string | boolean }, retryAfter?: number) {
  const headers: Record<string, string> = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  if (retryAfter) headers["Retry-After"] = String(retryAfter);
  return Response.json(body, { status, headers });
}

function siteOrigin(request: Request, post: boolean) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if ((post && !origin) || (fetchSite && fetchSite !== "same-origin")) return null;
  const address = new URL(request.url);
  // A local or preview GET can display a checked context, but it cannot issue a live token.
  if (post && address.origin !== SITE) return null;
  return !origin || origin === address.origin ? address.origin : null;
}

function scalar(input: URLSearchParams | FormData, key: string) {
  const values = input.getAll(key);
  if (values.length > 1 || (values.length === 1 && typeof values[0] !== "string")) {
    throw new InvalidForm("Please check the form fields and try again.");
  }
  return typeof values[0] === "string" ? values[0] : "";
}

function selectionOf(input: URLSearchParams | FormData): RfqSelection {
  const product = scalar(input, "product");
  const category = scalar(input, "category");
  if ((product && category) || [product, category].some((slug) => slug && !/^[a-z0-9][a-z0-9-]{0,119}$/.test(slug))) {
    throw new InvalidForm(UNKNOWN_CONTEXT);
  }
  return { productSlug: product || undefined, categorySlug: category || undefined };
}

function fingerprint(config: SmtpConfig, purpose: string, input: string) {
  return createHmac("sha256", config.password).update(["tinkontechnology:rfq:v1", purpose, input].join("\0")).digest("base64url");
}

function tokenMac(config: SmtpConfig, origin: string, source: Source, data: string) {
  return fingerprint(config, "form-token", [origin, source.path, data].join("\0"));
}

function verifyToken(token: string, config: SmtpConfig, origin: string, source: Source, now: number) {
  const match = /^(\d{13})\.([a-f0-9-]{36})\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (!match) return null;
  const issued = Number(match[1]);
  const age = now - issued;
  const expected = tokenMac(config, origin, source, match[1] + "." + match[2]);
  if (!timingSafeEqual(Buffer.from(match[3]), Buffer.from(expected)) || age < 0 || age > TOKEN_LIFETIME) return null;
  return "TK-" + match[2];
}

async function getMultipart(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  if (type.length > 300 || !/^multipart\/form-data\s*;/i.test(type)) throw new InvalidForm("Use the enquiry form to submit your request.", 415);
  const size = request.headers.get("content-length");
  if (size !== null && (!/^\d+$/.test(size) || Number(size) > MAX_REQUEST)) {
    throw new InvalidForm("The enquiry is too large. Please use an attachment no larger than 3 MB.", 413);
  }
  const reader = request.body?.getReader();
  if (!reader) throw new InvalidForm("No enquiry was received.");
  let total = 0;
  const chunks: Uint8Array[] = [];
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_REQUEST) {
        void reader.cancel().catch(() => {});
        throw new InvalidForm("The enquiry is too large. Please use an attachment no larger than 3 MB.", 413);
      }
      chunks.push(value);
    }
    const body = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return await new Response(body, { headers: { "Content-Type": type } }).formData();
  } catch (error) {
    if (error instanceof InvalidForm) throw error;
    throw new InvalidForm("The enquiry could not be read. Please check the details and try again.");
  } finally {
    reader.releaseLock();
  }
}

function field(form: FormData, key: string, label: string, maximum: number, required = false, multiline = false) {
  const value = scalar(form, key).replace(/\r\n?/g, "\n").trim();
  if (required && !value) throw new InvalidForm("Please enter " + label + ".");
  if (value.length > maximum || /[\x00-\x08\x0b-\x1f\x7f]/.test(value) || (!multiline && /[\t\n]/.test(value))) {
    throw new InvalidForm("Please check " + label + ".");
  }
  return value;
}

async function getAttachment(form: FormData): Promise<RfqAttachment | undefined> {
  const entries = form.getAll("attachment");
  if (!entries.length) return undefined;
  const attachment = entries[0];
  if (entries.length !== 1 || typeof attachment === "string") throw new InvalidForm("Please attach only one file.");
  if (!attachment.size && !attachment.name) return undefined;
  if (attachment.size > RFQ_ATTACHMENT_BYTES) throw new InvalidForm("Please attach a file no larger than 3 MB.", 413);
  if (!attachment.size) throw new InvalidForm("The attachment is empty.");
  const ext = attachment.name.split(".").pop()?.toLowerCase();
  const mediaType = ext === "pdf" ? "application/pdf" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : ext === "png" ? "image/png" : "";
  const typeError = "Please attach a valid PDF, JPG or PNG file.";
  if (!mediaType || (attachment.type && attachment.type !== "application/octet-stream" && attachment.type !== mediaType)) {
    throw new InvalidForm(typeError, 415);
  }
  const content = Buffer.from(await attachment.arrayBuffer());
  const valid = mediaType === "application/pdf"
    ? /^%PDF-[12]\.[0-9]/.test(content.subarray(0, 8).toString("ascii")) &&
      /%%EOF[\r\n\t ]*$/.test(content.subarray(-1_024).toString("ascii"))
    : mediaType === "image/png"
      ? content.length > 32 && content.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex")) &&
        content.subarray(-12).equals(Buffer.from("0000000049454e44ae426082", "hex"))
      : content.length > 5 && content.subarray(0, 3).equals(Buffer.from("ffd8ff", "hex")) &&
        content.subarray(-2).equals(Buffer.from("ffd9", "hex"));
  if (!valid) throw new InvalidForm(typeError, 415);
  const basename = attachment.name.slice(0, attachment.name.lastIndexOf(".")).normalize("NFKD")
    .replace(/[^A-Za-z0-9_-]/g, "-").replace(/^-+|-+$/g, "").slice(0, 55);
  return { filename: (basename || "enquiry-attachment") + "." + ext, mediaType, content };
}

export function createRfqHandler(deps: Dependencies) {
  const now = deps.now ?? Date.now;
  // Best-effort only: the map limits bursts and retries within a warm instance, not across deployments/regions.
  const limits = new Map<string, { count: number; expires: number }>();
  const transactions = new Map<string, { state: "sending" | "sent" | "unknown"; expires: number }>();
  const general: Source = { label: "", path: "/" };

  function getSource(selection: RfqSelection) {
    const source = selection.productSlug || selection.categorySlug ? deps.lookup(selection) : general;
    if (!source) throw new InvalidForm(UNKNOWN_CONTEXT, 404);
    return source;
  }

  function consume(key: string, ceiling: number, time: number) {
    const limit = limits.get(key);
    if (limit && limit.expires > time) {
      if (limit.count >= ceiling) return false;
      limit.count++;
      return true;
    }
    if (limits.size >= MAX_CACHE) limits.delete(limits.keys().next().value!);
    limits.set(key, { count: 1, expires: time + RATE_WINDOW });
    return true;
  }

  function inputError(error: unknown) {
    return error instanceof InvalidForm
      ? json(error.status, { message: error.message })
      : json(400, { message: "Please check your enquiry and try again." });
  }

  return {
    async get(request: Request) {
      const origin = siteOrigin(request, false);
      if (!origin) return json(403, { message: UNAVAILABLE });
      try {
        const source = getSource(selectionOf(new URL(request.url).searchParams));
        const config = origin === SITE ? deps.credentials() : null;
        if (!config) return json(200, { available: false, context: source.label });
        const time = now();
        const id = randomUUID();
        const assertion = String(time) + "." + id;
        return json(200, { token: assertion + "." + tokenMac(config, origin, source, assertion), reference: "TK-" + id, context: source.label });
      } catch (error) {
        return inputError(error);
      }
    },
    async post(request: Request) {
      const origin = siteOrigin(request, true);
      if (!origin) return json(403, { message: "Please submit the enquiry directly from tinkontech.com." });
      const config = deps.credentials();
      if (!config) return json(503, { message: UNAVAILABLE });
      try {
        const time = now();
        const ip = deps.onVercel ? request.headers.get("x-vercel-forwarded-for")?.trim() : undefined;
        if (ip && isIP(ip) && !consume(fingerprint(config, "ip", ip), 20, time)) {
          return json(429, { message: "Too many attempts. Please wait a few minutes or contact us by email." }, 600);
        }
        const form = await getMultipart(request);
        if (scalar(form, "website")) throw new InvalidForm("The enquiry could not be submitted.");
        const source = getSource(selectionOf(form));
        const reference = verifyToken(scalar(form, "token"), config, origin, source, time);
        if (!reference) throw new InvalidForm("Your form session is invalid or expired. Copy your details, then reload this page.");
        const prior = transactions.get(reference);
        if (prior && prior.expires > time) {
          if (prior.state === "sent") return json(200, { reference });
          return json(409, { reference, message: UNCERTAIN, retrySafe: false });
        }
        const replyTo = field(form, "email", "your business email", 254, true);
        if (!validMailbox(replyTo)) throw new InvalidForm("Please enter a valid business email address.");
        const name = field(form, "name", "your full name", 100, true);
        const company = field(form, "company", "your company name", 120, true);
        const market = field(form, "market", "your destination market", 100, true);
        const buyerType = field(form, "buyerType", "your buyer type", 40);
        if (buyerType && !(RFQ_BUYER_TYPES as readonly string[]).includes(buyerType)) throw new InvalidForm("Please choose a valid buyer type.");
        const quantity = field(form, "quantity", "the estimated quantity", 80);
        const details = field(form, "details", "your enquiry details", 3_500, true, true);
        const attachment = await getAttachment(form);
        const transaction = transactions.get(reference);
        if (transaction && transaction.expires > time) {
          if (transaction.state === "sent") return json(200, { reference });
          return json(409, { reference, message: UNCERTAIN, retrySafe: false });
        }
        if (!consume(fingerprint(config, "email", replyTo.toLowerCase()), 4, time)) {
          return json(429, { message: "Too many attempts for this email. Please wait a few minutes or contact us by email." }, 600);
        }
        if (transactions.size >= MAX_CACHE) {
          for (const [id, prior] of transactions) if (prior.expires <= time) transactions.delete(id);
          if (transactions.size >= MAX_CACHE) return json(429, { message: "Online submission is busy. Please try again later or contact us by email." }, 600);
        }
        const record = { state: "sending" as "sending" | "sent" | "unknown", expires: time + TOKEN_LIFETIME };
        transactions.set(reference, record);
        const text = [
          "Wholesale enquiry", "Reference: " + reference, "Submitted (UTC): " + new Date(time).toISOString(),
          "Source: " + SITE + source.path, ...(source.label ? ["Interested in: " + source.label] : []),
          ...(source.sku ? ["SKU: " + source.sku] : []), "",
          "Name: " + name, "Company: " + company, "Business email: " + replyTo, "Destination market: " + market,
          ...(buyerType ? ["Buyer type: " + buyerType] : []), ...(quantity ? ["Estimated quantity: " + quantity] : []),
          "", "Enquiry details:", details,
        ].join("\n");
        try {
          await deps.dispatch(config, { replyTo, reference, text, submittedAt: new Date(time), attachment });
          record.state = "sent";
          return json(200, { reference });
        } catch (error) {
          if (!(error instanceof RfqTransportError) || error.mayHaveSent) {
            record.state = "unknown";
            return json(502, { reference, message: UNCERTAIN, retrySafe: false });
          }
          transactions.delete(reference);
          return json(502, { reference, message: "The enquiry could not be submitted. Please try again or contact us by email.", retrySafe: true });
        }
      } catch (error) {
        return inputError(error);
      }
    },
  };
}
