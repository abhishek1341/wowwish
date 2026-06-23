import LettersGrid from "@/components/LettersGrid";
import RomanticBackground from "@/components/RomanticBackground";
import PageTransition from "@/components/PageTransition";
import { createPageMetadata, OG_IMAGES } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Love Letters | WowWish",
  description: "Open sweet personalized letters made for thoughtful romantic surprises.",
  path: "/letters",
  ogImage: OG_IMAGES.default,
});

export default function LettersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <RomanticBackground variant="soft" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-10 sm:px-10">
        <PageTransition>
          <div className="w-full">
            <div className="mb-8 text-center">
              <h1 className="text-balance font-serif text-4xl tracking-tight text-rose-900 sm:text-5xl">
                Letters for you
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-rose-900/70 sm:text-base">
                {/* Replace this subtitle if you want */}
                Pick a little letter. Open it whenever your heart needs it.
              </p>
            </div>
            <LettersGrid />
          </div>
        </PageTransition>
      </div>
    </main>
  );
}
