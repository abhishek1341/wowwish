"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef } from "react";
import {
  ArrowRight,
  CalendarDays,
  Gem,
  Heart,
  Image as ImageIcon,
  Mail,
  MessageCircle,
  PartyPopper,
  Sparkles,
  Type,
  Users,
} from "lucide-react";

import MarketingShell from "@/components/site/MarketingShell";
import { useLeadModal } from "@/components/site/leadModalContext";
import Accordion from "@/components/site/Accordion";
import HowItWorks from "@/components/site/HowItWorks";
import TemplateCard from "@/components/site/TemplateCard";
import {
  SITE_CONTAINER,
  TEMPLATE_LAUNCH_PRICE_INR,
  TEMPLATE_OLD_PRICE_INR,
  TEMPLATE_PREMIUM_LAUNCH_PRICE_INR,
  TEMPLATE_PREMIUM_OLD_PRICE_INR,
  buildWhatsappLink,
  formatInr,
} from "@/components/site/siteConstants";
import { trackEvent } from "@/lib/analytics";
import { CATEGORY_LABELS, getTemplateBySlug } from "@/lib/templates";
import { useSiteUi } from "@/components/site/siteUiContext";

const CONTACT_EMAIL = "wowwish.in@gmail.com";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function CategoryIcon({ id }: { id: keyof typeof CATEGORY_LABELS }) {
  const cls = "h-5 w-5";
  if (id === "birthday") return <PartyPopper className={cls} />;
  if (id === "anniversary") return <Heart className={cls} />;
  if (id === "proposal") return <Sparkles className={cls} />;
  return <Gem className={cls} />;
}

export default function HomePage() {
  return (
    <MarketingShell leadSource="home">
      <HomeContent />
    </MarketingShell>
  );
}

