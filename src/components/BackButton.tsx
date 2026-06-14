"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function BackButton({ href }: { href?: string }) {
  const router = useRouter();

  return (
    <motion.button
      type="button"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        if (href) router.push(href);
        else router.back();
      }}
      className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-medium tracking-wide text-rose-900 shadow-[0_18px_55px_rgba(124,45,18,0.10)] ring-1 ring-rose-200/70 backdrop-blur transition-colors hover:bg-white"
    >
      <ArrowLeft className="h-4 w-4" />
      BACK
    </motion.button>
  );
}
