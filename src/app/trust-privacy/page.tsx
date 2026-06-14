import Link from "next/link";

import MarketingShell from "@/components/site/MarketingShell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Trust & Privacy | WowWish",
  description: "Learn how WowWish keeps your photos, messages, and personalized wish pages private.",
  path: "/trust-privacy",
});

export default function TrustPrivacyPage() {
  return (
    <MarketingShell leadSource="trust_privacy">
      <main className="relative min-h-screen overflow-hidden bg-[#FFFAF3] px-4 py-10 sm:px-6">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(232,197,122,0.20),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(235,196,189,0.18),transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:84px_84px]" />
        </div>

        <div className="relative mx-auto w-full max-w-3xl">
          <div className="rounded-3xl border border-slate-900/10 bg-white/70 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div className="text-xs font-semibold tracking-[0.22em] text-slate-700/60">TRUST & PRIVACY</div>
            <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-[#162046] sm:text-5xl">
              Your memories stay yours.
            </h1>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-700 sm:text-base">
              We build your surprise page from the photos and message you share. We keep everything private and use it only for your order.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                "Your photos are used only to create your page",
                "Private share link",
                "No app install required",
                "WhatsApp/Instagram friendly",
                "We do not post your photos publicly without permission",
                "You can request deletion after delivery",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900"
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl bg-[#162046] px-5 py-3 text-sm font-semibold text-white"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MarketingShell>
  );
}
