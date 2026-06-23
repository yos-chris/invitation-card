"use client";

import { LotusMark, FloralSprig } from "./Ornaments";

/* A decorative bridge between sections: floral sprigs + lotus + thin lines.
   Adds visual rhythm so sections don't feel disconnected. */
export function SectionBridge({ variant = "light" }: { variant?: "light" | "dark" }) {
  const color = variant === "dark" ? "#C8A45D" : "#031F44";
  const opacity = variant === "dark" ? 0.5 : 0.35;
  return (
    <div className="pointer-events-none flex items-center justify-center gap-4 py-6" aria-hidden="true">
      <FloralSprig width={90} color={color} opacity={opacity} className="hidden sm:block" />
      <span
        className="h-px w-16 sm:w-24"
        style={{ background: `linear-gradient(to right, transparent, ${color}80)` }}
      />
      <LotusMark width={28} color={color} />
      <span
        className="h-px w-16 sm:w-24"
        style={{ background: `linear-gradient(to left, transparent, ${color}80)` }}
      />
      <FloralSprig
        width={90}
        color={color}
        opacity={opacity}
        className="hidden -scale-x-100 sm:block"
      />
    </div>
  );
}
