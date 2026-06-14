"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LetterCard({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block">
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative overflow-hidden rounded-3xl bg-white/75 p-5 shadow-[0_20px_70px_rgba(124,45,18,0.10)] ring-1 ring-rose-200/70 backdrop-blur"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 via-white/70 to-pink-50/80" />
        <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-rose-300/25 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />

        <div className="relative">
          <div className="mx-auto flex max-w-xs flex-col items-center">
            <div className="relative w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100 via-white to-pink-100 shadow-[0_18px_55px_rgba(244,63,94,0.20)] ring-1 ring-rose-200/60">
                <Image
                  src="/heart_letter.png"
                  alt="Love letter"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 90vw, 420px"
                  priority={false}
                />
              </div>
            </div>

            <div className="mt-4 w-full text-center">
              <div className="mx-auto inline-flex items-center justify-center rounded-full bg-rose-600 px-4 py-2 text-xs font-medium tracking-wide text-white shadow-[0_12px_40px_rgba(225,29,72,0.22)]">
                {title}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
