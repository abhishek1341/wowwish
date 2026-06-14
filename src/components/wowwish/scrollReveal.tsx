"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const revealViewport = { once: true, amount: 0.1 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

export const cardFadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
} as const;

export const statCardReveal = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
} as const;

export const borderDraw = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

export function RevealHeading({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const inView = useInView(ref, revealViewport);

  return (
    <motion.h2 ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className={className} style={style}>
      {children}
    </motion.h2>
  );
}

export function RevealText({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.p
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
