import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore TINKON product capabilities across phone, tablet, laptop and automotive accessories.",
};

const productGroups = [
  {
    code: "CASES / 01",
    title: "Phone cases",
    description: "Protective cases developed for device fit, finish, branding and retail presentation.",
    items: [
      "iPhone and Samsung compatible cases",
      "Clear, silicone and multi-material structures",
      "Magnetic and functional case designs",
      "Custom colors, finishes and packaging",
    ],
  },
  {
    code: "MOBILE / 02",
    title: "Mobile accessories",
    description: "Everyday device accessories prepared for branded retail programs.",
    items: [
      "Screen protectors and installation kits",
      "Charging cables and adapters",
      "Phone wallets and organizers",
      "Custom promotional accessories",
    ],
  },
  {
    code: "STANDS / 03",
    title: "Stands and holders",
    description: "Adjustable support products for desk, travel and in-car use.",
    items: [
      "Phone and tablet stands",
      "Car phone holders",
      "Gooseneck and adjustable stands",
      "Monitor and laptop mounting solutions",
    ],
  },
  {
    code: "COMPUTING / 04",
    title: "Tablet and laptop accessories",
    description: "Practical accessories for workstations, mobile work and gaming setups.",
    items: [
      "Laptop stands and cooling products",
      "Stylus and tablet accessories",
      "Mouse pads and desk mats",
      "Monitor mounts and workspace accessories",
    ],
  },
  {
    code: "AUTO / 05",
    title: "EV and automotive accessories",
    description: "Fit-focused products for vehicle interiors, storage and everyday use.",
    items: [
      "Console and under-seat organizers",
      "Vehicle mounts and holders",
      "Interior protection accessories",
      "USB hubs and charging products",
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product capabilities"
        title="Focused categories. Flexible development."
        description="Start from an existing product direction or bring us a new brief. We align materials, structure, branding and packaging around your market."
      />
      <section className="section">
        <div className="container product-list">
          {productGroups.map((group) => (
            <article className="product-group" key={group.code}>
              <div>
                <span className="category-number">{group.code}</span>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-compact">
        <div className="container inline-cta">
          <div>
            <p className="eyebrow">Have a specific product in mind?</p>
            <h2>Share the key requirements with our team.</h2>
          </div>
          <Link className="button" href="/contact">Send your brief</Link>
        </div>
      </section>
    </>
  );
}
