"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DemoStickyCTA from "@/components/wowwish/DemoStickyCTA";
import { RevealHeading, cardFadeUp } from "@/components/wowwish/scrollReveal";
import photo1 from "./1.png";
import photo2 from "./2.jpeg";
import photo3 from "./3.jpeg";
import photo4 from "./4.jpeg";
import photo5 from "./5.png";

const MUSIC_SRC = "/assets/proposal-bg-music.mp3";
const MUSIC_VOLUME = 0.40;
const MUSIC_PAUSE_VOLUME = 0.70;
const MUSIC_SEGMENT_START = 70;
const MUSIC_SEGMENT_END = 115;

type TemplateData = {
  partnerName: string;
  fromName: string;
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    chips: string[];
  };
  whyYou: {
    title: string;
    cards: { icon: string; title: string; body: string }[];
  };
  story: {
    title: string;
    items: { tag: string; title: string; body: string }[];
  };
  gallery: {
    title: string;
    items: { label: string; url: string }[];
  };
  littleThings: {
    title: string;
    lines: string[];
  };
  letter: {
    title: string;
    body: string;
    signOff: string;
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
  partnerName: "Ananya",
  fromName: "Abhi",

  hero: {
    headline: "This is my heart — in one page.",
    subheadline:
      "From the first moment, something felt different. Not loud — just certain. With you, my days got calmer, and my world started making sense.",
    cta: "Open my heart",
    chips: ["soft love", "intentional", "only you"],
  },

  whyYou: {
    title: "Why it’s you",
    cards: [
      { icon: "🌙", title: "You feel like home", body: "Even when everything is noisy, you make me feel steady." },
      { icon: "✨", title: "You notice", body: "You catch the small things — the pause in my voice, the tired in my eyes." },
      { icon: "🫶", title: "You make space", body: "With you, I don’t have to explain myself. I can just… be." },
      { icon: "🌷", title: "Your kindness is real", body: "Not showy — just consistent, warm, and true." },
      { icon: "🧭", title: "You bring me back", body: "When I spiral, you hold my hand and slow the world down." },
      { icon: "🔥", title: "Your quiet strength", body: "You carry so much with grace — and still choose softness." },
    ],
  },

  story: {
    title: "How we became us",
    items: [
      { tag: "", title: "The first moment", body: "When I realized: you’re not a chapter — you’re the story." },
      { tag: "", title: "Us, becoming us", body: "Slowly, then suddenly. Like it was always meant to be." },
      { tag: "", title: "The everyday magic", body: "Not grand gestures — chai talks, small laughs, quiet comfort." },
      { tag: "", title: "The steady phase", body: "When life got heavy, we didn’t run. We stayed." },
      { tag: "", title: "Now", body: "I want a future that looks like you — in every corner." },
    ],
  },

  gallery: {
    title: "A few frames",
    items: [
      {
        label: "A day we kept",
        url: photo1.src,
      },
      {
        label: "My favorite table",
        url: photo2.src,
      },
      {
        label: "Breathless, with you",
        url: photo3.src,
      },
      {
        label: "Easy, like us",
        url: photo4.src,
      },
      {
        label: "Every ordinary day feels special with you in it.",
        url: photo5.src,
      },
    ],
  },

  littleThings: {
    title: "The soft details",
    lines: [
      "The way you listen — like it’s sacred.",
      "Your smile when you’re trying not to smile.",
      "How silence with you still feels full.",
      "Your softness — and your spine.",
      "The way you care without announcing it.",
      "How you calm my mind without even trying.",
    ],
  },

  letter: {
    title: "A letter, quietly",
    body:
      "I don’t know how you did it — but you changed the way the world feels to me. Love with you isn’t a storm. It’s a light I can trust. Those random calls, small laughs, and ordinary days became my favorite part of life. Somewhere between the little things, you became the person I started imagining everything with. I don’t need this to be loud. I just need it to be true.",
    signOff: "Always,\nAbhi",
  },

  proposal: {
    eyebrow: " ",
    title: "Just us, and this question",
    question: "Will you choose me — the way I choose you?",
    yesLabel: "I choose you",
    noLabel: "One more moment",
    yesAfter: {
      title: "Then this becomes our beginning.",
      body: "No big speech — just a quiet promise: I’ll take care of your heart. I’ll protect our peace. And I’ll keep choosing you, in every season.",
    },
    noAfter: {
      title: "Always.",
      body: "Take your time. This page isn’t a push — it’s my truth. I’m here, steady, whenever you’re ready.",
    },
  },

  finale: {
    title: "Tonight, we celebrate",
    body:
      "A soft beginning. A quiet yes. And a love that feels like peace.",
    primaryCta: "Read again",
    secondaryCta: "Start from the beginning",
  },
};

