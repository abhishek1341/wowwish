"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import DemoStickyCTA from "@/components/wowwish/DemoStickyCTA";
import { RevealHeading, cardFadeUp, borderDraw } from "@/components/wowwish/scrollReveal";
import photo1 from "./1.png";
import photo2 from "./2.png";
import photo3 from "./3.png";
import photo4 from "./4.png";
import photo5 from "./5.png";

const MUSIC_SRC = "/assets/proposal-luxury-bg-music.mp3";
const MUSIC_VOLUME = 0.20;
const MUSIC_SEGMENT_START = 0;
const MUSIC_SEGMENT_END = 52;

type TemplateData = {
  partnerName: string;
  fromName: string;
  hero: {
    eyebrow: string;
    headlinePrefix: string;
    subheadline: string;
    cta: string;
    chips: string[];
  };
  why: {
    title: string;
    cards: { title: string; body: string }[];
  };
  moments: {
    title: string;
    items: { yearTag: string; title: string; body: string }[];
  };
  gallery: {
    title: string;
    items: { label: string; note: string; url: string }[];
  };
  changed: {
    title: string;
    lines: string[];
  };
  letter: {
    title: string;
    body: string[];
    signoff: string;
  };
  proposal: {
    eyebrow: string;
    title: string;
    question: string;
    yesLabel: string;
    noLabel: string;
    yesAfter: { title: string; body: string };
    noAfter: { title: string; body: string };
  };
  ending: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    footerLine: string;
  };
};

const templateData: TemplateData = {
  partnerName: "Vidhi",
  fromName: "Abhi",

  hero: {
    eyebrow: "Some feelings don’t need noise",
    headlinePrefix: "For",
    subheadline:
      "With you, certainty became beautiful. This is not a loud love. It is a lasting one.",
    cta: "Begin",
    chips: ["midnight calm", "champagne warmth", "timeless"],
  },

  why: {
    title: "Why you",
    cards: [
      {
        title: "You bring steadiness",
        body: "You make things feel simple — in the best way. Like life can exhale.",
      },
      {
        title: "You have depth",
        body: "Not the kind that performs. The kind that stays. The kind that builds.",
      },
      {
        title: "You are deliberate",
        body: "In how you care, how you speak, how you choose. It is rare. It is you.",
      },
      {
        title: "You feel like home",
        body: "Not a place. A presence. The one I want to return to.",
      },
      {
        title: "You made love mature",
        body: "You turned intensity into tenderness — and tenderness into strength.",
      },
    ],
  },

  moments: {
    title: "Our moments, quietly",
    items: [
      {
        yearTag: "I",
        title: "The first real conversation",
        body: "When I realized your mind is the kind I want beside mine.",
      },
      {
        yearTag: "II",
        title: "The quiet support",
        body: "When you showed up without needing to be asked.",
      },
      {
        yearTag: "III",
        title: "The small rituals",
        body: "Messages, calls, tiny check-ins — becoming something steady.",
      },
      {
        yearTag: "IV",
        title: "The moment I knew",
        body: "In a world full of almost, you felt like always.",
      },
      {
        yearTag: "V",
        title: "Now",
        body: "Not a grand scene. Just a simple truth, said properly.",
      },
    ],
  },

  gallery: {
    title: "An editorial of us",
    items: [
      {
        label: "A memorable night",
        note: "",
        url: photo1.src,
      },
      {
        label: "A little fancy, us",
        note: "",
        url: photo2.src,
      },
      {
        label: "A promise over candlelight",
        note: "",
        url: photo3.src,
      },
      {
        label: "A trip to remember",
        note: "",
        url: photo4.src,
      },
      {
        label: "Will you be my life?",
        note: "",
        url: photo5.src,
      },
    ],
  },

  changed: {
    title: "What you changed in me",
    lines: [
      "I stopped chasing loud. I started valuing lasting.",
      "I learned that softness can be strong.",
      "I became more patient — with the world, and with myself.",
      "I started building, not just dreaming.",
      "I began imagining a future that feels calm — because you’re in it.",
    ],
  },

  letter: {
    title: "What I needed to say",
    body: [
      "I do not want a love that looks impressive for other people.",
      "I want the kind that feels safe for us — on ordinary days, on hard days, on the days nobody sees.",
      "With you, I feel both challenged and held. It is a rare balance. It is the balance I want.",
      "If forever has a beginning, let it be this: a quiet promise, made with full intention.",
    ],
    signoff: "— With love, always",
  },

  proposal: {
    eyebrow: "",
    title: "Let this be our beginning",
    question: "Will you say yes to us?",
    yesLabel: "Yes — with you",
    noLabel: "Not yet — stay close",
    yesAfter: {
      title: "Then this becomes our beginning.",
      body: "Not loudly. Not for anyone else. Just us — choosing this, gently.",
    },
    noAfter: {
      title: "I understand.",
      body: "No pressure. I would still choose you — with patience, with respect, with steady love.",
    },
  },

  ending: {
    eyebrow: "",
    title: "Now we move forward",
    body:
      "No fireworks. Just that calm, beautiful feeling of knowing — and choosing it anyway.",
    primaryCta: "Read again",
    secondaryCta: "Back to the question",
    footerLine: "For you — and for everything we’re about to build.",
  },
};

