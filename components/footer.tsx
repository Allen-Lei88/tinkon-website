import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand brand-light" href="/">
            <span className="brand-mark">T</span>
            <span>TINKON</span>
          </Link>
          <p className="footer-copy">
            Product development and supply support for technology accessories.
          </p>
        </div>
        <div>
          <p className="footer-title">Company</p>
          <Link href="/products">Products</Link>
          <Link href="/oem-odm">OEM / ODM</Link>
          <Link href="/about">About us</Link>
        </div>
        <div>
          <p className="footer-title">Contact</p>
          <Link href="/contact">Send an inquiry</Link>
          <p>Dongguan, Guangdong, China</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Dongguan TinKon Technology Co., Ltd.</span>
        <span>Built for international business.</span>
      </div>
    </footer>
  );
}
