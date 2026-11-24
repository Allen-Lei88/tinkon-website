import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { registerHooks } from "node:module";
import test from "node:test";

// Node's test runner strips TypeScript types; this hook mirrors Next's extensionless local imports.
registerHooks({
  resolve(specifier, context, next) {
    if (/^\.\/rfq[A-Za-z]*$/.test(specifier)) return next(specifier + ".ts", context);
    return next(specifier, context);
  },
});

const { createRfqHandler } = await import("../lib/rfq.ts");
const { RfqTransportError, buildRfqMessage, readRfqSmtpConfig, sendRfqMail } = await import("../lib/rfqMail.ts");

const site = "https://tinkontech.com";
const endpoint = site + "/api/rfq";
const product = "test-organizer";
const category = "test-vehicle-storage";
const config = { user: "website@tinkontech.com", password: "examplepasswordx" };
const now = Date.parse("2026-11-24T12:00Z");
const name = "Freight buyer";
const buyer = "buyer@example.com";
const validPdf = "%PDF-1.7\n1 0 obj\n<< >>\nendobj\n%%EOF\n";

function setup({ enabled = true, send, clock = () => now, onVercel = false } = {}) {
  const mails = [];
  const handler = createRfqHandler({
    credentials: () => enabled ? config : null,
    lookup: (selection) => selection.productSlug === product
      ? { label: "Test Organizer", path: "/products/" + product, sku: "TK-TEST" }
      : selection.categorySlug === category
        ? { label: "Test Storage Category", path: "/products/category/" + category }
        : null,
    now: clock,
    onVercel,
    dispatch: async (credentials, mail) => {
      assert.deepEqual(credentials, config);
      mails.push(mail);
      await send?.(mail);
    },
  });
  return { handler, mails };
}

function get(handler, query = "", host = endpoint) {
  return handler.get(new Request(host + query, { headers: { "Sec-Fetch-Site": "same-origin" } }));
}

async function token(handler, query = "") {
  const response = await get(handler, query);
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.reference, "TK-" + result.token.split(".")[1]);
  return result.token;
}

function payload(formToken, overrides = {}) {
  const body = new FormData();
  const values = {
    token: formToken, name, email: buyer, company: "Buyer Inc.", market: "UK",
    buyerType: "Wholesaler", quantity: "100–250 sets",
    details: "Can we sample?\nPlease share options.",
    ...overrides,
  };
  for (const [key, value] of Object.entries(values)) body.set(key, value);
  return body;
}

function post(handler, values, headers = {}, url = endpoint) {
  const request = new Request(url, {
    method: "POST",
    headers: { Origin: site, "Sec-Fetch-Site": "same-origin", ...headers },
    body: values,
  });
  return handler.post(request);
}

test("production config is opt-in, unavailable in Vercel previews and never aims at other user domains", () => {
  const env = {
    NODE_ENV: "production", VERCEL: "1", VERCEL_ENV: "production", RFQ_EMAIL_ENABLED: "true",
    RFQ_SMTP_USER: config.user, RFQ_SMTP_APP_PASSWORD: "exam plep assw ordx",
  };
  assert.deepEqual(readRfqSmtpConfig(env), config);
  assert.equal(readRfqSmtpConfig({ ...env, RFQ_EMAIL_ENABLED: undefined }), null);
  assert.equal(readRfqSmtpConfig({ ...env, VERCEL_ENV: "preview" }), null);
  assert.equal(readRfqSmtpConfig({ ...env, VERCEL_ENV: undefined }), null);
  assert.equal(readRfqSmtpConfig({ ...env, VERCEL: undefined }), null);
  assert.equal(readRfqSmtpConfig({ ...env, NODE_ENV: "development" }), null);
  assert.equal(readRfqSmtpConfig({ ...env, RFQ_SMTP_USER: "different@example.com" }), null);
});

test("an unconfigured form returns canonical source context but never an active token or dispatch", async () => {
  const { handler, mails } = setup({ enabled: false });
  const response = await get(handler, "?category=" + category);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), {
    context: "Test Storage Category",
    available: false,
  });
  assert.equal((await post(handler, payload("irrelevant"))).status, 503);
  assert.equal(mails.length, 0);
  const preview = setup();
  const query = "?product=" + product;
  const localResponse = await get(preview.handler, query, "http://localhost:3000/api/rfq");
  assert.equal(localResponse.status, 200);
  assert.equal((await localResponse.json()).context, "Test Organizer");
  assert.equal((await post(preview.handler, payload("unused"), { Origin: "http://localhost:3000" }, "http://localhost:3000/api/rfq")).status, 403);
});

