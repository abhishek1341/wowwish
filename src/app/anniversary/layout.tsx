import type { ReactNode } from "react";

import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Anniversary Wish Pages With Photos & Music | WowWish",
  description: "Personalized anniversary wish pages with photos, music, memories, and a private link. From ₹999.",
  path: "/anniversary",
  ogImage: OG_IMAGES.anniversary,
});

export default function AnniversaryLayout({ children }: { children: ReactNode }) {
  return children;
}
