"use client";

import { useCallback, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { scrollToSection } from "@/lib/scrollToSection";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const PROPOSAL_LETTER_SECTION_ID = "proposal-letter";

export function useLetterScrollArrival(letterSectionId = PROPOSAL_LETTER_SECTION_ID) {
  const [highlightActive, setHighlightActive] = useState(false);

  const scrollToLetter = useCallback(
    (onBeforeScroll?: () => void) => {
      onBeforeScroll?.();
      scrollToSection(letterSectionId);
      setHighlightActive(true);
      window.setTimeout(() => setHighlightActive(false), 1000);
    },
    [letterSectionId],
  );

  return { highlightActive, scrollToLetter };
}

type LetterArrivalHighlightProps = {
  active: boolean;
  children: ReactNode;
  className?: string;
  /** RGB components only, e.g. "244,114,182" */
  ringRgb?: string;
};

/** Brief one-time ring / pulse when landing on the letter section after scroll. */
export function LetterArrivalHighlight({
  active,
  children,
  className,
  ringRgb = "244,114,182",
}: LetterArrivalHighlightProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative", className)}
      initial={false}
      animate={
        active
          ? reducedMotion
            ? { opacity: [1, 0.9, 1] }
            : {
                scale: [1, 1.012, 1],
                boxShadow: [
                  `0 0 0 0 rgba(${ringRgb},0)`,
                  `0 0 0 3px rgba(${ringRgb},0.38)`,
                  `0 0 0 0 rgba(${ringRgb},0)`,
                ],
              }
          : {}
      }
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
