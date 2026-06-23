"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { ClassicDivider, LotusMark } from "./Ornaments";
import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";

export function EventDetail({ lang }: { lang: Lang }) {
  const t = DICT[lang];

  const cards = [
    {
      icon: CalendarDays,
      label: t.date,
      value: t.dateValue,
    },
    {
      icon: Clock,
      label: t.time,
      value: t.timeValue,
    },
    {
      icon: MapPin,
      label: t.venue,
      value: t.venueName,
      sub: t.venueAddr,
    },
  ];

  return (
    <section className="relative px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <LotusMark width={44} className="mx-auto mb-2" color="#C8A45D" />
          <h2 className="font-serif-inv text-3xl font-semibold text-navy sm:text-4xl">
            {t.detailTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-md font-cormorant text-base italic text-navy/65">
            {t.detailIntro}
          </p>
          <ClassicDivider className="mx-auto mt-5 max-w-[240px]" color="#031F44" />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <article
                key={c.label}
                className="group relative bg-white px-6 py-8 text-center transition-all duration-500 hover:-translate-y-1"
                style={{
                  border: "1px solid #031F44",
                  boxShadow:
                    "inset 0 0 0 4px #f7f3ea, inset 0 0 0 5px rgba(3,31,68,0.25), 0 18px 40px -24px rgba(3,31,68,0.4)",
                }}
              >
                {/* orange accent line top */}
                <span className="absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 bg-orange" />
                <span className="absolute left-1/2 top-3 h-px w-20 -translate-x-1/2 bg-gold/50" />

                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-navy/30 text-navy transition-colors duration-500 group-hover:border-orange group-hover:text-orange">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="font-cormorant text-xs uppercase tracking-[0.3em] text-navy/55">
                  {c.label}
                </p>
                <p className="mt-2 font-serif-inv text-lg font-medium leading-snug text-navy">
                  {c.value}
                </p>
                {c.sub ? (
                  <p className="mt-2 font-body-inv text-xs leading-relaxed text-navy/60">
                    {c.sub}
                  </p>
                ) : null}

                <span className="absolute bottom-3 left-1/2 h-px w-16 -translate-x-1/2 bg-gold/40" />
              </article>
            );
          })}
        </div>

        {/* RSVP phone line */}
        <div className="mt-8 flex items-center justify-center">
          <div
            className="flex items-center gap-3 border border-navy/30 bg-navy px-6 py-3 text-ivory"
            style={{ boxShadow: "inset 0 0 0 3px #031f44, inset 0 0 0 4px rgba(200,164,93,0.4)" }}
          >
            <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <span className="font-cormorant text-sm uppercase tracking-[0.25em] text-gold">
              {t.rsvpShort}
            </span>
            <span className="h-4 w-px bg-ivory/30" />
            <span className="font-body-inv text-sm tracking-wide">{t.rsvpPhone}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
