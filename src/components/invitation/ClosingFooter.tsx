"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { ClassicDivider, LotusMark, FrameCorners } from "./Ornaments";

export function ClosingFooter({
  lang,
  onReplay,
}: {
  lang: Lang;
  onReplay: () => void;
}) {
  const t = DICT[lang];
  return (
    <footer className="relative mt-auto px-4 pb-10 pt-10">
      <div className="mx-auto max-w-3xl">
        <div className="frame-classic relative bg-navy px-6 py-12 text-center text-ivory sm:px-12">
          <FrameCorners color="gold" inset={8} size={36} />

          <LotusMark width={52} className="anim-shimmer mx-auto mb-4" color="#C8A45D" />

          <ClassicDivider className="mx-auto mb-6 max-w-[200px]" color="#C8A45D" />

          <p className="font-serif-inv text-2xl italic leading-relaxed text-ivory sm:text-3xl">
            {t.footerText}
          </p>

          <ClassicDivider className="mx-auto mt-6 max-w-[200px]" color="#C8A45D" />

          <div className="mt-6 flex flex-col items-center gap-3">
            <img
              src="/invitation/logo.png"
              alt="Modern Cancer Hospital Guangzhou — St. Stamford International Medical"
              className="w-full max-w-[280px] select-none object-contain opacity-90"
              draggable={false}
            />
            <p className="font-cormorant text-xs uppercase tracking-[0.25em] text-gold/80">
              {t.footerSig}
            </p>
          </div>

          <button
            onClick={onReplay}
            className="mt-7 font-cormorant text-xs uppercase tracking-[0.25em] text-ivory/60 underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            {t.replayInvitation}
          </button>

          <p className="mt-5 font-body-inv text-[10px] tracking-[0.2em] text-ivory/35">
            © 2026 · BALI OFFICE · FIRST ANNIVERSARY
          </p>
        </div>
      </div>
    </footer>
  );
}
