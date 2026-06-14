"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

import DemoStickyCTA from "@/components/wowwish/DemoStickyCTA";
import { RevealHeading, cardFadeUp } from "@/components/wowwish/scrollReveal";
import rooftopMemory from "./1.png";
import schoolMemory from "./2.png";
import cricketMemory from "./3.png";
import chaiMemory from "./4.png";
import tripMemory from "./5.png";
import foodMemory from "./6.png";
import cakeMoment from "./Use_the_exact_202604192000.png";

type MemoryPhoto = {
  src: StaticImageData;
  caption: string;
  align?: string;
};

type TemplateData = {
  friendName: string;
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
  reasons: Array<{ title: string; copy: string; icon: string }>;
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
    treat: string;
  };
};

const templateData: TemplateData = {
  friendName: "Aakash",
  fromName: "Tera bhai",
  musicSrc: "/assets/birthday-yaari-bg-music.mp3",
  hero: {
    headline: "Happy Birthday, Bhai",
    subheadline: "Years changed, plans changed, but apni yaari same hai.",
    cta: "Open the surprise",
    chips: ["School stories", "Chai talks", "Cricket chaos", "Treat pending"],
  },
  gallery: {
    eyebrow: "Memory roll",
    title: "Photos that still feel like yesterday",
    photos: [
      { src: schoolMemory, caption: "School wali yaari", align: "object-center" },
      { src: chaiMemory, caption: "Chai, talks, and nonsense", align: "object-center" },
      { src: tripMemory, caption: "Trip memory locked", align: "object-center" },
      { src: cricketMemory, caption: "Cricket and chaos", align: "object-center" },
    ],
  },
  reasons: [
    { title: "Always ready for bakchodi", copy: "Plan ho ya no-plan, scene ban hi jaata hai.", icon: "BK" },
    { title: "Stands by me when needed", copy: "Jab serious hota hai, tu present hota hai.", icon: "ST" },
    { title: "Knows all old stories", copy: "School se ab tak ka full archive.", icon: "AR" },
    { title: "Chai partner", copy: "Ek cutting aur life sorted.", icon: "CH" },
    { title: "Trip partner", copy: "Wrong turns, right memories.", icon: "TR" },
    { title: "Brother from another home", copy: "Dost kam, family zyada.", icon: "BH" },
  ],
  cake: {
    title: "Cake cut kar, bhai",
    body: "Birthday hai. Wish bhi kar, photo bhi de, aur treat ka topic avoid mat kar.",
    button: "Cut the cake, bhai",
    reveal: "Birthday hai bhai, treat toh banti hai.",
    image: cakeMoment,
  },
  gift: {
    title: "Ek birthday gift, apni style mein",
    body: "Not too senti, not too formal. Bas ek proper yaari wala surprise.",
    button: "Open your birthday gift",
    reveal: "Gift baad mein, pehle ye yaari ka proof dekh.",
  },
  note: {
    title: "Bhai, ek baat",
    body:
      "Bhai, life mein log aate jaate rehte hain, but kuch dost family ban jaate hain. Tu unmein se ek hai. Happy Birthday. Same madness, same yaari, always.",
  },
  finale: {
    title: "Same madness. Same yaari.",
    body: "Aaj birthday hai, kal phir normal bakchodi. But this page stays as proof that tu special hai.",
    replay: "Replay the surprise",
    treat: "Treat pending",
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
    audio.volume = 0.17;
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
      Array.from({ length: 10 }).map((_, index) => ({
        id: index,
        left: `${(index * 13) % 100}%`,
        top: `${6 + ((index * 23) % 86)}%`,
        delay: index * 0.32,
        size: 4 + (index % 3) * 3,
        color: ["#F59E0B", "#1F4E5F", "#315C45", "#C47B3A", "#FDE68A"][index % 5],
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute rounded-full opacity-20"
          style={{ left: item.left, top: item.top, height: item.size, width: item.size, backgroundColor: item.color }}
          animate={reducedMotion ? undefined : { y: [-4, 10, -4], x: [0, item.id % 2 ? 3 : -3, 0] }}
          transition={{ duration: 6.2, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ConfettiBurst({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: 32 }).map((_, index) => ({
        id: index,
        left: `${(index * 8.8) % 100}%`,
        color: ["#F59E0B", "#1F4E5F", "#315C45", "#C47B3A", "#FDE68A"][index % 5],
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
          animate={{ y: [0, 420, 640], opacity: [0, 1, 0], rotate: [0, 240] }}
          transition={{ duration: 1.55, delay: (piece.id % 9) * 0.035, ease: [0.22, 1, 0.36, 1] }}
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
            className="text-xs font-black uppercase tracking-[0.22em] text-[#B45309]"
          >
            {eyebrow}
          </motion.div>
          <RevealHeading className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.05em] text-[#132B35] sm:text-5xl">
            {title}
          </RevealHeading>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function MemoryGallery({ photos }: { photos: MemoryPhoto[] }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-2 px-3 sm:px-0 lg:grid-cols-4">
      {photos.map((photo, index) => (
        <motion.figure
          key={photo.caption}
          initial={{ opacity: 0, y: 28, rotate: index % 2 ? 1 : -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 0.6 : -0.6 }}
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
          transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[26px] border border-[#D7B98F]/80 bg-[#FFF8EA]/78 shadow-[0_22px_70px_rgba(31,78,95,0.14)] backdrop-blur-xl"
        >
          {/* <div className="absolute left-3 top-3 z-10 rounded-full bg-[#132B35] px-2.5 py-1 text-[10px] font-black text-[#FDE68A]">
            PASS {String(index + 1).padStart(2, "0")}
          </div> */}
          <div className="relative aspect-square w-full max-w-full overflow-hidden rounded-[22px] bg-[#F3E2C7]">
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
              className={`block h-full w-full object-cover ${photo.align}`}
              priority={index === 0}
            />
          </div>
          <figcaption className="px-2 pb-2 pt-3 text-center text-[13px] font-black leading-snug text-[#132B35]">
            {photo.caption}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

function BroCodeBoard({ reasons }: { reasons: TemplateData["reasons"] }) {
  return (
    <div className="relative mt-8 rounded-[34px] border border-[#D7B98F]/80 bg-[#FFF8EA]/58 p-3 shadow-[0_28px_90px_rgba(31,78,95,0.12)] backdrop-blur-xl sm:p-5">
      <div className="absolute inset-x-5 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[#73502F]/24 to-transparent lg:block" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.title}
            variants={cardFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            whileTap={{ scale: 0.985, y: -2 }}
            className="relative min-h-[112px] overflow-hidden rounded-[24px] border border-[#D7B98F]/70 bg-[linear-gradient(135deg,rgba(255,248,234,0.90),rgba(217,226,209,0.68))] p-4 shadow-[0_16px_45px_rgba(31,78,95,0.10)]"
          >
            <div className="absolute -right-4 -top-10 z-0 h-16 w-16 rounded-full border-[12px] border-[#1F4E5F]/8" />
            <div className="relative z-10 flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#132B35] text-sm font-black text-[#FDE68A] shadow-[0_12px_28px_rgba(19,43,53,0.18)]">
                {reason.icon}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B45309]">
                  Code {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 text-sm font-black leading-tight text-[#132B35] sm:text-base">{reason.title}</div>
                <p className="mt-1.5 text-xs font-semibold leading-relaxed text-[#4F5F52]">{reason.copy}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function BirthdayYaariPage() {
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
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#FFF7E4_0%,#F5E1C1_38%,#D9E2D1_72%,#ECF3EF_100%)] pb-[140px] text-[#132B35]">
      {audio}
      <FloatingDecor />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(245,158,11,0.24),transparent_34%),radial-gradient(circle_at_86%_14%,rgba(31,78,95,0.18),transparent_32%),radial-gradient(circle_at_45%_78%,rgba(49,92,69,0.18),transparent_38%)]" />

      <button
        type="button"
        onClick={toggleMusic}
        aria-pressed={musicOn}
        className="ww-music-button fixed right-4 z-30 inline-flex items-center gap-2 rounded-full border border-[#F2D7B6]/80 bg-[#FFF8EA]/82 px-4 py-2 text-xs font-black text-[#73502F] shadow-[0_18px_50px_rgba(31,78,95,0.14)] backdrop-blur-xl"
      >
        <span className={cn("h-2 w-2 rounded-full", musicOn ? "bg-[#315C45] shadow-[0_0_12px_rgba(49,92,69,0.65)]" : "bg-[#F59E0B]")} />
        {musicOn ? "Vibe on" : "Vibe off"}
      </button>

      <section className="relative grid min-h-screen place-items-center px-4 py-12 sm:px-6 lg:px-8">
        <ConfettiBurst active={burstKey > 0} key={burstKey} />
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex rounded-full border border-[#D7B98F]/70 bg-[#FFF8EA]/78 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#B45309] backdrop-blur">
              Yaari birthday page
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.065em] text-[#132B35] sm:text-7xl lg:text-8xl">
              {data.hero.headline}
              <span className="block bg-gradient-to-r from-[#B45309] via-[#315C45] to-[#1F4E5F] bg-clip-text text-transparent">
                {data.friendName}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#4F5F52] sm:text-lg">
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
                animate={reducedMotion ? undefined : { boxShadow: ["0 24px 70px rgba(31,78,95,0.16)", "0 24px 88px rgba(31,78,95,0.30)", "0 24px 70px rgba(31,78,95,0.16)"] }}
                transition={reducedMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl bg-gradient-to-r from-[#1F4E5F] to-[#315C45] px-6 py-4 text-sm font-black text-white shadow-[0_24px_70px_rgba(31,78,95,0.22)]"
              >
                {data.hero.cta}
              </motion.button>
              <button
                type="button"
                onClick={() => scrollTo("cake")}
                className="rounded-2xl border border-[#D7B98F]/70 bg-[#FFF8EA]/78 px-6 py-4 text-sm font-black text-[#73502F] shadow-sm backdrop-blur"
              >
                Cake scene
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {data.hero.chips.map((chip) => (
                <span key={chip} className="rounded-full border border-[#D7B98F]/70 bg-[#FFF8EA]/72 px-3 py-2 text-xs font-black text-[#73502F]">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96, rotate: -1.2 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1, rotate: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[44px] bg-gradient-to-br from-[#F59E0B]/36 via-[#315C45]/18 to-[#1F4E5F]/24 blur-2xl" />
            <div className="relative overflow-hidden rounded-[40px] border border-[#F2D7B6]/80 bg-[#FFF8EA]/78 p-3 shadow-[0_34px_100px_rgba(31,78,95,0.18)] backdrop-blur-2xl">
              <div className="relative aspect-[4/5] w-full max-w-full overflow-hidden rounded-[32px] bg-[#F3E2C7]">
                <Image
                  src={rooftopMemory}
                  alt="Two close friends smiling"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="block h-full w-full object-cover object-center"
                />
                <div className="absolute inset-x-5 bottom-1 rounded-3xl border border-white/28 bg-[#132B35]/34 p-2 text-center text-white shadow-[0_18px_55px_rgba(0,0,0,0.20)] backdrop-blur-xl">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-white/72">for my bhai</div>
                  <div className="mt-2 text-2xl font-black tracking-[-0.04em]">Apni yaari always same</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionShell id="memories" eyebrow={data.gallery.eyebrow} title={data.gallery.title}>
        <MemoryGallery photos={data.gallery.photos} />
      </SectionShell>

      <SectionShell id="reasons" eyebrow="Why this yaari matters" title="Six reasons tu brother hai">
        <BroCodeBoard reasons={data.reasons} />
      </SectionShell>

      <SectionShell id="cake" eyebrow="Cake celebration" title={data.cake.title}>
        <div className="relative mt-8 overflow-hidden rounded-[36px] border border-[#F2D7B6]/80 bg-[#FFF8EA]/76 p-4 shadow-[0_28px_90px_rgba(31,78,95,0.13)] backdrop-blur-xl sm:p-6">
          <ConfettiBurst active={cakeOpen} key={`cake-${burstKey}-${cakeOpen}`} />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="max-w-xl text-sm font-semibold leading-relaxed text-[#4F5F52] sm:text-base">{data.cake.body}</p>
              <motion.button
                type="button"
                onClick={() => {
                  setCakeOpen(true);
                  triggerBurst();
                }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full rounded-2xl bg-[#1F4E5F] px-5 py-4 text-sm font-black text-white shadow-[0_18px_55px_rgba(31,78,95,0.18)] sm:w-auto"
              >
                {data.cake.button}
              </motion.button>
              {cakeOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-3xl border border-[#D7B98F]/60 bg-[#FFF7E4] p-5 text-lg font-black text-[#73502F]"
                >
                  {data.cake.reveal}
                </motion.div>
              ) : null}
            </div>
            <div className="relative aspect-[2/3] w-full max-w-full overflow-hidden rounded-[30px] bg-[#F3E2C7]">
              <Image src={data.cake.image} alt="Birthday cake moment" fill sizes="(min-width: 1024px) 40vw, 100vw" className="block h-full w-full object-cover object-center" />
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="gift" eyebrow="Birthday gift" title={data.gift.title}>
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
                animate={reducedMotion ? undefined : { y: [0, -3, 0], rotate: [0, -0.8, 0.8, 0] }}
                transition={reducedMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                whileTap={{ scale: 0.98, rotate: 0 }}
                className="group relative min-h-[280px] overflow-hidden rounded-[36px] border border-[#D7B98F]/80 bg-[radial-gradient(circle_at_50%_12%,rgba(253,230,138,0.70),transparent_34%),linear-gradient(135deg,#1F4E5F,#315C45,#B45309)] p-8 text-left shadow-[0_28px_90px_rgba(31,78,95,0.18)]"
              >
                <div className="absolute left-1/2 top-0 h-full w-10 -translate-x-1/2 bg-white/22" />
                <div className="absolute left-0 top-1/2 h-10 w-full -translate-y-1/2 bg-white/22" />
                <div className="relative z-10 text-xs font-black uppercase tracking-[0.22em] text-white/76">tap to open</div>
                <div className="relative z-10 mt-20 text-4xl font-black tracking-[-0.05em] text-white">{data.gift.button}</div>
              </motion.button>
              <div className="rounded-[34px] border border-[#F2D7B6]/80 bg-[#FFF8EA]/78 p-6 shadow-[0_22px_70px_rgba(31,78,95,0.10)] backdrop-blur-xl">
                <p className="text-sm font-semibold leading-relaxed text-[#4F5F52] sm:text-base">{data.gift.body}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gift-message"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative mt-8 overflow-hidden rounded-2xl border border-[#D7B98F]/70 bg-[#FFF8EA] p-6 text-center shadow-[0_22px_70px_rgba(31,78,95,0.10)]"
            >
              <ConfettiBurst active={giftOpen} key={`gift-${burstKey}`} />
              <div className="text-3xl mb-3">🎁✨</div>
              <p className="mx-auto max-w-xl text-sm font-semibold leading-relaxed text-[#4F5F52] sm:text-base">{data.gift.body}</p>
              <p className="mx-auto mt-5 max-w-2xl text-2xl font-black leading-tight text-[#132B35]">{data.gift.reveal}</p>
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

      <SectionShell id="note" eyebrow="Nostalgic note" title={data.note.title}>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.78fr] lg:items-stretch">
          <div className="overflow-hidden rounded-[36px] border border-[#F2D7B6]/80 bg-[#FFF8EA]/78 p-6 shadow-[0_24px_80px_rgba(31,78,95,0.12)] backdrop-blur-xl sm:p-8">
            <p className="max-w-4xl text-2xl font-black leading-tight tracking-[-0.035em] text-[#132B35] sm:text-4xl">
              {data.note.body}
            </p>
            <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#B45309]">- {data.fromName}</p>
          </div>
          <div className="relative aspect-[4/5] w-full max-w-full overflow-hidden rounded-[36px] border border-[#F2D7B6]/80 bg-[#F3E2C7] shadow-[0_24px_80px_rgba(31,78,95,0.12)]">
            <Image src={foodMemory} alt="Friends sharing food" fill sizes="(min-width: 1024px) 36vw, 100vw" className="block h-full w-full object-cover object-center" />
          </div>
        </div>
      </SectionShell>

      <section className="relative px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-[#F2D7B6]/80 bg-[linear-gradient(135deg,#FFF8EA,#D9E2D1,#ECF3EF)] p-6 text-center shadow-[0_32px_100px_rgba(31,78,95,0.14)] sm:p-10">
          <div className="text-xs font-black uppercase tracking-[0.22em] text-[#B45309]">Final birthday wish</div>
          <RevealHeading className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-[-0.06em] text-[#132B35] sm:text-6xl">{data.finale.title}</RevealHeading>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-[#4F5F52] sm:text-base">{data.finale.body}</p>
          <div className="mt-8 grid gap-3 sm:flex sm:justify-center">
            <motion.button type="button" onClick={replay} whileTap={{ scale: 0.98 }} className="rounded-2xl bg-[#132B35] px-6 py-4 text-sm font-black text-white">
              {data.finale.replay}
            </motion.button>
            <motion.button type="button" onClick={triggerBurst} whileTap={{ scale: 0.98 }} className="rounded-2xl border border-[#D7B98F]/70 bg-[#FFF8EA]/78 px-6 py-4 text-sm font-black text-[#73502F]">
              {data.finale.treat}
            </motion.button>
          </div>
        </div>
      </section>

      <DemoStickyCTA occasion="Birthday" templateName="Birthday Yaari" recipientName={data.friendName} demoUrl="/birthday-yaari" />
    </main>
  );
}
