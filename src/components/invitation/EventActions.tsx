"use client";

import { useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { CalendarPlus, Share2, Copy, Check } from "lucide-react";

// Event details (shared, language-independent for the calendar file)
const EVENT = {
  title: "1st Anniversary — Bali Office · Modern Cancer Hospital Guangzhou",
  start: "20260728T020000Z", // 10:00 +08:00 = 02:00 UTC
  end: "20260728T050000Z",
  location: "Golden Tulip Jineng Resort, Jl. Sunset Road No.98, Kuta, Badung, Bali",
  desc: "First Anniversary of the Bali Office — Modern Cancer Hospital Guangzhou / St. Stamford International Medical.",
};

function buildIcs(): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MCHG//Bali Anniversary//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@bali-anniversary`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${EVENT.start}`,
    `DTEND:${EVENT.end}`,
    `SUMMARY:${EVENT.title}`,
    `DESCRIPTION:${EVENT.desc}`,
    `LOCATION:${EVENT.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function EventActions({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const [copied, setCopied] = useState(false);

  const downloadIcs = () => {
    const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bali-anniversary.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const share = async () => {
    const shareData = {
      title: t.shareTitle,
      text: t.shareText,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch {
        /* clipboard unavailable */
      }
    }
  };

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={downloadIcs}
        className="group inline-flex items-center gap-2 rounded-full border border-navy/40 bg-ivory/50 px-4 py-2 font-body-inv text-xs uppercase tracking-[0.18em] text-navy transition-all duration-500 hover:border-orange hover:text-orange"
      >
        <CalendarPlus className="h-3.5 w-3.5" strokeWidth={1.5} />
        {t.addToCalendar}
      </button>
      <button
        onClick={share}
        className="group inline-flex items-center gap-2 rounded-full border border-navy/40 bg-ivory/50 px-4 py-2 font-body-inv text-xs uppercase tracking-[0.18em] text-navy transition-all duration-500 hover:border-orange hover:text-orange"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-orange" strokeWidth={1.5} />
            {t.linkCopied}
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5" strokeWidth={1.5} />
            {t.share}
          </>
        )}
      </button>
    </div>
  );
}
