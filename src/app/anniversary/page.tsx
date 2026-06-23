"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import AnniversaryNumberScoreboard from "@/components/wowwish/AnniversaryNumberScoreboard";
import { AnniversaryMiniFilmStrip, AnniversaryScenePhoto } from "@/components/wowwish/AnniversaryFilmPhotos";
import DemoStickyCTA from "@/components/wowwish/DemoStickyCTA";
import { ScrollCTA } from "@/components/wowwish/treatments";
import { RevealHeading, cardFadeUp, borderDraw } from "@/components/wowwish/scrollReveal";
import { scrollToSection } from "@/lib/scrollToSection";
import photo1 from "./1.jpeg";
import photo2 from "./2.jpeg";
import photo3 from "./3.jpeg";
import photo4 from "./4.jpeg";
import photo5 from "./5.jpeg";

const MUSIC_SRC = "/assets/anniversary-bg-music.mp3";
const MUSIC_VOLUME = 0.18;

type TemplateData = {
  partnerName: string;
  fromName: string;
  yearsTogether: number;
  hero: {
    headlinePrefix: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  photos: {
    title: string;
    subtitle: string;
    items: Array<{ label: string; note: string; url: string }>;
  };
  journey: {
    title: string;
    eyebrow: string;
    milestones: Array<{ title: string; when: string; body: string }>;
  };
  littleThings: {
    title: string;
    eyebrow: string;
    cards: Array<{ title: string; body: string }>;
  };
  reflection: {
    title: string;
    eyebrow: string;
    body: string[];
    statChips: Array<{ label: string; value: string }>;
  };
  memoryReveal: {
    title: string;
    eyebrow: string;
    prompt: string;
    notes: Array<{ title: string; body: string }>;
  };
  wishes: {
    title: string;
    eyebrow: string;
    chips: string[];
  };
  letter: {
    title: string;
    eyebrow: string;
    paragraphs: string[];
    signoff: string;
  };
  finale: {
    title: string;
    eyebrow: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    footerLine: string;
  };
};

const templateData: TemplateData = {
  partnerName: "Riya",
  fromName: "Abhi",
  yearsTogether: 3,

  hero: {
    headlinePrefix: "Happy Anniversary,",
    subheadline:
      "One more year of us — the quiet kind of love: little habits, big memories, and choosing each other again.",
    ctaPrimary: "Start our journey",
    ctaSecondary: "Open sealed feeling",
  },

  photos: {
    title: "A soft film of us",
    subtitle: "From ordinary days to forever-favorites — the kind you don’t post, you keep.",
    items: [
      {
        label: "My peace",
        note: "The one that makes everything feel okay — instantly.",
        url: photo1.src,
      },
      {
        label: "Our kind of chaos",
        note: "Laughing too much. Caring even more.",
        url: photo2.src,
      },
      {
        label: "Somewhere new, same us",
        note: "Not perfect. Just real. Just ours.",
        url: photo3.src,
      },
      {
        label: "A day we still keep",
        note: "Where we spoke like we had forever.",
        url: photo4.src,
      },
      {
        label: "Another year, quietly ours",
        note: "Some evenings feel like a promise — soft and sure.",
        url: photo5.src,
      },
    ],
  },

  journey: {
    eyebrow: "Our journey",
    title: "Our timeline",
    milestones: [
      {
        title: "First proper conversation",
        when: "A random day",
        body: "It felt easy from the start.",
      },
      {
        title: "Our first photo",
        when: "A small win",
        body: "One click. Suddenly, a story.",
      },
      {
        title: "That trip",
        when: "Somewhere new",
        body: "New place. Same comfort.",
      },
      {
        title: "The fight we survived",
        when: "A hard week",
        body: "We came back softer.",
      },
      {
        title: "Today — still us",
        when: "Right now",
        body: "Still choosing. Still here.",
      },
    ],
  },

  littleThings: {
    eyebrow: "The little things",
    title: "The small ways you love me",
    cards: [
      {
        title: "The late-night texts",
        body: "A small check-in that becomes comfort.",
      },
      {
        title: "The softness",
        body: "Even on heavy days, you make things feel lighter.",
      },
      {
        title: "The comfort",
        body: "Your presence is my easiest place to breathe.",
      },
      {
        title: "The way you stay",
        body: "You hold my hand through the messy parts.",
      },
    ],
  },

  reflection: {
    eyebrow: "One more year",
    title: "This year, in tiny numbers",
    body: [
      "We laughed, fought, healed, grew — and still chose each other.",
      "Somehow, every ordinary day became softer with you.",
      "If love is a place, you’re the one I return to.",
    ],
    statChips: [
      { label: "Years", value: "kept choosing" },
      { label: "Inside jokes", value: "still laughing" },
      { label: "Comfort", value: "your kind of love" },
      { label: "Trips", value: "same us, new places" },
      { label: "Saved photos", value: "proof we happened" },
      { label: "Random calls", value: "tiny check-ins" },
    ],
  },

  memoryReveal: {
    eyebrow: "A little moment",
    title: "Open a scene I replay",
    prompt: "Tap one little scene — the kind I keep close.",
    notes: [
      {
        title: "The chai break",
        body: "A five-minute pause that became our favorite reset.",
      },
      {
        title: "That random evening",
        body: "Nothing big happened. Still, I remember everything.",
      },
      {
        title: "The quiet ride",
        body: "No big words. Just comfort sitting beside me.",
      },
      {
        title: "The photo we kept",
        body: "The one we almost didn’t take.",
      },
    ],
  },

  wishes: {
    title: "Anniversary wishes",
    eyebrow: "For us",
    chips: [
      "more soft mornings",
      "more laughter",
      "more deep talks",
      "more trips",
      "more calm",
      "more photos",
      "more us",
      "more love",
    ],
  },

  letter: {
    title: "A note I’d keep",
    eyebrow: "From me",
    paragraphs: [
      "Happy anniversary, love.",
      "One more year of us — and somehow you still feel like my favorite place to be.",
      "Thank you for the tiny things: the check-ins, the laughter, the soft understanding. Thank you for making love feel easy, even when life wasn’t.",
      "I don’t need big speeches to know what we are. I just need you — the real you — in the ordinary days.",
    ],
    signoff: "— With all my love",
  },

  finale: {
    title: "One more year of us",
    eyebrow: "Always",
    body: "Still choosing you. Not perfect. Deeply ours. Another year, same us, more depth.",
    ctaPrimary: "Replay our story",
    ctaSecondary: "One more memory",
    footerLine: "Made with love — for the person who made ordinary days feel magical.",
  },
};

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function useReducedMotionSafe() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function RomanticBackground() {
  const reducedMotion = useReducedMotionSafe();

  const blobs = useMemo(
    () =>
      [
        { id: "b1", className: "bg-[#C17A6F]/24", size: "h-72 w-72", x: "-left-20", y: "top-24", dur: 18 },
        { id: "b2", className: "bg-[#E2B9B0]/26", size: "h-96 w-96", x: "-right-24", y: "top-10", dur: 22 },
        { id: "b3", className: "bg-[#F8D7D1]/22", size: "h-[28rem] w-[28rem]", x: "left-1/4", y: "-bottom-28", dur: 26 },
      ] as const,
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#F5EBE8]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8EFEC] via-[#F5EBE8] to-[#F1E2DE]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_18%,rgba(193,122,111,0.24),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_42%,rgba(226,185,176,0.34),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_56%,rgba(193,122,111,0.18),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_92%,rgba(255,250,249,0.62),transparent_65%)]" />
      <div className="absolute inset-0 opacity-[0.12] mix-blend-multiply [background-image:repeating-linear-gradient(0deg,rgba(15,23,42,0.028)_0px,rgba(15,23,42,0.028)_1px,transparent_2px,transparent_4px)]" />

      {reducedMotion
        ? null
        : blobs.map((b, i) => (
            <motion.div
              key={b.id}
              className={cn("absolute rounded-full blur-3xl", b.className, b.size, b.x, b.y)}
              initial={{ opacity: 0.35, x: 0, y: 0 }}
              animate={{ opacity: [0.28, 0.38, 0.28], x: [0, i % 2 === 0 ? 16 : -16, 0], y: [0, 10, 0] }}
              transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.70),transparent_55%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#F5EBE8] to-transparent" />
    </div>
  );
}

type BokehDot = {
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

function SoftBokeh() {
  const reducedMotion = useReducedMotionSafe();

  const dots = useMemo<BokehDot[]>(() => {
    const colors = [
      "rgba(255,227,176,0.55)",
      "rgba(246,199,182,0.52)",
      "rgba(214,166,200,0.45)",
      "rgba(255,255,255,0.45)",
    ];

    return Array.from({ length: 14 }).map((_, i) => ({
      id: `bk_${i}_${Math.random().toString(16).slice(2)}`,
      leftPct: (i * 11.8 + 8) % 100,
      topPct: (i * 13.6 + 10) % 100,
      size: 26 + (i % 5) * 14,
      opacity: 0.10 + (i % 4) * 0.04,
      duration: 20 + (i % 6) * 3,
      delay: (i % 8) * 0.25,
      drift: (i % 2 ? 1 : -1) * (18 + (i % 4) * 12),
      color: colors[i % colors.length],
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
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
          initial={{ x: 0, y: 40 }}
          animate={{ x: [0, d.drift, 0], y: [40, -40, 40] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MemoryJournalParticles() {
  const reducedMotion = useReducedMotionSafe();

  const particles = useMemo(() => {
    const marks = ["♡", "✦", "•", "▱"];
    return Array.from({ length: 16 }).map((_, i) => ({
      id: `journal_${i}`,
      mark: marks[i % marks.length],
      left: (i * 13.7 + 7) % 100,
      top: (i * 17.1 + 8) % 100,
      size: i % 4 === 3 ? 24 : 12 + (i % 4) * 3,
      opacity: 0.25 + (i % 4) * 0.045,
      duration: 8 + (i % 6) * 1.8,
      delay: (i % 8) * 0.35,
      drift: (i % 2 ? 1 : -1) * (8 + (i % 4) * 4),
      color: i % 3 === 0 ? "#D6A6C8" : i % 3 === 1 ? "#F6C7B6" : "#D8A84F",
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-semibold"
          style={{ left: `${p.left}%`, top: `${p.top}%`, color: p.color, fontSize: p.size, opacity: p.opacity }}
          animate={{ y: [0, -18, 0], x: [0, p.drift, 0], scale: [1, 1.05, 1], rotate: [0, p.drift, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {p.mark}
        </motion.span>
      ))}
    </div>
  );
}

function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[#C17A6F]/18 bg-[#FFFAF9]/88 p-5 shadow-[0_26px_90px_rgba(134,72,63,0.10)] backdrop-blur-xl sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center"
        >
          {eyebrow ? <div className="mb-2 text-xs font-semibold tracking-wide text-[#C17A6F]/80">{eyebrow}</div> : null}
          <RevealHeading className="mx-auto max-w-3xl text-balance text-4xl font-semibold italic leading-[1.06] tracking-tight text-slate-950 sm:text-5xl" style={{ fontFamily: "var(--font-luxury)" }}>{title}</RevealHeading>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

type Spark = { id: string; left: number; top: number; size: number; opacity: number; delay: number };

function RosePetalShower({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotionSafe();

  const petals = useMemo(() => {
    const marks = ["♡", "♥", "❦"];
    return Array.from({ length: 18 }).map((_, i) => ({
      id: `petal_${i}`,
      mark: marks[i % marks.length],
      left: 8 + ((i * 17.4) % 84),
      size: 12 + (i % 4) * 3,
      delay: (i % 9) * 0.055,
      drift: (i % 2 ? 1 : -1) * (18 + (i % 4) * 8),
      color: i % 3 === 0 ? "#C17A6F" : i % 3 === 1 ? "#D99B92" : "#F0C1BA",
    }));
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-semibold"
          style={{ left: `${p.left}%`, top: "-8%", fontSize: p.size, color: p.color }}
          initial={{ y: -24, x: 0, opacity: 0, rotate: -12 }}
          animate={{ y: [0, 210, 430], x: [0, p.drift, p.drift * -0.25], opacity: [0, 0.7, 0], rotate: [-12, 18, -20] }}
          transition={{ duration: 2.4, delay: p.delay, ease: "easeOut" }}
        >
          {p.mark}
        </motion.span>
      ))}
    </div>
  );
}

function HeroYearsCounter({
  value = 3,
  fallbackValue = 3,
  caption,
}: {
  value?: number;
  fallbackValue?: number;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const resolvedValue = Number.isFinite(value) && value > 0 ? value : fallbackValue;

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 10, filter: "blur(8px)" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          {resolvedValue} years
        </div>
        <div className="mt-2 text-sm leading-relaxed text-slate-700">
          {caption}
        </div>
      </motion.div>
    </div>
  );
}

function SoftSparkle({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotionSafe();

  const sparks = useMemo<Spark[]>(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: `spk_${i}_${Math.random().toString(16).slice(2)}`,
      left: (i * 19.3 + 12) % 100,
      top: 18 + ((i * 10.6) % 44),
      size: 2 + (i % 4),
      opacity: 0.24 + (i % 4) * 0.05,
      delay: (i % 10) * 0.02,
    }));
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            background: "rgba(255,227,176,0.90)",
            boxShadow: "0 0 18px rgba(255,227,176,0.20)",
          }}
          initial={{ y: 0, scale: 0.95, opacity: 0 }}
          animate={{ y: [0, -22, 0], scale: [0.95, 1.2, 0.95], opacity: [0, s.opacity, 0] }}
          transition={{ duration: 1.25, delay: s.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

const wishIcons: Record<string, string> = {
  "more soft mornings": "🌅",
  "more laughter": "😄",
  "more deep talks": "💬",
  "more trips": "✈️",
  "more calm": "🌿",
  "more photos": "📸",
  "more us": "🫶",
  "more love": "♡",
};

export default function AnniversaryPage() {
  const [musicOn, setMusicOn] = useState(true);
  const [musicBlocked, setMusicBlocked] = useState(false);
  const [musicNeedsUnmute, setMusicNeedsUnmute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [petalShowerOn, setPetalShowerOn] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [sparkleOn, setSparkleOn] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const attemptPlayBestEffort = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = MUSIC_VOLUME;
    audio.loop = true;

    try {
      audio.muted = false;
      await audio.play();
      setMusicBlocked(false);
      setMusicNeedsUnmute(false);
    } catch {
      try {
        audio.muted = true;
        await audio.play();
        setMusicBlocked(false);
        setMusicNeedsUnmute(true);
      } catch {
        setMusicBlocked(true);
        setMusicNeedsUnmute(false);
        setMusicOn(false);
      }
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const onPlaying = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = MUSIC_VOLUME;
    audio.loop = true;

    if (musicOn) {
      void attemptPlayBestEffort();
      return;
    }

    setMusicBlocked(false);
    setMusicNeedsUnmute(false);
    audio.pause();
    audio.currentTime = 0;
  }, [musicOn]);

  const handleVibeButton = () => {
    setMusicOn((prev) => !prev);
  };

  const startJourney = () => {
    setSparkleOn(true);
    window.setTimeout(() => setSparkleOn(false), 1300);
    scrollToSection("milestone");
  };

  const handleFinale = () => {
    setSparkleOn(true);
    window.setTimeout(() => setSparkleOn(false), 1300);
  };

  const openEnvelope = () => {
    setEnvelopeOpen(true);
    setPetalShowerOn(true);
    window.setTimeout(() => setPetalShowerOn(false), 2600);
  };

  return (
    <main className="anniversary-romantic relative min-h-screen overflow-hidden bg-[#F5EBE8] text-slate-950">
      <RomanticBackground />
      <SoftBokeh />
      <MemoryJournalParticles />
      <SoftSparkle active={sparkleOn} />

      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" playsInline />

      <motion.button
        type="button"
        onClick={handleVibeButton}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "ww-music-button fixed bottom-4 right-4 z-30 inline-flex items-center justify-center rounded-full border border-[#C17A6F]/30 bg-[#FFFAF9]/82 px-4 py-2 text-xs font-semibold shadow-[0_18px_60px_rgba(193,122,111,0.16)] backdrop-blur-xl transition",
          musicOn ? "text-[#8E5149]" : "text-[#8E5149]/70",
        )}
        aria-pressed={musicOn}
        aria-label={musicOn ? "Music On" : "Music Off"}
      >
        <span aria-hidden>{musicOn ? "Music On" : "Music Off"}</span>
      </motion.button>

      <section id="hero" className="relative px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(255,227,176,0.55),transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_55%,rgba(246,199,182,0.45),transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(214,166,200,0.35),transparent_62%)]" />
        </div>
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.02, ease: [0.22, 1, 0.36, 1] }}
                className="text-[11px] font-semibold tracking-wide text-slate-700/70"
              >
                ONE MORE YEAR OF US
              </motion.div>

              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-slate-950 sm:text-6xl">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {templateData.hero.headlinePrefix}{" "}
                </motion.span>
                <motion.span
                  className="text-[#C17A6F]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                >
                  {templateData.partnerName}
                </motion.span>
                <span className="text-slate-950">.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-700 sm:text-lg">
                {templateData.hero.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={startJourney}
                  className="rounded-2xl bg-[#C17A6F] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(193,122,111,0.24)] transition hover:bg-[#A9655C]"
                >
                  {templateData.hero.ctaPrimary}
                </button>
                <ScrollCTA
                  scrollTargetId="sealed-envelope"
                  className="rounded-2xl border border-[#C17A6F]/24 bg-[#FFFAF9]/72 px-5 py-3 text-sm font-semibold text-[#8E5149] transition hover:bg-[#FFFAF9]"
                >
                  {templateData.hero.ctaSecondary}
                </ScrollCTA>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard>
                <div className="text-[11px] font-semibold tracking-wide text-slate-700/70"> </div>
                <HeroYearsCounter
                  value={templateData.yearsTogether}
                  fallbackValue={3}
                  caption="And somehow, it still feels like my favorite chapter."
                />
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="milestone" className="scroll-mt-24 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(255,227,176,0.22),rgba(214,166,200,0.16))]">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700/60">milestone unlocked</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    Another year, quietly ours.
                  </div>
                  <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-700">
                    More memories. More patience. More us.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <AnniversaryScenePhoto photo={templateData.photos.items[0]} sceneLabel="A MOMENT WE KEEP" />

      <SectionShell id="journey" eyebrow="" title={templateData.journey.title}>
        <div className="relative">
          <motion.div
            aria-hidden
            className="absolute bottom-6 left-4 top-4 w-px origin-top bg-gradient-to-b from-[#D8A84F]/55 via-[#F6C7B6]/45 to-transparent sm:left-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          {templateData.journey.milestones.map((m, idx) => (
            <motion.div
              key={`${m.title}_${idx}`}
              variants={cardFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
              className={cn("relative mb-4 pl-11 sm:w-1/2 sm:pl-0", idx % 2 === 0 ? "sm:pr-8" : "sm:ml-auto sm:pl-8")}
            >
              <div
                className={cn(
                  "absolute left-2 top-7 z-10 grid h-5 w-5 place-items-center rounded-full border border-[#FFFAF9] bg-[#F5EBE8] shadow-[0_0_28px_rgba(193,122,111,0.28)] sm:left-auto",
                  idx % 2 === 0 ? "sm:-right-2.5" : "sm:-left-2.5",
                )}
              >
                <div className="h-2 w-2 rounded-full bg-[#D8A84F]" />
              </div>
              {idx < templateData.journey.milestones.length - 1 ? (
                <div
                  aria-hidden
                  className={cn(
                    "absolute left-[0.42rem] top-14 z-10 text-sm font-semibold text-[#D8A84F]/70 sm:left-auto",
                    idx % 2 === 0 ? "sm:-right-[0.15rem]" : "sm:-left-[0.15rem]",
                  )}
                >
                  ↓
                </div>
              ) : null}
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-black/10 bg-white/72 p-4 shadow-[0_22px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-5",
                  idx === templateData.journey.milestones.length - 1 ? "ring-1 ring-[#FFE3B0]/65" : "",
                )}
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#D8A84F]/50 to-transparent" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600/70">{m.when}</div>
                    <div className="mt-2 text-lg font-semibold text-slate-950">{m.title}</div>
                    <div className="mt-2 text-sm font-medium leading-6 text-slate-700">{m.body}</div>
                  </div>
                  <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur sm:mt-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FFE3B0]/80" />
                      {idx === templateData.journey.milestones.length - 1 ? "now" : "then"}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <AnniversaryScenePhoto photo={templateData.photos.items[1]} sceneLabel="SOMEWHERE NEW, SAME US" />

      <section id="sealed-envelope" className="scroll-mt-24 py-14 sm:py-20" style={{ paddingLeft: 16, paddingRight: 16, overflow: "hidden" }}>
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 text-center"
          >
            <RevealHeading className="mx-auto max-w-3xl text-balance text-4xl font-semibold italic leading-[1.06] tracking-tight text-slate-950 sm:text-5xl" style={{ fontFamily: "var(--font-luxury)" }}>One sealed feeling</RevealHeading>
          </motion.div>
          <GlassCard className="relative box-border max-w-full overflow-hidden text-center">
          <RosePetalShower active={petalShowerOn} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(193,122,111,0.16),transparent_58%)]" />
          <motion.button
            type="button"
            onClick={openEnvelope}
            whileTap={{ scale: 0.98 }}
            className="relative mx-auto block box-border w-full max-w-full overflow-hidden rounded-[32px] border border-[#C17A6F]/20 bg-[#FFFAF9] p-5 text-center shadow-[0_24px_90px_rgba(134,72,63,0.12)] sm:max-w-xl"
            aria-expanded={envelopeOpen}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8E5149]/70">tap to open</div>
            <div className="mt-2 text-lg font-semibold text-[#8E5149]">One thing I&apos;ve never said out loud</div>

            <div className="relative mx-auto mt-8 block h-44 w-full max-w-[280px] overflow-hidden">
              <motion.div
                aria-hidden
                className="absolute bottom-0 left-[7%] h-32 w-[86%] rounded-b-[24px] border border-[#C17A6F]/30 bg-[#F3CFC8] shadow-[0_18px_50px_rgba(134,72,63,0.12)]"
                animate={envelopeOpen ? { y: 8 } : { y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                aria-hidden
                className="absolute bottom-[5.4rem] left-[7%] h-28 w-[86%] origin-bottom rounded-t-[24px] border border-[#C17A6F]/30 bg-[#E8B9B0]"
                style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
                animate={envelopeOpen ? { rotateX: 178, y: -9 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                aria-hidden={!envelopeOpen}
                className="absolute left-[11%] top-3 box-border w-[78%] overflow-hidden rounded-2xl border border-[#C17A6F]/18 bg-[#FFFDF8] px-5 py-6 text-[#7A4740] shadow-[0_18px_60px_rgba(134,72,63,0.12)]"
                initial={false}
                animate={envelopeOpen ? { opacity: 1, y: -34, scale: 1, rotate: -1.5 } : { opacity: 0, y: 44, scale: 0.92, rotate: 0 }}
                transition={{ duration: 0.72, delay: envelopeOpen ? 0.22 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="break-words text-lg font-bold leading-[1.8] sm:text-2xl sm:leading-8" style={{ fontFamily: "var(--font-handwritten)", wordBreak: "break-word" }}>
                  I fall for you again every time you laugh at something only you find funny.
                </div>
              </motion.div>
              <div aria-hidden className="absolute bottom-0 left-[7%] h-32 w-[86%] overflow-hidden rounded-b-[24px]">
                <div className="absolute inset-0 bg-[linear-gradient(145deg,transparent_48%,rgba(193,122,111,0.22)_49%,transparent_51%),linear-gradient(215deg,transparent_48%,rgba(193,122,111,0.22)_49%,transparent_51%)]" />
              </div>
            </div>
          </motion.button>
          </GlassCard>
        </div>
      </section>

      <AnniversaryMiniFilmStrip photos={[templateData.photos.items[2], templateData.photos.items[3]]} />

      <SectionShell id="little" eyebrow="" title={templateData.littleThings.title}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templateData.littleThings.cards.map((c, idx) => (
            <motion.div
              key={`${c.title}_${idx}`}
              variants={cardFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
            >
              <div className="group relative h-full overflow-hidden rounded-3xl border border-[#C17A6F]/18 bg-[#FFFAF9]/88 p-5 shadow-[0_22px_80px_rgba(134,72,63,0.10)] backdrop-blur-xl transition hover:bg-[#FFFAF9] sm:p-7">
                <motion.div aria-hidden className="absolute bottom-5 left-0 top-5 w-1 origin-top rounded-r-full bg-[#C17A6F]/55" variants={borderDraw} />
                <div className="pl-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="h-2 w-2 rounded-full bg-[#FFE3B0]/80" />
                    <div className="h-2 w-2 rounded-full bg-[#F6C7B6]/55" />
                  </div>
                  <div className="mt-3 text-base font-semibold text-slate-950">{c.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-700">{c.body}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <AnniversaryScenePhoto photo={templateData.photos.items[4]} sceneLabel="A DAY WE STILL KEEP" />

      <SectionShell id="reflection" eyebrow="" title="A year in our numbers">
        <AnniversaryNumberScoreboard
          accentColor="#C17A6F"
          cardBackground="rgba(255, 250, 249, 0.92)"
          borderColor="rgba(193, 122, 111, 0.22)"
          yearsValue={3}
          daysValue={1095}
          citiesValue={4}
          photosValue={312}
        />
      </SectionShell>

      <SectionShell id="wishes" eyebrow="" title={templateData.wishes.title}>
        <GlassCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(255,227,176,0.22),transparent_62%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(214,166,200,0.18),transparent_65%)]" />

          <p className="relative mb-5 text-center text-[15px] italic text-[#8B4040]/70">
            For the year ahead, I&apos;m wishing us —
          </p>
          <div className="relative flex flex-wrap justify-center gap-2.5">
            {templateData.wishes.chips.map((c, idx) => (
              <motion.button
                key={c}
                type="button"
                onClick={() => {
                  setSparkleOn(true);
                  window.setTimeout(() => setSparkleOn(false), 700);
                }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.05 }}
                viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                transition={{ duration: 0.45, delay: idx * 0.025, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-[#C17A6F] bg-[#FFF0EE] px-[18px] py-2.5 text-sm font-semibold text-[#8B4040] shadow-[0_12px_36px_rgba(193,122,111,0.10)] transition-colors hover:bg-[#F7DCD8]"
              >
                <span aria-hidden>{wishIcons[c] ?? "♡"}</span>
                <span>{c}</span>
              </motion.button>
            ))}
          </div>
        </GlassCard>
      </SectionShell>

      <SectionShell id="letter" eyebrow="" title={templateData.letter.title}>
        <GlassCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,227,176,0.20),transparent_62%)]" />
          <div className="relative box-border max-w-full overflow-hidden">
            {!letterOpen ? (
              <button
                type="button"
                onClick={() => {
                  setLetterOpen(true);
                  setSparkleOn(true);
                  window.setTimeout(() => setSparkleOn(false), 1100);
                }}
                className="block box-border w-full max-w-full overflow-hidden rounded-[28px] border border-black/10 bg-white/70 p-5 text-left shadow-[0_18px_70px_rgba(15,23,42,0.08)] transition hover:bg-white"
                aria-expanded={letterOpen}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600/70">journal page</div>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-2xl font-semibold tracking-tight text-slate-950">Open the note I’d always keep</div>
                    <div className="mt-2 text-sm leading-7 text-slate-700">A small paper note for the year we just lived.</div>
                  </div>
                  <span aria-hidden className="mt-1 text-xl text-slate-500">⌄</span>
                </div>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                className="box-border max-w-full overflow-hidden rounded-[28px] border border-black/10 bg-[#FFFDF8] px-5 py-6 shadow-[0_24px_90px_rgba(15,23,42,0.10)] sm:p-7"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600/70">opened note</div>
                  <button
                    type="button"
                    onClick={() => setLetterOpen(false)}
                    className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-[#FFF7F0]"
                  >
                    Close note ↑
                  </button>
                </div>
                <div className="space-y-4 break-words">
                  {templateData.letter.paragraphs.map((p, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.36, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="text-pretty text-base font-medium leading-8 text-slate-800"
                    >
                      {p}
                    </motion.p>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, delay: templateData.letter.paragraphs.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="pt-4"
                  >
                    <div className="text-sm font-medium italic text-slate-800">{templateData.letter.signoff}</div>
                    <div className="mt-1 text-base font-semibold italic tracking-wide text-slate-700">{templateData.fromName}</div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </SectionShell>

      <DemoStickyCTA occasion="Anniversary" templateName="Anniversary Memory Film" recipientName={templateData.partnerName} demoUrl="/anniversary" />

      <SectionShell id="anniversary-note" eyebrow="" title={templateData.finale.title}>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard>
            <p className="text-pretty text-sm leading-relaxed text-slate-700 sm:text-base">{templateData.finale.body}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  handleFinale();
                  scrollToSection("hero");
                }}
                className="w-full rounded-2xl bg-[#C17A6F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#A9655C] sm:w-auto"
              >
                {templateData.finale.ctaPrimary}
              </button>
            </div>
          </GlassCard>

          <div className="rounded-3xl border border-[#C17A6F]/18 bg-[#FFFAF9]/88 p-6 shadow-[0_24px_80px_rgba(134,72,63,0.10)] backdrop-blur-xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700/60">closing note</div>
            <div className="mt-2 text-lg font-semibold text-slate-950">Still home.</div>
            <div className="mt-2 text-sm leading-relaxed text-slate-700">
              Another year. Same us. More depth.
            </div>
          </div>
        </div>
      </SectionShell>

      <footer className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-5xl border-t border-[#C17A6F]/18 pt-8 text-center">
          <div className="text-xs font-medium text-[#8E5149]/80">{templateData.finale.footerLine}</div>
        </div>
      </footer>
      <style jsx global>{`
        .anniversary-romantic .ww-demo-sticky-cta {
          border-top-color: rgba(193, 122, 111, 0.28);
          background: rgba(139, 78, 70, 0.92);
        }
        .anniversary-romantic .ww-demo-sticky-cta button {
          background: linear-gradient(135deg, #c17a6f, #9f5f57) !important;
          box-shadow: 0 16px 45px rgba(193, 122, 111, 0.32) !important;
        }
      `}</style>
    </main>
  );
}
