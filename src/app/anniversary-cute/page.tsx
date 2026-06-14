"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import AnniversaryNumberScoreboard from "@/components/wowwish/AnniversaryNumberScoreboard";
import { AnniversaryMiniFilmStrip, AnniversaryScenePhoto } from "@/components/wowwish/AnniversaryFilmPhotos";
import DemoStickyCTA from "@/components/wowwish/DemoStickyCTA";
import { RevealHeading, cardFadeUp, borderDraw } from "@/components/wowwish/scrollReveal";
import photo1 from "./1.png";
import photo2 from "./2.png";
import photo3 from "./3.png";
import photo4 from "./4.png";
import photo5 from "./5.png";

const MUSIC_SRC = "/assets/anniversary-cute-bg-music.mp3";
const MUSIC_VOLUME = 0.16;

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
    items: Array<{ label: string; url: string }>;
  };
  reasons: {
    title: string;
    cards: Array<{ title: string; body: string }>;
  };
  timeline: {
    title: string;
    items: Array<{ title: string; tag: string; body: string }>;
  };
  loveLanguage: {
    title: string;
    chips: Array<{ emoji: string; label: string }>;
  };
  surprise: {
    title: string;
    prompt: string;
    button: string;
    reveals: Array<{ title: string; body: string }>;
  };
  wishes: {
    title: string;
    chips: string[];
  };
  note: {
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
  partnerName: "Anjali",
  fromName: "Abhi",
  yearsTogetherLabel: "4 years",

  hero: {
    eyebrow: "cute chaos • soft love",
    headlinePrefix: "Happy Anniversary,",
    subheadline:
      "One more year of our cute chaos. We tease, we fight, we order food, we fix it — and somehow you’re still my favorite person.",
    ctaPrimary: "Start the cute chaos",
    ctaSecondary: "Open our little story",
  },

  photos: {
    title: "Receipts",
    subtitle: "Evidence that we’re weird, cute, and still us.",
    items: [
      {
        label: "Every place feels better with you",
        url: photo1.src,
      },
      {
        label: "You, me, and our kind of date",
        url: photo2.src,
      },
      {
        label: "Still laughing at life with you",
        url: photo3.src,
      },
      {
        label: "My favorite place is next to you",
        url: photo4.src,
      },
      {
        label: "Another year, still my favorite person",
        url: photo5.src,
      },
    ],
  },

  reasons: {
    title: "Why I’m obsessed (respectfully)",
    cards: [
      { title: "You make boring days cute", body: "Somehow even errands become a date with you." },
      { title: "You tolerate my drama", body: "Not always happily… but you stay. Respect." },
      { title: "You’re my comfort person", body: "One hug and my brain stops buffering." },
      { title: "You know my food mood", body: "You can tell if I need biryani or momos. Soulmate behaviour." },
      { title: "You annoy me, but nicely", body: "Premium irritation. Would subscribe again." },
      { title: "You choose us", body: "Even after the fights, you still come back softer." },
    ],
  },

  timeline: {
    title: "Our highlight reel (messy cut)",
    items: [
      { title: "First proper date", tag: "nervous + cute", body: "We acted chill. We were not chill." },
      { title: "First silly fight", tag: "small drama", body: "We learned: tone matters. Also hugs matter more." },
      { title: "First long call", tag: "late-night", body: "One call turned into a routine. Now you’re my favorite notification." },
      { title: "Random food plan", tag: "always hungry", body: "‘Bas ek bite’ — biggest lie we both tell." },
      { title: "That trip/day out", tag: "us outside", body: "New place, same comfort. More photos, more teasing." },
      { title: "Today", tag: "same us", body: "Same madness. More love. Better teamwork." },
    ],
  },

  loveLanguage: {
    title: "Our love language (unserious)",
    chips: [
      { emoji: "🍟", label: "food" },
      { emoji: "📞", label: "random calls" },
      { emoji: "😤", label: "sorry-but-not-sorry" },
      { emoji: "🤭", label: "teasing" },
      { emoji: "🫂", label: "hugs" },
      { emoji: "📸", label: "screenshots" },
      { emoji: "📲", label: "shared reels" },
      { emoji: "🫶", label: "choosing each other" },
    ],
  },

  surprise: {
    title: "A tiny ‘text I didn’t send’",
    prompt: "Tap for one unsent message (no screenshots pls)",
    button: "Open the text",
    reveals: [
      { title: "Okay listen…", body: "Even after all the drama, I’d still choose you." },
      { title: "Confession", body: "You’re still my favorite person to annoy." },
      { title: "Verified", body: "Same you. Same me. Better us." },
      { title: "Sachi", body: "Life feels lighter when you’re on my side." },
      { title: "Final answer", body: "I love you — loudly in my head, softly in real life." },
    ],
  },

  wishes: {
    title: "Wishes (chaos edition)",
    chips: [
      "more food dates",
      "fewer fights (maybe)",
      "more trips",
      "more hugs",
      "more random calls",
      "more selfies",
      "more us",
      "more calm after chaos",
    ],
  },

  note: {
    title: "Okay but real quick…",
    paragraphs: [
      "I act cool but you’re genuinely my favorite part of the day.",
      "Thank you for staying, laughing, fighting, fixing, and choosing us — again and again.",
      "Happy anniversary, cutie. Same madness. More love.",
    ],
    signoff: "— Your Love, always",
  },

  finale: {
    title: "Still together. Still cute.",
    body: "Another year of us being dramatic, cute, and weirdly perfect.",
    ctaPrimary: "Replay our chaos",
    ctaSecondary: "One more hug",
    footerLine: "Made for you — with teasing, love, and snacks.",
  },
};

