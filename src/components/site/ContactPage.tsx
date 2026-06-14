"use client";

import type { ReactNode } from "react";
import { CalendarDays, Image as ImageIcon, Mail, MessageCircle, Sparkles, Type, Users } from "lucide-react";

import MarketingShell from "@/components/site/MarketingShell";
import { buildWhatsappLink } from "@/components/site/siteConstants";

const CONTACT_EMAIL = "wowwish.in@gmail.com";

export default function ContactPage() {
  return (
    <MarketingShell leadSource="contact">
      <ContactContent />
    </MarketingShell>
  );
}

function ContactContent() {
  const waHref = buildWhatsappLink({
    text: "Hi, I want to create a surprise page. Please share details.",
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFAF3] px-4 py-10 sm:px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.16),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Ready to make someone smile?</h1>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-700 sm:text-base">
          Tell us the occasion, send your photos, and we’ll help create a personal surprise page they’ll remember.
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-900/10 bg-gradient-to-br from-[#FFF7E8] via-[#FFFAF3] to-[#F1D8C7] p-6 shadow-[0_24px_90px_rgba(15,23,42,0.14)]">
          <div className="rounded-3xl border border-slate-900/10 bg-white/70 p-5 backdrop-blur-xl">
            <div className="text-sm font-semibold text-[#162046]">What to send us:</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <InfoRow icon={<Sparkles className="h-4 w-4" />} label="Occasion" />
              <InfoRow icon={<Users className="h-4 w-4" />} label="Names" />
              <InfoRow icon={<CalendarDays className="h-4 w-4" />} label="Date" />
              <InfoRow icon={<ImageIcon className="h-4 w-4" />} label="Photos" />
              <InfoRow icon={<Type className="h-4 w-4" />} label="Message tone" />
            </div>
          </div>

          <div className="mt-6 grid gap-2 sm:flex sm:items-center">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#162046] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_70px_rgba(22,32,70,0.28)]"
            >
              Chat on WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white/75 px-6 py-3 text-sm font-semibold text-[#162046] hover:bg-white"
            >
              Email Us
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3">
      <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-[#E8C57A]/35 to-[#EBC4BD]/30 text-[#162046] ring-1 ring-[#E8C57A]/25">
        {icon}
      </div>
      <div className="text-sm font-semibold text-slate-900">{label}</div>
    </div>
  );
}
