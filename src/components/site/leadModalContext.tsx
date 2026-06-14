"use client";

import { createContext, useContext } from "react";

import type { TemplateCategoryId } from "@/lib/templates";

type LeadModalState = {
  openLead: (params?: {
    templateSlug?: string;
    occasion?: TemplateCategoryId;
    source?: string;
  }) => void;
  closeLead: () => void;
};

export const LeadModalContext = createContext<LeadModalState | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used within MarketingShell");
  return ctx;
}
