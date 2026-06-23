"use client";

import { Reveal } from "./Reveal";
import { LotusMark, ClassicDivider } from "./Ornaments";
import type { Lang } from "@/lib/i18n";

/**
 * SectionTitle — consistent premium section heading with lotus mark,
 * animated title, and an elegant divider with a draw-in underline flourish.
 */
export function SectionTitle({
  title,
  intro,
  lang,
  color = "#C8A45D",
}: {
  title: string;
  intro?: string;
  lang: Lang;
  color?: string;
}) {
  return (
    <Reveal className="text-center">
      <LotusMark width={44} className="mx-auto mb-2 anim-shimmer" color={color} />
      <h2 className="font-serif-inv text-3xl font-semibold text-navy sm:text-4xl">
        <span className="relative inline-block">
          {title}
          {/* animated underline flourish */}
          <span
            className="absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent"
            style={{
              width: "60%",
              animation: "underline-draw 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s both",
            }}
          />
        </span>
      </h2>
      {intro ? (
        <p className="mx-auto mt-2 max-w-md font-cormorant text-base italic text-navy/65">
          {intro}
        </p>
      ) : null}
      <ClassicDivider className="mx-auto mt-5 max-w-[240px]" color="#031F44" />
      <style>{`
        @keyframes underline-draw {
          from { width: 0; opacity: 0; }
          to { width: 60%; opacity: 1; }
        }
      `}</style>
    </Reveal>
  );
}
