import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dongguan TinKon Technology Co., Ltd. has provided OEM, ODM and private-label product development since 2011.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About TINKON"
        title="A one-stop product development partner since 2011."
        description="Based in Dongguan, China, TINKON develops EV, mobile and computer accessories for global brands, distributors, importers and e-commerce sellers."
      />
      <section className="section">
        <div className="container story-grid">
          <div>
            <p className="eyebrow">Our role</p>
            <h2>Connecting product ideas with capable manufacturing.</h2>
          </div>
          <div className="story-copy">
            <p>
              Our five-member engineering and product development team works from
              concepts, drawings, samples or technical specifications. We coordinate
              industrial design, mechanical design, product engineering and sampling
              around each customer’s market, target cost and delivery plan.
            </p>
            <p>
              From tooling and production to packaging and logistics, TINKON manages
              the path to a market-ready product. Our core manufacturing partner,
              Emery Technology, supports precision tooling, injection molding, surface
              treatment, assembly and product testing.
            </p>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <div className="capability-header">
            <p className="eyebrow">TINKON at a glance</p>
            <h2>Flexible support from idea to delivery.</h2>
            <p>
              A responsive development team, practical project management and a reliable
              manufacturing network keep product decisions connected to execution.
            </p>
          </div>
          <div className="value-grid">
            <article>
              <span>2011</span>
              <h3>Established</h3>
              <p>More than a decade supporting international accessory programs.</p>
            </article>
            <article>
              <span>5</span>
              <h3>Engineering team</h3>
              <p>Product development support covering ID, MD and product engineering.</p>
            </article>
            <article>
              <span>OEM / ODM</span>
              <h3>Flexible development</h3>
              <p>Customization for products, materials, colors, logos and packaging.</p>
            </article>
            <article>
              <span>360°</span>
              <h3>One-stop coordination</h3>
              <p>Design, tooling, production, quality, packaging and logistics.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="capability-header">
            <p className="eyebrow">Core manufacturing partner</p>
            <h2>Engineering depth for production-ready products.</h2>
            <p>
              The capabilities below are provided through our long-term manufacturing
              partner and support projects from feasibility review through mass production.
            </p>
          </div>
          <div className="value-grid">
            <article>
              <span>16</span>
              <h3>R&amp;D team members</h3>
              <p>Structural, optical, electronic, packaging, tooling and validation expertise.</p>
            </article>
            <article>
              <span>52</span>
              <h3>Injection machines</h3>
              <p>Single-color, double-injection and electric molding capabilities.</p>
            </article>
            <article>
              <span>90–1,300T</span>
              <h3>Molding range</h3>
              <p>Equipment coverage for compact precision parts and larger structures.</p>
            </article>
            <article>
              <span>30</span>
              <h3>Mold sets per month</h3>
              <p>Precision tooling supported by CNC, EDM, WEDM and measurement equipment.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-navy">
        <div className="container two-column">
          <div>
            <p className="eyebrow eyebrow-light">Our commitment</p>
            <h2>Quality, transparency and responsiveness.</h2>
          </div>
          <div>
            <p className="section-lede">
              We combine fast communication with clear project management, strict
              quality control and reliable supply coordination to support lasting
              customer partnerships.
            </p>
            <ul className="check-list check-list-light">
              <li>Fast sampling and practical project support</li>
              <li>Flexible product and branding customization</li>
              <li>Quality control from materials through shipment</li>
              <li>Competitive, supply-chain-aware solutions</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section section-compact">
        <div className="container inline-cta">
          <div>
            <p className="eyebrow">Work with TINKON</p>
            <h2>Tell us what you are planning to develop.</h2>
          </div>
          <Link className="button" href="/contact">Contact us</Link>
        </div>
      </section>
    </>
  );
}
