"use client";

import { motion } from "framer-motion";

type AnniversaryPhoto = {
  label?: string;
  url?: string;
};

export function AnniversaryScenePhoto({
  photo,
  sceneLabel = "A MOMENT WE KEEP",
  desktopMaxWidthClassName = "lg:max-w-[420px]",
}: {
  photo?: AnniversaryPhoto;
  sceneLabel?: string;
  desktopMaxWidthClassName?: string;
}) {
  if (!photo?.url) return null;

  return (
    <section className="relative z-10 overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10">
      <motion.figure
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`mx-auto w-full max-w-[420px] overflow-hidden rounded-[30px] border border-white/30 bg-black/10 shadow-[0_24px_80px_rgba(15,23,42,0.14)] lg:rounded-[20px] ${desktopMaxWidthClassName}`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden lg:aspect-auto">
          <img src={photo.url} alt={photo.label ?? "Anniversary memory"} className="h-full w-full object-cover object-center lg:h-auto lg:object-contain" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/70">{sceneLabel}</div>
            <div className="mt-1 text-sm font-medium italic text-white drop-shadow">{photo.label}</div>
          </figcaption>
        </div>
      </motion.figure>
    </section>
  );
}

export function AnniversaryMiniFilmStrip({ photos }: { photos: AnniversaryPhoto[] }) {
  const visiblePhotos = photos.filter((photo): photo is Required<AnniversaryPhoto> => Boolean(photo?.url)).slice(0, 2);
  if (!visiblePhotos.length) return null;

  return (
    <section className="relative z-10 overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="ww-keep-two-cols mx-auto grid w-full max-w-5xl grid-cols-2 gap-2"
      >
        {visiblePhotos.map((photo) => (
          <figure key={photo.url} className="min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-[22px] bg-black/10 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
              <img src={photo.url} alt={photo.label} className="h-full w-full object-cover object-center" loading="lazy" />
            </div>
            <figcaption className="mt-2 text-center text-xs font-medium leading-snug text-slate-700/80">{photo.label}</figcaption>
          </figure>
        ))}
      </motion.div>
    </section>
  );
}
