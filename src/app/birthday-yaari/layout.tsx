import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Birthday Yaari | WowWish",
  description: "A warm birthday wish page with memories, music, and a private shareable link. From ₹999.",
  path: "/birthday-yaari",
  ogImage: OG_IMAGES.birthdayYaari,
});

export default function BirthdayYaariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
