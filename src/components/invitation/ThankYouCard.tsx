"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { LotusMark, ClassicDivider, FrameCorners, FloralSprig } from "./Ornaments";
import { X } from "lucide-react";

/**
 * ThankYouCard — elegant confirmation modal shown after a successful RSVP.
 * Displays a personalized thank-you message with the guest's name, framed in
 * the invitation aesthetic. Includes a close button and lotus/floral decor.
 */
export function ThankYouCard({
  lang,
  name,
  onClose,
}: {
  lang: Lang;
  name: string;
  onClose: () => void;
}) {
  const t = DICT[lang];
  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-navy/75 px-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={t.thankYouTitle}
      onClick={onClose}
    >
      <div
        className="frame-classic anim-scale-in relative max-w-md bg-ivory px-6 py-8 text-center shadow-2xl sm:px-10 sm:py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <FrameCorners color="navy" inset={6} size={28} />

        {/* close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-navy/40 transition-colors hover:text-orange"
          aria-label={t.close}
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {/* floral top */}
        <FloralSprig
          className="pointer-events-none mx-auto mb-2 block"
          width={70}
          opacity={0.4}
        />

        <LotusMark width={56} className="anim-shimmer mx-auto mb-3" color="#C8A45D" />

        <ClassicDivider className="mx-auto mb-5 max-w-[180px]" color="#031F44" />

        <p className="font-cormorant text-xs uppercase tracking-[0.3em] text-orange">
          {t.thankYouTitle}
        </p>
        <h3 className="mt-2 font-serif-inv text-2xl font-bold text-navy sm:text-3xl">
          {t.thankYouTitle}
        </h3>

        <p className="mx-auto mt-4 max-w-sm font-cormorant text-base italic leading-relaxed text-navy/75">
          {t.thankYouBody(name || "—")}
        </p>

        <ClassicDivider className="mx-auto mt-5 max-w-[180px]" color="#031F44" />

        {/* event quick recap */}
        <div className="mt-4 flex flex-col items-center gap-1 font-body-inv text-[11px] uppercase tracking-[0.2em] text-navy/65">
          <span>{t.dateValue}</span>
          <span className="text-gold">◆</span>
          <span>{t.timeValue}</span>
          <span className="text-gold">◆</span>
          <span className="text-royal">{t.venueName}</span>
        </div>

        {/* close button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="btn-pill solid-navy px-6 py-2.5 text-xs uppercase tracking-[0.2em]"
          >
            {t.thankYouClose}
          </button>
        </div>

        {/* floral bottom */}
        <FloralSprig
          className="pointer-events-none mx-auto mt-5 block -scale-x-100"
          width={70}
          opacity={0.4}
        />
      </div>
    </div>
  );
}
