"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  RFQ_ATTACHMENT_BYTES, RFQ_ATTACHMENT_TYPES, RFQ_BUYER_TYPES, RFQ_INBOX, RFQ_ROUTE,
  type RfqSelection,
} from "@/lib/rfqFormOptions";
import { getWhatsAppUrl } from "@/lib/contact";
import styles from "./WholesaleEnquiryForm.module.css";

type Props = RfqSelection & { contextLabel?: string };
type Status = "loading" | "unavailable" | "ready" | "sending" | "sent" | "uncertain";
type Result = { token?: string; context?: string; reference?: string; message?: string; retrySafe?: boolean };

export default function WholesaleEnquiryForm(props: Props) {
  return (
    <Suspense fallback={<WholesaleContactCard label={props.contextLabel ?? ""} />}>
      <RoutedWholesaleEnquiryForm {...props} />
    </Suspense>
  );
}

function WholesaleContactCard({ label }: { label: string }) {
  const subject = label ? `Wholesale enquiry: ${label}` : "Wholesale enquiry";
  const whatsapp = label ? getWhatsAppUrl(`Hello TINKON, I'd like a wholesale quotation for ${label}.`) : getWhatsAppUrl();
  return (
    <aside className={styles.contactCard} aria-label="Wholesale contact options">
      <h3>Contact our wholesale team</h3>
      {label ? <p className={styles.context}><strong>Interested in:</strong> {label}</p> : null}
      <div className={styles.contactActions}>
        <a className="button button-primary" href={"mailto:" + RFQ_INBOX + "?subject=" + encodeURIComponent(subject)}>
          Email your request <span aria-hidden="true">↗</span>
        </a>
        <a className="button button-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer">
          Message on WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p>Share your destination market, vehicle models and estimated quantity. If you have a SKU list or reference image, attach it to your email.</p>
      <p className={styles.note}>{RFQ_INBOX}</p>
    </aside>
  );
}

function RoutedWholesaleEnquiryForm(props: Props) {
  const query = useSearchParams();
  const fixed = !!(props.productSlug || props.categorySlug);
  const product = fixed ? props.productSlug : query.get("product") ?? undefined;
  const category = fixed ? props.categorySlug : query.get("category") ?? undefined;
  return <WholesaleEnquiryFields key={(product ?? "") + ":" + (category ?? "")}
    productSlug={product} categorySlug={category} contextLabel={props.contextLabel} />;
}

