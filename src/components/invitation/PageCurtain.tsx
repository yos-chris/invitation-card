"use client";

import { useState } from "react";

/**
 * PageCurtain — a cinematic curtain-reveal overlay that plays when mounted.
 * Two navy panels slide apart (left/right) revealing the page beneath, with
 * a gold center seam glow and a lotus mark. Auto-dismisses when done.
 * Mount this component (keyed) to play the animation.
 */
export function PageCurtain() {
  const [done, setDone] = useState(false);

  if (done) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[88]"
      aria-hidden="true"
      onAnimationEnd={() => setDone(true)}
    >
      {/* Left panel */}
      <div
        className="cinema-navy absolute left-0 top-0 h-full w-1/2"
        style={{
          animation: "curtain-left 1.2s cubic-bezier(0.76,0,0.24,1) 0.2s forwards",
          boxShadow: "inset -2px 0 0 rgba(200,164,93,0.3)",
        }}
      />
      {/* Right panel */}
      <div
        className="cinema-navy absolute right-0 top-0 h-full w-1/2"
        style={{
          animation: "curtain-right 1.2s cubic-bezier(0.76,0,0.24,1) 0.2s forwards",
          boxShadow: "inset 2px 0 0 rgba(200,164,93,0.3)",
        }}
      />
      {/* Center gold seam glow */}
      <div
        className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(200,164,93,0.8) 50%, transparent 100%)",
          animation: "curtain-seam 1.4s ease-out forwards",
          filter: "blur(2px)",
        }}
      />
      {/* Lotus mark centered, fades out */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          animation: "curtain-lotus 1s ease-out forwards",
        }}
      >
        <svg width="56" height="36" viewBox="0 0 64 40" fill="none">
          <path
            d="M32 38 C 18 34, 8 26, 4 16 C 12 18, 20 22, 26 28 C 22 18, 22 8, 26 2 C 30 10, 32 20, 32 30 C 32 20, 34 10, 38 2 C 42 8, 42 18, 38 28 C 44 22, 52 18, 60 16 C 56 26, 46 34, 32 38 Z"
            stroke="#C8A45D"
            strokeWidth="1"
            fill="none"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="22" r="1.6" fill="#C8A45D" />
        </svg>
      </div>

      <style>{`
        @keyframes curtain-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes curtain-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        @keyframes curtain-seam {
          0% { opacity: 0; transform: translateX(-50%) scaleY(0.6); }
          30% { opacity: 1; transform: translateX(-50%) scaleY(1); }
          100% { opacity: 0; transform: translateX(-50%) scaleY(1.2); }
        }
        @keyframes curtain-lotus {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
          40% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.4); }
        }
      `}</style>
    </div>
  );
}
