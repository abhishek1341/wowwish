import type { ReactNode } from "react";

import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Luxury Proposal Wish Pages | WowWish",
  description: "Premium proposal pages with cinematic styling, photos, music, and a private reveal link. From ₹999.",
  path: "/proposal-luxury",
  ogImage: OG_IMAGES.proposalLuxury,
});

export default function ProposalLuxuryLayout({ children }: { children: ReactNode }) {
  return children;
}
