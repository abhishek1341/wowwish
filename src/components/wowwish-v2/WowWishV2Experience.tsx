"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  Mail,
  Menu,
  MessageCircle,
  Music,
  Palette,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import {
  getFeaturedWowWishTemplates,
  getWowWishCategory,
  getWowWishTemplatesByCategory,
  getWowWishTheme,
  WOWWISH_LOGO_SRC,
  WOWWISH_PREMIUM_PRICE_INR,
  WOWWISH_STANDARD_PRICE_INR,
  wowwishCategories,
  wowwishTemplates,
  wowwishThemes,
  type WowWishCategoryId,
  type WowWishTemplate,
  type WowWishThemeId,
} from "@/lib/wowwishV2";
import { BRAND_NAME, BRAND_TAGLINE, formatInr } from "@/components/site/siteConstants";
import {
  WOWWISH_EMAIL,
  buildWowWishWhatsAppUrl,
  trackWowWishEvent,
  type WowWishPackageId,
} from "@/lib/wowwishOrder";

const CONTACT_EMAIL = WOWWISH_EMAIL;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function trackGaWhatsappClick(eventLabel: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: eventLabel,
    });
  }
}

function getCustomizeEventLabel(template: WowWishTemplate) {
  return `customize_${template.id.replace(/-/g, "_")}`;
}

const packageOptions: Record<WowWishPackageId, { name: string; price: string; cta: string }> = {
  surprise: { name: "Surprise Page", price: "₹999", cta: "Start with ₹999" },
  premium: { name: "Premium Memory Story", price: "₹1,499", cta: "Make it Premium" },
};

const revealEase = [0.22, 1, 0.36, 1] as const;

function MotionSafeWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function FadeInSection({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: revealEase }}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "show"}
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.09 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCard({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22, scale: 0.985 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.58, ease: revealEase },
        },
      }}
      whileHover={reducedMotion ? undefined : { y: -6, rotateX: 1.2, rotateY: -1.2 }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
    >
      {children}
    </motion.div>
  );
}

