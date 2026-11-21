import { productCategories } from "@/data/productCategories";
import { products } from "@/data/products";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

type SitemapUrl = {
  url: string;
  lastModified?: string;
};

function sitemapEntry({ url, lastModified }: SitemapUrl) {
  const lastModifiedEntry = lastModified
    ? `\n    <lastmod>${escapeXml(lastModified)}</lastmod>`
    : "";
  return `  <url>
    <loc>${escapeXml(url)}</loc>${lastModifiedEntry}
  </url>`;
}

export async function GET() {
  const origin = "https://tinkontech.com";
  // Keep these dates tied to significant, verified page changes. Do not stamp
  // every build as a fresh update: Google can ignore inaccurate lastmod data.
  const homepageLastModified = "2026-11-21";
  const catalogLastModified = "2026-11-21";
  const categoryLastModified = "2026-11-11";
  const teslaStorageLastModified = "2026-11-21";
  const urls = [
    { url: origin, lastModified: homepageLastModified },
    { url: `${origin}/products`, lastModified: catalogLastModified },
    ...productCategories.map((category) => ({
      url: `${origin}/products/category/${category.slug}`,
      lastModified: category.slug === "tesla-storage-organization"
        ? teslaStorageLastModified
        : categoryLastModified,
    })),
    ...products.map((product) => ({ url: `${origin}/products/${product.slug}` })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(sitemapEntry).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
