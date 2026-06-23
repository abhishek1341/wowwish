"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

import DemoStickyCTA from "@/components/wowwish/DemoStickyCTA";
import { RevealHeading, cardFadeUp } from "@/components/wowwish/scrollReveal";
import image1 from "./image_1_school.png";
import image2 from "./image_2_cricket.png";
import image3 from "./image_3_travel.png";
import image4 from "./image_4_tea.png";
import image5 from "./image_5_cake.png";
import image6 from "./image_6_pizza.png";

type TemplateData = {
  // CUSTOMIZE: friend’s name
  friendName: string;
  // CUSTOMIZE: your name (sign off)
  fromName: string;
  hero: {
    headlinePrefix: string;
    subheadline: string;
    cta: string;
    badges: string[];
  };
  intro: {
    title: string;
    body: string;
  };
  iconicReasons: { title: string; body: string; icon: string }[];
  timeline: { tag: string; title: string; body: string }[];
  gallery: {
    // CUSTOMIZE: replace these with your real photo URLs later
    photos: { label: string; hint: string; src: StaticImageData }[];
  };
  insideJokes: {
    title: string;
    lines: string[];
  };
  letter: {
    title: string;
    body: string;
    ps: string;
  };
  finale: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const templateData: TemplateData = {
  friendName: "Raj",
  fromName: "Abhi",
  hero: {
    headlinePrefix: "Happy Birthday, ",
    subheadline:
      "Aaj ka mood: balloons, cake, photos, music, and full celebration energy.",
    cta: "Start the birthday surprise",
    badges: ["party mode", "cake ready", "photo story", "birthday sparkle"],
  },
  intro: {
    title: "Today is officially celebration mode",
    body:
      "This page is made for the person who deserves more than a normal birthday text. Scroll through the photos, tap the surprise, cut the cake, and keep the celebration replayable.",
  },
  iconicReasons: [
    {
      icon: "🎈",
      title: "Instant party energy",
      body: "The kind of presence that makes a room feel brighter.",
    },
    {
      icon: "✨",
      title: "Glow-up year loading",
      body: "New age, better stories, louder wins.",
    },
    {
      icon: "🎁",
      title: "Giftable moment",
      body: "A wish that feels personal, fun, and saved forever.",
    },
    {
      icon: "🎂",
      title: "Cake-worthy main character",
      body: "Because today everything should revolve around them.",
    },
    {
      icon: "📸",
      title: "Photo story ready",
      body: "Memories, smiles, and tiny moments in one happy scroll.",
    },
  ],
  timeline: [
    {
      tag: "origin story",
      title: "Jab hum jigri bane",
      body: "Ek hangout, phir bas… jigri since.",
    },
    {
      tag: "inside joke",
      title: "Jokes only we get",
      body: "Jo kisi ko samajh nahi aata.",
    },
    {
      tag: "trip memory",
      title: "Woh trip jiska abhi tak zikr hai",
      body: "Plan zero. Story 100.",
    },
    {
      tag: "real one",
      title: "Tu aaya — bas wahi kaafi tha",
      body: "Scene serious hua, tu side mein.",
    },
    {
      title: "Tera growth dekh ke proud",
      tag: "proud moment",
      body: "Bas aise hi aage. Main side mein hoon.",
    },
  ],
  gallery: {
    photos: [
      { label: "Birthday poster moment", hint: "Where the story started", src: image1 },
      { label: "Cricket, chaos, memories", hint: "Same madness, always", src: image2 },
      { label: "Trip memory locked", hint: "Plan random, story permanent", src: image3 },
      { label: "Chai, baarish, birthday mood", hint: "Best talks happen here", src: image4 },
      { label: "Cake time officially", hint: "Wish first, cake next", src: image5 },
      { label: "Treat scene pending", hint: "Birthday rule: food first", src: image6 },
    ],
  },
  insideJokes: {
    title: "Birthday message board",
    lines: [
      "Today is for cake, photos, wishes, and zero boring energy.",
      "Another year older, but the birthday sparkle stays undefeated.",
      "May every plan turn into a memory worth saving.",
      "Good people deserve loud wishes and soft happiness.",
      "This page is a tiny reminder: you are celebrated.",
    ],
  },
  letter: {
    title: "A little birthday note",
    body:
      "Wishing you a year full of health, peace, laughter, better days, and the kind of happiness that feels easy. You deserve to feel celebrated today and remembered always.",
    ps: "P.S. Cake, photos, and one more wish are still pending.",
  },
  finale: {
    title: "Birthday celebration unlocked.",
    body:
      "Replay the surprise, save the photos, cut the cake again, and keep the birthday vibe alive.",
    primaryCta: "Replay the surprise",
    secondaryCta: "Birthday wish burst",
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

type ConfettiPiece = {
  id: string;
  leftPct: number;
  rotate: number;
  color: string;
  delay: number;
};

function ConfettiBurst({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotionSafe();

  const pieces = useMemo<ConfettiPiece[]>(() => {
    const colors = [
      "#FB7185",
      "#F472B6",
      "#A78BFA",
      "#60A5FA",
      "#34D399",
      "#FBBF24",
    ];

    return Array.from({ length: 42 }).map((_, i) => ({
      id: `c_${i}_${Math.random().toString(16).slice(2)}`,
      leftPct: (i * 7.7) % 100,
      rotate: (i * 37) % 360,
      color: colors[i % colors.length],
      delay: (i % 10) * 0.01,
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
            y: [0, 540, 860],
            x: [0, (p.leftPct % 2 ? 28 : -28), 0],
            opacity: [0, 1, 0],
            rotate: [p.rotate, p.rotate + 260],
          }}
          transition={{ duration: 1.6, delay: p.delay, ease: [0.12, 0, 0.39, 0.97] }}
        />
      ))}
    </div>
  );
}

function BirthdayBackground() {
  const reducedMotion = useReducedMotionSafe();

  const floaties = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => {
        const emoji = ["⭐", "✨", "🎈", "🎉", "🪩", "🌈"][i % 6];
        const size = 14 + (i % 6) * 5;
        const left = (i * 17 + 9) % 100;
        const startY = ((i * 13) % 120) - 15;
        const duration = 18 + (i % 6) * 3;
        return { id: `f_${i}`, emoji, size, left, startY, duration };
      }),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF7D6_0%,#FFE2A8_30%,#FFD3E2_62%,#E7F8FF_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(255,99,71,0.25),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(34,211,238,0.30),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_88%,rgba(124,58,237,0.16),transparent_48%)]" />

      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#FF6B35]/18 blur-3xl" />
      <div className="absolute -right-24 top-24 h-[26rem] w-[26rem] rounded-full bg-[#22D3EE]/18 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#FFD23F]/24 blur-3xl" />

      <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(#3B0B2E_1px,transparent_1px)] [background-size:18px_18px]" />

      {reducedMotion
        ? null
        : floaties.map((f, i) => (
            <motion.div
              key={f.id}
              className="absolute"
              style={{ left: `${f.left}%`, top: 0, fontSize: `${f.size}px` }}
              initial={{ y: `${f.startY}vh`, opacity: 0.65, rotate: -8 }}
              animate={{
                y: "120vh",
                x: [0, i % 2 ? 18 : -14, 0],
                rotate: [-8, 8, -6],
                opacity: [0.65, 0.65, 0],
              }}
              transition={{ duration: f.duration, repeat: Infinity, ease: "linear" }}
            >
              <span className="drop-shadow-[0_14px_30px_rgba(0,0,0,0.35)]">{f.emoji}</span>
            </motion.div>
          ))}
    </div>
  );
}

function SectionShell({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 scroll-mt-20 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ y: 10 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          {eyebrow ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#F97316]"
            >
              {eyebrow}
            </motion.div>
          ) : null}
          <RevealHeading className="max-w-full whitespace-normal break-words text-balance text-3xl font-black leading-tight tracking-tight text-[#3B0B2E] sm:text-5xl">
            {title}
          </RevealHeading>
        </motion.div>

        {children}
      </div>
    </section>
  );
}

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/80 bg-white/68 p-5 shadow-[0_22px_70px_rgba(249,115,22,0.12)] backdrop-blur-xl sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function BirthdayPage() {
  const [confettiOn, setConfettiOn] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [giftOpen, setGiftOpen] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);

  const reducedMotion = useReducedMotionSafe();

  const data = templateData;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fadeTimerRef = useRef<number | null>(null);

  function clearFadeTimer() {
    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }

  function fadeTo(target: number, { thenPause }: { thenPause?: boolean } = {}) {
    const a = audioRef.current;
    if (!a) return;
    clearFadeTimer();

    const step = 0.03;
    fadeTimerRef.current = window.setInterval(() => {
      const current = a.volume;
      const next = current < target ? Math.min(target, current + step) : Math.max(target, current - step);
      a.volume = next;
      if (next === target) {
        clearFadeTimer();
        if (thenPause) {
          a.pause();
        }
      }
    }, 80);
  }

  function startMusic() {
    const a = audioRef.current;
    if (a) a.muted = false;
    setMusicOn(true);
  }

  function stopMusic() {
    setMusicOn(false);
  }

  function replaySurprise() {
    setGiftOpen(false);
    setCakeCut(false);
    triggerConfetti();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    if (!musicOn) {
      fadeTo(0, { thenPause: true });
      window.setTimeout(() => {
        if (audioRef.current?.paused === false) return;
        a.currentTime = 0;
      }, 420);
      return;
    }

    a.loop = true;
    a.volume = 0;
    void (async () => {
      try {
        a.muted = false;
        await a.play();
        fadeTo(0.3);
      } catch {
        try {
          a.muted = true;
          await a.play();
          fadeTo(0.3);
        } catch {
          setMusicOn(false);
        }
      }
    })();
  }, [musicOn]);

  useEffect(() => {
    return () => {
      clearFadeTimer();
      const a = audioRef.current;
      if (!a) return;
      a.pause();
    };
  }, []);

  const navItems = useMemo(
    () =>
      [
        { id: "intro", label: "Intro" },
        { id: "reasons", label: "Iconic" },
        { id: "gallery", label: "Photos" },
        { id: "timeline", label: "Yaadein" },
        { id: "gift", label: "Gift" },
        { id: "cake", label: "Cake" },
        { id: "roasts", label: "Jokes" },
        { id: "letter", label: "Real Talk" },
        { id: "finale", label: "Celebrate" },
      ] as const,
    [],
  );

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function triggerConfetti() {
    setConfettiOn(true);
    window.setTimeout(() => setConfettiOn(false), 1700);
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#FFF7D6] text-[#3B0B2E]">
      <BirthdayBackground />
      <ConfettiBurst active={confettiOn} />

      <audio ref={audioRef} src="/assets/birthday-bg-music.mp3" preload="auto" playsInline />

      <header className="hidden" />

      <motion.button
        type="button"
        onClick={() => {
          if (musicOn) stopMusic();
          else startMusic();
        }}
        whileTap={reducedMotion ? undefined : { scale: 0.98 }}
        className="ww-music-button fixed bottom-4 right-4 z-30 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#EC4899] to-[#22D3EE] p-[1px] shadow-[0_18px_60px_rgba(249,115,22,0.22)] backdrop-blur-xl"
        aria-label={musicOn ? "Music On" : "Music Off"}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/82 px-3.5 py-2 text-xs font-black text-[#3B0B2E] transition hover:bg-white">
          <span aria-hidden>{musicOn ? "🔊" : "🎵"}</span>
          <span>{musicOn ? "Music On" : "Music Off"}</span>
        </span>
      </motion.button>

      <div id="top" />

      <section className="relative z-10 px-4 pb-6 pt-10 sm:px-6 sm:pb-10 sm:pt-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="lg:flex lg:min-h-[520px] lg:flex-col lg:items-start lg:justify-center">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-2 lg:mb-6"
              >
                {data.hero.badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/66 px-2.5 py-1 text-[11px] font-black text-[#7C2D12] shadow-sm backdrop-blur sm:px-3 sm:text-xs"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#F97316] to-[#EC4899]" />
                    {b}
                  </span>
                ))}
              </motion.div>

              <h1 className="mt-5 text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] text-[#3B0B2E] sm:text-7xl lg:mb-4 lg:mt-0 lg:text-7xl">
                <motion.span
                  className="inline-block"
                  initial={reducedMotion ? false : { opacity: 0, x: -18 }}
                  animate={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  {data.hero.headlinePrefix}{" "}
                </motion.span>
                <motion.span
                  className="inline-block bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#7C3AED] bg-clip-text text-transparent"
                  initial={reducedMotion ? false : { opacity: 0, x: 18 }}
                  animate={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {data.friendName}
                </motion.span>
              </h1>

              <motion.p
                className="mt-4 max-w-2xl text-pretty text-base font-semibold leading-relaxed text-[#5B2A1D] sm:text-lg lg:mb-8 lg:mt-0 lg:text-xl"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                {data.hero.subheadline}
              </motion.p>

              <motion.div
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center lg:mb-6 lg:mt-0"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.button
                  type="button"
                  onClick={() => {
                    triggerConfetti();
                    scrollTo("intro");
                  }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  whileHover={reducedMotion ? undefined : { scale: 1.01 }}
                  animate={reducedMotion ? undefined : { boxShadow: ["0 18px 60px rgba(249,115,22,0.22)", "0 18px 86px rgba(236,72,153,0.34)", "0 18px 60px rgba(249,115,22,0.22)"] }}
                  transition={reducedMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-2xl bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#7C3AED] px-5 py-3.5 text-sm font-black text-white shadow-[0_18px_60px_rgba(249,115,22,0.22)] transition hover:brightness-105 active:brightness-95 lg:px-8 lg:py-4 lg:text-base"
                >
                  {data.hero.cta}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => scrollTo("gallery")}
                  whileTap={reducedMotion ? undefined : { scale: 0.99 }}
                  whileHover={reducedMotion ? undefined : { scale: 1.01 }}
                  className="rounded-2xl border border-[#F97316]/25 bg-white/70 px-5 py-3.5 text-sm font-black text-[#7C2D12] shadow-sm backdrop-blur transition hover:bg-white"
                >
                  Photos dekh
                </motion.button>

                <div className="hidden text-xs font-bold text-[#7C2D12]/70 sm:block">Scroll for the party story.</div>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 18, rotate: 1.5 }}
                animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, rotate: -1 }}
                transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[34px] border border-white/80 bg-white/70 p-3 shadow-[0_32px_100px_rgba(249,115,22,0.18)] backdrop-blur-xl"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FFD23F]/60 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#22D3EE]/35 blur-2xl" />
                <div className="relative grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
                  <div className="box-border w-full max-w-full overflow-hidden rounded-[26px] bg-[#FFE2A8] min-[400px]:col-span-2">
                    <div className="relative aspect-[4/5] w-full max-w-full overflow-hidden rounded-[26px]">
                      <Image src={image3} alt="Birthday cake celebration" fill sizes="(min-width: 1024px) 38vw, 100vw" className="block h-full w-full object-cover object-center" priority />
                    </div>
                    <div className="px-4 py-3 text-center">
                      <div className="text-[13px] font-black uppercase tracking-[0.2em] text-[#F97316]">party poster</div>
                      <div className="mt-1 text-[18px] font-black tracking-[-0.04em] text-[#3B0B2E]">Cake. Music. Memories.</div>
                    </div>
                  </div>
                  {/* {[image2, image3].map((src, index) => (
                    <motion.div
                      key={index}
                      animate={reducedMotion ? undefined : { y: [0, index ? 5 : -5, 0] }}
                      transition={reducedMotion ? undefined : { duration: 3.2 + index, repeat: Infinity, ease: "easeInOut" }}
                      className="relative aspect-square w-full max-w-full overflow-hidden rounded-[24px] bg-white shadow-[0_18px_50px_rgba(124,58,237,0.12)]"
                    >
                      <Image src={src} alt="Birthday memory preview" fill sizes="(min-width: 1024px) 18vw, 50vw" className="block h-full w-full object-cover object-top" />
                    </motion.div>
                  ))} */}
                </div>
                <motion.button
                  type="button"
                  onClick={triggerConfetti}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  className="relative mt-3 w-full rounded-2xl bg-[#3B0B2E] px-4 py-3 text-sm font-black text-white"
                >
                  Tap for confetti boom
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <SectionShell id="intro" eyebrow="" title={data.intro.title}>
        <GlassCard className="relative overflow-hidden">
          <div className="absolute right-5 top-5 h-16 w-16 rounded-full bg-[#FFD23F]/45 blur-xl" />
          <p className="relative text-pretty text-sm font-semibold leading-relaxed text-[#5B2A1D] sm:text-base">
            {data.intro.body}
          </p>
        </GlassCard>
      </SectionShell>

      <SectionShell id="reasons" eyebrow="Why this wish works" title="Birthday energy checklist">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {data.iconicReasons.map((r, idx) => (
            <motion.div
              key={`${r.title}_${idx}`}
              initial={{ opacity: 0, y: 18, rotate: idx % 2 ? 1.2 : -1.2 }}
              whileInView={{ opacity: 1, y: 0, rotate: idx % 2 ? 0.6 : -0.6 }}
              viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
              transition={{ duration: 0.65, delay: Math.min(idx * 0.05, 0.2), ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileTap={reducedMotion ? undefined : { scale: 0.985, rotate: 0 }}
                whileHover={reducedMotion ? undefined : { y: -3 }}
              >
                <div className="group relative min-h-[136px] overflow-hidden rounded-[26px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,226,168,0.66))] p-4 shadow-[0_18px_55px_rgba(249,115,22,0.12)] backdrop-blur-xl">
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#EC4899]/12" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#FFF7D6] text-xl shadow-sm">{r.icon}</div>
                    <div className="rounded-full bg-[#F97316] px-3 py-1 text-[10px] font-black text-white">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-black leading-tight text-[#3B0B2E]">{r.title}</div>
                  <div className="mt-1.5 text-xs font-semibold leading-relaxed text-[#7C2D12]/78">{r.body}</div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="gallery" eyebrow="Party story" title="A swipeable celebration roll">
        <div className="mx-auto max-w-6xl">
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-1 lg:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {data.gallery.photos.map((p, idx) => (
              <motion.div
                key={`${p.label}_${idx}`}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: "-10% 0px -8% 0px" }}
                transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : Math.min(idx * 0.04, 0.18), ease: [0.22, 1, 0.36, 1] }}
                className="snap-center"
              >
                <motion.div
                  whileTap={reducedMotion ? undefined : { scale: 0.99 }}
                  className="group box-border w-[84vw] max-w-full overflow-hidden rounded-[30px] border border-white/80 bg-white/72 p-2 shadow-[0_22px_70px_rgba(249,115,22,0.16)] backdrop-blur-xl sm:w-[380px] md:w-[420px] lg:w-[460px] xl:w-[500px]"
                >
                  <div className="relative aspect-[4/5] w-full max-w-full overflow-hidden rounded-[24px]">
                    <Image
                      src={p.src}
                      alt={p.label}
                      fill
                      className="block h-full w-full object-cover object-top"
                      sizes="(min-width: 1280px) 500px, (min-width: 1024px) 460px, (min-width: 768px) 420px, (min-width: 640px) 380px, 84vw"
                      priority={idx === 0}
                    />
                  </div>

                  <div className="px-2 pb-3 pt-3 text-center">
                    <div className="mx-auto inline-flex rounded-full bg-[#FFD23F] px-3 py-1 text-[10px] font-black text-[#3B0B2E]">
                      STORY {String(idx + 1).padStart(2, "0")}
                    </div>
                    <p className="mt-2 text-sm font-black leading-snug text-[#3B0B2E]">{p.label}</p>
                    <p className="mt-1 text-xs font-bold leading-snug text-[#7C2D12]/72">{p.hint}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 text-xs font-bold text-[#7C2D12]/70">Swipe through the birthday story.</div>
        </div>
      </SectionShell>

      <SectionShell id="timeline" eyebrow="Memory beats" title="Little moments, big birthday feeling">
        <div className="space-y-4">
          {data.timeline.map((t, idx) => (
            <motion.div
              key={`${t.title}_${idx}`}
              variants={cardFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/68 p-5 shadow-[0_18px_55px_rgba(124,58,237,0.10)] backdrop-blur-xl sm:p-7">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#F97316] via-[#EC4899] to-[#22D3EE]" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    {t.tag ? (
                      <div className="text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">{t.tag}</div>
                    ) : null}
                    <div className="mt-2 text-lg font-black text-[#3B0B2E]">{t.title}</div>
                    <div className="mt-2 text-sm font-semibold leading-relaxed text-[#7C2D12]/78">{t.body}</div>
                  </div>
                  <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#FFF7D6] px-3 py-1 text-xs font-black text-[#7C2D12] sm:mt-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                    {t.tag}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="gift" eyebrow="Surprise box" title="A birthday gift reveal">
        <AnimatePresence mode="wait">
          {!giftOpen ? (
            <motion.div
              key="gift-box"
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <GlassCard className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(249,115,22,0.16),transparent_55%)]" />
                <div className="relative">
                  <div className="text-lg font-black text-[#3B0B2E]">🎁 A tiny birthday drop</div>
                  <div className="mt-2 text-sm font-semibold leading-relaxed text-[#7C2D12]/78">
                    Tap open for the gift reveal moment.
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => {
                      setGiftOpen(true);
                      triggerConfetti();
                    }}
                    whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                    animate={reducedMotion ? undefined : { rotate: [0, -1.2, 1.2, 0], y: [0, -2, 0] }}
                    transition={reducedMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-5 rounded-2xl bg-[#3B0B2E] px-4 py-2.5 text-xs font-black text-white transition hover:brightness-110"
                  >
                    Kholo
                  </motion.button>
                </div>
              </GlassCard>

              <div className="rounded-3xl border border-white/80 bg-gradient-to-br from-[#F97316] via-[#EC4899] to-[#7C3AED] p-6 text-white shadow-[0_18px_60px_rgba(236,72,153,0.22)]">
                <div className="text-lg font-black text-white">Gift mode: active</div>
                <div className="mt-2 text-sm font-semibold leading-relaxed text-white/78">
                  A birthday page should feel like opening something, not just reading something.
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gift-message"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="overflow-hidden rounded-2xl border border-pink-200 bg-pink-50 p-6 text-center shadow-[0_18px_60px_rgba(249,115,22,0.18)]"
            >
              <div className="text-3xl mb-3">🎁✨</div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">SURPRISE UNLOCKED</div>
              <div className="mt-2 text-lg font-black text-[#3B0B2E]">🎉 One celebration plan + one treat pending</div>
              <div className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-relaxed text-[#7C2D12]/78">
                Pick the place. Birthday person gets priority.
              </div>
              <div className="mx-auto mt-4 grid max-w-3xl gap-2 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/80 bg-white/66 px-3 py-2 text-xs font-black text-[#7C2D12]">
                  🧁 Sweet treat bhi banta hai
                </div>
                <div className="rounded-2xl border border-white/80 bg-white/66 px-3 py-2 text-xs font-black text-[#7C2D12]">
                  🧳 Ek chhota plan fix
                </div>
                <div className="rounded-2xl border border-white/80 bg-white/66 px-3 py-2 text-xs font-black text-[#7C2D12]">
                  📸 Photos toh aaj pakka
                </div>
              </div>
              <button
                type="button"
                onClick={() => setGiftOpen(false)}
                className="mt-4 text-xs text-gray-400 underline"
              >
                See again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionShell>

      <SectionShell id="cake" eyebrow="Candle moment" title="Cake time with a real payoff">
        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(249,115,22,0.16),transparent_55%)]" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-lg font-black text-[#3B0B2E]">🎂 Make a wish</div>
              <div className="mt-2 text-sm font-semibold leading-relaxed text-[#7C2D12]/78">
                Ek wish bol (mann mein). Phir tap.
              </div>
              <div className="mt-3 text-sm font-black text-[#F97316]">
                {cakeCut ? "Ho gaya. Birthday officially on." : "Candles ready."}
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => {
                setCakeCut(true);
                triggerConfetti();
              }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              animate={
                reducedMotion || cakeCut
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 0 rgba(245,158,11,0)",
                        "0 0 40px rgba(245,158,11,0.18)",
                        "0 0 0 rgba(245,158,11,0)",
                      ],
                    }
              }
              transition={reducedMotion || cakeCut ? undefined : { duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#7C3AED] px-5 py-3.5 text-sm font-black text-white shadow-[0_18px_60px_rgba(245,158,11,0.25)] transition hover:brightness-105 active:brightness-95"
            >
              {cakeCut ? "Ek aur" : "Chalo cake cut karein"}
            </motion.button>
          </div>

          <motion.div
            initial={false}
            animate={cakeCut ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-[#FFF7D6]/74 p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(245,158,11,0.22),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(236,72,153,0.18),transparent_55%)]" />

                <motion.div
                  initial={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.94 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  transition={reducedMotion ? undefined : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <motion.div
                    initial={false}
                    animate={
                      reducedMotion
                        ? undefined
                        : {
                            boxShadow: [
                              "0 24px 90px rgba(0,0,0,0.38)",
                              "0 24px 110px rgba(99,102,241,0.18)",
                              "0 24px 90px rgba(0,0,0,0.38)",
                            ],
                          }
                    }
                    transition={reducedMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70"
                  >
                    <div className="relative aspect-[4/3] w-full max-w-full overflow-hidden rounded-3xl">
                      <Image
                        src="/assets/image_7_cake_wish.png"
                        alt={`Cake wish for ${data.friendName}`}
                        fill
                        sizes="(max-width: 640px) 92vw, 520px"
                        className="block h-full w-full object-cover object-center"
                        priority={false}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(245,158,11,0.20),transparent_55%)]" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_60%,rgba(99,102,241,0.18),transparent_55%)]" />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

                      <motion.div
                        aria-hidden
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={reducedMotion ? { opacity: 0 } : { opacity: [0, 1, 0.75], scale: [0.98, 1, 1] }}
                        transition={reducedMotion ? undefined : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none absolute inset-0"
                      >
                        <div className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/76 px-3 py-1 text-xs font-black text-[#F97316] backdrop-blur">
                          ✨ Cake cut ✅
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="relative mt-4 text-sm font-black text-[#7C2D12]">
                    Wish bol di? Ab cake kha.
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </GlassCard>
      </SectionShell>

      <SectionShell id="roasts" eyebrow="Wish cards" title={data.insideJokes.title}>
        <GlassCard className="relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FFD23F]/38 blur-2xl" />
          <div className="relative mb-4 inline-flex rounded-full bg-[#F97316] px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-white">
            wish cards
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.insideJokes.lines.map((line, idx) => (
              <motion.div
                key={`${idx}_${line}`}
                initial={{ opacity: 0, y: 14, rotate: idx % 2 ? 1 : -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: idx % 2 ? 0.5 : -0.5 }}
                viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
                transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.18), ease: [0.22, 1, 0.36, 1] }}
                whileTap={reducedMotion ? undefined : { scale: 0.99 }}
                whileHover={reducedMotion ? undefined : { y: -1 }}
                className="relative overflow-hidden rounded-[24px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,247,214,0.76),rgba(255,211,226,0.58))] p-4 shadow-[0_16px_45px_rgba(249,115,22,0.11)] transition hover:bg-white"
              >
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#EC4899]/10" />
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[#3B0B2E] text-sm text-white">
                    {["🎈", "✨", "🎁", "🎂", "🌟"][idx % 5]}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#F97316]">
                      Card {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-sm font-bold leading-relaxed text-[#5B2A1D]">{line}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </SectionShell>

      <SectionShell id="letter" eyebrow="From the heart" title={data.letter.title}>
        <GlassCard className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(255,250,242,0.88),rgba(255,247,214,0.82))]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(236,72,153,0.13),transparent_55%)]" />
          <div className="pointer-events-none absolute left-4 top-2 z-0 select-none text-7xl font-black leading-none text-[#F97316]/10">“</div>
          <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-28 w-28 rounded-tl-full bg-[#FFD23F]/22" />
          <motion.div
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="text-pretty text-base font-semibold leading-relaxed text-[#5B2A1D] sm:text-lg">
              {data.letter.body}
            </p>
            <div className="mt-6 inline-flex rounded-full bg-[#3B0B2E] px-4 py-2 text-sm font-black text-white shadow-[0_14px_35px_rgba(59,11,46,0.16)]">
              — {data.fromName}
            </div>
            <div className="mt-4 rounded-2xl border border-[#F97316]/18 bg-white/56 px-4 py-3 text-sm font-bold text-[#7C2D12]/84">{data.letter.ps}</div>
          </motion.div>
        </GlassCard>
      </SectionShell>

      <section
        id="finale"
        className="relative z-10 scroll-mt-24 flex min-h-screen flex-col items-center justify-start px-4 pt-16 pb-8 md:pt-24 sm:px-6 sm:pb-12"
      >
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-12% 0px -8% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#F97316]"
            >
              Final burst
            </motion.div>
            <RevealHeading className="max-w-full whitespace-normal break-words text-balance text-3xl font-black leading-tight tracking-tight text-[#3B0B2E] sm:text-5xl">
              {data.finale.title}
            </RevealHeading>
          </motion.div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard className="relative overflow-hidden">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#EC4899]/16 blur-2xl" />
            <div className="absolute -bottom-14 -left-14 h-36 w-36 rounded-full bg-[#22D3EE]/16 blur-2xl" />
            <p className="text-pretty text-sm font-semibold leading-relaxed text-[#5B2A1D] sm:text-base">
              {data.finale.body}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <motion.button
                type="button"
                onClick={replaySurprise}
                whileTap={reducedMotion ? undefined : { scale: 0.99 }}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        boxShadow: [
                          "0 0 0 rgba(34,211,238,0)",
                          "0 0 40px rgba(34,211,238,0.18)",
                          "0 0 0 rgba(34,211,238,0)",
                        ],
                      }
                }
                transition={reducedMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#7C3AED] px-5 py-3 text-sm font-black text-white shadow-[0_18px_55px_rgba(236,72,153,0.18)] transition hover:brightness-110"
              >
                {data.finale.primaryCta}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  triggerConfetti();
                  scrollTo("intro");
                }}
                whileTap={reducedMotion ? undefined : { scale: 0.99 }}
                className="rounded-2xl border border-[#F97316]/25 bg-white/70 px-5 py-3 text-sm font-black text-[#F97316] shadow-sm transition hover:bg-white"
              >
                {data.finale.secondaryCta}
              </motion.button>
            </div>
          </GlassCard>

          <motion.div
            initial={{ scale: 0.98, rotate: -1 }}
            whileInView={{ scale: 1, rotate: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-[#F97316] via-[#EC4899] to-[#7C3AED] p-6 text-white shadow-[0_18px_60px_rgba(236,72,153,0.22)]"
          >
            <div className="absolute right-4 top-4 text-4xl opacity-30">🎉</div>
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/16 blur-xl" />
            <div className="mt-2 text-lg font-black text-white">Celebration saved</div>
            <div className="mt-2 text-sm font-semibold leading-relaxed text-white/78">
              Replay it whenever the birthday mood needs one more burst.
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      <DemoStickyCTA occasion="Birthday" templateName="Birthday Pop Story" recipientName={data.friendName} demoUrl="/birthday" />

      <div aria-hidden className="h-28" />
      <footer className="hidden" />
    </main>
  );
}
