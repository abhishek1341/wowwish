import type { ReactNode } from "react";

import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Birthday Wish Pages That Pop | WowWish",
  description: "Personalized birthday wish pages with photos, music, and a private link. ₹499 onwards.",
  path: "/birthday",
  ogImage: OG_IMAGES.birthday,
});

export default function BirthdayLayout({ children }: { children: ReactNode }) {
  return children;
}
