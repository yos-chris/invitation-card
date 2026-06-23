"use client";

import { LotusMark, FloralSprig } from "./Ornaments";

/* A decorative bridge between sections: floral sprigs + lotus + thin lines
   with an animated gold shimmer that sweeps across. Adds visual rhythm so
   sections don't feel disconnected. */
export function SectionBridge({ variant = "light" }: { variant?: "light" | "dark" }) {
  const color = variant === "dark" ? "#C8A45D" : "#031F44";
  const opacity = variant === "dark" ? 0.5 : 0.35;
  return (
    <div
      className="pointer-events-none flex items-center justify-center gap-4 py-6"
      aria-hidden="true"
    >
      <FloralSprig width={90} color={color} opacity={opacity} className="hidden sm:block" />
      {/* left line with shimmer */}
      <span className="relative h-px w-16 overflow-hidden sm:w-24">
        <span
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, transparent, ${color}80)` }}
        />
        <span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200,164,93,0.9) 50%, transparent 100%)",
            animation: "bridge-shimmer 4s ease-in-out 1s infinite",
          }}
        />
      </span>
      <LotusMark width={28} color={color} className="anim-shimmer" />
      {/* right line with shimmer */}
      <span className="relative h-px w-16 overflow-hidden sm:w-24">
        <span
          className="absolute inset-0"
          style={{ background: `linear-gradient(to left, transparent, ${color}80)` }}
        />
        <span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200,164,93,0.9) 50%, transparent 100%)",
            animation: "bridge-shimmer 4s ease-in-out 2.5s infinite",
          }}
        />
      </span>
      <FloralSprig
        width={90}
        color={color}
        opacity={opacity}
        className="hidden -scale-x-100 sm:block"
      />
      <style>{`
        @keyframes bridge-shimmer {
          0% { transform: translateX(-100%); }
          60%, 100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
