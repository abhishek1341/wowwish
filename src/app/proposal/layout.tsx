import type { ReactNode } from "react";

import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Proposal Wish Pages With A Reveal Moment | WowWish",
  description: "Personalized proposal pages with photos, music, reasons, and a private reveal link. From ₹999.",
  path: "/proposal",
  ogImage: OG_IMAGES.proposal,
});

export default function ProposalLayout({ children }: { children: ReactNode }) {
  return children;
}
