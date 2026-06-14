import RomanticBackground from "@/components/RomanticBackground";
import BackButton from "@/components/BackButton";
import PageTransition from "@/components/PageTransition";

export default function LetterPageLayout({
  children,
  title,
  hideTitle = false,
}: {
  children: React.ReactNode;
  title: string;
  hideTitle?: boolean;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <RomanticBackground variant="deep" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-10">
        <div className="flex-1">
          <PageTransition>
            <div className="mx-auto w-full max-w-4xl">
              {!hideTitle && (
                <>
                  <h1 className="text-balance text-center font-serif text-3xl tracking-tight text-rose-50 sm:text-4xl">
                    {title}
                  </h1>
                  <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-rose-200/40" />
                </>
              )}
              <div className={hideTitle ? "" : "mt-8"}>{children}</div>
            </div>
          </PageTransition>
        </div>

        <div className="mt-10 flex justify-center pb-2">
          <BackButton href="/letters" />
        </div>
      </div>
    </main>
  );
}
