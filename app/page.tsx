import Image from "next/image";
import Link from "next/link";
import MobileNavigation from "@/components/MobileNavigation";
import ProductRangeNavigation from "@/components/ProductRangeNavigation";
import WholesaleEnquiryForm from "@/components/WholesaleEnquiryForm";
import { products as catalogProducts } from "@/data/products";
import { EV_INTERIOR_SELECTION_PDF } from "@/lib/catalogDownloads";
import {
  COMPANY_ADDRESS_EN,
  COMPANY_POSITIONING_EN,
  COMPANY_STRUCTURED_ADDRESS,
  getWhatsAppUrl,
  WHATSAPP_DISPLAY,
} from "@/lib/contact";

const productBySlug = new Map(catalogProducts.map((product) => [product.slug, product]));

const featuredProducts = [
  "tesla-model-yl-under-seat-storage-box",
  "tesla-model-y-lower-console-organizer",
  "tesla-model-y-juniper-tpe-floor-mats",
  "tesla-foldable-seat-back-hook",
  "tesla-model-3-y-retractable-console-charging-hub",
  "ford-mustang-mach-e-panoramic-roof-sunshade",
].flatMap((slug) => {
  const product = productBySlug.get(slug);
  return product ? [product] : [];
});

const advantages = [
  {
    title: "Market-ready sourcing",
    text: "We identify proven product opportunities and align the range with your target price and channel.",
  },
  {
    title: "Flexible wholesale",
    text: "Start with a focused assortment, then scale models and packaging as customer demand grows.",
  },
  {
    title: "OEM / ODM support",
    text: "Customize logo, color, instruction manual, carton and product details for your private label.",
  },
  {
    title: "Export coordination",
    text: "One export-focused team coordinates samples, production milestones, quality checks and shipment planning.",
  },
];

