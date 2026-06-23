"use client";

import { useEffect, useState } from "react";
import { DICT, type Lang, type Dict } from "@/lib/i18n";

/**
 * SectionNav — elegant floating navigation dots (right side, desktop only).
 * Each dot represents a section; clicking smoothly scrolls to it.
 * Active dot expands and turns gold. Tooltips show section name on hover.
 */
type SectionDef = { id: string; labelKey: keyof Dict };

const SECTIONS: SectionDef[] = [
  { id: "top", labelKey: "navHero" },
  { id: "sec-detail", labelKey: "detailTitle" },
  { id: "sec-rsvp", labelKey: "rsvpTitle" },
];

export function SectionNav({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = 0;
      SECTIONS.forEach((s, i) => {
        const el =
          s.id === "top"
            ? { offsetTop: 0 }
            : document.getElementById(s.id);
        if (el && el.offsetTop <= scrollPos) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string, i: number) => {
    setActive(i);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      aria-label="Section navigation"
    >
      {SECTIONS.map((s, i) => {
        const isActive = active === i;
        const label = t[s.labelKey];
        return (
          <button
            key={s.id}
            onClick={() => go(s.id, i)}
            className="group relative flex items-center justify-end"
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
          >
            {/* tooltip */}
            <span
              className={`pointer-events-none absolute right-6 whitespace-nowrap rounded-full border border-gold/40 bg-navy/90 px-3 py-1 font-cormorant text-[10px] uppercase tracking-[0.25em] text-ivory backdrop-blur-sm transition-all duration-300 ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            {/* dot */}
            <span
              className="block rounded-full transition-all duration-500"
              style={{
                width: isActive ? 10 : 7,
                height: isActive ? 10 : 7,
                background: isActive ? "#F07800" : "#C8A45D",
                opacity: isActive ? 1 : 0.5,
                boxShadow: isActive
                  ? "0 0 0 3px rgba(240,120,0,0.18)"
                  : "none",
              }}
            />
          </button>
        );
      })}
      {/* vertical connector line */}
      <div
        className="pointer-events-none absolute right-[3px] top-1/2 h-[120px] w-px -translate-y-1/2"
        style={{ background: "linear-gradient(to bottom, transparent, #C8A45D55, transparent)" }}
        aria-hidden="true"
      />
    </nav>
  );
}
