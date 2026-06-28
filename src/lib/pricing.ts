import { formatInr } from "@/components/site/siteConstants";

/** Surprise Page package */
export const WOWWISH_SURPRISE_PRICE_INR = 499;
export const WOWWISH_SURPRISE_OLD_PRICE_INR = 999;

/** Premium Memory Story package */
export const WOWWISH_PREMIUM_PRICE_INR = 999;
export const WOWWISH_PREMIUM_OLD_PRICE_INR = 1499;

/** Birthday templates */
export const BIRTHDAY_PRICE_INR = 499;
export const BIRTHDAY_OLD_PRICE_INR = 999;

/** Proposal + anniversary templates */
export const ROMANCE_PRICE_INR = 999;
export const ROMANCE_OLD_PRICE_INR = 1499;

/** @deprecated Use WOWWISH_SURPRISE_PRICE_INR */
export const WOWWISH_STANDARD_PRICE_INR = WOWWISH_SURPRISE_PRICE_INR;

export type PricingCategory = "birthday" | "anniversary" | "proposal";

export function formatPriceOnwards(amount: number) {
  return `${formatInr(amount)} onwards`;
}

export function getTemplatePricing(category: PricingCategory | string) {
  if (category === "birthday") {
    return {
      priceInr: BIRTHDAY_PRICE_INR,
      oldPriceInr: BIRTHDAY_OLD_PRICE_INR,
      label: formatPriceOnwards(BIRTHDAY_PRICE_INR),
    };
  }

  return {
    priceInr: ROMANCE_PRICE_INR,
    oldPriceInr: ROMANCE_OLD_PRICE_INR,
    label: formatPriceOnwards(ROMANCE_PRICE_INR),
  };
}

export function getPackagePricing(packageId: "surprise" | "premium") {
  if (packageId === "surprise") {
    return {
      priceInr: WOWWISH_SURPRISE_PRICE_INR,
      oldPriceInr: WOWWISH_SURPRISE_OLD_PRICE_INR,
      label: formatPriceOnwards(WOWWISH_SURPRISE_PRICE_INR),
    };
  }

  return {
    priceInr: WOWWISH_PREMIUM_PRICE_INR,
    oldPriceInr: WOWWISH_PREMIUM_OLD_PRICE_INR,
    label: formatPriceOnwards(WOWWISH_PREMIUM_PRICE_INR),
  };
}
