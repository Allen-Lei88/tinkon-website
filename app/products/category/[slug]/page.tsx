import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileNavigation from "@/components/MobileNavigation";
import { notFound } from "next/navigation";
import { getProductCategoryBySlug, productCategories } from "@/data/productCategories";
import { products } from "@/data/products";
import {
  COMPANY_ADDRESS_EN,
  COMPANY_POSITIONING_EN,
  getWhatsAppUrl,
  WHATSAPP_DISPLAY,
} from "@/lib/contact";
import styles from "./specialist.module.css";

type Props = { params: Promise<{ slug: string }> };

const screenProtectorHighlights = new Set([
  "tesla-model-y-yl-screen-protector",
  "bmw-x1-ix1-integrated-display-screen-protector",
  "byd-seal-screen-protectors",
  "geely-galaxy-e5-ex5-screen-protector",
]);

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getProductCategoryBySlug(slug);
  if (!category) {
    return {
      title: "Product Category Not Found | TINKON",
      robots: { index: false, follow: false },
    };
  }

  const categoryProducts = products.filter((product) => product.category === category.name);
  const url = `https://tinkontech.com/products/category/${category.slug}`;
  const image = categoryProducts[0];

  return {
    title: `${category.title} | TINKON`,
    description: category.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "TINKON",
      title: category.title,
      description: category.metaDescription,
      images: image
        ? [{ url: image.image, width: 800, height: 800, alt: image.imageAlt }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: category.title,
      description: category.metaDescription,
      images: image ? [image.image] : [],
    },
  };
}

export default async function ProductCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getProductCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = products.filter((product) => product.category === category.name);
  if (categoryProducts.length === 0) notFound();

  const categoryUrl = `https://tinkontech.com/products/category/${category.slug}`;
  const inquiryUrl = `/?category=${encodeURIComponent(category.slug)}#inquiry`;
  const isScreenProtector = category.slug === "automotive-screen-protectors";
  const showcaseProducts = isScreenProtector
    ? categoryProducts.filter((product) => screenProtectorHighlights.has(product.slug))
    : categoryProducts;
  const remainingProducts = isScreenProtector
    ? categoryProducts.filter((product) => !screenProtectorHighlights.has(product.slug))
    : [];
  const CardTitle = isScreenProtector ? "h3" : "h2";
  const categoryWhatsAppUrl = getWhatsAppUrl(
    `Hello TINKON, I'm interested in your ${category.name} range. Please send me wholesale information.`,
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${categoryUrl}#collection`,
        url: categoryUrl,
        name: category.title,
        description: category.metaDescription,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: categoryProducts.length,
          itemListElement: categoryProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://tinkontech.com/products/${product.slug}`,
            name: product.fullTitle,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://tinkontech.com" },
          { "@type": "ListItem", position: 2, name: "Products", item: "https://tinkontech.com/products" },
          { "@type": "ListItem", position: 3, name: category.name, item: categoryUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>TINKON · WHOLESALE PRODUCT CATEGORY · OEM / ODM</span>
          <a href="mailto:allen@tinkontech.com">allen@tinkontech.com ↗</a>
        </div>
      </div>

      <header className="site-header">
        <div className="shell nav-row detail-nav-row">
          <Link className="brand" href="/" aria-label="TINKON home">
            <Image className="brand-logo" src="/tinkon-logo.png" alt="" width={46} height={46} priority />
            <span className="brand-copy">
              <span className="brand-word">TINKON</span>
              <span className="brand-tag">GLOBAL SUPPLY</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Category navigation">
            <Link href="/">Home</Link>
            <Link href="/products">All products</Link>
            <Link href="/about">About</Link>
          </nav>
          <Link className="nav-cta" href={inquiryUrl}>
            Request a quotation
          </Link>
          <MobileNavigation>
            <Link href="/">Home</Link>
            <Link href="/products">All products</Link>
            <Link href="/about">About</Link>
            <Link href={inquiryUrl}>Request a quotation</Link>
            <a href={categoryWhatsAppUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </MobileNavigation>
        </div>
      </header>

      <main className="category-page-main">
        <div className="shell breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><b>{category.name}</b>
        </div>

        <section className="category-page-hero shell">
          <div>
            <p className="section-index">WHOLESALE PRODUCT CATEGORY</p>
            <h1>{category.title}</h1>
          </div>
          <div className="category-page-intro">
            <p>{category.intro}</p>
            <span>{categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"} in this category</span>
          </div>
        </section>

        <section className="category-product-section">
          <div className="shell">
            {isScreenProtector && (
              <>
                <aside className={styles.specialistPanel} aria-labelledby="specialist-site-title">
                  <div>
                    <p className="section-index">TINKON SPECIALIST SITE</p>
                    <h2 id="specialist-site-title">Sourcing automotive screen protectors?</h2>
                    <p>Explore vehicle-specific display coverage and fitment guides on our dedicated AutoScreenProtector website.</p>
                  </div>
                  <a className="button button-primary" href="https://autoscreenprotector.com/">View the specialist range</a>
                </aside>
                <h2 className={styles.selectedHeading}>Selected products from the TINKON catalog</h2>
              </>
            )}
            <div className="catalog-grid">
              {showcaseProducts.map((product) => (
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
                    <CardTitle><Link href={`/products/${product.slug}`}>{product.name}</Link></CardTitle>
                    <span>{product.description}</span>
                    <Link className="catalog-card-link" href={`/products/${product.slug}`}>
                      View specifications <b aria-hidden="true">↗</b>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            {remainingProducts.length > 0 && (
              <section className={styles.remainingLinks} aria-labelledby="remaining-protectors-title">
                <h2 id="remaining-protectors-title">More screen protector listings</h2>
                <ul>
                  {remainingProducts.map((product) => (
                    <li key={product.slug}><Link href={`/products/${product.slug}`}>{product.name}</Link></li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </section>

        <section className="category-buyer-guide">
          <div className="shell category-buyer-guide-grid">
            <div className="category-buyer-guide-heading">
              <p className="section-index">WHOLESALE BUYER GUIDE</p>
              <h2>Questions about {category.name}</h2>
              <p>
                Use these points to prepare a clearer product enquiry. Exact specifications,
                fitment and commercial terms remain subject to product review.
              </p>
            </div>
            <div className="category-buyer-questions">
              {category.buyerQuestions.map(({ question, answer }) => (
                <details key={question}>
                  <summary>
                    <span>{question}</span>
                    <b aria-hidden="true">+</b>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="category-sourcing-section">
          <div className="shell category-sourcing-grid">
            <div>
              <p className="section-index">WHOLESALE REVIEW</p>
              <h2>Confirm the right range for your market.</h2>
              <p>
                Share your target country, sales channel, preferred products and estimated volume.
                Final specifications, fitment, packaging and commercial terms are confirmed before quotation.
              </p>
            </div>
            <ul>
              {category.sourcingNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
            <div className="category-contact-actions">
              <Link className="button button-primary" href={inquiryUrl}>
                Request a quotation
              </Link>
              <a className="button button-whatsapp" href={categoryWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp us <span aria-hidden="true">↗</span>
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
            <Link href="/products">All products</Link>
            <Link href="/about">About</Link>
            <a href="mailto:allen@tinkontech.com">allen@tinkontech.com</a>
            <a href={categoryWhatsAppUrl} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