const reasonReveals = [
  "The kind I don’t have to perform for.",
  "You hear the silence between words.",
  "That space feels like safety, not distance.",
  "It shows up quietly, again and again.",
  "You make the hard parts feel survivable.",
  "Strong enough to stay, soft enough to care.",
];

const softDetailNotes = [
  {
    icon: "✦",
    title: "The way you listen",
    reveal: "Like even my smallest thoughts deserve a place.",
  },
  {
    icon: "♡",
    title: "Your almost-smile",
    reveal: "The one you try to hide, but I always catch.",
  },
  {
    icon: "◌",
    title: "Silence with you",
    reveal: "It does not feel empty. It feels safe.",
  },
  {
    icon: "✧",
    title: "Your softness",
    reveal: "Gentle, but never weak.",
  },
  {
    icon: "⋆",
    title: "How you care",
    reveal: "Quietly. Without needing applause.",
  },
  {
    icon: "♡",
    title: "My mind around you",
    reveal: "It slows down. Finally.",
  },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

type AmbientParticle = {
  id: string;
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
};

function AmbientRomanceParticles() {
  const reducedMotion = useReducedMotionSafe();

  const particles = useMemo<AmbientParticle[]>(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: `p_${i}_${Math.random().toString(16).slice(2)}`,
      left: (i * 11.8 + 7) % 100,
      top: (i * 13.6 + 12) % 100,
      size: 8 + (i % 6) * 4,
      opacity: 0.18 + (i % 4) * 0.055,
      duration: 12 + (i % 6) * 2.1,
      delay: (i % 8) * 0.35,
      drift: (i % 2 ? 1 : -1) * (22 + (i % 4) * 10),
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: "rgba(224,255,255,0.92)",
            boxShadow: "0 0 26px rgba(45,212,191,0.22), 0 0 38px rgba(244,114,182,0.18)",
          }}
          animate={{
            y: [0, -34, 0],
            x: [0, p.drift, 0],
            opacity: [p.opacity * 0.6, p.opacity, p.opacity * 0.6],
            scale: [1, 1.06, 1],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
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

type Spark = {
  id: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

function GlowSparks({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotionSafe();

  const sparks = useMemo<Spark[]>(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: `g_${i}_${Math.random().toString(16).slice(2)}`,
      left: (i * 9.1 + 6) % 100,
      size: 6 + (i % 4) * 3,
      delay: (i % 10) * 0.02,
      duration: 1.7 + (i % 6) * 0.12,
      opacity: 0.35 + (i % 4) * 0.12,
    }));
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute top-0 rounded-full"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            backgroundColor: "rgba(255,255,255,0.92)",
            opacity: s.opacity,
            boxShadow: "0 0 22px rgba(251,191,36,0.25), 0 0 34px rgba(244,114,182,0.22)",
          }}
          initial={{ y: 40, opacity: 0, scale: 0.75 }}
          animate={{ y: [-10, 240, 420], opacity: [0, s.opacity, 0], scale: [0.75, 1, 0.92] }}
          transition={{ duration: s.duration, delay: s.delay, ease: [0.12, 0, 0.39, 0.97] }}
        />
      ))}
    </div>
  );
}

type ConfettiPiece = {
  id: string;
  leftPct: number;
  rotate: number;
  color: string;
  delay: number;
};

function SoftConfetti({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotionSafe();

  const pieces = useMemo<ConfettiPiece[]>(() => {
    const colors = ["#FBCFE8", "#FDE68A", "#E9D5FF", "#FED7AA", "#FEF3C7", "#FCA5A5"];
    return Array.from({ length: 42 }).map((_, i) => ({
      id: `c_${i}_${Math.random().toString(16).slice(2)}`,
      leftPct: (i * 7.6 + 3) % 100,
      rotate: (i * 37) % 360,
      color: colors[i % colors.length],
      delay: (i % 12) * 0.012,
    }));
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 h-2.5 w-1.5 rounded-full"
          style={{ left: `${p.leftPct}%`, backgroundColor: p.color }}
          initial={{ y: -24, opacity: 0, rotate: p.rotate }}
          animate={{
            y: [0, 520, 860],
            x: [0, p.leftPct % 2 ? 22 : -18, 0],
            opacity: [0, 1, 0],
            rotate: [p.rotate, p.rotate + 240],
          }}
          transition={{ duration: 1.55, delay: p.delay, ease: [0.12, 0, 0.39, 0.97] }}
        />
      ))}
    </div>
  );
}

