"use client";

import { motion } from "framer-motion";

export default function RomanticBackground({
  variant = "deep",
}: {
  variant?: "deep" | "soft";
}) {
  const isSoft = variant === "soft";

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className={
          isSoft
            ? "absolute inset-0 bg-gradient-to-b from-rose-50 via-rose-50 to-pink-100"
            : "absolute inset-0 bg-gradient-to-b from-rose-900 via-rose-800 to-rose-950"
        }
      />

      <div className="absolute inset-0 opacity-90">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-rose-400/25 blur-3xl" />
        <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-pink-300/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-red-300/20 blur-3xl" />
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0 }}
      >
        {Array.from({ length: 18 }).map((_, i) => {
          const size = 12 + (i % 6) * 3; // small + medium hearts
          const duration = 18 + (i % 7) * 3;
          const x = (i * 19 + 11) % 100;
          const startY = ((i * 17) % 120) - 20;

          return (
            <motion.div
              key={i}
              className={isSoft ? "absolute text-rose-300/40" : "absolute text-rose-200/30"}
              style={{
                left: `${x}%`,
                top: 0,
                fontSize: `${size}px`,
                filter: isSoft
                  ? "drop-shadow(0 0 16px rgba(244,63,94,0.22))"
                  : "drop-shadow(0 0 16px rgba(251,113,133,0.20))",
              }}
              initial={{
                y: `${startY}vh`,
                opacity: 0.55,
                rotate: -6,
              }}
              animate={{
                y: "120vh",
                x: [0, 10, -6, 0],
                rotate: [-6, 6, -4],
                opacity: [0.55, 0.55, 0.55, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ♥
            </motion.div>
          );
        })}
      </motion.div>

      <div
        className={
          isSoft
            ? "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-rose-50 to-transparent"
            : "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-rose-950 to-transparent"
        }
      />
    </div>
  );
}
