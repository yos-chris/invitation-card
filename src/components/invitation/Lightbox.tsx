"use client";

import { useEffect } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { LotusMark } from "./Ornaments";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryImage = { src: string; alt: string; caption?: string };

/**
 * Lightbox — full-screen image viewer with prev/next navigation,
 * keyboard support (Esc/←/→), and caption overlay.
 */
export function Lightbox({
  lang,
  images,
  index,
  onClose,
  onIndex,
}: {
  lang: Lang;
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const t = DICT[lang];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft")
        onIndex((index - 1 + images.length) % images.length);
      else if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, images.length, onClose, onIndex]);

  if (index < 0 || index >= images.length) return null;
  const img = images[index];

  return (
    <div
      className="cinema-navy cinema-grain fixed inset-0 z-[96] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      onClick={onClose}
    >
      {/* top bar: close + lotus */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-4">
        <LotusMark width={36} color="#C8A45D" className="opacity-70" />
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-navy/70 text-gold backdrop-blur-md transition-all hover:border-orange hover:text-orange"
          aria-label={t.close}
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* prev arrow */}
      {images.length > 1 ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onIndex((index - 1 + images.length) % images.length);
          }}
          className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-navy/70 text-gold backdrop-blur-md transition-all hover:border-orange hover:text-orange sm:left-6"
          aria-label={t.prev}
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
      ) : null}

      {/* image */}
      <div
        className="relative max-h-[82vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 border border-gold/50" />
        <img
          src={img.src}
          alt={img.alt}
          className="block max-h-[82vh] max-w-[90vw] select-none object-contain shadow-2xl"
          draggable={false}
        />
        {/* caption */}
        {img.caption ? (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-4 text-center">
            <span className="font-cormorant text-sm uppercase tracking-[0.3em] text-gold">
              {img.caption}
            </span>
          </div>
        ) : null}
      </div>

      {/* next arrow */}
      {images.length > 1 ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onIndex((index + 1) % images.length);
          }}
          className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-navy/70 text-gold backdrop-blur-md transition-all hover:border-orange hover:text-orange sm:right-6"
          aria-label={t.next}
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </button>
      ) : null}

      {/* counter */}
      {images.length > 1 ? (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="rounded-full border border-gold/40 bg-navy/70 px-3 py-1 font-cormorant text-[11px] tracking-[0.25em] text-gold backdrop-blur-md">
            {index + 1} / {images.length}
          </span>
        </div>
      ) : null}
    </div>
  );
}
