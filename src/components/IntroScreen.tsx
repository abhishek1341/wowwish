"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import RomanticBackground from "@/components/RomanticBackground";

export default function IntroScreen() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/letters");
    }, 2400);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <RomanticBackground variant="soft" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="mx-auto mb-6 grid h-24 w-24 place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-rose-200 via-pink-200 to-rose-300 shadow-[0_18px_60px_rgba(244,63,94,0.22)] ring-1 ring-rose-200/60">
            <div className="relative h-16 w-16">
              <Image
                src="/intro_letter_icon.png"
                alt="Letter icon"
                fill
                className="object-contain"
                sizes="64px"
                priority
              />
            </div>
          </div>

          <h1 className="text-balance font-serif text-5xl tracking-tight text-rose-950 sm:text-6xl">
            Letters for you
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-sm text-rose-900/70 sm:text-base">
            A little collection of feelings — for the days you need them most.
          </p>

          <motion.div
            className="mx-auto mt-8 h-1.5 w-44 rounded-full bg-gradient-to-r from-transparent via-rose-400/50 to-transparent"
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </main>
  );
}
