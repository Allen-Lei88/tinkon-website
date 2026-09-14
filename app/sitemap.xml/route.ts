import { products } from "@/data/products";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sitemapEntry(url: string) {
  return `  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`;
}

export async function GET() {
  const origin = "https://tinkontech.com";
  const urls = [
    origin,
    `${origin}/products`,
    ...products.map((product) => `${origin}/products/${product.slug}`),
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
