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
      {/* Animated border reveal — outer draws in, then inner */}
      <div
        className="pointer-events-none absolute inset-3 border border-navy/40 sm:inset-5"
        style={{
          animation: "border-draw 1.2s cubic-bezier(0.22,1,0.36,1) both",
        }}
      />
      <div
        className="pointer-events-none absolute inset-[14px] border border-gold/40 sm:inset-[22px]"
        style={{
          animation: "border-draw 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s both",
        }}
      />
      <FrameCorners color="navy" inset={18} size={42} />

      {/* faint floral watermarks */}
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

      {/* Decorative radial glow behind logo area */}
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,164,93,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="anim-fade-in relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <LotusMark
          width={56}
          className="anim-shimmer mb-2"
          color="#C8A45D"
        />

        <p
          className="font-cormorant text-sm uppercase tracking-[0.35em] text-orange"
          style={{ animation: "rise-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}
        >
          St. Stamford International Medical
        </p>
        <p
          className="mt-1 font-cormorant text-xs tracking-[0.2em] text-navy/60"
          style={{ animation: "rise-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}
        >
          Modern Cancer Hospital Guangzhou
        </p>

        {/* Logo with staggered entrance */}
        <div
          className="my-7 w-full max-w-[520px]"
          style={{ animation: "scale-in 1.1s cubic-bezier(0.22,1,0.36,1) 0.4s both" }}
        >
          <img
            src="/invitation/logo.png"
            alt="Modern Cancer Hospital Guangzhou — St. Stamford International Medical official logo"
            className="mx-auto w-full max-w-[480px] select-none object-contain"
            draggable={false}
          />
        </div>

        <ClassicDivider
          className="mb-6 max-w-xs"
          color="#031F44"
        />

        <h1
          className="font-serif-inv text-4xl font-semibold leading-tight text-navy sm:text-5xl"
          style={{ animation: "rise-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.7s both" }}
        >
          First Anniversary
        </h1>
        <p
          className="mt-1 font-serif-inv text-2xl italic text-royal sm:text-3xl"
          style={{ animation: "rise-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.85s both" }}
        >
          Bali Office
        </p>
        <p
          className="mt-3 max-w-md font-body-inv text-sm leading-relaxed text-navy/70"
          style={{ animation: "rise-up 0.9s cubic-bezier(0.22,1,0.36,1) 1s both" }}
        >
          We warmly invite you to celebrate one year of gratitude, care, and
          togetherness.
        </p>

        <ClassicDivider
          className="my-7 max-w-xs"
          color="#031F44"
        />

        {/* Language buttons with staggered entrance */}
        <p
          className="mb-4 font-cormorant text-xs uppercase tracking-[0.3em] text-navy/55"
          style={{ animation: "rise-up 0.8s cubic-bezier(0.22,1,0.36,1) 1.1s both" }}
        >
          Select your language
        </p>
        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          {LANGS.map((l, i) => (
            <button
              key={l.code}
              onClick={() => onSelect(l.code)}
              className="btn-pill flex-1 sm:flex-none"
              style={{ animation: `rise-up 0.8s cubic-bezier(0.22,1,0.36,1) ${1.2 + i * 0.1}s both` }}
            >
              <span className="text-base">{l.label}</span>
            </button>
          ))}
        </div>

        <p
          className="mt-8 font-cormorant text-[11px] tracking-[0.25em] text-navy/45"
          style={{ animation: "fade-in 1s ease 1.6s both" }}
        >
          A DIGITAL INVITATION · 2026
        </p>
      </div>

      {/* Border-draw animation keyframes */}
      <style>{`
        @keyframes border-draw {
          from {
            clip-path: inset(0 100% 100% 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </div>
  );
}
