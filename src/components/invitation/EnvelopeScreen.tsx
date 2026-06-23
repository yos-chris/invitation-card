"use client";

import { useEffect, useRef, useState } from "react";
import { DICT, cardFor, type Lang } from "@/lib/i18n";
import { LotusMark, ClassicDivider } from "./Ornaments";
import { GoldenPetals } from "./GoldenPetals";
import { playPaperRustle, playChime } from "@/lib/sfx";

/*
  Envelope reveal — landscape asset, door-style right flap, card slides right.

  Phases:
  1. appear  — envelope fades + scales in (landscape, no rotation)
  2. flap    — right triangular flap opens like a door (rotateY)
  3. slide   — card slides right out of the envelope, upright & readable
  4. focus   — envelope recedes; card becomes the focus
  5. ready   — "Open Invitation" button appears
*/
type Phase = "appear" | "flap" | "slide" | "focus" | "ready";

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

  // SSR-safe lazy initializer for mobile detection (updated on resize)
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

    push(() => {
      setPhase("flap"); // right flap opens
      if (!rustledRef.current) {
        rustledRef.current = true;
        try {
          playPaperRustle();
        } catch {
          /* audio unavailable */
        }
      }
    }, 1100);
    push(() => setPhase("slide"), 2100); // card slides right
    push(() => {
      setPhase("focus"); // envelope recedes
      try {
        playChime();
      } catch {
        /* audio unavailable */
      }
    }, 3400);
    push(() => setPhase("ready"), 4100); // button appears

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const flapOpen = ["flap", "slide", "focus", "ready"].includes(phase);
  const cardOut = ["slide", "focus", "ready"].includes(phase);
  const recede = phase === "focus" || phase === "ready";
  const showButton = phase === "ready";

  // Card slide distance (% of stage width, to the right).
  // On mobile, slide less and recenter so the card stays fully visible.
  const slideX = isMobile ? (recede ? 8 : 14) : recede ? 20 : 32;

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
        {/* Stage — landscape box matching the envelope asset (2000×1410) */}
        <div
          className="relative"
          style={{
            width: "min(860px, 88vw)",
            aspectRatio: "2000 / 1410",
            opacity: phase === "appear" ? 0 : 1,
            transform: `scale(${phase === "appear" ? 0.96 : recede ? 0.8 : 1})`,
            transition: `opacity 700ms ${EASE}, transform 900ms ${EASE}`,
          }}
        >
          {/* Hidden card — always UPRIGHT. Behind the opaque envelope (z1)
              until it slides out (z5). Positioned to emerge from inside the
              envelope, sliding right. */}
          <div
            style={{
              position: "absolute",
              left: "30%",
              top: "50%",
              width: "40%",
              transform: `translate(0, -50%) translateX(${cardOut ? `${slideX * 2.5}%` : "0"}) scale(${recede ? 1.18 : 1})`,
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
              Recedes (fade + blur + scale down) in focus phase. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              opacity: recede ? 0.18 : 1,
              filter: recede ? "blur(1.5px) brightness(0.7)" : "none",
              transform: recede ? "translateX(-4%)" : "none",
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

          {/* Right triangular flap — opens like a door from the right edge.
              Triangular via clip-path. Royal blue (contrasts with dark navy
              envelope) + bold gold edge along the hypotenuse. Hinged at
              right center. Always z4 (visible); card z5 slides in front. */}
          <div
            style={{
              position: "absolute",
              right: "3%",
              top: "5%",
              bottom: "5%",
              width: "30%",
              zIndex: 4,
              transformOrigin: "right center",
              transform: `perspective(1600px) rotateY(${flapOpen ? -125 : 0}deg)`,
              transition: `transform 900ms ${EASE}, opacity 700ms ease`,
              opacity: flapOpen ? 0.8 : 1,
              clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
              // Royal blue gradient — clearly distinct from dark navy envelope
              background:
                "linear-gradient(135deg, #123083 0%, #1a3f8f 40%, #0e2570 100%)",
              filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Bold gold edge along the hypotenuse (the fold line) */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="0" y1="50"
                x2="100" y2="0"
                stroke="#C8A45D"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                opacity="0.85"
              />
              <line
                x1="0" y1="50"
                x2="100" y2="100"
                stroke="#C8A45D"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                opacity="0.85"
              />
            </svg>
            {/* subtle lotus mark centered on the flap */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <LotusMark width={30} color="#C8A45D" className="opacity-65" />
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
