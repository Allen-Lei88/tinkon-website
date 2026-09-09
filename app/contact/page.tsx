import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
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
        description="Share the basic project information below and your email program will prepare a message for the TINKON team."
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
              <div>
                <span>Location</span>
                <strong>Dongguan, Guangdong, China</strong>
              </div>
              <div>
                <span>Email</span>
                <a href="mailto:allen@cntinkon.com">allen@cntinkon.com</a>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
