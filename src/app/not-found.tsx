import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-rose-50 px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-serif text-4xl text-rose-950">Not found</h1>
        <p className="mt-3 text-sm text-rose-900/70">
          This letter doesn’t exist.
        </p>
        <Link
          href="/letters"
          className="mt-6 inline-flex rounded-full bg-rose-700 px-5 py-2 text-sm font-medium text-white"
        >
          Go back
        </Link>
      </div>
    </main>
  );
}