test("rejects cross-origin requests, invalid or duplicate contexts, invalid forms, tampered or expired tokens", async () => {
  let time = now;
  const { handler, mails } = setup({ clock: () => time });
  const formToken = await token(handler, "?product=" + product);
  assert.equal((await get(handler, "?product=" + product + "&category=" + category)).status, 400);
  assert.equal((await get(handler, "?product=not-listed")).status, 404);
  assert.equal((await get(handler, "?product=" + product + "&product=" + product)).status, 400);
  assert.equal((await post(handler, payload(formToken), { Origin: "https://bad.example" })).status, 403);
  assert.equal((await post(handler, payload(formToken), { Origin: "" })).status, 403);
  assert.equal((await post(handler, payload(formToken), { "Sec-Fetch-Site": "cross-site" })).status, 403);
  assert.equal((await post(handler, payload(formToken, { category }))).status, 400);
  assert.equal((await post(handler, payload(formToken.slice(0, -1) + (formToken.endsWith("X") ? "Y" : "X"), { product }))).status, 400);
  assert.equal((await post(handler, payload(formToken, { product, website: "bot.example" }))).status, 400);
  assert.equal((await post(handler, payload(formToken, { product, email: "buyer@example.com\r\nBcc: other@example.com" }))).status, 400);
  assert.equal((await post(handler, payload(formToken, { product, details: "" }))).status, 400);
  time += 2 * 60 * 60_000 + 1;
  assert.equal((await post(handler, payload(formToken, { product }))).status, 400);
  assert.equal(mails.length, 0);
});

test("accepts an eligible file, transfers server-resolved SKU and source, and deduplicates a repeat", async () => {
  const { handler, mails } = setup();
  const formToken = await token(handler, "?product=" + product);
  const request = payload(formToken, { product });
  request.set("attachment", new File([validPdf], "Skü plan.pdf", { type: "application/pdf" }));
  const response = await post(handler, request);
  assert.equal(response.status, 200);
  const { reference } = await response.json();
  assert.match(reference, /^TK-[a-f0-9-]{36}$/);
  assert.equal(mails.length, 1);
  const [mail] = mails;
  assert.equal(mail.replyTo, buyer);
  assert.equal(mail.reference, reference);
  assert.match(mail.text, /Source: https:\/\/tinkontech\.com\/products\/test-organizer/);
  assert.match(mail.text, /Interested in: Test Organizer\nSKU: TK-TEST/);
  assert.match(mail.text, /Buyer type: Wholesaler\nEstimated quantity: 100–250 sets/);
  assert.equal(mail.attachment.mediaType, "application/pdf");
  assert.equal(mail.attachment.content.toString(), validPdf);
  assert.match(mail.attachment.filename, /^[A-Za-z0-9_-]+\.pdf$/);
  assert.deepEqual(await (await post(handler, payload(formToken, { product }))).json(), { reference });
  assert.equal(mails.length, 1);
});

test("rejects oversized lengths, oversized actual body, MIME mismatch, unsafe extension, bad signatures and multiple files", async () => {
  const { handler, mails } = setup();
  const formToken = await token(handler);
  assert.equal((await post(handler, payload(formToken), { "Content-Length": "9999999" })).status, 413);
  const file = (bytes, filename, type) => new File([bytes], filename, { type });
  const big = payload(formToken, { attachment: file(new Uint8Array(3_300_000), "img.png", "image/png") });
  assert.equal((await post(handler, big)).status, 413);
  assert.equal((await post(handler, payload(formToken, { attachment: file(validPdf, "notes.pdf", "image/png") }))).status, 415);
  assert.equal((await post(handler, payload(formToken, { attachment: file(validPdf, "notes.html", "application/pdf") }))).status, 415);
  assert.equal((await post(handler, payload(formToken, { attachment: file("bad", "notes.pdf", "application/pdf") }))).status, 415);
  const two = payload(formToken, { attachment: file(validPdf, "file.pdf", "application/pdf") });
  two.append("attachment", file(validPdf, "file2.pdf", "application/pdf"));
  assert.equal((await post(handler, two)).status, 400);
  assert.equal(mails.length, 0);
});

