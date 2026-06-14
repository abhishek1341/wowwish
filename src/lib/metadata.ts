import type { Metadata } from "next";

import { BRAND_NAME } from "@/components/site/siteConstants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wowwish.co.in";
const BRAND_IMAGE_PATH = "/images/wowwish-logo.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
};

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path = "/",
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const brandImageUrl = absoluteUrl(BRAND_IMAGE_PATH);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    icons: {
      icon: [
        { url: "/favicon_io/favicon.ico" },
        { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/favicon_io/site.webmanifest",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: BRAND_NAME,
      type: "website",
      images: [
        {
          url: brandImageUrl,
          width: 1024,
          height: 1024,
          alt: `${BRAND_NAME} personalized wish pages`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [brandImageUrl],
    },
  };
}
