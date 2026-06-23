import type { ReactNode } from "react";

import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cute Anniversary Wish Pages | WowWish",
  description: "Personalized cute anniversary pages with photos, music, inside jokes, and a private link. From ₹999.",
  path: "/anniversary-cute",
  ogImage: OG_IMAGES.anniversaryCute,
});

export default function AnniversaryCuteLayout({ children }: { children: ReactNode }) {
  return children;
}
