"use client";

import { useCallback, useState } from "react";
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
  const [clicked, setClicked] = useState<Set<number>>(new Set());
  const [burst, setBurst] = useState(false);

  const handleMedallion = useCallback((i: number) => {
    setClicked((prev) => {
      const next = new Set(prev);
      next.add(i);
      if (next.size === 4 && !burst) {
        setBurst(true);
        setTimeout(() => setBurst(false), 2000);
      }
      return next;
    });
  }, [burst]);

  const medallionClass = (i: number) =>
    `absolute h-3 w-3 rounded-full border transition-all duration-500 hover:scale-150 ${
      clicked.has(i)
        ? "border-orange bg-orange shadow-[0_0_8px_rgba(240,120,0,0.8)]"
        : "border-gold/70 bg-gold/70"
    }`;

  return (
    <footer className="relative mt-auto px-4 pb-10 pt-10">
      <Reveal className="mx-auto max-w-3xl">
        <div
          className="frame-classic relative px-6 py-12 text-center text-ivory sm:px-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(3,31,68,0.94) 0%, rgba(8,46,92,0.82) 100%)",
            border: "1px solid rgba(200,164,93,0.35)",
            borderRadius: "16px",
            boxShadow: "0 18px 50px rgba(3,31,68,0.18)",
            backdropFilter: "blur(6px)",
          }}
        >
          <FrameCorners color="gold" inset={8} size={36} />

          {/* gold corner medallions — clickable easter egg (click all 4 for a burst) */}
          <button onClick={() => handleMedallion(0)} className={`${medallionClass(0)} left-3 top-3`} aria-label="Medallion 1" aria-hidden="true" tabIndex={-1} />
          <button onClick={() => handleMedallion(1)} className={`${medallionClass(1)} right-3 top-3`} aria-label="Medallion 2" aria-hidden="true" tabIndex={-1} />
          <button onClick={() => handleMedallion(2)} className={`${medallionClass(2)} bottom-3 left-3`} aria-label="Medallion 3" aria-hidden="true" tabIndex={-1} />
          <button onClick={() => handleMedallion(3)} className={`${medallionClass(3)} bottom-3 right-3`} aria-label="Medallion 4" aria-hidden="true" tabIndex={-1} />

          {/* easter egg burst overlay */}
          {burst ? (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(240,120,0,0.6) 0%, rgba(200,164,93,0.3) 30%, transparent 70%)",
                  animation: "ee-burst 1.5s ease-out forwards",
                }}
              />
              <LotusMark
                width={64}
                color="#F07800"
                className="anim-shimmer relative"
                style={{ animation: "ee-lotus 1.5s ease-out forwards" } as React.CSSProperties}
              />
              <style>{`
                @keyframes ee-burst {
                  0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                  100% { transform: translate(-50%, -50%) scale(40); opacity: 0; }
                }
                @keyframes ee-lotus {
                  0% { transform: scale(0) rotate(0deg); opacity: 0; }
                  30% { transform: scale(1.3) rotate(15deg); opacity: 1; }
                  100% { transform: scale(0.8) rotate(0deg); opacity: 0; }
                }
              `}</style>
            </div>
          ) : null}

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
              src="/invitation/logo-white.png"
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
