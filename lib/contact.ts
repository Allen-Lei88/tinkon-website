export const WHATSAPP_NUMBER = "8613609699577";
export const WHATSAPP_DISPLAY = "+86 136 0969 9577";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello TINKON, I'm interested in your EV accessories. Please send me more information.";

export function getWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
