"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { MapPin, ExternalLink } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Golden%20Tulip%20Jineng%20Resort%20Jl.%20Sunset%20Road%20No.98%20Kuta%20Kabupaten%20Badung%20Bali";

// Google Maps embed URL (no API key required for basic place embeds)
const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Golden+Tulip+Jineng+Resort+Jl.+Sunset+Road+No.98+Kuta+Kabupaten+Badung+Bali&output=embed";

export function VenueMap({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return (
    <Reveal className="mt-10">
      <div className="relative mx-auto max-w-4xl">
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

        {/* framed Google Maps embed — modern, real map */}
        <div
          className="relative overflow-hidden bg-white"
          style={{
            border: "1px solid rgba(3,31,68,0.3)",
            borderRadius: "18px",
            boxShadow:
              "0 0 0 4px #f7f3ea, 0 0 0 5px rgba(200,164,93,0.3), 0 18px 50px rgba(3,31,68,0.18)",
          }}
        >
          {/* gold inner accent line */}
          <div
            className="pointer-events-none absolute inset-0 z-[2] rounded-[18px]"
            style={{ border: "1px solid rgba(200,164,93,0.35)" }}
          />
          {/* corner ornaments */}
          <span className="pointer-events-none absolute left-3 top-3 z-[3] h-3 w-3 border-l border-t border-gold/60" />
          <span className="pointer-events-none absolute right-3 top-3 z-[3] h-3 w-3 border-r border-t border-gold/60" />
          <span className="pointer-events-none absolute bottom-3 left-3 z-[3] h-3 w-3 border-b border-l border-gold/60" />
          <span className="pointer-events-none absolute bottom-3 right-3 z-[3] h-3 w-3 border-b border-r border-gold/60" />

          <iframe
            src={MAPS_EMBED_URL}
            title="Golden Tulip Jineng Resort location map"
            className="block w-full"
            style={{
              height: "clamp(320px, 48vh, 500px)",
              border: "0",
              borderRadius: "16px",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
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
    </Reveal>
  );
}
