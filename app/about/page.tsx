import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Dongguan TinKon Technology Co., Ltd. and our approach to product development.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About TINKON"
        title="A practical product partner in Dongguan."
        description="Dongguan TinKon Technology Co., Ltd. supports international buyers with OEM and ODM development for phone, tablet, laptop and automotive accessories."
      />
      <section className="section">
        <div className="container story-grid">
          <div>
            <p className="eyebrow">Our role</p>
            <h2>Connecting product ideas with capable manufacturing.</h2>
          </div>
          <div className="story-copy">
            <p>
              We work between the buyer’s requirements and the manufacturing process,
              organizing specifications, resolving technical details and keeping
              development aligned with target cost, quality and delivery goals.
            </p>
            <p>
              TINKON coordinates product development and international order execution.
              Our core manufacturing partner, Emery Technology, provides precision
              tooling, injection molding, surface treatment, assembly and product testing.
            </p>
          </div>
        </div>
      </section>
      <section className="section section-soft">
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
