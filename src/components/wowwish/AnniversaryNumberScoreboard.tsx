"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { statCardReveal } from "@/components/wowwish/scrollReveal";

type Stat = {
  label: string;
  value: number | "infinity";
  pulse?: boolean;
};

function AnimatedNumber({
  value,
  start,
  accentColor,
  pulse,
}: {
  value: number | "infinity";
  start: boolean;
  accentColor: string;
  pulse?: boolean;
}) {
  const finalValue = value === "infinity" ? "∞" : value.toLocaleString("en-US");
  const [displayValue, setDisplayValue] = useState(finalValue);
  const [pulseReady, setPulseReady] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (value === "infinity") {
      setDisplayValue("∞");
      return;
    }

    if (!start || hasAnimatedRef.current) {
      setDisplayValue(finalValue);
      return;
    }

    hasAnimatedRef.current = true;

    const controls = animate(0, value, {
      duration: value > 100 ? 1.35 : 0.95,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        if (rounded <= 0) return;
        setDisplayValue(rounded.toLocaleString("en-US"));
      },
      onComplete: () => {
        setDisplayValue(finalValue);
        if (pulse) setPulseReady(true);
      },
    });

    return () => controls.stop();
  }, [finalValue, pulse, start, value]);

  if (value === "infinity") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={start ? { opacity: 1, y: 0 } : { opacity: 0.82, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl font-black leading-none tracking-tight sm:text-5xl"
        style={{ color: accentColor }}
      >
        {finalValue}
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={pulseReady ? { scale: [1, 1.15, 1] } : { scale: 1 }}
      transition={pulseReady ? { duration: 0.75, ease: "easeInOut" } : undefined}
      className="text-4xl font-black leading-none tracking-tight sm:text-5xl"
      style={{ color: accentColor }}
    >
      {displayValue}
    </motion.div>
  );
}

export default function AnniversaryNumberScoreboard({
  accentColor,
  cardBackground,
  borderColor,
  yearsValue,
  daysValue,
  citiesValue,
  photosValue,
}: {
  accentColor: string;
  cardBackground: string;
  borderColor: string;
  yearsValue: number;
  daysValue: number;
  citiesValue: number;
  photosValue: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.28, margin: "0px 0px -15% 0px" });
  const anniversaryStats: Stat[] = [
    { value: yearsValue, label: "Years together" },
    { value: daysValue, label: "Days we chose each other" },
    { value: citiesValue, label: "Cities we visited" },
    { value: photosValue, label: "Photos we kept" },
    { value: "infinity", label: "Inside jokes" },
    { value: 1, label: "Us", pulse: true },
  ];

  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {anniversaryStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            variants={statCardReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.45, delay: idx * 0.06 + (isInView ? 0.12 : 0), ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border px-4 py-5 text-center shadow-[0_18px_60px_rgba(15,23,42,0.06)] sm:px-5 sm:py-6"
            style={{ background: cardBackground, borderColor }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
            />
            <AnimatedNumber value={stat.value} start={isInView} accentColor={accentColor} pulse={stat.pulse} />
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700/70 sm:text-sm">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-5 text-center text-sm font-medium italic text-slate-700/72">
        Small numbers. Big life.
      </p>
    </div>
  );
}
