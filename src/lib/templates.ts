export type TemplateCategoryId = "birthday" | "anniversary" | "proposal" | "wedding-invite";

export type TemplateId =
  | "birthday-classic"
  | "birthday-bestie"
  | "birthday-yaari"
  | "anniversary-classic"
  | "anniversary-cute"
  | "anniversary-elegant"
  | "proposal-classic"
  | "proposal-cute"
  | "proposal-luxury";

export type Template = {
  id: TemplateId;
  slug: string;
  name: string;
  category: TemplateCategoryId;
  vibe: string[];
  description: string;
  startingPriceInr: number;
  demoPath: string;
  previewImage?: string;
  trending?: boolean;
};

export const CATEGORY_LABELS: Record<TemplateCategoryId, { title: string; description: string; comingSoon?: boolean }> = {
  birthday: {
    title: "Birthday",
    description: "For warm birthday surprises with photos, music, and a private link.",
  },
  anniversary: {
    title: "Anniversary",
    description: "Romantic pages with photos, music, memories, and heartfelt words.",
  },
  proposal: {
    title: "Proposal",
    description: "Cute to luxury — the big question deserves a cinematic link.",
  },
  "wedding-invite": {
    title: "Wedding Invite / Digital Kankotri",
    description: "Coming soon. Join the waitlist.",
    comingSoon: true,
  },
};

export const TEMPLATES: Template[] = [
  {
    id: "anniversary-elegant",
    slug: "anniversary-elegant",
    name: "Anniversary Elegant",
    category: "anniversary",
    vibe: ["Premium", "Elegant", "Soft"],
    description: "A calm, premium anniversary page with music + photo story moments.",
    startingPriceInr: 499,
    demoPath: "/anniversary-elegant",
    trending: true,
  },
  {
    id: "birthday-bestie",
    slug: "birthday-bestie",
    name: "Birthday Bestie",
    category: "birthday",
    vibe: ["Birthday", "Neon", "Playful"],
    description: "Bestie-coded birthday surprise link — photos, notes, and vibes.",
    startingPriceInr: 499,
    demoPath: "/birthday-bestie",
    trending: true,
  },
  {
    id: "birthday-yaari",
    slug: "birthday-yaari",
    name: "Birthday Yaari",
    category: "birthday",
    vibe: ["Birthday", "Nostalgic", "Emotional"],
    description: "Purane din + apni dosti — a warm birthday surprise page.",
    startingPriceInr: 499,
    demoPath: "/birthday-yaari",
    trending: true,
  },
  {
    id: "proposal-cute",
    slug: "proposal-cute",
    name: "Proposal Cute",
    category: "proposal",
    vibe: ["Cute", "Romantic"],
    description: "A cute proposal flow with photos, music, and the moment.",
    startingPriceInr: 499,
    demoPath: "/proposal-cute",
    trending: true,
  },
  {
    id: "proposal-luxury",
    slug: "proposal-luxury",
    name: "Proposal Luxury",
    category: "proposal",
    vibe: ["Luxury", "Cinematic", "Premium"],
    description: "Luxury vibes, premium animations, and a cinematic reveal.",
    startingPriceInr: 499,
    demoPath: "/proposal-luxury",
    trending: true,
  },

  {
    id: "birthday-classic",
    slug: "birthday-classic",
    name: "Birthday",
    category: "birthday",
    vibe: ["Classic", "Warm"],
    description: "A clean, warm birthday surprise page — simple and sweet.",
    startingPriceInr: 499,
    demoPath: "/birthday",
  },
  {
    id: "anniversary-classic",
    slug: "anniversary-classic",
    name: "Anniversary",
    category: "anniversary",
    vibe: ["Romantic", "Classic"],
    description: "A classic anniversary surprise page for couples.",
    startingPriceInr: 499,
    demoPath: "/anniversary",
  },
  {
    id: "anniversary-cute",
    slug: "anniversary-cute",
    name: "Anniversary Cute",
    category: "anniversary",
    vibe: ["Cute", "Playful"],
    description: "Cute animations + romantic copy for an adorable surprise.",
    startingPriceInr: 499,
    demoPath: "/anniversary-cute",
  },
  {
    id: "proposal-classic",
    slug: "proposal-classic",
    name: "Proposal",
    category: "proposal",
    vibe: ["Romantic", "Classic"],
    description: "A romantic proposal page that builds up to the question.",
    startingPriceInr: 499,
    demoPath: "/proposal",
  },
];

export function getTemplatesByCategory(category: TemplateCategoryId) {
  return TEMPLATES.filter((t) => t.category === category);
}

export function getTemplateBySlug(slug: string) {
  return TEMPLATES.find((t) => t.slug === slug);
}

export function getTrendingTemplates() {
  return TEMPLATES.filter((t) => t.trending);
}
