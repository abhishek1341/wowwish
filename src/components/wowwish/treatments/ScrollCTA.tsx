"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { scrollToSection } from "@/lib/scrollToSection";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ScrollCTAProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> & {
  /** Treatment A — id of the section to scroll into view. */
  scrollTargetId: string;
  children: ReactNode;
  /** Optional side effect after scroll starts (e.g. spark burst). */
  onScroll?: () => void;
};

/** Treatment A (Scroll): real navigation CTA that scrolls to a target section. */
export function ScrollCTA({ scrollTargetId, children, className, onScroll, ...rest }: ScrollCTAProps) {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToSection(scrollTargetId);
        onScroll?.();
      }}
      className={cn(
        "cursor-pointer transition hover:brightness-[1.04] hover:shadow-md active:scale-[0.98]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
