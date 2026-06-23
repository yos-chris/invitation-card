"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgress — a thin gold gradient progress bar fixed to the very top
 * of the viewport, reflecting how far the user has scrolled through the page.
 * Premium, subtle, on-brand.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="no-print fixed left-0 top-0 z-[90] h-[3px] w-full"
      aria-hidden="true"
    >
      {/* thin track */}
      <div className="absolute inset-0 bg-navy/10" />
      {/* gold gradient fill */}
      <div
        className="absolute left-0 top-0 h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, #C8A45D 0%, #F07800 50%, #C8A45D 100%)",
          boxShadow: "0 0 8px rgba(200,164,93,0.6)",
        }}
      />
    </div>
  );
}
