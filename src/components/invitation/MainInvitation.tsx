"use client";

import { useEffect, useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { Hero } from "./Hero";
import { Countdown } from "./Countdown";
import { EventDetail } from "./EventDetail";
import { Gallery } from "./Gallery";
import { Rsvp } from "./Rsvp";
import { ClosingFooter } from "./ClosingFooter";
import { FrameCorners, FloralSprig } from "./Ornaments";
import { SectionBridge } from "./SectionBridge";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SectionNav } from "./SectionNav";

export function MainInvitation({
  lang,
  onReplay,
  onLangChange,
}: {
  lang: Lang;
  onReplay: () => void;
  onLangChange: (l: Lang) => void;
}) {
  const t = DICT[lang];
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setShowScrollHint(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="paper-ivory relative flex min-h-[100dvh] w-full flex-col">
      {/* decorative viewport frame */}
      <div className="pointer-events-none fixed inset-2 z-40 border border-navy/25 sm:inset-4" />
      <div className="pointer-events-none fixed inset-[10px] z-40 border border-gold/30 sm:inset-[18px]" />
      <div className="pointer-events-none fixed inset-0 z-40 hidden">
        <FrameCorners color="gold" inset={20} size={40} />
      </div>

      {/* floral side accents (desktop) */}
      <FloralSprig
        className="pointer-events-none fixed left-2 top-1/3 hidden -rotate-12 lg:block"
        width={140}
        opacity={0.1}
      />
      <FloralSprig
        className="pointer-events-none fixed right-2 top-1/2 hidden rotate-12 lg:block"
        width={140}
        opacity={0.1}
      />

      {/* scroll hint */}
      <div
        className={`pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transition-opacity duration-700 ${
          showScrollHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-cormorant text-[10px] uppercase tracking-[0.3em] text-navy/50">
            {t.scrollHint}
          </span>
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-navy/40 p-1">
            <span className="h-1.5 w-1 animate-bounce rounded-full bg-orange" />
          </span>
        </div>
      </div>

      {/* language switcher (bottom-left) */}
      <LanguageSwitcher lang={lang} onChange={onLangChange} />

      {/* section navigation dots (desktop right) */}
      <SectionNav lang={lang} />

      <main className="relative z-10 flex flex-1 flex-col">
        <div id="top">
          <Hero lang={lang} />
        </div>
        <Countdown lang={lang} />
        <SectionBridge />
        <div id="sec-detail">
          <EventDetail lang={lang} />
        </div>
        <SectionBridge />
        <div id="sec-gallery">
          <Gallery lang={lang} />
        </div>
        <SectionBridge />
        <div id="sec-rsvp">
          <Rsvp lang={lang} />
        </div>
        <ClosingFooter lang={lang} onReplay={onReplay} />
      </main>
    </div>
  );
}
