# TINKON Website

Official B2B product website for Dongguan TinKon Technology Co., Ltd.

- Website: https://tinkontech.com
- Enquiries: allen@tinkontech.com
- Audience: overseas distributors, importers, wholesalers and private-label brands

## Website structure

- `/` — company and wholesale overview
- `/products` — complete product catalog
- `/products/[slug]` — indexable product specification pages
- `/sitemap.xml` — homepage, catalog and product URLs for search engines

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run lint
```

## Product updates

Product text is maintained in `data/products.ts`. Web-ready product images are stored in `public/catalog/`. Keep configurations separate, use verified specifications only, and preserve compatibility and trademark notes.

Production deployment is managed through the dedicated GitHub branch connected to the existing Vercel project. Review the Vercel preview before promoting a product update to `tinkontech.com`.
