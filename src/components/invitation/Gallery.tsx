"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { ClassicDivider, LotusMark, FloralSprig } from "./Ornaments";

/*
  Gallery placeholders.
  These are elegant artistic panels (NOT generated photos). Each panel is a
  self-contained styled div so the gallery always looks premium. To use real
  photos later, replace the <GalleryPanel> children with <img src="..."/>.
  Internal labels (not visible to visitors):
    panel-1: hero moment / celebration
    panel-2: care & community
    panel-3: team portrait
    panel-4: venue ambiance
    panel-5: anniversary cake
    panel-6: gratitude
*/

function GalleryPanel({
  className,
  tone = "navy",
  caption,
}: {
  className?: string;
  tone?: "navy" | "royal" | "ivory";
  caption?: string;
}) {
  const bg =
    tone === "navy"
      ? "linear-gradient(155deg, #0a2c5e 0%, #031f44 60%, #02152f 100%)"
      : tone === "royal"
        ? "linear-gradient(155deg, #1a3f8f 0%, #123083 60%, #0a2366 100%)"
        : "linear-gradient(155deg, #fbf7ee 0%, #f1e9d6 100%)";
  const fg = tone === "ivory" ? "#031F44" : "#F7F3EA";
  const gold = "#C8A45D";
  return (
    <div
      className={`photo-frame group relative overflow-hidden ${className ?? ""}`}
      style={{ background: bg }}
    >
      {/* inner gold frame */}
      <div
        className="pointer-events-none absolute inset-2 border"
        style={{ borderColor: `${gold}66` }}
      />
      {/* paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
      {/* lotus watermark center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <LotusMark
          width={70}
          color={gold}
          className="opacity-30 transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      {/* corner ticks */}
      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t" style={{ borderColor: `${gold}99` }} />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t" style={{ borderColor: `${gold}99` }} />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l" style={{ borderColor: `${gold}99` }} />
      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r" style={{ borderColor: `${gold}99` }} />
      {/* caption */}
      {caption ? (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent p-3 text-center">
          <span
            className="font-cormorant text-xs uppercase tracking-[0.3em]"
            style={{ color: fg }}
          >
            {caption}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export function Gallery({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return (
    <section className="relative px-4 py-16 sm:py-20">
      {/* navy band backdrop */}
      <div className="cinema-navy cinema-grain absolute inset-x-0 top-16 bottom-16 -z-10 opacity-[0.04]" />
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <LotusMark width={44} className="mx-auto mb-2" color="#C8A45D" />
          <h2 className="font-serif-inv text-3xl font-semibold text-navy sm:text-4xl">
            {t.galleryTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-md font-cormorant text-base italic text-navy/65">
            {t.galleryIntro}
          </p>
          <ClassicDivider className="mx-auto mt-5 max-w-[240px]" color="#031F44" />
        </div>

        {/* Editorial collage grid (desktop) */}
        <div className="mt-10 hidden grid-cols-6 grid-rows-[180px_180px_180px] gap-4 sm:grid">
          <GalleryPanel
            className="col-span-3 row-span-2"
            tone="navy"
          />
          <GalleryPanel
            className="col-span-3 row-span-1"
            tone="royal"
          />
          <GalleryPanel
            className="col-span-1 row-span-1"
            tone="ivory"
          />
          <GalleryPanel
            className="col-span-2 row-span-1"
            tone="navy"
          />
          <GalleryPanel
            className="col-span-2 row-span-1"
            tone="royal"
          />
          <GalleryPanel
            className="col-span-2 row-span-1"
            tone="ivory"
          />
          <GalleryPanel
            className="col-span-2 row-span-1"
            tone="navy"
          />
        </div>

        {/* Mobile: stacked elegant cards */}
        <div className="mt-8 flex flex-col gap-4 sm:hidden">
          <GalleryPanel className="aspect-[4/3]" tone="navy" />
          <GalleryPanel className="aspect-[4/3]" tone="royal" />
          <GalleryPanel className="aspect-[4/3]" tone="ivory" />
          <GalleryPanel className="aspect-[4/3]" tone="navy" />
        </div>

        <FloralSprig
          className="pointer-events-none mx-auto mt-8 block"
          width={120}
          opacity={0.3}
        />
      </div>
    </section>
  );
}
