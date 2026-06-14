"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

import DemoStickyCTA from "@/components/wowwish/DemoStickyCTA";
import { RevealHeading, cardFadeUp } from "@/components/wowwish/scrollReveal";
import bestieGlow from "./bestie_glow_moment.png";
import cakePhoto from "./Birthday_cake_for_bestie.jpeg";
import laughMemory from "./laugh_always_remember.png";
import photoDump from "./one_for_photo_dump.png";
import outfitDay from "./outfit_ofthe_day.png";
import tripMemory from "./Use_the_exact_202604192036.png";
import usBeingUs from "./us_being_us.png";

type MemoryPhoto = {
  src: StaticImageData;
  caption: string;
  align?: string;
};

type TemplateData = {
  recipientName: string;
  fromName: string;
  musicSrc: string;
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    chips: string[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    photos: MemoryPhoto[];
  };
  reasons: Array<{ title: string; copy: string; sticker: string }>;
  cake: {
    title: string;
    body: string;
    button: string;
    reveal: string;
    image: StaticImageData;
  };
  gift: {
    title: string;
    body: string;
    button: string;
    reveal: string;
  };
  note: {
    title: string;
    body: string;
  };
  finale: {
    title: string;
    body: string;
    replay: string;
    hug: string;
  };
};

const templateData: TemplateData = {
  recipientName: "Aarohi",
  fromName: "Your forever gossip partner",
  musicSrc: "/assets/birthday-bestie-bg-music.mp3",
  hero: {
    headline: "Happy Birthday, Bestie",
    subheadline: "Today is all about you, your drama, your glow, and our endless gossip.",
    cta: "Start the surprise",
    chips: ["Queen mode", "Gossip partner", "Safe place", "Birthday glow"],
  },
  gallery: {
    eyebrow: "Photo dump",
    title: "Our prettiest little memory board",
    photos: [
      { src: tripMemory, caption: "Bestie trip memory", align: "object-center" },
      { src: laughMemory, caption: "That laugh we always remember", align: "object-center" },
      { src: outfitDay, caption: "Outfit day, obviously", align: "object-center" },
      { src: usBeingUs, caption: "Us being us, always", align: "object-center" },
      { src: photoDump, caption: "One for the photo dump", align: "object-center" },
    ],
  },
  reasons: [
    { title: "You make boring days fun", copy: "Even a normal plan becomes a story.", sticker: "✦" },
    { title: "You listen to all my drama", copy: "No judgement, only full analysis.", sticker: "♡" },
    { title: "You hype me up always", copy: "Mirror check, outfit check, confidence check.", sticker: "★" },
    { title: "You know every secret", copy: "The vault is locked forever.", sticker: "✧" },
    { title: "You are my safe place", copy: "Soft corner, loud laughs, zero filters.", sticker: "♥" },
    { title: "You make life prettier", copy: "Some people feel like sunshine.", sticker: "✿" },
  ],
  cake: {
    title: "Cake moment for the birthday queen",
    body: "No birthday is complete without one dramatic cake moment and one very serious wish.",
    button: "Tap for cake moment",
    reveal: "Make a wish, birthday queen.",
    image: cakePhoto,
  },
  gift: {
    title: "A tiny gift box, full bestie emotion",
    body: "Tap it like you are opening one more surprise from your favorite person.",
    button: "Open your gift",
    reveal: "Your real gift is still pending... but this page is proof that you are special.",
  },
  note: {
    title: "A small bestie note",
    body:
      "I joke a lot, but seriously, life is better with you. Thank you for every laugh, every secret, every random plan, and every time you showed up.",
  },
  finale: {
    title: "Birthday glow saved forever",
    body: "Take screenshots, replay it, and remember one thing: you are loved loudly, softly, and always.",
    replay: "Replay the surprise",
    hug: "Birthday hug pending",
  },
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useBirthdayMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicOn, setMusicOn] = useState(true);
  const triedAutoplay = useRef(false);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.16;
    void audio
      .play()
      .then(() => setMusicOn(true))
      .catch(() => setMusicOn(false));
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setMusicOn(false);
  };

  useEffect(() => {
    if (triedAutoplay.current) return;
    triedAutoplay.current = true;
    play();
  }, []);

  useEffect(() => {
    const startOnInteraction = () => {
      if (!audioRef.current || !audioRef.current.paused) return;
      play();
    };

    window.addEventListener("pointerdown", startOnInteraction, { once: true });
    window.addEventListener("keydown", startOnInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
    };
  }, []);

  return {
    audio: <audio ref={audioRef} src={src} preload="none" loop />,
    musicOn,
    toggleMusic: () => (musicOn ? pause() : play()),
  };
}

