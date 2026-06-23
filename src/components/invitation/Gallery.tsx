"use client";

import { useEffect, useRef, useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { ClassicDivider, LotusMark, FloralSprig } from "./Ornaments";
import { Reveal } from "./Reveal";
import { Lightbox, type GalleryImage } from "./Lightbox";

const gold = "#C8A45D";

/* Subtle scroll parallax: shifts the image vertically based on its position
   relative to the viewport. Lightweight, rAF-throttled, passive listener. */
function useParallaxImg(strength = 14) {
  const ref = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    // Skip on touch / small screens for performance
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = img.getBoundingClientRect();
      const vh = window.innerHeight;
      // distance of the image center from viewport center, normalized -1..1
      const norm = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
      const shift = Math.max(-1, Math.min(1, norm)) * strength;
      img.style.transform = `scale(1.12) translateY(${shift}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

/* Real AI-generated gallery images */
const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/invitation/gallery/celebration.png", alt: "Celebration" },
  { src: "/invitation/gallery/community.png", alt: "Care & Community" },
  { src: "/invitation/gallery/team.png", alt: "Our Team" },
  { src: "/invitation/gallery/venue.png", alt: "Venue" },
  { src: "/invitation/gallery/anniversary.png", alt: "Anniversary" },
  { src: "/invitation/gallery/gratitude.png", alt: "Gratitude" },
];

function GalleryPhoto({
  className,
  src,
  alt,
  caption,
  featured = false,
  delay = 0,
  overlay = "navy",
  onClick,
}: {
  className?: string;
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
  delay?: number;
  overlay?: "navy" | "royal" | "warm";
  onClick?: () => void;
}) {
  const imgRef = useParallaxImg(featured ? 18 : 12);
  const overlayGradient =
    overlay === "navy"
      ? "linear-gradient(180deg, rgba(3,31,68,0.15) 0%, rgba(3,31,68,0.55) 100%)"
      : overlay === "royal"
        ? "linear-gradient(180deg, rgba(18,48,131,0.12) 0%, rgba(18,48,131,0.5) 100%)"
        : "linear-gradient(180deg, rgba(200,164,93,0.12) 0%, rgba(240,120,0,0.25) 100%)";

  return (
    <Reveal
      delay={delay}
      className={`photo-frame group relative cursor-pointer overflow-hidden ${className ?? ""}`}
    >
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-0 z-[1] h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        aria-label={alt}
        tabIndex={-1}
      />
      {/* Real photo background — with scroll parallax + hover brightness */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-110"
        style={{ transform: "scale(1.12)" }}
        draggable={false}
        loading="lazy"
      />

      {/* Color overlay for brand cohesion */}
      <div className="pointer-events-none absolute inset-0" style={{ background: overlayGradient }} />

      {/* inner gold frame */}
      <div
        className="pointer-events-none absolute inset-2 border"
        style={{ borderColor: `${gold}55` }}
      />
      {featured ? (
        <div className="pointer-events-none absolute inset-4 border" style={{ borderColor: `${gold}40` }} />
      ) : null}

      {/* featured monogram overlay */}
      {featured ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-serif-inv text-8xl font-bold opacity-[0.08] sm:text-9xl"
            style={{ color: "#F7F3EA" }}
          >
            1
          </span>
        </div>
      ) : null}

      {/* lotus watermark — scales on hover */}
      <div className="absolute inset-0 flex items-center justify-center">
        <LotusMark
          width={featured ? 100 : 56}
          color={gold}
          className="opacity-25 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125 group-hover:opacity-35"
        />
      </div>

      {/* corner ticks (decorative) */}
      <span className="absolute left-3 top-3 h-3.5 w-3.5 border-l border-t transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: `${gold}bb` }} />
      <span className="absolute right-3 top-3 h-3.5 w-3.5 border-r border-t transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: `${gold}bb` }} />
      <span className="absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: `${gold}bb` }} />
      <span className="absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: `${gold}bb` }} />

      {/* caption — slides up on hover (desktop) / always visible (mobile) */}
      {caption ? (
        <div className="absolute inset-x-0 bottom-0 translate-y-0 p-3 text-center transition-transform duration-500 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <div className="mx-auto inline-block bg-navy/75 px-3 py-1 backdrop-blur-sm">
            <span className="font-cormorant text-[10px] uppercase tracking-[0.3em] text-ivory sm:text-xs">
              {caption}
            </span>
          </div>
        </div>
      ) : null}

      {/* hover sheen sweep */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(200,164,93,0.22) 0%, transparent 50%, rgba(240,120,0,0.15) 100%)",
        }}
      />
    </Reveal>
  );
}

export function Gallery({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const imgs = GALLERY_IMAGES;
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Lightbox images with localized captions
  const lightboxImages: GalleryImage[] = imgs.map((im, i) => ({
    ...im,
    caption:
      [
        t.galleryCaption1,
        t.galleryCaption2,
        t.galleryCaption3,
        t.galleryCaption4,
        t.galleryCaption5,
        t.galleryCaption6,
      ][i] ?? im.alt,
  }));

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(-1);

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

        {/* Desktop: editorial collage grid with real photos */}
        <div className="mt-10 hidden grid-cols-6 gap-4 sm:grid" style={{ gridAutoRows: "160px" }}>
          <GalleryPhoto
            className="col-span-3 row-span-3"
            src={imgs[0].src}
            alt={imgs[0].alt}
            caption={t.galleryCaption1}
            featured
            delay={0}
            overlay="navy"
            onClick={() => open(0)}
          />
          <GalleryPhoto
            className="col-span-3 row-span-1"
            src={imgs[1].src}
            alt={imgs[1].alt}
            caption={t.galleryCaption2}
            delay={80}
            overlay="royal"
            onClick={() => open(1)}
          />
          <GalleryPhoto
            className="col-span-1 row-span-1"
            src={imgs[2].src}
            alt={imgs[2].alt}
            delay={160}
            overlay="warm"
            onClick={() => open(2)}
          />
          <GalleryPhoto
            className="col-span-2 row-span-2"
            src={imgs[3].src}
            alt={imgs[3].alt}
            caption={t.galleryCaption4}
            delay={240}
            overlay="royal"
            onClick={() => open(3)}
          />
          <GalleryPhoto
            className="col-span-2 row-span-1"
            src={imgs[4].src}
            alt={imgs[4].alt}
            caption={t.galleryCaption5}
            delay={120}
            overlay="warm"
            onClick={() => open(4)}
          />
          <GalleryPhoto
            className="col-span-2 row-span-1"
            src={imgs[5].src}
            alt={imgs[5].alt}
            caption={t.galleryCaption6}
            delay={200}
            overlay="navy"
            onClick={() => open(5)}
          />
        </div>

        {/* Mobile: stacked elegant cards with real photos */}
        <div className="mt-8 flex flex-col gap-4 sm:hidden">
          <GalleryPhoto
            className="aspect-[4/3]"
            src={imgs[0].src}
            alt={imgs[0].alt}
            caption={t.galleryCaption1}
            featured
            overlay="navy"
            onClick={() => open(0)}
          />
          <div className="grid grid-cols-2 gap-4">
            <GalleryPhoto
              className="aspect-square"
              src={imgs[1].src}
              alt={imgs[1].alt}
              caption={t.galleryCaption2}
              overlay="royal"
              onClick={() => open(1)}
            />
            <GalleryPhoto
              className="aspect-square"
              src={imgs[2].src}
              alt={imgs[2].alt}
              caption={t.galleryCaption3}
              overlay="warm"
              onClick={() => open(2)}
            />
          </div>
          <GalleryPhoto
            className="aspect-[4/3]"
            src={imgs[3].src}
            alt={imgs[3].alt}
            caption={t.galleryCaption4}
            overlay="navy"
            onClick={() => open(3)}
          />
          <div className="grid grid-cols-2 gap-4">
            <GalleryPhoto
              className="aspect-square"
              src={imgs[4].src}
              alt={imgs[4].alt}
              caption={t.galleryCaption5}
              overlay="warm"
              onClick={() => open(4)}
            />
            <GalleryPhoto
              className="aspect-square"
              src={imgs[5].src}
              alt={imgs[5].alt}
              caption={t.galleryCaption6}
              overlay="royal"
              onClick={() => open(5)}
            />
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

      {/* Lightbox */}
      {lightboxIndex >= 0 ? (
        <Lightbox
          lang={lang}
          images={lightboxImages}
          index={lightboxIndex}
          onClose={close}
          onIndex={setLightboxIndex}
        />
      ) : null}
    </section>
  );
}
