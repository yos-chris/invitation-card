"use client";

import { useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import { Lightbox, type GalleryImage } from "./Lightbox";
import { LotusMark } from "./Ornaments";

const gold = "#C8A45D";

const VENUE_PHOTOS: GalleryImage[] = [
  { src: "/invitation/gallery/venue-ballroom.png", alt: "Venue ballroom" },
  { src: "/invitation/gallery/venue-garden.png", alt: "Venue garden" },
  { src: "/invitation/gallery/venue-lobby.png", alt: "Venue lobby" },
  { src: "/invitation/gallery/venue.png", alt: "Venue exterior" },
];

function VenuePhoto({
  src,
  alt,
  caption,
  className,
  delay = 0,
  onClick,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  delay?: number;
  onClick?: () => void;
}) {
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
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-110"
        style={{ transform: "scale(1.08)" }}
        draggable={false}
        loading="lazy"
      />
      {/* brand overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,31,68,0.1) 0%, transparent 40%, rgba(3,31,68,0.5) 100%)",
        }}
      />
      {/* gold inner frame */}
      <div
        className="pointer-events-none absolute inset-2 border"
        style={{ borderColor: `${gold}55` }}
      />
      {/* lotus watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <LotusMark
          width={48}
          color={gold}
          className="opacity-20 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125 group-hover:opacity-35"
        />
      </div>
      {/* corner ticks */}
      <span className="absolute left-2.5 top-2.5 h-3 w-3 border-l border-t transition-all duration-500 group-hover:h-4 group-hover:w-4" style={{ borderColor: `${gold}aa` }} />
      <span className="absolute right-2.5 top-2.5 h-3 w-3 border-r border-t transition-all duration-500 group-hover:h-4 group-hover:w-4" style={{ borderColor: `${gold}aa` }} />
      <span className="absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l transition-all duration-500 group-hover:h-4 group-hover:w-4" style={{ borderColor: `${gold}aa` }} />
      <span className="absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r transition-all duration-500 group-hover:h-4 group-hover:w-4" style={{ borderColor: `${gold}aa` }} />
      {/* caption */}
      <div className="absolute inset-x-0 bottom-0 p-3 text-center">
        <div className="mx-auto inline-block bg-navy/75 px-3 py-1 backdrop-blur-sm">
          <span className="font-cormorant text-[10px] uppercase tracking-[0.3em] text-ivory sm:text-xs">
            {caption}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export function VenueGallery({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const captions = [t.venueBallroom, t.venueGarden, t.venueLobby, t.venueName];
  const lightboxImages: GalleryImage[] = VENUE_PHOTOS.map((im, i) => ({
    ...im,
    caption: captions[i] ?? im.alt,
  }));

  return (
    <section className="relative px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          title={t.venueGalleryTitle}
          intro={t.venueGalleryIntro}
          lang={lang}
        />

        {/* Desktop: 4-photo editorial row */}
        <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-4" style={{ gridAutoRows: "220px" }}>
          <VenuePhoto
            src={VENUE_PHOTOS[0].src}
            alt={VENUE_PHOTOS[0].alt}
            caption={t.venueBallroom}
            className="col-span-2 row-span-1"
            delay={0}
            onClick={() => setLightboxIndex(0)}
          />
          <VenuePhoto
            src={VENUE_PHOTOS[1].src}
            alt={VENUE_PHOTOS[1].alt}
            caption={t.venueGarden}
            delay={80}
            onClick={() => setLightboxIndex(1)}
          />
          <VenuePhoto
            src={VENUE_PHOTOS[2].src}
            alt={VENUE_PHOTOS[2].alt}
            caption={t.venueLobby}
            delay={160}
            onClick={() => setLightboxIndex(2)}
          />
          <VenuePhoto
            src={VENUE_PHOTOS[3].src}
            alt={VENUE_PHOTOS[3].alt}
            caption={t.venueName}
            className="col-span-1"
            delay={240}
            onClick={() => setLightboxIndex(3)}
          />
        </div>

        {/* Mobile: stacked */}
        <div className="mt-6 flex flex-col gap-4 sm:hidden">
          {VENUE_PHOTOS.map((im, i) => (
            <VenuePhoto
              key={im.src}
              src={im.src}
              alt={im.alt}
              caption={captions[i]}
              className="aspect-[4/3]"
              delay={i * 80}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {lightboxIndex >= 0 ? (
        <Lightbox
          lang={lang}
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onIndex={setLightboxIndex}
        />
      ) : null}
    </section>
  );
}
