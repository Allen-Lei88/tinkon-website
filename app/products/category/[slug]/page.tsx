import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductCategoryBySlug, productCategories } from "@/data/productCategories";
import { products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

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
          </nav>
          <a
            className="nav-cta"
            href={`mailto:allen@tinkontech.com?subject=${encodeURIComponent(`Wholesale category enquiry: ${category.name}`)}`}
          >
            Request a quotation <span aria-hidden="true">↗</span>
          </a>
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
                    <h2><Link href={`/products/${product.slug}`}>{product.name}</Link></h2>
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
            <a
              className="button button-primary"
              href={`mailto:allen@tinkontech.com?subject=${encodeURIComponent(`Wholesale range request: ${category.name}`)}`}
            >
              Request this product range <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-main catalog-footer">
          <Link className="brand brand-footer" href="/" aria-label="TINKON home">
            <Image className="brand-logo" src="/tinkon-logo.png" alt="" width={52} height={52} />
            <span className="brand-copy"><span className="brand-word">TINKON</span><span className="brand-tag">GLOBAL SUPPLY</span></span>
          </Link>
          <p>Dongguan TinKon Technology Co., Ltd. — OEM and ODM accessories for global B2B buyers.</p>
          <div className="footer-links">
            <Link href="/products">All products</Link>
            <a href="mailto:allen@tinkontech.com">allen@tinkontech.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
