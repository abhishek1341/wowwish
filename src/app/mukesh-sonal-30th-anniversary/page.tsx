"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DemoStickyCTA from "@/components/wowwish/DemoStickyCTA";

const MUSIC_SRC = "/assets/Pehla_Nasha.mp3";
const MUSIC_SRC_FALLBACK = "/assets/proposal-bg-music.mp3";
const MUSIC_VOLUME = 0.42;
const MUSIC_VOLUME_LETTER = 0.28;
const MUSIC_FADE_MS = 1500;
const MUSIC_LOOP_SECONDS = 22;

const pageData = {
  names: { husband: "Mukesh", wife: "Sonal" },
  weddingDateLabel: "03 May 1996",
  theme: "Mukesh’s 30-year love letter to Sonal",
  hero: {
    smallLabel: "03 May 1996 — 30 Years of Us",
    title: "Sonal, 30 Years Ago I Chose You",
    subtitle:
      "And today, after every season of life, I would choose you again — with the same heart, even more love, and endless gratitude.",
    ctaPrimary: "Open My Letter",
    ctaSecondary: "See Our Memories",
    madeByLine: "Made with love, for Sonal — from Mukesh",
  },
  featuredMoment: {
    heading: "Before words, one memory",
    caption: "30 years, and you are still my favorite person.",
    body: "A few memories are not just photos. They are proof of a life beautifully lived together.",
    photoUrl: "/mukesh-sonal-30th-anniversary/1.jpg",
  },
  letter: {
    eyebrow: "",
    heading: "સોનલ માટે મુકેશનો પત્ર",
    closedTitle: "ખાસ તારા માટે લખેલો.",
    closedButton: "પત્ર ખોલો →",
    lines: [
      "પ્રિય સોનલ,",
      "",
      "કેટલાક લોકો જીવનનો એક ભાગ બને છે.",
      "પણ તું તો મારા જીવનના દરેક ભાગમાં વસેલી છે.",
      "",
      "આ 30 વર્ષમાં તું મારી શક્તિ, મારી શાંતિ, મારું ઘર અને મારી સૌથી નજીકની વ્યક્તિ બની રહી છે.",
      "",
      "હું કદાચ રોજ કહી શકતો નથી,",
      "પણ તારા વગર એક દિવસ પણ અધૂરો લાગે છે.",
      "",
      "તે દરેક જવાબદારીને પ્રેમથી હળવી બનાવી.",
      "તે જ્યાં રહી, ત્યાં ઘર બનાવી દીધું.",
      "અને તે મારી જિંદગીને એવી ગરમાહટ આપી છે જે શબ્દોમાં કહી શકાતી નથી.",
      "",
      "જો જીવન ફરી એકવાર શરૂ કરવાની તક આપે,",
      "તો હું ફરીથી 03 મે 1996થી જ શરૂઆત કરું —",
      "અને એ પણ ફક્ત તારી સાથે.",
      "",
      "સોનલ,",
      "30 વર્ષ પહેલા મેં તને પસંદ કરી હતી.",
      "આજે પણ હું તને જ પસંદ કરું છું.",
      "અને હંમેશા તને જ પસંદ કરતો રહીશ.",
      "",
      "અઢળક પ્રેમ સાથે,",
      "",
      "મુકેશ",
    ],
    signature: "",
  },
  whyChooseYou: {
    heading: "Why I still choose you",
    cards: [
      {
        title: "Because you care deeply",
        body: "You never made love look dramatic. You made it look like care, patience, food, and quiet responsibility.",
        icon: "heart",
      },
      {
        title: "Because you make every place home",
        body: "Wherever life took us, your warmth made it feel complete.",
        icon: "spark",
      },
      {
        title: "Because your food carries love",
        body: "Everyone remembers your cooking, but I remember the love behind it.",
        icon: "flower",
      },
      {
        title: "Because you stood with me",
        body: "Through every season, every decision, and every responsibility — you stayed.",
        icon: "spark",
      },
      {
        title: "Because one day without you feels incomplete",
        body: "After 30 years, I still don’t know how to be fully okay without you around.",
        icon: "heart",
      },
    ],
  },
  journeyTimeline: {
    heading: "Our 30-year journey",
    items: [
      { when: "1996 — We began", title: "Two lives became one journey.", body: "" },
      { when: "2000 — Our family grew", title: "A new joy joined our home.", body: "" },
      { when: "Years together", title: "Responsibilities, memories, family, and countless little moments.", body: "" },
      {
        when: "Everyday life",
        title: "Walks, food, laughter, elders, prayers, and togetherness.",
        body: "",
      },
      {
        when: "Our home",
        title: "The home may be ours, but the nameplate belongs to you.",
        body: "",
      },
      { when: "2026 — 30 years", title: "And I still choose you.", body: "" },
    ],
  },
  littleThings: {
    heading: "The little things I love",
    notes: [
      "The way you care for everyone",
      "The way you make food with love",
      "The way people feel comfortable around you",
      "The way you make friends wherever you go",
      "The way your presence makes home feel peaceful",
      "The way you are always right — and somehow, I have accepted it",
    ],
    playfulLine: "And yes Sonal, after 30 years, I agree… you are usually right.",
  },
  memories: {
    heading: "Our Memories",
    items: [
      { label: "1", caption: "A Beginning", url: "/mukesh-sonal-30th-anniversary/animated_video_photos/1.jpg" },
      { label: "2", caption: "A Promise Remembered", url: "/mukesh-sonal-30th-anniversary/animated_video_photos/2.jpg" },
      { label: "3", caption: "Every Chapter With You", url: "/mukesh-sonal-30th-anniversary/animated_video_photos/3.jpg" },
      { label: "4", caption: "Blessings And Togetherness", url: "/mukesh-sonal-30th-anniversary/animated_video_photos/4.jpg" },
      { label: "5", caption: "Our Family, Our World", url: "/mukesh-sonal-30th-anniversary/animated_video_photos/5.jpg" },
      { label: "6", caption: "Little Moments, Big Love", url: "/mukesh-sonal-30th-anniversary/animated_video_photos/6.jpg" },
      { label: "7", caption: "Years That Made Us", url: "/mukesh-sonal-30th-anniversary/animated_video_photos/7.jpg" },
      { label: "8", caption: "30 Years, Still Us", url: "/mukesh-sonal-30th-anniversary/animated_video_photos/8.JPG" },
    ],
  },
  finale: {
    heading: "30 years down. Forever to go.",
    body: "Sonal, you are not just my wife. You are my habit, my peace, my family, my home, and my favorite person to come back to.",
    bigLine: "ત્યારે પણ તું. આજે પણ તું. હંમેશા તું જ.",
    button: "Replay Our Journey",
  },
  blessings: {
    heading: "Bless Mukesh & Sonal",
    body: "If their journey made you smile, send them your love, blessings, or flowers.",
    ctaPrimary: "Send Blessings",
    ctaSecondary: "Share This Page",
    confirmationBlessings: "Your blessings have reached Mukesh & Sonal.",
    confirmationFlowers: "Your flowers have reached Mukesh & Sonal.",
  },
  businessCta: {
    heading: "Want to make someone feel this loved?",
    body:
      "Create a personal page with photos, memories, music, flowers, blessings, and your own words — for your partner, parents, best friend, or someone special.",
    button: "Make a page for someone",
    examples: "Anniversary • Birthday • Proposal • Wedding Invite",
  },
  footer: "For Sonal — from Mukesh. 30 years of choosing you.",
};

const cn = (...classes: Array<string | false | undefined | null>) => {
  return classes.filter(Boolean).join(" ");
};

type GoldDustParticle = {
  id: string;
  leftPct: number;
  topPct: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  variant: 0 | 1 | 2;
};

