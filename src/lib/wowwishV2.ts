export const WOWWISH_LOGO_SRC = "/images/wowwish-logo.png";

export const WOWWISH_STANDARD_PRICE_INR = 999;
export const WOWWISH_PREMIUM_PRICE_INR = 1499;

export type WowWishThemeId =
  | "genz-pop"
  | "romantic-floral"
  | "luxury-gold"
  | "indian-festive"
  | "dark-neon-ai"
  | "minimal-elegant"
  | "corporate-premium";

export type WowWishCategoryId =
  | "birthday"
  | "anniversary"
  | "proposal"
  | "wedding-invite"
  | "festivals"
  | "corporate";

export type WowWishTheme = {
  id: WowWishThemeId;
  name: string;
  style: string;
  colors: string;
};

export type WowWishCategory = {
  id: WowWishCategoryId;
  name: string;
  description: string;
  shortDescription: string;
};

export type WowWishTemplate = {
  id: string;
  name: string;
  category: WowWishCategoryId;
  occasion: string;
  themeId: WowWishThemeId;
  vibe: string;
  description: string;
  promise?: string;
  bestFor?: string;
  included?: string[];
  priceLabel?: string;
  packageId?: "surprise" | "premium";
  previewImage?: string;
  demoPath: string;
};

export const wowwishThemes: WowWishTheme[] = [
  {
    id: "genz-pop",
    name: "GenZ Pop",
    style: "Bright stickers, bold typography, Instagram story vibe.",
    colors: "from-[#ff2aa8] via-[#ffd23f] to-[#20d4ff]",
  },
  {
    id: "romantic-floral",
    name: "Romantic Floral",
    style: "Soft roses, cream, blush, elegant script.",
    colors: "from-[#fff1f6] via-[#ffd9e8] to-[#f6efe5]",
  },
  {
    id: "luxury-gold",
    name: "Luxury Gold",
    style: "Royal dark surfaces, gold borders, premium serif.",
    colors: "from-[#140814] via-[#4a1625] to-[#e8c57a]",
  },
  {
    id: "indian-festive",
    name: "Indian Festive",
    style: "Maroon, gold, diyas, mandala, Indian celebration.",
    colors: "from-[#4b0707] via-[#8f1d12] to-[#e8a932]",
  },
  {
    id: "dark-neon-ai",
    name: "Dark Neon AI",
    style: "Midnight, neon purple/blue, modern AI interface.",
    colors: "from-[#070b1f] via-[#3b1d5f] to-[#2563eb]",
  },
  {
    id: "minimal-elegant",
    name: "Minimal Elegant",
    style: "Clean cream, beige, refined premium spacing.",
    colors: "from-[#fffaf2] via-[#f2e3d4] to-[#e8c57a]",
  },
  {
    id: "corporate-premium",
    name: "Corporate Premium",
    style: "Polished brand greetings with logo, offer, and link.",
    colors: "from-[#07152f] via-[#17427a] to-[#e8c57a]",
  },
];

export const wowwishCategories: WowWishCategory[] = [
  {
    id: "birthday",
    name: "Birthday",
    description: "Pop, cute, luxury, or minimal birthday pages made for reactions.",
    shortDescription: "Make their birthday feel personal.",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    description: "Romantic memory pages with photos, music, letters, and moments.",
    shortDescription: "Turn memories into a page they replay.",
  },
  {
    id: "proposal",
    name: "Proposal",
    description: "Ask the question with a cinematic link, music, and a reveal.",
    shortDescription: "A big question deserves a beautiful page.",
  },
  {
    id: "wedding-invite",
    name: "Wedding Invite",
    description: "Premium digital kankotri and wedding invite pages.",
    shortDescription: "Elegant invites for WhatsApp sharing.",
  },
  {
    id: "festivals",
    name: "Festivals",
    description: "Diwali, Holi, New Year, Uttarayan, Janmashtami, Rakhi, and more.",
    shortDescription: "Festive wishes with premium Indian styling.",
  },
  {
    id: "corporate",
    name: "Corporate Wishes",
    description: "Branded festival greetings for clients, teams, creators, and offers.",
    shortDescription: "Premium wishes for brands and businesses.",
  },
];