function WholesaleEnquiryFields({ productSlug, categorySlug, contextLabel }: Props) {
  const id = useId();
  const pending = useRef(false);
  const [token, setToken] = useState("");
  const [label, setLabel] = useState(contextLabel ?? "");
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [intendedReference, setIntendedReference] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams();
    if (productSlug) query.set("product", productSlug);
    if (categorySlug) query.set("category", categorySlug);
    fetch(RFQ_ROUTE + "?" + query.toString(), { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json() as Result;
        if (controller.signal.aborted) return;
        setLabel(payload.context ?? contextLabel ?? "");
        if (response.ok && payload.token) {
          setToken(payload.token);
          setIntendedReference(payload.reference ?? "");
          setStatus("ready");
        } else {
          setStatus("unavailable");
        }
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setStatus("unavailable");
      });
    return () => controller.abort();
  }, [productSlug, categorySlug, contextLabel]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "ready" || !token || pending.current) return;
    const form = event.currentTarget;
    const body = new FormData(form);
    const file = body.get("attachment");
    if (file instanceof File && file.size > RFQ_ATTACHMENT_BYTES) {
      setMessage("Please attach a file no larger than 3 MB.");
      return;
    }
    body.set("token", token);
    if (productSlug) body.set("product", productSlug);
    if (categorySlug) body.set("category", categorySlug);
    pending.current = true;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch(RFQ_ROUTE, { method: "POST", body });
      const payload = await response.json() as Result;
      setReference(payload.reference ?? "");
      if (response.ok && payload.reference) {
        form.reset();
        setStatus("sent");
        setMessage("Thank you. Your enquiry was submitted.");
      } else {
        // Preserve the entered data if the service becomes unavailable after the user types.
        setStatus(payload.retrySafe === false ? "uncertain" : "ready");
        setMessage(payload.message ?? "We could not confirm submission. Please contact us by email.");
      }
    } catch {
      setStatus("uncertain");
      setReference(intendedReference);
      setMessage("We could not confirm whether your enquiry was submitted. Please contact us by email before sending it again.");
    } finally {
      pending.current = false;
    }
  }

  if (status === "loading" || status === "unavailable") return <WholesaleContactCard label={label} />;

  const feedback = status === "sending" ? "Submitting your enquiry…" : message;
  const emailSubject = reference ? `Wholesale enquiry ${reference}` : label ? `Wholesale enquiry: ${label}` : "Wholesale enquiry";
  const email = "mailto:" + RFQ_INBOX + "?subject=" + encodeURIComponent(emailSubject);
  return (
    <form className={styles.form} method="post" encType="multipart/form-data" action={RFQ_ROUTE} onSubmit={submit}>
      {label ? <p className={styles.context}><strong>Interested in:</strong> {label}</p> : null}
      <fieldset className={styles.fields} disabled={status !== "ready"}>
        <div className={styles.grid}>
          <label htmlFor={id + "-name"}>Full name <span aria-hidden="true">*</span>
            <input id={id + "-name"} name="name" autoComplete="name" required maxLength={100} />
          </label>
          <label htmlFor={id + "-company"}>Company <span aria-hidden="true">*</span>
            <input id={id + "-company"} name="company" autoComplete="organization" required maxLength={120} />
          </label>
          <label htmlFor={id + "-email"}>Business email <span aria-hidden="true">*</span>
            <input id={id + "-email"} name="email" type="email" autoComplete="email" required maxLength={254} />
          </label>
          <label htmlFor={id + "-market"}>Country / destination market <span aria-hidden="true">*</span>
            <input id={id + "-market"} name="market" autoComplete="country-name" required maxLength={100} />
          </label>
          <label htmlFor={id + "-buyer-type"}>Buyer type
            <select id={id + "-buyer-type"} name="buyerType" defaultValue="">
              <option value="">Select a buyer type (optional)</option>
              {RFQ_BUYER_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>
          <label htmlFor={id + "-quantity"}>Estimated quantity
            <input id={id + "-quantity"} name="quantity" maxLength={80} placeholder="For example, 500 per SKU" />
          </label>
        </div>
        <label htmlFor={id + "-details"}>What are you looking for? <span aria-hidden="true">*</span>
          <textarea id={id + "-details"} name="details" required maxLength={3500} rows={5}
            placeholder="Tell us which products or vehicle models you need, and any fitment, packaging or branding requirements." />
        </label>
        <label htmlFor={id + "-file"}>Attachment (optional)
          <input id={id + "-file"} name="attachment" type="file" accept={RFQ_ATTACHMENT_TYPES}
            aria-describedby={id + "-file-note"} />
        </label>
        <p className={styles.note} id={id + "-file-note"}>One PDF, JPG or PNG, up to 3 MB. Only attach material you are allowed to share.</p>
        <div className={styles.trap} aria-hidden="true">
          <label htmlFor={id + "-website"}>Leave this field blank</label>
          <input id={id + "-website"} name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button className={styles.submit} type="submit">Submit wholesale enquiry <span aria-hidden="true">↗</span></button>
      </fieldset>
      <div className={styles.feedback} role="status" aria-live="polite" aria-atomic="true">
        {feedback ? <p>{feedback}</p> : null}
        {reference ? <p>Reference: <strong>{reference}</strong></p> : null}
      </div>
      <p className={styles.note}>
        Prefer to contact us directly? <a href={email}>{RFQ_INBOX}</a> or <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
        {" "}Learn how we <a href="/about#enquiry-privacy">use enquiry information</a>.
      </p>
    </form>
  );
}