function ProposalBackground() {
  const reducedMotion = useReducedMotionSafe();

  const bokeh = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => {
        const size = 110 + (i % 6) * 44;
        const left = (i * 17 + 6) % 100;
        const top = (i * 19 + 9) % 100;
        const opacity = 0.12 + (i % 4) * 0.05;
        const duration = 16 + (i % 7) * 3;
        const variant = i % 4;
        const color =
          variant === 0
            ? "rgba(251,191,36,0.18)"
            : variant === 1
              ? "rgba(244,114,182,0.20)"
              : variant === 2
                ? "rgba(148,163,184,0.16)"
                : "rgba(167,139,250,0.16)";
        return { id: `b_${i}`, size, left, top, opacity, duration, color };
      }),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A3B46] via-[#2E2A63] via-35% to-[#0E0818]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(45,212,191,0.46),transparent_48%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(196,181,253,0.42),transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_42%,rgba(244,114,182,0.24),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_86%,rgba(91,33,182,0.30),transparent_62%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,16,24,0.46)_0%,rgba(80,42,112,0.38)_50%,rgba(19,8,31,0.86)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_68%,rgba(224,255,255,0.10),transparent_38%)]" />

      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:22px_22px]" />

      {reducedMotion
        ? null
        : bokeh.map((b, i) => (
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
              animate={{
                x: [0, i % 2 ? 14 : -12, 0],
                y: [0, i % 3 ? -12 : 10, 0],
                scale: [1, 1.06, 1],
              }}
              transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/35 to-transparent" />
    </div>
  );
}

function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.40)] backdrop-blur-xl sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

function GlowSeparator({ label }: { label: string }) {
  return (
    <div className="relative z-10 mx-auto my-2 flex w-full max-w-5xl items-center gap-4 px-4 sm:px-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-100/[0.18] to-transparent" />
      <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.20em] text-white/45 backdrop-blur">
        {label}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-100/[0.18] to-transparent" />
    </div>
  );
}

function PhotoInterlude({
  photo,
  id,
  eyebrow,
  title,
  body,
  reverse = false,
}: {
  photo: { label: string; url: string };
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  reverse?: boolean;
}) {
  return (
    <section id={id} className="relative z-10 overflow-x-hidden scroll-mt-20 px-4 py-8 sm:px-6 sm:py-10">
      <div className={cn("mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-center", reverse ? "md:grid-cols-[1.1fr_0.9fr]" : "")}>
        <motion.div
          initial={{ y: 16, scale: 0.99 }}
          whileInView={{ y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className={cn("relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.06] p-3 shadow-[0_22px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl", reverse ? "md:order-2" : "")}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(244,114,182,0.16),transparent_55%)]" />
          <div className="group box-border w-full max-w-full overflow-hidden rounded-[24px] bg-white/5">
            <div className="relative aspect-[2/3] w-full max-w-full overflow-hidden rounded-[24px]">
              <img
                src={photo.url}
                alt={photo.label}
                className="block h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.035]"
                loading="lazy"
              />
            </div>
            <p className="px-3 py-3 text-center text-sm font-semibold leading-snug text-rose-50/84">
              {photo.label}
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
          transition={{ duration: 0.58, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className={cn("rounded-[30px] border border-white/10 bg-black/[0.16] p-5 backdrop-blur-xl sm:p-6", reverse ? "md:order-1" : "")}
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-100/62">{eyebrow}</div>
          <div className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</div>
          <p className="mt-3 text-sm font-medium leading-7 text-white/78">{body}</p>
        </motion.div>
      </div>
    </section>
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
              className="mb-2 text-xs font-semibold tracking-[0.22em] text-white/65"
            >
              {eyebrow}
            </motion.div>
          ) : null}
          <RevealHeading className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </RevealHeading>
        </motion.div>

        {children}
      </div>
    </section>
  );
}

type ProposalAnswer = "yes" | "no" | null;

