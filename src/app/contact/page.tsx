import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";
import ContactPage from "@/components/site/ContactPage";

export const metadata = createPageMetadata({
  title: "Contact WowWish",
  description: "Contact WowWish to create a personalized wish page with photos, music, and a private link. ₹499 onwards.",
  path: "/contact",
  ogImage: OG_IMAGES.default,
});

export default function Page() {
  return <ContactPage />;
}
