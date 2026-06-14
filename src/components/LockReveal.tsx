"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LockReveal({
  lockSrc,
  keySrc,
  revealText,
}: {
  lockSrc: string;
  keySrc: string;
  revealText: string;
}) {
  const [open, setOpen] = useState(false);
  const sparklePositions = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        left: `${(i * 19 + 12) % 100}%`,
        top: `${(i * 27 + 6) % 100}%`,
        delay: i * 0.03,
      })),
    []
  );

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="relative rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur">
        <div className="flex items-center justify-center gap-6">
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
            aria-label="Open the lock"
          >
            <Image
              src={lockSrc}
              alt="Heart lock"
              width={140}
              height={140}
              className="select-none"
              priority
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ boxShadow: open ? "0 0 60px rgba(244,63,94,0.45)" : "0 0 38px rgba(244,63,94,0.25)" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.div
            animate={{ rotate: open ? -10 : 0, y: open ? -6 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="relative"
          >
            <Image
              src={keySrc}
              alt="Key"
              width={120}
              height={120}
              className="select-none"
              priority
            />
          </motion.div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, filter: "blur(12px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-center"
            >
              <div className="mx-auto inline-flex rounded-2xl bg-gradient-to-r from-rose-200/20 via-white/10 to-pink-200/20 px-5 py-3 ring-1 ring-white/20">
                <p className="font-serif text-3xl tracking-wide text-rose-50">
                  {revealText}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {sparklePositions.map((p, idx) => (
                <motion.span
                  key={idx}
                  className="absolute block h-1.5 w-1.5 rounded-full bg-rose-200/80"
                  style={{ left: p.left, top: p.top }}
                  animate={{ scale: [0.8, 1.6, 1], opacity: [0.1, 1, 0] }}
                  transition={{ duration: 0.9, delay: p.delay, repeat: Infinity, repeatDelay: 0.4 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-5 text-center text-xs text-rose-100/70">
          Tap the lock to reveal a tiny secret.
        </p>
      </div>
    </div>
  );
}
