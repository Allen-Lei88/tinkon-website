import Image from "next/image";
import Link from "next/link";
import { featuredProducts as products, products as catalogProducts } from "@/data/products";

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
      "@id": "#organization",
      name: "TINKON",
      legalName: "Dongguan TinKon Technology Co., Ltd.",
      description:
        "OEM and ODM electric vehicle accessories supplier for global distributors, importers and private-label brands.",
      url: "https://tinkontech.com",
      email: "allen@tinkontech.com",
    },
    {
      "@type": "ItemList",
      name: "TINKON wholesale electric vehicle accessories",
      itemListElement: catalogProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.fullTitle,
          description: product.description,
          category: "Electric Vehicle Accessories",
          brand: { "@id": "#organization" },
          audience: {
            "@type": "BusinessAudience",
            audienceType: "Distributors and wholesalers",
          },
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>TINKON · EV ACCESSORIES · WHOLESALE · OEM / ODM</span>
          <a href="#inquiry">Global distributor enquiries ↗</a>
        </div>
      </div>

      <header className="site-header">
        <div className="shell nav-row">
          <a className="brand" href="#top" aria-label="TINKON home">
            <span className="brand-mark" aria-hidden="true">T</span>
            <span className="brand-copy">
              <span className="brand-word">TINKON</span>
              <span className="brand-tag">GLOBAL SUPPLY</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/products">Products</Link>
            <a href="#capabilities">Capabilities</a>
            <a href="#standards">Markets</a>
            <a href="#process">How it works</a>
          </nav>

          <a className="nav-cta" href="#inquiry">
            Request wholesale catalog <span aria-hidden="true">↗</span>
          </a>

          <details className="mobile-nav">
            <summary aria-label="Open navigation">Menu</summary>
            <div className="mobile-panel">
              <Link href="/products">Products</Link>
              <a href="#capabilities">Capabilities</a>
              <a href="#standards">Markets</a>
              <a href="#process">How it works</a>
              <a href="#inquiry">Wholesale enquiry</a>
            </div>
          </details>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                Dongguan-based export sourcing partner
              </div>
              <h1>
                Better EV accessories.
                <span>Ready for your market.</span>
              </h1>
              <p className="hero-lede">
                TINKON helps distributors, importers and automotive accessory
                brands source, customize and launch professional Tesla and EV
                accessories for overseas markets.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/products">
                  Explore more products <span aria-hidden="true">↗</span>
                </Link>
                <a className="text-link" href="#capabilities">
                  Why partner with us <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="hero-proof" aria-label="Key capabilities">
                <div><strong>OEM</strong><span>Brand & packaging support</span></div>
                <div><strong>EV</strong><span>Model-focused assortment</span></div>
                <div><strong>B2B</strong><span>Wholesale-first service</span></div>
              </div>
            </div>

            <div className="hero-media">
              <div className="hero-product-grid" aria-label="Selected TINKON Tesla accessories">
                <Image
                  src="/catalog/tesla-hidden-armrest-storage-box.jpg"
                  alt="Hidden armrest storage box for Tesla vehicles"
                  width="800"
                  height="800"
                  priority
                />
                <Image
                  src="/catalog/tesla-model-yl-under-seat-storage-box.jpg"
                  alt="Under-seat storage box set for Tesla Model YL"
                  width="800"
                  height="800"
                  priority
                />
                <Image
                  src="/catalog/tesla-under-screen-storage-tray.jpg"
                  alt="Dual-layer under-screen storage tray"
                  width="800"
                  height="800"
                  priority
                />
                <Image
                  src="/catalog/tesla-model-y-yl-screen-protector.jpg"
                  alt="Tempered glass screen protector kit for Tesla displays"
                  width="800"
                  height="800"
                  priority
                />
              </div>
              <div className="hero-label">
                <span>TINKON PRODUCT FOCUS / 01</span>
                <strong>Real products,<br />commercially ready.</strong>
              </div>
              <div className="hero-chip">
                <span>Built for</span>
                <strong>global distribution</strong>
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
                <h2>One partner.<br />A growing product line.</h2>
              </div>
              <p>
                Build a focused range for retail, e-commerce and automotive
                distribution. TINKON coordinates sourcing, presentation and
                export-ready packaging around your market. Browse the growing
                product range for detailed specifications.
              </p>
            </div>

            <div className="product-grid">
              {products.map((product, index) => (
                <article className="product-card" key={product.slug}>
                  <div className="product-image">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      width="900"
                      height="640"
                    />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="product-copy">
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
            <div className="catalog-callout">
              <p>Explore the complete range, including EV interior protection, hooks, charging and selected technology accessories.</p>
              <Link className="button button-primary" href="/products">
                Explore more products <span aria-hidden="true">↗</span>
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
              />
              <div className="image-caption">MODEL 3 / MODEL Y / MODEL YL</div>
            </div>
            <div className="standards-copy">
              <p className="section-index">02 / VEHICLE COVERAGE</p>
              <h2>Built around the EV models buyers search for.</h2>
              <p className="large-copy">
                We focus each product program around real vehicle applications,
                buyer search behavior and retail-ready combinations—not a random
                factory catalog.
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
              <p className="section-index">THE PRODUCT-LINE ADVANTAGE</p>
              <h2>Turn one vehicle platform into a complete accessory program.</h2>
              <p>
                Pair floor protection, storage, sunshades, screen protection and
                daily-use accessories to increase basket value and give buyers a
                stronger private-label assortment.
              </p>
              <a className="text-link" href="#inquiry">
                Plan a wholesale assortment <span aria-hidden="true">↗</span>
              </a>
            </div>
            <Image
              src="/catalog/tesla-model-y-cup-holder-inserts.png"
              alt="TINKON silicone cup holder inserts in multiple colors"
              width="800"
              height="800"
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
              <a className="direct-email" href="mailto:allen@tinkontech.com">
                allen@tinkontech.com <span aria-hidden="true">↗</span>
              </a>
            </div>
            <form
              className="inquiry-form"
              action="mailto:allen@tinkontech.com?subject=TINKON%20Wholesale%20Enquiry"
              method="post"
              encType="text/plain"
            >
              <label>
                Company name
                <input type="text" name="company" placeholder="Your company" required />
              </label>
              <label>
                Business email
                <input type="email" name="email" placeholder="name@company.com" required />
              </label>
              <label>
                Primary market
                <input type="text" name="market" placeholder="Country / region" required />
              </label>
              <label>
                Products of interest
                <select name="products" defaultValue="">
                  <option value="" disabled>Select a category</option>
                  <option>Tesla storage and organization</option>
                  <option>Tesla interior protection</option>
                  <option>Tesla hooks and holders</option>
                  <option>Vehicle charging accessories</option>
                  <option>Connectivity and camera protection</option>
                  <option>Multiple categories</option>
                </select>
              </label>
              <label className="form-wide">
                Requirements
                <textarea
                  name="requirements"
                  rows={4}
                  placeholder="Vehicle models, target price, annual volume, private label needs…"
                />
              </label>
              <button className="button button-primary form-wide" type="submit">
                Prepare wholesale enquiry <span aria-hidden="true">↗</span>
              </button>
              <p className="form-note form-wide">
                Your information is used only to prepare a relevant B2B response.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-main">
          <a className="brand brand-footer" href="#top" aria-label="TINKON home">
            <span className="brand-mark" aria-hidden="true">T</span>
            <span className="brand-copy">
              <span className="brand-word">TINKON</span>
              <span className="brand-tag">GLOBAL SUPPLY</span>
            </span>
          </a>
          <p>
            Dongguan TinKon Technology Co., Ltd. — OEM and ODM electric vehicle
            accessories for global distributors, importers and private-label brands.
          </p>
          <div className="footer-links">
            <a href="https://tinkontech.com">tinkontech.com</a>
            <a href="mailto:allen@tinkontech.com">allen@tinkontech.com</a>
            <Link href="/products">Products</Link>
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
