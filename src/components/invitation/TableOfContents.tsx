"use client";

import { useEffect, useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { LotusMark, ClassicDivider } from "./Ornaments";
import { List, X } from "lucide-react";

type TocItem = { id: string; labelKey: "navHero" | "detailTitle" | "galleryTitle" | "rsvpTitle" };

const ITEMS: TocItem[] = [
  { id: "top", labelKey: "navHero" },
  { id: "sec-detail", labelKey: "detailTitle" },
  { id: "sec-gallery", labelKey: "galleryTitle" },
  { id: "sec-rsvp", labelKey: "rsvpTitle" },
];

export function TableOfContents({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = 0;
      ITEMS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollPos) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard shortcut: press "T" to toggle the ToC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return;
      }
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string, i: number) => {
    setActive(i);
    setOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Trigger button — floating bottom-center-left, desktop only */}
      <button
        onClick={() => setOpen(true)}
        className="no-print fixed bottom-4 left-1/2 z-[55] hidden -translate-x-[calc(50%+120px)] items-center gap-2 rounded-full border border-gold/60 bg-navy/85 px-3 py-2 text-ivory backdrop-blur-md transition-all hover:border-orange lg:flex"
        aria-label={t.tocOpen}
      >
        <List className="h-4 w-4 text-gold" strokeWidth={1.5} />
        <span className="text-[11px] font-medium tracking-wide">{t.tocTitle}</span>
      </button>

      {/* Overlay panel */}
      {open ? (
        <div
          className="no-print fixed inset-0 z-[85] flex items-center justify-center bg-navy/70 px-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t.tocTitle}
        >
          <div
            className="frame-classic anim-scale-in relative max-w-sm bg-ivory px-6 py-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-navy/40 transition-colors hover:text-orange"
              aria-label={t.close}
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <LotusMark width={44} className="anim-shimmer mx-auto mb-2" color="#C8A45D" />
            <h3 className="text-center font-serif-inv text-xl font-semibold text-navy">
              {t.tocTitle}
            </h3>
            <ClassicDivider className="mx-auto my-4 max-w-[160px]" color="#031F44" />

            <nav className="flex flex-col gap-1">
              {ITEMS.map((item, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id, i)}
                    className={`group flex items-center gap-3 rounded-md px-4 py-2.5 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-navy/5 text-orange"
                        : "text-navy/70 hover:bg-navy/5 hover:text-navy"
                    }`}
                  >
                    {/* index number */}
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-all ${
                        isActive
                          ? "border-orange bg-orange text-ivory"
                          : "border-navy/30 text-navy/50 group-hover:border-gold group-hover:text-gold"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif-inv text-base font-medium">
                      {t[item.labelKey]}
                    </span>
                    {isActive ? (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-orange" />
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <p className="mt-4 text-center font-cormorant text-[10px] uppercase tracking-[0.25em] text-navy/40">
              Press T to toggle
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