function FloatingDecor() {
  const reducedMotion = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        top: `${8 + ((index * 19) % 84)}%`,
        delay: index * 0.65,
        size: 8 + (index % 3) * 4,
        shape: index % 3,
        symbol: ["♡", "✦", "★", "bow", "sparkle", "heart"][index % 6],
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map((item) => (
        <motion.span
          key={item.id}
          className={cn(
            "absolute grid place-items-center text-[10px] font-black opacity-15 blur-[1px]",
            item.shape === 0 && "rounded-full bg-[#F9A8D4]",
            item.shape === 1 && "rounded-full bg-[#C4B5FD]",
            item.shape === 2 && "rotate-45 rounded-sm bg-[#FDE68A]",
          )}
          style={{ left: item.left, top: item.top, height: item.size, width: item.size }}
          animate={reducedMotion ? undefined : { y: [-4, 8, -4], rotate: [0, 5, 0] }}
          transition={{ duration: 12, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.symbol.length === 1 ? item.symbol : null}
        </motion.span>
      ))}
    </div>
  );
}

function ConfettiBurst({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: 34 }).map((_, index) => ({
        id: index,
        left: `${(index * 9.5) % 100}%`,
        color: ["#EC4899", "#F9A8D4", "#C4B5FD", "#FDE68A", "#FDBA74"][index % 5],
      })),
    [],
  );

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-0 h-2.5 w-1.5 rounded-full"
          style={{ left: piece.left, backgroundColor: piece.color }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: [0, 420, 640], opacity: [0, 1, 0], rotate: [0, 260] }}
          transition={{ duration: 1.6, delay: (piece.id % 8) * 0.035, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
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
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-xs font-black uppercase tracking-[0.22em] text-[#BE185D]"
          >
            {eyebrow}
          </motion.div>
          <RevealHeading className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.05em] text-[#3B0B2E] sm:text-5xl">
            {title}
          </RevealHeading>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function MemoryGallery({ photos }: { photos: MemoryPhoto[] }) {
  const gridPhotos = photos.slice(0, 4);

  return (
    <div className="mt-8 grid grid-cols-2 gap-2.5 px-3 sm:px-0 lg:grid-cols-4">
      {gridPhotos.map((photo, index) => (
        <motion.figure
          key={photo.caption}
          initial={{ opacity: 0, y: 28, rotate: index % 2 ? 1.5 : -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 0.8 : -0.8 }}
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
          transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative overflow-hidden rounded-[28px] border border-white/80 bg-white/70 shadow-[0_22px_70px_rgba(190,24,93,0.14)] backdrop-blur-xl",
            index === 2 && "translate-y-3",
            index === 3 && "-translate-y-1",
            index === 4 && "col-span-2 mx-auto w-2/3",
          )}
        >
          <div className="absolute left-5 top-2 z-10 h-5 w-16 rotate-[-8deg] rounded-full bg-[#FDE68A]/80 shadow-sm" />
          <div className="relative aspect-[4/5] w-full max-w-full overflow-hidden rounded-[22px] bg-[#FCE7F3]">
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
              className="block h-full w-full object-cover object-center"
              priority={index === 0}
            />
          </div>
          <figcaption className="px-2 pb-2 pt-3 text-center text-[13px] font-black leading-snug text-[#3B0B2E]">
            {photo.caption}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

function FullWidthMemoryPhoto({ photo }: { photo: MemoryPhoto }) {
  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-md overflow-hidden rounded-[32px] border border-white/80 bg-white/72 p-3 shadow-[0_24px_80px_rgba(190,24,93,0.14)] backdrop-blur-xl"
      >
        <div className="px-1 pb-3 text-center text-[11px] font-black uppercase tracking-[0.22em] text-[#BE185D]/65">
          ONE MORE
        </div>
        <div className="relative aspect-[2/3] w-full max-w-md overflow-hidden rounded-[26px] bg-[#FCE7F3]">
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="block h-full w-full object-cover object-top"
          />
        </div>
        <figcaption className="px-2 pb-2 pt-3 text-center text-[13px] font-black leading-snug text-[#3B0B2E]">
          {photo.caption}
        </figcaption>
      </motion.figure>
    </section>
  );
}

function ReasonsBoard({ reasons }: { reasons: TemplateData["reasons"] }) {
  return (
    <div className="relative mt-8 rounded-[36px] border border-white/70 bg-white/42 p-3 shadow-[0_28px_90px_rgba(190,24,93,0.12)] backdrop-blur-xl sm:p-5">
      <div aria-hidden className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#F9A8D4]/15 blur-[40px]" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.title}
            variants={cardFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            whileTap={{ scale: 0.985 }}
            className="group relative min-h-[112px] overflow-hidden rounded-[26px] border border-white/78 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,241,246,0.74))] p-4 shadow-[0_16px_45px_rgba(190,24,93,0.10)]"
          >
            <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#FCE7F3] text-sm font-black text-[#BE185D] transition group-active:scale-110">
              {reason.sticker}
            </div>
            <div className="inline-flex rounded-full bg-[#BE185D] px-2.5 py-1 text-[10px] font-black text-white">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="mt-3 max-w-[82%] text-sm font-black leading-tight text-[#3B0B2E] sm:text-base">
              {reason.title}
            </div>
            <p className="mt-1.5 max-w-[92%] text-xs font-semibold leading-relaxed text-[#7B3C56]">
              {reason.copy}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function BirthdayBestiePage() {
  const data = templateData;
  const reducedMotion = useReducedMotion();
  const { audio, musicOn, toggleMusic } = useBirthdayMusic(data.musicSrc);
  const [cakeOpen, setCakeOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const triggerBurst = () => setBurstKey((value) => value + 1);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const replay = () => {
    setCakeOpen(false);
    setGiftOpen(false);
    triggerBurst();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#FFF7F1_0%,#FFE4EF_42%,#F4E8FF_76%,#FFF8EA_100%)] pb-[140px] text-[#3B0B2E]">
      {audio}
      <FloatingDecor />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(236,72,153,0.12),transparent_36%),radial-gradient(circle_at_88%_12%,rgba(196,181,253,0.14),transparent_34%),radial-gradient(circle_at_42%_78%,rgba(253,230,138,0.14),transparent_38%)]" />

      <button
        type="button"
        onClick={toggleMusic}
        aria-pressed={musicOn}
        className="ww-music-button fixed right-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/74 px-4 py-2 text-xs font-black text-[#7B1746] shadow-[0_18px_50px_rgba(190,24,93,0.16)] backdrop-blur-xl"
      >
        <span className={cn("h-2 w-2 rounded-full", musicOn ? "bg-[#BE185D] shadow-[0_0_12px_rgba(190,24,93,0.65)]" : "bg-[#F9A8D4]")} />
        {musicOn ? "Tune on" : "Tune off"}
      </button>

      <section className="relative grid min-h-screen place-items-center px-4 py-12 sm:px-6 lg:px-8">
        <ConfettiBurst active={burstKey > 0} key={burstKey} />
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex rounded-full border border-[#F9A8D4]/60 bg-white/70 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#BE185D] backdrop-blur">
              Bestie birthday page
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.065em] text-[#3B0B2E] sm:text-7xl lg:text-8xl">
              {data.hero.headline}
              <span className="block bg-gradient-to-r from-[#BE185D] via-[#EC4899] to-[#7C3AED] bg-clip-text text-transparent">
                {data.recipientName}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#6B3A55] sm:text-lg">
              {data.hero.subheadline}
            </p>
            <div className="mt-7 grid gap-3 sm:flex">
              <motion.button
                type="button"
                onClick={() => {
                  triggerBurst();
                  scrollTo("memories");
                }}
                whileTap={{ scale: 0.98 }}
                animate={reducedMotion ? undefined : { boxShadow: ["0 24px 70px rgba(190,24,93,0.18)", "0 24px 88px rgba(190,24,93,0.32)", "0 24px 70px rgba(190,24,93,0.18)"] }}
                transition={reducedMotion ? undefined : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl bg-gradient-to-r from-[#BE185D] to-[#7C3AED] px-6 py-4 text-sm font-black text-white shadow-[0_24px_70px_rgba(190,24,93,0.22)]"
              >
                {data.hero.cta}
              </motion.button>
              <button
                type="button"
                onClick={() => scrollTo("cake")}
                className="rounded-2xl border border-[#F9A8D4]/55 bg-white/70 px-6 py-4 text-sm font-black text-[#7B1746] shadow-sm backdrop-blur"
              >
                Cake moment
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {data.hero.chips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/80 bg-white/62 px-3 py-2 text-xs font-black text-[#7B3C56]">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96, rotate: 1.5 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1, rotate: -1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[44px] bg-gradient-to-br from-[#F9A8D4]/55 via-[#C4B5FD]/35 to-[#FDE68A]/40 blur-2xl" />
            <div className="relative overflow-hidden rounded-[40px] border border-white/80 bg-white/70 p-3 shadow-[0_34px_100px_rgba(190,24,93,0.18)] backdrop-blur-2xl">
              <div className="relative aspect-[4/5] w-full max-w-full overflow-hidden rounded-[32px] bg-[#FCE7F3]">
                <Image
                  src={bestieGlow}
                  alt="Two best friends smiling"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="block h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5 text-center text-white">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/78">for my girl</div>
                  <div className="mt-1 text-base font-semibold tracking-[-0.02em]">Full queen mode on</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionShell id="memories" eyebrow={data.gallery.eyebrow} title={data.gallery.title}>
        <MemoryGallery photos={data.gallery.photos} />
      </SectionShell>

      <SectionShell id="reasons" eyebrow="Why you are the best" title="Six reasons this friendship is elite">
        <ReasonsBoard reasons={data.reasons} />
      </SectionShell>

      <SectionShell id="cake" eyebrow="Cake celebration" title={data.cake.title}>
        <div className="relative mt-8 overflow-hidden rounded-[36px] border border-white/80 bg-white/68 p-4 shadow-[0_28px_90px_rgba(190,24,93,0.13)] backdrop-blur-xl sm:p-6">
          <ConfettiBurst active={cakeOpen} key={`cake-${burstKey}-${cakeOpen}`} />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="max-w-xl text-sm font-semibold leading-relaxed text-[#6B3A55] sm:text-base">{data.cake.body}</p>
              <motion.button
                type="button"
                onClick={() => {
                  setCakeOpen(true);
                  triggerBurst();
                }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full rounded-2xl bg-[#BE185D] px-5 py-4 text-sm font-black text-white shadow-[0_18px_55px_rgba(190,24,93,0.18)] sm:w-auto"
              >
                {data.cake.button}
              </motion.button>
              {cakeOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-3xl border border-[#F9A8D4]/45 bg-[#FFF1F6] p-5 text-lg font-black text-[#7B1746]"
                >
                  {data.cake.reveal}
                </motion.div>
              ) : null}
            </div>
            <div className="relative aspect-[4/3] w-full max-w-full overflow-hidden rounded-[30px] bg-[#FCE7F3]">
              <Image src={data.cake.image} alt="Birthday cake for bestie" fill sizes="(min-width: 1024px) 40vw, 100vw" className="block h-full w-full object-cover object-center" />
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="gift" eyebrow="Bestie surprise" title={data.gift.title}>
        <AnimatePresence mode="wait">
          {!giftOpen ? (
            <motion.div
              key="gift-box"
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
            >
              <motion.button
                type="button"
                onClick={() => {
                  setGiftOpen(true);
                  triggerBurst();
                }}
                animate={reducedMotion ? undefined : { rotate: [0, -1.2, 1.2, 0] }}
                transition={reducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                whileTap={{ scale: 0.98, rotate: 0 }}
                className="group relative min-h-[280px] overflow-hidden rounded-[36px] border border-white/80 bg-[radial-gradient(circle_at_50%_12%,rgba(249,168,212,0.62),transparent_34%),linear-gradient(135deg,#BE185D,#EC4899,#C4B5FD)] p-8 text-left shadow-[0_28px_90px_rgba(190,24,93,0.18)]"
              >
                <div className="absolute left-1/2 top-0 h-full w-10 -translate-x-1/2 bg-white/28" />
                <div className="absolute left-0 top-1/2 h-10 w-full -translate-y-1/2 bg-white/28" />
                <div className="relative z-10 text-xs font-black uppercase tracking-[0.22em] text-white/78">tap to open</div>
                <div className="relative z-10 mt-20 text-4xl font-black tracking-[-0.05em] text-white">{data.gift.button}</div>
              </motion.button>
              <div className="rounded-[34px] border border-white/80 bg-white/70 p-6 shadow-[0_22px_70px_rgba(124,58,237,0.10)] backdrop-blur-xl">
                <p className="text-sm font-semibold leading-relaxed text-[#6B3A55] sm:text-base">{data.gift.body}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gift-message"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative mt-8 overflow-hidden rounded-2xl border border-pink-200 bg-pink-50 p-6 text-center shadow-[0_22px_70px_rgba(124,58,237,0.10)]"
            >
              <ConfettiBurst active={giftOpen} key={`gift-${burstKey}`} />
              <div className="text-3xl mb-3">🎁✨</div>
              <p className="mx-auto max-w-xl text-sm font-semibold leading-relaxed text-[#6B3A55] sm:text-base">{data.gift.body}</p>
              <p className="mx-auto mt-5 max-w-2xl text-2xl font-black leading-tight text-[#3B0B2E]">{data.gift.reveal}</p>
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

      <FullWidthMemoryPhoto photo={data.gallery.photos[4]} />

      <SectionShell id="note" eyebrow="Dil se" title={data.note.title}>
        <div className="mt-8 overflow-hidden rounded-[36px] border border-white/80 bg-white/72 p-6 shadow-[0_24px_80px_rgba(190,24,93,0.12)] backdrop-blur-xl sm:p-8">
          <p className="max-w-4xl text-2xl font-black italic leading-tight tracking-[-0.035em] text-[#3B0B2E] sm:text-4xl" style={{ fontFamily: "var(--font-romantic)" }}>
            {data.note.body}
          </p>
          <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#BE185D]">- {data.fromName}</p>
        </div>
      </SectionShell>

      <section className="relative px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/80 bg-[linear-gradient(135deg,#FFF1F6,#F4E8FF,#FFF8EA)] p-6 text-center shadow-[0_32px_100px_rgba(190,24,93,0.14)] sm:p-10">
          <div className="text-xs font-black uppercase tracking-[0.22em] text-[#BE185D]">Final birthday wish</div>
          <RevealHeading className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-[-0.06em] text-[#3B0B2E] sm:text-6xl">{data.finale.title}</RevealHeading>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-[#6B3A55] sm:text-base">{data.finale.body}</p>
          <div className="mt-8 grid gap-3 sm:flex sm:justify-center">
            <motion.button type="button" onClick={replay} whileTap={{ scale: 0.98 }} className="rounded-2xl bg-[#3B0B2E] px-6 py-4 text-sm font-black text-white">
              {data.finale.replay}
            </motion.button>
            <motion.button type="button" onClick={triggerBurst} whileTap={{ scale: 0.98 }} className="rounded-2xl border border-[#F9A8D4]/55 bg-white/70 px-6 py-4 text-sm font-black text-[#BE185D]">
              {data.finale.hug}
            </motion.button>
          </div>
        </div>
      </section>

      <DemoStickyCTA occasion="Birthday" templateName="Birthday Bestie" recipientName={data.recipientName} demoUrl="/birthday-bestie" />
    </main>
  );
}
