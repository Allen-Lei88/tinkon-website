import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileNavigation from "@/components/MobileNavigation";
import { COMPANY_ADDRESS_EN, COMPANY_POSITIONING_EN, getWhatsAppUrl } from "@/lib/contact";

const origin = "https://tinkontech.com";
const title = "About TINKON | EV Interior Accessories Supply Partner";
const description = "Meet TINKON, the Dongguan-based wholesale supply partner for Tesla and EV interior accessories. Learn how we confirm fitment, samples, packaging and shipment requirements.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about", siteName: "TINKON", type: "website" },
  twitter: { card: "summary", title, description },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "AboutPage", "@id": `${origin}/about#page`, url: `${origin}/about`, name: title,
      mainEntity: { "@id": `${origin}/#organization` }, breadcrumb: { "@id": `${origin}/about#breadcrumbs` } },
    { "@type": "BreadcrumbList", "@id": `${origin}/about#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      { "@type": "ListItem", position: 2, name: "About TINKON", item: `${origin}/about` },
    ] },
  ],
};

const checks = [
  ["Confirm fitment", "Match the vehicle model, year, trim and sales market. Compare the actual console or interior layout with the sample before approving a range."],
  ["Review a sample", "Check fit, clearance, finish and installation. Agree which parts and documents will be used as the reference for the order."],
  ["Approve packaging", "Review retail labels and instructions, then ask for units per carton, carton dimensions and gross weight before estimating freight."],
  ["Agree order terms", "Confirm model-specific MOQ, sampling arrangements, lead time, payment terms, shipping method and Incoterm on the written quote."],
];

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="site-header">
        <div className="shell nav-row">
          <Link className="brand" href="/" aria-label="TINKON home">
            <Image className="brand-logo" src="/tinkon-logo.png" alt="TINKON logo" width={46} height={46} />
            <span className="brand-copy"><span className="brand-word">TINKON</span><span className="brand-tag">GLOBAL SUPPLY</span></span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/products">Products</Link><Link href="/about" aria-current="page">About TINKON</Link><a href="#buyer-guide">Buyer guide</a>
          </nav>
          <Link className="nav-cta" href="/#inquiry">Request a quotation</Link>
          <MobileNavigation>
            <Link href="/">Home</Link><Link href="/products">Products</Link><a href="#buyer-guide">Buyer guide</a><Link href="/#inquiry">Request a quotation</Link>
          </MobileNavigation>
        </div>
      </header>
      <main className="about-page">
        <section className="about-hero">
          <div className="shell about-intro">
            <nav className="about-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About TINKON</span></nav>
            <p className="section-index">Dongguan · Wholesale · OEM / ODM</p>
            <h1>About TINKON</h1>
            <p className="about-lede">Dongguan TinKon Technology Co., Ltd. is an independent supply partner for wholesale Tesla and EV interior accessories. Our focus is vehicle-specific car organizers and compatible products for distributor, importer and private-label ranges.</p>
            <div className="about-action-row"><Link href="/products" className="button button-primary">Explore products</Link><Link href="/#inquiry" className="text-link">Discuss a wholesale project</Link></div>
          </div>
        </section>
        <section className="shell about-block" aria-labelledby="about-supply">
          <div>
            <p className="section-index">How we work</p>
            <h2 id="about-supply">Product development and factory coordination</h2>
          </div>
          <div className="about-rich-copy">
            <p>Founded in 2011 and based in Dongguan, China, TINKON has a five-member engineering and product-development team. We coordinate development, sampling, production requirements and packaging with manufacturing partners selected for the project.</p>
            <p>We support wholesale buyers in North America, the UK, Europe and Australia. Before a bulk order, agree the exact vehicle fitment, sample requirements, quality checks and packout with us. If a program requires certification or a test report, ask us to verify the documentation for the exact product and market.</p>
            <p>For model-specific automotive screen protectors, see our specialist site, <a href="https://autoscreenprotector.com/">AutoScreenProtector</a>.</p>
          </div>
        </section>
        <section className="about-guide" id="buyer-guide" aria-labelledby="about-guide-heading">
          <div className="shell about-block">
            <div>
              <p className="section-index">Wholesale buyer guide</p>
              <h2 id="about-guide-heading">What to confirm before ordering EV interior accessories</h2>
              <p>Use the checklist for an initial assortment or a repeat order with a vehicle or packaging change.</p>
            </div>
            <ol className="about-checklist">
              {checks.map(([label, copy]) => <li key={label}><h3>{label}</h3><p>{copy}</p></li>)}
            </ol>
          </div>
        </section>
        <section className="shell about-block" id="enquiry-privacy" aria-labelledby="about-enquiry-heading">
          <div><p className="section-index">Business enquiries</p><h2 id="about-enquiry-heading">Contact and enquiry details</h2></div>
          <div className="about-rich-copy">
            <p>When you submit the wholesale form, TINKON uses your contact details, requirements and any attached file to handle and reply to the enquiry. Share only information you are authorized to send; don’t include payment details, passwords or personal identity documents.</p>
            <address>{COMPANY_ADDRESS_EN}</address>
            <div className="about-action-row"><a className="text-link" href="mailto:allen@tinkontech.com">allen@tinkontech.com</a><a className="text-link" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
          </div>
        </section>
      </main>
      <footer>
        <div className="shell footer-main catalog-footer">
          <Link className="brand brand-footer" href="/" aria-label="TINKON home"><Image className="brand-logo" src="/tinkon-logo.png" alt="TINKON logo" width={46} height={46} /><span className="brand-copy"><span className="brand-word">TINKON</span><span className="brand-tag">GLOBAL SUPPLY</span></span></Link>
          <p>{COMPANY_POSITIONING_EN}<span className="company-address">{COMPANY_ADDRESS_EN}</span></p>
          <div className="footer-links"><Link href="/products">Products</Link><Link href="/#inquiry">Wholesale enquiry</Link></div>
        </div>
      </footer>
    </>
  );
}
