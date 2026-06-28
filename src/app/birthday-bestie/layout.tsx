import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Birthday Bestie | WowWish",
  description: "A playful birthday wish page with photos, music, memories, and a private shareable link. ₹499 onwards.",
  path: "/birthday-bestie",
  ogImage: OG_IMAGES.birthdayBestie,
});

export default function BirthdayBestieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
