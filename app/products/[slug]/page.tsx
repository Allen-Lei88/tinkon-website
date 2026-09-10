import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const description = `${product.description} Wholesale enquiries and OEM/ODM customization from TINKON.`;
  const url = `https://tinkontech.com/products/${product.slug}`;

  return {
    title: `${product.name} | TINKON Wholesale`,
    description,
    keywords: product.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: product.fullTitle,
      description,
      images: [{ url: product.image, width: 800, height: 800, alt: product.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.fullTitle,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullTitle,
    image: `https://tinkontech.com${product.image}`,
    description: product.description,
    sku: product.model,
    brand: { "@type": "Brand", name: "TINKON" },
    category: product.category,
    audience: { "@type": "BusinessAudience", audienceType: "Distributors, importers and wholesalers" },
    manufacturer: { "@type": "Organization", name: "Dongguan TinKon Technology Co., Ltd." },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>TINKON · WHOLESALE · OEM / ODM</span>
          <a href="mailto:allen@tinkontech.com">allen@tinkontech.com ↗</a>
        </div>
      </div>

      <header className="site-header">
        <div className="shell nav-row detail-nav-row">
          <Link className="brand" href="/" aria-label="TINKON home">
            <span className="brand-mark" aria-hidden="true">T</span>
            <span className="brand-copy"><span className="brand-word">TINKON</span><span className="brand-tag">GLOBAL SUPPLY</span></span>
          </Link>
          <nav className="desktop-nav" aria-label="Product navigation">
            <Link href="/">Home</Link>
            <Link href="/products">All products</Link>
          </nav>
          <a className="nav-cta" href={`mailto:allen@tinkontech.com?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}`}>
            Request a quotation <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main className="product-detail-main">
        <div className="shell breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><b>{product.name}</b>
        </div>

        <section className="product-detail-hero shell">
          <div className="product-detail-image">
            <Image src={product.image} alt={product.imageAlt} width={1000} height={1000} priority sizes="(max-width: 900px) 100vw, 52vw" />
          </div>
          <div className="product-detail-copy">
            <p className="section-index">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="product-full-title">{product.fullTitle}</p>
            {product.model && <p className="product-model">Model: <strong>{product.model}</strong></p>}
            <p className="product-intro">{product.description}</p>
            <ul className="product-feature-list">
              {product.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <a className="button button-primary product-enquiry-button" href={`mailto:allen@tinkontech.com?subject=${encodeURIComponent(`Wholesale enquiry: ${product.name}`)}`}>
              Enquire about this product <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="product-spec-section">
          <div className="shell product-spec-grid">
            <div>
              <p className="section-index">PRODUCT PARAMETERS</p>
              <h2>Specification overview</h2>
              <p className="spec-note">Final specifications, fitment and packaging are confirmed with the buyer before quotation and production.</p>
            </div>
            <dl>
              {product.parameters.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
              <div><dt>OEM / ODM</dt><dd>Available for logo, color, packaging and private-label requirements</dd></div>
              <div><dt>Application</dt><dd>{product.application}</dd></div>
            </dl>
          </div>
        </section>

        <section className="product-partner-section">
          <div className="shell partner-strip">
            <p className="section-index">WHOLESALE SUPPORT</p>
            <h2>Build this product for your market.</h2>
            <p>Share your target country, vehicle version, preferred packaging and estimated volume. TINKON will coordinate samples, customization and production follow-up.</p>
            <a className="text-link" href={`mailto:allen@tinkontech.com?subject=${encodeURIComponent(`OEM/ODM request: ${product.name}`)}`}>allen@tinkontech.com <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        {related.length > 0 && (
          <section className="related-products">
            <div className="shell">
              <div className="related-heading"><p className="section-index">RELATED PRODUCTS</p><Link href="/products">View full catalog ↗</Link></div>
              <div className="related-grid">
                {related.map((item) => (
                  <Link href={`/products/${item.slug}`} key={item.slug}>
                    <Image src={item.image} alt={item.imageAlt} width={800} height={800} sizes="(max-width: 760px) 100vw, 33vw" />
                    <h3>{item.name}</h3>
                    <span>View specifications ↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <p className="shell trademark-note">
          Vehicle, Starlink and DJI names are trademarks of their respective owners and are used only to identify compatibility. TINKON is an independent aftermarket accessories supplier and is not affiliated with or endorsed by those owners.
        </p>
      </main>

      <footer>
        <div className="shell footer-main catalog-footer">
          <Link className="brand brand-footer" href="/"><span className="brand-mark" aria-hidden="true">T</span><span className="brand-copy"><span className="brand-word">TINKON</span><span className="brand-tag">GLOBAL SUPPLY</span></span></Link>
          <p>Dongguan TinKon Technology Co., Ltd. — OEM and ODM accessories for global B2B buyers.</p>
          <div className="footer-links"><Link href="/products">All products</Link><a href="mailto:allen@tinkontech.com">allen@tinkontech.com</a></div>
        </div>
      </footer>
    </>
  );
}