const luxuryReasonDetails = [
  {
    label: "Quiet reason",
    visible: "You make things feel simple — in the best way.",
    reveal: "Like life can exhale around you.",
  },
  {
    label: "Kept thought",
    visible: "Not the kind that performs. The kind that stays.",
    reveal: "The kind that builds something real.",
  },
  {
    label: "Read slowly",
    visible: "In how you care, how you speak, how you choose.",
    reveal: "It is rare. It is you.",
  },
  {
    label: "Soft truth",
    visible: "Not a place. A presence.",
    reveal: "The one I want to return to.",
  },
  {
    label: "Always this",
    visible: "Even silence with you has warmth.",
    reveal: "Nothing feels missing.",
  },
];

const luxuryTransformations = [
  {
    title: "I stopped chasing loud.",
    line: "You made quiet feel enough.",
    reveal: "And somehow, stronger.",
  },
  {
    title: "I stopped mistaking softness for weakness.",
    line: "With you, softness became strength.",
    reveal: "The kind that stays.",
  },
  {
    title: "I slowed down.",
    line: "I became more patient — with the world, and with myself.",
    reveal: "Because calm finally had a face.",
  },
  {
    title: "I started building.",
    line: "Not just dreaming. Not just waiting.",
    reveal: "Something real. Something ours.",
  },
  {
    title: "The future became visible.",
    line: "Not abstract anymore.",
    reveal: "Because I could finally see you in it.",
  },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

type Spark = {
  id: string;
  left: number;
  top: number;
  size: number;
  opacity: number;
  delay: number;
};

function ChampagneSparkle({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotionSafe();

  const sparks = useMemo<Spark[]>(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: `spk_${i}_${Math.random().toString(16).slice(2)}`,
      left: (i * 17.6 + 10) % 100,
      top: 18 + ((i * 11.2) % 42),
      size: 2 + (i % 4),
      opacity: 0.28 + (i % 4) * 0.06,
      delay: (i % 10) * 0.015,
    }));
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
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
            background: "rgba(246,232,200,0.90)",
            boxShadow: "0 0 18px rgba(246,232,200,0.26), 0 0 30px rgba(212,180,106,0.14)",
          }}
          initial={{ y: 0, scale: 0.9, opacity: 0 }}
          animate={{ y: [0, -24, 0], scale: [0.95, 1.25, 0.95], opacity: [0, s.opacity, 0] }}
          transition={{ duration: 1.25, delay: s.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

function ChampagneDustBackground() {
  const reducedMotion = useReducedMotionSafe();

  const dust = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => ({
      id: `dust_${i}`,
      left: (i * 13.1 + 4) % 100,
      top: 18 + ((i * 17.2) % 76),
      size: 2 + (i % 4),
      opacity: 0.24 + (i % 4) * 0.045,
      duration: 9 + (i % 7) * 1.6,
      delay: (i % 9) * 0.38,
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <motion.div
        className="absolute left-[-20%] top-[18%] h-px w-[140%] bg-gradient-to-r from-transparent via-[#F2DDAA]/55 to-transparent"
        animate={{ x: ["-10%", "10%", "-10%"], opacity: [0.24, 0.62, 0.24] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {dust.map((item) => (
        <motion.span
          key={item.id}
          className="absolute rounded-full bg-[#F6E8C8] shadow-[0_0_18px_rgba(246,232,200,0.42)]"
          style={{ left: `${item.left}%`, top: `${item.top}%`, width: item.size, height: item.size, opacity: item.opacity }}
          animate={{ y: [0, -54, 0], opacity: [item.opacity * 0.65, Math.min(0.5, item.opacity + 0.16), item.opacity * 0.65] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
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

function LuxuryBackground() {
  const reducedMotion = useReducedMotionSafe();

  const specks = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: `sp_${i}`,
        left: (i * 11 + 7) % 100,
        top: (i * 17 + 13) % 100,
        size: 1 + (i % 3),
        opacity: 0.10 + (i % 4) * 0.05,
        duration: 10 + (i % 6) * 2.5,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#070204]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A0612] via-[#12040A] to-[#050204]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(190,24,93,0.24),transparent_54%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(214,185,130,0.20),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_36%_88%,rgba(76,5,25,0.42),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,rgba(246,232,200,0.10),transparent_65%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,6,18,0)_0%,rgba(42,6,18,0.46)_55%,rgba(5,2,4,0.86)_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="absolute inset-0 opacity-[0.13] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_2px,transparent_4px)]" />

      {reducedMotion
        ? null
        : specks.map((s, i) => (
            <motion.span
              key={s.id}
              className="absolute rounded-full bg-[#F6E8C8]"
              style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, opacity: s.opacity }}
              animate={{ opacity: [s.opacity, Math.min(0.32, s.opacity + 0.18), s.opacity], scale: [1, 1.2, 1] }}
              transition={{ duration: s.duration, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#050204]/80 to-transparent" />
    </div>
  );
}

function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[#D6B982]/20 bg-[#1A0710]/84 p-5 shadow-[0_26px_90px_rgba(0,0,0,0.62)] backdrop-blur-xl sm:p-7",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(246,232,200,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(120,75,38,0.10),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent)]" />
      <div className="relative">{children}</div>
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
  const reducedMotion = useReducedMotionSafe();
  const isEnding = id === "ending";
  return (
    <section id={id} className="relative z-10 scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
      {isEnding ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D070B] via-transparent to-[#050507]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_20%,rgba(211,175,109,0.14),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_55%,rgba(136,19,55,0.14),transparent_62%)]" />
          {reducedMotion ? null : (
            <>
              <motion.div
                className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#7C4A22]/10 blur-3xl"
                initial={{ x: 0, y: 0, opacity: 0.35 }}
                animate={{ x: [0, 18, 0], y: [0, 10, 0], opacity: [0.28, 0.38, 0.28] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-[#D6B982]/10 blur-3xl"
                initial={{ x: 0, y: 0, opacity: 0.35 }}
                animate={{ x: [0, -16, 0], y: [0, -10, 0], opacity: [0.26, 0.36, 0.26] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}
        </div>
      ) : null}

      <div className="relative mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7"
        >
          {eyebrow.trim() ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mb-2 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-[#D6B982]"
            >
              {eyebrow}
            </motion.div>
          ) : null}
          <RevealHeading className="font-serif text-balance text-3xl font-light leading-[1.08] tracking-tight text-[#FFF7EA] sm:text-4xl">
            {title}
          </RevealHeading>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

type Answer = "yes" | "no" | null;

export default function ProposalLuxuryPage() {
  const [musicOn, setMusicOn] = useState(true);
  const [musicBlocked, setMusicBlocked] = useState(false);
  const [musicNeedsUnmute, setMusicNeedsUnmute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answer, setAnswer] = useState<Answer>(null);
  const [sparkleOn, setSparkleOn] = useState(false);
  const [promiseOpen, setPromiseOpen] = useState(false);
  const [openReason, setOpenReason] = useState<number | null>(0);
  const [openChange, setOpenChange] = useState<number | null>(0);
  const reducedMotion = useReducedMotionSafe();
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

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function triggerSparkle() {
    setSparkleOn(true);
    window.setTimeout(() => setSparkleOn(false), 1300);
  }

  const handleTuneButton = () => {
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

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#070204] text-white">
      <LuxuryBackground />
      <ChampagneDustBackground />
      <ChampagneSparkle active={sparkleOn} />
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

      <section id="hero" className="relative z-10 px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3A0717] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(214,185,130,0.24),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_55%,rgba(190,24,93,0.22),transparent_62%)]" />
          <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.030)_0px,rgba(255,255,255,0.030)_1px,transparent_2px,transparent_4px)]" />
        </div>
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-8">
            <motion.div
              initial={{ y: 18 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="font-sans text-xs font-light uppercase tracking-[0.15em] text-[#F2DDAA] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">{templateData.hero.eyebrow}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {templateData.hero.chips.map((chip, index) => (
                  <motion.span
                    key={chip}
                    initial={{ y: 8 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-full border border-[#D6B982]/42 bg-[#F6E8C8]/16 px-3 py-1 font-sans text-[10px] font-light uppercase tracking-widest text-[#FFF7EA] shadow-[0_10px_34px_rgba(0,0,0,0.22)]"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>

              <h1 className="mt-5 font-serif text-balance text-[2.8rem] font-light leading-[0.98] tracking-tight text-[#FFF7EA] drop-shadow-[0_8px_35px_rgba(0,0,0,0.45)] sm:text-[4.7rem]">
                {templateData.hero.headlinePrefix}{" "}
                <motion.span
                  initial={{ y: 8 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-gradient-to-r from-[#FFF7EA] via-[#D6B982] to-[#9A6A36] bg-clip-text text-transparent"
                >
                  {templateData.partnerName}
                </motion.span>
                <span className="text-[#FFF7EA]">.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-pretty font-sans text-base font-light leading-relaxed text-[#FFF7EA]/92 sm:text-lg sm:leading-8">
                {templateData.hero.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    triggerSparkle();
                    scrollTo("letter");
                  }}
                  className="rounded-2xl bg-[#F6E8C8] px-5 py-3 font-sans text-sm font-medium text-[#100B0B] shadow-[0_22px_90px_rgba(246,232,200,0.14)] transition hover:-translate-y-0.5 hover:bg-[#FFF7EA]"
                >
                  Read this slowly
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerSparkle();
                    scrollTo("proposal");
                  }}
                  className="rounded-2xl border border-[#D6B982]/24 bg-white/[0.06] px-5 py-3 font-sans text-sm font-medium text-[#FFF7EA] transition hover:-translate-y-0.5 hover:bg-[#F6E8C8]/10"
                >
                  The question
                </button>
              </div>
              <motion.button
                type="button"
                onClick={() => scrollTo("gallery")}
                initial={{ y: 8 }}
                animate={reducedMotion ? { y: 0 } : { y: [0, 7, 0] }}
                transition={reducedMotion ? { duration: 0.4 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-10 inline-flex items-center gap-2 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-[#D6B982]"
              >
                view the editorial
                <span aria-hidden>↓</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionShell id="gallery" eyebrow="" title={templateData.gallery.title}>
        <div className="grid gap-3 lg:grid-cols-12">
          <motion.div
            initial={{ y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-12"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#D6B982]/18 bg-[#1A0710]/82 p-1 shadow-[0_26px_90px_rgba(0,0,0,0.65)] backdrop-blur mx-auto max-w-md">
              <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(246,232,200,1)_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="mx-auto max-w-md">
                {[templateData.gallery.items[0]].map((p, idx) => (
                  <motion.div
                    key={`${p.label}_${idx}`}
                    initial={{ y: 12, scale: 0.985 }}
                    whileInView={{ y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
                    transition={{ duration: 0.65, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="group box-border w-full max-w-full overflow-hidden rounded-2xl bg-[#100B0B]/70 p-0 shadow-[0_18px_70px_rgba(0,0,0,0.45)]"
                  >
                    <div className="relative aspect-[2/3] w-full max-w-full overflow-hidden rounded-xl bg-white/[0.04]">
                      <img
                        src={p.url}
                        alt={p.label}
                        className="block h-full w-full object-cover object-center opacity-90 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                        loading="lazy"
                      />
                    </div>
                    <p className="px-2 pb-2 pt-3 text-center text-[13px] font-semibold leading-snug text-[#F2DDAA]">{p.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </SectionShell>

      <SectionShell id="why" eyebrow="" title={templateData.why.title}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {templateData.why.cards.map((c, idx) => (
            <motion.div
              key={`${c.title}_${idx}`}
              variants={cardFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
              className="lg:col-span-1"
            >
              <button
                type="button"
                onClick={() => {
                  setOpenReason(openReason === idx ? null : idx);
                  triggerSparkle();
                }}
                className={cn(
                  "group relative h-full w-full overflow-hidden rounded-3xl border p-4 pl-6 text-left shadow-[0_22px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl transition sm:p-5 sm:pl-7 lg:min-h-[200px]",
                  idx === 0
                    ? "border-[#D6B982]/28 bg-[linear-gradient(145deg,rgba(246,232,200,0.12),rgba(255,255,255,0.055))] shadow-[0_28px_110px_rgba(212,180,106,0.10)]"
                    : "border-[#D6B982]/16 bg-[#1A0710]/78 hover:bg-[#240914]/86",
                  openReason === idx ? "ring-1 ring-[#F2DDAA]/45 shadow-[0_30px_120px_rgba(214,185,130,0.14)]" : "",
                )}
                aria-expanded={openReason === idx}
              >
                <motion.div aria-hidden className="absolute bottom-5 left-4 top-5 w-px origin-top bg-[#D6B982]/55" variants={borderDraw} />
                <div className="flex items-center gap-2">
                  <div className="rounded-full border border-[#D6B982]/28 bg-[#D6B982]/12 px-3 py-1 font-sans text-[10px] font-light uppercase tracking-widest text-[#F2DDAA]">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <span className="font-sans text-[10px] font-light uppercase tracking-widest text-[#D6B982]/85">— {luxuryReasonDetails[idx]?.label}</span>
                </div>
                <motion.div
                  className="mt-3 h-px w-full bg-gradient-to-r from-[#D6B982]/55 via-[#D6B982]/14 to-transparent"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: idx * 0.045, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="mt-3 font-sans text-base font-medium text-[#FFF7EA]">{c.title}</div>
                <div className="mt-2 font-sans text-sm font-light leading-7 text-[#FFF7EA]/84">{luxuryReasonDetails[idx]?.visible ?? c.body}</div>
                <div className="mt-3 flex justify-end">
                  <span className="rounded-full border border-[#D6B982]/14 bg-black/16 px-2.5 py-1 font-sans text-[10px] font-medium text-[#D6B982]/78">Read deeper</span>
                </div>
                {openReason === idx ? (
                  <motion.div
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 rounded-2xl border border-[#D6B982]/22 bg-[#F6E8C8]/10 px-4 py-3 font-sans text-sm font-light leading-7 text-[#FFF7EA]"
                  >
                    {luxuryReasonDetails[idx]?.reveal}
                  </motion.div>
                ) : null}
              </button>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <section className="relative z-10 overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10">
        <motion.div
          initial={{ y: 18, scale: 0.99 }}
          whileInView={{ y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto grid max-w-5xl gap-4 overflow-hidden rounded-[32px] border border-[#D6B982]/18 bg-[#1A0710]/84 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl md:grid-cols-[0.9fr_1.1fr] md:items-center"
        >
          <div className="box-border w-full max-w-full overflow-hidden rounded-[26px]">
            <div className="relative aspect-[2/3] w-full max-w-full overflow-hidden rounded-[26px]">
              <img
                src={templateData.gallery.items[3]?.url}
                alt={templateData.gallery.items[3]?.label}
                className="block h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <p className="px-3 py-3 text-center text-[13px] font-semibold leading-snug text-[#F2DDAA]">
              {templateData.gallery.items[3]?.label}
            </p>
          </div>
          <div className="p-3 sm:p-5">
            <div className="font-sans text-[11px] font-light uppercase tracking-[0.2em] text-[#D6B982]">editorial pause</div>
            <div className="mt-3 font-serif text-2xl font-light tracking-tight text-[#FFF7EA]">A quiet frame before the promise.</div>
            <p className="mt-3 font-sans text-sm font-light leading-7 text-[#FFF7EA]/80">
              The page slows down here, because some promises should not feel rushed.
            </p>
          </div>
        </motion.div>
      </section>

      <SectionShell id="moments" eyebrow="" title={templateData.moments.title}>
        <div className="relative">
          <div className="absolute bottom-8 left-5 top-4 w-px bg-gradient-to-b from-[#D6B982]/20 via-[#D6B982]/55 to-transparent sm:left-1/2" />
          {templateData.moments.items.map((m, idx) => (
            <motion.div
              key={`${m.yearTag}_${idx}`}
              variants={cardFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
              className={cn("relative mb-4 pl-12 sm:w-1/2 sm:pl-0", idx % 2 === 0 ? "sm:pr-8" : "sm:ml-auto sm:pl-8")}
            >
              <div
                className={cn(
                  "absolute left-3 top-6 z-10 grid h-5 w-5 place-items-center rounded-full border border-[#D6B982]/35 bg-[#1A0710] shadow-[0_0_30px_rgba(212,180,106,0.18)] sm:left-auto",
                  idx % 2 === 0 ? "sm:-right-2.5" : "sm:-left-2.5",
                )}
              >
                <div className={cn("h-2 w-2 rounded-full", idx === templateData.moments.items.length - 1 ? "bg-[#F2DDAA]" : "bg-[#D6B982]/70")} />
              </div>
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl border p-5 shadow-[0_22px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-6",
                  idx === templateData.moments.items.length - 1
                    ? "border-[#D6B982]/30 bg-[linear-gradient(145deg,rgba(246,232,200,0.13),rgba(255,255,255,0.055))] shadow-[0_28px_110px_rgba(212,180,106,0.12)]"
                    : "border-[#D6B982]/16 bg-[#1A0710]/78",
                )}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D6B982]/45 to-transparent" />
                <div className="text-[11px] font-bold tracking-[0.26em] text-[#D6B982]">chapter {m.yearTag}</div>
                <div className="mt-2 text-lg font-semibold text-[#FFF7EA]">{m.title}</div>
                <div className="mt-2 text-sm font-medium leading-7 text-[#FFF7EA]/78">{m.body}</div>
                </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ y: 18, scale: 0.99 }}
            whileInView={{ y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 overflow-hidden rounded-[30px] border border-[#D6B982]/20 bg-[#1A0710]/86 p-3 shadow-[0_26px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:mx-auto lg:max-w-md"
          >
            <div className="box-border w-full max-w-md overflow-hidden rounded-[24px]">
              <div className="relative aspect-[2/3] w-full max-w-md overflow-hidden rounded-[24px]">
                <img src={templateData.gallery.items[2]?.url} alt={templateData.gallery.items[2]?.label} className="block h-full w-full object-cover object-center" loading="lazy" />
              </div>
              <p className="px-3 py-3 text-center text-[13px] font-semibold leading-snug text-[#F2DDAA]">
                {templateData.gallery.items[2]?.label}
              </p>
            </div>
          </motion.div>
        </div>
      </SectionShell>

      <SectionShell id="changed" eyebrow="" title={templateData.changed.title}>
        <GlassCard className="bg-[linear-gradient(145deg,rgba(246,232,200,0.08),rgba(255,255,255,0.035))]">
          <div className="mb-5 h-px w-full bg-gradient-to-r from-[#D6B982]/50 via-[#D6B982]/15 to-transparent" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {luxuryTransformations.map((item, idx) => (
                <motion.div
                  key={`${item.title}_${idx}`}
                  initial={{ y: 10, scale: 0.99 }}
                  whileInView={{ y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
                  transition={{ duration: 0.5, delay: idx * 0.025, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpenChange(openChange === idx ? null : idx);
                      triggerSparkle();
                    }}
                    className={cn(
                      "group w-full rounded-2xl border px-4 py-3 text-left shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5",
                      openChange === idx
                        ? "border-[#D6B982]/35 bg-[#F6E8C8]/12 ring-1 ring-[#F2DDAA]/30"
                        : "border-[#D6B982]/16 bg-black/18 hover:bg-black/24",
                    )}
                    aria-expanded={openChange === idx}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 text-2xl font-semibold leading-none text-[#D6B982]">“</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-base font-semibold leading-6 text-[#FFF7EA] sm:text-lg">{item.title}</div>
                        <motion.div
                          aria-hidden
                          className="mt-3 h-px w-16 bg-gradient-to-r from-[#F2DDAA] to-transparent"
                          initial={{ scaleX: 0, transformOrigin: "left" }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.55, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <div className="mt-3 text-[15px] font-medium leading-7 text-[#FFF7EA]/86">{item.line}</div>
                      </div>
                    </div>
                    {openChange === idx ? (
                      <motion.div
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 rounded-xl border border-[#D6B982]/18 bg-[#F6E8C8]/10 px-3 py-2 text-[15px] font-semibold leading-7 text-[#F2DDAA]"
                      >
                        {item.reveal}
                      </motion.div>
                    ) : null}
                  </button>
                </motion.div>
              ))}
          </div>
        </GlassCard>
      </SectionShell>

      <section className="relative z-10 overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10">
        <motion.div
          initial={{ y: 16, scale: 0.99 }}
          whileInView={{ y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[26px] border border-[#D6B982]/18 bg-black/22 p-3 shadow-[0_22px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:max-w-md"
        >
          <div className="box-border w-full max-w-full overflow-hidden rounded-[20px]">
            <div className="relative aspect-[2/3] w-full max-w-md overflow-hidden rounded-[20px]">
              <img src={templateData.gallery.items[1]?.url} alt={templateData.gallery.items[1]?.label} className="block h-full w-full object-cover object-center" loading="lazy" />
            </div>
            <p className="px-3 py-3 text-center text-[13px] font-semibold leading-snug text-[#F2DDAA]">
              {templateData.gallery.items[1]?.label}
            </p>
          </div>
        </motion.div>
      </section>

      <SectionShell id="letter" eyebrow="" title={templateData.letter.title}>
        <GlassCard className="relative overflow-hidden bg-[linear-gradient(145deg,rgba(246,232,200,0.11),rgba(255,255,255,0.045))]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(246,232,200,0.12),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#D6B982]/55 to-transparent" />
          <div className="pointer-events-none absolute left-5 top-4 text-7xl font-semibold leading-none text-[#F6E8C8]/10">“</div>
          {!promiseOpen ? (
            <motion.button
              type="button"
              onClick={() => {
                setPromiseOpen(true);
                triggerSparkle();
              }}
              whileTap={{ scale: 0.985 }}
              className="relative block w-full rounded-[28px] border border-[#D6B982]/18 bg-black/18 p-5 text-left shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition hover:bg-black/24 sm:p-6"
              aria-expanded={promiseOpen}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#D6B982]">sealed promise</div>
              <div className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF7EA]">Some words should be opened slowly.</div>
              <div className="mt-5 inline-flex rounded-2xl bg-[#F6E8C8] px-4 py-3 text-sm font-bold text-[#100B0B]">Open the promise</div>
            </motion.button>
          ) : (
            <motion.div
              initial={{ y: 14, scale: 0.99 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="relative space-y-4 rounded-[28px] border border-[#D6B982]/45 bg-[#FFF7EA] p-5 text-[#16070B] shadow-[0_28px_100px_rgba(214,185,130,0.22)] sm:p-6"
            >
              {templateData.letter.body.map((p, idx) => (
                <motion.p
                  key={idx}
                  initial={{ y: 8 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.38, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="font-letter text-pretty text-[15px] font-normal leading-[1.9] text-[#2a1a10]"
                >
                  {p}
                </motion.p>
              ))}
              <motion.div
                initial={{ y: 8 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.38, delay: templateData.letter.body.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="pt-4"
              >
                <div className="font-sign text-lg leading-tight text-[#8B1A1A]">{templateData.letter.signoff}</div>
                <div className="font-letter mt-1 text-xl font-medium leading-tight text-[#2a1a10]">{templateData.fromName}</div>
              </motion.div>
              <button
                type="button"
                onClick={() => setPromiseOpen(false)}
                className="mt-2 rounded-2xl border border-[#5B0F24]/15 bg-[#5B0F24]/8 px-4 py-2 text-xs font-bold text-[#5B0F24] transition hover:bg-[#5B0F24]/12"
              >
                Close promise
              </button>
            </motion.div>
          )}
        </GlassCard>
      </SectionShell>

      <section id="proposal" className="relative z-10 scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:py-20">
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7"
          >
            {templateData.proposal.eyebrow.trim() ? (
              <div className="mb-2 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-[#D6B982]">{templateData.proposal.eyebrow}</div>
            ) : null}
            <RevealHeading className="font-serif text-balance text-3xl font-light tracking-tight text-[#FFF7EA] sm:text-5xl">{templateData.proposal.title}</RevealHeading>
          </motion.div>

          <div className="grid gap-4">
            <GlassCard className="relative border-[#D6B982]/26 bg-[linear-gradient(145deg,rgba(246,232,200,0.10),rgba(17,16,20,0.88))] shadow-[0_30px_120px_rgba(212,180,106,0.14)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(246,232,200,0.20),transparent_62%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(120,75,38,0.12),transparent_65%)]" />
              <div className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
                <div className="mb-6 w-full max-w-full overflow-hidden rounded-[28px] border border-[#D6B982]/20 bg-black/30 p-3 lg:mx-auto lg:mb-0 lg:max-w-[420px]">
                  <div className="box-border w-full max-w-full overflow-hidden rounded-[22px]">
                    <div className="relative aspect-[2/3] w-full max-w-full overflow-hidden rounded-[22px]">
                      <img
                        src={templateData.gallery.items[4]?.url}
                        alt={templateData.gallery.items[4]?.label}
                        className="block h-full w-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                    <p className="px-3 py-3 text-center text-[13px] font-semibold leading-snug text-[#F2DDAA]">
                      The moment I wanted to ask properly.
                    </p>
                  </div>
                </div>
                <div className="lg:flex lg:h-full lg:flex-col lg:justify-center lg:text-left">
                  <div className="font-serif text-sm font-light text-[#F2DDAA]">{templateData.partnerName},</div>
                  <div className="mt-3 font-serif text-balance text-4xl font-light leading-[1.08] tracking-tight text-[#FFF7EA] sm:text-5xl">
                    {templateData.proposal.question}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setAnswer("yes");
                        triggerSparkle();
                      }}
                      className="w-full rounded-2xl bg-[#F6E8C8] px-5 py-3 font-sans text-sm font-medium text-[#100B0B] shadow-[0_18px_70px_rgba(246,232,200,0.16)] transition hover:-translate-y-0.5 hover:bg-[#FFF7EA] sm:w-auto"
                    >
                      {templateData.proposal.yesLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAnswer("no");
                        triggerSparkle();
                      }}
                      className="w-full rounded-2xl border border-[#D6B982]/24 bg-white/[0.06] px-5 py-3 font-sans text-sm font-medium text-[#FFF7EA] transition hover:-translate-y-0.5 hover:bg-[#F6E8C8]/10 sm:w-auto"
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
                          "rounded-2xl border border-[#D6B982]/18 bg-black/22 p-4",
                          answer === "yes" ? "shadow-[0_20px_80px_rgba(246,232,200,0.14)]" : "",
                        )}
                      >
                        <div className="text-sm font-bold text-[#FFF7EA]">
                          {answer === "yes" ? "Then let this be our quiet beginning." : templateData.proposal.noAfter.title}
                        </div>
                        <div className="mt-2 text-sm font-medium leading-7 text-[#FFF7EA]/82">
                          {answer === "yes" ? "Chosen, gently. Fully." : templateData.proposal.noAfter.body}
                        </div>
                        {answer === "yes" ? (
                          <div className="mt-3 font-sans text-lg font-light leading-8 text-[#F2DDAA] sm:text-xl">{templateData.proposal.yesAfter.body}</div>
                        ) : null}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>

            
          </div>
        </div>
      </section>

      <SectionShell id="ending" eyebrow={templateData.ending.eyebrow} title={templateData.ending.title}>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard className="relative overflow-hidden border-[#D6B982]/24 bg-[linear-gradient(145deg,rgba(246,232,200,0.11),rgba(17,16,20,0.88))]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D6B982]/14 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-4 h-52 w-52 rounded-full bg-[#7C2D3B]/16 blur-3xl" />
            {reducedMotion ? null : (
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <motion.span
                    key={item}
                    className="absolute rounded-full bg-[#F6E8C8]"
                    style={{
                      left: `${12 + item * 14}%`,
                      top: `${18 + (item % 3) * 18}%`,
                      width: 2 + (item % 3),
                      height: 2 + (item % 3),
                      opacity: 0.34,
                    }}
                    animate={{ opacity: [0.18, 0.5, 0.18], scale: [1, 1.35, 1] }}
                    transition={{ duration: 3.8 + item * 0.35, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            )}
            <div className="relative">
              <div className="mb-3 inline-flex rounded-full border border-[#D6B982]/22 bg-[#F6E8C8]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.20em] text-[#D6B982]">
                afterglow
              </div>
              <p className="text-pretty text-base font-medium leading-7 text-[#FFF7EA]/84 sm:text-lg sm:leading-8">{templateData.ending.body}</p>
            </div>

            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  triggerSparkle();
                  scrollTo("hero");
                }}
                className="rounded-2xl bg-[#F6E8C8] px-5 py-3 text-sm font-bold text-[#100B0B] transition hover:-translate-y-0.5 hover:bg-[#FFF7EA]"
              >
                {templateData.ending.primaryCta}
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerSparkle();
                  scrollTo("proposal");
                }}
                className="rounded-2xl border border-[#D6B982]/24 bg-white/[0.06] px-5 py-3 text-sm font-bold text-[#FFF7EA] transition hover:-translate-y-0.5 hover:bg-[#F6E8C8]/10"
              >
                {templateData.ending.secondaryCta}
              </button>
            </div>
          </GlassCard>

          <div className="rounded-3xl border border-[#D6B982]/16 bg-[#1A0710]/82 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="text-[11px] font-bold tracking-[0.26em] text-[#D6B982]">afterword</div>
            <div className="mt-2 text-lg font-semibold text-[#FFF7EA]">Come closer, {templateData.partnerName}.</div>
            <div className="mt-2 text-sm font-medium leading-7 text-[#FFF7EA]/78">Let the rest be lived — slowly, beautifully.</div>
          </div>
        </div>
      </SectionShell>

      <DemoStickyCTA occasion="Proposal" templateName="Proposal Luxury Letter" packageId="premium" priceText="From ₹1,499" recipientName={templateData.partnerName} demoUrl="/proposal-luxury" />
      <div className="h-24" />
      <footer className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-5xl border-t border-white/10 pt-8 text-center">
          <div className="text-xs font-medium text-[#FFF7EA]/70">{templateData.ending.footerLine}</div>
        </div>
      </footer>
    </main>
  );
}
