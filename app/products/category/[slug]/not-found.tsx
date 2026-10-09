import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product Category Not Found | TINKON",
  robots: { index: false, follow: false },
};

export default function CategoryNotFound() {
  return (
    <main className="not-found-page">
      <p className="section-index">404 / CATEGORY NOT FOUND</p>
      <h1>This product category is not available.</h1>
      <p>Browse the current TINKON wholesale catalog to find active product groups and individual product pages.</p>
      <Link className="button button-primary" href="/products">View all products</Link>
    </main>
  );
}
