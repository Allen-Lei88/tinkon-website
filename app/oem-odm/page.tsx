import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "OEM & ODM",
  description:
    "A structured product development workflow covering specification, engineering, samples, production and delivery.",
};

const stages = [
  {
    number: "01",
    title: "Define the brief",
    text: "We align product use, target market, quantity, target cost, timing, branding and compliance requirements.",
  },
  {
    number: "02",
    title: "Review feasibility",
    text: "Materials, structure, tooling, finish and packaging are evaluated before the development direction is confirmed.",
  },
  {
    number: "03",
    title: "Build and refine",
    text: "Samples are prepared and reviewed against agreed dimensions, appearance and functional requirements.",
  },
  {
    number: "04",
    title: "Prepare production",
    text: "Final specifications, packaging details, inspection points and the production schedule are locked.",
  },
  {
    number: "05",
    title: "Coordinate delivery",
    text: "Production milestones, quality checks, packing and shipment readiness are followed through to completion.",
  },
];

export default function OemOdmPage() {
  return (
    <>
      <PageHero
        eyebrow="OEM / ODM"
        title="A product development process built around decisions."
        description="Clear specifications and checkpoints help buyers move from an initial idea to a production-ready product with fewer avoidable revisions."
      />
      <section className="section">
        <div className="container stage-grid">
          {stages.map((stage) => (
            <article className="stage-card" key={stage.number}>
              <span>{stage.number}</span>
              <h2>{stage.title}</h2>
              <p>{stage.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-navy">
        <div className="container two-column">
          <div>
            <p className="eyebrow eyebrow-light">What to include</p>
            <h2>A stronger brief gets you a faster, clearer answer.</h2>
          </div>
          <div>
            <ul className="check-list check-list-light">
              <li>Product reference, drawing or STEP file</li>
              <li>Target market and intended use</li>
              <li>Estimated order quantity</li>
              <li>Target price and required delivery date</li>
              <li>Logo, color and packaging requirements</li>
            </ul>
            <Link className="button button-light" href="/contact">
              Prepare your inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
