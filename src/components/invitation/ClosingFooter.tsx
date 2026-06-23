"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { ClassicDivider, LotusMark, FrameCorners, FloralSprig } from "./Ornaments";
import { Reveal } from "./Reveal";
import { Printer } from "lucide-react";

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
      <Reveal className="mx-auto max-w-3xl">
        <div className="frame-classic relative bg-navy px-6 py-12 text-center text-ivory sm:px-12">
          <FrameCorners color="gold" inset={8} size={36} />

          {/* gold corner medallions (decorative dots) */}
          <span className="pointer-events-none absolute left-3 top-3 h-2 w-2 rounded-full bg-gold/70" />
          <span className="pointer-events-none absolute right-3 top-3 h-2 w-2 rounded-full bg-gold/70" />
          <span className="pointer-events-none absolute bottom-3 left-3 h-2 w-2 rounded-full bg-gold/70" />
          <span className="pointer-events-none absolute bottom-3 right-3 h-2 w-2 rounded-full bg-gold/70" />

          {/* decorative top flourish */}
          <FloralSprig
            className="pointer-events-none mx-auto mb-3 block"
            width={90}
            color="#C8A45D"
            opacity={0.5}
          />

          <LotusMark width={52} className="anim-shimmer mx-auto mb-4" color="#C8A45D" />

          {/* Richer divider with diamond + double line */}
          <div className="mx-auto mb-6 flex max-w-[220px] items-center justify-center gap-2" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px w-6 bg-gold/60" />
            <span className="h-2 w-2 rotate-45 border border-gold" />
            <span className="h-px w-6 bg-gold/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          <p className="font-serif-inv text-2xl italic leading-relaxed text-ivory sm:text-3xl">
            {t.footerText}
          </p>

          {/* mirror divider */}
          <div className="mx-auto mt-6 flex max-w-[220px] items-center justify-center gap-2" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px w-6 bg-gold/60" />
            <span className="h-2 w-2 rotate-45 border border-gold" />
            <span className="h-px w-6 bg-gold/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

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

          {/* Action row: replay + print (hidden when printing) */}
          <div className="no-print mt-4 flex items-center justify-center gap-5">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 font-cormorant text-xs uppercase tracking-[0.25em] text-ivory/60 underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              <Printer className="h-3.5 w-3.5" strokeWidth={1.5} />
              {t.print}
            </button>
          </div>

          {/* decorative bottom flourish */}
          <FloralSprig
            className="pointer-events-none mx-auto mt-5 block -scale-x-100"
            width={90}
            color="#C8A45D"
            opacity={0.5}
          />

          <p className="mt-3 font-body-inv text-[10px] tracking-[0.2em] text-ivory/35">
            © 2026 · BALI OFFICE · FIRST ANNIVERSARY
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
