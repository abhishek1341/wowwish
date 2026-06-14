"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: "light" | "dark" | "premium";
};

export default function Accordion({ title, children, defaultOpen, variant }: AccordionProps) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const contentId = useId();

  const isDark = variant === "dark";
  const isPremium = variant === "premium";

  const shellClass = isDark
    ? "border-white/15 bg-white/10"
    : isPremium
      ? "border-[#D4AF37]/40 bg-white/10"
      : "border-slate-900/10 bg-white/70";

  const titleClass = isDark ? "text-white" : isPremium ? "text-[#FFF8EA]" : "text-slate-900";
  const chevronClass = isDark ? "text-white/70" : isPremium ? "text-[#FFF8EA]/80" : "text-slate-700";
  const panelClass = isDark
    ? "border-white/10 bg-white/5"
    : isPremium
      ? "border-white/10 bg-white/5"
      : "border-slate-900/10 bg-white/70";

  return (
    <div className={`rounded-2xl border ${shellClass}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left"
        aria-expanded={open}
        aria-controls={contentId}
      >
        <span className={`text-sm font-semibold ${titleClass}`}>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${chevronClass} ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-0">
              <div className={`rounded-2xl border ${panelClass} p-2.5`}>{children}</div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
