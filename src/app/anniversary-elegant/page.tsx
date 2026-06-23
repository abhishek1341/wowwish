"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import AnniversaryNumberScoreboard from "@/components/wowwish/AnniversaryNumberScoreboard";
import { AnniversaryMiniFilmStrip, AnniversaryScenePhoto } from "@/components/wowwish/AnniversaryFilmPhotos";
import DemoStickyCTA from "@/components/wowwish/DemoStickyCTA";
import { DelightCTA, ScrollCTA } from "@/components/wowwish/treatments";
import { RevealHeading, cardFadeUp, borderDraw } from "@/components/wowwish/scrollReveal";
import { scrollToSection } from "@/lib/scrollToSection";
import photo1 from "./1.png";
import photo2 from "./2.png";
import photo3 from "./3.png";
import photo4 from "./4.png";
import photo5 from "./5.png";

const MUSIC_SRC = "/assets/anniversary-elegant-bg-music.mp3";
const MUSIC_VOLUME = 0.14;

type TemplateData = {
  partnerName: string;
  fromName: string;
  yearsTogetherLabel: string;
  hero: {
    eyebrow: string;
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
  life: {
    title: string;
    milestones: Array<{ title: string; when: string; body: string }>;
  };
  grateful: {
    title: string;
    cards: Array<{ title: string; body: string }>;
  };
  everyday: {
    title: string;
    chips: Array<{ label: string; note: string }>;
  };
  gratitudeReveal: {
    title: string;
    prompt: string;
    button: string;
    notes: Array<{ title: string; body: string }>;
  };
  wishes?: {
    title: string;
    items: Array<{ title: string; body: string }>;
  };
  promises: {
    title: string;
    items: Array<{ title: string; body: string }>;
  };
  letter: {
    title: string;
    paragraphs: string[];
    signoff: string;
  };
  finale: {
    title: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    footerLine: string;
  };
};

const templateData: TemplateData = {
  partnerName: "Nandini",
  fromName: "Abhi",
  yearsTogetherLabel: "5 years of marriage",

  hero: {
    eyebrow: "Another year of building life together",
    headlinePrefix: "Happy Anniversary,",
    subheadline: "Not every love is loud. Ours is steady, deep, and built for real life.",
    ctaPrimary: "Open our story",
    ctaSecondary: "Read this slowly",
  },

  photos: {
    title: "Our little world",
    subtitle: "Home, partnership, and the calm we return to — after long days.",
    items: [
      {
        label: "A celebration at our table",
        note: "",
        url: photo1.src,
      },
      {
        label: "Paris, and your laugh",
        note: "",
        url: photo2.src,
      },
      {
        label: "The city lights, and us",
        note: "",
        url: photo3.src,
      },
      {
        label: "Walking home to each other",
        note: "",
        url: photo4.src,
      },
      {
        label: "Making wishes, together",
        note: "",
        url: photo5.src,
      },
    ],
  },

  life: {
    title: "The chapters we built",
    milestones: [
      {
        title: "",
        when: "The first home",
        body: "We learned that home was not the walls. It was the way we started choosing calm after long days.",
      },
      {
        title: "",
        when: "A real decision",
        body: "There were days we had to pause, listen, and put respect before being right.",
      },
      {
        title: "",
        when: "A harder season",
        body: "We did not get everything right. But we stayed, tried again, and came back gentler.",
      },
      {
        title: "",
        when: "Family days",
        body: "We kept showing up for people, for responsibilities, and for the small duties love quietly asks for.",
      },
      {
        title: "",
        when: "Ordinary Sundays",
        body: "Chai, small chores, family calls, folded laundry — and us finding peace in between.",
      },
      {
        title: "",
        when: "Today",
        body: "Still not perfect. Still not finished. Still deeply ours.",
      },
    ],
  },

  grateful: {
    title: "What I’m grateful to you for",
    cards: [
      { title: "Your patience", body: "On days I was tired or difficult — you stayed kind." },
      { title: "Your respect", body: "Even in disagreements, you never make love feel unsafe." },
      { title: "Your care", body: "The quiet things you do without announcing." },
      { title: "How you show up", body: "In responsibilities. In family. In real life." },
      { title: "Your steadiness", body: "The calm you bring, without trying to." },
      { title: "Our home", body: "The simple safety we’ve built, together." },
    ],
  },

  everyday: {
    title: "The small things that hold us",
    chips: [
      { label: "morning chai", note: "before the day starts" },
      { label: "‘reached?’ ‘ate?’", note: "small check-ins" },
      { label: "the sabzi run", note: "weekend routine" },
      { label: "shared calendar", note: "life logistics" },
      { label: "evening debrief", note: "ten minutes, no phones" },
      { label: "lights-off talk", note: "soft honesty" },
    ],
  },

  gratitudeReveal: {
    title: "One quiet thank you",
    prompt: "Thank you for choosing patience on days when love was not easy.",
    button: "Open a note",
    notes: [
      {
        title: "In the middle of real life",
        body: "Thank you for staying kind in the middle of real life — deadlines, family, tired evenings. You don’t just love me; you take care of us.",
      },
      {
        title: "When I’m not at my best",
        body: "Thank you for choosing patience when I’m not easy to love. You soften the room, and I notice.",
      },
      {
        title: "For choosing partnership",
        body: "Thank you for choosing partnership over pride. It’s how our home became gentler — and how I learned to be gentler too.",
      },
    ],
  },

  promises: {
    title: "Promises for the years ahead",
    items: [
      { title: "I will choose patience", body: "On the days when we are both tired and the world feels heavy." },
      { title: "I will keep coming back", body: "Not just in love, but in conversation — to understand you better." },
      { title: "I will protect our peace", body: "The quiet we have built. The softness of our evenings." },
      { title: "I will celebrate you quietly", body: "Not just on anniversaries, but on ordinary Tuesdays." },
      { title: "I will grow alongside you", body: "Not ahead, not behind. Together, at our own pace." },
      { title: "I will say it out loud", body: "Even when gratitude feels too big for words, I will try." },
    ],
  },

  letter: {
    title: "A note for my wife",
    paragraphs: [
      "Happy anniversary, love.",
      "Another year of building life together — and I’m grateful for the steady way you love. The patience. The care. The quiet strength.",
      "Thank you for making our home feel safe. Thank you for being my partner in responsibilities and in joy. Here’s to the life we are building — slowly, honestly, together.",
    ],
    signoff: "— With gratitude, always",
  },

  finale: {
    title: "Here’s to the life we’re building",
    body: "Not loud. Not perfect. Just steady — and deeply ours.",
    ctaPrimary: "Replay our story",
    ctaSecondary: "One more year together",
    footerLine: "Made with love — for the partner who made life feel like home.",
  },
};

const ritualIcons: Record<string, string> = {
  "morning chai": "☕",
  "‘reached?’ ‘ate?’": "📱",
  "the sabzi run": "🛒",
  "shared calendar": "📅",
  "evening debrief": "🌆",
  "lights-off talk": "🌙",
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

function ElegantBackground() {
  const reducedMotion = useReducedMotionSafe();

  const blobs = useMemo(
    () =>
      [
        { id: "e1", className: "bg-[rgba(232,195,122,0.20)]", size: "h-80 w-80", x: "-left-24", y: "top-24", dur: 20 },
        { id: "e2", className: "bg-[rgba(214,166,200,0.18)]", size: "h-[28rem] w-[28rem]", x: "-right-28", y: "top-0", dur: 24 },
        { id: "e3", className: "bg-[rgba(190,154,106,0.14)]", size: "h-[30rem] w-[30rem]", x: "left-1/4", y: "-bottom-32", dur: 28 },
      ] as const,
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#F7F0E6]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F9F3EA] via-[#F7F0E6] to-[#EFE4D5]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_18%,rgba(184,154,106,0.32),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_46%,rgba(253,250,245,0.58),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_76%,rgba(184,154,106,0.24),transparent_62%)]" />
      <div className="absolute inset-0 opacity-[0.10] mix-blend-multiply [background-image:repeating-linear-gradient(0deg,rgba(15,23,42,0.020)_0px,rgba(15,23,42,0.020)_1px,transparent_2px,transparent_4px)]" />

      {reducedMotion
        ? null
        : blobs.map((b, i) => (
            <motion.div
              key={b.id}
              className={cn("absolute rounded-full blur-3xl", b.className, b.size, b.x, b.y)}
              initial={{ opacity: 0.55, x: 0, y: 0 }}
              animate={{ opacity: [0.42, 0.62, 0.42], x: [0, i % 2 === 0 ? 14 : -14, 0], y: [0, 10, 0] }}
              transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.70),transparent_55%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#F7F0E6] to-transparent" />
    </div>
  );
}

type Spark = { id: string; left: number; top: number; size: number; opacity: number; delay: number };

function SubtleSparkle({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotionSafe();

  const sparks = useMemo<Spark[]>(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: `sp_${i}_${Math.random().toString(16).slice(2)}`,
      left: (i * 19.1 + 8) % 100,
      top: 20 + ((i * 10.2) % 44),
      size: 2 + (i % 3),
      opacity: 0.18 + (i % 4) * 0.05,
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
            background: "rgba(232,195,122,0.85)",
            boxShadow: "0 0 18px rgba(232,195,122,0.22)",
          }}
          initial={{ y: 0, scale: 0.95, opacity: 0 }}
          animate={{ y: [0, -22, 0], scale: [0.95, 1.2, 0.95], opacity: [0, s.opacity, 0] }}
          transition={{ duration: 1.25, delay: s.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[#B89A6A]/22 bg-[#FDFAF5]/90 p-5 shadow-[0_26px_90px_rgba(118,88,48,0.10)] backdrop-blur-xl sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-4 pb-12 sm:px-6 sm:pb-16">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7"
        >
          {eyebrow ? <div className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-[#8D744F]/70">{eyebrow}</div> : null}
          <RevealHeading className="text-balance text-3xl font-semibold tracking-[0.02em] text-slate-950 sm:text-5xl" style={{ fontFamily: "var(--font-romantic)" }}>{title}</RevealHeading>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function pickNextIndex(current: number, total: number) {
  if (total <= 1) return 0;
  return (current + 1) % total;
}

function PromiseCards({ items }: { items: Array<{ title: string; body: string }> }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item, idx) => {
        const isFlipped = flipped.has(idx);
        return (
          <button
            key={item.title}
            type="button"
            onClick={() => toggle(idx)}
            className="relative h-[165px] cursor-pointer [perspective:1000px] sm:h-[185px]"
            aria-pressed={isFlipped}
          >
            <div
              className="relative h-full w-full transition-transform duration-700 will-change-transform [transform-style:preserve-3d]"
              style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-[24px] border border-[#B89A6A]/28 bg-[#F8F0E4] shadow-[0_18px_60px_rgba(118,88,48,0.10)] [backface-visibility:hidden]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(232,195,122,0.18),transparent_60%)]" />
                <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8D744F]/55">Promise</div>
                  <div className="text-4xl font-light text-[#B89A6A]" style={{ fontFamily: "var(--font-romantic)" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold text-[#8D744F]/45">tap to reveal</div>
                </div>
              </div>
              <div
                className="absolute inset-0 overflow-hidden rounded-[24px] border border-[#B89A6A]/28 bg-[#FDFAF5] p-5 text-left shadow-[0_18px_60px_rgba(118,88,48,0.10)] [backface-visibility:hidden]"
                style={{ WebkitFontSmoothing: "antialiased", transform: "rotateY(180deg) translateZ(1px)" }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B89A6A]">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-sm font-semibold leading-snug text-[#4B3A24]">{item.title}</div>
                <p className="mt-2 text-xs leading-relaxed text-[#7A5C30]/75">{item.body}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function AnniversaryElegantPage() {
  const [musicOn, setMusicOn] = useState(true);
  const [musicBlocked, setMusicBlocked] = useState(false);
  const [musicNeedsUnmute, setMusicNeedsUnmute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [noteIndex, setNoteIndex] = useState(0);
  const [noteOpen, setNoteOpen] = useState(false);
  const [quietLetterOpen, setQuietLetterOpen] = useState(false);

  const [sparkleOn, setSparkleOn] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ritualRowRef = useRef<HTMLDivElement | null>(null);
  const ritualNudgeStartedRef = useRef(false);

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
    const row = ritualRowRef.current;
    if (!row) return;

    let nudgeTimer: number | undefined;
    let resetTimer: number | undefined;
    let restoreTimer: number | undefined;

    const runNudge = () => {
      if (ritualNudgeStartedRef.current) return;
      ritualNudgeStartedRef.current = true;

      nudgeTimer = window.setTimeout(() => {
      if (row.scrollWidth <= row.clientWidth) return;
      row.style.scrollSnapType = "none";
      row.scrollTo({ left: 30, behavior: "smooth" });
      }, 150);

      resetTimer = window.setTimeout(() => {
        row.style.scrollSnapType = "none";
        row.scrollTo({ left: 0, behavior: "smooth" });
        restoreTimer = window.setTimeout(() => {
        row.scrollLeft = 0;
        row.style.scrollSnapType = "";
        }, 450);
      }, 1650);
    };

    if (!("IntersectionObserver" in window)) {
      runNudge();
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          runNudge();
          observer.disconnect();
        },
        { threshold: 0.35 },
      );

      observer.observe(row);

      return () => {
        observer.disconnect();
        if (nudgeTimer) window.clearTimeout(nudgeTimer);
        if (resetTimer) window.clearTimeout(resetTimer);
        if (restoreTimer) window.clearTimeout(restoreTimer);
      };
    }

    return () => {
      if (nudgeTimer) window.clearTimeout(nudgeTimer);
      if (resetTimer) window.clearTimeout(resetTimer);
      if (restoreTimer) window.clearTimeout(restoreTimer);
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

  const handleTuneButton = () => {
    setMusicOn((prev) => !prev);
  };

  const openNextThankYou = () => {
    setNoteOpen(true);
    setNoteIndex((idx) => pickNextIndex(idx, templateData.gratitudeReveal.notes.length));
  };

  const current = templateData.gratitudeReveal.notes[noteIndex] ?? templateData.gratitudeReveal.notes[0];

  const triggerSparkle = () => {
    setSparkleOn(true);
    window.setTimeout(() => setSparkleOn(false), 1300);
  };

  return (
    <main className="anniversary-elegant-theme relative min-h-screen overflow-hidden bg-[#F7F0E6] text-slate-950 tracking-[0.02em]">
      <ElegantBackground />
      <SubtleSparkle active={sparkleOn} />

      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" playsInline />

      <motion.button
        type="button"
        onClick={handleTuneButton}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "ww-music-button fixed bottom-4 right-4 z-30 inline-flex items-center justify-center rounded-full border border-[#B89A6A]/32 bg-[#FDFAF5]/86 px-4 py-2 text-xs font-semibold shadow-[0_18px_60px_rgba(184,154,106,0.16)] backdrop-blur-xl transition",
          musicOn ? "text-[#8D744F]" : "text-[#8D744F]/72",
        )}
        aria-pressed={musicOn}
        aria-label={musicOn ? "Music On" : "Music Off"}
      >
        <span aria-hidden>{musicOn ? "Music On" : "Music Off"}</span>
      </motion.button>

      <section id="hero" className="relative px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-xs font-semibold tracking-wide text-slate-700/70">{templateData.hero.eyebrow}</div>
              <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.02] tracking-[0.02em] text-slate-950 sm:text-7xl" style={{ fontFamily: "var(--font-romantic)" }}>
                {templateData.hero.headlinePrefix}{" "}
                <span className="bg-gradient-to-r from-[#8D744F] via-[#B89A6A] to-[#C9B28A] bg-clip-text text-transparent">
                  {templateData.partnerName}
                </span>
                <span className="text-slate-950">.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-700 sm:text-lg">
                {templateData.hero.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ScrollCTA
                  scrollTargetId="story"
                  className="rounded-2xl bg-[#B89A6A] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(184,154,106,0.24)] transition hover:bg-[#9D8156]"
                >
                  {templateData.hero.ctaPrimary}
                </ScrollCTA>
                <ScrollCTA
                  scrollTargetId="quiet-letter"
                  className="rounded-2xl border border-[#B89A6A]/24 bg-[#FDFAF5]/80 px-5 py-3 text-sm font-semibold text-[#8D744F] transition hover:bg-[#FDFAF5]"
                >
                  {templateData.hero.ctaSecondary}
                </ScrollCTA>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(232,195,122,0.22),transparent_55%)] rounded-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(184,154,106,0.14),transparent_55%)] rounded-3xl pointer-events-none" />
                
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#B89A6A]/30 bg-[#F8F0E4] px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B89A6A]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#8D744F]/80">Quick recap</span>
                  </div>

                  <div className="mt-3 text-2xl font-semibold tracking-tight text-slate-950" style={{ fontFamily: "var(--font-romantic)" }}>
                    {templateData.yearsTogetherLabel}
                  </div>

                  <div className="mt-1 text-sm leading-relaxed text-slate-600">
                    Partnership is love — and also patience.
                  </div>

                  <div className="my-4 h-px bg-gradient-to-r from-[#B89A6A]/30 via-[#B89A6A]/60 to-transparent" />

                  <div className="grid grid-cols-2 gap-2">
                    {["STEADY", "CHOSEN", "ROOTED", "PRESENT"].map((t) => (
                      <div
                        key={t}
                        className="rounded-2xl border border-[#B89A6A]/24 bg-gradient-to-br from-[#FDFAF5] to-[#F8F0E4] px-3 py-3 text-center text-[11px] font-semibold tracking-[0.14em] text-[#705A39] shadow-[0_4px_14px_rgba(184,154,106,0.10)]"
                      >
                        {t}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#B89A6A]/20 bg-[#F8F0E4]/60 px-4 py-3 text-center text-xs font-semibold italic text-[#8D744F]/75">
                    &ldquo;Steady love, chosen every day.&rdquo;
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 rounded-3xl border border-[#B89A6A]/24 bg-[#FDFAF5]/86 px-5 py-4 text-sm font-semibold text-[#705A39] shadow-[0_18px_60px_rgba(118,88,48,0.08)]"
          >
            Another year of building — not only memories, but a HOME <span className="text-[#705A39] text-lg">♥.</span>
          </motion.div>
        </div>
      </section>

      <section id="story" className="scroll-mt-24">
        <AnniversaryScenePhoto photo={templateData.photos.items[0]} sceneLabel="A MOMENT WE KEEP" desktopMaxWidthClassName="lg:max-w-[420px]" />
      </section>

      <Section id="life" eyebrow="" title={templateData.life.title}>
        <div className="space-y-4">
          {templateData.life.milestones.map((m, idx) => (
            <motion.div
              key={`${m.title}_${idx}`}
              variants={cardFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-[#B89A6A]/20 bg-[#FDFAF5]/88 p-5 shadow-[0_18px_70px_rgba(118,88,48,0.08)] sm:p-7">
                <motion.div className="absolute bottom-5 left-0 top-5 w-1 origin-top rounded-r-full bg-[#B89A6A]" variants={borderDraw} />
                <div className="pl-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8D744F]/65">{m.when}</div>
                  <p className="mt-3 text-pretty text-base leading-8 text-[#4B3A24] sm:text-lg" style={{ fontFamily: "var(--font-romantic)" }}>
                    {m.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <AnniversaryScenePhoto photo={templateData.photos.items[1]} sceneLabel="SOMEWHERE NEW, SAME US" desktopMaxWidthClassName="lg:max-w-[420px]" />

      <Section id="promises" eyebrow="for the years ahead" title={templateData.promises.title}>
        <PromiseCards items={templateData.promises.items} />
      </Section>

      <AnniversaryMiniFilmStrip photos={[templateData.photos.items[2], templateData.photos.items[3]]} />

      <Section id="everyday" eyebrow="" title={templateData.everyday.title}>
        <div className="relative -mx-4 sm:mx-0 after:pointer-events-none after:absolute after:bottom-0 after:right-0 after:top-0 after:w-10 after:bg-gradient-to-l after:from-[#F7F0E6] after:to-transparent">
          <div
            ref={ritualRowRef}
            className="flex gap-2.5 overflow-x-auto px-4 pb-4 pt-2 [scroll-padding-left:16px] [scroll-snap-type:x_mandatory] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
          >
            {templateData.everyday.chips.map((c) => (
              <div
                key={c.label}
                className="shrink-0 snap-start whitespace-nowrap rounded-full border border-[#B89A6A] bg-[#FDFAF5] px-5 py-2.5 text-[13px] font-semibold text-[#7A5C30] shadow-[0_12px_36px_rgba(118,88,48,0.06)]"
              >
                <span className="mr-2" aria-hidden>{ritualIcons[c.label] ?? "♡"}</span>
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <AnniversaryScenePhoto photo={templateData.photos.items[4]} sceneLabel="A DAY WE STILL KEEP" desktopMaxWidthClassName="lg:max-w-[420px]" />

      <Section id="scoreboard" eyebrow="" title="A year in our numbers">
        <AnniversaryNumberScoreboard
          accentColor="#B89A6A"
          cardBackground="rgba(253, 250, 245, 0.94)"
          borderColor="rgba(184, 154, 106, 0.28)"
          yearsValue={7}
          daysValue={2225}
          citiesValue={6}
          photosValue={500}
        />
      </Section>

      <section id="quiet-letter" className="relative flex min-h-screen scroll-mt-24 items-center justify-center py-20" style={{ paddingLeft: 16, paddingRight: 16, overflow: "hidden" }}>
        <div aria-hidden className="absolute inset-0 bg-[#F7F0E6]" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(184,154,106,0.20),transparent_58%)]" />
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto box-border w-full max-w-3xl overflow-hidden text-center"
        >
          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8D744F]/70">For your eyes only</div>
          <motion.button
            type="button"
            onClick={() => {
              setQuietLetterOpen(true);
              triggerSparkle();
            }}
            whileTap={{ scale: 0.985 }}
            className="mx-auto block box-border w-full max-w-full overflow-hidden rounded-[34px] border border-[#B89A6A]/28 bg-[#FDFAF5] p-4 text-left shadow-[0_30px_100px_rgba(118,88,48,0.14)]"
            aria-expanded={quietLetterOpen}
          >
            <motion.div
              className="relative box-border max-w-full overflow-hidden rounded-[28px] border border-[#B89A6A]/22 bg-[#F8F0E4]"
              animate={quietLetterOpen ? { minHeight: 560 } : { minHeight: 280 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1/2 origin-top bg-[#E9DDC8]"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                animate={quietLetterOpen ? { rotateX: 178, opacity: 0.42 } : { rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="relative z-10 mx-auto box-border max-w-2xl break-words px-5 py-6 sm:px-10 sm:py-12"
                animate={quietLetterOpen ? { y: 0, opacity: 1 } : { y: 52, opacity: 0.92 }}
                transition={{ duration: 0.7, delay: quietLetterOpen ? 0.18 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                {!quietLetterOpen ? (
                  <div className="flex min-h-[210px] flex-col items-center justify-center text-center">
                    <div className="text-4xl font-semibold tracking-[0.02em] text-[#705A39]" style={{ fontFamily: "var(--font-romantic)" }}>
                      A quiet letter
                    </div>
                    <div className="mt-3 text-sm font-semibold text-[#8D744F]/75">Tap to unfold what I would keep private.</div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                    className="font-letter space-y-5 break-words text-left text-[15px] font-normal leading-[1.9] text-[#3d2b1f]"
                  >
                    <p>There are things that don&apos;t need a grand occasion—only a quiet moment and the courage to say them properly.</p>
                    <p>Thank you for making ordinary life feel steady. For the small routines, the patient conversations, and the way you make home feel less like a place and more like a person.</p>
                    <p>I know marriage is not made only of beautiful days. It is also made of tired evenings, decisions, apologies, and the choice to return to each other with softness.</p>
                    <p>And still, after everything we have lived, I would choose this life with you again. Not because it is perfect, but because it is ours.</p>
                    <p className="font-letter pt-2 text-base font-normal italic text-[#5c3d1e]">With all my love,<br />{templateData.fromName}</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.button>

        </motion.div>
      </section>

      <DemoStickyCTA occasion="Anniversary" templateName="Anniversary Floral Luxe" recipientName={templateData.partnerName} demoUrl="/anniversary-elegant" />

      <Section id="finale" eyebrow="" title={templateData.finale.title}>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <p className="text-pretty text-sm leading-relaxed text-slate-700 sm:text-base">{templateData.finale.body}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  triggerSparkle();
                  scrollToSection("hero");
                }}
                className="w-full rounded-2xl bg-[#B89A6A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9D8156] sm:w-auto"
              >
                {templateData.finale.ctaPrimary}
              </button>
              <DelightCTA
                message="One more year, still choosing you."
                glyphs={["✨", "♥", "✦", "💫", "♡"]}
                className="w-full rounded-2xl border border-[#B89A6A]/24 bg-[#FDFAF5]/86 px-5 py-3 text-sm font-semibold text-[#8D744F] transition hover:bg-[#FDFAF5] sm:w-auto"
              >
                {templateData.finale.ctaSecondary}
              </DelightCTA>
            </div>
          </Card>

          <div className="rounded-3xl border border-[#B89A6A]/24 bg-[#FDFAF5]/86 p-6 shadow-[0_24px_80px_rgba(118,88,48,0.10)] backdrop-blur-xl">
            <div className="text-xs font-semibold tracking-wide text-slate-700/70"> </div>
            <div className="mt-2 text-lg font-semibold text-slate-950">Another year.</div>
            <div className="mt-2 text-sm leading-relaxed text-slate-700">Another day of choosing — softly, together.</div>
          </div>
        </div>
      </Section>

      <footer className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl border-t border-[#B89A6A]/24 pt-8 text-center">
          <div className="text-xs font-medium text-[#8D744F]/82">{templateData.finale.footerLine}</div>
        </div>
      </footer>
      <style jsx global>{`
        .anniversary-elegant-theme .ww-demo-sticky-cta {
          border-top-color: rgba(184, 154, 106, 0.34);
          background: rgba(112, 90, 57, 0.92);
        }
        .anniversary-elegant-theme .ww-demo-sticky-cta button {
          background: linear-gradient(135deg, #b89a6a, #8d744f) !important;
          box-shadow: 0 16px 45px rgba(184, 154, 106, 0.32) !important;
        }
      `}</style>
    </main>
  );
}
