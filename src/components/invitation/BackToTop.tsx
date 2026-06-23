"use client";

import { useEffect, useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { ArrowUp } from "lucide-react";

export function BackToTop({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.backToTop}
      className={`group fixed bottom-4 right-4 z-[55] flex items-center gap-2 rounded-full border border-gold/60 bg-navy/90 px-3 py-2.5 text-ivory backdrop-blur-md transition-all duration-500 hover:border-orange hover:bg-royal/90 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4 text-gold transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.5} />
      <span className="hidden text-[11px] font-medium tracking-wide sm:inline">
        {t.backToTop}
      </span>
    </button>
  );
}
