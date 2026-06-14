"use client";

type DemoStickyCTAProps = {
  occasion: string;
  templateName: string;
  packageId?: "surprise" | "premium";
  priceText?: string;
  demoUrl?: string;
  recipientName?: string;
};

export default function DemoStickyCTA(_props: DemoStickyCTAProps) {
  return (
    <div className="py-6 text-center">
      <div className="inline-flex items-center justify-center gap-1.5 text-xs font-medium opacity-40">
        <img src="/images/wowwish-logo.png" alt="WowWish" className="h-4 w-4 object-contain" />
        <span>Made with WowWish</span>
      </div>
    </div>
  );
}
