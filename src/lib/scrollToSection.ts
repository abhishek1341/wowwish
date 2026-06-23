export function scrollToSection(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/** Apply to any element used as a scroll target so sticky headers do not cover it. */
export const SCROLL_SECTION_OFFSET_CLASS = "scroll-mt-24";