const process = [
  ["01", "Share your market", "Tell us target countries, vehicle models, channels and price positioning."],
  ["02", "Confirm the range", "Shortlist products, materials, branding, packaging and commercial terms."],
  ["03", "Review samples", "Evaluate fit, finish, installation and English documentation before production."],
  ["04", "Scale supply", "Move into repeat wholesale orders with coordinated quality and shipment follow-up."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tinkontech.com/#organization",
      name: "TINKON",
      legalName: "Dongguan TinKon Technology Co., Ltd.",
      description:
        "Wholesale Tesla and EV interior accessories supply partner for global distributors, importers and private-label brands, with a focus on vehicle-specific car organizers.",
      url: "https://tinkontech.com",
      logo: "https://tinkontech.com/tinkon-logo.png",
      email: "allen@tinkontech.com",
      address: COMPANY_STRUCTURED_ADDRESS,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales enquiries",
        telephone: "+8613609699577",
        url: getWhatsAppUrl(),
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "ItemList",
      name: "TINKON wholesale car organizers and EV accessories",
      itemListElement: catalogProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.fullTitle,
        url: `https://tinkontech.com/products/${product.slug}`,
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>TINKON · TESLA &amp; EV INTERIOR ACCESSORIES · WHOLESALE · OEM / ODM</span>
          <a href="#inquiry">Wholesale enquiries</a>
        </div>
      </div>

      <header className="site-header">
        <div className="shell nav-row">
          <a className="brand" href="#top" aria-label="TINKON home">
            <Image className="brand-logo" src="/tinkon-logo.png" alt="TINKON logo" width={46} height={46} />
            <span className="brand-copy">
              <span className="brand-word">TINKON</span>
              <span className="brand-tag">GLOBAL SUPPLY</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/products">Products</Link>
            <Link href="/about">About TINKON</Link>
            <a href="#capabilities">Capabilities</a>
          </nav>

          <a className="nav-cta" href="#inquiry">
            Request a quotation
          </a>

          <MobileNavigation>
            <Link href="/products">Products</Link>
            <Link href="/about">About TINKON</Link>
            <a href="#capabilities">Capabilities</a>
            <a href="#standards">Markets</a>
            <a href="#process">How it works</a>
            <a href="#inquiry">Wholesale enquiry</a>
            <a href={EV_INTERIOR_SELECTION_PDF} download>Download product selection (PDF)</a>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </MobileNavigation>
        </div>
      </header>

      <main id="top" className="home-page">
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-intro">
              <div className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                Dongguan-based wholesale supply partner
              </div>
              <h1>
                Tesla &amp; EV <span>interior accessories.</span>
              </h1>
              <p className="hero-lede">
                Wholesale car organizers, interior protection, hooks and charging accessories
                for distributors, importers and private-label brands.
              </p>
            </div>

            <div className="hero-media" aria-label="TINKON product examples">
              <figure className="hero-photo hero-photo-primary">
                <Image
                  src="/catalog/tesla-model-3-highland-door-pocket-organizer-set.jpg"
                  alt="Four black door-pocket organizers for Tesla Model 3 Highland"
                  width={800}
                  height={800}
                  sizes="(max-width: 820px) calc(100vw - 34px), (max-width: 1288px) 37vw, 450px"
                  fetchPriority="high"
                  loading="eager"
                />
                <figcaption>Door-pocket organizers · Model 3 Highland</figcaption>
              </figure>
              <figure className="hero-photo hero-photo-secondary">
                <Image
                  src="/catalog/tesla-model-y-standard-console-cup-holder-organizer.jpg"
                  alt="Black and light gray console cup-holder organizer trays"
                  width={800}
                  height={800}
                  sizes="(max-width: 820px) 1px, 17vw"
                />
                <figcaption>Console storage</figcaption>
              </figure>
              <figure className="hero-photo hero-photo-secondary">
                <Image
                  src="/catalog/rivian-r2-rear-seat-back-protector-mats.jpg"
                  alt="Three black ribbed rear seat-back protection panels for Rivian R2"
                  width={800}
                  height={800}
                  sizes="(max-width: 820px) 1px, 17vw"
                />
                <figcaption>Seat-back protection</figcaption>
              </figure>
            </div>

            <div className="hero-controls">
              <div className="hero-actions">
                <Link className="button button-primary" href="/products">Browse products</Link>
                <a className="text-link" href="#inquiry">Request a quotation</a>
              </div>
              <a className="hero-download text-link" href={EV_INTERIOR_SELECTION_PDF} download>Download product selection (PDF)</a>
              <div className="hero-proof" aria-label="Key capabilities">
                <div><strong>OEM</strong><span>Brand & packaging support</span></div>
                <div><strong>FIT</strong><span>Vehicle-specific applications</span></div>
                <div><strong>B2B</strong><span>Wholesale-first service</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-band" aria-label="Supported business models">
          <div className="shell trust-row">
            <p>Made for the channel</p>
            <span>Distributors</span>
            <span>Wholesalers</span>
            <span>Importers</span>
            <span>Amazon sellers</span>
            <span>Automotive brands</span>
          </div>
        </section>

        <section className="section products-section" id="products">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="section-index">01 / PRODUCT RANGE</p>
                <h2>Build your EV interior range.</h2>
              </div>
              <p>
                Start with vehicle-specific storage and build around it with
                protection, holders, charging accessories and selected non-Tesla
                applications. Check the product pages for fitment and specifications.
              </p>
            </div>

            <div className="product-grid">
              {featuredProducts.map((product) => (
                <article className="product-card" key={product.slug}>
                  <div className="product-image">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      width="900"
                      height="640"
                      sizes="(max-width: 580px) 100vw, (max-width: 1050px) 50vw, (max-width: 1288px) 33vw, 412px"
                    />
                  </div>
                  <div className="product-copy">
                    <p className="home-feature-category">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <ul>
                      {product.features.slice(0, 3).map((spec) => <li key={spec}>{spec}</li>)}
                    </ul>
                    <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                      View product details <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="home-category-section">
              <div className="home-category-heading">
                <p className="section-index">BROWSE BY CATEGORY</p>
                <h3>Find the right product group.</h3>
              </div>
              <ProductRangeNavigation />
            </div>
            <div className="catalog-callout">
              <p>
                Explore model-specific console trays, seat-gap boxes, under-seat organizers,
                door-pocket inserts and other{" "}
                <Link href="/products/category/tesla-storage-organization">
                  wholesale car organizers
                </Link>
                {" "}for EV markets.
              </p>
              <Link className="button button-primary" href="/products/category/tesla-storage-organization">
                Browse organizer range <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="section standards-section" id="standards">
          <div className="shell standards-grid">
            <div className="standards-image">
              <Image
                src="/catalog/tesla-hidden-armrest-storage-box.jpg"
                alt="TINKON hidden armrest storage box compatible with multiple Tesla models"
                width="800"
                height="800"
                sizes="(max-width: 820px) 100vw, (max-width: 1288px) 50vw, 620px"
              />
              <div className="image-caption">MODEL 3 / MODEL Y / MODEL YL</div>
            </div>
            <div className="standards-copy">
              <p className="section-index">02 / VEHICLE COVERAGE</p>
              <h2>Storage built around the EV models buyers search for.</h2>
              <p className="large-copy">
                We focus each storage and organization program around real vehicle
                applications, buyer search behavior and retail-ready combinations—not
                a random factory catalog.
              </p>
              <div className="standards-list">
                <span>Tesla Model 3</span>
                <span>Tesla Model Y</span>
                <span>Model Y 2025 Refresh</span>
                <span>Tesla Model YL</span>
                <span>Universal EV</span>
                <span>New model development</span>
              </div>
              <p className="small-note">
                Tesla vehicle names are used only to describe product compatibility.
                TINKON is an independent accessories supplier and is not affiliated
                with Tesla, Inc.
              </p>
            </div>
          </div>
        </section>

        <section className="section capabilities-section" id="capabilities">
          <div className="shell">
            <div className="section-heading section-heading-light">
              <div>
                <p className="section-index">03 / B2B CAPABILITIES</p>
                <h2>Designed around<br />how distributors grow.</h2>
              </div>
              <p>
                From the first sample to a repeat product program, every step is
                organized around speed, clarity and commercial fit.
              </p>
            </div>
            <div className="advantages-grid">
              {advantages.map((advantage, index) => (
                <article key={advantage.title}>
                  <span>0{index + 1}</span>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="shell">
            <div className="section-heading compact-heading">
              <div>
                <p className="section-index">04 / SOURCING PROCESS</p>
                <h2>From market brief<br />to repeat supply.</h2>
              </div>
              <p>
                A straightforward process for commercial teams that need
                decisions, samples and production details to stay visible.
              </p>
            </div>
            <div className="process-list">
              {process.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section insight-section">
          <div className="shell insight-grid">
            <div className="insight-copy">
              <p className="section-index">THE ORGANIZER-RANGE ADVANTAGE</p>
              <h2>Turn one vehicle platform into a complete storage program.</h2>
              <p>
                Combine console, under-seat, seat-gap, dashboard and door-pocket
                organizers to build a model-focused private-label assortment.
              </p>
              <a className="text-link" href="#inquiry">
                Plan an organizer assortment <span aria-hidden="true">↗</span>
              </a>
            </div>
            <Image
              src="/catalog/tesla-model-3-y-tpe-seat-gap-storage-box-set.jpg"
              alt="TINKON TPE seat-gap storage organizer set for Tesla Model 3 and Model Y"
              width="800"
              height="800"
              sizes="(max-width: 820px) 100vw, (max-width: 1288px) 50vw, 620px"
            />
          </div>
        </section>

        <section className="inquiry-section" id="inquiry">
          <div className="shell inquiry-grid">
            <div>
              <p className="section-index">START A CONVERSATION</p>
              <h2>Tell us what your market needs.</h2>
              <p>
                Share your target countries, preferred product categories and
                estimated order volume. We’ll use it to prepare a focused
                wholesale range.
              </p>
              <address className="direct-address">{COMPANY_ADDRESS_EN}</address>
            </div>
            <WholesaleEnquiryForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-main">
          <a className="brand brand-footer" href="#top" aria-label="TINKON home">
            <Image className="brand-logo" src="/tinkon-logo.png" alt="TINKON logo" width={52} height={52} />
            <span className="brand-copy">
              <span className="brand-word">TINKON</span>
              <span className="brand-tag">GLOBAL SUPPLY</span>
            </span>
          </a>
          <p>
            {COMPANY_POSITIONING_EN}
            <span className="company-address">{COMPANY_ADDRESS_EN}</span>
          </p>
          <div className="footer-links">
            <a href="https://tinkontech.com">tinkontech.com</a>
            <a href="mailto:allen@tinkontech.com">allen@tinkontech.com</a>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a>
            <Link href="/products">Products</Link>
            <Link href="/about">About TINKON</Link>
            <Link href="/about#buyer-guide">Wholesale buyer guide</Link>
            <a href={EV_INTERIOR_SELECTION_PDF} download>Download product selection (PDF)</a>
            <a href="#capabilities">B2B support</a>
            <a href="#standards">Markets</a>
            <a href="#inquiry">Enquiry</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} TINKON</span>
          <span>Dongguan TinKon Technology Co., Ltd. · Global wholesale · OEM / ODM</span>
        </div>
      </footer>
    </>
  );
}
