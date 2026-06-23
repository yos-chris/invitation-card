"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { LotusMark } from "./Ornaments";
import { Shirt, Sparkles } from "lucide-react";

export function DressCode({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return (
    <Reveal className="mt-8">
      <div className="mx-auto max-w-3xl">
        {/* heading */}
        <div className="mb-4 flex items-center justify-center gap-2 text-center">
          <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.5} />
          <h3 className="font-serif-inv text-xl font-semibold text-navy sm:text-2xl">
            {t.dressInspiration}
          </h3>
        </div>

        {/* two swatch cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Formal attire swatch */}
          <div
            className="group relative overflow-hidden bg-white px-5 py-6 text-center transition-all duration-500 hover:-translate-y-1"
            style={{
              border: "1px solid #031F44",
              boxShadow:
                "inset 0 0 0 3px #f7f3ea, inset 0 0 0 4px rgba(3,31,68,0.2), 0 14px 30px -20px rgba(3,31,68,0.4)",
            }}
          >
            {/* corner ticks */}
            <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-gold/60" />
            <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-gold/60" />
            <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-gold/60" />
            <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-gold/60" />

            {/* swatch — formal: navy gradient */}
            <div
              className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border-2 border-navy/30 transition-transform duration-500 group-hover:scale-110"
              style={{
                background:
                  "linear-gradient(135deg, #123083 0%, #031f44 60%, #02152f 100%)",
              }}
            >
              <Shirt className="h-8 w-8 text-gold" strokeWidth={1.3} />
            </div>
            <p className="font-cormorant text-xs uppercase tracking-[0.25em] text-orange">
              {t.attireLabel}
            </p>
            <p className="mt-1 font-serif-inv text-lg font-medium text-navy">
              {t.dressFormal}
            </p>
          </div>

          {/* Batik swatch */}
          <div
            className="group relative overflow-hidden bg-white px-5 py-6 text-center transition-all duration-500 hover:-translate-y-1"
            style={{
              border: "1px solid #031F44",
              boxShadow:
                "inset 0 0 0 3px #f7f3ea, inset 0 0 0 4px rgba(3,31,68,0.2), 0 14px 30px -20px rgba(3,31,68,0.4)",
            }}
          >
            <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-gold/60" />
            <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-gold/60" />
            <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-gold/60" />
            <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-gold/60" />

            {/* swatch — batik pattern image */}
            <div className="relative mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-navy/30 transition-transform duration-500 group-hover:scale-110">
              <img
                src="/invitation/gallery/batik.png"
                alt="Indonesian batik pattern"
                className="h-full w-full object-cover"
                draggable={false}
                loading="lazy"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle, transparent 40%, rgba(3,31,68,0.3) 100%)",
                }}
              />
            </div>
            <p className="font-cormorant text-xs uppercase tracking-[0.25em] text-orange">
              {t.attireLabel}
            </p>
            <p className="mt-1 font-serif-inv text-lg font-medium text-navy">
              {t.dressBatik}
            </p>
          </div>
        </div>

        {/* center lotus */}
        <div className="mt-5 flex justify-center">
          <LotusMark width={28} color="#C8A45D" className="opacity-60" />
        </div>
      </div>
    </Reveal>
  );
}
