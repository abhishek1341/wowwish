import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LetterPageClient from "@/components/LetterPageClient";
import { getLetterBySlug } from "@/lib/letters";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const letter = getLetterBySlug(params.slug);

  if (!letter) {
    return createPageMetadata({
      title: "Love Letters | WowWish",
      description: "Open sweet personalized letters made for thoughtful romantic surprises.",
      path: "/letters",
    });
  }

  return createPageMetadata({
    title: `${letter.title} | WowWish`,
    description: letter.message.headline ?? "Open a sweet personalized letter made for a thoughtful romantic surprise.",
    path: `/letters/${letter.slug}`,
  });
}

export default function LetterPage({ params }: { params: { slug: string } }) {
  const letter = getLetterBySlug(params.slug);
  if (!letter) return notFound();

  return <LetterPageClient letter={letter} />;
}
