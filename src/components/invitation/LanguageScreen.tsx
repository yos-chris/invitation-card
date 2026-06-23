"use client";

import { LANGS, type Lang } from "@/lib/i18n";
import { FrameCorners, ClassicDivider, FloralSprig, LotusMark } from "./Ornaments";

export function LanguageScreen({
  onSelect,
}: {
  onSelect: (lang: Lang) => void;
}) {
  return (
    <div className="paper-ivory relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-10">
      {/* outer decorative viewport border */}
      <div className="pointer-events-none absolute inset-3 border border-navy/40 sm:inset-5" />
      <div className="pointer-events-none absolute inset-[14px] border border-gold/40 sm:inset-[22px]" />
      <FrameCorners color="navy" inset={18} size={42} />

      {/* faint floral watermark */}
      <FloralSprig
        className="pointer-events-none absolute -left-6 top-1/4 hidden rotate-12 md:block"
        width={180}
        opacity={0.12}
      />
      <FloralSprig
        className="pointer-events-none absolute -right-6 bottom-1/4 hidden -rotate-12 md:block"
        width={180}
        opacity={0.12}
      />

      <div className="anim-fade-in relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <LotusMark width={56} className="anim-shimmer mb-2" color="#C8A45D" />

        <p className="font-cormorant text-sm uppercase tracking-[0.35em] text-orange">
          St. Stamford International Medical
        </p>
        <p className="mt-1 font-cormorant text-xs tracking-[0.2em] text-navy/60">
          Modern Cancer Hospital Guangzhou
        </p>

        {/* Logo */}
        <div className="my-7 w-full max-w-[520px]">
          <img
            src="/invitation/logo.png"
            alt="Modern Cancer Hospital Guangzhou — St. Stamford International Medical official logo"
            className="mx-auto w-full max-w-[480px] select-none object-contain"
            draggable={false}
          />
        </div>

        <ClassicDivider className="mb-6 max-w-xs" color="#031F44" />

        <h1 className="font-serif-inv text-4xl font-semibold leading-tight text-navy sm:text-5xl">
          First Anniversary
        </h1>
        <p className="mt-1 font-serif-inv text-2xl italic text-royal sm:text-3xl">
          Bali Office
        </p>
        <p className="mt-3 max-w-md font-body-inv text-sm leading-relaxed text-navy/70">
          We warmly invite you to celebrate one year of gratitude, care, and
          togetherness.
        </p>

        <ClassicDivider className="my-7 max-w-xs" color="#031F44" />

        {/* Language buttons */}
        <p className="mb-4 font-cormorant text-xs uppercase tracking-[0.3em] text-navy/55">
          Select your language
        </p>
        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          {LANGS.map((l, i) => (
            <button
              key={l.code}
              onClick={() => onSelect(l.code)}
              className="btn-pill anim-rise flex-1 sm:flex-none"
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              <span className="text-base">{l.label}</span>
            </button>
          ))}
        </div>

        <p className="mt-8 font-cormorant text-[11px] tracking-[0.25em] text-navy/45">
          A DIGITAL INVITATION · 2026
        </p>
      </div>
    </div>
  );
}