type Petal = {
  id: string;
  leftPct: number;
  topPct: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  rotate: number;
  driftX: number;
  driftY: number;
};

type AmbientDot = {
  id: string;
  leftPct: number;
  topPct: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  color: string;
};

type BurstPiece = {
  id: string;
  leftPct: number;
  rotate: number;
  color: string;
  delay: number;
};

type ConfettiPiece = {
  id: string;
  leftPct: number;
  rotate: number;
  color: string;
  delay: number;
};

type Heart = {
  id: string;
  left: number;
  size: number;
  opacity: number;
  rotate: number;
  duration: number;
  delay: number;
};

type GlowBlob = {
  id: string;
  leftPct: number;
  topPct: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  color: string;
};

const EASE_PREMIUM: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
const VIEWPORT_PREMIUM = { once: true, amount: 0.22 };

const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -16, filter: "blur(10px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  slideRight: {
    hidden: { opacity: 0, x: 16, filter: "blur(10px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scaleSoft: {
    hidden: { opacity: 0, scale: 0.96, y: 10, filter: "blur(10px)" },
    show: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
  },
};

const Reveal = ({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 0.85,
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof revealVariants;
  delay?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_PREMIUM}
      variants={revealVariants[variant]}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AmbientGlowBlobs = ({
  className,
  colors,
  count = 3,
}: {
  className?: string;
  colors: string[];
  count?: number;
}) => {
  const reducedMotion = useReducedMotionSafe();

  const blobs = useMemo<GlowBlob[]>(() => {
    return Array.from({ length: count }).map((_, i) => {
      const c = colors[i % colors.length];
      return {
        id: `blob_${i}_${Math.random().toString(16).slice(2)}`,
        leftPct: (18 + i * 26) % 100,
        topPct: (22 + i * 18) % 100,
        size: 220 + (i % 3) * 160,
        opacity: 0.20 - i * 0.02,
        duration: 14 + (i % 3) * 6,
        delay: i * 0.25,
        driftX: (i % 2 ? 1 : -1) * (34 + i * 10),
        driftY: (i % 2 ? -1 : 1) * (28 + i * 8),
        color: c,
      };
    });
  }, [colors, count]);

  if (reducedMotion) return null;

  return (
    <div aria-hidden="true" role="presentation" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {blobs.map((b) => (
        <motion.span
          key={b.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${b.leftPct}%`,
            top: `${b.topPct}%`,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            background: b.color,
          }}
          initial={{ x: 0, y: 0, scale: 0.98 }}
          animate={{ x: [0, b.driftX, 0], y: [0, b.driftY, 0], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const IconMark = ({ kind, className }: { kind: "heart" | "spark" | "flower"; className?: string }) => {
  if (kind === "heart") {
    return (
      <svg aria-hidden="true" className={cn("h-6 w-6", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 20.6s-7.2-4.5-9.6-8.9C.9 9 .9 6.2 2.8 4.5c2-1.7 4.9-1.2 6.6.5L12 7.7l2.6-2.7c1.7-1.7 4.6-2.2 6.6-.5 1.9 1.7 1.9 4.5.4 7.2-2.4 4.4-9.6 8.9-9.6 8.9z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "flower") {
    return (
      <svg aria-hidden="true" className={cn("h-6 w-6", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 22c2.4-2.2 3.5-4.5 3.5-6.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0-3.5 3.5c0 2 1.1 4.3 3.5 6.5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M12 12c2.6-2 4.6-2.7 6.2-2.3 1.5.4 2.6 1.8 2.6 3.3 0 1.6-1.1 3-2.6 3.4M12 12c-2.6-2-4.6-2.7-6.2-2.3C4.3 10.1 3.2 11.5 3.2 13c0 1.6 1.1 3 2.6 3.4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M12 12c0-3.1.9-5.2 2.3-6.2 1.3-1 3.2-.9 4.4.2 1.2 1.1 1.4 3 .4 4.5M12 12c0-3.1-.9-5.2-2.3-6.2-1.3-1-3.2-.9-4.4.2-1.2 1.1-1.4 3-.4 4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={cn("h-6 w-6", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2l1.2 6.2L20 12l-6.8 3.8L12 22l-1.2-6.2L4 12l6.8-3.8L12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SubtleHearts = () => {
  const reducedMotion = useReducedMotionSafe();

  const hearts = useMemo<Heart[]>(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: `h_${i}_${Math.random().toString(16).slice(2)}`,
      left: (i * 9.2 + 7) % 100,
      size: 14 + (i % 6) * 3,
      opacity: 0.16 + (i % 4) * 0.02,
      rotate: (i % 2 ? 1 : -1) * (10 + (i % 6) * 7),
      duration: 22 + (i % 5) * 4,
      delay: (i % 9) * 0.22,
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden="true" role="presentation" className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h, i) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: `${h.left}%`, top: 0, opacity: h.opacity, color: "rgba(201,124,123,0.95)" }}
          initial={{ y: `${-30 - (i % 7) * 8}vh`, rotate: h.rotate }}
          animate={{
            y: "120vh",
            x: [0, i % 2 ? 10 : -10, 0],
            rotate: [h.rotate, -h.rotate, h.rotate],
            opacity: [h.opacity, h.opacity, 0],
          }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >
          <span aria-hidden="true" className="block drop-shadow-[0_16px_34px_rgba(0,0,0,0.08)]">
            <svg aria-hidden="true" width={h.size} height={h.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 20.6s-7.2-4.5-9.6-8.9C.9 9 .9 6.2 2.8 4.5c2-1.7 4.9-1.2 6.6.5L12 7.7l2.6-2.7c1.7-1.7 4.6-2.2 6.6-.5 1.9 1.7 1.9 4.5.4 7.2-2.4 4.4-9.6 8.9-9.6 8.9z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const SoftPetals = ({ strength = "soft" }: { strength?: "soft" | "hero" | "promise" }) => {
  const reducedMotion = useReducedMotionSafe();

  const petals = useMemo<Petal[]>(() => {
    const count = strength === "hero" ? 10 : strength === "promise" ? 12 : 7;
    return Array.from({ length: count }).map((_, i) => ({
      id: `pt_${i}_${Math.random().toString(16).slice(2)}`,
      leftPct: (i * 13.5 + 7) % 100,
      topPct: (i * 17.2 + 8) % 100,
      size: 10 + (i % 4) * 6,
      opacity: strength === "promise" ? 0.20 : strength === "hero" ? 0.17 : 0.14,
      duration: 16 + (i % 5) * 4,
      delay: (i % 6) * 0.4,
      rotate: (i % 2 ? 1 : -1) * (10 + (i % 5) * 6),
      driftX: (i % 2 ? 1 : -1) * (18 + (i % 5) * 9),
      driftY: (i % 2 ? -1 : 1) * (22 + (i % 4) * 10),
    }));
  }, [strength]);

  if (reducedMotion) return null;

  return (
    <div aria-hidden="true" role="presentation" className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{ left: `${p.leftPct}%`, top: `${p.topPct}%`, opacity: p.opacity }}
          initial={{ x: 0, y: 0, rotate: p.rotate }}
          animate={{ x: [0, p.driftX, 0], y: [0, p.driftY, 0], rotate: [p.rotate, -p.rotate, p.rotate] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="block"
            style={{
              width: p.size,
              height: p.size * 1.5,
              borderRadius: "999px 999px 999px 8px",
              background:
                "linear-gradient(180deg, rgba(255,228,236,0.70), rgba(136,19,55,0.22))",
              filter: "blur(0.2px)",
              transform: "rotate(18deg)",
              boxShadow: "0 18px 50px rgba(136,19,55,0.10)",
            }}
          />
        </motion.span>
      ))}
    </div>
  );
};

const GoldDust = () => {
  const reducedMotion = useReducedMotionSafe();

  const particles = useMemo<GoldDustParticle[]>(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: `gd_${i}_${Math.random().toString(16).slice(2)}`,
      leftPct: (i * 11.7 + 9) % 100,
      topPct: (i * 16.3 + 14) % 100,
      size: 1 + (i % 3),
      opacity: 0.10 + (i % 5) * 0.02,
      duration: 10 + (i % 5) * 3,
      delay: (i % 9) * 0.2,
      drift: (i % 2 ? 1 : -1) * (18 + (i % 4) * 10),
      variant: (i % 3) as 0 | 1 | 2,
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden="true" role="presentation" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.leftPct}%`,
            top: `${p.topPct}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background:
              p.variant === 0
                ? "rgba(242,227,190,0.85)"
                : p.variant === 1
                  ? "rgba(228,201,138,0.78)"
                  : "rgba(216,178,106,0.70)",
            boxShadow: "0 0 18px rgba(216,178,106,0.30)",
          }}
          initial={{ x: 0, y: 14, scale: 0.9 }}
          animate={{ x: [0, p.drift, 0], y: [14, -18, 14], opacity: [p.opacity * 0.7, p.opacity, p.opacity * 0.7] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const SubtleGoldDust = GoldDust;

const WarmAmbientDots = () => {
  const reducedMotion = useReducedMotionSafe();

  const dots = useMemo<AmbientDot[]>(() => {
    const colors = [
      "rgba(232,197,122,0.22)",
      "rgba(241,216,199,0.18)",
      "rgba(235,196,189,0.18)",
      "rgba(216,168,160,0.16)",
    ];

    return Array.from({ length: 14 }).map((_, i) => ({
      id: `wa_${i}_${Math.random().toString(16).slice(2)}`,
      leftPct: (i * 12.7 + 8) % 100,
      topPct: (i * 13.9 + 10) % 100,
      size: 28 + (i % 5) * 16,
      opacity: 0.10 + (i % 4) * 0.03,
      duration: 20 + (i % 6) * 3,
      delay: (i % 8) * 0.25,
      drift: (i % 2 ? 1 : -1) * (18 + (i % 4) * 10),
      color: colors[i % colors.length],
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden="true" role="presentation" className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full blur-2xl"
          style={{
            left: `${d.leftPct}%`,
            top: `${d.topPct}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            background: d.color,
          }}
          initial={{ x: 0, y: 30 }}
          animate={{ x: [0, d.drift, 0], y: [30, -30, 30], opacity: [d.opacity * 0.7, d.opacity, d.opacity * 0.7] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const HeartBurst = ({ active }: { active: boolean }) => {
  const reducedMotion = useReducedMotionSafe();

  const pieces = useMemo<BurstPiece[]>(() => {
    const colors = ["#D8B35A", "#C59B6C", "#B8892F", "rgba(136,19,55,0.85)"];
    return Array.from({ length: 34 }).map((_, i) => ({
      id: `b_${i}_${Math.random().toString(16).slice(2)}`,
      leftPct: (i * 8.1 + 4) % 100,
      rotate: (i * 33) % 360,
      color: colors[i % colors.length],
      delay: (i % 10) * 0.012,
    }));
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden="true" role="presentation" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0"
          style={{ left: `${p.leftPct}%` }}
          initial={{ y: -24, opacity: 0, rotate: p.rotate }}
          animate={{ y: [0, 520, 860], x: [0, p.leftPct % 2 ? 26 : -22, 0], opacity: [0, 1, 0], rotate: [p.rotate, p.rotate + 240] }}
          transition={{ duration: 1.55, delay: p.delay, ease: [0.12, 0, 0.39, 0.97] }}
        >
          <span aria-hidden="true" style={{ color: p.color }} className="block drop-shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 20.6s-7.2-4.5-9.6-8.9C.9 9 .9 6.2 2.8 4.5c2-1.7 4.9-1.2 6.6.5L12 7.7l2.6-2.7c1.7-1.7 4.6-2.2 6.6-.5 1.9 1.7 1.9 4.5.4 7.2-2.4 4.4-9.6 8.9-9.6 8.9z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.span>
      ))}
    </div>
  );
};

const GoldenConfetti = ({ active }: { active: boolean }) => {
  const reducedMotion = useReducedMotionSafe();

  const pieces = useMemo<ConfettiPiece[]>(() => {
    const colors = ["#D8B35A", "#C59B6C", "#FDE68A", "rgba(136,19,55,0.65)", "rgba(15,23,42,0.18)"];
    return Array.from({ length: 44 }).map((_, i) => ({
      id: `c_${i}_${Math.random().toString(16).slice(2)}`,
      leftPct: (i * 7.6 + 3) % 100,
      rotate: (i * 37) % 360,
      color: colors[i % colors.length],
      delay: (i % 12) * 0.012,
    }));
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden="true" role="presentation" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 h-2.5 w-1.5 rounded-full"
          style={{ left: `${p.leftPct}%`, backgroundColor: p.color }}
          initial={{ y: -24, opacity: 0, rotate: p.rotate }}
          animate={{ y: [0, 520, 860], x: [0, p.leftPct % 2 ? 22 : -18, 0], opacity: [0, 1, 0], rotate: [p.rotate, p.rotate + 240] }}
          transition={{ duration: 1.55, delay: p.delay, ease: [0.12, 0, 0.39, 0.97] }}
        />
      ))}
    </div>
  );
};

const WarmPremiumBackground = () => {
  return (
    <div aria-hidden="true" role="presentation" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#FFF4DF]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(232,197,122,0.42),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(241,216,199,0.50),transparent_36%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(201,124,123,0.13),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff4df_0%,#fff9ef_48%,#ffffff_100%)]" />
      <div className="absolute inset-0 opacity-[0.10] mix-blend-multiply [background-image:repeating-linear-gradient(0deg,rgba(15,23,42,0.020)_0px,rgba(15,23,42,0.020)_1px,transparent_2px,transparent_4px)]" />
    </div>
  );
};

const OrnamentalWatermark = ({ strength = "base" }: { strength?: "base" | "hero" | "soft" }) => {
  return (
    <div aria-hidden="true" role="presentation" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={cn(
          "absolute inset-0",
          strength === "hero" ? "opacity-[0.12]" : strength === "soft" ? "opacity-[0.09]" : "opacity-[0.10]",
          "mix-blend-multiply",
          "[background-image:radial-gradient(circle_at_15%_10%,rgba(212,175,55,0.16),transparent_42%),radial-gradient(circle_at_85%_18%,rgba(201,124,123,0.12),transparent_46%),radial-gradient(circle_at_45%_88%,rgba(241,216,199,0.14),transparent_52%),repeating-linear-gradient(45deg,rgba(15,23,42,0.020)_0px,rgba(15,23,42,0.020)_1px,transparent_6px,transparent_12px)]",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 opacity-[0.08]",
          "[background-image:radial-gradient(circle_at_0%_0%,rgba(212,175,55,0.22),transparent_38%),radial-gradient(circle_at_100%_0%,rgba(212,175,55,0.18),transparent_40%),radial-gradient(circle_at_0%_100%,rgba(201,124,123,0.14),transparent_44%),radial-gradient(circle_at_100%_100%,rgba(241,216,199,0.14),transparent_46%)]",
        )}
      />
    </div>
  );
};

const CornerOrnaments = ({ tone = "warm" }: { tone?: "warm" | "royal" }) => {
  return (
    <div aria-hidden="true" role="presentation" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={cn(
          "absolute -left-20 -top-20 h-72 w-72 rounded-full blur-3xl",
          tone === "royal" ? "bg-[rgba(212,175,55,0.18)]" : "bg-[rgba(232,197,122,0.22)]",
        )}
      />
      <div
        className={cn(
          "absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl",
          tone === "royal" ? "bg-[rgba(230,199,106,0.16)]" : "bg-[rgba(241,216,199,0.22)]",
        )}
      />
      <div
        className={cn(
          "absolute -left-28 -bottom-28 h-80 w-80 rounded-full blur-3xl",
          tone === "royal" ? "bg-[rgba(31,42,90,0.18)]" : "bg-[rgba(201,124,123,0.14)]",
        )}
      />
    </div>
  );
};

const AnniversaryAmbientBackground = ({
  strength = "base",
}: {
  strength?: "base" | "hero" | "promise";
}) => {
  const debugAmbient = false;

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        debugAmbient && "outline outline-2 outline-[rgba(216,179,90,0.75)]",
      )}
    >
      <WarmPremiumBackground />
      <OrnamentalWatermark strength={strength === "hero" ? "hero" : strength === "promise" ? "soft" : "base"} />
      <AmbientGlowBlobs
        colors={
          strength === "promise"
            ? ["rgba(232,197,122,0.34)", "rgba(235,196,189,0.26)", "rgba(241,216,199,0.24)"]
            : strength === "hero"
              ? ["rgba(232,197,122,0.30)", "rgba(235,196,189,0.22)", "rgba(216,168,160,0.20)"]
              : ["rgba(232,197,122,0.26)", "rgba(241,216,199,0.18)", "rgba(216,168,160,0.16)"]
        }
        count={3}
        className={cn(
          strength === "promise" ? "opacity-[0.85]" : strength === "hero" ? "opacity-[0.80]" : "opacity-[0.70]",
          debugAmbient && "opacity-[0.90]",
        )}
      />
      <CornerOrnaments tone={strength === "promise" ? "warm" : "warm"} />
      <WarmAmbientDots />
      <SubtleGoldDust />
      <SoftPetals strength={strength === "promise" ? "promise" : strength === "hero" ? "hero" : "soft"} />
      <SubtleHearts />
      <div
        className={cn(
          "absolute inset-0 [background-image:radial-gradient(circle_at_20%_10%,rgba(232,197,122,0.20),transparent_55%),radial-gradient(circle_at_80%_55%,rgba(201,124,123,0.12),transparent_58%)]",
          debugAmbient ? "opacity-[0.35]" : "opacity-[0.14]",
        )}
      />
    </div>
  );
};

