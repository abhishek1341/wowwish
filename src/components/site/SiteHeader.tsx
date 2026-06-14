"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { useLeadModal } from "@/components/site/leadModalContext";
import { BRAND_INITIALS, BRAND_NAME, SITE_CONTAINER } from "@/components/site/siteConstants";

const NAV = [
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Contact", href: "/contact" },
] as const;

export default function SiteHeader({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const { openLead } = useLeadModal();

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);

  const activeHref = useMemo(() => {
    return NAV.find((n) => (n.href.startsWith("/#") ? pathname === "/" : pathname?.startsWith(n.href)))?.href;
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/35 bg-white/60 backdrop-blur-xl">
      <div className={SITE_CONTAINER + " flex items-center justify-between gap-4 py-3"}>
        <Link href="/" className="group inline-flex items-center gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-[#FFBCA6]/70 via-[#E8C57A]/55 to-[#C4A7FF]/55 shadow-[0_18px_60px_rgba(22,32,70,0.16)] ring-1 ring-white/60">
            <span className="text-sm font-semibold text-rose-950">{BRAND_INITIALS}</span>
          </span>
          <span className="text-sm font-semibold tracking-tight text-[#162046]">{BRAND_NAME}</span>
          <span className="ml-1 rounded-full border border-slate-900/10 bg-white/60 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
            beta
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={
                "text-sm font-semibold transition " +
                (activeHref === n.href ? "text-[#162046]" : "text-slate-700 hover:text-[#162046]")
              }
            >
              {n.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => {
              trackEvent("make_this_click", { source: "header" });
              openLead({ source: "header" });
            }}
            className="rounded-2xl bg-[#162046] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(22,32,70,0.18)] transition hover:bg-[#0f1735]"
          >
            Start My Page
          </button>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-900/10 bg-white/70 p-2.5 text-slate-900 shadow-sm transition hover:bg-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {!menuOpen ? null : (
        <div className="border-t border-slate-900/10 bg-white/80 py-4 backdrop-blur-xl md:hidden">
          <div className={SITE_CONTAINER + " space-y-2"}>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block rounded-2xl px-3 py-3 text-sm font-semibold text-slate-900 hover:bg-white"
              >
                {n.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                trackEvent("make_this_click", { source: "menu" });
                openLead({ source: "menu" });
              }}
              className="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
            >
              Start My Page
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
