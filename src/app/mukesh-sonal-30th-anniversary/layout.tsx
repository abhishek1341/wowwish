import type { ReactNode } from "react";

import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Mukesh & Sonal 30th Anniversary | WowWish",
  description: "A personalized anniversary wish page with photos, music, memories, and a private link. From ₹999.",
  path: "/mukesh-sonal-30th-anniversary",
  ogImage: OG_IMAGES.mukeshSonal30th,
});

export default function MukeshSonalAnniversaryLayout({ children }: { children: ReactNode }) {
  return children;
}
