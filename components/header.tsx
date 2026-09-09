import Link from "next/link";

const links = [
  { href: "/products", label: "Products" },
  { href: "/oem-odm", label: "OEM / ODM" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label="TINKON home">
          <span className="brand-mark">T</span>
          <span>TINKON</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className="button button-small" href="/contact">
            Start a project
          </Link>
        </nav>

        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <div className="mobile-nav-panel">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
