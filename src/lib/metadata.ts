import type { Metadata } from "next";

import { BRAND_NAME } from "@/components/site/siteConstants";

export const SITE_URL = "https://wowwish.in";
export const DEFAULT_OG_IMAGE = "/og/default.png";
export const DEFAULT_TITLE = "WowWish — Personalized Wish Pages From ₹999";
export const DEFAULT_DESCRIPTION =
  "Personalized wish pages with photos, music, and a private link. From ₹999.";

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  /** Route-specific OG image under /public/og (e.g. /og/proposal.png). */
  ogImage?: string;
  ogImageAlt?: string;
};

function normalizePageTitle(title: string) {
  return title.replace(/\s*\|\s*WowWish\s*$/i, "").trim();
}

function ogImageMeta(imagePath: string, alt: string) {
  return [
    {
      url: imagePath,
      width: 1200,
      height: 630,
      alt,
    },
  ] as const;
}

/** Route-specific OG images under /public/og (1200×630 PNG). */
export const OG_IMAGES = {
  default: DEFAULT_OG_IMAGE,
  proposal: "/og/proposal.png",
  proposalLuxury: "/og/proposal-luxury.png",
  proposalCute: "/og/proposal-cute.png",
  anniversary: "/og/anniversary.png",
  anniversaryCute: "/og/anniversary-cute.png",
  anniversaryElegant: "/og/anniversary-elegant.png",
  birthday: "/og/birthday.png",
  birthdayBestie: "/og/birthday-bestie.png",
  birthdayYaari: "/og/birthday-yaari.png",
  mukeshSonal30th: "/og/mukesh-sonal-30th-anniversary.png",
} as const;

export function createPageMetadata({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
}: PageMetadataInput): Metadata {
  const pageTitle = normalizePageTitle(title);
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();
  const fullTitle = `${pageTitle} | ${BRAND_NAME}`;
  const imageAlt = ogImageAlt ?? `${pageTitle} — ${BRAND_NAME}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      siteName: BRAND_NAME,
      url: canonicalUrl,
      title: fullTitle,
      description,
      images: [...ogImageMeta(ogImage, imageAlt)],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
