"use client";

import { useEffect, useRef, useState } from "react";
import { DICT, cardFor, type Lang } from "@/lib/i18n";
import { LotusMark, ClassicDivider } from "./Ornaments";
import { GoldenPetals } from "./GoldenPetals";
import { playPaperRustle, playChime } from "@/lib/sfx";

/*
  Envelope reveal — landscape asset, coordinated group animation.

  START state (preserve): landscape envelope, ~860px wide, centered.
  FINAL state (preserve): card focused, envelope receded behind.

  Middle animation (the only thing changed):
  1. appear   — landscape envelope fades + scales in (START state)
  2. rotate   — whole reveal group rotates to opening position
  3. flap     — triangular flap opens like a paper fold
  4. slide    — card slides out (upright), proportional to envelope
  5. settle   — group rotates back + envelope recedes → FINAL state
  6. ready    — button appears
*/
type Phase = "appear" | "rotate" | "flap" | "slide" | "settle" | "ready";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function EnvelopeScreen({
  lang,
  onOpen,
}: {
  lang: Lang;
  onOpen: () => void;
}) {
  const t = DICT[lang];
  const [phase, setPhase] = useState<Phase>("appear");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rustledRef = useRef(false);

  // SSR-safe lazy initializer for mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 640px)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const push = (fn: () => void, ms: number) =>
      timers.current.push(setTimeout(fn, ms));

    push(() => setPhase("rotate"), 1100); // group rotates to opening position
    push(() => {
      setPhase("flap"); // flap opens
      if (!rustledRef.current) {
        rustledRef.current = true;
        try {
          playPaperRustle();
        } catch {
          /* audio unavailable */
        }
      }
    }, 2100);
    push(() => setPhase("slide"), 3050); // card slides out
    push(() => {
      setPhase("settle"); // group rotates back + envelope recedes
      try {
        playChime();
      } catch {
        /* audio unavailable */
      }
    }, 4300);
    push(() => setPhase("ready"), 5200); // button appears

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const flapOpen = ["flap", "slide", "settle", "ready"].includes(phase);
  const cardOut = ["slide", "settle", "ready"].includes(phase);
  const recede = phase === "settle" || phase === "ready";
  const showButton = phase === "ready";

  // Group rotation: -12° during rotate/flap (opening tilt), back to 0° on settle.
  // Applied to the whole reveal group so all layers stay aligned.
  const groupRotate =
    phase === "appear" ? 0 : phase === "rotate" || phase === "flap" ? -12 : 0;

  // Card slide distance to the right (in % of stage width).
  // Less on mobile so card stays fully visible.
  const slideX = isMobile ? (recede ? 8 : 13) : recede ? 18 : 28;

  const handleStageClick = () => {
    if (phase === "ready") {
      onOpen();
    } else if (phase !== "appear") {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setPhase("ready");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleStageClick();
    }
  };

  return (
    <div
      className="cinema-navy cinema-grain relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-8 outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      onClick={handleStageClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={t.tapToOpen}
    >
      {/* ambient golden dust (very subtle) */}
      <GoldenPetals count={8} opacity={0.14} speed={0.4} />

      {/* faint lotus watermark top-center */}
      <LotusMark
        className="anim-shimmer pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 opacity-20"
        width={84}
        color="#C8A45D"
      />

      <div className="env-stage relative z-10 flex w-full flex-col items-center">
        {/*
          Reveal group — ALL transform (rotate + scale) applied here so every
          layer (envelope, card, flap, shadow) rotates as one unit. No layer
          is ever offset from the others.
          START: scale 0.96, opacity 0 → scale 1, opacity 1 (landscape).
          During rotate/flap: rotate -12° (opening tilt).
          FINAL: rotate 0°, scale 0.8 (recede).
        */}
        <div
          style={{
            width: "min(860px, 88vw)",
            aspectRatio: "2000 / 1410",
            opacity: phase === "appear" ? 0 : 1,
            transform: `rotate(${groupRotate}deg) scale(${phase === "appear" ? 0.96 : recede ? 0.8 : 1})`,
            transition: `opacity 700ms ${EASE}, transform 900ms ${EASE}`,
            position: "relative",
          }}
        >
          {/*
            Card — always UPRIGHT (never rotates; only the group rotates, and
            the card counter-rotates to stay readable... actually since the
            group rotation is small (-12°) and brief, the card stays upright
            relative to the group during slide, then the group returns to 0°.
            Card is proportional to envelope: ~75% of envelope width so the
            envelope is only ~1.18x the card (not 2-3x).
            Hidden (z1, opacity 0) behind the opaque envelope until slide.
          */}
          <div
            style={{
              position: "absolute",
              // Card centered vertically; positioned to slide out from inside.
              left: "12.5%",
              top: "50%",
              width: "75%",
              transform: `translate(0, -50%) translateX(${cardOut ? `${slideX}%` : "0"}) scale(${recede ? 1.06 : 1})`,
              zIndex: cardOut ? 5 : 1,
              opacity: cardOut ? 1 : 0,
              transition: `transform 1100ms ${EASE}, opacity 800ms ease`,
              pointerEvents: "none",
            }}
          >
            <div
              className="relative"
              style={{
                width: "100%",
                maxHeight: "80vh",
                boxShadow: cardOut
                  ? "0 30px 60px -18px rgba(0,0,0,0.75), 0 0 36px rgba(200,164,93,0.22)"
                  : "none",
              }}
            >
              <div className="pointer-events-none absolute inset-0 border border-gold/60" />
              <img
                src={cardFor(lang)}
                alt="Invitation card"
                className="block w-full select-none object-contain"
                style={{ maxHeight: "80vh" }}
                draggable={false}
              />
            </div>
          </div>

          {/* Envelope landscape image — opaque, hides the card while inside.
              Recedes (fade + blur) in settle phase. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              opacity: recede ? 0.18 : 1,
              filter: recede ? "blur(1.5px) brightness(0.7)" : "none",
              transform: recede ? "translateX(-3%)" : "none",
              transition: `opacity 900ms ease, filter 900ms ease, transform 900ms ${EASE}`,
            }}
          >
            <img
              src="/invitation/envelope-landscape.png"
              alt="Official invitation envelope"
              className="block h-full w-full select-none object-contain"
              draggable={false}
            />
          </div>

          {/*
            Right triangular flap — paper-fold shape (trapezoid-ish triangle).
            clip-path triangle, royal blue + gold edge. Hinged at right center.
            Opens AFTER the group rotate settles (flap phase). z4 always;
            card z5 slides in front.
          */}
          <div
            style={{
              position: "absolute",
              right: "3%",
              top: "5%",
              bottom: "5%",
              width: "28%",
              zIndex: 4,
              transformOrigin: "right center",
              transform: `perspective(1600px) rotateY(${flapOpen ? -125 : 0}deg)`,
              transition: `transform 850ms ${EASE}, opacity 700ms ease`,
              opacity: flapOpen ? 0.82 : 1,
              clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
              background:
                "linear-gradient(135deg, #123083 0%, #1a3f8f 40%, #0e2570 100%)",
              filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Gold fold edges (hypotenuse lines) */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="0" y1="50" x2="100" y2="0" stroke="#C8A45D" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.85" />
              <line x1="0" y1="50" x2="100" y2="100" stroke="#C8A45D" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.85" />
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <LotusMark width={28} color="#C8A45D" className="opacity-60" />
            </div>
          </div>
        </div>

        {/* Open Invitation button — appears only when ready */}
        <div
          className={`relative z-20 mt-8 flex flex-col items-center transition-all duration-400 ${
            showButton ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <ClassicDivider className="mb-4 w-56" color="#C8A45D" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="btn-pill solid-navy px-7 text-sm uppercase tracking-[0.2em]"
          >
            {t.openInvitation}
          </button>
          <p className="mt-3 font-cormorant text-xs tracking-[0.2em] text-ivory/50">
            {t.tapToOpen}
          </p>
        </div>
      </div>

      {/* corner ornaments in gold */}
      <div className="pointer-events-none absolute left-3 top-3 hidden sm:block">
        <LotusMark width={40} color="#C8A45D" />
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 hidden sm:block">
        <LotusMark width={40} color="#C8A45D" />
      </div>
    </div>
  );
}
