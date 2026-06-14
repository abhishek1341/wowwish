import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Elegant Anniversary Wish Pages | WowWish",
  description: "Premium anniversary wish pages with photos, music, promises, and a private link. From ₹999.",
  path: "/anniversary-elegant",
});

export default function AnniversaryElegantLayout({ children }: { children: ReactNode }) {
  return children;
}