export const wowwishTemplates: WowWishTemplate[] = [
  {
    id: "birthday-pop-story",
    name: "Birthday Pop Story",
    category: "birthday",
    occasion: "Birthday",
    themeId: "genz-pop",
    vibe: "Story-ready",
    description: "A bold birthday page with stickers, music, photos, and party energy.",
    promise: "A bold, fun birthday page with photos, music, inside jokes, and full celebration energy.",
    bestFor: "Best for siblings, college friends, boyfriend/girlfriend, and Gen Z birthday surprises.",
    included: ["Photos", "Music", "Funny copy", "Memory sections", "Private link"],
    priceLabel: "From ₹999",
    packageId: "surprise",
    previewImage: "/images/birthday-pop-story-preview.png",
    demoPath: "/birthday",
  },
  {
    id: "birthday-bestie-neon",
    name: "Birthday Bestie",
    category: "birthday",
    occasion: "Birthday",
    themeId: "dark-neon-ai",
    vibe: "Neon",
    description: "A glowing friendship birthday page made for WhatsApp reactions.",
    promise: "A glowing birthday page made for reactions, memories, music, and fun birthday chaos.",
    bestFor: "Best for friends, siblings, college groups, and Gen Z birthday surprises.",
    included: ["Photos", "Music", "Bestie copy", "Memory sections", "Private link"],
    priceLabel: "From ₹999",
    packageId: "surprise",
    previewImage: "/images/birthday-bestie-preview.png",
    demoPath: "/birthday-bestie",
  },
  {
    id: "birthday-minimal-cute",
    name: "Birthday Yaari",
    category: "birthday",
    occasion: "Birthday",
    themeId: "genz-pop",
    vibe: "Friendship",
    description: "A warm dosti-style birthday page for squads, friends, and memories.",
    promise: "A dosti-style birthday page full of memories, warmth, and squad energy.",
    bestFor: "Best for school friends, college groups, long-distance friends, and squad birthdays.",
    included: ["Photos", "Music", "Dosti copy", "Memory sections", "Private link"],
    priceLabel: "From ₹999",
    packageId: "surprise",
    previewImage: "/images/birthday-yaari-preview.png",
    demoPath: "/birthday-yaari",
  },
  {
    id: "birthday-luxury-gold",
    name: "Birthday Luxury Gold",
    category: "birthday",
    occasion: "Birthday",
    themeId: "luxury-gold",
    vibe: "Premium",
    description: "A royal birthday page with gold accents and cinematic polish.",
    promise: "A premium birthday page with royal gold styling, photos, music, and elegant sections.",
    bestFor: "Best for premium birthday surprises for partners, family, and milestone birthdays.",
    included: ["Photos", "Music", "Premium theme", "Memory sections", "Private link"],
    priceLabel: "From ₹1,499",
    packageId: "premium",
    demoPath: "/birthday",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    category: "anniversary",
    occasion: "Anniversary",
    themeId: "romantic-floral",
    vibe: "Romantic",
    description: "A classic anniversary page with memories, photos, music, and heartfelt words.",
    promise: "A soft, emotional anniversary page that turns your journey into a beautiful memory story.",
    bestFor: "Best for wife, husband, girlfriend, boyfriend, or couples celebrating years together.",
    included: ["Photos", "Music", "Emotional note", "Journey sections", "Private link"],
    priceLabel: "From ₹999",
    packageId: "surprise",
    previewImage: "/images/anniversary-preview.png",
    demoPath: "/anniversary",
  },
  {
    id: "anniversary-cute",
    name: "Anniversary Cute",
    category: "anniversary",
    occasion: "Anniversary",
    themeId: "genz-pop",
    vibe: "Cute",
    description: "A playful anniversary page with cute moments, photos, and fun couple energy.",
    promise: "A cute anniversary page full of memories, chaos, inside jokes, and soft love.",
    bestFor: "Best for young couples, girlfriend/boyfriend, and playful anniversary surprises.",
    included: ["Photos", "Music", "Cute copy", "Memory sections", "Private link"],
    priceLabel: "From ₹1,499",
    packageId: "premium",
    previewImage: "/images/anniversary-cute-preview.png",
    demoPath: "/anniversary-cute",
  },
  {
    id: "anniversary-elegant",
    name: "Anniversary Elegant",
    category: "anniversary",
    occasion: "Anniversary",
    themeId: "minimal-elegant",
    vibe: "Elegant",
    description: "A refined anniversary page with soft visuals, promises, and premium calm.",
    promise: "A calm, premium anniversary page with emotional pacing, photos, and a thoughtful promise section.",
    bestFor: "Best for married couples, milestone anniversaries, and premium romantic surprises.",
    included: ["Photos", "Music", "Premium story", "Promises", "Private link"],
    priceLabel: "From ₹1,499",
    packageId: "premium",
    previewImage: "/images/anniversary-elegant-preview.png",
    demoPath: "/anniversary-elegant",
  },
  {
    id: "proposal-romantic-glow",
    name: "Proposal Romantic Glow",
    category: "proposal",
    occasion: "Proposal",
    themeId: "romantic-floral",
    vibe: "Glow",
    description: "A sweet proposal page with photos, music, and a reveal moment.",
    promise: "A sweet proposal page with photos, reasons, soft copy, and a reveal moment they will remember.",
    bestFor: "Best for heartfelt proposals, emotional confession pages, and soft romantic surprises.",
    included: ["Photos", "Music", "Reasons list", "Reveal section", "Private link"],
    priceLabel: "From ₹999",
    packageId: "surprise",
    previewImage: "/images/proposal-preview.png",
    demoPath: "/proposal",
  },
  {
    id: "proposal-cute-story",
    name: "Proposal Cute Story",
    category: "proposal",
    occasion: "Proposal",
    themeId: "genz-pop",
    vibe: "Cute",
    description: "A playful proposal flow for a fun, personal surprise.",
    promise: "A sweet proposal page with photos, reasons, soft copy, and a reveal moment they will remember.",
    bestFor: "Best for playful crush confessions, girlfriend/boyfriend proposals, and cute first-yes moments.",
    included: ["Photos", "Music", "Reasons list", "Reveal section", "Private link"],
    priceLabel: "From ₹999",
    packageId: "surprise",
    previewImage: "/images/proposal-cute-preview.png",
    demoPath: "/proposal-cute",
  },
  {
    id: "proposal-luxury-letter",
    name: "Proposal Luxury Letter",
    category: "proposal",
    occasion: "Proposal",
    themeId: "luxury-gold",
    vibe: "Luxury",
    description: "A polished proposal letter page with premium gold styling.",
    bestFor: "Best for premium proposal letters, candlelight moments, and elegant forever promises.",
    previewImage: "/images/proposal-luxury-preview.png",
    demoPath: "/proposal-luxury",
  },
];

export function getWowWishCategory(id: string) {
  return wowwishCategories.find((category) => category.id === id);
}

export function getWowWishTheme(id: WowWishThemeId) {
  return wowwishThemes.find((theme) => theme.id === id) ?? wowwishThemes[0];
}

export function getWowWishTemplatesByCategory(category: WowWishCategoryId) {
  return wowwishTemplates.filter((template) => template.category === category);
}

export function getFeaturedWowWishTemplates() {
  return [
    "birthday-pop-story",
    "anniversary-cute",
    "proposal-romantic-glow",
    "birthday-bestie-neon",
  ]
    .map((id) => wowwishTemplates.find((template) => template.id === id))
    .filter((template): template is WowWishTemplate => Boolean(template));
}
