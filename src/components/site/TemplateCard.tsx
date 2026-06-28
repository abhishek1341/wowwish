"use client";

import { useId } from "react";
import { ExternalLink } from "lucide-react";

import type { Template } from "@/lib/templates";
import { trackEvent } from "@/lib/analytics";
import { CategoryPriceOnwards } from "@/components/site/PriceOnwards";
import PhoneMockup from "@/components/site/PhoneMockup";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function getPreviewGradient(template: Template) {
  return template.category === "proposal"
    ? "from-fuchsia-200 via-rose-200 to-amber-100"
    : template.category === "anniversary"
      ? "from-amber-100 via-rose-100 to-indigo-100"
      : template.category === "birthday"
        ? "from-rose-200 via-pink-200 to-amber-100"
        : "from-indigo-100 via-rose-100 to-amber-100";
}

function PreviewPanel({ template, titleId }: { template: Template; titleId: string }) {
  const gradient = getPreviewGradient(template);
  const copy = getCardCopy(template);

  return (
    <div className="relative px-3 pb-4 pt-3 sm:px-4">
      <div
        className={cn(
          "relative overflow-hidden rounded-[28px] bg-gradient-to-br p-4 sm:p-5",
          gradient,
        )}
      >
        <div aria-hidden className="absolute inset-0 bg-white/35" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 via-white/10 to-transparent" />

        <div className="relative flex flex-col items-start gap-2.5">
          <div className="flex flex-wrap gap-2">
            {copy.tags.slice(0, 2).map((v) => (
              <span
                key={v}
                className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-sm ring-1 ring-slate-900/10"
              >
                {v}
              </span>
            ))}
          </div>

          <div className="w-full rounded-[24px] bg-white/66 p-3.5 backdrop-blur-md ring-1 ring-slate-900/10 sm:p-4">
            <h3 id={titleId} className="text-base font-semibold text-slate-950">{template.name}</h3>
            <div className="mt-2 text-sm font-medium leading-relaxed text-slate-800">
              {copy.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getBadge(template: Template): string | null {
  if (template.slug === "anniversary-elegant") return "Premium Pick";
  if (template.slug === "birthday-bestie") return "Birthday Pick";
  if (template.slug === "proposal-cute") return "Cute & Playful";
  if (template.slug === "proposal-luxury") return "Premium Pick";
  if (template.trending) return "Trending";
  return null;
}

function getCardCopy(template: Template): {
  description: string;
  tags: [string, string];
} {
  if (template.slug === "birthday-bestie") {
    return {
      description: "A birthday surprise page for your favorite person.",
      tags: ["Birthday", "Neon"],
    };
  }

  if (template.slug === "birthday-yaari") {
    return {
      description: "A warm birthday page with memories, music, and emotion.",
      tags: ["Birthday", "Yaari"],
    };
  }

  if (template.slug === "proposal-cute") {
    return {
      description: "A sweet proposal page with photos, music, and a moment.",
      tags: ["Proposal", "Cute"],
    };
  }

  if (template.slug === "anniversary-elegant") {
    return {
      description: "A romantic anniversary page with memories and music.",
      tags: ["Anniversary", "Elegant"],
    };
  }

  const fallbackTags: [string, string] = [
    template.category.charAt(0).toUpperCase() + template.category.slice(1),
    template.vibe[0] ?? "Cute",
  ];

  return {
    description: template.description,
    tags: fallbackTags,
  };
}

export default function TemplateCard({
  template,
  onMakeThis,
}: {
  template: Template;
  onMakeThis: () => void;
}) {
  const badge = getBadge(template);
  const titleId = useId();

  return (
    <article
      aria-labelledby={titleId}
      className="group overflow-hidden rounded-3xl border border-white/80 bg-white/80 shadow-[0_18px_45px_rgba(31,20,60,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_26px_70px_rgba(31,20,60,0.12)] sm:rounded-[32px]"
    >
      <div className="relative p-3.5 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2 px-0.5">
          {badge ? (
            <div className="rounded-full bg-slate-950/90 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
              {badge}
            </div>
          ) : (
            <div />
          )}

          <div className="shrink-0 whitespace-nowrap rounded-full border border-slate-900/10 bg-white/85 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm backdrop-blur">
            <CategoryPriceOnwards category={template.category} />
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_30%_0%,rgba(251,191,36,0.24),transparent_55%)] opacity-60 transition group-hover:opacity-80" />
          <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_70%_20%,rgba(244,114,182,0.20),transparent_55%)] opacity-60 transition group-hover:opacity-80" />

          <PhoneMockup className="!max-w-[430px] transition duration-300 group-hover:shadow-[0_34px_120px_rgba(15,23,42,0.16)]">
            <PreviewPanel template={template} titleId={titleId} />
          </PhoneMockup>
        </div>

        <div className="mt-3 sm:mt-4">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={template.demoPath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("demo_click", { template: template.slug })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              View Demo
              <ExternalLink className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => {
                trackEvent("make_this_click", { template: template.slug, source: "template_card" });
                onMakeThis();
              }}
              className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Start My Page
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
