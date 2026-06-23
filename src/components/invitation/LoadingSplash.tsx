"use client";

import { useEffect, useState } from "react";
import { LotusMark } from "./Ornaments";

/**
 * LoadingSplash — elegant loading screen shown while fonts/assets load.
 * Displays the lotus mark with a slow shimmer + a thin progress arc,
 * then fades out smoothly. Shown only on first mount of the app.
 */
export function LoadingSplash() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Wait for window load OR a max timeout, whichever first
    const finish = () => {
      setDone(true);
      // remove from DOM after fade
      setTimeout(() => setHidden(true), 900);
    };

    if (document.readyState === "complete") {
      const t = setTimeout(finish, 600);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", finish);
    const max = setTimeout(finish, 2200);
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(max);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="cinema-navy cinema-grain fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700"
      style={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
      aria-hidden={done}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle at center, rgba(200,164,93,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Lotus mark with slow shimmer */}
      <div className="anim-fade-in relative mb-6">
        <LotusMark
          width={72}
          color="#C8A45D"
          className="anim-shimmer"
        />
      </div>

      {/* Rotating thin gold arc */}
      <div className="relative h-12 w-12">
        <div
          className="absolute inset-0 rounded-full border-2 border-gold/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold"
          style={{
            animation: "splash-spin 1.1s linear infinite",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Elegant tagline */}
      <p
        className="anim-fade-in mt-6 font-cormorant text-xs uppercase tracking-[0.4em] text-gold/70"
        style={{ animationDelay: "0.3s" }}
      >
        Modern Cancer Hospital Guangzhou
      </p>

      <style>{`
        @keyframes splash-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
