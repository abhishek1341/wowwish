"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, MessageCircle } from "lucide-react";

import type { TemplateCategoryId } from "@/lib/templates";
import { CATEGORY_LABELS, getTemplateBySlug, getTemplatesByCategory } from "@/lib/templates";
import { buildWhatsappLink } from "@/components/site/siteConstants";
import { CategoryPriceOnwards } from "@/components/site/PriceOnwards";
import MarketingShell from "@/components/site/MarketingShell";
import { useLeadModal } from "@/components/site/leadModalContext";
import PhoneMockup from "@/components/site/PhoneMockup";
import TemplateCard from "@/components/site/TemplateCard";
import { trackEvent } from "@/lib/analytics";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

type TemplatesRouterPageProps =
  | { kind: "index" }
  | { kind: "category"; category: TemplateCategoryId }
  | { kind: "template"; templateSlug: string };

function getCategoryHero(category: TemplateCategoryId) {
  if (category === "birthday") {
    return {
      title: "Birthday Templates",
      description: "Pick a vibe, send photos, and make their birthday feel personal.",
    };
  }

  if (category === "anniversary") {
    return {
      title: "Anniversary Templates",
      description: "Turn your memories into a romantic page they’ll replay.",
    };
  }

  if (category === "proposal") {
    return {
      title: "Proposal Templates",
      description: "Ask the question with photos, music, and a moment.",
    };
  }

  const meta = CATEGORY_LABELS[category];
  return {
    title: meta.title,
    description: meta.description,
  };
}

function CategoryCard({ category }: { category: TemplateCategoryId }) {
  const { openLead } = useLeadModal();
  const meta = CATEGORY_LABELS[category];
  const templates = getTemplatesByCategory(category);
  const hero = getCategoryHero(category);

  useEffect(() => {
    trackEvent("category_view", { category, source: "category_page" });
  }, [category]);

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/65 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur hover:bg-white/85"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Home
      </Link>

      <section className="mt-4 overflow-hidden rounded-[32px] border border-white/80 bg-white/80 p-5 shadow-[0_18px_45px_rgba(31,20,60,0.08)] backdrop-blur-xl sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
              <CategoryPriceOnwards category={category} />
            </div>
            <div className="mt-4 text-xs font-semibold tracking-[0.22em] text-slate-700/60">CATEGORY</div>
            <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {hero.title}
            </h1>
            <div className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
              {hero.description}
            </div>
          </div>

          <div className="grid gap-2 sm:flex sm:items-center">
            <a
              href="#templates"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white/75 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              View Templates
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => openLead({ occasion: category, source: "category_hero" })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)] transition hover:bg-slate-900"
            >
              Start My Page
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {meta.comingSoon ? (
        <div className="mt-6 rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_18px_45px_rgba(31,20,60,0.08)] backdrop-blur-xl">
          <div className="text-base font-semibold text-slate-950">Coming soon</div>
          <div className="mt-2 text-sm text-slate-700">Want a wedding invite / digital kankotri page? Join the waitlist on WhatsApp.</div>
          <div className="mt-4">
            <a
              href={buildWhatsappLink({ text: "Hi! I want the Wedding Invite / Digital Kankotri template. Please add me to the waitlist." })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "wedding_waitlist" })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Join waitlist on WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      ) : (
        <div id="templates" className="mt-6 scroll-mt-24 grid gap-4 lg:grid-cols-2">
          {templates.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              onMakeThis={() => openLead({ templateSlug: t.slug, occasion: t.category, source: "category" })}
            />
          ))}
        </div>
      )}

      <div className="h-20" />
    </div>
  );
}

