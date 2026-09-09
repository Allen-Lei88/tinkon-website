import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore TINKON capabilities across EV, automotive, mobile, computer, promotional and custom silicone products.",
};

const productGroups = [
  {
    code: "EV & AUTO / 01",
    title: "EV and automotive accessories",
    description: "Fit-focused products for vehicle interiors, protection, organization and charging.",
    items: [
      "Tesla, BYD and Rivian accessories",
      "Console, trunk and under-seat organizers",
      "Interior protection and display accessories",
      "Vehicle mounts, USB hubs and charging products",
    ],
  },
  {
    code: "GLASS / 02",
    title: "Tempered glass screen protectors",
    description: "Clear and anti-glare protection developed around exact screen dimensions and use conditions.",
    items: [
      "Automotive center and driver displays",
      "Phone and tablet screen protection",
      "Clear, matte and anti-glare finishes",
      "Custom installation kits and retail packaging",
    ],
  },
  {
    code: "MOBILE / 03",
    title: "Phone accessories",
    description: "Protection, charging and support products prepared for branded retail programs.",
    items: [
      "Phone cases and protective covers",
      "Charging cables and adapters",
      "Phone wallets and organizers",
      "Stands, holders and mounting solutions",
    ],
  },
  {
    code: "COMPUTING / 04",
    title: "Tablet and computer accessories",
    description: "Practical peripherals and support products for workstations, mobile work and gaming.",
    items: [
      "Laptop stands and cooling products",
      "Stylus and tablet accessories",
      "Mouse pads and desk mats",
      "Monitor mounts and workspace accessories",
    ],
  },
  {
    code: "PROMOTIONAL / 05",
    title: "Promotional products",
    description: "Useful technology accessories customized for campaigns, corporate programs and gifting.",
    items: [
      "Custom-branded technology accessories",
      "Charging and travel products",
      "Logo, color and presentation customization",
      "Retail and gift packaging",
    ],
  },
  {
    code: "SILICONE / 06",
    title: "Custom silicone products",
    description: "Custom-molded silicone items developed around functional, promotional or retail requirements.",
    items: [
      "Protective covers and functional components",
      "Custom shapes, colors and textures",
      "Logo and brand customization",
      "Private-label packaging solutions",
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product capabilities"
        title="EV, mobile, computer and custom products."
        description="Start from an existing product direction or bring us a new brief. We customize product design, materials, colors, logos, packaging and branding around your market."
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
