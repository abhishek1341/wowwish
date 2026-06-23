"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const DEFAULT_GLYPHS = ["♥", "✨", "💫", "♡", "✦"];

type DelightCTAProps = {
  children: ReactNode;
  className?: string;
  /** Optional inline message shown briefly after tap. */
  message?: string;
  glyphs?: string[];
};

/** Treatment B (Delight): playful tap reaction with no navigation. */
export function DelightCTA({
  children,
  className,
  message,
  glyphs = DEFAULT_GLYPHS,
}: DelightCTAProps) {
  const reducedMotion = useReducedMotion();
  const [burstKey, setBurstKey] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, index) => ({
        id: `${burstKey}-${index}`,
        glyph: glyphs[index % glyphs.length],
        x: (index - 2) * 22 + (index % 2 === 0 ? 6 : -6),
        rise: 36 + index * 12,
        drift: index % 2 === 0 ? 14 : -14,
      })),
    [burstKey, glyphs],
  );

  const handleClick = useCallback(() => {
    if (message) {
      setShowMessage(true);
      window.setTimeout(() => setShowMessage(false), 2400);
    }
    if (!reducedMotion) {
      setBurstKey((value) => value + 1);
    }
  }, [message, reducedMotion]);

  return (
    <span className="relative inline-flex flex-col items-center gap-2">
      <span className="relative inline-flex">
        <button
          type="button"
          onClick={handleClick}
          className={cn(
            "cursor-pointer transition hover:brightness-[1.04] hover:shadow-md active:scale-[0.98]",
            className,
          )}
        >
          {children}
        </button>

        {!reducedMotion ? (
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
            <AnimatePresence mode="popLayout">
              {burstKey > 0
                ? particles.map((particle) => (
                    <motion.span
                      key={particle.id}
                      className="absolute left-1/2 top-1/2 text-base leading-none"
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
                      animate={{
                        opacity: [0, 1, 0],
                        x: particle.drift,
                        y: -particle.rise,
                        scale: [0.6, 1.1, 0.85],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {particle.glyph}
                    </motion.span>
                  ))
                : null}
            </AnimatePresence>
          </span>
        ) : null}
      </span>

      <AnimatePresence>
        {message && showMessage ? (
          <motion.span
            key="delight-message"
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-xs font-semibold opacity-80"
            role="status"
          >
            {message}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
