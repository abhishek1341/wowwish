import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Birthday Bestie | WowWish",
  description: "A playful birthday wish page with photos, music, memories, and a private shareable link. From ₹999.",
  path: "/birthday-bestie",
});

export default function BirthdayBestieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
