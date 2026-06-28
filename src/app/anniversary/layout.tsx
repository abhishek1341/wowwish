import type { ReactNode } from "react";

import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Anniversary Wish Pages With Photos & Music | WowWish",
  description: "Personalized anniversary wish pages with photos, music, memories, and a private link. ₹999 onwards.",
  path: "/anniversary",
  ogImage: OG_IMAGES.anniversary,
});

export default function AnniversaryLayout({ children }: { children: ReactNode }) {
  return children;
}
