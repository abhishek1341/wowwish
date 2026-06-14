"use client";

import { createContext, useContext } from "react";

type SiteUiState = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  leadModalOpen: boolean;
  contactInView: boolean;
  setContactInView: (v: boolean) => void;
  pricingInView: boolean;
  setPricingInView: (v: boolean) => void;
  footerInView: boolean;
  setFooterInView: (v: boolean) => void;
  templatesInView: boolean;
  setTemplatesInView: (v: boolean) => void;
};

export const SiteUiContext = createContext<SiteUiState | null>(null);

export function useSiteUi() {
  const ctx = useContext(SiteUiContext);
  if (!ctx) throw new Error("useSiteUi must be used within MarketingShell");
  return ctx;
}