function FloatingElement({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function ShineButton({
  children,
  className,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} onClick={onClick} className={cn("ww-shine-button", className)}>
      {children}
    </button>
  );
}

type LeadPreset = {
  source: string;
  category?: WowWishCategoryId;
  template?: WowWishTemplate;
  themeId?: WowWishThemeId;
  packageId?: WowWishPackageId;
  demoUrl?: string;
};

type WowWishV2ExperienceProps =
  | { mode: "home" }
  | { mode: "templates"; categoryId?: undefined }
  | { mode: "category"; categoryId: WowWishCategoryId };

const topLevelOccasionIds: WowWishCategoryId[] = [
  "birthday",
  "anniversary",
  "proposal",
  "wedding-invite",
  "festivals",
  "corporate",
];

const templateFilterTabs: Array<{ id: "all" | WowWishCategoryId; label: string }> = [
  { id: "all", label: "All" },
  { id: "birthday", label: "Birthday" },
  { id: "anniversary", label: "Anniversary" },
  { id: "proposal", label: "Proposal" },
  { id: "festivals", label: "Festivals" },
  { id: "wedding-invite", label: "Wedding" },
  { id: "corporate", label: "Corporate" },
];

const birthdayCategoryTemplateIds = [
  "birthday-pop-story",
  "birthday-bestie-neon",
  "birthday-minimal-cute",
];

const comingSoonCategoryIds: WowWishCategoryId[] = ["festivals", "wedding-invite", "corporate"];

function isComingSoonCategory(categoryId?: "all" | WowWishCategoryId): categoryId is WowWishCategoryId {
  return Boolean(categoryId && categoryId !== "all" && comingSoonCategoryIds.includes(categoryId));
}

const categoryPageStyles: Record<
  WowWishCategoryId,
  {
    eyebrow: string;
    title: string;
    description: string;
    shell: string;
    chip: string;
    accent: string;
  }
> = {
  birthday: {
    eyebrow: "Birthday drops",
    title: "Birthday Templates That Pop",
    description: "For siblings, partners, family, and birthday surprises.",
    shell: "bg-[radial-gradient(circle_at_12%_4%,rgba(255,139,61,0.34),transparent_34%),radial-gradient(circle_at_86%_14%,rgba(255,210,63,0.42),transparent_32%),radial-gradient(circle_at_48%_78%,rgba(255,244,184,0.76),transparent_44%),linear-gradient(135deg,#FFF7D6_0%,#FFE2A8_42%,#FFD08A_72%,#FFF3C4_100%)]",
    chip: "text-orange-500",
    accent: "from-[#F97316] via-[#FFD23F] to-[#FFB347]",
  },
  anniversary: {
    eyebrow: "Romantic pages",
    title: "Anniversary Templates With Heart",
    description: "Turn memories into a page they’ll replay.",
    shell: "bg-[radial-gradient(circle_at_16%_10%,rgba(232,197,122,0.20),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(255,255,255,0.92),transparent_30%),radial-gradient(circle_at_48%_82%,rgba(244,231,213,0.78),transparent_42%),linear-gradient(135deg,#FFFFFF_0%,#FFFDF8_38%,#F7E8D7_72%,#FFF8EA_100%)]",
    chip: "text-amber-700",
    accent: "from-[#FFFFFF] via-[#E8C57A] to-[#B76B83]",
  },
  proposal: {
    eyebrow: "Cinematic reveal",
    title: "Proposal Templates Made for the Big Question",
    description: "Ask with photos, music, words, and a moment.",
    shell: "bg-[radial-gradient(circle_at_12%_8%,rgba(236,72,153,0.24),transparent_34%),radial-gradient(circle_at_86%_14%,rgba(196,181,253,0.36),transparent_32%),radial-gradient(circle_at_52%_78%,rgba(255,214,232,0.70),transparent_44%),linear-gradient(135deg,#FFF7F1_0%,#FFE7F1_42%,#F4E8FF_76%,#FFF8EA_100%)]",
    chip: "text-purple-600",
    accent: "from-[#F9A8D4] via-[#C4B5FD] to-[#FDE68A]",
  },
  festivals: {
    eyebrow: "Indian celebrations",
    title: "Festival Wishes for Every Celebration",
    description: "Diwali, Holi, Uttarayan, Janmashtami, New Year, and more.",
    shell: "bg-[radial-gradient(circle_at_12%_8%,rgba(232,197,122,0.25),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(143,29,18,0.24),transparent_34%),linear-gradient(135deg,#FFF7E4_0%,#FFF1D2_46%,#5A120D_100%)]",
    chip: "text-orange-700",
    accent: "from-[#4B0707] via-[#8F1D12] to-[#E8C57A]",
  },
  corporate: {
    eyebrow: "Business ready",
    title: "Branded Wishes for Customers and Teams",
    description: "Festival greetings, client appreciation, employee celebrations, and offers.",
    shell: "bg-[radial-gradient(circle_at_15%_0%,rgba(37,99,235,0.18),transparent_34%),radial-gradient(circle_at_86%_14%,rgba(232,197,122,0.22),transparent_32%),linear-gradient(135deg,#F7FAFF_0%,#EEF4FF_50%,#07152F_100%)]",
    chip: "text-blue-700",
    accent: "from-[#07152F] via-[#17427A] to-[#E8C57A]",
  },
  "wedding-invite": {
    eyebrow: "Wedding invite links",
    title: "Digital Kankotri & Wedding Invite Templates",
    description: "Elegant invite links for WhatsApp and family sharing.",
    shell: "bg-[radial-gradient(circle_at_15%_10%,rgba(232,197,122,0.24),transparent_35%),radial-gradient(circle_at_88%_16%,rgba(143,29,18,0.22),transparent_34%),linear-gradient(135deg,#FFF8EA_0%,#FFF1F6_42%,#5A120D_100%)]",
    chip: "text-rose-700",
    accent: "from-[#FFF8EA] via-[#E8C57A] to-[#8F1D12]",
  },
};

function getThemeHeadingClass(themeId: WowWishThemeId) {
  if (themeId === "romantic-floral" || themeId === "minimal-elegant") return "tracking-tight";
  if (themeId === "luxury-gold" || themeId === "indian-festive") return "tracking-tight";
  if (themeId === "dark-neon-ai") return "tracking-tight";
  return "tracking-[-0.045em]";
}

function getTemplateThemeClass(template: WowWishTemplate) {
  if (template.themeId === "genz-pop") return "theme-pop";
  if (template.themeId === "dark-neon-ai") return "theme-neon";
  if (template.themeId === "romantic-floral") {
    return template.category === "proposal" ? "theme-proposal" : "theme-romantic";
  }
  if (template.themeId === "indian-festive") {
    return template.category === "wedding-invite" ? "theme-wedding" : "theme-festive";
  }
  if (template.themeId === "luxury-gold") {
    return template.category === "wedding-invite" ? "theme-wedding" : "theme-luxury";
  }
  if (template.themeId === "minimal-elegant") return "theme-minimal";
  if (template.themeId === "corporate-premium") return "theme-corporate";
  return "theme-ai";
}

function getOccasionEmoji(categoryId: WowWishCategoryId) {
  if (categoryId === "birthday") return "🎂";
  if (categoryId === "anniversary") return "♡";
  if (categoryId === "proposal") return "💍";
  if (categoryId === "wedding-invite") return "💌";
  if (categoryId === "festivals") return "🪔";
  if (categoryId === "corporate") return "▣";
  return "✨";
}

const compactTemplateContent: Record<
  string,
  { mood: string; promise: string; chips: string[]; price?: string; bestFor?: string }
> = {
  "birthday-pop-story": {
    mood: "GenZ Pop",
    promise: "A fun birthday page with photos, music, jokes, and full celebration energy.",
    chips: ["Photos", "Music", "Funny copy"],
    bestFor: "Best for anyone",
  },
  "birthday-bestie-neon": {
    mood: "Bestie Glow",
    promise: "A glowing birthday page made for WhatsApp reactions and birthday chaos.",
    chips: ["Photos", "Music", "Bestie vibe"],
    bestFor: "Best for girl bestie",
  },
  "birthday-minimal-cute": {
    mood: "Yaari Warm",
    promise: "A dosti-style birthday page full of memories, warmth, and squad energy.",
    chips: ["Photos", "Music", "Yaari copy"],
    bestFor: "Best for dost/bhai",
  },
  "birthday-luxury-gold": {
    mood: "Luxury",
    promise: "A premium birthday page with royal gold styling and elegant storytelling.",
    chips: ["Photos", "Music", "Premium look"],
    price: "From ₹1,499",
  },
  anniversary: {
    mood: "Romantic",
    promise: "A soft memory page for couples, photos, music, and heartfelt words.",
    chips: ["Photos", "Music", "Love note"],
  },
  "anniversary-cute": {
    mood: "Cute",
    promise: "A playful anniversary page with cute moments, photos, and couple chaos.",
    chips: ["Photos", "Music", "Cute copy"],
  },
  "anniversary-elegant": {
    mood: "Elegant",
    promise: "A premium anniversary page with soft visuals, promises, and calm storytelling.",
    chips: ["Photos", "Music", "Promises"],
    price: "From ₹1,499",
  },
  "proposal-romantic-glow": {
    mood: "Romantic",
    promise: "A sweet proposal page with photos, reasons, and a reveal moment.",
    chips: ["Photos", "Reasons", "Reveal"],
  },
  "proposal-cute-story": {
    mood: "Cute",
    promise: "A playful love page for confession, soft feelings, and personal surprises.",
    chips: ["Photos", "Music", "Cute copy"],
  },
};

type HeroPreviewItem = {
  title: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  fallbackImage?: string;
  backupImage?: string;
  badge: string;
  tone: "birthday" | "proposal" | "anniversary";
  priority?: boolean;
  clipEndSeconds?: number;
  mediaClassName?: string;
};

const heroPreviews: HeroPreviewItem[] = [
  {
    title: "Birthday Yaari",
    type: "video",
    src: "/hero-previews/birthday-yaari-preview-clean.mp4",
    backupImage: "/images/birthday-hero.png",
    badge: "Birthday Yaari",
    tone: "birthday",
    priority: true,
    clipEndSeconds: 29,
    mediaClassName: "object-center",
  },
  {
    title: "Proposal Cute",
    type: "video",
    src: "/hero-previews/proposal-cute-preview-v2-clean.mp4",
    poster: "/hero-previews/proposal-cute-poster.png",
    fallbackImage: "/hero-previews/proposal-cute-preview.png",
    backupImage: "/images/proposal-hero.png",
    badge: "Proposal Cute",
    tone: "proposal",
    clipEndSeconds: 30,
    mediaClassName: "object-center",
  },
];

const HERO_VIDEO_PLAYBACK_RATE = 0.85;

export default function WowWishV2Experience(props: WowWishV2ExperienceProps) {
  const [leadPreset, setLeadPreset] = useState<LeadPreset | null>(null);

  const openLead = (preset: LeadPreset) => {
    trackWowWishEvent("create_wish_modal_open", {
      page: typeof window === "undefined" ? "server" : window.location.pathname,
      source: preset.source,
      occasion: preset.category,
      template_name: preset.template?.name,
      package_name: preset.packageId ? packageOptions[preset.packageId].name : undefined,
      price: preset.packageId ? packageOptions[preset.packageId].price : undefined,
    });
    setLeadPreset(preset);
  };
  const closeLead = () => setLeadPreset(null);

  if (props.mode === "category") {
    return (
      <V2Shell openLead={openLead}>
        <TemplatesPage categoryId={props.categoryId} openLead={openLead} />
        <V2LeadModal open={Boolean(leadPreset)} preset={leadPreset} onClose={closeLead} />
      </V2Shell>
    );
  }

  if (props.mode === "templates") {
    return (
      <V2Shell openLead={openLead}>
        <TemplatesPage openLead={openLead} />
        <V2LeadModal open={Boolean(leadPreset)} preset={leadPreset} onClose={closeLead} />
      </V2Shell>
    );
  }

  return (
    <V2Shell openLead={openLead}>
      <main>
        <HeroSection openLead={openLead} />
        <TrustStrip />
        <ComparisonSection />
        <FeaturedDemos openLead={openLead} />
        <OccasionTemplates openLead={openLead} />
        <HowItWorks />
        <WhatYouGet />
        <PricingSection openLead={openLead} />
        <FAQSection />
        <ContactSection />
      </main>
      <V2LeadModal open={Boolean(leadPreset)} preset={leadPreset} onClose={closeLead} />
    </V2Shell>
  );
}

function V2Shell({
  children,
  openLead,
}: {
  children: React.ReactNode;
  openLead: (preset: LeadPreset) => void;
}) {
  return (
    <div className="ww-v2-root min-h-screen w-full overflow-x-hidden bg-[#FAFAF8] text-slate-950">
      <div aria-hidden className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(224,123,90,0.12),transparent_34%),radial-gradient(circle_at_90%_16%,rgba(232,197,122,0.16),transparent_34%),linear-gradient(180deg,#FAFAF8_0%,#FFF7EF_48%,#FAFAF8_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[760px] bg-[linear-gradient(to_right,rgba(17,24,39,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-45" />
      </div>

      <div className="relative">
        <V2Header openLead={openLead} />
        <MotionSafeWrapper>{children}</MotionSafeWrapper>
        <V2Footer />
      </div>

      <style jsx global>{`
        .ww-v2-root {
          font-family: var(--font-warm);
          overflow-x: hidden;
        }

        .ww-v2-root h1,
        .ww-v2-root h2,
        .ww-display {
          font-family: var(--font-futuristic);
        }

        .ww-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          align-items: start;
          gap: clamp(40px, 6vw, 88px);
        }

        .ww-hero-visual {
          margin: clamp(40px, 4.2vw, 64px) auto 0;
          width: 100%;
          max-width: 420px;
        }

        .ww-hero-title {
          max-width: 620px;
          font-size: 3rem;
          line-height: 1;
          letter-spacing: -0.045em;
          text-wrap: balance;
        }

        @media (max-width: 900px) {
          .ww-hero-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .ww-hero-visual {
            margin: 32px auto 0;
            width: 100%;
            max-width: 340px;
          }

          .ww-hero-title {
            max-width: 100%;
            font-size: 2.25rem;
            line-height: 1.04;
          }
        }

        @media (max-width: 520px) {
          .ww-hero-title {
            font-size: 2.25rem;
          }
        }

        .ww-hero-phone-scroller {
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }

        .ww-hero-phone-scroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function V2Header({ openLead }: { openLead: (preset: LeadPreset) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const nav = [
    { label: "Templates", href: "/templates/birthday" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-900/10 bg-[rgba(255,255,255,0.92)] shadow-[0_14px_45px_rgba(31,20,60,0.08)] backdrop-blur-2xl">
      {isMobileMenuOpen ? (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 cursor-default bg-slate-950/10 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      ) : null}
      <div className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(224,123,90,0.18)] ring-1 ring-slate-900/10">
            <img src={WOWWISH_LOGO_SRC} alt="" className="h-9 w-9 object-contain" />
          </span>
          <span className="text-xl font-black tracking-tight text-slate-950">{BRAND_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav
            .filter((item) => item.label !== "FAQ")
            .map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold text-slate-700 transition hover:text-[#E07B5A]">
                {item.label}
              </Link>
            ))}
          <a
            href="https://instagram.com/wowwish.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-slate-700 transition hover:text-[#E07B5A]"
          >
            Instagram
          </a>
          <Link href="/#faq" className="text-sm font-semibold text-slate-700 transition hover:text-[#E07B5A]">
            FAQ
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => {
            trackGaWhatsappClick("header_cta");
            openLead({ source: "header" });
          }}
          className="ww-shine-button hidden shrink-0 items-center justify-center gap-2 rounded-full bg-[#E07B5A] px-3.5 py-2.5 text-xs font-bold text-white shadow-[0_16px_42px_rgba(224,123,90,0.28)] transition hover:scale-[1.02] hover:bg-[#D86F4D] sm:px-4 sm:text-sm lg:inline-flex"
        >
          Start on WhatsApp
          <Sparkles className="h-4 w-4" />
        </button>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-900/10 bg-white text-slate-950 shadow-[0_12px_32px_rgba(31,20,60,0.10)] lg:hidden"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-[#f0f0f0] px-5">
            <Link href="/" className="inline-flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(224,123,90,0.18)] ring-1 ring-slate-900/10">
                <img src={WOWWISH_LOGO_SRC} alt="" className="h-8 w-8 object-contain" />
              </span>
              <span className="text-xl font-black tracking-tight text-slate-950">{BRAND_NAME}</span>
            </Link>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-950 transition hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col px-5 py-4">
            {nav.filter((item) => item.label !== "FAQ").map((item) =>
              item.label === "Templates" ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 text-base font-medium text-gray-800 transition hover:text-[#E07B5A]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 text-base font-medium text-gray-800 transition hover:text-[#E07B5A]"
                >
                  {item.label}
                </Link>
              ),
            )}
            <a
              href="https://instagram.com/wowwish.in"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-4 text-base font-medium text-gray-800 transition hover:text-[#E07B5A]"
            >
              Instagram
            </a>
            <Link
              href="/#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-4 text-base font-medium text-gray-800 transition hover:text-[#E07B5A]"
            >
              FAQ
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackGaWhatsappClick("mobile_header_cta");
                openLead({ source: "mobile_header" });
              }}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#16A34A] px-5 py-4 text-base font-black text-white shadow-[0_18px_50px_rgba(22,163,74,0.25)] transition hover:bg-[#15803D]"
            >
              Start on WhatsApp
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeroSection({ openLead }: { openLead: (preset: LeadPreset) => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative isolate w-full overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(224,123,90,0.18),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(232,197,122,0.24),transparent_32%),linear-gradient(135deg,#FAFAF8_0%,#FFF7EF_54%,#FAFAF8_100%)] px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:min-h-[calc(100vh-76px)] lg:px-8 lg:pb-16 lg:pt-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="pointer-events-none absolute -right-[60px] -top-[80px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,183,130,0.18)_0%,transparent_70%)] blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-[60px] -left-[40px] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,150,180,0.14)_0%,transparent_70%)] blur-[60px]" />
        <div className="absolute left-[-160px] top-10 h-[420px] w-[420px] rounded-full bg-[#E07B5A]/18 blur-3xl" />
        <div className="absolute right-[-120px] top-0 h-[440px] w-[440px] rounded-full bg-[#E8C57A]/22 blur-3xl" />
        <div className="absolute left-[42%] top-[22%] h-[360px] w-[360px] rounded-full bg-[#F9A8D4]/18 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_30%_20%,rgba(17,24,39,0.055)_1px,transparent_1px)] bg-[size:22px_22px] opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#FAFAF8] to-transparent" />
        {[12, 28, 44, 62, 78].map((left, index) => (
          <span
            key={left}
            className="ww-drift absolute h-1.5 w-1.5 rounded-full bg-[#E07B5A]/35"
            style={{ left: `${left}%`, top: `${18 + index * 12}%`, animationDelay: `${index * 0.7}s` }}
          />
        ))}
      </div>
      <div className="ww-hero-grid relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[clamp(40px,6vw,88px)]">
        <div className="flex min-h-[520px] min-w-0 max-w-2xl flex-col justify-center self-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E07B5A]/18 bg-white/76 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#9A4F38] shadow-[0_16px_40px_rgba(224,123,90,0.10)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[#E8C57A]" />
            WhatsApp-first personalized wish websites
          </div>

          <h1 className="ww-hero-title ww-display mt-12 max-w-[620px] text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-slate-950 drop-shadow-[0_8px_34px_rgba(224,123,90,0.10)] lg:text-5xl lg:leading-none">
            {["A wish page", "they’ll actually", "replay."].map((word, index) => (
              <motion.span
                key={word}
                className="mr-3 inline-block"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.08 + index * 0.1, ease: revealEase }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            Photos, music, memories — turned into a beautiful private link.
          </p>

          <div className="mt-8 grid w-full max-w-md grid-cols-1 gap-3 sm:max-w-none sm:grid-cols-[auto_auto] sm:items-center">
            <a
              href="#demos"
              onClick={() => {
                trackWowWishEvent("hero_cta_click", { page: "/", source: "hero", button_text: "See Live Examples" });
              }}
              className="ww-shine-button inline-flex min-w-0 items-center justify-center gap-2 rounded-2xl bg-[#E07B5A] px-6 py-4 text-sm font-black text-white shadow-[0_22px_70px_rgba(224,123,90,0.30)] transition hover:bg-[#D86F4D]"
            >
              See Live Examples
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => {
                trackGaWhatsappClick("hero_cta");
                trackWowWishEvent("hero_cta_click", { page: "/", source: "hero", button_text: "Start on WhatsApp" });
                openLead({ source: "hero_create" });
              }}
              className="inline-flex min-w-0 items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white/82 px-6 py-4 text-sm font-bold text-slate-950 shadow-sm backdrop-blur transition hover:bg-white"
            >
              Start on WhatsApp
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 max-w-full rounded-2xl border border-[#E07B5A]/14 bg-white/74 px-4 py-3 text-sm font-bold leading-relaxed text-slate-700 shadow-[0_18px_55px_rgba(31,20,60,0.08)] backdrop-blur-xl">
            From {formatInr(WOWWISH_STANDARD_PRICE_INR)} • Photos + music + message • Private shareable link
          </div>
        </div>

        <HeroPhoneShowcase />
      </div>
    </section>
  );
}

function HeroPhoneShowcase() {
  const [birthday, proposal] = heroPreviews;

  return (
    <div className="ww-hero-visual relative mx-auto mt-8 w-full max-w-[340px] min-w-0 lg:mt-[clamp(40px,4.2vw,64px)] lg:max-w-[420px]">
      <div className="relative mx-auto hidden w-full max-w-[420px] md:block">
        <div className="relative flex min-h-[390px] items-center justify-center gap-3">
          <HeroPhoneFrame
            preview={birthday}
            className="z-20 w-[min(50%,190px)] rotate-[-2deg]"
            priority
          />
          <HeroPhoneFrame
            preview={proposal}
            className="z-10 w-[min(46%,175px)] translate-y-6 rotate-[3deg] opacity-95"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[340px] bg-transparent md:hidden">
        <div className="mb-3 text-sm font-black text-slate-600">Swipe real wish page previews</div>
        <div className="ww-hero-phone-scroller flex snap-x gap-4 overflow-x-auto bg-transparent px-0.5 pb-3 pt-8">
          {[birthday, proposal].map((preview, index) => (
            <div
              key={preview.title}
              className="w-[min(72vw,250px)] shrink-0 snap-start bg-transparent"
            >
              <HeroPhoneFrame preview={preview} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroPhoneFrame({
  preview,
  className,
  priority,
}: {
  preview: HeroPreviewItem;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative min-w-0 bg-transparent", className)}>
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#E07B5A] px-3 py-1.5 text-xs font-black text-white shadow-[0_16px_42px_rgba(224,123,90,0.28)]">
        {preview.badge}
      </div>
      <div className="relative aspect-[72/131] overflow-hidden rounded-[30px] border-[4px] border-[#07152F] bg-transparent shadow-none ring-0 md:shadow-[0_24px_70px_rgba(7,21,47,0.18)]">
        <div className="absolute left-1/2 top-2 z-20 h-1 w-12 -translate-x-1/2 rounded-full bg-white/18" />
        <div className="relative h-full overflow-hidden rounded-[24px] bg-transparent">
          <HeroPreviewMedia preview={preview} priority={priority ?? preview.priority} />
        </div>
      </div>
    </div>
  );
}

function HeroPreviewMedia({
  preview,
  priority,
}: {
  preview: HeroPreviewItem;
  priority?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [backupFailed, setBackupFailed] = useState(false);
  const imageSrc = preview.fallbackImage ?? preview.poster ?? preview.src;
  const backupImage = preview.backupImage;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => {
            setVideoFailed(true);
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion, preview.src]);

  if (!reducedMotion && !videoFailed && preview.type === "video") {
    return (
      <video
        ref={videoRef}
        src={preview.src}
        poster={preview.poster ?? preview.fallbackImage ?? preview.backupImage}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setVideoFailed(true)}
        onTimeUpdate={(event) => {
          if (preview.clipEndSeconds && event.currentTarget.currentTime >= preview.clipEndSeconds) {
            event.currentTarget.currentTime = 0;
            void event.currentTarget.play().catch(() => {
              setVideoFailed(true);
            });
          }
        }}
        className={cn("block h-full w-full object-cover", preview.mediaClassName ?? "object-top")}
      />
    );
  }

  if (!imageFailed) {
    return (
      <Image
        src={imageSrc}
        alt={`${preview.title} mobile preview`}
        fill
        sizes="(max-width: 768px) 72vw, 260px"
        priority={priority}
        onError={() => setImageFailed(true)}
        className={cn("object-cover", preview.mediaClassName ?? "object-top")}
      />
    );
  }

  if (backupImage && !backupFailed) {
    return (
      <Image
        src={backupImage}
        alt={`${preview.title} mobile preview`}
        fill
        sizes="(max-width: 768px) 72vw, 260px"
        priority={priority}
        onError={() => setBackupFailed(true)}
        className="object-cover object-top"
      />
    );
  }

  return <HeroPreviewFallback preview={preview} />;
}

function HeroPreviewFallback({ preview }: { preview: HeroPreviewItem }) {
  const copy = {
    birthday: {
      title: "Happy Birthday, Aanya!",
      subtitle: "Photos, music, wishes, and memories.",
      shell: "from-[#ff2aa8] via-[#ffd23f] to-[#20d4ff]",
      card: "bg-white/82 text-[#11142B]",
    },
    proposal: {
      title: "Okay hi, Aanya...",
      subtitle: "Reasons, soft moments, and the reveal.",
      shell: "from-[#fff1f6] via-[#ffd9e8] to-[#f6efe5]",
      card: "bg-white/84 text-[#442936]",
    },
    anniversary: {
      title: "Happy Anniversary",
      subtitle: "Your story, memories, and music.",
      shell: "from-[#fffaf2] via-[#f2e3d4] to-[#e8c57a]",
      card: "bg-white/84 text-[#241d18]",
    },
  }[preview.tone];

  return (
    <div className={cn("relative h-full w-full bg-gradient-to-br p-5", copy.shell)}>
      <div className="absolute inset-4 rounded-[24px] border border-white/42" />
      <div className="relative mt-14 rounded-[24px] bg-white/70 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur">
        <div className={cn("rounded-2xl p-4", copy.card)}>
          <div className="text-[11px] font-black uppercase tracking-[0.18em] opacity-70">{preview.badge}</div>
          <div className="mt-3 text-3xl font-black leading-none tracking-[-0.04em]">{copy.title}</div>
          <div className="mt-3 text-xs font-bold leading-relaxed opacity-70">{copy.subtitle}</div>
        </div>
      </div>
      <div className="relative mt-5 grid grid-cols-3 gap-2">
        {["Photos", "Music", "Link"].map((item) => (
          <div key={item} className="rounded-xl bg-white/70 px-2 py-2 text-center text-[10px] font-black text-slate-900">
            {item}
          </div>
        ))}
      </div>
      <MadeWithWowWish className="absolute bottom-5 right-5 text-white/76" />
    </div>
  );
}

function TrustStrip() {
  const items = ["From ₹999", "Preview before final delivery", "Photos sent on WhatsApp", "Private shareable link"];

  return (
    <section className="bg-[#FAFAF8] px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl snap-x gap-3 overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-visible">
        {items.map((item) => (
          <div key={item} className="min-w-[220px] rounded-2xl border border-slate-900/10 bg-white/82 px-4 py-3 text-center text-sm font-bold text-slate-700 shadow-sm backdrop-blur">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparisonSection() {
  const benefits = [
    { title: "Photos + Music", copy: "Feels personal, not forwarded", icon: Music },
    { title: "Private link", copy: "Only they can open it", icon: Sparkles },
    { title: "WhatsApp ready", copy: "Share in one tap", icon: MessageCircle },
    { title: "Made in hours", copy: "We handle everything", icon: Check },
  ];

  return (
    <section className="bg-[radial-gradient(circle_at_10%_10%,rgba(224,123,90,0.12),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(232,197,122,0.16),transparent_34%),linear-gradient(180deg,#FAFAF8_0%,#FFF7EF_100%)] px-4 py-12 text-[#11162E] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-3 sm:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div key={benefit.title} className="flex items-center gap-4 rounded-[26px] border border-slate-900/10 bg-white/84 p-4 shadow-[0_18px_55px_rgba(31,20,60,0.08)] backdrop-blur-xl">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#E07B5A]/12 text-[#9A4F38] shadow-[0_14px_34px_rgba(224,123,90,0.12)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-base font-black text-slate-950">{benefit.title}</div>
                  <div className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">{benefit.copy}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedDemos({ openLead }: { openLead: (preset: LeadPreset) => void }) {
  const demos = [
    "birthday-pop-story",
    "proposal-romantic-glow",
    "anniversary-cute",
  ]
    .map((id) => wowwishTemplates.find((template) => template.id === id))
    .filter((template): template is WowWishTemplate => Boolean(template));

  return (
    <section id="demos" className="relative scroll-mt-20 bg-[radial-gradient(circle_at_12%_8%,rgba(224,123,90,0.12),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(232,197,122,0.16),transparent_34%),linear-gradient(180deg,#FAFAF8_0%,#FFF7EF_100%)] px-4 py-14 text-slate-950 sm:px-6 lg:px-8">
      <SectionIntro
        eyebrow="Featured live demos"
        title="Start with a proven wish style."
        description="Open a live demo, then customize the same flow with their name, your photos, music, and message."
      />
      <TemplateGrid templates={demos} openLead={openLead} />
      <div className="relative mx-auto mt-7 flex w-full max-w-7xl justify-center">
        <Link
          href="/templates/birthday"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white/82 px-5 py-3 text-sm font-black text-slate-950 shadow-sm backdrop-blur transition hover:bg-white"
        >
          View all templates
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function OccasionTemplates({ openLead }: { openLead: (preset: LeadPreset) => void }) {
  const categories = topLevelOccasionIds
    .map((id) => getWowWishCategory(id))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));

  return (
    <section id="occasions" className="relative bg-[radial-gradient(circle_at_15%_15%,rgba(224,123,90,0.10),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(232,197,122,0.14),transparent_34%),linear-gradient(180deg,#FFF7EF_0%,#FAFAF8_100%)] px-4 py-14 text-slate-950 sm:px-6 lg:px-8">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(249,168,212,0.10),transparent_42%)]" />
      <SectionIntro
        eyebrow="Occasion templates"
        title="One wish style for every relationship."
        description="Birthday, anniversary, proposal, festivals, wedding invites, and branded wishes can each feel completely different."
      />
      <StaggerContainer className="relative mx-auto mt-8 flex w-full max-w-7xl snap-x gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible 2xl:grid-cols-6">
        {categories.map((category) => (
          <AnimatedCard key={category.id} className="min-w-[220px] snap-start lg:h-full lg:min-w-0">
            <Link
              href={`/templates/${category.id}`}
              onClick={() =>
                trackWowWishEvent("category_click", {
                  page: window.location.pathname,
                  source: "occasion_templates",
                  occasion: category.name,
                })
              }
              className="group flex min-h-[210px] flex-col rounded-[28px] border border-slate-900/10 bg-white/82 p-5 shadow-[0_18px_55px_rgba(31,20,60,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#E07B5A]/28 hover:bg-white active:scale-[0.985] lg:min-h-[190px] 2xl:min-h-[230px]"
            >
              <div className="ww-icon-motion grid h-12 w-12 place-items-center rounded-2xl bg-[#E07B5A]/12 text-xl text-[#9A4F38] shadow-[0_14px_34px_rgba(224,123,90,0.12)] transition">
                {getOccasionEmoji(category.id)}
              </div>
              <div className="mt-4 text-base font-black text-slate-950">{category.name}</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-600">{category.shortDescription}</div>
              <div className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-black text-[#E07B5A]">
                Explore <ArrowRight className="ww-arrow-motion h-3.5 w-3.5 transition" />
              </div>
            </Link>
          </AnimatedCard>
        ))}
      </StaggerContainer>
      <div className="relative mx-auto mt-8 flex max-w-7xl justify-center">
        <button
          type="button"
          onClick={() => {
            trackGaWhatsappClick("occasions_cta");
            openLead({ source: "occasions" });
          }}
          className="rounded-2xl bg-[#E07B5A] px-5 py-3 text-sm font-black text-white shadow-[0_18px_55px_rgba(224,123,90,0.24)] transition hover:bg-[#D86F4D]"
        >
          Start on WhatsApp
        </button>
      </div>
    </section>
  );
}

function ThemeCollections({ openLead }: { openLead: (preset: LeadPreset) => void }) {
  const homeThemes = wowwishThemes.filter((theme) =>
    ["genz-pop", "romantic-floral", "indian-festive"].includes(theme.id),
  );

  return (
    <div id="themes" className="relative mx-auto mt-12 w-full max-w-7xl rounded-[34px] border border-white/12 bg-[radial-gradient(circle_at_10%_10%,rgba(255,226,209,0.16),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(238,228,255,0.14),transparent_34%),rgba(255,255,255,0.06)] p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-6">
      <SectionIntro
        eyebrow="Theme collections"
        title="Classy, funky, festive, or cinematic."
        description="Choose the mood first. We use your photos, words, music, and details to make the final page feel personal."
        dark
      />
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {homeThemes.map((theme) => (
          <button
            type="button"
            key={theme.id}
            onClick={() => openLead({ source: "theme_collection", themeId: theme.id })}
            className="group overflow-hidden rounded-[30px] border border-white/14 bg-white/10 p-3 text-left shadow-[0_18px_45px_rgba(0,0,0,0.14)] backdrop-blur transition hover:-translate-y-1"
          >
            <div className={cn("relative h-40 overflow-hidden rounded-[24px] bg-gradient-to-br", theme.colors)}>
              <ThemeDecoration themeId={theme.id} />
              <MadeWithWowWish className="absolute bottom-3 right-3 text-white/74" />
            </div>
            <div className="p-3">
              <div className="text-lg font-black text-white">{theme.name}</div>
              <div className="mt-1 text-sm leading-relaxed text-white/62">{theme.style}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-5">
        <Link
          href="/templates/birthday"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/14 bg-white/10 px-4 py-2.5 text-sm font-black text-white transition hover:bg-white/14"
        >
          View all themes
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function FeaturedTemplates({ openLead }: { openLead: (preset: LeadPreset) => void }) {
  const homeTemplates = ["birthday-pop-story", "anniversary", "proposal-romantic-glow"]
    .map((id) => wowwishTemplates.find((template) => template.id === id))
    .filter((template): template is WowWishTemplate => Boolean(template));

  return (
    <section className="relative bg-[linear-gradient(180deg,#050816_0%,#0B102A_55%,#160B2F_100%)] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(124,58,237,0.24),transparent_35%),radial-gradient(circle_at_85%_22%,rgba(236,72,153,0.18),transparent_34%)]" />
      <SectionIntro
        eyebrow="Featured templates"
        title="Premium wish pages people will actually share."
        description="Visual, mobile-first cards for WhatsApp, Instagram stories, status, and family groups."
        dark
      />
      <TemplateGrid templates={homeTemplates} openLead={openLead} />
      <div className="relative mx-auto mt-7 flex w-full max-w-7xl justify-center">
        <Link
          href="/templates/birthday"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/14"
        >
          View all templates
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ThemeCollections openLead={openLead} />
    </section>
  );
}

function TemplateGrid({
  templates,
  openLead,
}: {
  templates: WowWishTemplate[];
  openLead: (preset: LeadPreset) => void;
}) {
  return (
    <StaggerContainer className="relative mx-auto mt-8 grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <AnimatedCard key={template.id} id={template.id} className="h-full min-w-0">
          <WowWishTemplateCard template={template} openLead={openLead} />
        </AnimatedCard>
      ))}
    </StaggerContainer>
  );
}

function WowWishTemplateCard({
  template,
  openLead,
}: {
  template: WowWishTemplate;
  openLead: (preset: LeadPreset) => void;
}) {
  const theme = getWowWishTheme(template.themeId);
  const themeClass = getTemplateThemeClass(template);
  const compact = compactTemplateContent[template.id];
  const priceLabel = compact?.price ?? template.priceLabel ?? `From ${formatInr(WOWWISH_STANDARD_PRICE_INR)}`;
  const promise = compact?.promise ?? template.promise ?? template.description;
  const mood = compact?.mood ?? template.vibe ?? theme.name;
  const included = (compact?.chips ?? template.included ?? ["Photos", "Music", "Message"]).slice(0, 3);
  const bestFor = compact?.bestFor ?? template.bestFor;
  const isExternalDemo = /^https?:\/\//.test(template.demoPath);
  const hasPreviewImage = Boolean(template.previewImage);

  return (
    <article className={cn("ww-template-card flex h-full min-w-0 flex-col overflow-hidden border border-white/14 bg-[#0B102A]/92 p-3 text-white shadow-[0_22px_70px_rgba(0,0,0,0.20)] backdrop-blur-xl transition duration-300 hover:border-white/24 hover:shadow-[0_32px_90px_rgba(31,20,60,0.34)]", themeClass)}>
      <div
        className={cn(
          "ww-card-preview relative min-h-0 overflow-hidden rounded-[26px] bg-gradient-to-br [&_.ww-card-copy]:hidden",
          hasPreviewImage ? "aspect-video p-0" : "aspect-[16/10] p-4",
          theme.colors,
        )}
      >
        {template.previewImage ? (
          <img
            src={template.previewImage}
            alt={`${template.name} preview`}
            className="absolute inset-0 block h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <ThemeDecoration themeId={theme.id} />
        )}
        <div className={cn("relative z-10 flex items-start justify-between gap-3", hasPreviewImage ? "p-4" : "")}>
          <div className="flex flex-wrap gap-2">
            <span className="ww-card-chip rounded-full px-3 py-1 text-[11px] font-black shadow-sm backdrop-blur">
              {template.occasion}
            </span>
            <span className="ww-card-chip rounded-full px-3 py-1 text-[11px] font-black shadow-sm backdrop-blur">
              {mood}
            </span>
          </div>
          <span className="ww-price-chip rounded-full px-3 py-1 text-[11px] font-black shadow-sm backdrop-blur">
            {priceLabel}
          </span>
        </div>

        {template.previewImage ? null : <ThemePreviewContent template={template} />}
        <MadeWithWowWish className="absolute bottom-4 right-4 z-10 text-white/76" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-2 pt-4">
        <h3 className="line-clamp-2 text-xl font-black tracking-[-0.02em] text-black">{template.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm font-normal leading-relaxed text-gray-500">{promise}</p>
        {bestFor ? (
          <div className="mt-3 w-fit rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[11px] font-normal italic text-gray-400">
            {bestFor}
          </div>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2">
          {included.map((item) => (
            <span key={item} className="rounded-full border border-slate-900/10 bg-white px-3 py-1 text-[11px] font-black text-slate-700">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 pt-5 sm:grid-cols-2">
        <a
          href={template.demoPath}
          target={isExternalDemo ? "_blank" : undefined}
          rel={isExternalDemo ? "noopener noreferrer" : undefined}
          onClick={() =>
            trackWowWishEvent("template_card_click", {
              page: window.location.pathname,
              source: "template_card",
              button_text: "View Demo",
              occasion: template.occasion,
              template_name: template.name,
              price: priceLabel,
            })
          }
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-50"
        >
          View Demo
        </a>
        <button
          type="button"
          onClick={() => {
            trackGaWhatsappClick(getCustomizeEventLabel(template));
            openLead({
              source: "template_card",
              category: template.category,
              template,
              themeId: template.themeId,
              packageId: template.packageId ?? "surprise",
              demoUrl: template.demoPath,
            });
          }}
          className="ww-card-primary inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white transition hover:brightness-110"
        >
          Customize This
        </button>
        </div>
      </div>
    </article>
  );
}

function ThemePreviewContent({ template }: { template: WowWishTemplate }) {
  const theme = getWowWishTheme(template.themeId);
  const isDark =
    template.themeId === "dark-neon-ai" ||
    template.themeId === "luxury-gold" ||
    template.themeId === "indian-festive" ||
    template.themeId === "corporate-premium";

  if (template.id === "birthday-pop-story") {
    return (
      <div className="relative mt-7 overflow-hidden rounded-[28px] border-[3px] border-white bg-[radial-gradient(circle_at_12%_0%,rgba(255,210,63,0.70),transparent_32%),radial-gradient(circle_at_90%_16%,rgba(236,72,153,0.42),transparent_32%),linear-gradient(135deg,#FFF7D6_0%,#FFD23F_42%,#FF8E3C_74%,#EC4899_112%)] p-4 text-[#3B0B2E] shadow-[0_24px_70px_rgba(249,115,22,0.26)]">
        <div className="absolute right-4 top-4 rotate-6 rounded-2xl bg-white px-3 py-2 text-[11px] font-black text-[#F97316] shadow-lg">
          PARTY MODE
        </div>
        <div className="absolute bottom-3 right-5 h-11 w-11 rounded-full bg-[#22D3EE]/70 shadow-[0_0_32px_rgba(34,211,238,0.35)]" />
        <div className="absolute right-20 top-16 h-5 w-5 rotate-45 bg-[#7C3AED]/75" />
        <div className="relative max-w-[78%] rounded-[24px] border border-white/70 bg-white/76 p-4 shadow-[0_18px_48px_rgba(59,11,46,0.14)] backdrop-blur">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#F97316]">birthday story</div>
          <h3 className="mt-3 text-3xl font-black uppercase leading-[0.88] tracking-[-0.05em] text-[#3B0B2E]">
            Birthday Pop Story
          </h3>
        </div>
        <div className="relative mt-4 flex gap-2">
          {["cake", "music", "confetti"].map((item) => (
            <span key={item} className="rounded-full bg-[#3B0B2E] px-3 py-1.5 text-[10px] font-black text-white">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (template.id === "birthday-bestie-neon") {
    return (
      <div className="relative mt-7 overflow-hidden rounded-[28px] border border-white/74 bg-[radial-gradient(circle_at_16%_0%,rgba(249,168,212,0.72),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(196,181,253,0.58),transparent_34%),linear-gradient(135deg,#FFF1F6_0%,#FFDCEB_42%,#EDE9FE_100%)] p-4 text-[#4A102A] shadow-[0_24px_70px_rgba(236,72,153,0.22)] backdrop-blur-md">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#EC4899]/28 blur-2xl" />
        <div className="absolute bottom-4 right-4 rotate-6 rounded-2xl bg-[#BE185D] px-3 py-2 text-[11px] font-black text-white shadow-lg">
          bestie glow
        </div>
        <div className="relative flex gap-2">
          {["hearts", "photos", "sparkles"].map((item) => (
            <span key={item} className="rounded-full border border-[#F9A8D4]/45 bg-white/74 px-2.5 py-1 text-[10px] font-black text-[#BE185D]">
              {item}
            </span>
          ))}
        </div>
        <div className="relative mt-6 max-w-[84%] rounded-[24px] border border-white/76 bg-white/68 p-4 shadow-[0_18px_48px_rgba(190,24,93,0.12)] backdrop-blur">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#BE185D]">for my girl</div>
          <h3 className="mt-3 text-3xl font-black leading-[0.92] tracking-[-0.05em] text-[#4A102A]">
            Happy Birthday, Bestie
          </h3>
        </div>
      </div>
    );
  }

  if (template.id === "birthday-minimal-cute") {
    return (
      <div className="relative mt-7 overflow-hidden rounded-[28px] border border-[#F2D7B6]/80 bg-[radial-gradient(circle_at_12%_0%,rgba(245,158,11,0.36),transparent_34%),radial-gradient(circle_at_90%_12%,rgba(49,92,69,0.22),transparent_32%),linear-gradient(135deg,#FFF8EA_0%,#F5E1C1_52%,#D9E2D1_100%)] p-4 text-[#132B35] shadow-[0_24px_70px_rgba(31,78,95,0.16)] backdrop-blur-md">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#315C45]/18 blur-xl" />
        <div className="absolute bottom-3 right-4 rotate-3 rounded-2xl bg-[#132B35] px-3 py-2 text-[11px] font-black uppercase text-[#FDE68A] shadow-lg">
          yaari log
        </div>
        <div className="relative flex gap-2">
          {["chai", "trip", "memories"].map((item) => (
            <span key={item} className="rounded-full border border-[#D7B98F]/70 bg-[#FFF8EA]/78 px-2.5 py-1 text-[10px] font-black text-[#73502F] shadow-sm">
              {item}
            </span>
          ))}
        </div>
        <div className="relative mt-5 rounded-[24px] border border-[#D7B98F]/70 bg-[#FFF8EA]/72 p-4 shadow-[0_18px_48px_rgba(31,78,95,0.10)]">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#B45309]">dost/bhai</div>
          <h3 className="mt-3 text-3xl font-black leading-[0.92] tracking-[-0.05em] text-[#132B35]">
            Happy Birthday, Bhai
          </h3>
        </div>
      </div>
    );
  }

  if (template.id === "proposal-cute-story") {
    return (
      <div className="relative mt-7 overflow-hidden rounded-[28px] border border-white/78 bg-[radial-gradient(circle_at_10%_0%,rgba(236,72,153,0.28),transparent_34%),radial-gradient(circle_at_90%_14%,rgba(196,181,253,0.45),transparent_32%),linear-gradient(135deg,#FFF7F1_0%,#FFDCEB_46%,#F1E8FF_100%)] p-4 text-[#4A102A] shadow-[0_24px_70px_rgba(190,24,93,0.18)] backdrop-blur-md">
        <div className="absolute -left-8 top-5 h-28 w-28 rounded-full bg-[#EC4899]/22 blur-2xl" />
        <div className="absolute bottom-3 right-4 h-16 w-16 rounded-full bg-[#C4B5FD]/42 blur-xl" />
        <div className="absolute right-4 top-4 rounded-full border border-[#F9A8D4]/42 bg-white/72 px-3 py-1.5 text-[11px] font-black text-[#BE185D] shadow-sm backdrop-blur">
          reveal moment
        </div>
        <div className="relative mt-8 max-w-[84%] rounded-[24px] border border-white/80 bg-white/72 p-4 shadow-[0_18px_45px_rgba(190,24,93,0.14)] backdrop-blur">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#BE185D]">proposal page</div>
          <h3 className="mt-3 text-3xl font-black leading-[0.96] tracking-[-0.04em] text-[#4A102A]">
            Okay hi, I need to ask you something...
          </h3>
        </div>
        <div className="relative mt-4 ml-auto w-fit rounded-2xl bg-[#BE185D] px-3 py-2 text-xs font-black text-white shadow-[0_14px_42px_rgba(190,24,93,0.22)]">
          7 reasons + music
        </div>
      </div>
    );
  }

  if (template.id === "holi-color-splash") {
    return (
      <div className="relative mt-7 overflow-hidden rounded-[28px] border-[3px] border-white bg-[#fffaf2]/88 p-4 shadow-[0_24px_70px_rgba(34,211,238,0.20)] backdrop-blur-md">
        <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#ff2aa8]/70 blur-xl" />
        <div className="absolute right-0 top-8 h-24 w-24 rounded-full bg-[#22D3EE]/75 blur-xl" />
        <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-[#FFD23F]/80 blur-xl" />
        <div className="relative rounded-[24px] border border-white/70 bg-white/58 p-4 text-center">
          <div className="text-xs font-black uppercase tracking-[0.24em] text-[#7C3AED]">festival blast</div>
          <h3 className="mt-4 text-3xl font-black uppercase leading-[0.86] text-[#07152F]">
            Holi Color Splash
          </h3>
          <div className="mt-5 flex justify-center gap-2">
            {["pink", "blue", "gold"].map((item) => (
              <span key={item} className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-[#ff2aa8] via-[#22D3EE] to-[#FFD23F] shadow-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (template.themeId === "genz-pop") {
    return (
      <div className="relative mt-8">
        <div className="absolute -right-2 top-0 rotate-6 rounded-2xl bg-[#22D3EE] px-3 py-2 text-xs font-black text-[#07152F] shadow-[0_16px_40px_rgba(34,211,238,0.28)]">
          STORY READY
        </div>
        <div className="max-w-[88%] rotate-[-2deg] rounded-[24px] border-[3px] border-white bg-white/82 p-4 shadow-[0_22px_64px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <h3 className={cn("ww-card-title text-3xl font-black uppercase leading-[0.9]", getThemeHeadingClass(template.themeId))}>
            {template.name}
          </h3>
          <p className="ww-card-copy mt-3 text-sm font-black leading-relaxed">{template.description}</p>
        </div>
        <div className="relative mt-5 inline-flex rotate-[-2deg] items-center gap-2 rounded-full bg-[#10142B] px-3 py-1.5 text-[11px] font-black text-white">
          <Music className="h-3.5 w-3.5 text-[#FFD23F]" />
          Photos + music + message
        </div>
      </div>
    );
  }

  if (template.themeId === "romantic-floral") {
    const romanticLabel =
      template.category === "proposal"
        ? "soft proposal"
        : template.category === "wedding-invite"
          ? "floral invite"
          : template.category === "festivals"
            ? "family rakhi"
            : "romantic note";
    const romanticMark = template.category === "proposal" ? "say yes" : template.category === "wedding-invite" ? "save the date" : "love note";

    if (template.category === "proposal") {
      return (
        <div className="relative mt-8 max-w-[92%] overflow-hidden rounded-[28px] border border-white/78 bg-[radial-gradient(circle_at_84%_8%,rgba(236,72,153,0.26),transparent_32%),radial-gradient(circle_at_12%_86%,rgba(196,181,253,0.42),transparent_34%),linear-gradient(135deg,#FFF7F1_0%,#FFE4F0_48%,#F4E8FF_100%)] p-4 text-[#4A102A] shadow-[0_24px_70px_rgba(124,58,237,0.14)] backdrop-blur-md">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F472B6]/24 blur-2xl" />
          <div className="relative w-fit rounded-full border border-[#F9A8D4]/45 bg-white/70 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#BE185D]">
            {romanticLabel}
          </div>
          <h3 className="relative mt-5 text-3xl font-black leading-[0.95] tracking-[-0.04em] text-[#4A102A]">
            {template.name}
          </h3>
          <p className="ww-card-copy relative mt-3 text-sm font-semibold leading-relaxed text-[#7B3C56]">{template.description}</p>
          <div className="relative mt-4 w-fit rounded-full bg-[#BE185D] px-3 py-1.5 text-xs font-black text-white">{romanticMark}</div>
        </div>
      );
    }

    return (
      <div className="relative mt-9 max-w-[90%] rounded-[28px] border border-[#d8a0b2]/45 bg-[#fff8f5]/82 p-5 shadow-[0_24px_70px_rgba(183,107,131,0.22)] backdrop-blur-md">
        <div className="absolute -right-4 -top-5 h-16 w-16 rounded-full bg-[#f4b7ca]/70 blur-sm" />
        <div className="relative text-xs font-black uppercase tracking-[0.22em] text-[#B76B83]">{romanticLabel}</div>
        <h3 className={cn("ww-card-title relative mt-3 text-3xl font-semibold leading-tight", getThemeHeadingClass(template.themeId))}>
          {template.name}
        </h3>
        <p className="ww-card-copy relative mt-3 text-sm font-semibold leading-relaxed">{template.description}</p>
        <div className="relative mt-4 w-fit rounded-full bg-[#B76B83]/10 px-3 py-1.5 text-xs font-black text-[#B76B83]">{romanticMark}</div>
      </div>
    );
  }

  if (template.themeId === "luxury-gold" || template.themeId === "indian-festive") {
    const festive = template.themeId === "indian-festive";
    const luxuryLabel =
      template.id === "proposal-luxury-letter"
        ? "premium proposal"
        : template.id === "birthday-luxury-gold"
          ? "milestone birthday"
          : template.id === "new-year-sparkle"
            ? "countdown wish"
            : festive
              ? "festive wish"
              : "premium letter";

    return (
      <div className="relative mt-9 max-w-[90%] rounded-[26px] border border-[#E8C57A]/60 bg-[#2a0e0e]/70 p-5 text-[#FFF3C4] shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-md">
        <div className="absolute inset-3 rounded-[20px] border border-[#E8C57A]/35" />
        <div className="relative text-xs font-black uppercase tracking-[0.22em] text-[#E8C57A]">
          {luxuryLabel}
        </div>
        <h3 className={cn("ww-card-title relative mt-4 text-3xl font-semibold leading-tight", getThemeHeadingClass(template.themeId))}>
          {template.name}
        </h3>
        <p className="ww-card-copy relative mt-3 text-sm font-semibold leading-relaxed">{template.description}</p>
        <div className="relative mt-5 flex gap-2">
          {[0, 1, 2].map((item) => (
            <span key={item} className="h-2 w-8 rounded-full bg-[#E8C57A]/75" />
          ))}
        </div>
      </div>
    );
  }

  if (template.id === "janmashtami-divine-blue") {
    return (
      <div className="relative mt-7 max-w-[92%] overflow-hidden rounded-[26px] border border-[#22D3EE]/28 bg-[radial-gradient(circle_at_25%_15%,rgba(34,211,238,0.32),transparent_30%),#07152F] p-4 text-white shadow-[0_0_70px_rgba(34,211,238,0.18)] backdrop-blur-md">
        <div className="absolute right-5 top-5 text-4xl text-[#E8C57A]/80">ॐ</div>
        <div className="relative text-[11px] font-black uppercase tracking-[0.24em] text-[#BFF4FF]">divine blue wish</div>
        <h3 className="relative mt-5 text-3xl font-semibold leading-tight text-white">
          Janmashtami Divine Blue
        </h3>
        <div className="relative mt-5 rounded-2xl border border-[#E8C57A]/30 bg-[#E8C57A]/10 px-3 py-2 text-[11px] font-black text-[#FDE68A]">
          flute music + blessing message
        </div>
      </div>
    );
  }

  if (template.id === "brand-new-year-wish") {
    return (
      <div className="relative mt-7 max-w-[92%] overflow-hidden rounded-[26px] border border-[#22D3EE]/28 bg-[#07152F]/84 p-4 text-white shadow-[0_0_70px_rgba(37,99,235,0.18)] backdrop-blur-md">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#2563EB]/40 blur-2xl" />
        <div className="relative rounded-2xl border border-white/10 bg-white/8 px-3 py-2 text-[11px] font-black text-[#BFF4FF]">
          brand greeting
        </div>
        <h3 className="relative mt-5 text-3xl font-black leading-[0.95] tracking-[-0.04em] text-white">
          Happy New Year 2026
        </h3>
        <div className="relative mt-4 grid grid-cols-2 gap-2 text-[10px] font-black">
          <span className="rounded-xl bg-white/10 px-2 py-2 text-center text-white/80">logo</span>
          <span className="rounded-xl bg-white/10 px-2 py-2 text-center text-white/80">offer</span>
        </div>
      </div>
    );
  }

  if (template.themeId === "dark-neon-ai") {
    return (
      <div className="relative mt-8 max-w-[92%] rounded-[26px] border border-[#22D3EE]/28 bg-[#070B1F]/72 p-4 text-white shadow-[0_0_65px_rgba(34,211,238,0.18)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/8 px-3 py-2 text-[11px] font-black text-[#BFF4FF]">
          Neon preview
          <Sparkles className="h-3.5 w-3.5 text-[#EC4899]" />
        </div>
        <h3 className={cn("ww-card-title mt-4 text-3xl font-black leading-tight", getThemeHeadingClass(template.themeId))}>
          {template.name}
        </h3>
        <p className="ww-card-copy mt-3 text-sm font-semibold leading-relaxed">{template.description}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Photos", "Music", "Link"].map((item) => (
            <span key={item} className="rounded-xl border border-[#22D3EE]/20 bg-[#22D3EE]/10 px-2 py-2 text-center text-[10px] font-black text-[#BFF4FF]">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (template.themeId === "corporate-premium") {
    const corporateLabel = template.id === "employee-celebration-page" ? "team milestone" : "brand campaign";
    const corporateFeature = template.id === "employee-celebration-page" ? "people-first greeting" : "logo + message + offer";

    return (
      <div className="relative mt-8 max-w-[92%] overflow-hidden rounded-[26px] border border-[#E8C57A]/28 bg-[#07152F]/82 p-4 text-white shadow-[0_24px_70px_rgba(7,21,47,0.28)] backdrop-blur-md">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#E8C57A]/24 blur-2xl" />
        <div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-3 py-2 text-[11px] font-black text-[#FDE68A]">
          {corporateLabel}
          <Building2 className="h-3.5 w-3.5" />
        </div>
        <h3 className="relative mt-5 text-3xl font-black leading-tight tracking-[-0.04em] text-white">
          {template.name}
        </h3>
        <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/8 px-3 py-2 text-[11px] font-black text-white/76">
          {corporateFeature}
        </div>
      </div>
    );
  }

  const defaultLabel =
    template.id === "uttarayan-kite-vibe"
      ? "kite season"
      : template.id === "minimal-couple-invite"
        ? "quiet luxury invite"
        : template.id === "client-appreciation-page"
          ? "thank-you note"
          : "minimal story";
  const defaultFeature =
    template.id === "uttarayan-kite-vibe"
      ? "family + customers"
      : template.id === "minimal-couple-invite"
        ? "couple details"
        : template.id === "client-appreciation-page"
          ? "client gratitude"
          : "photos + music + message";

  return (
    <div className="relative mt-9 max-w-[88%] rounded-[28px] border border-[#E8C57A]/40 bg-white/78 p-5 shadow-[0_24px_70px_rgba(31,20,60,0.12)] backdrop-blur-md">
      <div className="mb-7 h-1 w-16 rounded-full bg-[#E8C57A]" />
      <div className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#8B6A3D]">{defaultLabel}</div>
      <h3 className={cn("ww-card-title text-3xl font-semibold leading-tight", getThemeHeadingClass(template.themeId))}>
        {template.name}
      </h3>
      <p className="ww-card-copy mt-4 text-sm font-semibold leading-relaxed">{template.description}</p>
      <div className={cn("mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-black", isDark ? "bg-white/12 text-white" : "bg-[#F4E7D5] text-[#5E452C]")}>
        <Music className="h-3.5 w-3.5" />
        {defaultFeature}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Pick a template", copy: "Choose the occasion and mood.", icon: Palette },
    { title: "Send details on WhatsApp", copy: "Names, photos, music preference, message, and deadline.", icon: MessageCircle },
    { title: "We create your page", copy: "We personalize the copy, photos, music, sections, and design flow.", icon: Sparkles },
    { title: "Share the link", copy: "Send it on WhatsApp, Instagram, status, or family groups.", icon: Send },
  ];

  return (
    <section className="relative bg-[radial-gradient(circle_at_18%_16%,rgba(224,123,90,0.10),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(232,197,122,0.16),transparent_34%),linear-gradient(180deg,#FAFAF8_0%,#FFF7EF_100%)] px-4 py-14 text-slate-950 sm:px-6 lg:px-8">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(249,168,212,0.10),transparent_40%)]" />
      <SectionIntro
        eyebrow="How it works"
        title="Simple for you. Special for them."
        description="We personalize the copy, photos, music, sections, and design flow."
      />
      <div className="relative mx-auto mt-10 w-full max-w-6xl">
        <div aria-hidden className="relative mx-auto mb-5 hidden h-12 w-[82%] items-center lg:flex">
          <div className="absolute inset-x-0 top-1/2 h-[10px] -translate-y-1/2 overflow-hidden rounded-full bg-slate-900/10 shadow-[0_14px_34px_rgba(31,20,60,0.08)]">
            <span className="ww-flow-line block h-full rounded-full bg-gradient-to-r from-[#E07B5A] via-[#E8C57A] to-[#F9A8D4] shadow-[0_0_24px_rgba(224,123,90,0.32)]" />
          </div>
          <div className="ww-flow-dot absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-2 border-white bg-[#E07B5A] shadow-[0_16px_42px_rgba(224,123,90,0.32)]">
            <ArrowRight className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white" />
          </div>
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className="relative z-10 grid h-7 w-7 place-items-center rounded-full border border-slate-900/10 bg-white text-[11px] font-black text-slate-600 shadow-sm"
              style={{ marginLeft: step === 1 ? 0 : "auto" }}
            >
              {step}
            </span>
          ))}
        </div>

        <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="h-full min-h-[170px] rounded-[28px] border border-slate-900/10 bg-white/84 p-4 shadow-[0_18px_55px_rgba(31,20,60,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#E07B5A]/24 hover:bg-white">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#E07B5A]/18 bg-[#E07B5A]/12 text-[#9A4F38] shadow-[0_14px_34px_rgba(224,123,90,0.12)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-black text-[#E07B5A]/16">0{index + 1}</div>
                </div>
                <div className="mt-4 text-base font-black text-slate-950">{step.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-slate-600">{step.copy}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhatYouGet() {
  const items = [
    {
      title: "Personalized name and occasion",
      copy: "The page is written around their name, relation, and celebration.",
    },
    {
      title: "Photos, music, and message",
      copy: "Your memories, selected mood, and message become the story.",
    },
    {
      title: "Mobile-first private link",
      copy: "A beautiful link made for WhatsApp, status, and Instagram sharing.",
    },
    {
      title: "Preview before final delivery",
      copy: "You can check the flow before the final private link is shared.",
    },
    {
      title: "WhatsApp/Instagram-ready format",
      copy: "Designed to feel natural on phones, stories, and family groups.",
    },
    {
      title: "Manual personalization and polish",
      copy: "Copy, photos, sections, and tone are adjusted for the occasion.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(255,226,209,0.70),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(238,228,255,0.62),transparent_34%),linear-gradient(180deg,#FFF7EF_0%,#F7EEFF_100%)] px-4 py-16 text-[#11162E] sm:px-6 lg:px-8">
      <div aria-hidden className="absolute -left-28 top-28 h-72 w-72 rounded-full bg-[#EC4899]/14 blur-3xl" />
      <div aria-hidden className="absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-[#7C3AED]/16 blur-3xl" />
      <div className="relative mx-auto w-full max-w-[1040px] text-center">
        <div className="ww-section-eyebrow text-[#7C3AED]">What you get</div>
        <h2 className="ww-display mt-3 text-balance text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-slate-950">
          Everything needed to make the wish feel personal.
        </h2>
        <p className="mx-auto mt-3 max-w-[720px] text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.65] text-slate-600">
          You do not need to design anything. Share the details, and we create the page flow manually.
        </p>
      </div>
      <div className="relative mx-auto mt-8 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div key={item.title} className="group h-full overflow-hidden rounded-[30px] border border-white/80 bg-white/84 p-5 shadow-[0_20px_60px_rgba(31,20,60,0.10)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(124,58,237,0.16)]">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#22D3EE] text-white shadow-[0_18px_40px_rgba(124,58,237,0.22)]">
                <Check className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-[#7C3AED]/70">Included 0{index + 1}</div>
                <div className="mt-1 text-base font-black leading-snug text-slate-950">{item.title}</div>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">{item.copy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  const [showMore, setShowMore] = useState(false);
  const faqs = [
    ["What exactly is WowWish?", "WowWish is a manually customized digital wish page service. We create a private web link with photos, music, memories, and your message."],
    ["Is this a website or an image?", "It is a mobile-first wish website, not just a static image."],
    ["What is included in the ₹999 package?", "A personalized wish page with name, message, 6–8 photos, music, basic animation, preview, and a private shareable link."],
    ["How do I place an order?", "Choose a template or package, submit details, and continue on WhatsApp."],
    ["Do I need to pay immediately?", "No. We confirm your details and final flow first."],
    ["What is included in the ₹1,499 package?", "A richer memory story with custom emotional letter-style copy, 10–15 photos, premium section flow, stronger animation, and one revision."],
    ["Why should I pay ₹999 instead of sending a normal wish?", "Because WowWish feels personal, replayable, and shareable. It is made around your photos, relationship, and message."],
    ["How do I send photos?", "Photos can be sent on WhatsApp after submitting the form."],
    ["Can I choose the music?", "Yes. You can share a song or mood, and we will match it where possible."],
    ["Can you write the message for me?", "Yes. We can write short emotional copy or a premium letter-style message."],
    ["How long does delivery take?", "Delivery depends on complexity and urgency. We confirm timing on WhatsApp."],
    ["Can I get urgent delivery?", "Usually yes, depending on current workload. Ask on WhatsApp."],
    ["Can I edit the page after preview?", "Yes. Premium includes one revision after preview; smaller fixes can be discussed."],
    ["Is the link private?", "Yes. The link is private and shareable with the people you choose."],
    ["Will the link expire?", "We confirm hosting/link duration before payment."],
    ["Can I remove WowWish branding?", "This can be discussed for premium/custom orders."],
    ["Can I use Hindi, Gujarati, or Hinglish?", "Yes. You can choose English, Hindi, Gujarati, Hinglish, or a mix."],
    ["Can you make wedding invites or digital kankotri?", "Yes. We create digital wedding invite and kankotri pages."],
    ["Do you make corporate or festival greetings?", "Yes. We create branded festival greetings for clients, teams, creators, and businesses."],
    ["What happens after I click WhatsApp?", "You will send us the prefilled order details, then we confirm flow, price, photos, timing, and next steps."],
  ];
  const visibleFaqs = showMore ? faqs : faqs.slice(0, 5);

  return (
    <section id="faq" className="bg-[radial-gradient(circle_at_10%_10%,rgba(255,226,209,0.55),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(238,228,255,0.50),transparent_34%),linear-gradient(180deg,#FFF7EF_0%,#F7EEFF_100%)] px-4 py-12 text-[#11162E] sm:px-6 sm:py-14 lg:px-8">
      <SectionIntro
        eyebrow="FAQ"
        title="Questions before you start?"
        description="Here are the practical details before you continue on WhatsApp."
      />
      <div className="mx-auto mt-8 grid max-w-[860px] gap-3">
        {visibleFaqs.map(([question, answer]) => (
          <details key={question} className="rounded-2xl border border-slate-900/10 bg-white/84 p-4 shadow-sm transition">
            <summary className="cursor-pointer text-sm font-black text-slate-950">{question}</summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{answer}</p>
          </details>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setShowMore((value) => !value)}
          className="rounded-2xl border border-slate-900/10 bg-white/88 px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-white"
        >
          {showMore ? "Show fewer questions" : "Show more questions"}
        </button>
      </div>
    </section>
  );
}

function PricingSection({ openLead }: { openLead: (preset: LeadPreset) => void }) {
  return (
    <section id="pricing" className="relative bg-[radial-gradient(circle_at_10%_10%,rgba(255,226,209,0.55),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(238,228,255,0.50),transparent_34%),linear-gradient(180deg,#FFF7EF_0%,#F7EEFF_100%)] px-4 py-14 text-[#11162E] sm:px-6 lg:px-8">
      <SectionIntro
        eyebrow="Pricing"
        title="Choose the wish page package."
        description="Start simple with a beautiful personal page, or go premium for deeper storytelling and extra polish."
      />
      <div className="mx-auto mt-8 grid w-full max-w-5xl gap-5 lg:grid-cols-2">
        <PriceCard
          name="Surprise Page"
          price={WOWWISH_STANDARD_PRICE_INR}
          description="A beautiful personalized wish page made with their name, your message, photos, music, and a private shareable link. Perfect when you want something more special than a normal WhatsApp message."
          features={[
            "Personalized name and occasion",
            "6–8 photos",
            "Background music",
            "Private shareable link",
            "Preview before final delivery",
            "Custom message or short emotional copy",
            "Mobile-first wish page",
            "WhatsApp/Instagram-ready format",
            "Basic animation and section flow",
          ]}
          cta="Start with ₹999"
          onClick={() => {
            trackWowWishEvent("pricing_cta_click", { source: "pricing", package_name: "Surprise Page", price: "₹999" });
            openLead({ source: "pricing_standard", packageId: "surprise" });
          }}
        />
        <PriceCard
          name="Premium Memory Story"
          price={WOWWISH_PREMIUM_PRICE_INR}
          premium
          description="A richer, more emotional wish page with premium design polish, deeper storytelling, custom letter-style copy, better photo flow, and cinematic memory sections."
          features={[
            "Everything in Surprise Page",
            "10–15 photos",
            "Custom emotional letter",
            "Premium story flow",
            "One revision after preview",
            "Better animation flow",
            "Photo enhancement where useful",
            "Music mood matching",
            "Custom theme polish",
            "More personal captions/memory sections",
          ]}
          cta="Make it Premium"
          onClick={() => {
            trackWowWishEvent("pricing_cta_click", { source: "pricing", package_name: "Premium Memory Story", price: "₹1,499" });
            openLead({ source: "pricing_premium", packageId: "premium" });
          }}
        />
      </div>
      <div className="mx-auto mt-5 max-w-5xl rounded-3xl border border-[#E8C57A]/35 bg-[#070B1F] p-5 text-white shadow-[0_22px_70px_rgba(31,20,60,0.16)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-black">Need branded wishes?</div>
            <div className="mt-1 text-sm text-white/62">Ask for custom pricing for teams, customers, creators, and campaign pages.</div>
          </div>
          <button
            type="button"
            onClick={() => openLead({ source: "pricing_corporate", category: "corporate", packageId: "premium" })}
            className="ww-shine-button rounded-2xl bg-[#E8C57A] px-5 py-3 text-sm font-black text-[#070B1F]"
          >
            Ask for custom pricing
          </button>
        </div>
      </div>
    </section>
  );
}

function PriceCard({
  name,
  price,
  description,
  features,
  premium,
  cta,
  onClick,
}: {
  name: string;
  price: number;
  description: string;
  features: string[];
  premium?: boolean;
  cta: string;
  onClick: () => void;
}) {
  const visibleFeatures = features.slice(0, 5);
  const hiddenFeatures = features.slice(5);

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[32px] p-5 shadow-[0_22px_70px_rgba(31,20,60,0.12)] sm:p-6",
        premium
          ? "border border-[#E8C57A]/55 bg-gradient-to-br from-[#16091f] via-[#3B1D5F] to-[#070B1F] text-white"
          : "border border-white/80 bg-white/86 text-slate-950 backdrop-blur",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xl font-black">{name}</div>
          <div className={cn("mt-1 max-w-sm text-sm font-semibold leading-6", premium ? "text-white/68" : "text-slate-600")}>{description}</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-black uppercase tracking-[0.18em] opacity-60">From</div>
          <div className="text-3xl font-black">{formatInr(price)}</div>
        </div>
      </div>
      <div className="mt-6 grid gap-2">
        {visibleFeatures.map((feature) => (
          <div
            key={feature}
            className={cn(
              "flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold",
              premium ? "border border-white/10 bg-white/10" : "border border-slate-900/10 bg-white/70",
            )}
          >
            <Check className={cn("h-4 w-4", premium ? "text-[#E8C57A]" : "text-[#7C3AED]")} />
            {feature}
          </div>
        ))}
      </div>
      {hiddenFeatures.length ? (
        <details className={cn("mt-3 rounded-2xl border p-4", premium ? "border-white/10 bg-white/10" : "border-slate-900/10 bg-white/60")}>
          <summary className="cursor-pointer text-sm font-black">See all included</summary>
          <div className="mt-3 grid gap-2">
            {hiddenFeatures.map((feature) => (
              <div key={feature} className={cn("flex items-center gap-2 text-sm font-bold", premium ? "text-white/82" : "text-slate-700")}>
                <Check className={cn("h-4 w-4", premium ? "text-[#E8C57A]" : "text-[#7C3AED]")} />
                {feature}
              </div>
            ))}
          </div>
        </details>
      ) : null}
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "ww-shine-button mt-auto w-full rounded-2xl px-5 py-3 text-sm font-black",
          premium ? "bg-[#E8C57A] text-[#16091f]" : "bg-[#E07B5A] text-white",
        )}
      >
        {cta}
      </button>
      <div className={cn("mt-3 text-center text-xs font-bold", premium ? "text-white/62" : "text-slate-500")}>
        No payment now — we confirm your details and final flow first.
      </div>
    </div>
  );
}

function CorporateSection({ openLead }: { openLead: (preset: LeadPreset) => void }) {
  const useCases = [
    "Diwali customer greeting",
    "New Year brand wish",
    "Festival offer page",
    "Employee celebration page",
    "Client appreciation page",
  ];

  return (
    <section className="relative bg-[#FFF7F1] px-4 py-14 text-[#11162E] sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 rounded-[36px] border border-white/80 bg-gradient-to-br from-[#07152f] via-[#15356d] to-[#3B1D5F] p-5 text-white shadow-[0_28px_95px_rgba(31,20,60,0.22)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-white/74">
            <Building2 className="h-3.5 w-3.5 text-[#E8C57A]" />
            Corporate / festival use case
          </div>
          <h2 className="mt-5 text-balance text-3xl font-black tracking-tight sm:text-5xl">
            For brands, creators, and businesses too
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
            Create branded festival wishes for Diwali, Holi, New Year, Uttarayan, Janmashtami, and more — with your
            company name, logo, offer, and shareable link.
          </p>
          <button
            type="button"
            onClick={() => {
              trackGaWhatsappClick("corporate_cta");
              openLead({ source: "corporate", category: "corporate", themeId: "corporate-premium" });
            }}
            className="ww-shine-button mt-6 rounded-2xl bg-[#E8C57A] px-5 py-3 text-sm font-black text-[#07152f]"
          >
            Start on WhatsApp
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {useCases.map((useCase) => (
            <div key={useCase} className="rounded-3xl border border-white/10 bg-white/10 p-4 text-sm font-bold text-white/86 backdrop-blur">
              {useCase}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const whatsappHref = buildWowWishWhatsAppUrl();

  return (
    <section className="relative bg-[radial-gradient(circle_at_10%_10%,rgba(255,226,209,0.55),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(238,228,255,0.50),transparent_34%),linear-gradient(180deg,#FFF7EF_0%,#F7EEFF_100%)] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-white/15 bg-[linear-gradient(135deg,#2A0E4F_0%,#5B1C75_55%,#EC4899_130%)] p-6 shadow-[0_28px_90px_rgba(31,20,60,0.22)] backdrop-blur sm:p-8">
        <div className="mb-7 rounded-[28px] border border-[#E8C57A]/22 bg-[linear-gradient(135deg,#071B3A_0%,#23134A_100%)] p-5 backdrop-blur">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="text-left">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#E8C57A]">
                Corporate / Festival
              </div>
            <div className="mt-2 text-xl font-extrabold text-white">Need branded wishes for customers or teams?</div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/68">
                Create Diwali, New Year, client greeting, employee celebration, or offer pages with your brand details.
              </p>
            </div>
            <Link
              href="/templates/corporate"
              className="ww-shine-button inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E8C57A] px-5 py-3 text-sm font-black text-[#070B1F]"
            >
              Explore corporate wishes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#E8C57A]">Order CTA</div>
            <h2 className="ww-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Ready to make someone say WoW?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/72">
              No payment now — we’ll confirm details first. Photos can be sent on WhatsApp after submission.
            </p>
          </div>
          <div className="grid gap-2 sm:flex">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWowWishEvent("whatsapp_open", {
                  page: window.location.pathname,
                  source: "final_cta",
                  button_text: "Chat on WhatsApp",
                })
              }
              className="ww-shine-button inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E8C57A] px-5 py-3 text-sm font-black text-[#070B1F]"
            >
              Chat on WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white"
            >
              Email Us
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TemplatesPage({
  categoryId,
  openLead,
}: {
  categoryId?: WowWishCategoryId;
  openLead: (preset: LeadPreset) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<"all" | WowWishCategoryId>("all");
  const [showAll, setShowAll] = useState(false);
  const category = categoryId ? getWowWishCategory(categoryId) : undefined;
  const categoryStyle = categoryId ? categoryPageStyles[categoryId] : undefined;
  const isProposalPage = categoryId === "proposal";
  const popularTemplates = getFeaturedWowWishTemplates().slice(0, 3);
  const popularIds = new Set(popularTemplates.map((template) => template.id));
  const comingSoonCategoryId =
    categoryId && isComingSoonCategory(categoryId)
      ? categoryId
      : !categoryId && isComingSoonCategory(activeFilter)
        ? activeFilter
        : undefined;
  const filteredTemplates = comingSoonCategoryId
    ? []
    : categoryId
      ? getWowWishTemplatesByCategory(categoryId).filter((template) =>
          categoryId === "birthday" ? birthdayCategoryTemplateIds.includes(template.id) : true,
        )
      : activeFilter === "all"
        ? wowwishTemplates.filter((template) => !popularIds.has(template.id))
        : getWowWishTemplatesByCategory(activeFilter).filter((template) =>
            activeFilter === "birthday" ? birthdayCategoryTemplateIds.includes(template.id) : true,
          );
  const visibleTemplates = categoryId || showAll ? filteredTemplates : filteredTemplates.slice(0, 9);

  useEffect(() => {
    setShowAll(false);
  }, [activeFilter, categoryId]);

  return (
    <main
      className={cn(
        "px-4 py-10 text-[#11162E] sm:px-6 lg:px-8",
        categoryStyle ? categoryStyle.shell : "bg-[#FFF7F1]",
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={cn(
            "relative overflow-hidden rounded-[34px] p-6 shadow-[0_18px_55px_rgba(31,20,60,0.10)] backdrop-blur-xl sm:p-8",
            isProposalPage
              ? "border border-white/80 bg-white/74 text-[#3B0B2E] shadow-[0_28px_90px_rgba(190,24,93,0.14)]"
              : "border border-white/80 bg-white/88",
          )}
        >
          {categoryStyle ? (
            <div aria-hidden className={cn("absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gradient-to-br opacity-30 blur-2xl", categoryStyle.accent)} />
          ) : null}
          {categoryId ? <CategoryHeroDecoration categoryId={categoryId} /> : null}
          <Link href="/" className={cn("relative inline-flex items-center gap-2 text-sm font-black", isProposalPage ? "text-[#BE185D]" : "text-[#7C3AED]")}>
            Home <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="relative mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div
                className={cn(
                  "inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest",
                  categoryStyle ? categoryStyle.chip : "text-purple-600",
                )}
              >
                {categoryStyle?.eyebrow ?? (category ? category.name : "Template marketplace")}
              </div>
              <h1 className={cn("ww-display mt-4 text-balance text-4xl font-black tracking-[-0.05em] sm:text-6xl", isProposalPage ? "text-[#3B0B2E]" : "text-slate-950")}>
                {categoryStyle?.title ?? (category ? `${category.name} templates` : "Explore WowWish templates")}
              </h1>
              <p className={cn("mt-3 max-w-2xl text-sm leading-relaxed sm:text-base", isProposalPage ? "text-[#6B3A55]" : "text-slate-600")}>
                {categoryStyle?.description ??
                  (category
                    ? category.description
                    : "A curated marketplace of premium visual themes for birthdays, anniversaries, proposals, festivals, wedding invites, and corporate wishes.")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                trackGaWhatsappClick("template_hero_cta");
                openLead({ source: "templates_hero", category: categoryId });
              }}
              className={cn(
                "ww-shine-button rounded-2xl px-5 py-3 text-sm font-black shadow-[0_18px_55px_rgba(7,11,31,0.22)]",
                "bg-[#E07B5A] text-white hover:bg-[#D86F4D]",
              )}
            >
              Start on WhatsApp
            </button>
          </div>
          <div className={cn("relative mt-5 flex flex-wrap gap-2 text-xs font-bold", isProposalPage ? "text-[#6B3A55]" : "text-slate-600")}>
            {["No payment now — we confirm details first", "Photos can be sent on WhatsApp", "Private shareable link"].map((hint) => (
              <span key={hint} className={cn("rounded-full border px-3 py-1.5", isProposalPage ? "border-[#F9A8D4]/45 bg-white/62" : "border-slate-900/10 bg-white/70")}>
                {hint}
              </span>
            ))}
          </div>
        </div>

        {categoryId ? (
          <CategorySwitcher activeCategoryId={categoryId} />
        ) : null}

        {!categoryId ? (
          <div className="mt-6">
            <div className="flex snap-x gap-3 overflow-x-auto pb-2">
              {templateFilterTabs.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setActiveFilter(item.id);
                    if (item.id !== "all") {
                      trackWowWishEvent("category_click", {
                        page: window.location.pathname,
                        source: "template_filter",
                        occasion: item.label,
                      });
                    }
                  }}
                  className={cn(
                    "snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-black shadow-sm transition",
                    activeFilter === item.id
                      ? "border-[#070B1F] bg-[#070B1F] text-white"
                      : "border-white/80 bg-white/82 text-slate-900 hover:bg-white",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-600">
              {activeFilter === "all"
                ? "Showing featured templates first."
                : `Showing ${templateFilterTabs.find((item) => item.id === activeFilter)?.label} templates.`}
            </div>
          </div>
        ) : null}

        {!categoryId && !comingSoonCategoryId ? (
          <section className="mt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-[#7C3AED]">Most Popular</div>
                <h2 className="ww-display mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Start with a popular wish style
                </h2>
              </div>
              <div className="text-sm font-semibold text-slate-600">
                3 curated picks before the full grid.
              </div>
            </div>
            <TemplateGrid templates={popularTemplates} openLead={openLead} />
          </section>
        ) : null}

        {!categoryId && !comingSoonCategoryId ? (
          <div className="mt-10">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#7C3AED]">Browse all templates</div>
            <h2 className="ww-display mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              All templates
            </h2>
          </div>
        ) : null}

        {comingSoonCategoryId ? (
          <ComingSoonTemplatesNotice categoryId={comingSoonCategoryId} />
        ) : (
          <TemplateGrid templates={visibleTemplates} openLead={openLead} />
        )}

        {!categoryId && !comingSoonCategoryId && visibleTemplates.length < filteredTemplates.length ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="rounded-2xl border border-slate-900/10 bg-white/85 px-5 py-3 text-sm font-black text-slate-950 shadow-sm backdrop-blur"
            >
              Load more templates
            </button>
          </div>
        ) : null}

      </div>
    </main>
  );
}

function CategorySwitcher({ activeCategoryId }: { activeCategoryId: WowWishCategoryId }) {
  return (
    <nav className="mt-5" aria-label="Explore more occasions">
      <div className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#7C3AED]">Explore more occasions</div>
      <div className="flex snap-x gap-2 overflow-x-auto pb-2 lg:justify-center lg:overflow-visible">
        {templateFilterTabs
          .filter((item) => item.id !== "all")
          .map((item) => (
            <Link
              key={item.id}
              href={`/templates/${item.id}`}
              onClick={() =>
                trackWowWishEvent("category_click", {
                  page: window.location.pathname,
                  source: "category_switcher",
                  occasion: item.label,
                })
              }
              className={cn(
                "snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-black shadow-sm backdrop-blur transition",
                item.id === activeCategoryId
                  ? "border-[#070B1F] bg-[#070B1F] text-white"
                  : "border-white/80 bg-white/82 text-slate-900 hover:bg-white",
              )}
            >
              {item.label}
            </Link>
          ))}
      </div>
    </nav>
  );
}

function ComingSoonTemplatesNotice({ categoryId }: { categoryId: WowWishCategoryId }) {
  const category = getWowWishCategory(categoryId);
  const categoryName = category?.name ?? "This category";
  const whatsappHref = buildWowWishWhatsAppUrl({
    occasion: categoryName,
    templateName: "Coming soon waitlist",
    notes: `Please add me to the waitlist for ${categoryName} templates.`,
  });

  return (
    <section className="relative mt-8 overflow-hidden rounded-[34px] border border-white/85 bg-white/88 p-6 text-slate-950 shadow-[0_22px_70px_rgba(31,20,60,0.12)] backdrop-blur-xl sm:p-8">
      <div aria-hidden className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#E8C57A]/34 via-[#EC4899]/18 to-[#22D3EE]/20 blur-2xl" />
      <div aria-hidden className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-[#7C3AED]/10 blur-2xl" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/78 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#7C3AED] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Coming soon
          </div>
          <h2 className="ww-display mt-4 text-balance text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
            {categoryName} templates are coming soon.
          </h2>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600 sm:text-base">
            We are polishing this collection before showing live templates here. Join the waitlist and we will confirm the best custom flow on WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Design in progress", "Custom enquiries open", "WhatsApp-first delivery"].map((item) => (
              <span key={item} className="rounded-full border border-slate-900/10 bg-white/74 px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-[linear-gradient(135deg,#070B1F_0%,#3B1D5F_52%,#EC4899_140%)] p-5 text-white shadow-[0_24px_75px_rgba(7,11,31,0.22)] lg:w-[340px]">
          <div aria-hidden className="absolute right-5 top-5 text-5xl opacity-25">{getOccasionEmoji(categoryId)}</div>
          <div className="relative text-xs font-black uppercase tracking-[0.2em] text-[#E8C57A]">Waitlist open</div>
          <div className="relative mt-3 text-xl font-black leading-tight">Want this category first?</div>
          <p className="relative mt-2 text-sm font-semibold leading-relaxed text-white/68">
            Tell us the occasion, date, and style. We will reply with the available custom option.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWowWishEvent("whatsapp_open", {
                page: window.location.pathname,
                source: "coming_soon_waitlist",
                occasion: categoryName,
              })
            }
            className="ww-shine-button relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E07B5A] px-5 py-3 text-sm font-black text-white shadow-[0_18px_55px_rgba(224,123,90,0.24)] transition hover:bg-[#D86F4D]"
          >
            Join waitlist on WhatsApp
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function CategoryHeroDecoration({ categoryId }: { categoryId: WowWishCategoryId }) {
  if (categoryId === "birthday") {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute right-8 top-8 rotate-[-10deg] rounded-2xl bg-[#F97316] px-4 py-2 text-lg font-black text-white shadow-[0_18px_45px_rgba(249,115,22,0.24)]">
          POP!
        </div>
        <div className="absolute bottom-8 right-28 h-16 w-16 rounded-full bg-[#FFD23F]/70" />
        <div className="absolute right-52 top-16 h-8 w-8 rotate-45 bg-[#FFB347]/85" />
        <div className="absolute bottom-16 right-52 h-10 w-24 rotate-[-8deg] rounded-full bg-white/42 shadow-[0_18px_45px_rgba(249,115,22,0.12)]" />
      </div>
    );
  }

  if (categoryId === "anniversary") {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute right-10 top-10 text-7xl text-[#8B5E34]/16">♡</div>
        <div className="absolute bottom-8 right-28 h-28 w-28 rounded-full border-[18px] border-[#E8C57A]/28" />
        <div className="absolute right-48 top-20 h-24 w-24 rounded-full bg-white/70 blur-md" />
        <div className="absolute bottom-16 right-56 h-1.5 w-36 rounded-full bg-gradient-to-r from-[#FFFFFF] via-[#E8C57A] to-[#B76B83] shadow-[0_0_24px_rgba(232,197,122,0.28)]" />
      </div>
    );
  }

  if (categoryId === "proposal") {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute right-10 top-8 h-32 w-32 rounded-full border border-[#EC4899]/22 bg-[#F9A8D4]/16 shadow-[0_0_70px_rgba(236,72,153,0.18)]" />
        <div className="absolute bottom-10 right-28 h-2 w-48 rounded-full bg-gradient-to-r from-[#F9A8D4] via-[#C4B5FD] to-[#BE185D] shadow-[0_0_26px_rgba(236,72,153,0.30)]" />
        <div className="absolute right-56 top-24 h-20 w-20 rounded-full bg-[#C4B5FD]/42 blur-xl" />
        <div className="absolute right-20 bottom-20 rotate-[-8deg] rounded-2xl border border-[#F9A8D4]/42 bg-white/62 px-4 py-2 text-sm font-black text-[#BE185D] shadow-[0_18px_55px_rgba(190,24,93,0.12)] backdrop-blur">
          say it beautifully
        </div>
      </div>
    );
  }

  if (categoryId === "festivals") {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute right-10 top-10 h-32 w-32 rounded-full border border-[#E8C57A]/45" />
        <div className="absolute bottom-8 right-36 h-16 w-16 rotate-45 bg-[#E8A932]/30" />
        <div className="absolute right-20 top-24 text-5xl text-[#8F1D12]/25">✦</div>
      </div>
    );
  }

  if (categoryId === "corporate") {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute right-10 top-10 h-28 w-44 rounded-[28px] border border-[#17427A]/20 bg-white/35" />
        <div className="absolute bottom-12 right-24 h-3 w-36 rounded-full bg-[#E8C57A]/70" />
        <div className="absolute right-44 top-24 h-20 w-20 rounded-full bg-[#2563EB]/15 blur-lg" />
      </div>
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute right-10 top-10 h-32 w-32 rounded-full border border-[#E8C57A]/45" />
      <div className="absolute bottom-10 right-32 h-24 w-24 rounded-full bg-[#8F1D12]/15 blur-lg" />
      <div className="absolute right-48 top-20 text-5xl text-[#8F1D12]/20">♡</div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  dark,
  align = "center",
  maxWidth = "760px",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  dark?: boolean;
  align?: "center" | "left";
  maxWidth?: string;
}) {
  return (
    <FadeInSection
      className={cn("relative w-full", align === "center" ? "mx-auto text-center" : "text-left")}
      style={{ maxWidth } as React.CSSProperties}
    >
      <div className={cn("ww-section-eyebrow", dark ? "text-[#22D3EE]" : "text-[#7C3AED]")}>
        {eyebrow}
      </div>
      <h2 className={cn("ww-display mt-3 text-balance text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.045em]", dark ? "text-white" : "text-slate-950")}>
        {title}
      </h2>
      <p className={cn("mx-auto mt-3 max-w-[720px] text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.65]", align === "left" ? "mx-0" : "", dark ? "text-white/64" : "text-slate-600")}>
        {description}
      </p>
    </FadeInSection>
  );
}

function SectionIntro(props: Parameters<typeof SectionHeader>[0]) {
  return <SectionHeader {...props} />;
}

function ThemeDecoration({ themeId }: { themeId: WowWishThemeId }) {
  if (themeId === "genz-pop") {
    return (
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-5 top-6 rotate-[-10deg] rounded-xl bg-white px-3 py-1 text-xl font-black text-[#ff2aa8]">POP!</div>
        <div className="absolute right-7 top-8 h-16 w-16 rounded-full bg-[#20d4ff]/80 shadow-[0_0_30px_rgba(32,212,255,0.45)]" />
        <div className="absolute bottom-8 left-8 h-20 w-20 rounded-full bg-[#ffd23f]/90" />
      </div>
    );
  }

  if (themeId === "romantic-floral") {
    return (
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#f5a5bd]/45 blur-xl" />
        <div className="absolute bottom-8 left-8 h-24 w-24 rounded-full border-[14px] border-[#eaa1b9]/55" />
        <div className="absolute right-10 top-16 text-5xl text-[#b76b83]/50">♡</div>
      </div>
    );
  }

  if (themeId === "luxury-gold" || themeId === "indian-festive") {
    return (
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-4 rounded-[24px] border border-[#E8C57A]/55" />
        <div className="absolute left-7 top-7 h-3 w-3 rotate-45 bg-[#E8C57A]" />
        <div className="absolute bottom-8 right-8 h-16 w-16 rounded-full bg-[#E8C57A]/28 blur-sm" />
      </div>
    );
  }

  if (themeId === "dark-neon-ai") {
    return (
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/35 blur-2xl" />
        <div className="absolute right-8 top-8 h-16 w-16 rounded-full border border-[#60A5FA]/70 shadow-[0_0_34px_rgba(96,165,250,0.45)]" />
        <div className="absolute bottom-10 left-8 h-1 w-28 rounded-full bg-[#EC4899] shadow-[0_0_24px_rgba(236,72,153,0.8)]" />
      </div>
    );
  }

  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-white/32 blur-sm" />
      <div className="absolute bottom-8 right-8 h-20 w-20 rounded-full border border-[#E8C57A]/70" />
    </div>
  );
}

function MadeWithWowWish({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 text-[11px] font-black", className)}>
      <img src={WOWWISH_LOGO_SRC} alt={BRAND_NAME} className="h-4 w-4 object-contain" />
      <span>Made with {BRAND_NAME}</span>
    </div>
  );
}

function V2Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070B1F] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 text-left lg:grid-cols-[1fr_auto] lg:items-center lg:text-left">
        <div>
          <div className="flex items-center justify-start gap-3">
            <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-white">
              <img src={WOWWISH_LOGO_SRC} alt="" className="h-8 w-8 object-contain" />
            </span>
            <div>
              <div className="text-lg font-black">{BRAND_NAME}</div>
              <div className="text-xs font-semibold text-white/55">{BRAND_TAGLINE}</div>
            </div>
          </div>
          <div className="mt-4 max-w-xl text-sm leading-relaxed text-white/62">
            Personalized digital wish pages for birthdays, anniversaries, proposals, festivals, wedding invites,
            and branded celebrations.
          </div>
        </div>
        <div className="flex items-center justify-start gap-6 lg:justify-end">
          <a
            href="https://wa.me/918849821193"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/15 transition-colors group-hover:bg-[#25D366]/25">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400 transition-colors group-hover:text-[#25D366]">WhatsApp</span>
          </a>
          <a
            href="https://instagram.com/wowwish.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WowWish on Instagram"
            className="group flex flex-col items-center gap-1.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/15 transition-colors group-hover:bg-pink-500/25">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <span className="text-xs text-gray-400 transition-colors group-hover:text-[#E1306C]">Instagram</span>
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group flex flex-col items-center gap-1.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 transition-colors group-hover:bg-blue-500/25">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <span className="text-xs text-gray-400 transition-colors group-hover:text-[#4A90E2]">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function V2LeadModal({
  open,
  preset,
  onClose,
}: {
  open: boolean;
  preset: LeadPreset | null;
  onClose: () => void;
}) {
  const initialTemplate = preset?.template;
  const [name, setName] = useState("");
  const [category, setCategory] = useState<WowWishCategoryId>(preset?.category ?? initialTemplate?.category ?? "birthday");
  const [templateId, setTemplateId] = useState(initialTemplate?.id ?? "");
  const [recipientName, setRecipientName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [date, setDate] = useState("");
  const [tone, setTone] = useState("Emotional");
  const [language, setLanguage] = useState("Hinglish");
  const [musicPreference, setMusicPreference] = useState("");
  const [notes, setNotes] = useState("");
  const [pkg, setPkg] = useState<WowWishPackageId>("surprise");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSuccess(false);
    setCategory(preset?.category ?? initialTemplate?.category ?? "birthday");
    setTemplateId(initialTemplate?.id ?? "");
    setPkg(preset?.packageId ?? initialTemplate?.packageId ?? "surprise");
  }, [open, preset?.category, preset?.packageId, initialTemplate?.category, initialTemplate?.id]);

  const templatesForCategory = useMemo(() => getWowWishTemplatesByCategory(category), [category]);
  const selectedTemplate = useMemo(
    () => wowwishTemplates.find((template) => template.id === templateId),
    [templateId],
  );

  if (!open) return null;

  const categoryName = getWowWishCategory(category)?.name ?? category;
  const selectedPackage = packageOptions[pkg];
  const whatsappHref = buildWowWishWhatsAppUrl({
    occasion: categoryName,
    templateName: selectedTemplate?.name ?? "",
    packageName: selectedPackage.name,
    packagePrice: selectedPackage.price,
    recipientName,
    relationship,
    eventDate: date,
    messageTone: tone,
    language,
    musicPreference,
    notes: [name ? `Your name: ${name}` : "", whatsappNumber ? `WhatsApp number: ${whatsappNumber}` : "", notes].filter(Boolean).join(" | "),
  });

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[#070B1F]/72 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />
      <div className="absolute inset-0 flex items-end justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:items-center sm:p-6">
        <motion.div
          className="relative flex max-h-[calc(100dvh-24px)] w-full max-w-[760px] flex-col overflow-hidden rounded-[30px] border border-white/25 bg-[linear-gradient(135deg,rgba(30,20,70,0.96),rgba(80,45,130,0.94))] text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.32, ease: revealEase }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(124,58,237,0.28),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(236,72,153,0.20),transparent_50%)]" />

          <div className="relative flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white">
                <img src={WOWWISH_LOGO_SRC} alt="" className="h-8 w-8 object-contain" />
              </span>
              <div>
                <div className="text-base font-black">Create your {BRAND_NAME} wish</div>
              <div className="mt-1 text-xs font-semibold text-white/78">
                  Photos can be sent on WhatsApp after this.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/25 bg-white/16 text-white shadow-sm transition hover:bg-white/24"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex-1 overflow-y-auto p-5">
            {success ? (
              <div className="rounded-3xl border border-white/20 bg-white/14 p-5">
                <div className="text-lg font-black">Done. We’ll reply on WhatsApp.</div>
                <p className="mt-2 text-sm text-white/78">If WhatsApp did not open automatically, tap below.</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ww-shine-button rounded-2xl bg-[#E8C57A] px-4 py-3 text-center text-sm font-black text-[#070B1F]"
                  >
                    Open WhatsApp
                  </a>
                  <button type="button" onClick={onClose} className="rounded-2xl border border-white/24 bg-white/14 px-4 py-3 text-sm font-black text-white">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="grid gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  trackWowWishEvent("create_wish_form_submit", {
                    page: window.location.pathname,
                    source: preset?.source,
                    occasion: categoryName,
                    template_name: selectedTemplate?.name,
                    package_name: selectedPackage.name,
                    price: selectedPackage.price,
                    button_text: "Continue on WhatsApp",
                  });
                  trackWowWishEvent("whatsapp_open", {
                    page: window.location.pathname,
                    source: "create_wish_modal",
                    occasion: categoryName,
                    template_name: selectedTemplate?.name,
                    package_name: selectedPackage.name,
                    price: selectedPackage.price,
                  });
                  setSuccess(true);
                  window.setTimeout(() => {
                    window.open(whatsappHref, "_blank", "noopener,noreferrer");
                  }, 250);
                }}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name">
                    <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="v2-input" />
                  </Field>
                  <Field label="WhatsApp number">
                    <input value={whatsappNumber} onChange={(event) => setWhatsappNumber(event.target.value)} inputMode="tel" placeholder="98xxxxxx" className="v2-input" />
                  </Field>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Occasion">
                    <select
                      value={category}
                      onChange={(event) => {
                        setCategory(event.target.value as WowWishCategoryId);
                        setTemplateId("");
                      }}
                      className="v2-input"
                    >
                      {wowwishCategories.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Selected template">
                    <select value={templateId} onChange={(event) => setTemplateId(event.target.value)} className="v2-input">
                      <option value="">Select a template</option>
                      {templatesForCategory.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Recipient name">
                    <input value={recipientName} onChange={(event) => setRecipientName(event.target.value)} placeholder="e.g. Priya" className="v2-input" />
                  </Field>
                  <Field label="Relationship">
                    <input value={relationship} onChange={(event) => setRelationship(event.target.value)} placeholder="e.g. wife, partner, client" className="v2-input" />
                  </Field>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Date/deadline">
                    <input value={date} onChange={(event) => setDate(event.target.value)} placeholder="e.g. 12 Aug" className="v2-input" />
                  </Field>
                  <Field label="Message tone">
                    <select value={tone} onChange={(event) => setTone(event.target.value)} className="v2-input">
                      {["Emotional", "Romantic", "Cute", "Funny", "Premium", "Festive", "Corporate"].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Language">
                    <select value={language} onChange={(event) => setLanguage(event.target.value)} className="v2-input">
                      {["English", "Hindi", "Gujarati", "Hinglish", "Gujarati + Hinglish"].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Music preference">
                    <input value={musicPreference} onChange={(event) => setMusicPreference(event.target.value)} placeholder="Song name or mood" className="v2-input" />
                  </Field>
                </div>

                <fieldset>
                    <legend className="text-xs font-black text-white/88">Package</legend>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      {(["surprise", "premium"] as WowWishPackageId[]).map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => {
                            setPkg(id);
                            trackWowWishEvent("package_selected", {
                              page: window.location.pathname,
                              source: "create_wish_modal",
                              package_name: packageOptions[id].name,
                              price: packageOptions[id].price,
                            });
                          }}
                          className={cn(
                            "rounded-2xl border px-3 py-2.5 text-sm font-black shadow-sm transition",
                            pkg === id ? "border-[#E8C57A] bg-[#E8C57A] text-[#070B1F]" : "border-white/22 bg-white/12 text-white hover:bg-white/18",
                          )}
                        >
                          {packageOptions[id].name} {packageOptions[id].price}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                <Field label="Notes">
                  <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Anything specific you want in the page?" className="v2-input min-h-24 resize-none" />
                </Field>

                <div className="rounded-3xl border border-white/20 bg-white/12 p-4 text-sm font-semibold text-white/82">
                  Photos can be sent on WhatsApp after this. No payment now — we confirm your details and final flow first.
                </div>

                <button type="submit" className="ww-shine-button rounded-2xl bg-[#E07B5A] px-5 py-3 text-sm font-black text-white shadow-[0_18px_55px_rgba(224,123,90,0.24)] transition hover:bg-[#D86F4D]">
                  Continue on WhatsApp
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .v2-input {
          margin-top: 0.25rem;
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.12);
          padding: 0.75rem 1rem;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 700;
          outline: none;
        }
        .v2-input:focus {
          border-color: rgba(232, 197, 122, 0.7);
          box-shadow: 0 0 0 3px rgba(232, 197, 122, 0.16);
        }
        .v2-input::placeholder {
          color: rgba(255, 255, 255, 0.62);
        }
        .v2-input option {
          color: #070b1f;
          background: #ffffff;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-black text-white/88">{label}</span>
      {children}
    </label>
  );
}
