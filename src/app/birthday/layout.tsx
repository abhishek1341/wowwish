import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Birthday Wish Pages That Pop | WowWish",
  description: "Personalized birthday wish pages with photos, music, and a private link. From ₹999.",
  path: "/birthday",
});

export default function BirthdayLayout({ children }: { children: ReactNode }) {
  return children;
}
