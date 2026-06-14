"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import type { TemplateCategoryId } from "@/lib/templates";
import SiteHeader from "@/components/site/SiteHeader";
import StickyBottomCTA from "@/components/site/StickyBottomCTA";
import LeadModal from "@/components/site/LeadModal";
import SiteFooter from "@/components/site/SiteFooter";
import { LeadModalContext } from "@/components/site/leadModalContext";
import { SiteUiContext } from "@/components/site/siteUiContext";

type MarketingShellProps = {
  children: ReactNode;
  leadSource: string;
  initialTemplateSlug?: string;
  initialOccasion?: TemplateCategoryId;
};

export default function MarketingShell({
  children,
  leadSource,
  initialTemplateSlug,
  initialOccasion,
}: MarketingShellProps) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [pricingInView, setPricingInView] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [templatesInView, setTemplatesInView] = useState(false);
  const [templateSlug, setTemplateSlug] = useState<string | undefined>(initialTemplateSlug);
  const [occasion, setOccasion] = useState<TemplateCategoryId | undefined>(initialOccasion);
  const [source, setSource] = useState<string>(leadSource);

  const modalKey = useMemo(() => {
    return `${source}_${occasion ?? ""}_${templateSlug ?? ""}`;
  }, [source, occasion, templateSlug]);

  const value = useMemo(
    () => ({
      openLead: (params?: {
        templateSlug?: string;
        occasion?: TemplateCategoryId;
        source?: string;
      }) => {
        setSource(params?.source ?? leadSource);
        setOccasion(params?.occasion ?? initialOccasion);
        setTemplateSlug(params?.templateSlug ?? initialTemplateSlug);
        setOpen(true);
      },
      closeLead: () => setOpen(false),
    }),
    [leadSource, initialOccasion, initialTemplateSlug],
  );

  return (
    <LeadModalContext.Provider value={value}>
      <SiteUiContext.Provider
        value={{
          menuOpen,
          setMenuOpen,
          leadModalOpen: open,
          contactInView,
          setContactInView,
          pricingInView,
          setPricingInView,
          footerInView,
          setFooterInView,
          templatesInView,
          setTemplatesInView,
        }}
      >
        <div className="relative min-h-screen overflow-hidden pb-6 md:pb-0">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-28 top-[-160px] h-[560px] w-[560px] rounded-full bg-[rgba(255,142,111,0.19)] blur-3xl" />
            <div className="absolute -right-36 top-[10px] h-[620px] w-[620px] rounded-full bg-[rgba(157,117,255,0.17)] blur-3xl" />
            <div className="absolute left-[40%] top-[44%] h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[rgba(232,197,122,0.14)] blur-3xl" />
            <div className="absolute left-[-140px] top-[70%] h-[560px] w-[560px] rounded-full bg-[rgba(232,111,145,0.15)] blur-3xl" />
          </div>

          <div className="relative">
            <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            {children}
            <SiteFooter />
            <StickyBottomCTA />
            <LeadModal
              key={modalKey}
              open={open}
              onClose={() => setOpen(false)}
              initialTemplateSlug={templateSlug}
              initialOccasion={occasion}
              source={source}
            />
          </div>
        </div>
      </SiteUiContext.Provider>
    </LeadModalContext.Provider>
  );
}
