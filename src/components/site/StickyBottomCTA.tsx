"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { useLeadModal } from "@/components/site/leadModalContext";
import { useSiteUi } from "@/components/site/siteUiContext";

export default function StickyBottomCTA() {
  const { openLead } = useLeadModal();
  const pathname = usePathname();
  const {
    menuOpen,
    leadModalOpen,
    contactInView,
    pricingInView,
    footerInView,
    templatesInView,
  } = useSiteUi();
  const [pastThreshold, setPastThreshold] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setPastThreshold(false);
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const hero = document.getElementById("hero");
        if (!hero) {
          setPastThreshold(window.scrollY >= 420);
          return;
        }

        const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
        setPastThreshold(window.scrollY >= heroBottom - 24);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const hide =
    Boolean(menuOpen) ||
    Boolean(leadModalOpen) ||
    Boolean(contactInView) ||
    Boolean(pricingInView) ||
    Boolean(footerInView) ||
    Boolean(templatesInView) ||
    pathname !== "/" ||
    !pastThreshold;

  if (hide) return null;

  return (
    <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 md:hidden">
      <button
        type="button"
        onClick={() => {
          trackEvent("make_this_click", { source: "sticky_pill" });
          openLead({ source: "sticky_pill" });
        }}
        className="pointer-events-auto inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-[#162046] via-[#24183F] to-[#162046] px-4 text-sm font-semibold text-white shadow-[0_14px_50px_rgba(22,32,70,0.20)]"
      >
        Start
      </button>
    </div>
  );
}
