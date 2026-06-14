import type { AnalyticsEventParams } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

export const WOWWISH_WHATSAPP_NUMBER = "918849821193";
export const WOWWISH_EMAIL = "wowwish.in@gmail.com";

export type WowWishPackageId = "surprise" | "premium";

export type WowWishOrderIntent = {
  occasion?: string;
  templateName?: string;
  packageName?: string;
  packagePrice?: string;
  recipientName?: string;
  relationship?: string;
  eventDate?: string;
  messageTone?: string;
  language?: string;
  musicPreference?: string;
  notes?: string;
};

export function getDeviceType() {
  if (typeof window === "undefined") return "server";
  return window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop";
}

export function trackWowWishEvent(
  name: Parameters<typeof trackEvent>[0],
  params?: AnalyticsEventParams,
) {
  trackEvent(name, {
    device_type: getDeviceType(),
    ...params,
  });
}

export function buildWowWishWhatsAppMessage(intent: WowWishOrderIntent) {
  return [
    "Hi WowWish, I want to create a personalized wish page.",
    "",
    `Occasion: ${intent.occasion ?? ""}`,
    `Template: ${intent.templateName ?? ""}`,
    `Package: ${intent.packageName ?? ""}${intent.packagePrice ? ` - ${intent.packagePrice}` : ""}`,
    `Recipient name: ${intent.recipientName ?? ""}`,
    `Relationship: ${intent.relationship ?? ""}`,
    `Date/deadline: ${intent.eventDate ?? ""}`,
    `Message tone: ${intent.messageTone ?? ""}`,
    `Language: ${intent.language ?? ""}`,
    `Music preference: ${intent.musicPreference ?? ""}`,
    "",
    "I will send photos and extra details here on WhatsApp. Please confirm the flow and final price.",
    intent.notes ? `\nNotes: ${intent.notes}` : "",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

export function buildWowWishWhatsAppUrl(intent: WowWishOrderIntent = {}) {
  const text = buildWowWishWhatsAppMessage(intent);
  return `https://wa.me/${WOWWISH_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
