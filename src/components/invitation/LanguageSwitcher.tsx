"use client";

import { useState } from "react";
import { LANGS, DICT, type Lang } from "@/lib/i18n";
import { Globe } from "lucide-react";

export function LanguageSwitcher({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  const [open, setOpen] = useState(false);
  const t = DICT[lang];

  return (
    <div className="fixed bottom-4 left-4 z-[60]">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.switchLang}
        aria-expanded={open}
        className="group flex items-center gap-2 rounded-full border border-gold/60 bg-navy/85 px-3 py-2 text-ivory backdrop-blur-md transition-all hover:border-orange"
      >
        <Globe className="h-4 w-4 text-gold" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wide">
          {LANGS.find((l) => l.code === lang)?.label}
        </span>
      </button>
      {open ? (
        <div className="absolute bottom-12 left-0 flex flex-col gap-1 rounded-xl border border-gold/40 bg-navy/95 p-1.5 shadow-2xl backdrop-blur-md">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                onChange(l.code);
                setOpen(false);
              }}
              className={`rounded-lg px-4 py-1.5 text-left text-xs transition-colors ${
                l.code === lang
                  ? "bg-gold/20 text-gold"
                  : "text-ivory/80 hover:bg-royal/60 hover:text-ivory"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
