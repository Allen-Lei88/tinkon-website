export const RFQ_ROUTE = "/api/rfq";
export const RFQ_INBOX = "allen@tinkontech.com";
export const RFQ_ATTACHMENT_BYTES = 3 * 1024 * 1024;
export const RFQ_ATTACHMENT_TYPES = "application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png";

export const RFQ_BUYER_TYPES = [
  "Distributor / importer",
  "Wholesaler",
  "Retail or e-commerce brand",
  "Private-label brand",
  "Other business",
] as const;

export type RfqSelection = { productSlug?: string; categorySlug?: string };
