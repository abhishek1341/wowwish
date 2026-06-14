"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import {
  BRAND_INITIALS,
  BRAND_NAME,
  buildWhatsappLink,
  SITE_CONTAINER,
} from "@/components/site/siteConstants";
import { useSiteUi } from "@/components/site/siteUiContext";

const EMAIL = "wowwish.in@gmail.com";

export default function SiteFooter() {
  const { setFooterInView } = useSiteUi();
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setFooterInView(entry ? entry.isIntersecting : false);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      setFooterInView(false);
    };
  }, [setFooterInView]);

  const waHref = buildWhatsappLink({
    text: "Hi, I want to create a surprise page. Please share details.",
  });

  return (
    <footer ref={footerRef} className="mt-16 border-t border-white/10 bg-[#24183F] text-white">
      <div className={SITE_CONTAINER + " py-10"}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-[#FFBCA6]/80 via-[#E8C57A]/70 to-[#C4A7FF]/70 text-sm font-semibold text-[#162046] ring-1 ring-white/20">
                {BRAND_INITIALS}
              </span>
              <div className="text-lg font-semibold tracking-tight">{BRAND_NAME}</div>
            </div>
            <div className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
              Personal surprise pages for birthdays, anniversaries, proposals, and more.
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#E8C57A] px-4 py-2.5 text-sm font-semibold text-[#162046] shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
              >
                Email Us
              </a>
            </div>

            <div className="mt-6 text-xs font-semibold text-white/60">© 2026 {BRAND_NAME}</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FooterGroup
              title="Explore"
              links={[
                { href: "/templates", label: "Templates" },
                { href: "/#pricing", label: "Pricing" },
                { href: "/#how-it-works", label: "How it works" },
                { href: "/contact", label: "Contact" },
                { href: "/trust-privacy", label: "Trust & Privacy" },
              ]}
            />
            <FooterGroup title="Support" links={[{ href: "/contact", label: "Contact" }]} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup(props: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <div className="text-xs font-semibold tracking-[0.22em] text-white/60">{props.title.toUpperCase()}</div>
      <div className="mt-3 grid gap-2">
        {props.links.map((l) => (
          <Link key={l.href} href={l.href} className="text-sm font-semibold text-white/85 hover:text-white">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
