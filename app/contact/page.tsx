import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Share your product requirements with Dongguan TinKon Technology Co., Ltd.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with the product requirements."
        description="Share the basic project information below. Contact delivery will be connected before the website goes live."
      />
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-intro">
            <p className="eyebrow">A useful first message</p>
            <h2>Include what is already known.</h2>
            <p>
              A reference image, specification, expected quantity and target
              timeline will help us review your project more efficiently.
            </p>
            <div className="contact-location">
              <span>Location</span>
              <strong>Dongguan, Guangdong, China</strong>
            </div>
          </div>
          <form className="contact-form">
            <div className="field-grid">
              <label>
                Name
                <input type="text" name="name" autoComplete="name" placeholder="Your name" />
              </label>
              <label>
                Company
                <input type="text" name="company" autoComplete="organization" placeholder="Company name" />
              </label>
            </div>
            <label>
              Business email
              <input type="email" name="email" autoComplete="email" placeholder="name@company.com" />
            </label>
            <label>
              Product category
              <select name="category" defaultValue="">
                <option value="" disabled>Select a category</option>
                <option>Mobile accessories</option>
                <option>EV & automotive accessories</option>
                <option>Promotional technology</option>
                <option>Other product</option>
              </select>
            </label>
            <label>
              Project requirements
              <textarea
                name="message"
                rows={6}
                placeholder="Product, quantity, target market, target price and delivery timing"
              />
            </label>
            <button className="button" type="button" disabled>
              Inquiry delivery coming soon
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
