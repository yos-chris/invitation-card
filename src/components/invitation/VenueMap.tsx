"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { FrameCorners, LotusMark } from "./Ornaments";
import { MapPin, ExternalLink } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Golden+Tulip+Jineng+Resort+Jl.+Sunset+Road+No.98+Kuta+Bali";

export function VenueMap({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return (
    <Reveal className="mt-10">
      <div className="relative mx-auto max-w-3xl">
        {/* heading row */}
        <div className="mb-4 flex items-center justify-center gap-2 text-center">
          <MapPin className="h-4 w-4 text-orange" strokeWidth={1.5} />
          <h3 className="font-serif-inv text-xl font-semibold text-navy sm:text-2xl">
            {t.venueMap}
          </h3>
        </div>
        <p className="mb-4 text-center font-cormorant text-sm italic text-navy/60">
          {t.venueMapHint}
        </p>

        {/* framed map */}
        <div className="frame-classic relative overflow-hidden bg-white">
          <FrameCorners color="navy" inset={6} size={28} />
          <div className="relative">
            <img
              src="/invitation/gallery/venue-map.png"
              alt="Stylized map of Kuta, Bali showing the venue location"
              className="block w-full select-none object-cover"
              style={{ maxHeight: "320px" }}
              draggable={false}
              loading="lazy"
            />
            {/* brand-cohesion overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(3,31,68,0.08) 0%, transparent 30%, transparent 70%, rgba(3,31,68,0.18) 100%)",
              }}
            />
            {/* venue pin marker (centered) */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex flex-col items-center">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-navy text-gold shadow-lg"
                  style={{ animation: "pin-pulse 2s ease-in-out infinite" }}
                >
                  <MapPin className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="mt-1 h-3 w-px bg-gold/70" />
              </div>
            </div>
            {/* corner compass mark */}
            <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-full bg-navy/80 px-2.5 py-1 backdrop-blur-sm">
              <LotusMark width={16} color="#C8A45D" />
              <span className="font-cormorant text-[9px] uppercase tracking-[0.2em] text-gold/80">
                N
              </span>
            </div>
          </div>
        </div>

        {/* open in maps button */}
        <div className="mt-4 flex justify-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill solid-navy px-5 py-2.5 text-xs uppercase tracking-[0.18em]"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
            {t.openInMaps}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pin-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(240,120,0,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(240,120,0,0); }
        }
      `}</style>
    </Reveal>
  );
}
