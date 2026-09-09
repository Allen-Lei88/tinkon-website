import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore TINKON product capabilities across mobile, automotive and promotional technology accessories.",
};

const productGroups = [
  {
    code: "MOBILE / 01",
    title: "Mobile accessories",
    description: "Protection and charging products prepared for branded retail programs.",
    items: [
      "Phone cases and protective covers",
      "Screen protectors and installation kits",
      "Charging cables and adapters",
      "Device stands and mounting solutions",
    ],
  },
  {
    code: "AUTO / 02",
    title: "EV & automotive accessories",
    description: "Fit-focused products for vehicle interiors, storage and everyday use.",
    items: [
      "Console and under-seat organizers",
      "Vehicle mounts and holders",
      "Interior protection accessories",
      "USB hubs and charging products",
    ],
  },
  {
    code: "PROMO / 03",
    title: "Promotional technology",
    description: "Customizable technology accessories for branded campaigns and gifting.",
    items: [
      "Custom-branded device accessories",
      "Charging and power products",
      "Tech organizers and travel items",
      "Retail and presentation packaging",
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