test("uncertain SMTP result cannot be retried with the same token; a pre-acceptance failure can", async () => {
  const uncertain = setup({ send: () => { throw new RfqTransportError(true); } });
  const uncertainToken = await token(uncertain.handler);
  const first = await post(uncertain.handler, payload(uncertainToken));
  assert.equal(first.status, 502);
  const report = await first.json();
  assert.equal(report.retrySafe, false);
  assert.match(report.reference, /^TK-/);
  const repeat = await post(uncertain.handler, payload(uncertainToken));
  assert.equal(repeat.status, 409);
  assert.equal((await repeat.json()).reference, report.reference);
  assert.equal(uncertain.mails.length, 1);
  let attempts = 0;
  const retryable = setup({ send: () => { if (!attempts++) throw new RfqTransportError(false); } });
  const retryToken = await token(retryable.handler);
  const failure = await post(retryable.handler, payload(retryToken));
  assert.equal(failure.status, 502);
  const failureData = await failure.json();
  assert.equal(failureData.retrySafe, true);
  const retry = await post(retryable.handler, payload(retryToken));
  assert.equal(retry.status, 200);
  assert.equal((await retry.json()).reference, failureData.reference);
});

test("limits repeated requests from one asserted buyer on a warm instance", async () => {
  const { handler, mails } = setup();
  for (let i = 0; i < 4; i++) assert.equal((await post(handler, payload(await token(handler)))).status, 200);
  const limited = await post(handler, payload(await token(handler)));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "600");
  assert.equal(mails.length, 4);
});

test("implicit TLS only, fixed SMTP recipient, MIME-safe message, and only final 250 reports success (all simulated)", async () => {
  const mail = {
    replyTo: buyer, reference: "TK-00000000-0000-4000-8000-000000000000", text: "First line\n.Human text",
    submittedAt: new Date(now), attachment: { filename: "approved.pdf", mediaType: "application/pdf", content: Buffer.from(validPdf) },
  };
  const message = buildRfqMessage(config, mail);
  assert.match(message, /\r\nTo: allen@tinkontech\.com\r\nReply-To: buyer@example\.com\r\n/);
  assert.match(message, /Content-Disposition: attachment; filename="approved\.pdf"/);
  assert.match(message, /Content-Transfer-Encoding: base64/);
  class FakeTlsSocket extends EventEmitter {
    constructor(final) { super(); this.commands = []; this.final = final; }
    setEncoding() {}
    write(data) {
      this.commands.push(data);
      const line = this.commands.length - 1;
      const answer = [
        "250-host\r\n250 AUTH LOGIN PLAIN\r\n",
        "235 accepted\r\n",
        "250 sender\r\n",
        "250 recipient\r\n",
        "354 submit\r\n",
        this.final,
      ][line];
      queueMicrotask(() => answer ? this.emit("data", answer) : this.emit("close"));
    }
    end() {}
    destroy(error) { if (error) this.emit("error", error); }
  }
  const dial = (final) => {
    const simulated = new FakeTlsSocket(final);
    return {
      simulated,
      connect(options) {
        assert.deepEqual(options, { host: "smtp.gmail.com", port: 465, servername: "smtp.gmail.com", rejectUnauthorized: true, minVersion: "TLSv1.2" });
        queueMicrotask(() => simulated.emit("data", "220 simulator\r\n"));
        return simulated;
      },
    };
  };
  const accepted = dial("250 accepted\r\n");
  await sendRfqMail(config, mail, accepted.connect);
  assert.equal(accepted.simulated.commands[3], "RCPT TO:<allen@tinkontech.com>\r\n");
  assert.ok(accepted.simulated.commands[5].endsWith("\r\n.\r\n"));
  await assert.rejects(sendRfqMail(config, mail, dial(null).connect), (error) => error.mayHaveSent);
  await assert.rejects(sendRfqMail(config, mail, dial("554 rejected\r\n").connect), (error) => error.mayHaveSent === false);
});
