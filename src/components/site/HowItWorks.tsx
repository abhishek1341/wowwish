"use client";

import { Camera, Heart, Link2, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { label: "Pick a vibe", icon: <Sparkles className="h-4 w-4" /> },
    { label: "Send photos + names", icon: <Camera className="h-4 w-4" /> },
    { label: "We make your surprise page", icon: <Heart className="h-4 w-4" /> },
    { label: "Share the link & make them smile", icon: <Link2 className="h-4 w-4" /> },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <div
          key={s.label}
          className="rounded-3xl border border-slate-900/10 bg-white/70 p-5 shadow-[0_16px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-[#FFBCA6]/45 via-[#E8C57A]/35 to-[#C4A7FF]/35 text-xs font-semibold text-[#162046] ring-1 ring-[#E8C57A]/25">
              {i + 1}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
                <span className="text-[#162046]">{s.icon}</span>
                {s.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
