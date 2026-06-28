export const WHATSAPP_NUMBER_E164 = "918849821193";

export const BRAND_NAME = "WowWish";
export const BRAND_INITIALS = "WW";
export const BRAND_TAGLINE = "Personal surprise pages, made to feel special.";

export const TEMPLATE_LAUNCH_PRICE_INR = 499;
export const TEMPLATE_OLD_PRICE_INR = 999;
export const TEMPLATE_PREMIUM_LAUNCH_PRICE_INR = 999;
export const TEMPLATE_PREMIUM_OLD_PRICE_INR = 1499;

export const SITE_CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function buildWhatsappLink(params: {
  phoneE164?: string;
  text: string;
}) {
  const phone = params.phoneE164 ?? WHATSAPP_NUMBER_E164;
  const encoded = encodeURIComponent(params.text);
  return `https://wa.me/${phone}?text=${encoded}`;
}
