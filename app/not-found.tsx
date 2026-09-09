import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <p>The page you requested may have moved or is not available.</p>
        <Link className="button" href="/">Return home</Link>
      </div>
    </section>
  );
}
