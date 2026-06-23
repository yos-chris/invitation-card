"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { FrameCorners, ClassicDivider, LotusMark, FloralSprig } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Hero({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return (
    <section className="relative px-4 pt-10 sm:pt-16">
      <div className="relative mx-auto max-w-3xl">
        {/* framed invitation card */}
        <Reveal className="frame-classic relative bg-white/60 px-6 py-10 text-center shadow-[0_30px_70px_-30px_rgba(3,31,68,0.45)] sm:px-12 sm:py-14">
          <FrameCorners color="navy" inset={8} size={38} />

          {/* logo */}
          <div className="mx-auto mb-6 w-full max-w-[360px]">
            <img
              src="/invitation/logo.png"
              alt="Modern Cancer Hospital Guangzhou — St. Stamford International Medical"
              className="mx-auto w-full select-none object-contain"
              draggable={false}
            />
          </div>

          <ClassicDivider className="mx-auto mb-6 max-w-[220px]" color="#031F44" />

          <p className="font-cormorant text-sm uppercase tracking-[0.3em] text-orange sm:text-base">
            {t.heroEyebrow}
          </p>

          <h1 className="mt-3 font-serif-inv text-5xl font-bold leading-[1.05] text-navy sm:text-6xl">
            {t.heroTitleLine1}
          </h1>

          {/* monogram crest between title lines */}
          <div className="my-3 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gold/60" />
            <LotusMark width={28} color="#C8A45D" />
            <span className="h-px w-12 bg-gold/60" />
          </div>

          <p className="font-serif-inv text-2xl italic text-royal sm:text-3xl">
            {t.heroTitleLine2}
          </p>

          <div className="my-6 flex items-center justify-center">
            <LotusMark width={48} color="#C8A45D" />
          </div>

          <p className="mx-auto max-w-md font-cormorant text-lg italic leading-relaxed text-navy/80 sm:text-xl">
            {t.heroSubtitle}
          </p>

          <ClassicDivider className="mx-auto mt-7 max-w-[220px]" color="#031F44" />

          {/* quick event line */}
          <div className="mt-6 flex flex-col items-center gap-1 font-body-inv text-xs uppercase tracking-[0.2em] text-navy/70 sm:flex-row sm:justify-center sm:gap-4">
            <span>{t.dateValue}</span>
            <span className="hidden text-gold sm:inline">◆</span>
            <span>{t.timeValue}</span>
            <span className="hidden text-gold sm:inline">◆</span>
            <span className="text-royal">{t.venueName}</span>
          </div>
        </Reveal>

        {/* floral accents */}
        <FloralSprig
          className="pointer-events-none absolute -left-8 -top-6 hidden -rotate-12 lg:block"
          width={120}
          opacity={0.18}
        />
        <FloralSprig
          className="pointer-events-none absolute -right-8 -top-6 hidden rotate-12 lg:block"
          width={120}
          opacity={0.18}
        />
      </div>
    </section>
  );
}