const Card = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-slate-900/10 bg-white/70 p-5 shadow-[0_26px_90px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
};

const Section = ({
  id,
  eyebrow,
  title,
  children,
  className,
  headingClassName,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
}) => {
  return (
    <section id={id} className={cn("scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16", className)}>
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_PREMIUM}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.85, ease: EASE_PREMIUM }}
          className={cn("mb-6", headingClassName)}
        >
          {eyebrow ? (
            <div className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-slate-700/65">{eyebrow}</div>
          ) : null}
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
};

const ToneSection = ({
  id,
  tone,
  children,
}: {
  id: string;
  tone: "ivory" | "cream";
  children: ReactNode;
}) => {
  return (
    <div
      id={id}
      className={cn(
        "scroll-mt-24",
        tone === "ivory" ? "bg-[rgba(255,251,243,0.72)]" : "bg-[rgba(255,247,232,0.72)]",
        "border-y border-slate-900/5",
      )}
    >
      {children}
    </div>
  );
};

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
};

const useReducedMotionSafe = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const memoryPhotosPreferred = [
  "/mukesh-sonal-30th-anniversary/animated_video_photos/1.jpg",
  "/mukesh-sonal-30th-anniversary/animated_video_photos/2.jpg",
  "/mukesh-sonal-30th-anniversary/animated_video_photos/3.jpg",
  "/mukesh-sonal-30th-anniversary/animated_video_photos/4.jpg",
  "/mukesh-sonal-30th-anniversary/animated_video_photos/5.jpg",
  "/mukesh-sonal-30th-anniversary/animated_video_photos/6.jpg",
  "/mukesh-sonal-30th-anniversary/animated_video_photos/new.jpg",
  "/mukesh-sonal-30th-anniversary/animated_video_photos/new.jpg",
];

