import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Birthday Yaari | WowWish",
  description: "A warm birthday wish page with memories, music, and a private shareable link. From ₹999.",
  path: "/birthday-yaari",
});

export default function BirthdayYaariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
