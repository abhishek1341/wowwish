import type { ReactNode } from "react";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function PhoneMockup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[280px] rounded-[42px] border border-slate-900/10 bg-white/65 p-3 shadow-[0_26px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-[radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.16),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[42px] opacity-[0.06] [background-image:radial-gradient(rgba(15,23,42,1)_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-rose-50 to-white">
        <div className="flex items-center justify-center pb-2 pt-3">
          <div className="h-1.5 w-16 rounded-full bg-slate-900/10" />
        </div>
        {children}
      </div>
    </div>
  );
}
