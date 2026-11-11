export const WHATSAPP_NUMBER = "8613609699577";
export const WHATSAPP_DISPLAY = "+86 136 0969 9577";

export const COMPANY_ADDRESS_EN =
  "Room# 1010, Building A, YingFeng Business Center, Dongzhong Road, Guancheng District, Dongguan, Guangdong, China 523009";

export const COMPANY_STRUCTURED_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Room 1010, Building A, YingFeng Business Center, Dongzhong Road, Guancheng District",
  addressLocality: "Dongguan",
  addressRegion: "Guangdong",
  postalCode: "523009",
  addressCountry: "CN",
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello TINKON, I'm interested in your EV accessories. Please send me more information.";

export function getWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
