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
        description="Dongguan TinKon Technology Co., Ltd. supports international buyers with product development, supplier coordination and order execution for technology accessories."
      />
      <section className="section">
        <div className="container story-grid">
          <div>
            <p className="eyebrow">Our role</p>
            <h2>Connecting product ideas with capable manufacturing.</h2>
          </div>
          <div className="story-copy">
            <p>
              We work between the buyer’s requirements and the manufacturing
              process—organizing specifications, resolving details and keeping
              development aligned with commercial goals.
            </p>
            <p>
              Our focus is not simply finding a product. It is helping make sure
              the right product is defined, sampled, packaged and prepared for
              the intended market.
            </p>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container value-grid">
          <article>
            <span>01</span>
            <h3>Commercial clarity</h3>
            <p>Product decisions are considered alongside target cost, timing and order volume.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Technical coordination</h3>
            <p>Structure, materials, finish and packaging details are organized before production.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Consistent follow-through</h3>
            <p>One coordinated workflow keeps decisions and production milestones visible.</p>
          </article>
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
