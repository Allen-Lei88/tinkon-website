import Link from "next/link";

const categories = [
  {
    number: "01",
    title: "EV & Automotive",
    text: "Fit-focused accessories for Tesla, BYD, Rivian and other vehicle programs.",
    tags: ["Interior organizers", "Protection", "Charging"],
  },
  {
    number: "02",
    title: "Screen Protection",
    text: "Tempered glass solutions for vehicle displays, phones, tablets and other devices.",
    tags: ["Clear", "Anti-glare", "Custom fit"],
  },
  {
    number: "03",
    title: "Mobile Accessories",
    text: "Phone cases, charging products, stands and holders developed for branded retail programs.",
    tags: ["Protection", "Charging", "Private label"],
  },
  {
    number: "04",
    title: "Computer & Custom",
    text: "Tablet and computer accessories, mouse pads, promotional products and custom silicone items.",
    tags: ["Computer", "Promotional", "Silicone"],
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
            <p className="eyebrow eyebrow-light">One-stop OEM manufacturing since 2011</p>
            <h1>EV, mobile and computer accessories—from concept to delivery.</h1>
            <p className="hero-lede">
              TINKON provides OEM, ODM and private-label solutions for global brands,
              distributors, importers and e-commerce sellers.
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
            <p className="panel-kicker">Engineering & product development</p>
            <p className="panel-number">5</p>
            <p className="panel-copy">
              A focused team coordinating ideas, engineering decisions and the path
              to production.
            </p>
            <div className="panel-grid">
              <span>Industrial design</span>
              <span>Mechanical design</span>
              <span>Product engineering</span>
              <span>Packaging & private label</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <span>Established in 2011</span>
          <span>OEM / ODM / Private label</span>
          <span>One-stop development</span>
          <span>Global supply coordination</span>
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
