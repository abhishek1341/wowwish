import { createPageMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

export const metadata = createPageMetadata({
  title: "WowWish Templates",
  description: "Explore premium WowWish templates for birthdays, anniversaries, proposals, festivals, wedding invites, and corporate wishes.",
  path: "/templates",
});

export default function TemplatesIndexPage() {
  redirect("/templates/birthday");
}