const cuteWishIcons: Record<string, string> = {
  "more food dates": "🍕",
  "fewer fights (maybe)": "🤞",
  "more trips": "✈️",
  "more hugs": "🤗",
  "more random calls": "📞",
  "more selfies": "📸",
  "more us": "🫶",
  "more calm after chaos": "🌿",
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

type FloatingBit = {
  id: string;
  leftPct: number;
  topPct: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  kind: "dot" | "heart";
  color: string;
};

function CuteAmbient() {
  const reducedMotion = useReducedMotionSafe();

  const bits = useMemo<FloatingBit[]>(() => {
    const colors = [
      "rgba(251,191,36,0.22)",
      "rgba(244,114,182,0.22)",
      "rgba(167,139,250,0.20)",
      "rgba(253,186,116,0.22)",
      "rgba(148,163,184,0.18)",
    ];

    const kinds: FloatingBit["kind"][] = ["dot", "dot", "dot", "heart", "dot", "dot", "heart"];

    return Array.from({ length: 16 }).map((_, i) => {
      const kind = kinds[i % kinds.length];
      const size = kind === "heart" ? 18 + (i % 3) * 6 : 10 + (i % 5) * 5;

      return {
        id: `amb_${i}_${Math.random().toString(16).slice(2)}`,
        leftPct: (i * 12.2 + 7) % 100,
        topPct: (i * 14.6 + 9) % 100,
        size,
        opacity: kind === "heart" ? 0.14 : 0.18,
        duration: 18 + (i % 6) * 3,
        delay: (i % 8) * 0.35,
        drift: (i % 2 ? 1 : -1) * (16 + (i % 4) * 10),
        kind,
        color: colors[i % colors.length],
      };
    });
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((b) => {
        const common = {
          left: `${b.leftPct}%`,
          top: `${b.topPct}%`,
          opacity: b.opacity,
        } as const;

        const el =
          b.kind === "heart" ? (
            <span
              className="block"
              style={{
                width: b.size,
                height: b.size,
                background: b.color,
                clipPath:
                  "path('M8.5 3.1c-1.9-1.7-5-.8-5.5 1.8-.4 2.2 1.5 3.8 3 5.1l2.5 2.1 2.5-2.1c1.5-1.3 3.4-2.9 3-5.1-.5-2.6-3.6-3.5-5.5-1.8l-.8.7-.7-.7Z')",
                filter: "blur(0.2px)",
              }}
            />
          ) : (
            <span className="block rounded-full" style={{ width: b.size, height: b.size, background: b.color }} />
          );

        return (
          <motion.div
            key={b.id}
            className="absolute"
            style={common}
            initial={{ y: 120, x: 0, rotate: (b.leftPct * 3.6) % 360 }}
            animate={{ y: [-40, -980], x: [0, b.drift, 0], rotate: [0, 18] }}
            transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {el}
          </motion.div>
        );
      })}
    </div>
  );
}

function CuteBackground() {
  const reducedMotion = useReducedMotionSafe();

  const blobs = useMemo(
    () =>
      [
        { id: "cb1", className: "bg-[rgba(253,186,116,0.28)]", size: "h-80 w-80", x: "-left-20", y: "top-24", dur: 18 },
        { id: "cb2", className: "bg-[rgba(244,114,182,0.22)]", size: "h-[26rem] w-[26rem]", x: "-right-24", y: "top-8", dur: 22 },
        { id: "cb3", className: "bg-[rgba(167,139,250,0.22)]", size: "h-[28rem] w-[28rem]", x: "left-1/4", y: "-bottom-28", dur: 26 },
      ] as const,
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#FFF4EE]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4EE] via-[#FFF8F3] to-[#FFF4EE]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(244,132,95,0.24),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(244,168,150,0.30),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_75%,rgba(255,255,255,0.56),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.12] mix-blend-multiply [background-image:repeating-linear-gradient(0deg,rgba(15,23,42,0.020)_0px,rgba(15,23,42,0.020)_1px,transparent_2px,transparent_4px)]" />

      {reducedMotion
        ? null
        : blobs.map((b, i) => (
            <motion.div
              key={b.id}
              className={cn("absolute rounded-full blur-3xl", b.className, b.size, b.x, b.y)}
              initial={{ opacity: 0.55, x: 0, y: 0 }}
              animate={{ opacity: [0.45, 0.62, 0.45], x: [0, i % 2 === 0 ? 14 : -14, 0], y: [0, 10, 0] }}
              transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
    </div>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-[#F4A896] bg-white p-5 shadow-[0_22px_72px_rgba(244,132,95,0.12)] backdrop-blur-xl sm:p-7",
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
    <section id={id} className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7"
        >
          {eyebrow ? <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C45C35]/70">{eyebrow}</div> : null}
          {title ? (
            <RevealHeading className="flex items-center gap-3 text-balance text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl" style={{ fontFamily: "var(--font-warm)" }}>
              <span aria-hidden className="h-3 w-3 rounded-full bg-[#F4845F] shadow-[0_0_20px_rgba(244,132,95,0.45)]" />
              {title}
            </RevealHeading>
          ) : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

type BurstDot = { id: string; left: number; top: number; size: number; opacity: number; delay: number; color: string };

function HeartConfettiBurst({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotionSafe();

  const dots = useMemo<BurstDot[]>(() => {
    const colors = [
      "rgba(244,114,182,0.85)",
      "rgba(253,186,116,0.85)",
      "rgba(167,139,250,0.85)",
      "rgba(251,191,36,0.80)",
    ];

    return Array.from({ length: 22 }).map((_, i) => ({
      id: `bd_${i}_${Math.random().toString(16).slice(2)}`,
      left: (i * 17.2 + 8) % 100,
      top: 18 + ((i * 9.4) % 48),
      size: 2 + (i % 4),
      opacity: 0.25 + (i % 4) * 0.06,
      delay: (i % 10) * 0.02,
      color: colors[i % colors.length],
    }));
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            background: d.color,
            boxShadow: `0 0 18px ${d.color}`,
          }}
          initial={{ y: 0, scale: 0.9, opacity: 0 }}
          animate={{ y: [0, -26, 0], scale: [0.95, 1.25, 0.95], opacity: [0, d.opacity, 0] }}
          transition={{ duration: 1.25, delay: d.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

function pickNextIndex(current: number, total: number) {
  if (total <= 1) return 0;
  return (current + 1) % total;
}

const confessionChips = [
  "I replay our voice notes when you're offline and pretend you called.",
  "Your contact name in my phone has three hearts. Don't ask me to change it.",
  "I already know what food I want. I ask you so we can decide together.",
  "I check your location even when I know you're safe. Just because.",
  "You annoy me and I love it. That's the whole confession.",
];

function SealedLetter({ paragraphs, signoff }: { paragraphs: string[]; signoff: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto max-w-2xl">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "w-full overflow-hidden rounded-[32px] border border-orange-200/60 bg-white p-4 shadow-[0_22px_70px_rgba(251,146,60,0.12)] transition",
          open ? "cursor-default" : "hover:shadow-[0_28px_80px_rgba(251,146,60,0.18)]"
        )}
        aria-expanded={open}
      >
        <motion.div
          className="relative overflow-hidden rounded-[26px] border border-orange-100 bg-[#FFF8F5]"
          animate={open ? { minHeight: 480 } : { minHeight: 220 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2 bg-[#FFE8DC]"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            animate={open ? { rotateX: 178, opacity: 0.4 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="relative z-10 px-6 py-8 sm:px-10 sm:py-12"
            animate={open ? { y: 0, opacity: 1 } : { y: 36, opacity: 0.9 }}
            transition={{ duration: 0.65, delay: open ? 0.15 : 0 }}
          >
            {!open ? (
              <div className="flex min-h-[160px] flex-col items-center justify-center gap-3 text-center">
                <div className="text-3xl">💌</div>
                <div className="text-xl font-black text-slate-900">A letter for you</div>
                <div className="text-sm font-semibold text-orange-400">tap to unseal</div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-letter space-y-4 text-left text-[15px] font-normal italic leading-[1.85] text-gray-700"
              >
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                <p className="font-sign pt-3 text-lg text-orange-500">{signoff}</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </button>
    </div>
  );
}

export default function AnniversaryCutePage() {
  const [musicOn, setMusicOn] = useState(true);
  const [musicBlocked, setMusicBlocked] = useState(false);
  const [musicNeedsUnmute, setMusicNeedsUnmute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [revealIndex, setRevealIndex] = useState(0);
  const [revealOpen, setRevealOpen] = useState(false);
  const [openedConfessions, setOpenedConfessions] = useState<number[]>([]);

  const [burstOn, setBurstOn] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const attemptPlayBestEffort = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = MUSIC_VOLUME;
    audio.loop = true;

    try {
      audio.muted = true;
      await audio.play();
      setMusicBlocked(false);
      setMusicNeedsUnmute(true);
    } catch {
      try {
        audio.muted = false;
        await audio.play();
        setMusicBlocked(false);
        setMusicNeedsUnmute(false);
      } catch {
        setMusicBlocked(true);
        setMusicNeedsUnmute(false);
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

  useEffect(() => {
    if (!musicOn || (!musicBlocked && !musicNeedsUnmute)) return;
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const onFirstUserGesture = async () => {
      try {
        if (audio.paused) {
          audio.muted = false;
          await audio.play();
        } else {
          audio.muted = false;
        }
        setMusicBlocked(false);
        setMusicNeedsUnmute(false);
      } catch {
        setMusicBlocked(true);
        setMusicNeedsUnmute(false);
      }
    };

    window.addEventListener("pointerdown", onFirstUserGesture, { once: true });
    window.addEventListener("wheel", onFirstUserGesture, { once: true, passive: true } as AddEventListenerOptions);
    window.addEventListener("scroll", onFirstUserGesture, { once: true, passive: true } as AddEventListenerOptions);
    window.addEventListener("touchstart", onFirstUserGesture, { once: true, passive: true } as AddEventListenerOptions);
    window.addEventListener("touchmove", onFirstUserGesture, { once: true, passive: true } as AddEventListenerOptions);
    window.addEventListener("keydown", onFirstUserGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstUserGesture);
      window.removeEventListener("wheel", onFirstUserGesture);
      window.removeEventListener("scroll", onFirstUserGesture);
      window.removeEventListener("touchstart", onFirstUserGesture);
      window.removeEventListener("touchmove", onFirstUserGesture);
      window.removeEventListener("keydown", onFirstUserGesture);
    };
  }, [musicOn, musicBlocked, musicNeedsUnmute]);

  const handleVibeButton = () => {
    if (!musicOn) {
      setMusicOn(true);
      void attemptPlayBestEffort();
      return;
    }

    setMusicOn(false);
  };

  const openReveal = () => {
    setRevealOpen(true);
    setRevealIndex((idx) => pickNextIndex(idx, templateData.surprise.reveals.length));
  };

  const triggerBurst = () => {
    setBurstOn(true);
    window.setTimeout(() => setBurstOn(false), 1400);
  };

  const toggleConfession = (idx: number) => {
    setOpenedConfessions((current) => (current.includes(idx) ? current : [...current, idx]));
  };

  const allConfessionsOpen = openedConfessions.length === confessionChips.length;

  return (
    <main className="anniversary-cute-theme relative min-h-screen overflow-hidden bg-[#FFF4EE] text-slate-950">
      <CuteBackground />
      <CuteAmbient />
      <HeartConfettiBurst active={burstOn} />

      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" autoPlay muted playsInline />

      <motion.button
        type="button"
        onClick={handleVibeButton}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "ww-music-button fixed bottom-4 right-4 z-30 inline-flex items-center justify-center rounded-full border border-[#F4A896] bg-white px-4 py-2 text-xs font-bold shadow-[0_18px_60px_rgba(244,132,95,0.16)] backdrop-blur-xl transition",
          musicOn ? "text-[#F4845F]" : "text-[#F4845F]/72",
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
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl">
                {templateData.hero.headlinePrefix}{" "}
                <span className="bg-gradient-to-r from-pink-500 via-violet-500 to-amber-500 bg-clip-text text-transparent">
                  {templateData.partnerName}
                </span>
                <span className="text-slate-950">!</span>
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-700 sm:text-lg">
                {templateData.hero.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => document.getElementById("photos")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-[20px] bg-[#F4845F] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_60px_rgba(244,132,95,0.24)] transition hover:bg-[#E66F4D]"
                >
                  {templateData.hero.ctaPrimary}
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById("surprise")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-[20px] border border-[#F4A896] bg-white px-5 py-3 text-sm font-bold text-[#C85C41] transition hover:bg-[#FFF8F3]"
                >
                  {templateData.hero.ctaSecondary}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.13),transparent_60%)] rounded-3xl" />
                <div className="relative">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400/70">Quick recap</div>
                  <div className="mt-2 text-2xl font-black tracking-tight text-slate-950">Cute. Flirty. Ours.</div>
                  <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200/60 px-3 py-1">
                    <span className="text-orange-400 text-sm">♥</span>
                    <span className="text-xs font-bold text-orange-500">{templateData.yearsTogetherLabel}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">Our love language: teasing + food + random calls.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["🍕 food dates", "🤫 inside jokes", "😤 cute fights", "🤝 patch-ups"].map((t) => (
                      <div key={t} className="rounded-full border border-orange-200/70 bg-gradient-to-br from-orange-50 to-rose-50 px-3 py-1.5 text-xs font-bold text-orange-500 shadow-sm">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <AnniversaryScenePhoto photo={templateData.photos.items[0]} sceneLabel="A MOMENT WE KEEP" desktopMaxWidthClassName="lg:max-w-[420px]" />

      <Section id="timeline" title={templateData.timeline.title}>
        <div className="space-y-3">
          {templateData.timeline.items.map((t, idx) => (
            <motion.div
              key={`${t.title}_${idx}`}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-5 shadow-[0_8px_30px_rgba(251,146,60,0.08)]"
            >
              <div className="absolute bottom-4 left-0 top-4 w-[3px] rounded-r-full bg-gradient-to-b from-orange-300 to-rose-300" />
              <div className="pl-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400">{t.tag}</div>
                <div className="mt-1.5 text-base font-black text-slate-900">{t.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{t.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <AnniversaryScenePhoto photo={templateData.photos.items[1]} sceneLabel="SOMEWHERE NEW, SAME US" desktopMaxWidthClassName="lg:max-w-[420px]" />

      <Section id="confessions-jar" title="Confessions jar">
        <Card className="bg-white">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 18, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[280px]"
            >
              <div className="text-center text-xs font-bold uppercase tracking-[0.16em] text-[#C85C41]/75">Things I&apos;d never admit IRL</div>
              <div className="relative mt-5 h-72">
                <div className="absolute left-1/2 top-2 h-8 w-40 -translate-x-1/2 rounded-full border border-[#F4A896] bg-[#FFF4EE]" />
                <div className="absolute bottom-0 left-1/2 h-60 w-56 -translate-x-1/2 rounded-b-[54px] rounded-t-[28px] border-2 border-[#F4A896] bg-gradient-to-b from-white/78 to-[#FFF4EE]/88 shadow-[0_24px_80px_rgba(244,132,95,0.16)]" />
                <div className="absolute bottom-6 left-1/2 h-44 w-48 -translate-x-1/2 rounded-b-[44px] rounded-t-[22px] bg-[#F4845F]/8" />
                {confessionChips.map((_, idx) => (
                  <motion.button
                    key={idx}
                    type="button"
                    onClick={() => toggleConfession(idx)}
                    whileTap={{ scale: [1, 0.95, 1.05, 1], rotate: idx % 2 ? 4 : -4 }}
                    animate={openedConfessions.includes(idx) ? { y: -10, rotate: idx % 2 ? 8 : -8, scale: 1.06 } : { y: 0, rotate: idx % 2 ? 5 : -5, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cn(
                      "absolute rounded-xl border px-4 py-3 text-xs font-black shadow-[0_12px_30px_rgba(244,132,95,0.16)]",
                      openedConfessions.includes(idx) ? "border-[#F4845F] bg-[#FFE8D6] text-[#C45C35]" : "border-[#F4A896] bg-white text-[#C85C41]",
                    )}
                    style={{
                      left: `${18 + (idx % 3) * 25}%`,
                      top: `${40 + Math.floor(idx / 3) * 22 + (idx % 2) * 4}%`,
                    }}
                    aria-expanded={openedConfessions.includes(idx)}
                  >
                    {openedConfessions.includes(idx) ? "read" : "tap me"}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-3">
              {confessionChips.map((confession, idx) => {
                const isOpen = openedConfessions.includes(idx);
                return (
                  <motion.button
                    key={confession}
                    type="button"
                    onClick={() => toggleConfession(idx)}
                    whileTap={{ scale: [1, 0.95, 1.05, 1] }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cn(
                      "overflow-hidden rounded-[20px] border px-4 py-3 text-left shadow-[0_12px_36px_rgba(244,132,95,0.08)] transition-colors",
                      isOpen ? "border-[#F4845F] bg-[#FFE8D6]" : "border-[#F4A896] bg-[#FFF4EE] hover:bg-[#FFEFE5]",
                    )}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn("inline-flex items-center gap-2", isOpen ? "font-bold leading-6 text-[#9F442A]" : "text-sm italic text-[#C45C35]/72")}
                        style={isOpen ? { fontSize: 15 } : undefined}
                      >
                        <span aria-hidden>{isOpen ? "♡" : "✉️"}</span>
                        {isOpen ? confession : "tap me"}
                      </span>
                      {isOpen ? <span aria-hidden className="shrink-0 text-base text-[#F4845F]">✓</span> : null}
                    </div>
                  </motion.button>
                );
              })}

              {allConfessionsOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="rounded-[20px] border border-[#F4845F]/45 bg-[#F4845F] px-5 py-4 text-center text-sm font-black text-white shadow-[0_18px_60px_rgba(244,132,95,0.24)]"
                >
                  Okay you know too much now 🫣
                </motion.div>
              ) : null}
            </div>
          </div>
        </Card>
      </Section>

      <AnniversaryMiniFilmStrip photos={[templateData.photos.items[2], templateData.photos.items[3]]} />

      <Section id="reasons" title={templateData.reasons.title}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templateData.reasons.cards.map((c, idx) => (
            <motion.div
              key={`${c.title}_${idx}`}
              variants={cardFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
            >
              <Card className="relative overflow-hidden bg-white">
                <motion.div aria-hidden className="absolute bottom-5 left-0 top-5 w-1 origin-top rounded-r-full bg-[#F4845F]/55" variants={borderDraw} />
                <div className="pl-4">
                  <div className="text-sm font-semibold text-slate-950">{c.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-700">{c.body}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <AnniversaryScenePhoto photo={templateData.photos.items[4]} sceneLabel="A DAY WE STILL KEEP" desktopMaxWidthClassName="lg:max-w-[420px]" />

      <Section id="language" title="A year in our numbers">
        <AnniversaryNumberScoreboard
          accentColor="#F4845F"
          cardBackground="#FFFFFF"
          borderColor="#F4A896"
          yearsValue={5}
          daysValue={1860}
          citiesValue={5}
          photosValue={400}
        />
      </Section>

      <Section id="surprise" title={templateData.surprise.title}>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white">
            <div className="text-sm font-semibold text-slate-800">{templateData.surprise.prompt}</div>
            <div className="mt-4">
              <button
                type="button"
                onClick={openReveal}
                className="w-full rounded-[20px] bg-[#F4845F] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_70px_rgba(244,132,95,0.24)] transition hover:bg-[#E66F4D]"
              >
                {revealOpen ? "Again" : templateData.surprise.button}
              </button>
            </div>

            <div className="mt-5">
              {!revealOpen ? null : (
                <motion.div
                  key={revealIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[20px] border border-[#F4A896] bg-white p-4 shadow-[0_18px_60px_rgba(244,132,95,0.10)]"
                >
                  <div className="text-sm font-semibold text-slate-950">{templateData.surprise.reveals[revealIndex]?.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-700">{templateData.surprise.reveals[revealIndex]?.body}</div>
                </motion.div>
              )}
            </div>
          </Card>

          <div className="rounded-[20px] border border-[#F4A896] bg-white p-6 shadow-[0_24px_80px_rgba(244,132,95,0.12)] backdrop-blur-xl">
            <div className="text-xs font-semibold text-slate-700/70">Tiny reminder</div>
            <div className="mt-2 text-lg font-semibold text-slate-950">You’re my favorite.</div>
            <div className="mt-2 text-sm leading-relaxed text-slate-700">Even when you act like you’re not.</div>
          </div>
        </div>
      </Section>

      <Section id="wishes" title={templateData.wishes.title}>
        <Card className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(244,114,182,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(167,139,250,0.16),transparent_62%)]" />

          <p className="relative mb-5 text-center text-[15px] italic text-[#C45C35]/70">
            My official demands for year 5 —
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {templateData.wishes.chips.map((c, idx) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                style={{ rotate: idx % 2 === 0 ? "-1.2deg" : "1.2deg" }}
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/80 bg-gradient-to-r from-orange-50 to-rose-50 px-4 py-2 text-sm font-bold text-orange-500 shadow-sm"
              >
                <span aria-hidden>{cuteWishIcons[c] ?? "🫶"}</span>
                {c}
              </motion.div>
            ))}
          </div>
        </Card>
      </Section>

      <Section id="letter" eyebrow="okay but real quick..." title="">
        <SealedLetter
          paragraphs={templateData.note.paragraphs}
          signoff={templateData.note.signoff}
        />
      </Section>

      <DemoStickyCTA occasion="Anniversary" templateName="Anniversary Minimal Elegant" recipientName={templateData.partnerName} demoUrl="/anniversary-cute" />

      <Section id="finale" title={templateData.finale.title}>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="bg-white">
            <p className="text-pretty text-sm leading-relaxed text-slate-700 sm:text-base">{templateData.finale.body}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  triggerBurst();
                  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full rounded-[20px] bg-[#F4845F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E66F4D] sm:w-auto"
              >
                {templateData.finale.ctaPrimary}
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerBurst();
                }}
                className="w-full rounded-[20px] border border-[#F4A896] bg-white px-5 py-3 text-sm font-bold text-[#C85C41] transition hover:bg-[#FFF8F3] sm:w-auto"
              >
                {templateData.finale.ctaSecondary}
              </button>
            </div>
          </Card>

          <div className="rounded-[20px] border border-[#F4A896] bg-white p-6 shadow-[0_24px_80px_rgba(244,132,95,0.12)] backdrop-blur-xl">
            <div className="text-xs font-semibold text-slate-700/70"> </div>
            <div className="mt-2 text-lg font-semibold text-slate-950">Same madness.</div>
            <div className="mt-2 text-sm leading-relaxed text-slate-700">More love. Better us.</div>
          </div>
        </div>
      </Section>

      <footer className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl border-t border-[#F4A896] pt-8 text-center">
          <div className="text-xs font-semibold text-[#C85C41]/80">{templateData.finale.footerLine}</div>
        </div>
      </footer>
      <style jsx global>{`
        .anniversary-cute-theme .ww-demo-sticky-cta {
          border-top-color: rgba(244, 168, 150, 0.42);
          background: rgba(244, 132, 95, 0.94);
        }
        .anniversary-cute-theme .ww-demo-sticky-cta button {
          background: linear-gradient(135deg, #f4845f, #f4a896) !important;
          box-shadow: 0 16px 45px rgba(244, 132, 95, 0.34) !important;
        }
      `}</style>
    </main>
  );
}
