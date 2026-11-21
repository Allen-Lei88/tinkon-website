import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileNavigation from "@/components/MobileNavigation";
import { getProductCategoryByName } from "@/data/productCategories";
import { categories, products } from "@/data/products";
import {
  COMPANY_ADDRESS_EN,
  COMPANY_POSITIONING_EN,
  getWhatsAppUrl,
  WHATSAPP_DISPLAY,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "Wholesale Car Organizers & EV Accessories | TINKON",
  description:
    "Browse TINKON model-specific car organizers and automotive storage accessories, plus EV protection, charging and interior products with OEM/ODM support.",
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    url: "/products",
    siteName: "TINKON",
    title: "Wholesale Car Organizers & EV Accessories | TINKON",
    description:
      "Browse TINKON model-specific car organizers and automotive storage accessories, plus EV protection, charging and interior products with OEM/ODM support.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "TINKON wholesale car organizers and electric vehicle accessories",
      },
    ],
  },
};

const categoryIds: Record<string, string> = {
  "Tesla Storage & Organization": "tesla-storage",
  "Tesla Interior Protection": "tesla-protection",
  "Tesla Cybertruck Accessories": "tesla-cybertruck-accessories",
  "Automotive Interior Accessories": "automotive-interior-accessories",
  "Tesla Exterior Protection": "tesla-exterior-protection",
  "Rivian Interior Protection": "rivian-interior-protection",
  "Rivian Storage & Organization": "rivian-storage",
  "Automotive Screen Protectors": "automotive-screen-protectors",
  "Tesla Hooks & Holders": "tesla-hooks",
  "Vehicle Charging & Accessories": "vehicle-accessories",
};

export default function ProductsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TINKON Wholesale Car Organizers and EV Accessories",
    url: "https://tinkontech.com/products",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://tinkontech.com/products/${product.slug}`,
        name: product.fullTitle,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>TINKON · WHOLESALE PRODUCT CATALOG · OEM / ODM</span>
          <a href="mailto:allen@tinkontech.com">allen@tinkontech.com ↗</a>
        </div>
      </div>

      <header className="site-header">
        <div className="shell nav-row">
          <Link className="brand" href="/" aria-label="TINKON home">
            <Image className="brand-logo" src="/tinkon-logo.png" alt="" width={46} height={46} priority />
            <span className="brand-copy">
              <span className="brand-word">TINKON</span>
              <span className="brand-tag">GLOBAL SUPPLY</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Catalog navigation">
            <Link href="/">Home</Link>
            <a href="#categories">Categories</a>
            <a href="#downloads">Catalogs</a>
          </nav>
          <a className="nav-cta" href="mailto:allen@tinkontech.com?subject=TINKON%20Product%20Enquiry">
            Request a quotation <span aria-hidden="true">↗</span>
          </a>
          <MobileNavigation>
            <Link href="/">Home</Link>
            <a href="#categories">Categories</a>
            <a href="#downloads">Download catalogs</a>
            <a href="mailto:allen@tinkontech.com?subject=TINKON%20Product%20Enquiry">Request a quotation</a>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </MobileNavigation>
        </div>
      </header>

      <main>
        <section className="catalog-hero">
          <div className="shell catalog-hero-grid">
            <div>
              <p className="section-index">TINKON / PRODUCT CATALOG</p>
              <h1>Wholesale car organizers &amp; EV accessories.<br />Built for B2B buyers.</h1>
            </div>
            <div>
              <p>
                Start with model-specific console, seat, dashboard, door and cargo
                organizers, then add selected protection, charging and interior
                accessories. Fitment is confirmed before bulk orders.
              </p>
              <div className="catalog-stat-row">
                <span><strong>FIT</strong> vehicle-specific storage</span>
                <span><strong>OEM</strong> logo & packaging</span>
                <span><strong>B2B</strong> quotation support</span>
              </div>
            </div>
          </div>
        </section>

        <section className="catalog-category-nav" id="categories">
          <div className="shell">
            {categories.map((category) => {
              const categoryInfo = getProductCategoryByName(category);
              if (!categoryInfo) return null;
              return (
                <Link href={`/products/category/${categoryInfo.slug}`} key={category}>
                  {category}
                </Link>
              );
            })}
          </div>
        </section>

        {categories.map((category, categoryIndex) => {
          const categoryProducts = products.filter((product) => product.category === category);
          const categoryInfo = getProductCategoryByName(category);
          if (!categoryInfo) return null;
          return (
            <section className="catalog-section" id={categoryIds[category]} key={category}>
              <div className="shell">
                <div className="catalog-section-heading">
                  <p className="section-index">{String(categoryIndex + 1).padStart(2, "0")} / PRODUCT GROUP</p>
                  <h2>
                    <Link href={`/products/category/${categoryInfo.slug}`}>{category}</Link>
                  </h2>
                  <div className="catalog-section-meta">
                    <span>{categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"}</span>
                    <Link href={`/products/category/${categoryInfo.slug}`}>View category</Link>
                  </div>
                </div>
                <div className="catalog-grid">
                  {categoryProducts.map((product) => (
                    <article className="catalog-card" key={product.slug}>
                      <Link className="catalog-card-image" href={`/products/${product.slug}`}>
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          width={800}
                          height={800}
                          sizes="(max-width: 580px) 100vw, (max-width: 1050px) 50vw, (max-width: 1288px) 33vw, 400px"
                        />
                      </Link>
                      <div className="catalog-card-copy">
                        <p>{product.category}</p>
                        <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
                        <span>{product.description}</span>
                        <Link className="catalog-card-link" href={`/products/${product.slug}`}>
                          View specifications <b aria-hidden="true">↗</b>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="catalog-downloads" id="downloads">
          <div className="shell catalog-downloads-grid">
            <div>
              <p className="section-index">DOWNLOADABLE CATALOGS</p>
              <h2>Share the range with your buying team.</h2>
            </div>
            <div className="download-list">
              <a href="/downloads/TINKON_Tesla_Accessories_Catalogue_2026.pdf" download>
                <span>Tesla Accessories Catalog 2026</span><b>PDF ↓</b>
              </a>
              <a href="/downloads/TINKON_Product_Catalogue_2026.pdf" download>
                <span>TINKON Product Catalog 2026</span><b>PDF ↓</b>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-main catalog-footer">
          <Link className="brand brand-footer" href="/" aria-label="TINKON home">
            <Image className="brand-logo" src="/tinkon-logo.png" alt="" width={52} height={52} />
            <span className="brand-copy"><span className="brand-word">TINKON</span><span className="brand-tag">GLOBAL SUPPLY</span></span>
          </Link>
          <p>
            {COMPANY_POSITIONING_EN}
            <span className="company-address">{COMPANY_ADDRESS_EN}</span>
          </p>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <a href="mailto:allen@tinkontech.com">allen@tinkontech.com</a>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
