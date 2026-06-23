"use client";

import { useEffect, useRef, useState } from "react";
import { DICT, cardFor, type Lang } from "@/lib/i18n";
import { LotusMark, ClassicDivider } from "./Ornaments";
import { GoldenPetals } from "./GoldenPetals";
import { playPaperRustle, playChime } from "@/lib/sfx";

/*
  Envelope reveal — landscape asset, coordinated group animation.
  All layers share ONE coordinate system (the reveal group box).
  Flap aligns precisely to the right edge of the envelope base.
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

    push(() => setPhase("rotate"), 1100);
    push(() => {
      setPhase("flap");
      if (!rustledRef.current) {
        rustledRef.current = true;
        try { playPaperRustle(); } catch { /* */ }
      }
    }, 2100);
    push(() => setPhase("slide"), 3050);
    push(() => {
      setPhase("settle");
      try { playChime(); } catch { /* */ }
    }, 4300);
    push(() => setPhase("ready"), 5200);

    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, []);

  const flapOpen = ["flap", "slide", "settle", "ready"].includes(phase);
  const cardOut = ["slide", "settle", "ready"].includes(phase);
  const recede = phase === "settle" || phase === "ready";
  const showButton = phase === "ready";

  // Group rotation: slight tilt during rotate/flap, back to 0° on settle.
  const groupRotate =
    phase === "appear" ? 0 : phase === "rotate" || phase === "flap" ? -10 : 0;

  // Card slide distance (% of stage width, to the right).
  const slideX = isMobile ? (recede ? 7 : 12) : recede ? 16 : 26;

  const handleStageClick = () => {
    if (phase === "ready") { onOpen(); }
    else if (phase !== "appear") {
      timers.current.forEach(clearTimeout); timers.current = [];
      setPhase("ready");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleStageClick(); }
  };

  // Gold seal size responsive
  const sealSize = isMobile ? 42 : 62;

  return (
    <div
      className="cinema-navy cinema-grain relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-8 outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      onClick={handleStageClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={t.tapToOpen}
    >
      <GoldenPetals count={8} opacity={0.14} speed={0.4} />
      <LotusMark
        className="anim-shimmer pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 opacity-20"
        width={84}
        color="#C8A45D"
      />

      <div className="env-stage relative z-10 flex w-full flex-col items-center">
        {/* === REVEAL GROUP — all layers share this coordinate system === */}
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
          {/* --- Envelope shadow (behind everything) --- */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              borderRadius: "6px",
              boxShadow: "0 30px 60px -12px rgba(0,0,0,0.6), 0 0 50px rgba(200,164,93,0.08)",
            }}
            aria-hidden="true"
          />

          {/* --- Invitation card (hidden inside, slides right) ---
              Card width = ~82% of envelope → envelope is ~1.22x card.
              Positioned left:9% so it's centered inside the envelope. */}
          <div
            style={{
              position: "absolute",
              left: "9%",
              top: "50%",
              width: "82%",
              transform: `translate(0, -50%) translateX(${cardOut ? `${slideX}%` : "0"}) scale(${recede ? 1.05 : 1})`,
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

          {/* --- Envelope base image (opaque, hides card) --- */}
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

          {/* --- Right flap (triangular fold, aligned to right edge) ---
              Position: right:0, top:0, height:100% — perfectly aligned
              with the envelope base. Width ~36% of envelope.
              Shape: trapezoid fold via clip-path.
              Hinged at right center; opens via rotateY. */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "36%",
              zIndex: 4,
              transformOrigin: "right center",
              transform: `perspective(1400px) rotateY(${flapOpen ? -120 : 0}deg)`,
              transition: `transform 900ms ${EASE}, opacity 700ms ease`,
              opacity: flapOpen ? 0.88 : 1,
              // Trapezoid fold shape — like a real envelope flap
              clipPath: "polygon(0 0, 100% 8%, 100% 92%, 0 100%)",
              background:
                "linear-gradient(135deg, #123083 0%, #031F44 70%, #02152F 100%)",
              boxShadow: "0 20px 45px rgba(0,0,0,0.22)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Gold border via SVG (works with clip-path) */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Fold edge lines (the two diagonal lines forming the flap fold) */}
              <line x1="0" y1="0" x2="100" y2="8" stroke="#C8A45D" strokeWidth="0.8" vectorEffect="non-scaling-stroke" opacity="0.55" />
              <line x1="0" y1="100" x2="100" y2="92" stroke="#C8A45D" strokeWidth="0.8" vectorEffect="non-scaling-stroke" opacity="0.55" />
              {/* Inner fold guideline (subtle, from left edge midpoint to right) */}
              <line x1="0" y1="50" x2="100" y2="50" stroke="#C8A45D" strokeWidth="0.4" vectorEffect="non-scaling-stroke" opacity="0.18" strokeDasharray="2 3" />
            </svg>

            {/* Inner shadow for depth */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 100% 8%, 100% 92%, 0 100%)",
                boxShadow: "inset 0 0 30px rgba(255,255,255,0.04)",
              }}
            />

            {/* === GOLD SEAL — premium circular ornament on the flap === */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${sealSize}px`,
                height: `${sealSize}px`,
              }}
            >
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid rgba(200,164,93,0.75)",
                  background:
                    "radial-gradient(circle, rgba(200,164,93,0.18) 0%, rgba(200,164,93,0.04) 70%, transparent 100%)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              />
              {/* Inner ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: "5px",
                  border: "0.5px solid rgba(200,164,93,0.5)",
                }}
              />
              {/* Lotus monogram centered in the seal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <LotusMark
                  width={Math.round(sealSize * 0.42)}
                  color="rgba(247,243,234,0.75)"
                />
              </div>
            </div>

            {/* Subtle paper grain on the flap */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                clipPath: "polygon(0 0, 100% 8%, 100% 92%, 0 100%)",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
              }}
            />
          </div>
        </div>

        {/* Open Invitation button */}
        <div
          className={`relative z-20 mt-8 flex flex-col items-center transition-all duration-400 ${
            showButton ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <ClassicDivider className="mb-4 w-56" color="#C8A45D" />
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(); }}
            className="btn-pill solid-navy px-7 text-sm uppercase tracking-[0.2em]"
          >
            {t.openInvitation}
          </button>
          <p className="mt-3 font-cormorant text-xs tracking-[0.2em] text-ivory/50">
            {t.tapToOpen}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 hidden sm:block">
        <LotusMark width={40} color="#C8A45D" />
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 hidden sm:block">
        <LotusMark width={40} color="#C8A45D" />
      </div>
    </div>
  );
}
