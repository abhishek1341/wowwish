import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Anniversary Wish Pages With Photos & Music | WowWish",
  description: "Personalized anniversary wish pages with photos, music, memories, and a private link. From ₹999.",
  path: "/anniversary",
});

export default function AnniversaryLayout({ children }: { children: ReactNode }) {
  return children;
}
