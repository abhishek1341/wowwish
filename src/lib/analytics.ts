export type AnalyticsEventName =
  | "category_view"
  | "template_view"
  | "demo_click"
  | "make_this_click"
  | "pricing_view"
  | "package_basic_click"
  | "package_premium_click"
  | "whatsapp_click"
  | "lead_submit"
  | "hero_cta_click"
  | "template_card_click"
  | "demo_view"
  | "demo_sticky_cta_click"
  | "create_wish_modal_open"
  | "package_selected"
  | "create_wish_form_submit"
  | "whatsapp_open"
  | "pricing_cta_click"
  | "category_click";

export type AnalyticsEventParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(name: AnalyticsEventName, params?: AnalyticsEventParams) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: name, ...params });

    if (typeof window.gtag === "function") {
      window.gtag("event", name, params ?? {});
    }
  } catch {
    // ignore
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[analytics]", name, params ?? {});
  }
}
