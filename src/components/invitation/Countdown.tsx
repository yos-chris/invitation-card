"use client";

import { useEffect, useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { LotusMark, ClassicDivider, FloralSprig } from "./Ornaments";

// Event: Tuesday, July 28, 2026, 4:00 PM +08:00
const EVENT_DATE = new Date("2026-07-28T16:00:00+08:00").getTime();

function diff(target: number) {
  const now = Date.now();
  let d = Math.max(0, target - now);
  const days = Math.floor(d / 86400000);
  d -= days * 86400000;
  const hours = Math.floor(d / 3600000);
  d -= hours * 3600000;
  const minutes = Math.floor(d / 60000);
  d -= minutes * 60000;
  const seconds = Math.floor(d / 1000);
  return { days, hours, minutes, seconds, done: target - now <= 0 };
}

/* A single countdown unit. The number is keyed by value so that when it
   changes, React remounts the span and replays the flip-in animation. */
function Unit({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-[68px] w-[68px] items-center justify-center overflow-hidden sm:h-[92px] sm:w-[92px]"
        style={{
          background: accent
            ? "linear-gradient(160deg, #123083 0%, #031f44 100%)"
            : "linear-gradient(160deg, #ffffff 0%, #f7f3ea 100%)",
          border: "1px solid #031f44",
          boxShadow: accent
            ? "inset 0 0 0 3px #031f44, inset 0 0 0 4px rgba(200,164,93,0.5), 0 14px 30px -16px rgba(3,31,68,0.6)"
            : "inset 0 0 0 3px #f7f3ea, inset 0 0 0 4px rgba(3,31,68,0.3), 0 14px 30px -16px rgba(3,31,68,0.4)",
        }}
      >
        {/* corner ticks */}
        <span className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-gold/70" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-gold/70" />
        <span className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-gold/70" />
        <span className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-gold/70" />

        {/* subtle inner top sheen */}
        <div
          className="pointer-events-none absolute inset-x-1 top-0 h-1/2"
          style={{
            background: accent
              ? "linear-gradient(180deg, rgba(200,164,93,0.12), transparent)"
              : "linear-gradient(180deg, rgba(255,255,255,0.6), transparent)",
          }}
        />

        {/* center divider line (flip card crease) */}
        <div
          className="pointer-events-none absolute inset-x-2 top-1/2 h-px -translate-y-1/2"
          style={{
            background: accent ? "rgba(200,164,93,0.25)" : "rgba(3,31,68,0.08)",
          }}
        />

        {/* the number — keyed by value so it remounts and replays the flip-in */}
        <span
          key={value}
          className="font-serif-inv text-2xl font-bold tabular-nums sm:text-4xl"
          style={{
            color: accent ? "#f7f3ea" : "#031f44",
            display: "inline-block",
            transformOrigin: "center bottom",
            animation: "cd-flip-in 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="mt-2 font-cormorant text-[10px] uppercase tracking-[0.25em] sm:text-xs"
        style={{ color: accent ? "#c8a45d" : "#031f4499" }}
      >
        {label}
      </span>
    </div>
  );
}

/* Pulsing colon separator */
function Separator() {
  return (
    <span
      className="mt-6 font-serif-inv text-2xl text-gold sm:mt-10 sm:text-4xl"
      style={{ animation: "cd-pulse 1.4s ease-in-out infinite" }}
      aria-hidden="true"
    >
      :
    </span>
  );
}

export function Countdown({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const [time, setTime] = useState(() => diff(EVENT_DATE));

  useEffect(() => {
    const id = setInterval(() => setTime(diff(EVENT_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Reveal className="relative px-4 py-10">
      <FloralSprig
        className="pointer-events-none absolute -left-2 top-1/2 hidden -translate-y-1/2 -rotate-12 lg:block"
        width={100}
        opacity={0.12}
      />
      <FloralSprig
        className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-12 lg:block"
        width={100}
        opacity={0.12}
      />
      {/* decorative double-border frame around the countdown */}
      <div className="relative mx-auto max-w-3xl">
        <div
          className="absolute inset-0 border border-navy/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[5px] border border-gold/30"
          aria-hidden="true"
        />
        {/* corner medallions */}
        <span className="pointer-events-none absolute -left-1 -top-1 h-2.5 w-2.5 rounded-full bg-gold/70" />
        <span className="pointer-events-none absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-gold/70" />
        <span className="pointer-events-none absolute -bottom-1 -left-1 h-2.5 w-2.5 rounded-full bg-gold/70" />
        <span className="pointer-events-none absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-gold/70" />

      <div className="relative px-4 py-6 text-center sm:px-8 sm:py-8">
        <LotusMark width={40} className="mx-auto mb-2 anim-shimmer" color="#C8A45D" />
        <h2 className="font-cormorant text-lg italic text-navy/75 sm:text-xl">
          {t.countdownTitle}
        </h2>
        <ClassicDivider className="mx-auto my-5 max-w-[180px]" color="#031F44" />

        {time.done ? (
          <p className="font-serif-inv text-2xl font-semibold text-orange sm:text-3xl">
            {t.countdownDone}
          </p>
        ) : (
          <div className="flex items-start justify-center gap-3 sm:gap-5">
            <Unit value={time.days} label={t.days} accent />
            <Separator />
            <Unit value={time.hours} label={t.hours} />
            <Separator />
            <Unit value={time.minutes} label={t.minutes} />
            <Separator />
            <Unit value={time.seconds} label={t.seconds} />
          </div>
        )}
      </div>
      </div>

      <style>{`
        @keyframes cd-flip-in {
          0% { transform: rotateX(90deg); opacity: 0; }
          100% { transform: rotateX(0deg); opacity: 1; }
        }
        @keyframes cd-pulse {
          0%, 100% { opacity: 0.45; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </Reveal>
  );
}
