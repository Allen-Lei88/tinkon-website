import Link from "next/link";

const categories = [
  {
    number: "01",
    title: "Mobile Accessories",
    text: "Cases, screen protection, charging products and everyday device accessories developed for retail programs.",
    tags: ["Protection", "Charging", "Retail-ready"],
  },
  {
    number: "02",
    title: "EV & Automotive",
    text: "Purpose-built storage, mounting, interior protection and convenience accessories for modern vehicles.",
    tags: ["Tesla & EV", "Interior", "Fit-tested"],
  },
  {
    number: "03",
    title: "Promotional Technology",
    text: "Custom-branded technology products designed for campaigns, corporate programs and gifting.",
    tags: ["Custom logo", "Packaging", "Program support"],
  },
];

const process = [
  ["Brief", "Market, target price, quantity and compliance requirements."],
  ["Develop", "Structure, materials, finish and packaging are aligned."],
  ["Validate", "Samples are reviewed before production is released."],
  ["Deliver", "Production progress, inspection and shipping are coordinated."],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-light">Technology accessory development</p>
            <h1>Built for your market. Developed around your brief.</h1>
            <p className="hero-lede">
              TINKON helps importers, retailers and brands turn product ideas into
              production-ready mobile and automotive accessories.
            </p>
            <div className="button-row">
              <Link className="button button-light" href="/products">
                Explore capabilities
              </Link>
              <Link className="text-link text-link-light" href="/contact">
                Discuss a project <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="hero-panel" aria-label="TINKON capability overview">
            <div className="signal signal-one" />
            <div className="signal signal-two" />
            <p className="panel-kicker">From concept to shipment</p>
            <p className="panel-number">360°</p>
            <p className="panel-copy">
              One coordinated workflow across product design, engineering,
              production and delivery.
            </p>
            <div className="panel-grid">
              <span>Industrial design</span>
              <span>Mechanical design</span>
              <span>Supplier network</span>
              <span>Quality control</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <span>OEM / ODM</span>
          <span>Product engineering</span>
          <span>Packaging support</span>
          <span>International supply</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What we develop</p>
              <h2>Focused product categories</h2>
            </div>
            <Link className="text-link" href="/products">
              View all capabilities <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.number}>
                <span className="category-number">{category.number}</span>
                <h3>{category.title}</h3>
                <p>{category.text}</p>
                <div className="tag-row">
                  {category.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-blueprint">
        <div className="container blueprint-grid">
          <div>
            <p className="eyebrow">A practical workflow</p>
            <h2>Clarity at every development stage.</h2>
            <p className="section-lede">
              We organize the technical details early, so sampling, production
              and delivery can move with fewer surprises.
            </p>
            <Link className="button" href="/oem-odm">
              See how we work
            </Link>
          </div>
          <ol className="process-list">
            {process.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container cta-panel">
          <div>
            <p className="eyebrow eyebrow-light">Your next product</p>
            <h2>Bring us the brief. We’ll help define the path forward.</h2>
          </div>
          <Link className="button button-light" href="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
