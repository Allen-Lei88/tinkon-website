"use client";

import type { FormEvent } from "react";

const RECIPIENT_EMAIL = "leiwenbin03@gmail.com";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const company = String(formData.get("company") ?? "");
    const email = String(formData.get("email") ?? "");
    const category = String(formData.get("category") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent(
      "Product inquiry from " + (company || name || "website visitor"),
    );
    const body = encodeURIComponent(
      [
        "Name: " + name,
        "Company: " + company,
        "Business email: " + email,
        "Product category: " + category,
        "",
        "Project requirements:",
        message,
      ].join("\n"),
    );

    window.location.href =
      "mailto:" + RECIPIENT_EMAIL + "?subject=" + subject + "&body=" + body;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label>
          Name
          <input type="text" name="name" autoComplete="name" placeholder="Your name" required />
        </label>
        <label>
          Company
          <input type="text" name="company" autoComplete="organization" placeholder="Company name" required />
        </label>
      </div>
      <label>
        Business email
        <input type="email" name="email" autoComplete="email" placeholder="name@company.com" required />
      </label>
      <label>
        Product category
        <select name="category" defaultValue="" required>
          <option value="" disabled>Select a category</option>
          <option>Phone cases</option>
          <option>Mobile accessories</option>
          <option>Stands and holders</option>
          <option>Tablet and laptop accessories</option>
          <option>EV and automotive accessories</option>
          <option>Promotional products</option>
          <option>Custom silicone products</option>
          <option>Other product</option>
        </select>
      </label>
      <label>
        Project requirements
        <textarea
          name="message"
          rows={6}
          placeholder="Product, quantity, target market, target price and delivery timing"
          required
        />
      </label>
      <button className="button" type="submit">Send inquiry by email</button>
    </form>
  );
}
