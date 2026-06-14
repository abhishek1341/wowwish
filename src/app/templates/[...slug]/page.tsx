import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import WowWishV2Experience from "@/components/wowwish-v2/WowWishV2Experience";
import { createPageMetadata } from "@/lib/metadata";
import {
  getWowWishCategory,
  wowwishCategories,
  type WowWishCategoryId,
} from "@/lib/wowwishV2";

export function generateStaticParams() {
  return wowwishCategories.map((category) => ({
    slug: [category.id],
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Metadata {
  const slugParts = params.slug ?? [];

  if (slugParts.length === 0) {
    return createPageMetadata({
      title: "WowWish Templates",
      description: "Explore premium WowWish templates for birthdays, anniversaries, proposals, festivals, wedding invites, and corporate wishes.",
      path: "/templates",
    });
  }

  const [first] = slugParts;
  const category = first ? getWowWishCategory(first) : undefined;

  if (category) {
    return createPageMetadata({
      title: `${category.name} Templates | WowWish`,
      description: category.description,
      path: `/templates/${category.id}`,
    });
  }

  return createPageMetadata({
    title: "WowWish Templates",
    description: "Explore premium WowWish templates for birthdays, anniversaries, proposals, festivals, wedding invites, and corporate wishes.",
    path: "/templates",
  });
}

export default function TemplatesCatchAllPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slugParts = params.slug ?? [];

  if (slugParts.length === 0) {
    redirect("/templates/birthday");
  }

  const [first] = slugParts;

  if (slugParts.length > 1) notFound();

  const category = first ? getWowWishCategory(first) : undefined;
  if (!category) notFound();

  return <WowWishV2Experience mode="category" categoryId={category.id as WowWishCategoryId} />;
}
