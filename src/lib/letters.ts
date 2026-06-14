export type LetterId = "hug" | "smile" | "miss" | "tired";

export type Letter = {
  id: LetterId;
  slug: string;
  title: string;
  menuLabel: string;
  accent: "rose" | "red" | "pink";
  images: {
    primary?: string;
    secondary?: string;
    illustration?: string;
    lock?: string;
    key?: string;
  };
  message: {
    headline?: string;
    body: string;
    reveal?: string;
  };
};

export const LETTERS: Letter[] = [
  {
    id: "hug",
    slug: "open-when-you-need-a-hug",
    title: "Open when you need a hug",
    menuLabel: "Open when you need a hug",
    accent: "rose",
    images: {
      primary: "/hug_letter_2.png",
    },
    message: {
      headline: "Come here…",
      body:
        "I wish I could wrap you in my arms right now. Take a slow breath. Unclench your shoulders. If today feels heavy, let me hold a little of it with you — even from far away. You are safe. You are loved. And you never have to do this alone.",
    },
  },
  {
    id: "smile",
    slug: "open-when-you-need-a-smile",
    title: "Open when you need a smile",
    menuLabel: "Open when you need a smile",
    accent: "pink",
    images: {
      primary: "/smile_letter.png",
    },
    message: {
      headline: "A tiny postcard for you",
      body:
        "Here is a little reminder that you bring light wherever you go. Your laugh is my favorite sound, and your smile is proof that magic is real. If you can, smile right now — just a small one. I promise it suits you perfectly.",
    },
  },
  {
    id: "miss",
    slug: "open-when-you-miss-me",
    title: "Open when you miss me",
    menuLabel: "Open when you miss me",
    accent: "red",
    images: {
      illustration: "/miss_letter.png",
    },
    message: {
      headline: "I’m closer than you think",
      body:
        "If you miss me, know that I am thinking of you too. Close your eyes for a moment and remember how it feels when we’re together. I’m in the little things you do, the songs you love, the quiet pauses — always, always with you.",
    },
  },
  {
    id: "tired",
    slug: "open-when-youre-tired",
    title: "Open when you’re tired",
    menuLabel: "Open when you’re tired",
    accent: "rose",
    images: {
      lock: "/images/lock-heart.svg",
      key: "/images/key-heart.svg",
      primary: "/tired_letter.png",
    },
    message: {
      headline: "You can rest now",
      body:
        "You have been carrying a lot. Let yourself slow down for a moment. Rest your thoughts, breathe, and know that I am proud of you - ALWAYS.",
      reveal: "I love you",
    },
  },
];

export function getLetterBySlug(slug: string) {
  return LETTERS.find((l) => l.slug === slug);
}
