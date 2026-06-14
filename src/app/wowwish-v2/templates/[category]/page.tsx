import { redirect } from "next/navigation";

import {
  getWowWishCategory,
  wowwishCategories,
} from "@/lib/wowwishV2";

export function generateStaticParams() {
  return wowwishCategories.map((category) => ({
    category: category.id,
  }));
}

export default function WowWishV2CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getWowWishCategory(params.category);

  if (!category) redirect("/templates/birthday");

  redirect(`/templates/${category.id}`);
}
