"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

import type { TemplateCategoryId, Template } from "@/lib/templates";
import { CATEGORY_LABELS, TEMPLATES } from "@/lib/templates";
import { trackEvent } from "@/lib/analytics";
import { BRAND_NAME, BRAND_TAGLINE, buildWhatsappLink } from "@/components/site/siteConstants";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

type PackageId = "basic" | "premium";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  initialTemplateSlug?: string;
  initialOccasion?: TemplateCategoryId;
  source?: string;
};

export default function LeadModal({
  open,
  onClose,
  initialTemplateSlug,
  initialOccasion,
  source,
}: LeadModalProps) {
  const templateDefault = useMemo(() => {
    if (initialTemplateSlug) return TEMPLATES.find((t) => t.slug === initialTemplateSlug);
    return undefined;
  }, [initialTemplateSlug]);

  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState<TemplateCategoryId>(initialOccasion ?? templateDefault?.category ?? "birthday");
  const [templateSlug, setTemplateSlug] = useState<string>(templateDefault?.slug ?? "");
  const [personName, setPersonName] = useState("");
  const [date, setDate] = useState("");
  const [tone, setTone] = useState("Romantic");
  const [pkg, setPkg] = useState<PackageId>("basic");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSuccess(false);

    if (initialOccasion) setOccasion(initialOccasion);
    if (templateDefault?.slug) setTemplateSlug(templateDefault.slug);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, initialOccasion, templateDefault?.slug, onClose]);

  const templatesForOccasion = useMemo(() => {
    return TEMPLATES.filter((t) => t.category === occasion);
  }, [occasion]);

  const templateSelected: Template | undefined = useMemo(() => {
    return TEMPLATES.find((t) => t.slug === templateSlug);
  }, [templateSlug]);

  if (!open) return null;

  const whatsappText = [
    `Hi! I want to customize a ${BRAND_NAME} surprise page.`,
    name ? `My name: ${name}` : "",
    `Occasion: ${CATEGORY_LABELS[occasion].title}`,
    templateSelected ? `Template: ${templateSelected.name} (${templateSelected.slug})` : templateSlug ? `Template: ${templateSlug}` : "",
    personName ? `Person's name: ${personName}` : "",
    date ? `Date: ${date}` : "",
    tone ? `Tone: ${tone}` : "",
    `Package: ${pkg === "basic" ? "₹499 Basic" : "₹999 Premium"}`,
    whatsappNumber ? `My WhatsApp: ${whatsappNumber}` : "",
    "Photos: I will send on WhatsApp",
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappLink = buildWhatsappLink({ text: whatsappText });

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="absolute inset-0 flex items-end justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:items-center sm:p-6">
        <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-[28px] border border-slate-900/10 bg-white/90 shadow-[0_30px_120px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:max-h-[min(85vh,780px)] max-h-[calc(100vh-2.5rem)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.16),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.14),transparent_55%)]" />

          <div className="relative flex items-start justify-between gap-4 border-b border-slate-900/10 px-5 py-4">
            <div>
              <div className="text-sm font-semibold text-slate-950">Make a {BRAND_NAME} page</div>
              <div className="mt-1 text-xs font-semibold text-slate-600">
                {BRAND_TAGLINE}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-900/10 bg-white/70 text-slate-900 hover:bg-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex-1 overflow-y-auto px-5 py-4">
            {success ? (
              <div className="rounded-3xl border border-slate-900/10 bg-white/70 p-5">
                <div className="text-base font-semibold text-slate-950">Done. We’ll reply on WhatsApp.</div>
                <div className="mt-2 text-sm text-slate-700">
                  If WhatsApp didn’t open automatically, tap below.
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { source: "lead_success" })}
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Open WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  trackEvent("lead_submit", {
                    source: source ?? "unknown",
                    occasion,
                    template: templateSelected?.slug ?? templateSlug,
                    package: pkg,
                  });

                  setSuccess(true);

                  window.setTimeout(() => {
                    trackEvent("whatsapp_click", { source: "lead_submit_autoredirect" });
                    window.open(whatsappLink, "_blank", "noopener,noreferrer");
                  }, 350);
                }}
              >
                <div className="text-xs font-semibold text-slate-600">Prefer form? Fill details below.</div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <div className="text-xs font-semibold text-slate-700">Your name</div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900/20"
                      placeholder="e.g. Abhi"
                    />
                  </label>

                  <label className="block">
                    <div className="text-xs font-semibold text-slate-700">WhatsApp number</div>
                    <input
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900/20"
                      placeholder="e.g. 98xxxxxx"
                      inputMode="tel"
                    />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <div className="text-xs font-semibold text-slate-700">Occasion</div>
                    <select
                      value={occasion}
                      onChange={(e) => {
                        const v = e.target.value as TemplateCategoryId;
                        setOccasion(v);
                        setTemplateSlug("");
                        trackEvent("category_view", { category: v, source: "lead_form" });
                      }}
                      className={cn(
                        "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-slate-900/20",
                      )}
                    >
                      {Object.entries(CATEGORY_LABELS).map(([id, meta]) => (
                        <option key={id} value={id} disabled={Boolean(meta.comingSoon)}>
                          {meta.title}{meta.comingSoon ? " (Coming soon)" : ""}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <div className="text-xs font-semibold text-slate-700">Template selected</div>
                    <select
                      value={templateSlug}
                      onChange={(e) => {
                        const v = e.target.value;
                        setTemplateSlug(v);
                        if (v) trackEvent("template_view", { template: v, source: "lead_form" });
                      }}
                      className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-slate-900/20"
                    >
                      <option value="">Select a template</option>
                      {templatesForOccasion.map((t) => (
                        <option key={t.slug} value={t.slug}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <div className="text-xs font-semibold text-slate-700">Person’s name</div>
                    <input
                      value={personName}
                      onChange={(e) => setPersonName(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900/20"
                      placeholder="e.g. Anjali"
                    />
                  </label>

                  <label className="block">
                    <div className="text-xs font-semibold text-slate-700">Date</div>
                    <input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900/20"
                      placeholder="e.g. 12 Aug"
                    />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <div className="text-xs font-semibold text-slate-700">Message tone</div>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-slate-900/20"
                    >
                      {[
                        "Romantic",
                        "Cute",
                        "Funny",
                        "Emotional",
                        "Premium",
                      ].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>

                  <fieldset className="block">
                    <legend className="text-xs font-semibold text-slate-700">Package</legend>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPkg("basic");
                          trackEvent("package_basic_click", { source: source ?? "lead_form" });
                        }}
                        className={cn(
                          "rounded-2xl border px-3 py-2.5 text-sm font-semibold transition",
                          pkg === "basic"
                            ? "border-slate-950 bg-slate-950 text-white"
                            : "border-slate-900/10 bg-white/70 text-slate-900 hover:bg-white",
                        )}
                      >
                        ₹499 Basic
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPkg("premium");
                          trackEvent("package_premium_click", { source: source ?? "lead_form" });
                        }}
                        className={cn(
                          "rounded-2xl border px-3 py-2.5 text-sm font-semibold transition",
                          pkg === "premium"
                            ? "border-slate-950 bg-slate-950 text-white"
                            : "border-slate-900/10 bg-white/70 text-slate-900 hover:bg-white",
                        )}
                      >
                        ₹999 Premium
                      </button>
                    </div>
                  </fieldset>
                </div>

                <div className="rounded-3xl border border-slate-900/10 bg-white/60 p-3">
                  <div className="text-xs font-semibold text-slate-700">Photos</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">Send photos on WhatsApp</div>
                  <div className="mt-1 text-xs text-slate-600">We keep them private and use only to create your page.</div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="submit"
                    className="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900"
                  >
                    Submit & open WhatsApp
                  </button>
                </div>

                <div className="text-xs font-semibold text-slate-600">
                  Or skip the form and{" "}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { source: source ?? "lead_form" })}
                    className="ml-1 text-slate-900 underline underline-offset-4"
                  >
                    WhatsApp
                  </a>
                  .
                </div>

                <div className="text-[11px] font-semibold text-slate-600">
                  No app install. You’ll receive a private link you can share on WhatsApp/Instagram.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
