"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DemoStickyCTA from "@/components/wowwish/DemoStickyCTA";
import { ScrollCTA } from "@/components/wowwish/treatments/ScrollCTA";
import { RevealHeading, cardFadeUp, borderDraw } from "@/components/wowwish/scrollReveal";
import photo1 from "./1.png";
import photo2 from "./2.png";
import photo3 from "./3.png";
import photo4 from "./4.png";
import photo5 from "./5.png";

const MUSIC_SRC = "/assets/proposal-cute-bg-music.mp3";
const MUSIC_VOLUME = 0.20;
const MUSIC_SEGMENT_START = 0;
const MUSIC_SEGMENT_END = 51;

type TemplateData = {
  crushName: string;
  fromName: string;
  hero: {
    headlinePrefix: string;
    subheadline: string;
    cta: string;
    chips: string[];
  };
  intro: {
    title: string;
    body: string;
  };
  reasons: {
    title: string;
    cards: { icon: string; title: string; body: string }[];
  };
  moments: {
    title: string;
    items: { tag: string; title: string; body: string }[];
  };
  gallery: {
    title: string;
    items: { label: string; url: string }[];
  };
  tinyThings: {
    title: string;
    lines: string[];
  };
  note: {
    title: string;
    body: string;
    ps: string;
  };
  proposal: {
    eyebrow: string;
    title: string;
    question: string;
    yesLabel: string;
    noLabel: string;
    yesAfter: {
      title: string;
      body: string;
    };
    noAfter: {
      title: string;
      body: string;
    };
  };
  finale: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const templateData: TemplateData = {
  crushName: "Aditi",
  fromName: "Abhi",

  hero: {
    headlinePrefix: "Okay hi,",
    subheadline:
      "I like you. Like… a lot. And somehow life got cuter the day you became part of it.",
    cta: "Start here",
    chips: ["soft feelings", "a little chaos", "you, always"],
  },

  intro: {
    title: "Before the big question…",
    body:
      "This is just a tiny page of things I never say properly. No drama. Just me being honest, and a little bit flirty.",
  },

  reasons: {
    title: "Reasons I like you",
    cards: [
      { icon: "🌸", title: "You feel easy", body: "With you, my brain stops overthinking for a second." },
      { icon: "✨", title: "You make things fun", body: "Even boring plans become cute memories." },
      { icon: "😌", title: "You’re my calm", body: "Your presence is peaceful. Very unfair, honestly." },
      { icon: "🫶", title: "You’re thoughtful", body: "Small gestures. Big impact. Always." },
      { icon: "📱", title: "Favorite notification", body: "I pretend I’m chill. I’m not." },
      { icon: "🧁", title: "Soft + strong", body: "Cute energy, but you’ve got a backbone. Respect." },
    ],
  },

  moments: {
    title: "Our little moments",
    items: [
      { tag: "", title: "That one look", body: "The ‘are we flirting?’ moment. We were." },
      { tag: "", title: "The first long chat", body: "When time accidentally disappeared." },
      { tag: "", title: "The comfort day", body: "When you made everything feel okay." },
      { tag: "", title: "The giggle phase", body: "When we laughed at the dumbest thing for too long." },
      { tag: "", title: "The ‘miss you’ moment", body: "The one I didn’t say out loud. But felt." },
    ],
  },

  gallery: {
    title: "Photos that feel like us",
    items: [
      {
        label: "Auto wali selfie",
        url: photo1.src,
      },
      {
        label: "Food date evidence",
        url: photo2.src,
      },
      {
        label: "Movie night, obviously",
        url: photo3.src,
      },
      {
        label: "Game zone drama",
        url: photo4.src,
      },
      {
        label: "A night we’ll always remember",
        url: photo5.src,
      },
    ],
  },

  tinyThings: {
    title: "Tiny things I love",
    lines: [
      "Your ‘I’m trying not to smile’ smile.",
      "How you type ‘hmm’ like it’s a full sentence.",
      "Your voice notes. Dangerous.",
      "The way you say my name.",
      "Your random kindness to strangers.",
      "That you’re cute AND you know what you want.",
    ],
  },

  note: {
    title: "A small note",
    body:
      "I wasn’t planning this. But then you happened. And now I catch myself saving little moments because I want more of them… with you.",
    ps: "P.S. If you’re smiling right now, good. That was the plan.",
  },

  proposal: {
    eyebrow: "Deep breath…",
    title: "Okay, here we go",
    question: "Will you be my girlfriend?",
    yesLabel: "Yes, obviously",
    noLabel: "Let me tease you",
    yesAfter: {
      title: "Then it’s officially us.",
      body: "Okay. I’m smiling like an idiot now.",
    },
    noAfter: {
      title: "Okay, miss drama 😌",
      body: "I’ll wait. But I’m still going to like you. A lot.",
    },
  },

  finale: {
    title: "Now we celebrate",
    body:
      "If you smiled even a little… good. Because you’re my favorite reason to.",
    primaryCta: "Replay",
    secondaryCta: "Send a hug",
  },
};

const reasonReveals = [
  "No overthinking. Just comfort.",
  "Even random plans become memories.",
  "Very unfair. Very needed.",
  "Small gestures. Big impact.",
  "I pretend I’m chill. I’m not.",
  "Cute, but with backbone.",
];

const reasonBadges = ["tap to blush", "tiny confession", "soft proof", "heart alert", "okay wow", "not pretending anymore"];

const reasonRevealClassName =
  "rounded-2xl border border-pink-200/70 bg-pink-50/80 px-3 py-2 text-xs font-black leading-relaxed text-pink-700";

const longestReasonReveal = reasonReveals.reduce((longest, line) => (line.length > longest.length ? line : longest), "");

function ReasonLineReveal({ visible, text, reducedMotion }: { visible: boolean; text: string; reducedMotion: boolean }) {
  return (
    <div className="relative mt-3">
      <div aria-hidden className={cn(reasonRevealClassName, "invisible pointer-events-none")}>
        {longestReasonReveal}
      </div>
      <AnimatePresence initial={false}>
        {visible ? (
          <motion.div
            key="reason-line"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.28, ease: "easeOut" }}
            className={cn(reasonRevealClassName, "absolute inset-x-0 top-0")}
          >
            {text}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const tinyLabels = ["saved", "favorite", "voice note", "replay", "soft spot", "important"];

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

type Heart = {
  id: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
  opacity: number;
};

function FloatingHearts() {
  const reducedMotion = useReducedMotionSafe();

  const hearts = useMemo<Heart[]>(() => {
    return Array.from({ length: 38 }).map((_, i) => ({
      id: `h_${i}_${Math.random().toString(16).slice(2)}`,
      left: (i * 13.7 + 6) % 100,
      size: 13 + (i % 5) * 6,
      delay: (i % 9) * 0.12,
      duration: 9 + (i % 6) * 1.7,
      rotate: (i % 2 ? 8 : -10) + (i % 5) * 2,
      opacity: 0.18 + (i % 4) * 0.055,
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {hearts.map((h, i) => (
        <motion.div
          key={h.id}
          className="absolute text-pink-400"
          style={{ left: `${h.left}%`, top: 0, fontSize: `${h.size}px`, opacity: h.opacity }}
          initial={{ y: `${-30 - (i % 7) * 10}vh`, rotate: h.rotate }}
          animate={{
            y: "120vh",
            x: [0, i % 2 ? 14 : -12, 0],
            rotate: [h.rotate, -h.rotate, h.rotate],
            opacity: [h.opacity, h.opacity, 0],
          }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >
          <span className="drop-shadow-[0_0_24px_rgba(244,114,182,0.35)]">♡</span>
        </motion.div>
      ))}
    </div>
  );
}

type BurstPiece = {
  id: string;
  leftPct: number;
  rotate: number;
  color: string;
  delay: number;
};

type Dot = {
  id: string;
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  color: string;
};

function PastelDots() {
  const reducedMotion = useReducedMotionSafe();

  const dots = useMemo<Dot[]>(() => {
    const colors = ["rgba(244,114,182,0.72)", "rgba(167,139,250,0.62)", "rgba(253,186,116,0.55)"];
    return Array.from({ length: 22 }).map((_, i) => ({
      id: `d_${i}_${Math.random().toString(16).slice(2)}`,
      left: (i * 13.2 + 8) % 100,
      top: (i * 17.6 + 12) % 100,
      size: 7 + (i % 5) * 3,
      opacity: 0.24 + (i % 4) * 0.055,
      duration: 10 + (i % 6) * 2,
      delay: (i % 6) * 0.45,
      drift: (i % 2 ? 1 : -1) * (10 + (i % 4) * 6),
      color: colors[i % colors.length],
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
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
            boxShadow: "0 0 16px rgba(255,255,255,0.55)",
          }}
          animate={{ y: [0, -18, 0], x: [0, d.drift, 0], opacity: [d.opacity * 0.7, d.opacity, d.opacity * 0.7] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function CuteSparkleBackground() {
  const reducedMotion = useReducedMotionSafe();

  const sparkles = useMemo(() => {
    const marks = ["✦", "♡", "•", "✧"];
    return Array.from({ length: 34 }).map((_, i) => ({
      id: `cute_spark_${i}`,
      mark: marks[i % marks.length],
      left: (i * 11.7 + 5) % 100,
      top: (i * 19.3 + 9) % 100,
      size: 13 + (i % 5) * 4,
      delay: (i % 9) * 0.3,
      duration: 5.4 + (i % 5) * 1,
      color: i % 3 === 0 ? "#EC4899" : i % 3 === 1 ? "#A78BFA" : "#FDBA74",
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {sparkles.map((spark) => (
        <motion.span
          key={spark.id}
          className="absolute font-black drop-shadow-[0_0_18px_rgba(244,114,182,0.25)]"
          style={{ left: `${spark.left}%`, top: `${spark.top}%`, color: spark.color, fontSize: spark.size, opacity: 0.28 }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 10, -8, 0],
            scale: [1, 1.35, 1],
            opacity: [0.1, 0.32, 0.1],
          }}
          transition={{ duration: spark.duration, delay: spark.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {spark.mark}
        </motion.span>
      ))}
    </div>
  );
}

function HeartBurst({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotionSafe();

  const pieces = useMemo<BurstPiece[]>(() => {
    const colors = ["#FB7185", "#F472B6", "#A78BFA", "#FDBA74", "#FDE68A"];
    return Array.from({ length: 36 }).map((_, i) => ({
      id: `b_${i}_${Math.random().toString(16).slice(2)}`,
      leftPct: (i * 8.1 + 4) % 100,
      rotate: (i * 33) % 360,
      color: colors[i % colors.length],
      delay: (i % 10) * 0.012,
    }));
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0"
          style={{ left: `${p.leftPct}%` }}
          initial={{ y: -24, opacity: 0, rotate: p.rotate }}
          animate={{
            y: [0, 520, 860],
            x: [0, p.leftPct % 2 ? 26 : -22, 0],
            opacity: [0, 1, 0],
            rotate: [p.rotate, p.rotate + 240],
          }}
          transition={{ duration: 1.55, delay: p.delay, ease: [0.12, 0, 0.39, 0.97] }}
        >
          <span style={{ color: p.color }} className="text-lg drop-shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
            ♥
          </span>
        </motion.span>
      ))}
    </div>
  );
}

function CuteProposalBackground() {
  const reducedMotion = useReducedMotionSafe();

  const blobs = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => {
        const size = 140 + (i % 5) * 70;
        const left = (i * 17 + 6) % 100;
        const top = (i * 19 + 9) % 100;
        const opacity = 0.14 + (i % 4) * 0.04;
        const duration = 14 + (i % 6) * 3;
        const variant = i % 4;
        const color =
          variant === 0
            ? "rgba(244,114,182,0.28)"
            : variant === 1
              ? "rgba(167,139,250,0.24)"
              : variant === 2
                ? "rgba(253,186,116,0.20)"
                : "rgba(253,230,138,0.18)";
        return { id: `bl_${i}`, size, left, top, opacity, duration, color };
      }),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-[#FFF7FB] to-[#F6F2FF]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(244,114,182,0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(167,139,250,0.28),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(253,186,116,0.22),transparent_60%)]" />

      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:78px_78px]" />

      {reducedMotion
        ? null
        : blobs.map((b, i) => (
            <motion.span
              key={b.id}
              className="absolute rounded-full blur-2xl"
              style={{
                left: `${b.left}%`,
                top: `${b.top}%`,
                width: b.size,
                height: b.size,
                backgroundColor: b.color,
                opacity: b.opacity,
              }}
              animate={{ x: [0, i % 2 ? 14 : -12, 0], y: [0, i % 3 ? -12 : 10, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

      <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-white/60 to-transparent" />
    </div>
  );
}

function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-900/10 bg-white/55 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-7",
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
    <section id={id} className="relative z-10 scroll-mt-20 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          {eyebrow.trim() ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mb-2 text-xs font-semibold tracking-[0.22em] text-slate-700/70"
            >
              {eyebrow}
            </motion.div>
          ) : null}
          <RevealHeading className="text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-4xl" style={{ fontFamily: "var(--font-fun)" }}>
            {title}
          </RevealHeading>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function CutePhotoBreak({
  photo,
  eyebrow,
}: {
  photo: { label: string; url: string };
  eyebrow: string;
}) {
  return (
    <motion.div
      initial={{ y: 18, scale: 0.98, rotate: -0.6 }}
      whileInView={{ y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="box-border w-full max-w-full overflow-hidden rounded-[32px] border border-pink-200/70 bg-white/78 p-3 shadow-[0_24px_70px_rgba(244,114,182,0.18)] backdrop-blur-xl lg:mx-auto lg:max-w-[420px] lg:rounded-2xl"
    >
      <div className="box-border w-full max-w-full overflow-hidden rounded-[26px] lg:rounded-2xl">
        <div className="relative aspect-[2/3] w-full max-w-full overflow-hidden rounded-[26px] lg:rounded-2xl">
          <img src={photo.url} alt={photo.label} className="block h-full w-full object-cover object-center" loading="lazy" />
          <div className="absolute bottom-3 left-3 right-3 rounded-full bg-white/80 px-3 py-1.5 text-center shadow-sm backdrop-blur lg:mx-auto lg:max-w-[420px]">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-pink-500/75">{eyebrow}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type ProposalAnswer = "yes" | "no" | null;

export default function ProposalCutePage() {
  const [burstOn, setBurstOn] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [musicBlocked, setMusicBlocked] = useState(false);
  const [musicNeedsUnmute, setMusicNeedsUnmute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answer, setAnswer] = useState<ProposalAnswer>(null);
  const reducedMotion = useReducedMotionSafe();
  const [openReason, setOpenReason] = useState<number | null>(0);
  const [hugSent, setHugSent] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const attemptPlayBestEffort = async (fromStart: boolean) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = MUSIC_VOLUME;
    audio.loop = false;
    if (fromStart) audio.currentTime = MUSIC_SEGMENT_START;

    if (!Number.isFinite(audio.currentTime) || audio.currentTime < MUSIC_SEGMENT_START) {
      audio.currentTime = MUSIC_SEGMENT_START;
    }

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
    audio.volume = MUSIC_VOLUME;
    audio.loop = false;

    if (musicOn) {
      void attemptPlayBestEffort(false);
      return;
    }

    setMusicBlocked(false);
    setMusicNeedsUnmute(false);
    audio.pause();
    audio.currentTime = MUSIC_SEGMENT_START;
  }, [musicOn]);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      if (!Number.isFinite(audio.currentTime)) return;
      if (audio.currentTime < MUSIC_SEGMENT_START) {
        audio.currentTime = MUSIC_SEGMENT_START;
        return;
      }
      if (audio.currentTime >= MUSIC_SEGMENT_END) {
        audio.currentTime = MUSIC_SEGMENT_START;
        if (!audio.paused) {
          void audio.play().catch(() => {
            setMusicBlocked(true);
          });
        }
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

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

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function triggerBurst() {
    setBurstOn(true);
    window.setTimeout(() => setBurstOn(false), 1600);
  }

  const handleTuneButton = () => {
    setMusicOn((prev) => !prev);
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white">
      <CuteProposalBackground />
      <PastelDots />
      <FloatingHearts />
      <CuteSparkleBackground />
      <HeartBurst active={burstOn} />

      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" playsInline />

      <motion.button
        type="button"
        onClick={handleTuneButton}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "ww-music-button fixed bottom-4 right-4 z-30 inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-900 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl transition",
          musicOn ? "" : "text-slate-900/80",
        )}
        aria-pressed={musicOn}
        aria-label={musicOn ? "Music On" : "Music Off"}
      >
        <span aria-hidden>{musicOn ? "Music On" : "Music Off"}</span>
      </motion.button>

      <section id="hero" className="relative z-10 px-4 pb-6 pt-10 sm:px-6 sm:pb-10 sm:pt-14">
        <div className="mx-auto w-full max-w-4xl">
          <div className="grid gap-8">
            <motion.div
              initial={{ y: 18 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap gap-2">
                {templateData.hero.chips.map((c, index) => (
                  <motion.span
                    key={c}
                    initial={{ y: 8, scale: 0.96, rotate: index % 2 ? 1.5 : -1.5 }}
                    animate={{ y: 0, scale: 1, rotate: index % 2 ? 1 : -1 }}
                    transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-800"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-pink-400 via-violet-400 to-amber-300" />
                    {c}
                  </motion.span>
                ))}
              </div>

              <h1 className="mt-5 text-balance text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl" style={{ fontFamily: "var(--font-fun)" }}>
                {templateData.hero.headlinePrefix}{" "}
                <span className="bg-gradient-to-r from-pink-500 via-violet-500 to-amber-500 bg-clip-text text-transparent">
                  {templateData.crushName}
                </span>
                <span className="text-slate-900">…</span>
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-700 sm:text-lg">
                {templateData.hero.subheadline}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    triggerBurst();
                    scrollTo("reasons");
                  }}
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-900"
                >
                  {templateData.hero.cta}
                </button>

                <ScrollCTA
                  scrollTargetId="moments"
                  className="rounded-2xl border border-slate-900/10 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  {templateData.moments.title}
                </ScrollCTA>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionShell id="photos" eyebrow="Photos I keep saving" title={templateData.gallery.title}>
        <div className="grid gap-3 lg:grid-cols-12">
          <motion.div
            initial={{ y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-12"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-900/10 bg-white/60 py-4 shadow-[0_22px_70px_rgba(15,23,42,0.12)] backdrop-blur">
              <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(15,23,42,1)_1px,transparent_1px)] [background-size:18px_18px]" />
              <div className="grid grid-cols-2 gap-3 px-4 lg:grid-cols-2">
                {[templateData.gallery.items[0], templateData.gallery.items[3]].map((p, idx) => (
                  <motion.div
                    key={`${p.label}_${idx}`}
                    initial={{ y: 10, scale: 0.99, rotate: idx % 2 ? 1 : -1 }}
                    whileInView={{ y: 0, scale: 1, rotate: idx % 2 ? 0.5 : -0.5 }}
                    viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
                    transition={{ duration: 0.6, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="group box-border w-full max-w-full overflow-hidden rounded-2xl bg-white/82 shadow-[0_16px_45px_rgba(15,23,42,0.10)]"
                  >
                    <div className="relative aspect-[2/3] w-full max-w-full overflow-hidden rounded-2xl bg-slate-200">
                      <img
                        src={p.url}
                        alt={p.label}
                        className="block h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <p className="px-2 pb-2 pt-3 text-center text-[13px] font-black leading-snug text-slate-800">{p.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </SectionShell>

      <SectionShell id="reasons" eyebrow="A few things I like about you" title={templateData.reasons.title}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {templateData.reasons.cards.map((c, idx) => (
            <div key={`${c.title}_${idx}`} className="contents">
              <motion.div
                variants={cardFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileTap={{ scale: 0.985 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenReason(openReason === idx ? null : idx);
                    triggerBurst();
                  }}
                  className={cn(
                    "group relative h-full w-full overflow-hidden rounded-3xl border border-slate-900/10 bg-white/70 p-4 text-left shadow-[0_18px_60px_rgba(244,114,182,0.12)] backdrop-blur-xl transition hover:bg-white sm:p-5",
                    openReason === idx ? "ring-2 ring-pink-200/70" : "",
                  )}
                  aria-expanded={openReason === idx}
                >
                  <motion.div aria-hidden className="absolute bottom-5 left-0 top-5 w-1 origin-top rounded-r-full bg-pink-400/55" variants={borderDraw} />
                  <div className="pl-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl border border-pink-200/70 bg-pink-50 text-xl shadow-[0_12px_34px_rgba(244,114,182,0.12)]">{c.icon}</div>
                      <div className="rounded-full border border-slate-900/10 bg-white/70 px-2.5 py-1 text-[10px] font-black text-pink-500">{String(idx + 1).padStart(2, "0")}</div>
                    </div>
                    <div className="mt-3 inline-flex rounded-full bg-pink-50/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-pink-500">
                      {reasonBadges[idx]}
                    </div>
                    <div className="mt-3 text-base font-black text-slate-950">{c.title}</div>
                    <div className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-slate-400">tap for the line</div>
                    <ReasonLineReveal
                      visible={openReason === idx}
                      text={reasonReveals[idx]}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                </button>
              </motion.div>
              {idx === 2 ? (
                <div className="sm:col-span-2 lg:col-span-3">
                  <CutePhotoBreak photo={templateData.gallery.items[1]} eyebrow="food date evidence" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="moments" eyebrow="Us, in the small moments" title={templateData.moments.title}>
        <div className="relative space-y-3">
          <div className="absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-pink-200/30 via-violet-200/35 to-transparent sm:left-1/2" />
          {templateData.moments.items.map((m, idx) => (
            <motion.div
              key={`${m.tag}_${idx}`}
              variants={cardFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
              className={cn("relative pl-12 sm:w-[54%] sm:pl-0", idx % 2 === 0 ? "sm:pr-8" : "sm:ml-auto sm:pl-8")}
            >
              <div
                className={cn(
                  "absolute left-3 top-6 z-10 grid h-5 w-5 place-items-center rounded-full border border-pink-200 bg-white shadow-[0_0_22px_rgba(244,114,182,0.18)] sm:left-auto",
                  idx % 2 === 0 ? "sm:-right-2.5" : "sm:-left-2.5",
                )}
              >
                <span className="h-2 w-2 rounded-full bg-pink-400" />
              </div>
              <div
                className={cn(
                  "relative overflow-hidden border border-slate-900/10 bg-white/70 p-4 shadow-[0_18px_60px_rgba(167,139,250,0.10)] backdrop-blur-xl sm:p-5",
                  idx % 2 === 0 ? "rounded-[28px] rounded-tl-sm" : "rounded-[28px] rounded-tr-sm",
                )}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="inline-flex rounded-full border border-pink-200/70 bg-pink-50/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-pink-500">
                    saved chat
                  </div>
                  <div className="text-[10px] font-black text-slate-400">{idx + 1}:0{idx}</div>
                </div>
                {m.tag ? (
                  <div className="text-xs font-semibold tracking-[0.18em] text-slate-600/60">{m.tag}</div>
                ) : null}
                <div className="mt-2 text-base font-black text-slate-950">{m.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-slate-700">{m.body}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <section className="relative z-10 overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <CutePhotoBreak photo={templateData.gallery.items[2]} eyebrow="movie night, obviously" />
        </div>
      </section>

      <SectionShell id="tiny" eyebrow="The tiny things" title={templateData.tinyThings.title}>
        <GlassCard className="relative overflow-hidden bg-white/70">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-200/40 blur-3xl" />
          <div className="relative mb-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-900/10 bg-white/60 px-4 py-3">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-pink-500">saved checklist</div>
            <div className="rounded-full bg-pink-50 px-3 py-1 text-[10px] font-black text-pink-500">private</div>
          </div>
          <div className="relative grid gap-2 sm:grid-cols-2">
            {templateData.tinyThings.lines.map((line, idx) => (
              <motion.div
                key={`${line}_${idx}`}
                initial={{ y: 10, scale: 0.99 }}
                whileInView={{ y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
                transition={{ duration: 0.45, delay: idx * 0.025, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.985 }}
                className="flex items-start gap-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_12px_34px_rgba(244,114,182,0.08)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pink-50 text-pink-500">♡</span>
                <span className="min-w-0">
                  <span className="block">{line}</span>
                  <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{tinyLabels[idx]}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </SectionShell>

      <SectionShell id="note" eyebrow="Just between you and me" title={templateData.note.title}>
        <GlassCard className="relative overflow-hidden bg-white/70">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(244,114,182,0.18),transparent_55%)]" />
          <div className="relative">
            <div className="mb-5 flex justify-end">
              <div className="rotate-3 rounded-2xl bg-pink-100/80 px-3 py-1 text-xs font-black text-pink-600 shadow-sm">
                soft launch?
              </div>
            </div>
            {!noteOpen ? (
              <motion.button
                type="button"
                onClick={() => {
                  setNoteOpen(true);
                  triggerBurst();
                }}
                whileTap={{ scale: 0.985 }}
                className="block w-full rounded-[26px] border border-slate-900/10 bg-white/70 p-5 text-left shadow-[0_16px_50px_rgba(244,114,182,0.10)] transition hover:bg-white"
                aria-expanded={noteOpen}
              >
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-pink-500">A small note</div>
                <div className="mt-2 text-2xl font-black text-slate-950">Tap to open.</div>
                <div className="mt-2 text-sm font-bold text-slate-600">I wrote this softly.</div>
                <div className="mt-5 inline-flex rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Open note</div>
              </motion.button>
            ) : (
              <motion.div
                initial={{ y: 14, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[26px] border border-pink-200/70 bg-[#FFFDF8] p-5 text-slate-950 shadow-[0_20px_70px_rgba(244,114,182,0.18)]"
              >
                <p className="font-letter text-pretty text-[15px] font-normal italic leading-[1.85] text-gray-700">{templateData.note.body}</p>
                <div className="font-sign mt-5 text-xl leading-none text-pink-500">— {templateData.fromName}</div>
                <div className="font-letter mt-3 rounded-2xl bg-pink-50 px-4 py-3 text-sm font-normal italic leading-[1.85] text-gray-500">{templateData.note.ps}</div>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </SectionShell>

      <section className="relative z-10 overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <CutePhotoBreak photo={templateData.gallery.items[4]} eyebrow="a night we will remember" />
        </div>
      </section>

      <section id="proposal" className="relative z-10 scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7"
          >
            <div className="mb-2 text-xs font-semibold tracking-[0.22em] text-slate-700/70">{templateData.proposal.eyebrow}</div>
            <RevealHeading className="text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-5xl" style={{ fontFamily: "var(--font-fun)" }}>{templateData.proposal.title}</RevealHeading>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <GlassCard className="relative overflow-hidden shadow-[0_26px_90px_rgba(244,114,182,0.16)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(253,186,116,0.18),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(244,114,182,0.16),transparent_55%)]" />
              {reducedMotion ? null : (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-3 rounded-[28px] border border-pink-200/60"
                  animate={{ opacity: [0.25, 0.62, 0.25], scale: [1, 1.012, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <div className="pointer-events-none absolute right-4 top-4 rotate-3 rounded-full bg-white/70 px-3 py-1 text-[11px] font-black text-pink-500">blushing</div>

              <div className="relative">
                <div className="text-sm font-semibold text-slate-700">{templateData.crushName},</div>
                <div className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {templateData.proposal.question}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setAnswer("yes");
                      triggerBurst();
                    }}
                    className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(244,114,182,0.20)] transition hover:-translate-y-0.5 hover:bg-slate-900"
                  >
                    {answer === "yes" ? "Best answer ever" : templateData.proposal.yesLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAnswer("no");
                      triggerBurst();
                    }}
                    className="rounded-2xl border border-slate-900/10 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    {templateData.proposal.noLabel}
                  </button>
                </div>

                <div className="mt-6">
                  {answer === null ? null : (
                    <motion.div
                      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "rounded-2xl border border-slate-900/10 bg-white/60 p-4",
                        answer === "yes" ? "shadow-[0_18px_60px_rgba(244,114,182,0.16)]" : "",
                      )}
                    >
                      <div className="text-sm font-semibold text-slate-950">
                        {answer === "yes" ? "Okay. I’m smiling way too much now." : "Fine, take 2 seconds."}
                      </div>
                      <div className="mt-2 text-3xl font-bold leading-none text-pink-600 sm:text-4xl" style={{ fontFamily: "var(--font-letter-script)" }}>
                        {answer === "yes" ? "Soft launch confirmed?" : "But I already know your answer."}
                      </div>
                      <div className="mt-3 text-sm font-semibold text-slate-800">
                        {answer === "yes" ? templateData.proposal.yesAfter.body : templateData.proposal.noAfter.body}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </GlassCard>

            <div className="rounded-3xl border border-slate-900/10 bg-white/55 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              <div className="text-xs font-semibold tracking-[0.18em] text-slate-600/70">Shy confession</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">I’m trying to act normal. I can’t.</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-700">If you say yes, I will smile like an idiot. Fair warning.</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["favorite notification", "little chaos", "heart doing drama"].map((item) => (
                  <span key={item} className="rounded-full border border-pink-200/70 bg-pink-50/80 px-3 py-1 text-[11px] font-black text-pink-600">
                    {item}
                  </span>
                ))}
              </div>

              {answer === null ? null : (
                <button
                  type="button"
                  onClick={() => {
                    setAnswer(null);
                    triggerBurst();
                  }}
                  className="mt-5 w-full rounded-2xl border border-slate-900/10 bg-white/60 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <DemoStickyCTA occasion="Proposal" templateName="Proposal Cute Story" recipientName={templateData.crushName} demoUrl="/proposal-cute" />

      <SectionShell id="finale" eyebrow="Okay, smile for me" title={templateData.finale.title}>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard className="relative overflow-hidden bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(252,231,243,0.72),rgba(237,233,254,0.62))]">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-pink-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-14 left-4 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl" />
            <div className="relative">
              <div className="mb-3 inline-flex rounded-full border border-pink-200/70 bg-white/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-pink-500">
                cute celebration
              </div>
              <p className="text-pretty text-base font-black leading-relaxed text-slate-800 sm:text-lg">{templateData.finale.body}</p>
              {hugSent ? (
                <motion.div
                  initial={{ y: 8, scale: 0.98 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 rounded-2xl border border-pink-200/70 bg-pink-50/80 px-4 py-3 text-3xl font-bold leading-none text-pink-700 sm:text-4xl"
                  style={{ fontFamily: "var(--font-letter-script)" }}
                >
                  Hug sent. Very soft. Very dramatic.
                </motion.div>
              ) : null}
            </div>

            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  triggerBurst();
                  scrollTo("hero");
                }}
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900"
              >
                {templateData.finale.primaryCta}
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerBurst();
                  setHugSent(true);
                }}
                className="rounded-2xl border border-slate-900/10 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
              >
                {templateData.finale.secondaryCta}
              </button>
            </div>
          </GlassCard>

          <div className="rounded-3xl border border-slate-900/10 bg-white/65 p-6 shadow-[0_18px_60px_rgba(244,114,182,0.12)] backdrop-blur-xl">
            <div className="text-xs font-semibold tracking-[0.18em] text-slate-600/70">Your turn</div>
            <div className="mt-2 text-lg font-semibold text-slate-950">Come here. Let me hold your hand.</div>
            <div className="mt-2 text-sm leading-relaxed text-slate-700">I’ll pretend I’m chill. I won’t be.</div>
          </div>
        </div>
      </SectionShell>

      <div className="h-24" />
      <footer className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-5xl border-t border-slate-900/10 pt-8 text-center">
          <div className="text-xs text-slate-600">Made for you. With a soft smile and a little courage.</div>
        </div>
      </footer>
    </main>
  );
}
