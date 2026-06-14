import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cute Proposal Wish Pages | WowWish",
  description: "Playful proposal pages with photos, music, cute reasons, and a private reveal link. From ₹999.",
  path: "/proposal-cute",
});

export default function ProposalCuteLayout({ children }: { children: ReactNode }) {
  return children;
}
