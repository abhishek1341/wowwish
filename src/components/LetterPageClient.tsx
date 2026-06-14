"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Letter } from "@/lib/letters";
import LetterPageLayout from "@/components/LetterPageLayout";

function PaperCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-3xl bg-gradient-to-b from-rose-50/95 via-white/90 to-pink-50/95 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] ring-1 ring-white/25 backdrop-blur " +
        className
      }
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(244,63,94,0.15)_1px,transparent_0)] [background-size:16px_16px]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export default function LetterPageClient({ letter }: { letter: Letter }) {
  return (
    <LetterPageLayout
      title={letter.title}
      hideTitle={letter.id === "tired"}
    >
      {letter.id === "hug" && (
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur">
            <motion.div
              initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full"
            >
              <Image
                src={letter.images.primary ?? "/hug_letter.png"}
                alt="Hug letter"
                width={1600}
                height={900}
                className="h-auto w-full rounded-3xl ring-1 ring-white/15"
                sizes="(max-width: 768px) 92vw, 820px"
                priority
              />
            </motion.div>

            <div className="mt-6 text-center">
              <p className="font-serif text-2xl text-rose-50">
                {letter.message.headline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-rose-100/80 sm:text-base">
                {letter.message.body}
              </p>
            </div>
          </div>
        </div>
      )}

      {letter.id === "smile" && (
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur"
          >
            <Image
              src={letter.images.primary ?? "/smile_letter.png"}
              alt="Smile letter"
              width={1600}
              height={900}
              className="h-auto w-full rounded-3xl"
              sizes="(max-width: 768px) 92vw, 900px"
              priority
            />
          </motion.div>
        </div>
      )}

      {letter.id === "miss" && (
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full"
              >
                <Image
                  src={letter.images.illustration ?? "/miss_letter.png"}
                  alt="Miss letter"
                  width={1600}
                  height={900}
                  className="h-auto w-full rounded-3xl ring-1 ring-white/15"
                  sizes="(max-width: 768px) 92vw, 820px"
                  priority
                />
              </motion.div>

              <div className="mt-6 text-center">
                <p className="font-serif text-2xl text-rose-50">
                  {letter.message.headline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-rose-100/80 sm:text-base">
                  {letter.message.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {letter.id === "tired" && (
        <TiredExperience
          backgroundSrc={letter.images.primary ?? "/tired_letter.png"}
          lockSrc={letter.images.lock ?? "/images/lock-heart.svg"}
          keySrc={letter.images.key ?? "/images/key-heart.svg"}
          tiredHeadline={letter.message.headline ?? ""}
          tiredMessage={letter.message.body}
        />
      )}
    </LetterPageLayout>
  );
}

function TiredExperience({
  backgroundSrc,
  lockSrc,
  keySrc,
  tiredHeadline,
  tiredMessage,
}: {
  backgroundSrc: string;
  lockSrc: string;
  keySrc: string;
  tiredHeadline: string;
  tiredMessage: string;
}) {
  const [phase, setPhase] = useState<"idle" | "animating" | "revealed">("idle");

  useEffect(() => {
    if (phase !== "animating") return;
    const t = setTimeout(() => setPhase("revealed"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
          >
            <Image
              src={backgroundSrc}
              alt="Tired letter"
              width={1600}
              height={900}
              className="h-auto w-full rounded-3xl ring-1 ring-white/15"
              sizes="(max-width: 768px) 92vw, 820px"
              priority
            />
          </motion.div>

          <div className="mt-6 text-center">
            {tiredHeadline ? (
              <p className="font-serif text-2xl text-rose-50">{tiredHeadline}</p>
            ) : null}
            <p className="mt-4 text-sm leading-relaxed text-rose-100/80 sm:text-base">
              {tiredMessage}
            </p>
          </div>

          <div className="mt-7 w-full">
            {phase !== "revealed" ? (
              <motion.div
                initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex max-w-lg flex-col items-center text-center"
              >
                <p className="mb-4 font-serif text-xl text-rose-50 sm:text-2xl">
                  You&apos;re key to my heart
                </p>

                <motion.p
                  className="mb-6 text-sm text-rose-50/80"
                  animate={{ opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  Tap the heart lock…
                </motion.p>

                <div className="flex items-center justify-center gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, x: 0, y: 0 }}
                    animate={
                      phase === "animating"
                        ? { x: 42, y: 6, rotate: -8, scale: 0.98 }
                        : { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }
                    }
                    transition={
                      phase === "animating"
                        ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                        : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                    }
                  >
                    <Image
                      src={keySrc}
                      alt="Key"
                      width={120}
                      height={120}
                      className="select-none drop-shadow-[0_18px_40px_rgba(244,63,94,0.25)]"
                      priority
                    />
                  </motion.div>

                  <motion.button
                    type="button"
                    aria-label="Reveal love"
                    onClick={() => {
                      if (phase !== "idle") return;
                      setPhase("animating");
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <Image
                      src={lockSrc}
                      alt="Heart lock"
                      width={140}
                      height={140}
                      className="select-none drop-shadow-[0_22px_55px_rgba(244,63,94,0.30)]"
                      priority
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow:
                          phase === "animating"
                            ? "0 0 90px rgba(244,63,94,0.55)"
                            : "0 0 60px rgba(244,63,94,0.35)",
                      }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, filter: "blur(14px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto grid min-h-[260px] max-w-2xl place-items-center rounded-3xl bg-gradient-to-b from-rose-600/35 via-pink-500/20 to-rose-600/35 p-10 text-center ring-1 ring-white/20 backdrop-blur"
              >
                <p className="font-serif text-5xl tracking-tight text-rose-50 sm:text-6xl">
                  I LOVE YOU
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
