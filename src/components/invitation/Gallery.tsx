"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { ClassicDivider, LotusMark, FloralSprig } from "./Ornaments";
import { Reveal } from "./Reveal";

/*
  Gallery — elegant editorial collage with artistic placeholder panels.
  These panels are styled compositions (NOT generated photos). To use real
  photos later, replace the inner content of <GalleryPanel> with <img>.
  Internal labels (not visible to visitors):
    panel-1: hero moment / celebration   (featured large)
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
  featured = false,
  delay = 0,
}: {
  className?: string;
  tone?: "navy" | "royal" | "ivory" | "gold";
  caption?: string;
  featured?: boolean;
  delay?: number;
}) {
  const bg =
    tone === "navy"
      ? "linear-gradient(155deg, #0a2c5e 0%, #031f44 60%, #02152f 100%)"
      : tone === "royal"
        ? "linear-gradient(155deg, #1a3f8f 0%, #123083 60%, #0a2366 100%)"
        : tone === "gold"
          ? "linear-gradient(155deg, #d9b978 0%, #c8a45d 60%, #a8853f 100%)"
          : "linear-gradient(155deg, #fbf7ee 0%, #f1e9d6 100%)";
  const fg = tone === "ivory" ? "#031F44" : "#F7F3EA";
  const gold = "#C8A45D";

  return (
    <Reveal
      delay={delay}
      className={`photo-frame group relative overflow-hidden ${className ?? ""}`}
    >
      <div className="absolute inset-0" style={{ background: bg }} />
      {/* inner gold frame */}
      <div
        className="pointer-events-none absolute inset-2 border"
        style={{ borderColor: `${gold}${tone === "ivory" ? "55" : "66"}` }}
      />
      {featured ? (
        <div
          className="pointer-events-none absolute inset-4 border"
          style={{ borderColor: `${gold}44` }}
        />
      ) : null}
      {/* paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
      {/* radial vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.28) 100%)",
        }}
      />
      {/* lotus watermark center — scales on hover */}
      <div className="absolute inset-0 flex items-center justify-center">
        <LotusMark
          width={featured ? 110 : 64}
          color={gold}
          className="opacity-30 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125"
        />
      </div>
      {/* featured monogram overlay */}
      {featured ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-serif-inv text-7xl font-bold opacity-10 sm:text-8xl"
            style={{ color: fg }}
          >
            1
          </span>
        </div>
      ) : null}
      {/* corner ticks (decorative) */}
      <span className="absolute left-3 top-3 h-3.5 w-3.5 border-l border-t transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: `${gold}aa` }} />
      <span className="absolute right-3 top-3 h-3.5 w-3.5 border-r border-t transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: `${gold}aa` }} />
      <span className="absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: `${gold}aa` }} />
      <span className="absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: `${gold}aa` }} />
      {/* caption — slides up on hover (desktop) / always visible (mobile) */}
      {caption ? (
        <div className="absolute inset-x-0 bottom-0 translate-y-0 p-3 text-center transition-transform duration-500 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <div
            className="mx-auto inline-block px-3 py-1"
            style={{ background: tone === "ivory" ? "rgba(3,31,68,0.85)" : "rgba(3,31,68,0.7)" }}
          >
            <span
              className="font-cormorant text-[10px] uppercase tracking-[0.3em] sm:text-xs"
              style={{ color: fg }}
            >
              {caption}
            </span>
          </div>
        </div>
      ) : null}
      {/* hover sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(200,164,93,0.18) 0%, transparent 50%, rgba(240,120,0,0.12) 100%)",
        }}
      />
    </Reveal>
  );
}

export function Gallery({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return (
    <section className="relative px-4 py-16 sm:py-20">
      {/* faint navy band backdrop for depth */}
      <div className="cinema-navy cinema-grain absolute inset-x-0 top-16 bottom-16 -z-10 opacity-[0.04]" />
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <LotusMark width={44} className="mx-auto mb-2" color="#C8A45D" />
          <h2 className="font-serif-inv text-3xl font-semibold text-navy sm:text-4xl">
            {t.galleryTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-md font-cormorant text-base italic text-navy/65">
            {t.galleryIntro}
          </p>
          <ClassicDivider className="mx-auto mt-5 max-w-[240px]" color="#031F44" />
        </Reveal>

        {/* Editorial collage grid (desktop) — featured large + varied spans */}
        <div className="mt-10 hidden grid-cols-6 gap-4 sm:grid" style={{ gridAutoRows: "160px" }}>
          <GalleryPanel
            className="col-span-3 row-span-3"
            tone="navy"
            caption={t.galleryCaption1}
            featured
            delay={0}
          />
          <GalleryPanel
            className="col-span-3 row-span-1"
            tone="royal"
            caption={t.galleryCaption2}
            delay={80}
          />
          <GalleryPanel
            className="col-span-1 row-span-1"
            tone="ivory"
            delay={160}
          />
          <GalleryPanel
            className="col-span-2 row-span-2"
            tone="gold"
            caption={t.galleryCaption3}
            delay={240}
          />
          <GalleryPanel
            className="col-span-2 row-span-1"
            tone="navy"
            caption={t.galleryCaption4}
            delay={120}
          />
          <GalleryPanel
            className="col-span-2 row-span-1"
            tone="ivory"
            caption={t.galleryCaption5}
            delay={200}
          />
          <GalleryPanel
            className="col-span-2 row-span-1"
            tone="royal"
            caption={t.galleryCaption6}
            delay={280}
          />
        </div>

        {/* Mobile: stacked elegant cards with varied aspect ratios */}
        <div className="mt-8 flex flex-col gap-4 sm:hidden">
          <GalleryPanel className="aspect-[4/3]" tone="navy" caption={t.galleryCaption1} featured />
          <div className="grid grid-cols-2 gap-4">
            <GalleryPanel className="aspect-square" tone="royal" caption={t.galleryCaption2} />
            <GalleryPanel className="aspect-square" tone="gold" caption={t.galleryCaption3} />
          </div>
          <GalleryPanel className="aspect-[4/3]" tone="ivory" caption={t.galleryCaption5} />
          <div className="grid grid-cols-2 gap-4">
            <GalleryPanel className="aspect-square" tone="navy" caption={t.galleryCaption4} />
            <GalleryPanel className="aspect-square" tone="royal" caption={t.galleryCaption6} />
          </div>
        </div>

        <Reveal className="text-center">
          <FloralSprig
            className="pointer-events-none mx-auto mt-8 block"
            width={120}
            opacity={0.3}
          />
        </Reveal>
      </div>
    </section>
  );
}
