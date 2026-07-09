"use client";

import { DICT, type Lang } from "@/lib/i18n";
import { ClassicDivider, LotusMark, FloralSprig } from "./Ornaments";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { EventActions } from "./EventActions";
import { VenueMap } from "./VenueMap";
import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";

export function EventDetail({ lang }: { lang: Lang }) {
  const t = DICT[lang];

  const cards = [
    { icon: CalendarDays, label: t.date, value: t.dateValue },
    { icon: Clock, label: t.time, value: t.timeValue },
    { icon: MapPin, label: t.venue, value: t.venueName, sub: t.venueAddr },
  ];

  return (
    <section className="relative px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle title={t.detailTitle} intro={t.detailIntro} lang={lang} />

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            // Date card: large serif; Time card: even larger (focal); Venue: medium
            const isDateCard = i === 0;
            const isTimeCard = i === 1;
            return (
              <Reveal key={c.label} delay={i * 120}>
                <article
                  className="group relative h-full bg-white px-5 py-9 text-center transition-all duration-500 hover:-translate-y-1.5 sm:px-6 sm:py-10"
                  style={{
                    border: "1px solid #031F44",
                    boxShadow:
                      "inset 0 0 0 4px #f7f3ea, inset 0 0 0 5px rgba(3,31,68,0.25), 0 18px 40px -24px rgba(3,31,68,0.4)",
                  }}
                >
                  {/* hover gold glow overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow:
                        "0 0 24px -2px rgba(200,164,93,0.35), 0 0 0 1px rgba(200,164,93,0.4)",
                    }}
                    aria-hidden="true"
                  />
                  {/* corner ornaments (navy) */}
                  <span className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-navy/40 transition-all duration-500 group-hover:border-gold/70" />
                  <span className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-navy/40 transition-all duration-500 group-hover:border-gold/70" />
                  <span className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-navy/40 transition-all duration-500 group-hover:border-gold/70" />
                  <span className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-navy/40 transition-all duration-500 group-hover:border-gold/70" />

                  {/* orange accent line top */}
                  <span className="absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 bg-orange" />
                  <span className="absolute left-1/2 top-3 h-px w-20 -translate-x-1/2 bg-gold/50" />

                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-navy/30 text-navy transition-all duration-500 group-hover:scale-110 group-hover:border-orange group-hover:bg-orange/5 group-hover:text-orange">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className="font-cormorant text-xs uppercase tracking-[0.3em] text-navy/55">
                    {c.label}
                  </p>
                  {/* Enlarged focal text: Date (32-42px), Time (36-48px), Venue (medium) */}
                  {isTimeCard ? (
                    <p
                      className="mt-3 font-serif-inv font-bold leading-none text-navy"
                      style={{ fontSize: "clamp(30px, 5vw, 46px)" }}
                    >
                      {c.value}
                    </p>
                  ) : isDateCard ? (
                    <p
                      className="mt-3 font-serif-inv font-bold leading-tight text-navy"
                      style={{ fontSize: "clamp(24px, 3.8vw, 38px)" }}
                    >
                      {c.value}
                    </p>
                  ) : (
                    <p className="mt-3 font-serif-inv text-xl font-semibold leading-snug text-navy sm:text-2xl">
                      {c.value}
                    </p>
                  )}
                  {c.sub ? (
                    <p className="mt-2 font-body-inv text-xs leading-relaxed text-navy/60">
                      {c.sub}
                    </p>
                  ) : null}

                  <span className="absolute bottom-3 left-1/2 h-px w-16 -translate-x-1/2 bg-gold/40" />
                </article>
              </Reveal>
            );
          })}
        </div>



        {/* Decorative floral accent */}
        <div className="mt-6 flex justify-center">
          <FloralSprig width={70} opacity={0.35} />
        </div>

        {/* RSVP phone line — softened navy gradient with glass effect */}
        <Reveal className="mt-6 flex items-center justify-center">
          <div
            className="flex flex-wrap items-center justify-center gap-3 px-6 py-3 text-ivory"
            style={{
              background:
                "linear-gradient(135deg, rgba(3,31,68,0.92) 0%, rgba(8,46,92,0.78) 100%)",
              border: "1px solid rgba(200,164,93,0.35)",
              borderRadius: "14px",
              boxShadow: "0 14px 36px rgba(3,31,68,0.16)",
              backdropFilter: "blur(6px)",
            }}
          >
            <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <span className="font-cormorant text-sm uppercase tracking-[0.25em] text-gold">
              {t.rsvpShort}
            </span>
            <span className="hidden h-4 w-px bg-ivory/30 sm:block" />
            <span className="font-body-inv text-sm tracking-wide">{t.rsvpPhone}</span>
          </div>
        </Reveal>

        {/* Add to calendar + share */}
        <Reveal className="mt-2">
          <EventActions lang={lang} />
        </Reveal>

        {/* Venue map */}
        <VenueMap lang={lang} />
      </div>
    </section>
  );
}