function HomeContent() {
  const { openLead } = useLeadModal();
  const { setContactInView, setTemplatesInView, setPricingInView } = useSiteUi();
  const contactRef = useRef<HTMLDivElement | null>(null);
  const bestTemplatesRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const whatsappHref = useMemo(() => {
    return buildWhatsappLink({
      text: "Hi, I want to create a surprise page. Please share details.",
    });
  }, []);

  useEffect(() => {
    trackEvent("pricing_view", { source: "home" });
  }, []);

  const bestTemplates = useMemo(() => {
    const picks = [
      "birthday-bestie",
      "proposal-cute",
      "anniversary-elegant",
    ] as const;

    return picks
      .map((slug) => getTemplateBySlug(slug))
      .filter(Boolean);
  }, []);

  useEffect(() => {
    const el = contactRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setContactInView(entry ? entry.isIntersecting : false);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      setContactInView(false);
    };
  }, [setContactInView]);

  useEffect(() => {
    const el = bestTemplatesRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setTemplatesInView(entry ? entry.isIntersecting : false);
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      setTemplatesInView(false);
    };
  }, [setTemplatesInView]);

  useEffect(() => {
    const el = pricingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setPricingInView(entry ? entry.isIntersecting : false);
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      setPricingInView(false);
    };
  }, [setPricingInView]);

  return (
    <main className="relative overflow-hidden bg-transparent">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.14),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.12),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_90%,rgba(99,102,241,0.10),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <section id="hero" className="relative pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className={SITE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/65 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
                No app install. Just a link.
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl">
                Make someone feel special with a{" "}
                <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent">
                  {" "}personal surprise page
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-700 sm:text-lg">
                Birthday, anniversary, proposal, and wedding invite pages — made with photos, music, memories, and your words.
              </p>

              <div className="mt-3 text-sm font-semibold text-slate-700">
                Made for WhatsApp surprises, Instagram stories, and unforgettable reactions.
              </div>

              <div className="mt-7 grid gap-3 sm:flex sm:items-center">
                <Link
                  href="/templates"
                  onClick={() => trackEvent("category_view", { category: "birthday", source: "hero" })}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(15,23,42,0.20)] transition hover:bg-slate-900"
                >
                  Explore Templates
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => openLead({ source: "hero_make_one" })}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Start My Page
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 text-xs font-semibold text-slate-600">
                No app install. Just a beautiful link you can share on WhatsApp or Instagram.
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-900/10 bg-white/60 p-5 shadow-[0_22px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <div className="text-xs font-semibold tracking-[0.22em] text-slate-700/60">Why people love this</div>
              <div className="mt-4 space-y-3">
                {["Looks premium", "Feels personal", "WhatsApp share-ready", "Made in hours, not days"].map((t) => (
                  <div key={t} className="rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-4 pt-2 sm:pb-8">
        <div className={SITE_CONTAINER}>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-[0.22em] text-slate-700/60">OCCASIONS</div>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Pick the moment.</h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((id) => {
              const meta = CATEGORY_LABELS[id];
              const href = `/templates/${id}`;
              return (
                <div
                  key={id}
                  className="rounded-3xl border border-slate-900/10 bg-white/60 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-rose-200 via-amber-100 to-pink-200 text-slate-950 ring-1 ring-rose-200/60">
                      <CategoryIcon id={id} />
                    </div>
                    {meta.comingSoon ? (
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white">Coming soon</span>
                    ) : null}
                  </div>

                  <div className="mt-4 text-lg font-semibold text-slate-950">{meta.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-700">{meta.description}</div>

                  <div className="mt-4">
                    <Link
                      href={href}
                      onClick={() => trackEvent("category_view", { category: id, source: "home_categories" })}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold",
                        meta.comingSoon
                          ? "pointer-events-none border border-slate-900/10 bg-white/50 text-slate-500"
                          : "border border-slate-900/10 bg-white/70 text-slate-900 hover:bg-white",
                      )}
                    >
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative pb-10 pt-10 sm:pb-14">
        <div className={SITE_CONTAINER}>
          <div className="mb-6">
            <div className="text-xs font-semibold tracking-[0.22em] text-slate-700/60">BEST TEMPLATES</div>
            <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl">The “wow” picks.</h2>
            <div className="mt-2 text-sm text-slate-700">Open the demo. If they smile… you’re done.</div>
          </div>

          <div ref={bestTemplatesRef} className="grid gap-4 lg:grid-cols-2">
            {bestTemplates.map((t) => (
              <TemplateCard
                key={t!.id}
                template={t!}
                onMakeThis={() => openLead({ templateSlug: t!.slug, occasion: t!.category, source: "home_best" })}
              />
            ))}
          </div>

          <div className="mt-5">
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              View all templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative scroll-mt-24 pb-10 pt-10 sm:pb-14">
        <div className={SITE_CONTAINER}>
          <div className="mb-6">
            <div className="text-xs font-semibold tracking-[0.22em] text-slate-700/60">HOW IT WORKS</div>
            <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Easy. Cute. Done.</h2>
          </div>

          <HowItWorks />
        </div>
      </section>

      <section
        id="pricing"
        ref={pricingRef}
        className="relative scroll-mt-24 pb-24 pt-10 sm:pb-28"
      >
        <div className={SITE_CONTAINER}>
          <div className="mb-6">
            <div className="text-xs font-semibold tracking-[0.22em] text-slate-700/60">PRICING</div>
            <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Simple packages. Big feelings.</h2>
            <div className="mt-2 text-sm font-semibold text-slate-700">Launch pricing for first few customers.</div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-900/10 bg-white/65 p-6 shadow-[0_22px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2">
                    <div className="text-lg font-semibold text-slate-950">Basic</div>
                    <span className="rounded-full bg-[#E8C57A]/25 px-2.5 py-1 text-[11px] font-semibold text-[#162046] ring-1 ring-[#E8C57A]/40">
                      Launch Offer
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-600 line-through">{formatInr(TEMPLATE_OLD_PRICE_INR)}</div>
                  <div className="text-2xl font-semibold tracking-tight text-slate-950">{formatInr(TEMPLATE_LAUNCH_PRICE_INR)} onwards</div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm font-semibold text-slate-800">
                {[
                  "Names, photos & message",
                  "Background music",
                  "Shareable private link",
                ].map((p) => (
                  <div key={p} className="rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3">
                    {p}
                  </div>
                ))}

                <Accordion title="See all included">
                  <div className="grid gap-1.5">
                    {[
                      "Template customization",
                      "Names/date/message update",
                      "Photo placement",
                      "Background music",
                      "Shareable private link",
                    ].map((x) => (
                      <div
                        key={x}
                        className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-[13px] font-semibold text-slate-800"
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                </Accordion>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/45 bg-gradient-to-br from-[#3B1D5F] via-[#5B35A0] to-[#3B1D5F] p-6 shadow-[0_28px_110px_rgba(91,53,160,0.22)]">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(232,197,122,0.24),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(196,167,255,0.22),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_85%,rgba(196,167,255,0.14),transparent_60%)]" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <div className="text-lg font-semibold text-[#FFF8EA]">Premium</div>
                      <span className="rounded-full bg-[#D4AF37]/20 px-2.5 py-1 text-[11px] font-semibold text-[#FFF8EA] ring-1 ring-[#D4AF37]/45">
                        Most Popular
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-[#FFF8EA]/70 line-through">{formatInr(TEMPLATE_PREMIUM_OLD_PRICE_INR)}</div>
                    <div className="text-2xl font-semibold tracking-tight text-[#FFF8EA]">{formatInr(TEMPLATE_PREMIUM_LAUNCH_PRICE_INR)} onwards</div>
                  </div>
                </div>

                <div className="mt-2 text-sm font-semibold text-[#FFF8EA]/75">Everything in Basic, plus:</div>
                <div className="mt-4 space-y-2 text-sm font-semibold text-[#FFF8EA]">
                  {[
                    "AI photo enhancement",
                    "Custom emotional letter",
                    "Cinematic memory video",
                  ].map((p) => (
                    <div key={p} className="rounded-2xl border border-white/10 bg-[rgba(196,167,255,0.14)] px-4 py-3">
                      {p}
                    </div>
                  ))}

                  <Accordion title="See all included" variant="premium">
                    <div className="grid gap-1.5">
                      {[
                        "Everything in Basic",
                        "AI photo enhancement",
                        "Custom emotional letter",
                        "Cinematic memory video/slideshow",
                        "Premium animation polish",
                      ].map((x) => (
                        <div
                          key={x}
                          className="rounded-xl border border-white/10 bg-[rgba(196,167,255,0.14)] px-3 py-2 text-[13px] font-semibold text-[#FFF8EA]"
                        >
                          {x}
                        </div>
                      ))}
                    </div>
                  </Accordion>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => openLead({ source: "pricing" })}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FFF8EA] px-5 py-3 text-sm font-semibold text-[#3B1D5F] shadow-[0_18px_70px_rgba(0,0,0,0.18)]"
                  >
                    Start My Page
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={contactRef}
            className="relative mt-10 overflow-hidden rounded-3xl border border-slate-900/10 bg-gradient-to-br from-[#FFF7E8] via-[#FFFAF3] to-[#F1D8C7] p-6 shadow-[0_24px_90px_rgba(15,23,42,0.14)]"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(232,197,122,0.36),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_30%,rgba(235,196,189,0.30),transparent_55%)]" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
                Order in 2 minutes
              </div>
              <div className="text-balance text-2xl font-semibold tracking-tight text-[#162046] sm:text-4xl">
                Ready to make someone smile?
              </div>
              <div className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
                Tell us the occasion, send your photos, and we’ll help create a personal surprise page they’ll remember.
              </div>

              <div className="mt-6 rounded-3xl border border-white/60 bg-[rgba(255,255,255,0.82)] p-5 shadow-[0_18px_45px_rgba(31,20,60,0.08)] backdrop-blur-xl">
                <div className="text-sm font-semibold text-[#162046]">What to send us:</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <InfoRow icon={<Sparkles className="h-4 w-4" />} label="Occasion" />
                  <InfoRow icon={<Users className="h-4 w-4" />} label="Names" />
                  <InfoRow icon={<CalendarDays className="h-4 w-4" />} label="Date" />
                  <InfoRow icon={<ImageIcon className="h-4 w-4" />} label="Photos" />
                  <InfoRow icon={<Type className="h-4 w-4" />} label="Message tone" />
                </div>
              </div>

              <div className="mt-6 grid gap-2 sm:flex sm:items-center">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { source: "home_contact" })}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#162046] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_70px_rgba(22,32,70,0.28)]"
                >
                  WhatsApp Us
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white/75 px-6 py-3 text-sm font-semibold text-[#162046] hover:bg-white"
                >
                  Email Us
                  <Mail className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-4 text-xs font-semibold text-slate-600">
                No payment now — we’ll confirm your details first.
              </div>

              <div className="mt-2 text-xs font-semibold text-slate-600">
                Prefer browsing first?{" "}
                <Link href="/templates" className="text-[#162046] underline underline-offset-4">
                  Pick a template
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#E8C57A]/35 to-[#EBC4BD]/30 text-[#162046] ring-1 ring-[#E8C57A]/25">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}
