import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";
import { redirect } from "next/navigation";

export const metadata = createPageMetadata({
  title: "WowWish Templates",
  description: "Explore premium WowWish templates for birthdays, anniversaries, proposals, festivals, wedding invites, and corporate wishes.",
  path: "/templates",
  ogImage: OG_IMAGES.default,
});

export default function TemplatesIndexPage() {
  redirect("/templates/birthday");
}
