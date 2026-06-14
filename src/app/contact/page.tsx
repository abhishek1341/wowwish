import { createPageMetadata } from "@/lib/metadata";
import ContactPage from "@/components/site/ContactPage";

export const metadata = createPageMetadata({
  title: "Contact WowWish",
  description: "Contact WowWish to create a personalized wish page with photos, music, and a private link. From ₹999.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
