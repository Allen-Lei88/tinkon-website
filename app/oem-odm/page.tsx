import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "OEM & ODM",
  description:
    "One-stop OEM, ODM and private-label development covering design, engineering, tooling, production, packaging and delivery.",
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
        title="From concept to a market-ready product."
        description="Bring us a concept, drawing, sample or technical specification. TINKON coordinates the decisions required to develop, manufacture, package and deliver it."
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
      <section className="section section-soft">
        <div className="container">
          <div className="capability-header">
            <p className="eyebrow">Development capabilities</p>
            <h2>One team coordinating the complete development path.</h2>
          </div>
          <div className="value-grid">
            <article>
              <span>ID</span>
              <h3>Industrial design</h3>
              <p>Product direction, appearance, materials, colors and user requirements.</p>
            </article>
            <article>
              <span>MD</span>
              <h3>Mechanical design</h3>
              <p>Structure, dimensions, assembly, fit and design-for-manufacturing review.</p>
            </article>
            <article>
              <span>TOOLING</span>
              <h3>Prototype to production</h3>
              <p>Tooling development, sample refinement and mass-production coordination.</p>
            </article>
            <article>
              <span>BRAND</span>
              <h3>Private label</h3>
              <p>Logo application, color matching, packaging design and retail preparation.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-navy">
        <div className="container two-column">
          <div>
            <p className="eyebrow eyebrow-light">Quality assurance</p>
            <h2>Quality control built into every stage.</h2>
            <p className="section-lede">
              Our manufacturing partners operate under ISO 9001 quality management
              systems. Compliance support is planned according to the product and its
              destination market.
            </p>
          </div>
          <div>
            <ul className="check-list check-list-light">
              <li>Raw material and incoming quality checks</li>
              <li>Production, assembly and functional inspection</li>
              <li>Packaging and pre-shipment verification</li>
              <li>CE, RoHS, FCC and REACH support where applicable</li>
            </ul>
            <Link className="button button-light" href="/contact">
              Discuss your requirements
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
