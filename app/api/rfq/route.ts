import { getProductCategoryBySlug } from "@/data/productCategories";
import { products } from "@/data/products";
import { createRfqHandler } from "@/lib/rfq";
import { RfqTransportError } from "@/lib/rfqMail";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 25;

const handler = createRfqHandler({
  // This release is contact-only. Activating delivery requires separate approval
  // and a reviewed change to this route, not just a pre-existing environment variable.
  credentials: () => null,
  async dispatch() {
    throw new RfqTransportError(false);
  },
  lookup({ productSlug, categorySlug }) {
    if (productSlug) {
      const product = products.find((item) => item.slug === productSlug);
      return product ? { label: product.fullTitle, path: "/products/" + product.slug, sku: product.model } : null;
    }
    if (categorySlug) {
      const category = getProductCategoryBySlug(categorySlug);
      return category ? { label: category.title, path: "/products/category/" + category.slug } : null;
    }
    return null;
  },
});

export async function GET(request: Request) {
  return handler.get(request);
}

export async function POST(request: Request) {
  return handler.post(request);
}
