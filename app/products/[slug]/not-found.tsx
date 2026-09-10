import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="not-found-page">
      <p className="section-index">PRODUCT NOT FOUND</p>
      <h1>This product page is unavailable.</h1>
      <p>Browse the current TINKON wholesale range or contact our team for a model-specific request.</p>
      <Link className="button button-primary" href="/products">View all products ↗</Link>
    </main>
  );
}