function TemplateDetail({ templateSlug }: { templateSlug: string }) {
  const { openLead } = useLeadModal();
  const template = getTemplateBySlug(templateSlug);

  useEffect(() => {
    trackEvent("template_view", { template: templateSlug, source: "template_page" });
  }, [templateSlug]);

  if (!template) return null;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <Link
          href={`/templates/${template.category}`}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <a
          href={buildWhatsappLink({ text: `Hi! I want to customize the ${template.name} template (${template.slug}).` })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "template_detail", template: template.slug })}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900"
        >
          Chat on WhatsApp
          <MessageCircle className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <PhoneMockup>
          <div className="px-4 pb-6 pt-3">
            <div className="rounded-3xl bg-gradient-to-br from-rose-200 via-amber-100 to-indigo-100 p-5">
              <div className="text-[11px] font-semibold tracking-wide text-slate-700/70">Preview</div>
              <div className="mt-3 text-balance text-lg font-semibold tracking-tight text-slate-950">{template.name}</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-700">{template.description}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {template.vibe.slice(0, 4).map((v) => (
                  <span
                    key={v}
                    className="rounded-full border border-slate-900/10 bg-white/60 px-3 py-1 text-[11px] font-semibold text-slate-800"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </PhoneMockup>

        <div>
          <div className="text-xs font-semibold tracking-[0.22em] text-slate-700/60">TEMPLATE</div>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{template.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {template.vibe.map((v) => (
              <span key={v} className="rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700">
                {v}
              </span>
            ))}
          </div>

          <div className="mt-4 text-sm leading-relaxed text-slate-700">
            Share the demo link first. If they say “wow” — you’re ready.
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-900/10 bg-white/70 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              <div className="text-sm font-semibold text-slate-950">What’s included</div>
              <div className="mt-3 space-y-2 text-sm font-semibold text-slate-800">
                {[
                  "Template customization",
                  "Names/date/message update",
                  "Photo placement",
                  "Background music",
                  "Private shareable link",
                ].map((x) => (
                  <div key={x} className="rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3">
                    {x}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-900/10 bg-white/70 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              <div className="text-sm font-semibold text-slate-950">You can customize</div>
              <div className="mt-3 space-y-2 text-sm font-semibold text-slate-800">
                {[
                  "Photos",
                  "Your message/letter",
                  "Names + date",
                  "Music",
                  "Tone (cute / premium / emotional)",
                ].map((x) => (
                  <div key={x} className="rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3">
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-900/10 bg-slate-950 p-6 shadow-[0_22px_90px_rgba(15,23,42,0.20)]">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Starting price</div>
              <CategoryPriceOnwards
                category={template.category}
                priceClassName="text-lg font-semibold text-white"
                oldClassName="text-xs font-semibold text-white/60"
                vertical
              />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  trackEvent("make_this_click", { source: "template_detail", template: template.slug });
                  openLead({ templateSlug: template.slug, occasion: template.category, source: "template_detail" });
                }}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950"
              >
                Customize This Template
              </button>
              <a
                href={template.demoPath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("demo_click", { source: "template_detail", template: template.slug })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
              >
                View Demo
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-xs font-semibold text-slate-600">
            No login needed. Fast turnaround. WhatsApp-friendly.
          </div>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
}

export default function TemplatesRouterPage(props: TemplatesRouterPageProps) {
  return (
    <MarketingShell
      leadSource={props.kind === "template" ? "template" : props.kind === "category" ? "category" : "templates"}
      initialTemplateSlug={props.kind === "template" ? props.templateSlug : undefined}
      initialOccasion={props.kind === "category" ? props.category : undefined}
    >
      <TemplatesRouterContent {...props} />
    </MarketingShell>
  );
}

function TemplatesRouterContent(props: TemplatesRouterPageProps) {
  const { openLead } = useLeadModal();

  return (
    <main className="bg-transparent px-4 pb-20 pt-12 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        {props.kind === "index" ? (
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-[0_18px_45px_rgba(31,20,60,0.08)] backdrop-blur-xl sm:p-6">
              <div className="text-xs font-semibold tracking-[0.22em] text-slate-700/60">RECOMMENDED</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Start with the best.</div>
              <div className="mt-2 text-sm text-slate-700">One birthday, one proposal, one anniversary — no repeats.</div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {["birthday-bestie", "proposal-cute", "anniversary-elegant"]
                  .map((slug) => getTemplateBySlug(slug))
                  .filter(Boolean)
                  .map((t) => (
                    <TemplateCard
                      key={t!.id}
                      template={t!}
                      onMakeThis={() =>
                        openLead({
                          templateSlug: t!.slug,
                          occasion: t!.category,
                          source: "templates_recommended",
                        })
                      }
                    />
                  ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-[0_18px_45px_rgba(31,20,60,0.08)] backdrop-blur-xl sm:p-6">
              <div className="text-xs font-semibold tracking-[0.22em] text-slate-700/60">TEMPLATES</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Choose a category</div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {(Object.keys(CATEGORY_LABELS) as TemplateCategoryId[]).map((c) => (
                  <Link
                    key={c}
                    href={`/templates/${c}`}
                    className={cn(
                      "rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-4 text-sm font-semibold text-slate-900 hover:bg-white",
                      CATEGORY_LABELS[c].comingSoon ? "opacity-60" : "",
                    )}
                  >
                    {CATEGORY_LABELS[c].title}
                    <ArrowRight className="ml-2 inline h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {props.kind === "category" ? <CategoryCard category={props.category} /> : null}
        {props.kind === "template" ? <TemplateDetail templateSlug={props.templateSlug} /> : null}
      </div>
    </main>
  );
}