export default function ProposalPage() {
  const [sparkOn, setSparkOn] = useState(false);
  const [confettiOn, setConfettiOn] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [musicBlocked, setMusicBlocked] = useState(false);
  const [musicNeedsUnmute, setMusicNeedsUnmute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answer, setAnswer] = useState<ProposalAnswer>(null);
  const reducedMotion = useReducedMotionSafe();
  const [openReason, setOpenReason] = useState<number | null>(0);
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [pauseExiting, setPauseExiting] = useState(false);
  const [proposalReady, setProposalReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeFadeRef = useRef<number | null>(null);
  const letterLines = useMemo(() => {
    return templateData.letter.body.match(/[^.!?]+[.!?]+/g)?.map((line) => line.trim()) ?? [templateData.letter.body];
  }, []);

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
    audio.volume = MUSIC_VOLUME;
    audio.loop = false;

    if (musicOn) {
      void attemptPlayBestEffort(false);
    } else {
      setMusicBlocked(false);
      setMusicNeedsUnmute(false);
      audio.pause();
      audio.currentTime = MUSIC_SEGMENT_START;
    }
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
    if (!musicOn) return;
    void attemptPlayBestEffort(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    window.addEventListener(
      "touchstart",
      onFirstUserGesture,
      { once: true, passive: true } as AddEventListenerOptions,
    );
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

  useEffect(() => {
    return () => {
      if (volumeFadeRef.current) {
        window.clearInterval(volumeFadeRef.current);
      }
    };
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function triggerSpark() {
    setSparkOn(true);
    window.setTimeout(() => setSparkOn(false), 1100);
  }

  function triggerConfetti() {
    setConfettiOn(true);
    window.setTimeout(() => setConfettiOn(false), 1600);
  }

  const handleTuneButton = () => {
    triggerSpark();

    if (!musicOn) {
      setMusicOn(true);
      void attemptPlayBestEffort(true);
      return;
    }

    if (musicBlocked || musicNeedsUnmute || !isPlaying) {
      void attemptPlayBestEffort(true);
      return;
    }

    setMusicOn(false);
  };

  function fadeMusicVolume(targetVolume: number) {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;

    if (volumeFadeRef.current) {
      window.clearInterval(volumeFadeRef.current);
      volumeFadeRef.current = null;
    }

    volumeFadeRef.current = window.setInterval(() => {
      const next = audio.volume < targetVolume
        ? Math.min(targetVolume, audio.volume + 0.025)
        : Math.max(targetVolume, audio.volume - 0.025);
      audio.volume = next;

      if (Math.abs(next - targetVolume) < 0.001 && volumeFadeRef.current) {
        window.clearInterval(volumeFadeRef.current);
        volumeFadeRef.current = null;
      }
    }, 70);
  }

  function handleReadyForQuestion() {
    if (pauseExiting || proposalReady) return;
    setPauseExiting(true);
    setProposalReady(true);
    fadeMusicVolume(MUSIC_PAUSE_VOLUME);
    window.setTimeout(() => {
      window.setTimeout(() => {
        document.getElementById("proposal")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
    }, 520);
  }

  return (
    <main className="proposal-romantic-template relative isolate min-h-screen overflow-hidden bg-[#0E0818] text-white">
      <ProposalBackground />
      <AmbientRomanceParticles />
      <GlowSparks active={sparkOn} />
      <SoftConfetti active={confettiOn} />

      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" autoPlay muted playsInline />

      <motion.button
        type="button"
        onClick={handleTuneButton}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "ww-music-button fixed bottom-4 right-4 z-30 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold shadow-[0_18px_60px_rgba(0,0,0,0.40)] backdrop-blur-xl transition",
          musicOn ? "text-white" : "text-white/80",
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
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap gap-2">
                {templateData.hero.chips.map((c, index) => (
                  <motion.span
                    key={c}
                    initial={{ y: 8, scale: 0.98 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/90"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-300 via-rose-300 to-violet-300" />
                    {c}
                  </motion.span>
                ))}
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  {templateData.hero.headline}{" "}
                </motion.span>
                <motion.span
                  className="inline-block bg-gradient-to-r from-amber-200 via-rose-200 to-violet-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                >
                  {templateData.partnerName}
                </motion.span>
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/75 sm:text-lg">
                {templateData.hero.subheadline}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    triggerSpark();
                    if (!musicOn) {
                      setMusicOn(true);
                      void attemptPlayBestEffort(true);
                    }
                    setLetterOpen(true);
                    scrollTo("letter");
                  }}
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_18px_60px_rgba(244,114,182,0.14)] transition hover:bg-white/90"
                >
                  {templateData.hero.cta}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerSpark();
                    scrollTo("proposal");
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  The question
                </button>
              </div>

              <motion.button
                type="button"
                onClick={() => scrollTo("photos")}
                initial={{ y: 10 }}
                animate={reducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
                transition={reducedMotion ? { duration: 0.4 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-white/60"
              >
                Scroll through our frames
                <span aria-hidden className="text-white/40">↓</span>
              </motion.button>
            </motion.div>

          </div>
        </div>
      </section>

      <PhotoInterlude
        id="photos"
        photo={templateData.gallery.items[0]}
        eyebrow="first frame"
        title="Before the reasons, there was this feeling."
        body="One small memory, and somehow the whole page already knows where it is going."
      />

      <GlowSeparator label="the heart opens here" />

      <SectionShell id="why" eyebrow=" " title={templateData.whyYou.title}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {templateData.whyYou.cards.slice(0, 3).map((c, idx) => (
            <motion.div
              key={`${c.title}_${idx}`}
              initial={{ y: 16, scale: 0.99 }}
              whileInView={{ y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
              transition={{ duration: 0.55, delay: idx * 0.035, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.985 }}
            >
              <button
                type="button"
                onClick={() => {
                  setOpenReason(openReason === idx ? null : idx);
                  triggerSpark();
                }}
                className={cn(
                  "group h-full w-full rounded-3xl border p-4 text-left shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:-translate-y-0.5 sm:p-5",
                  idx === 0
                    ? "border-rose-100/[0.24] bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(244,114,182,0.10))] shadow-[0_24px_90px_rgba(244,114,182,0.14)]"
                    : "border-white/10 bg-white/[0.06] hover:bg-white/[0.08]",
                  openReason === idx ? "ring-1 ring-rose-100/20" : "",
                )}
                aria-expanded={openReason === idx}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-xl shadow-[0_12px_34px_rgba(244,114,182,0.10)]">{c.icon}</div>
                  <div className="rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-[10px] font-semibold text-white/60">{String(idx + 1).padStart(2, "0")}</div>
                </div>
                <div className="mt-3 text-base font-semibold text-white">{c.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/75">{c.body}</div>
                <AnimatePresence initial={false}>
                  {openReason === idx ? (
                    <motion.div
                      key="expanded-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.25, ease: "easeOut" },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="pt-3 pb-1">
                        <div className="rounded-2xl border border-white/10 bg-black/[0.15] px-3 py-2 text-xs font-semibold leading-relaxed text-rose-50/[0.82]">
                          {reasonReveals[idx]}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <PhotoInterlude
        photo={templateData.gallery.items[1]}
        eyebrow="why it stayed"
        title="Every ordinary table became a memory."
        body="That is why it is you. Not because of one grand moment, but because the small ones kept becoming beautiful."
        reverse
      />

      <SectionShell id="story" eyebrow=" " title={templateData.story.title}>
        <div className="relative">
          <div className="absolute bottom-8 left-5 top-3 w-px bg-gradient-to-b from-rose-100/10 via-rose-100/35 to-amber-100/10 sm:left-1/2" />
          {templateData.story.items.map((m, idx) => (
            <motion.div
              key={`${m.tag}_${idx}`}
              variants={cardFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
              className={cn("relative mb-4 pl-12 sm:w-1/2 sm:pl-0", idx % 2 === 0 ? "sm:pr-8" : "sm:ml-auto sm:pl-8")}
            >
              <div
                className={cn(
                  "absolute left-3 top-6 z-10 grid h-5 w-5 place-items-center rounded-full border border-white/[0.15] bg-[#1C1017] shadow-[0_0_28px_rgba(244,114,182,0.16)] sm:left-auto",
                  idx % 2 === 0 ? "sm:-right-2.5" : "sm:-left-2.5",
                )}
              >
                <div className={cn("h-2 w-2 rounded-full", idx === templateData.story.items.length - 1 ? "bg-rose-200" : "bg-white/60")} />
              </div>
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl border p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6",
                  idx === templateData.story.items.length - 1
                    ? "border-rose-100/[0.22] bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(244,114,182,0.11))] shadow-[0_24px_90px_rgba(244,114,182,0.14)]"
                    : "border-white/10 bg-white/[0.06]",
                )}
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-200/55 via-rose-200/35 to-transparent" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-2 inline-flex rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      {idx === templateData.story.items.length - 1 ? "right now" : `chapter ${idx + 1}`}
                    </div>
                    {m.tag ? (
                      <div className="text-xs font-semibold tracking-[0.18em] text-white/65">{m.tag}</div>
                    ) : null}
                    <div className="mt-2 text-lg font-semibold text-white">{m.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/75">{m.body}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <PhotoInterlude
        photo={templateData.gallery.items[2]}
        eyebrow="between chapters"
        title="Some moments say more than paragraphs."
        body="The story did not need to rush. It kept unfolding quietly, and I kept finding you in every future."
      />

      <SectionShell id="little" eyebrow=" " title={templateData.littleThings.title}>
        <GlassCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-14 top-10 h-40 w-40 rounded-full bg-rose-300/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-14 bottom-4 h-44 w-44 rounded-full bg-amber-200/10 blur-3xl" />
          <div className="relative mb-5 rounded-3xl border border-white/10 bg-black/[0.12] px-4 py-3 text-sm font-semibold leading-relaxed text-white/78">
            Some details are too small for the world, but too important for me to forget. Tap each one.
          </div>
          <div className="relative grid gap-3 sm:grid-cols-2">
            {softDetailNotes.map((note, idx) => (
              <motion.div
                key={`${note.title}_${idx}`}
                initial={{ y: 12, scale: 0.985, rotate: idx % 2 ? 0.7 : -0.7 }}
                whileInView={{ y: 0, scale: 1, rotate: idx % 2 ? 0.35 : -0.35 }}
                viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
                transition={{ duration: 0.48, delay: idx * 0.035, ease: [0.22, 1, 0.36, 1] }}
                className={cn(idx === 1 || idx === 4 ? "sm:translate-y-4" : "", idx === 2 ? "sm:col-span-2 sm:max-w-[78%]" : "")}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenDetail(openDetail === idx ? null : idx);
                    triggerSpark();
                  }}
                  className={cn(
                    "group min-h-[112px] w-full rounded-[26px] border px-4 py-4 text-left shadow-[0_16px_44px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5",
                    openDetail === idx
                      ? "border-rose-100/30 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(244,114,182,0.10))] ring-1 ring-rose-100/20"
                      : "border-white/10 bg-white/[0.065] hover:bg-white/[0.09]",
                  )}
                  aria-expanded={openDetail === idx}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-rose-100/80 shadow-[0_10px_28px_rgba(244,114,182,0.12)]">
                      {note.icon}
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/[0.12] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/52">
                      note {idx + 1}
                    </span>
                  </div>
                  <div className="mt-4 text-base font-semibold text-white">{note.title}</div>
                  {openDetail === idx ? (
                    <motion.div
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-3 rounded-2xl border border-white/10 bg-black/[0.13] px-3 py-2 text-xl font-semibold leading-6 text-rose-50/90 sm:text-2xl"
                      style={{ fontFamily: "var(--font-handwritten)", wordBreak: "break-word" }}
                    >
                      {note.reveal}
                    </motion.div>
                  ) : null}
                </button>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </SectionShell>

      <PhotoInterlude
        photo={templateData.gallery.items[3]}
        eyebrow="before the letter"
        title="This is the kind of quiet I wanted to keep."
        body="So I wrote the part that is hard to say out loud, and left it here for you to open."
        reverse
      />

      <SectionShell id="letter" eyebrow=" " title={templateData.letter.title}>
        <GlassCard className="relative overflow-hidden bg-[linear-gradient(145deg,rgba(255,247,237,0.12),rgba(255,255,255,0.055))]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(244,114,182,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(251,191,36,0.14),transparent_55%)]" />
          <div className="pointer-events-none absolute -bottom-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-rose-200/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rose-100/35 to-transparent" />

          <div className="relative box-border max-w-full overflow-hidden">
            {!letterOpen ? (
              <motion.button
                type="button"
                onClick={() => {
                  setLetterOpen(true);
                  triggerSpark();
                }}
                whileTap={{ scale: 0.985 }}
                className="group block box-border w-full max-w-full overflow-hidden rounded-[28px] border border-white/[0.12] bg-black/[0.18] p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-black/[0.24]"
                aria-expanded={letterOpen}
              >
                <div className="relative box-border max-w-full overflow-hidden rounded-3xl border border-rose-100/[0.14] bg-[linear-gradient(145deg,rgba(255,247,237,0.10),rgba(244,114,182,0.08))] px-5 py-6 sm:p-6">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-rose-100/25 to-transparent" />
                  <div className="absolute left-0 right-0 top-0 h-1/2 origin-bottom bg-[linear-gradient(160deg,rgba(255,255,255,0.10),rgba(244,114,182,0.06))] transition duration-500 group-hover:-translate-y-1 group-hover:rotate-1" />
                  <div className="relative">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/50">sealed for {templateData.partnerName}</div>
                    <div className="mt-16 text-2xl font-semibold tracking-tight text-white">Open the letter</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/68">A few lines I could not keep inside anymore.</div>
                  </div>
                </div>
              </motion.button>
            ) : (
              <motion.div
                initial={{ y: 12 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative box-border max-w-full overflow-hidden rounded-[28px] border border-cyan-100/70 bg-[#FFFDF8] px-5 py-6 text-slate-950 shadow-[0_24px_90px_rgba(45,212,191,0.18)] sm:p-5"
              >
                <div className="pointer-events-none absolute left-6 top-5 text-7xl font-semibold leading-none text-slate-900/10">“</div>
                <div className="space-y-3 break-words">
                  {letterLines.map((line, idx) => (
                    <motion.p
                      key={`${line}-${idx}`}
                      initial={{ y: 8 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.42, delay: idx * 0.075, ease: [0.22, 1, 0.36, 1] }}
                      className="font-letter break-words text-pretty text-[15px] font-normal italic leading-[1.85] text-gray-800"
                      style={{ wordBreak: "break-word" }}
                    >
                      {line}
                    </motion.p>
                  ))}
                  <motion.div
                    initial={{ y: 8 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.42, delay: letterLines.length * 0.075, ease: [0.22, 1, 0.36, 1] }}
                    className="font-sign mt-6 inline-block max-w-full whitespace-pre-line break-words rounded-2xl border border-slate-900/10 bg-cyan-50 px-4 py-3 text-lg leading-[1.8] text-gray-700"
                    style={{ wordBreak: "break-word" }}
                  >
                    {templateData.letter.signOff}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </SectionShell>

      <PhotoInterlude
        photo={templateData.gallery.items[4]}
        eyebrow="one last frame"
        title="Every ordinary day feels special with you in it."
        body="And that is why the question matters. Not as a performance, but as a promise."
      />

      <motion.section
        id="pause-before-ask"
        className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-[#1A1A2E] px-4 py-20 text-center sm:px-6"
        initial={{ opacity: 0, scale: 0.985, filter: "blur(10px)" }}
        whileInView={pauseExiting ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        animate={pauseExiting ? { opacity: 0, scale: 0.985, filter: "blur(10px)" } : undefined}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        aria-hidden={pauseExiting}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(244,114,182,0.14),transparent_46%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_74%,rgba(251,191,36,0.08),transparent_52%)]" />
        <div className="relative z-10 mx-auto max-w-xl">
          <div aria-hidden className="proposal-pause-heart mx-auto text-7xl leading-none text-rose-200 drop-shadow-[0_0_34px_rgba(244,114,182,0.36)]">
            ♥
          </div>
          <div className="mt-7 text-4xl font-semibold tracking-tight text-white sm:text-6xl" style={{ fontFamily: "var(--font-romantic)" }}>
            Take a breath.
          </div>
          <p className="mx-auto mt-4 max-w-sm text-sm font-medium leading-7 text-white/56">
            The next part is not just another section. It is the reason this page exists.
          </p>
          <button
            type="button"
            onClick={handleReadyForQuestion}
            onPointerDown={handleReadyForQuestion}
            className="mt-8 rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white/70 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:bg-white/[0.10] hover:text-white"
          >
            I&apos;m ready
          </button>
        </div>
        <style jsx>{`
          .proposal-pause-heart {
            animation: proposalPausePulse 2.8s ease-in-out infinite;
          }

          @keyframes proposalPausePulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.78;
            }
            50% {
              transform: scale(1.1);
              opacity: 1;
            }
          }
        `}</style>
      </motion.section>

      {proposalReady ? (
      <motion.section
        id="proposal"
        initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7"
          >
            {templateData.proposal.eyebrow.trim() ? (
              <div className="mb-2 text-xs font-semibold tracking-[0.22em] text-white/65">{templateData.proposal.eyebrow}</div>
            ) : null}
            <RevealHeading className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>{templateData.proposal.title}</RevealHeading>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <GlassCard className="relative overflow-hidden shadow-[0_26px_110px_rgba(244,114,182,0.16)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(251,191,36,0.18),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(244,114,182,0.16),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(255,255,255,0.08),transparent_52%)]" />
              {reducedMotion ? null : (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-3 rounded-[26px] border border-rose-100/[0.16]"
                  animate={{ opacity: [0.24, 0.62, 0.24], scale: [1, 1.012, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <div className="relative">
                <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.20em] text-white/55">
                  the question
                </div>
                <div className="text-sm font-semibold text-white/70">{templateData.partnerName},</div>
                <div className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {templateData.proposal.question}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setAnswer("yes");
                      triggerSpark();
                      triggerConfetti();
                    }}
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_18px_60px_rgba(244,114,182,0.18)] transition hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    {templateData.proposal.yesLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAnswer("no");
                      triggerSpark();
                    }}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    {templateData.proposal.noLabel}
                  </button>
                </div>

                <div className="mt-6">
                  {answer === null ? null : (
                    <motion.div
                      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur",
                        answer === "yes"
                          ? "shadow-[0_22px_80px_rgba(244,114,182,0.20)]"
                          : "shadow-[0_22px_80px_rgba(0,0,0,0.28)]",
                      )}
                    >
                      <div className="text-sm font-semibold text-white">
                        {answer === "yes" ? "Then this page has done its job." : templateData.proposal.noAfter.title}
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-white/80">
                        {answer === "yes"
                          ? "A quiet yes. A forever kind of feeling."
                          : templateData.proposal.noAfter.body}
                      </div>
                      {answer === "yes" ? (
                        <div className="mt-3 text-xl font-normal leading-8 text-white/88 sm:text-2xl" style={{ fontFamily: "var(--font-proposal-letter)" }}>{templateData.proposal.yesAfter.body}</div>
                      ) : null}
                    </motion.div>
                  )}
                </div>
              </div>
            </GlassCard>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="mb-4 h-px w-16 bg-gradient-to-r from-rose-200/60 to-transparent" />
              <div className="text-sm font-semibold text-white/80">Take your time.</div>
              <div className="mt-3 text-lg font-semibold text-white">No pressure. Only love.</div>
              <div className="mt-2 text-sm leading-relaxed text-white/75">
                This is meant to feel like us — calm, real, and intentional.
              </div>

              {answer === null ? null : (
                <button
                  type="button"
                  onClick={() => {
                    triggerSpark();
                    setAnswer(null);
                  }}
                  className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Clear the answer
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.section>
      ) : null}

      <DemoStickyCTA occasion="Proposal" templateName="Proposal Romantic Glow" recipientName={templateData.partnerName} demoUrl="/proposal" />

      <SectionShell id="finale" eyebrow=" " title={templateData.finale.title}>
        <div className="grid gap-4">
          <GlassCard className="relative overflow-hidden bg-[linear-gradient(145deg,rgba(244,114,182,0.10),rgba(251,191,36,0.06),rgba(255,255,255,0.04))]">
            <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-rose-300/[0.12] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-6 h-44 w-44 rounded-full bg-amber-200/10 blur-3xl" />
            {reducedMotion ? null : (
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                {[0, 1, 2, 3, 4].map((item) => (
                  <motion.span
                    key={item}
                    className="absolute rounded-full bg-white/[0.45]"
                    style={{
                      left: `${14 + item * 18}%`,
                      top: `${20 + (item % 3) * 18}%`,
                      width: 3 + item,
                      height: 3 + item,
                    }}
                    animate={{ y: [0, -12, 0], opacity: [0.18, 0.48, 0.18], scale: [1, 1.25, 1] }}
                    transition={{ duration: 4 + item * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            )}
            <div className="relative">
              <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.20em] text-white/55">
                afterglow
              </div>
              <p className="text-pretty text-base font-semibold leading-relaxed text-white/[0.84] sm:text-lg">{templateData.finale.body}</p>
            </div>

            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  triggerSpark();
                  setLetterOpen(true);
                  scrollTo("letter");
                }}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                {templateData.finale.primaryCta}
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerSpark();
                  scrollTo("hero");
                }}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                {templateData.finale.secondaryCta}
              </button>
            </div>
          </GlassCard>

        </div>
      </SectionShell>

      <div className="h-24" />
      <footer className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-5xl border-t border-white/10 pt-8 text-center">
          <div className="text-xs text-white/60">Only for you. Always.</div>
        </div>
      </footer>
    </main>
  );
}
