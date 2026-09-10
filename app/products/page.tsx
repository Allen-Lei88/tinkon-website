import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Wholesale EV & Technology Accessories | TINKON",
  description:
    "Browse TINKON wholesale accessories for Tesla and other electric vehicles, vehicle charging, Starlink and DJI-compatible protection. OEM and ODM support available.",
  alternates: { canonical: "https://tinkontech.com/products" },
};

const categoryIds: Record<string, string> = {
  "Tesla Storage & Organization": "tesla-storage",
  "Tesla Interior Protection": "tesla-protection",
  "Tesla Hooks & Holders": "tesla-hooks",
  "Vehicle Charging & Accessories": "vehicle-accessories",
  "Connectivity & Camera Protection": "technology-accessories",
};

export default function ProductsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TINKON Wholesale Product Catalog",
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
            <span className="brand-mark" aria-hidden="true">T</span>
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
        </div>
      </header>

      <main>
        <section className="catalog-hero">
          <div className="shell catalog-hero-grid">
            <div>
              <p className="section-index">TINKON / PRODUCT CATALOG</p>
              <h1>{products.length} products.<br />Built for wholesale.</h1>
            </div>
            <div>
              <p>
                Model-focused accessories prepared for distributors, importers,
                retailers and private-label programs. Specifications are presented
                conservatively and fitment is confirmed before bulk orders.
              </p>
              <div className="catalog-stat-row">
                <span><strong>{categories.length}</strong> product groups</span>
                <span><strong>OEM</strong> logo & packaging</span>
                <span><strong>B2B</strong> quotation support</span>
              </div>
            </div>
          </div>
        </section>

        <section className="catalog-category-nav" id="categories">
          <div className="shell">
            {categories.map((category) => (
              <a href={`#${categoryIds[category]}`} key={category}>{category}</a>
            ))}
          </div>
        </section>

        {categories.map((category, categoryIndex) => {
          const categoryProducts = products.filter((product) => product.category === category);
          return (
            <section className="catalog-section" id={categoryIds[category]} key={category}>
              <div className="shell">
                <div className="catalog-section-heading">
                  <p className="section-index">{String(categoryIndex + 1).padStart(2, "0")} / PRODUCT GROUP</p>
                  <h2>{category}</h2>
                  <span>{categoryProducts.length} products</span>
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
                          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
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
            <span className="brand-mark" aria-hidden="true">T</span>
            <span className="brand-copy"><span className="brand-word">TINKON</span><span className="brand-tag">GLOBAL SUPPLY</span></span>
          </Link>
          <p>OEM and ODM accessories for global distributors, importers and private-label brands.</p>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <a href="mailto:allen@tinkontech.com">allen@tinkontech.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