const memoryPhotosFallback = [
  "/mukesh-sonal-30th-anniversary/1.jpg",
  "/mukesh-sonal-30th-anniversary/2.jpg",
  "/mukesh-sonal-30th-anniversary/3.jpg",
  "/mukesh-sonal-30th-anniversary/4.jpg",
  "/mukesh-sonal-30th-anniversary/5.jpg",
  "/mukesh-sonal-30th-anniversary/6.jpg",
  "/mukesh-sonal-30th-anniversary/animated_video_photos/new.jpg",
  "/mukesh-sonal-30th-anniversary/animated_video_photos/new.jpg",
];

const VhsMemoriesPlayer = ({
  items,
  startNonce,
  onPlaybackStateChange,
}: {
  items: Array<{ label: string; caption: string; url: string }>;
  startNonce: number;
  onPlaybackStateChange?: (state: { playing: boolean; ended: boolean }) => void;
}) => {
  const reduced = useReducedMotionSafe();
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);
  const [t, setT] = useState(0);
  const [flicker, setFlicker] = useState(false);
  const [useFallbackPhotos, setUseFallbackPhotos] = useState(false);

  const durationMs = 1750;
  const orderedItems = useMemo(() => {
    const captions = items.map((it) => it.caption);
    const cacheBust = startNonce > 0 ? `?v=${startNonce}` : "";
    const src = useFallbackPhotos ? memoryPhotosFallback : memoryPhotosPreferred;
    return src.map((url, i) => ({
      label: String(i + 1),
      caption: captions[i] ?? `Memory ${i + 1}`,
      url: `${url}${cacheBust}`,
    }));
  }, [items, startNonce, useFallbackPhotos]);

  const [frameSrcOverrides, setFrameSrcOverrides] = useState<Record<number, string>>({});

  const lastIndex = Math.max(0, orderedItems.length - 1);

  useEffect(() => {
    if (orderedItems.length === 0) return;
    const first = new Image();
    first.src = orderedItems[0].url;
    const second = orderedItems[1] ? new Image() : null;
    if (second) second.src = orderedItems[1].url;
  }, [orderedItems]);

  useEffect(() => {
    if (!playing || reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.max(0, now - last);
      last = now;
      setT((v) => {
        const next = v + dt;
        if (next >= durationMs) {
          return durationMs;
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced]);

  useEffect(() => {
    if (reduced) return;
    if (startNonce <= 0) return;
    setIdx(0);
    setT(0);
    setPlaying(true);
  }, [startNonce, reduced]);

  useEffect(() => {
    if (!playing || reduced) return;
    if (t < durationMs) return;
    if (idx >= lastIndex) {
      setPlaying(false);
      return;
    }
    setT(0);
    setIdx((v) => Math.min(lastIndex, v + 1));
  }, [t, playing, reduced, idx, lastIndex]);

  useEffect(() => {
    if (reduced) return;
    setFlicker(true);
    const timer = window.setTimeout(() => setFlicker(false), 260);
    return () => window.clearTimeout(timer);
  }, [idx, reduced]);

  const progress = clamp01(t / durationMs);
  const current = {
    ...orderedItems[idx],
    url: frameSrcOverrides[idx] ?? orderedItems[idx].url,
  };
  const ended = !playing && idx >= lastIndex && t >= durationMs;

  useEffect(() => {
    onPlaybackStateChange?.({ playing, ended });
  }, [playing, ended, onPlaybackStateChange]);

  const motionByIndex = (i: number) => {
    switch (i) {
      case 0:
        return { initial: { scale: 1.02, x: -6, y: 3 }, animate: { scale: 1.10, x: 6, y: -4 } };
      case 1:
        return { initial: { scale: 1.10, x: 2, y: -2 }, animate: { scale: 1.04, x: -3, y: 2 } };
      case 2:
        return { initial: { scale: 1.08, x: 10, y: 0 }, animate: { scale: 1.08, x: -10, y: 0 } };
      case 3:
        return { initial: { scale: 1.08, x: -10, y: 0 }, animate: { scale: 1.08, x: 10, y: 0 } };
      case 4:
        return { initial: { scale: 1.04, x: -2, y: 10 }, animate: { scale: 1.12, x: 2, y: -8 } };
      case 5:
        return { initial: { scale: 1.12, x: 2, y: -2 }, animate: { scale: 1.04, x: -2, y: 2 } };
      case 6:
        return { initial: { scale: 1.08, x: 10, y: 2 }, animate: { scale: 1.08, x: -10, y: -2 } };
      case 7:
      default:
        return { initial: { scale: 1.02, x: -4, y: 2 }, animate: { scale: 1.12, x: 4, y: -2 } };
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[34px] border border-[rgba(216,179,90,0.28)] bg-[linear-gradient(180deg,rgba(24,20,16,0.88),rgba(24,20,16,0.72))] p-4 shadow-[0_50px_180px_rgba(15,23,42,0.20)] backdrop-blur-xl sm:p-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:radial-gradient(circle_at_20%_10%,rgba(216,179,90,0.18),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(136,19,55,0.14),transparent_60%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_2px,transparent_6px)]" />

      <div className="relative">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] border border-white/10 bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="pointer-events-none absolute left-3 right-3 top-3 z-10 flex gap-1.5">
            {orderedItems.map((_, i) => {
              const isDone = i < idx;
              const isActive = i === idx;
              return (
                <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full bg-white/90"
                    style={{ width: isDone ? "100%" : isActive ? `${Math.round(progress * 100)}%` : "0%" }}
                  />
                </div>
              );
            })}
          </div>

          <div className="absolute inset-0">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={current.url}
                className="relative h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.15 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={current.url}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover scale-[1.06] blur-2xl opacity-85"
                />
                <div aria-hidden className="absolute inset-0 bg-black/35" />
                <motion.img
                  src={current.url}
                  alt={current.caption}
                  className="absolute inset-0 h-full w-full object-contain px-4 py-6 opacity-100 drop-shadow-[0_22px_60px_rgba(0,0,0,0.55)]"
                  onError={() => {
                    if (useFallbackPhotos) return;

                    const fallback = `${memoryPhotosFallback[idx]}${startNonce > 0 ? `?v=${startNonce}` : ""}`;
                    setFrameSrcOverrides((prev) => (prev[idx] ? prev : { ...prev, [idx]: fallback }));
                    window.setTimeout(() => setUseFallbackPhotos(true), 0);
                  }}
                  initial={{ filter: "blur(10px)", ...motionByIndex(idx).initial }}
                  animate={{ filter: "blur(0px)", ...motionByIndex(idx).animate }}
                  transition={{
                    duration: reduced ? 0.2 : 0.75,
                    filter: { duration: reduced ? 0.12 : 0.20 },
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,227,170,0.10),transparent_62%)]" />

          <button
            type="button"
            onClick={() => {
              if (ended) {
                setIdx(0);
                setT(0);
                setPlaying(true);
                return;
              }
              setPlaying((v) => !v);
            }}
            className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/45 text-white/85 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur transition hover:bg-black/55"
            aria-label={ended ? "Replay memories" : playing ? "Pause memories" : "Play memories"}
          >
            {ended ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12a9 9 0 1 1-3.1-6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M21 4v6h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : playing ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M16 6v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 8.2v7.6c0 .7.8 1.1 1.4.7l6-3.8c.6-.4.6-1.3 0-1.7l-6-3.8c-.6-.4-1.4 0-1.4.7Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const MukeshSonal30thAnniversaryPage = () => {
  const progress = useScrollProgress();
  const reducedMotion = useReducedMotionSafe();

  const [musicOn, setMusicOn] = useState(false);
  const [musicBlocked, setMusicBlocked] = useState(false);
  const [musicNeedsUnmute, setMusicNeedsUnmute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [burstOn, setBurstOn] = useState(false);
  const [confettiOn, setConfettiOn] = useState(false);
  const [petalBurstOn, setPetalBurstOn] = useState(false);

  const [letterOpen, setLetterOpen] = useState(false);
  const [memoriesStartNonce, setMemoriesStartNonce] = useState(0);
  const [memoriesPlaying, setMemoriesPlaying] = useState(false);

  const [blessingSent, setBlessingSent] = useState(false);
  const [blessingMessage, setBlessingMessage] = useState<string | null>(null);
  const [blessingCooldown, setBlessingCooldown] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);
  const loopGateRef = useRef(false);

  const fadeVolumeTo = (target: number) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current);

    const from = audio.volume;
    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp01((now - start) / MUSIC_FADE_MS);
      audio.volume = from + (target - from) * t;
      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(tick);
      }
    };
    fadeRafRef.current = requestAnimationFrame(tick);
  };

  const attemptPlayBestEffort = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = MUSIC_VOLUME;
    audio.loop = false;
    try {
      audio.muted = false;
      await audio.play();
      setMusicBlocked(false);
      setMusicNeedsUnmute(false);
    } catch {
      setMusicBlocked(true);
      setMusicNeedsUnmute(true);
      audio.muted = true;
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const onPlaying = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);
    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = MUSIC_VOLUME;
    audio.loop = false;

    if (musicOn) {
      void attemptPlayBestEffort();
      fadeVolumeTo(letterOpen ? MUSIC_VOLUME_LETTER : MUSIC_VOLUME);
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, [musicOn]);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      if (!musicOn) return;
      if (MUSIC_LOOP_SECONDS <= 0) return;

      const t = audio.currentTime;
      if (!loopGateRef.current && t >= MUSIC_LOOP_SECONDS) {
        loopGateRef.current = true;
        try {
          audio.currentTime = 0;
          void audio.play();
        } catch {
          // ignore
        }
        return;
      }

      if (loopGateRef.current && t < Math.max(0.5, MUSIC_LOOP_SECONDS - 0.5)) {
        loopGateRef.current = false;
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, [musicOn]);

  useEffect(() => {
    if (!musicOn) return;
    fadeVolumeTo(letterOpen ? MUSIC_VOLUME_LETTER : MUSIC_VOLUME);
  }, [letterOpen, musicOn]);

  useEffect(() => {
    if (!musicOn || (!musicBlocked && !musicNeedsUnmute)) return;
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const onFirstUserGesture = async () => {
      try {
        audio.muted = false;
        await audio.play();
        setMusicBlocked(false);
        setMusicNeedsUnmute(false);
      } catch {
        setMusicBlocked(true);
        setMusicNeedsUnmute(true);
      }
    };

    window.addEventListener("pointerdown", onFirstUserGesture, { once: true, passive: true });
    window.addEventListener("keydown", onFirstUserGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstUserGesture);
      window.removeEventListener("keydown", onFirstUserGesture);
    };
  }, [musicOn, musicBlocked, musicNeedsUnmute]);

  const handleTuneButton = () => {
    if (!musicOn) {
      setMusicOn(true);
      void attemptPlayBestEffort();
      fadeVolumeTo(letterOpen ? MUSIC_VOLUME_LETTER : MUSIC_VOLUME);
      return;
    }

    if (musicBlocked || musicNeedsUnmute || !isPlaying) {
      void attemptPlayBestEffort();
      return;
    }

    setMusicOn(false);
  };

  const triggerBurst = () => {
    setBurstOn(true);
    window.setTimeout(() => setBurstOn(false), 1750);
  };

  const triggerConfetti = () => {
    setConfettiOn(true);
    window.setTimeout(() => setConfettiOn(false), 1800);
  };

  const triggerPetals = () => {
    if (reducedMotion) return;
    setPetalBurstOn(true);
    window.setTimeout(() => setPetalBurstOn(false), 1900);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
        return;
      }
    } catch {
      // ignore
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
  };

  const letterParagraphs = useMemo(() => {
    const raw = pageData.letter.lines;
    const greeting = raw[0] ?? "";
    const remaining = raw.slice(1);

    const paragraphs: string[] = [];
    let buf: string[] = [];
    remaining.forEach((line) => {
      if (line.trim().length === 0) {
        if (buf.length) paragraphs.push(buf.join("\n"));
        buf = [];
        return;
      }
      buf.push(line);
    });
    if (buf.length) paragraphs.push(buf.join("\n"));

    const signature = "મુકેશ";
    const body = paragraphs.filter((p) => p.trim() !== signature);

    return {
      greeting,
      body,
      signature,
    };
  }, []);

  const [musicSrc, setMusicSrc] = useState(MUSIC_SRC);

  return (
    <main className="relative min-h-screen bg-transparent text-slate-950">
      <AnniversaryAmbientBackground strength={letterOpen ? "promise" : "hero"} />
      <HeartBurst active={burstOn} />
      <GoldenConfetti active={confettiOn} />
      {!petalBurstOn ? null : (
        <div className="pointer-events-none fixed inset-0 z-[75] overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-[70%]"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.7, rotate: i * 18 }}
              animate={{
                x: [0, (i % 2 ? 1 : -1) * (26 + (i % 6) * 12), (i % 3 ? 1 : -1) * (12 + (i % 4) * 8)],
                y: -220 - (i % 7) * 26,
                opacity: [0, 0.85, 0],
                scale: [0.7, 1, 0.9],
                rotate: [i * 18, i * 18 + (i % 2 ? 30 : -30)],
              }}
              transition={{ duration: 1.75, ease: "easeOut" }}
              style={{ transformOrigin: "center" }}
            >
              <span
                className="block"
                style={{
                  width: 10 + (i % 4) * 5,
                  height: 16 + (i % 4) * 7,
                  borderRadius: "999px 999px 999px 8px",
                  background:
                    i % 3 === 0
                      ? "linear-gradient(180deg, rgba(255,228,236,0.95), rgba(136,19,55,0.22))"
                      : "linear-gradient(180deg, rgba(255,242,204,0.85), rgba(216,179,90,0.26))",
                  boxShadow: "0 18px 60px rgba(136,19,55,0.12)",
                }}
              />
            </motion.span>
          ))}
        </div>
      )}

      <audio
        ref={audioRef}
        src={musicSrc}
        preload="auto"
        muted
        playsInline
        onError={() => setMusicSrc(MUSIC_SRC_FALLBACK)}
      />

      <div className="fixed left-0 right-0 top-0 z-40 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[rgba(216,179,90,0.95)] via-[rgba(197,155,108,0.85)] to-[rgba(136,19,55,0.55)]"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <motion.button
        type="button"
        onClick={handleTuneButton}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "ww-music-button fixed bottom-4 right-4 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/10 bg-white/65 text-slate-950 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl transition hover:bg-white/80",
          "opacity-75 hover:opacity-100",
          musicOn ? "text-slate-950" : "text-slate-950/70",
          memoriesPlaying ? "translate-y-1 translate-x-1 opacity-40" : "",
        )}
        aria-pressed={musicOn}
        aria-label={musicOn ? "Music On" : "Music Off"}
      >
        <span className="sr-only">{musicOn ? "Music On" : "Music Off"}</span>
        <span aria-hidden className="text-base leading-none">
          {musicOn ? "♪" : "♫"}
        </span>
      </motion.button>

      <section id="hero" className="relative min-h-[100svh] px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-16">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_PREMIUM}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="mx-auto w-full max-w-3xl text-center"
          >
            <motion.div
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.85, ease: EASE_PREMIUM }}
              className="mx-auto mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[rgba(212,175,55,0.42)] bg-[rgba(255,244,223,0.66)] px-3 py-2 shadow-[0_24px_90px_rgba(15,23,42,0.10)] backdrop-blur-xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.40)] bg-[rgba(255,244,223,0.92)] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#162046] shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <span>M</span>
                <span className="text-[#C97C7B]">♥</span>
                <span>S</span>
              </span>
              <span className="inline-flex items-center rounded-full border border-[rgba(212,175,55,0.38)] bg-[rgba(255,244,223,0.88)] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#162046] shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
                30 YEARS
              </span>
              <span className="inline-flex items-center rounded-full border border-[rgba(212,175,55,0.32)] bg-[rgba(246,216,210,0.82)] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#162046] shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
                {pageData.weddingDateLabel.toUpperCase()}
              </span>
            </motion.div>
            <motion.h1
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.95, ease: EASE_PREMIUM }}
              className="text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl"
            >
              {pageData.hero.title}
            </motion.h1>
            <motion.div
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.95, ease: EASE_PREMIUM, delay: 0.05 }}
              className="mt-5 text-pretty text-base leading-relaxed text-slate-700 sm:text-lg"
            >
              {pageData.hero.subtitle}
            </motion.div>

            <motion.div
              variants={revealVariants.fadeIn}
              transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 0.1 }}
              className="mt-4 text-sm font-semibold text-[rgba(136,19,55,0.78)]"
            >
              30 વર્ષ પછી પણ, હું તને જ પસંદ કરું છું.
            </motion.div>

            <motion.div
              variants={revealVariants.fadeIn}
              transition={{ duration: 0.85, delay: 0.15 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <button
                type="button"
                onClick={() => scrollTo("letter")}
                className="flex-1 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_22px_80px_rgba(15,23,42,0.18)] transition hover:bg-slate-900 sm:flex-none"
              >
                {pageData.hero.ctaPrimary}
              </button>
              <button
                type="button"
                onClick={() => scrollTo("memories")}
                className="flex-1 rounded-2xl border border-slate-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_22px_80px_rgba(15,23,42,0.06)] transition hover:bg-white sm:flex-none"
              >
                {pageData.hero.ctaSecondary}
              </button>
            </motion.div>

            <motion.div
              variants={revealVariants.fadeIn}
              transition={{ duration: 0.8 }}
              className="mt-7 text-sm font-semibold text-slate-700/80"
            >
              {pageData.hero.madeByLine}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Section id="featured" eyebrow="" title={pageData.featuredMoment.heading} className="pt-10 pb-3 sm:pt-12 sm:pb-4" headingClassName="mb-4">
        <div className="mx-auto max-w-4xl">
          <Reveal
            variant="scaleSoft"
            className="group relative overflow-hidden rounded-[28px] border border-[rgba(216,179,90,0.45)] bg-white/70 p-3 shadow-[0_34px_120px_rgba(15,23,42,0.12)] backdrop-blur"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#FFFBF3] sm:aspect-[16/9]">
              <motion.img
                src={pageData.featuredMoment.photoUrl}
                alt="Featured memory"
                className="h-full w-full object-cover object-[72%_50%] opacity-95"
                loading="lazy"
                initial={{ scale: 1.02 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/12 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex rounded-full border border-white/20 bg-black/35 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  {pageData.featuredMoment.caption}
                </div>
              </div>
            </div>
          </Reveal>
          <div className="mt-3 text-center text-sm font-semibold text-slate-700/70">Some memories don’t need long explanations.</div>
        </div>
      </Section>

      <Section id="letter" eyebrow={pageData.letter.eyebrow} title={pageData.letter.heading} className="pt-4 pb-12 sm:pt-6 sm:pb-16">
        <div className="mx-auto max-w-4xl">
          {!letterOpen ? (
            <motion.button
              type="button"
              onClick={() => {
                setLetterOpen(true);
                triggerBurst();
              }}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_PREMIUM}
              variants={revealVariants.scaleSoft}
              transition={{ duration: 0.9, ease: EASE_PREMIUM }}
              whileTap={{ scale: 0.99 }}
              className="group relative w-full overflow-hidden rounded-[32px] border border-[rgba(216,179,90,0.50)] bg-[linear-gradient(180deg,rgba(255,251,243,0.92),rgba(255,255,255,0.62))] p-6 text-left shadow-[0_44px_160px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-10"
              aria-label="Open the letter"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(15,23,42,0.030)_0px,rgba(15,23,42,0.030)_1px,transparent_2px,transparent_7px)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[rgba(216,179,90,0.18)] to-transparent" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div />
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-[rgba(216,179,90,0.22)] blur-xl" />
                    <div className="relative grid h-12 w-12 place-items-center rounded-full border border-[rgba(216,179,90,0.65)] bg-[rgba(255,251,243,0.92)] text-lg font-semibold text-[rgba(136,19,55,0.90)] shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
                      <IconMark kind="heart" className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-slate-900/10 bg-white/65 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-7">
                  <div className="text-pretty text-sm leading-relaxed text-slate-700 sm:text-base [font-family:ui-sans-serif,system-ui]">{pageData.letter.closedTitle}</div>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_22px_80px_rgba(15,23,42,0.20)] transition group-hover:bg-slate-900">
                    {pageData.letter.closedButton}
                  </div>
                </div>
              </div>
            </motion.button>
          ) : (
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 12, rotate: -0.45, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, rotate: -0.15, filter: "blur(0px)" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 rounded-[34px] border border-[rgba(216,179,90,0.18)] bg-white/50 shadow-[0_26px_90px_rgba(15,23,42,0.06)]"
              />

              <motion.div
                initial={{ opacity: 0, y: 12, rotate: -0.6, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[34px] border border-[rgba(216,179,90,0.42)] bg-[#FFFBF3] p-6 shadow-[0_44px_160px_rgba(15,23,42,0.16)] sm:p-10"
              >
                <AmbientGlowBlobs colors={["rgba(216,179,90,0.22)", "rgba(136,19,55,0.12)", "rgba(197,155,108,0.18)"]} count={3} className="opacity-[0.55]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.26] mix-blend-multiply [background-image:repeating-linear-gradient(0deg,rgba(15,23,42,0.026)_0px,rgba(15,23,42,0.026)_1px,transparent_2px,transparent_7px)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(216,179,90,0.12)] to-transparent" />

                <div className="relative">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setLetterOpen(false)}
                      className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-900 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition hover:bg-white"
                    >
                      Close
                    </button>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(216,179,90,0.75)] to-transparent" />

                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
                    className={cn(
                      "mx-auto mt-6 max-w-[44rem] text-pretty text-base text-slate-800",
                      "text-left leading-[1.8] [font-family:ui-sans-serif,system-ui]",
                    )}
                  >
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="mb-5 text-lg font-semibold text-[rgba(136,19,55,0.88)]"
                    >
                      {letterParagraphs.greeting}
                    </motion.div>

                    {letterParagraphs.body.map((p, idx) => (
                      <motion.p
                        key={`${idx}_${p.slice(0, 12)}`}
                        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-0 whitespace-pre-line [&+p]:mt-5"
                      >
                        {p}
                      </motion.p>
                    ))}

                    <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-[rgba(216,179,90,0.75)] to-transparent" />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-6 text-xl font-semibold tracking-tight text-[rgba(136,19,55,0.90)]"
                    >
                      {letterParagraphs.signature}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </Section>

      <ToneSection id="memoriesTone" tone="ivory">
        <Section id="memories" eyebrow="" title={pageData.memories.heading}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 text-center text-sm font-semibold text-slate-700/70">A love story, remembered like an old tape.</div>
            {memoriesStartNonce > 0 ? null : (
              <div className="mb-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setMemoriesStartNonce((v) => v + 1);
                    scrollTo("memories");
                  }}
                  className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_22px_80px_rgba(15,23,42,0.18)] transition hover:bg-slate-900"
                >
                  Play Memories
                </button>
              </div>
            )}
            <div className="relative">
              <div aria-hidden className="pointer-events-none absolute inset-0 -m-4 rounded-[40px] bg-[linear-gradient(180deg,rgba(24,20,16,0.10),rgba(24,20,16,0.04))]" />
              <div aria-hidden className="pointer-events-none absolute inset-0 -m-4 rounded-[40px] opacity-[0.10] [background-image:radial-gradient(circle_at_50%_10%,rgba(212,175,55,0.20),transparent_55%),radial-gradient(circle_at_15%_80%,rgba(201,124,123,0.10),transparent_58%)]" />
              <div className="relative">
                <VhsMemoriesPlayer
                  items={pageData.memories.items}
                  startNonce={memoriesStartNonce}
                  onPlaybackStateChange={({ playing }) => setMemoriesPlaying(playing)}
                />
              </div>
            </div>
          </div>
        </Section>
      </ToneSection>

      <Section id="why" eyebrow="" title={pageData.whyChooseYou.heading}>
        <div className="grid gap-4 lg:grid-cols-12">
          {pageData.whyChooseYou.cards.map((c, idx) => (
            <motion.div
              key={`${c.title}_${idx}`}
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: Math.min(idx * 0.05, 0.24), ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "lg:col-span-6",
                idx === 0 ? "lg:col-span-7" : "",
                idx === 1 ? "lg:col-span-5" : "",
                idx === 2 ? "lg:col-span-5" : "",
                idx === 3 ? "lg:col-span-7" : "",
                idx === 4 ? "lg:col-span-12" : "",
              )}
            >
              <div className="relative overflow-hidden rounded-[28px] border border-slate-900/10 bg-white/70 p-5 shadow-[0_30px_110px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[rgba(216,179,90,0.14)] blur-3xl" />
                <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[rgba(136,19,55,0.08)] blur-3xl" />
                <div className="relative flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[rgba(216,179,90,0.35)] bg-white/70 text-lg font-semibold text-[rgba(136,19,55,0.85)] shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
                    <IconMark kind={c.icon as "heart" | "spark" | "flower"} className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-950">{c.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-700">{c.body}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <ToneSection id="journeyTone" tone="cream">
        <Section id="journey" eyebrow="" title={pageData.journeyTimeline.heading}>
          <div className="relative mx-auto max-w-5xl">
            <div className="pointer-events-none absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[rgba(216,179,90,0.75)] via-[rgba(136,19,55,0.18)] to-transparent sm:block" />

            <div className="space-y-8">
              {pageData.journeyTimeline.items.map((t, idx) => (
                <motion.div
                  key={`${t.when}_${t.title}`}
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                  transition={{ duration: 0.7, delay: Math.min(idx * 0.05, 0.2), ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-3xl border border-slate-900/10 bg-white/75 p-5 shadow-[0_26px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:pl-10"
                >
                  <div className="text-xs font-semibold tracking-[0.18em] text-slate-700/60">{t.when}</div>
                  <div className="mt-2 text-lg font-semibold text-slate-950">{t.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </ToneSection>

      <Section id="little" eyebrow="" title={pageData.littleThings.heading}>
        <div className="mx-auto max-w-5xl">
          <Card>
            <div className="flex flex-wrap gap-2">
              {pageData.littleThings.notes.map((n, idx) => (
                <span
                  key={`${idx}_${n.slice(0, 10)}`}
                  className="inline-flex rounded-full border border-slate-900/10 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="mt-6 text-sm font-semibold text-slate-700/80">{pageData.littleThings.playfulLine}</div>
          </Card>
        </div>
      </Section>

      <ToneSection id="finaleTone" tone="cream">
        <Section id="finale" eyebrow="" title={pageData.finale.heading} headingClassName="sr-only">
          <div className="mx-auto max-w-6xl">
            <Reveal
              variant="scaleSoft"
              className="relative overflow-hidden rounded-[34px] border border-[rgba(212,175,55,0.40)] bg-[linear-gradient(180deg,#1F2A5A_0%,#162046_100%)] p-7 text-center shadow-[0_60px_220px_rgba(15,23,42,0.28)] sm:p-12"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.18),transparent_45%)]" />
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(circle_at_50%_50%,transparent_54%,rgba(0,0,0,0.50)_100%)]" />
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_15%_18%,rgba(212,175,55,0.20),transparent_52%),radial-gradient(circle_at_85%_22%,rgba(230,199,106,0.16),transparent_54%),radial-gradient(circle_at_60%_90%,rgba(212,175,55,0.10),transparent_58%)]" />
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.07)_0px,rgba(255,255,255,0.07)_1px,transparent_2px,transparent_7px)]" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.95)] to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.55)_0.5px,transparent_1px),radial-gradient(circle_at_70%_60%,rgba(230,199,106,0.55)_0.5px,transparent_1px),radial-gradient(circle_at_50%_85%,rgba(212,175,55,0.50)_0.5px,transparent_1px)] [background-size:180px_180px]" />

              <div className="relative">
                <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(230,199,106,0.38)] bg-[rgba(255,255,255,0.08)] px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-[rgba(230,199,106,0.92)] shadow-[0_20px_90px_rgba(0,0,0,0.20)]">
                  30 YEARS
                </div>

                <div className="mx-auto mt-6 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-[rgba(248,241,231,0.95)] sm:text-5xl [font-family:ui-serif,Georgia,serif]">
                  <div aria-hidden className="pointer-events-none absolute left-1/2 top-20 h-40 w-[34rem] -translate-x-1/2 rounded-full bg-[rgba(212,175,55,0.16)] blur-3xl" />
                  {pageData.finale.heading}
                </div>

                <div className="mx-auto mt-6 max-w-3xl text-pretty text-sm leading-relaxed text-[rgba(248,241,231,0.82)] sm:text-base">{pageData.finale.body}</div>

                <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-[rgba(230,199,106,0.80)] to-transparent" />

                <motion.div
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={VIEWPORT_PREMIUM}
                  transition={{ duration: 0.95, ease: EASE_PREMIUM }}
                  className="mx-auto mt-7 max-w-3xl text-balance text-[1.7rem] font-semibold tracking-tight text-[rgba(230,199,106,0.95)] drop-shadow-[0_18px_70px_rgba(0,0,0,0.35)] sm:text-[2.15rem]"
                >
                  {pageData.finale.bigLine}
                </motion.div>

                <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setMemoriesStartNonce((v) => v + 1);
                      scrollTo("hero");
                    }}
                    className="rounded-2xl border border-[rgba(230,199,106,0.35)] bg-[rgba(212,175,55,0.12)] px-6 py-3 text-sm font-semibold text-[rgba(248,241,231,0.95)] shadow-[0_28px_110px_rgba(0,0,0,0.25)] transition hover:bg-[rgba(212,175,55,0.18)]"
                  >
                    {pageData.finale.button}
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTo("hero")}
                    className="rounded-2xl border border-[rgba(248,241,231,0.22)] bg-[rgba(255,255,255,0.06)] px-6 py-3 text-sm font-semibold text-[rgba(248,241,231,0.92)] shadow-[0_24px_90px_rgba(0,0,0,0.18)] transition hover:bg-[rgba(255,255,255,0.10)]"
                  >
                    Back to start
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </ToneSection>

      <Section id="bless" eyebrow="" title={pageData.blessings.heading}>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <div className="text-pretty text-sm leading-relaxed text-slate-700 sm:text-base">{pageData.blessings.body}</div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  if (blessingCooldown) return;
                  setBlessingCooldown(true);
                  triggerBurst();
                  triggerConfetti();
                  setBlessingMessage(pageData.blessings.confirmationBlessings);
                  setBlessingSent(true);
                  window.setTimeout(() => setBlessingSent(false), 2400);
                  window.setTimeout(() => setBlessingCooldown(false), 2000);
                }}
                disabled={blessingCooldown}
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)] transition hover:bg-slate-900"
              >
                {pageData.blessings.ctaPrimary}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (blessingCooldown) return;
                  setBlessingCooldown(true);
                  triggerPetals();
                  setBlessingMessage(pageData.blessings.confirmationFlowers);
                  setBlessingSent(true);
                  window.setTimeout(() => setBlessingSent(false), 2400);
                  window.setTimeout(() => setBlessingCooldown(false), 2000);
                }}
                disabled={blessingCooldown}
                className="rounded-2xl border border-[rgba(136,19,55,0.20)] bg-[rgba(255,228,236,0.55)] px-5 py-3 text-sm font-semibold text-[rgba(136,19,55,0.92)] shadow-[0_18px_60px_rgba(136,19,55,0.10)] transition hover:bg-[rgba(255,228,236,0.70)]"
              >
                Send Flowers
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-2xl border border-slate-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                {pageData.blessings.ctaSecondary}
              </button>
            </div>
            {!blessingSent ? null : (
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 rounded-2xl border border-[rgba(216,179,90,0.35)] bg-[rgba(216,179,90,0.10)] px-4 py-3 text-sm font-semibold text-slate-900"
              >
                {blessingMessage ?? pageData.blessings.confirmationBlessings}
              </motion.div>
            )}
            <div className="mt-4 text-xs font-semibold text-slate-700/60">If sharing doesn’t open, the link will be copied.</div>
          </Card>

          <div className="rounded-3xl border border-slate-900/10 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="mt-3 text-lg font-semibold text-slate-950">A small celebration, sent with love.</div>
            <div className="mt-2 text-sm leading-relaxed text-slate-700">Send blessings for a gold heart celebration, or send flowers for soft rose petals floating upward.</div>
          </div>
        </div>
      </Section>

      <Section id="business" eyebrow="" title={pageData.businessCta.heading}>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <div className="text-pretty text-sm font-semibold leading-relaxed text-[rgba(136,19,55,0.85)] sm:text-base">Someone you love deserves a page like this too.</div>
            <div className="text-pretty text-sm leading-relaxed text-slate-700 sm:text-base">{pageData.businessCta.body}</div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  triggerBurst();
                  scrollTo("hero");
                }}
                className="w-full rounded-2xl border border-slate-900/10 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition hover:bg-white"
              >
                {pageData.businessCta.button}
              </button>
            </div>
            <div className="mt-5 text-xs font-semibold tracking-[0.18em] text-slate-700/60">{pageData.businessCta.examples}</div>
          </Card>

          <div className="rounded-3xl border border-slate-900/10 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="mt-3 text-lg font-semibold text-slate-950">A premium page, made to feel personal.</div>
            <div className="mt-2 text-sm leading-relaxed text-slate-700">Short, story-friendly, and beautiful on mobile.</div>
          </div>
        </div>
      </Section>

      <DemoStickyCTA occasion="Anniversary" templateName="Premium Memory Story" packageId="premium" priceText="From ₹1,499" recipientName="Mukesh & Sonal" demoUrl="/mukesh-sonal-30th-anniversary" />
      <footer className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl border-t border-slate-900/10 pt-8 text-center">
          <div className="text-xs font-semibold text-slate-700/75">{pageData.footer}</div>
        </div>
      </footer>
    </main>
  );
};

export default MukeshSonal30thAnniversaryPage;
