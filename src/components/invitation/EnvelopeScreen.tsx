"use client";

import { useEffect, useRef, useState } from "react";
import { DICT, cardFor, type Lang } from "@/lib/i18n";
import { LotusMark, ClassicDivider } from "./Ornaments";
import { GoldenPetals } from "./GoldenPetals";
import { playPaperRustle, playChime } from "@/lib/sfx";

/*
  Envelope reveal — 5-step cinematic sequence:
  1. landscape  — envelope appears rotated 90° (horizontal), scale-in
  2. stand      — envelope rotates upright (0°), card still hidden
  3. flap       — side flap opens to the right (rotateY, hinged right edge)
  4. slide      — card slides out to the right, fades in, upright & readable
  5. focus      — envelope recedes; card becomes the focus
  6. ready      — "Open Invitation" button appears
*/
type Phase = "landscape" | "stand" | "flap" | "slide" | "focus" | "ready";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function EnvelopeScreen({
  lang,
  onOpen,
}: {
  lang: Lang;
  onOpen: () => void;
}) {
  const t = DICT[lang];
  const [phase, setPhase] = useState<Phase>("landscape");
  // SSR-safe lazy initializer for mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 640px)").matches
      : false,
  );
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rustledRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const push = (fn: () => void, ms: number) =>
      timers.current.push(setTimeout(fn, ms));

    push(() => setPhase("stand"), 1100); // envelope stands up
    push(() => {
      setPhase("flap"); // side flap opens
      if (!rustledRef.current) {
        rustledRef.current = true;
        try {
          playPaperRustle();
        } catch {
          /* audio unavailable */
        }
      }
    }, 2400);
    push(() => setPhase("slide"), 3300); // card slides right
    push(() => {
      setPhase("focus"); // envelope recedes
      try {
        playChime();
      } catch {
        /* audio unavailable */
      }
    }, 4600);
    push(() => setPhase("ready"), 5400); // button appears

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  // State flags derived from phase
  const standing = phase !== "landscape"; // envelope is upright
  const flapOpen = ["flap", "slide", "focus", "ready"].includes(phase);
  const cardOut = ["slide", "focus", "ready"].includes(phase);
  const recede = phase === "focus" || phase === "ready";
  const showButton = phase === "ready";

  // Slide distance: more on desktop, less on mobile (card stays visible)
  const slideX = isMobile ? (recede ? 6 : 10) : recede ? 16 : 26;

  // Envelope image rotation: 90° (landscape) → 0° (upright)
  const envRotate = standing ? 0 : 90;
  const envScale = phase === "landscape" ? 0.94 : recede ? 0.82 : 1;

  const handleStageClick = () => {
    if (phase === "ready") {
      onOpen();
    } else if (phase !== "landscape") {
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
      {/* golden sparkle dust floating (ambient, subtle) */}
      <GoldenPetals count={8} opacity={0.14} speed={0.4} />

      {/* faint lotus watermark top-center */}
      <LotusMark
        className="anim-shimmer pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 opacity-20"
        width={84}
        color="#C8A45D"
      />

      <div className="env-stage relative z-10 flex w-full flex-col items-center">
        {/* Envelope + card stage (static frame, always portrait box) */}
        <div
          className="relative anim-scale-in"
          style={{
            width: "min(360px, 62vw)",
            aspectRatio: "1410 / 2000",
          }}
        >
          {/* Hidden card — always UPRIGHT (never rotates). Sits behind the
              opaque envelope image (z1) until it slides out (z5). */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: cardOut ? 5 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              opacity: cardOut ? 1 : 0,
              transform: `translateX(${slideX}%) scale(${recede ? 1.05 : 1})`,
              transition: `transform 1300ms ${EASE}, opacity 800ms ease`,
            }}
          >
            <div
              className="relative"
              style={{
                width: "82%",
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

          {/* Envelope image — rotates from landscape (90°) to upright (0°).
              Opaque, hides the card while it's inside. Recedes in focus phase. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              transform: `rotate(${envRotate}deg) scale(${envScale})`,
              transformOrigin: "center center",
              transition: `transform 1100ms ${EASE}, opacity 900ms ease, filter 900ms ease`,
              opacity: recede ? 0.16 : 1,
              filter: recede ? "blur(1.5px) brightness(0.7)" : "none",
            }}
          >
            <img
              src="/invitation/envelope.png"
              alt="Official invitation envelope"
              className="block h-full w-full select-none object-contain"
              draggable={false}
            />
          </div>

          {/* Side flap — on the right edge, hinged at right center.
              Opens via rotateY (swings outward to the right like a door).
              Closed: z3 (covers right edge). Open: z0 (behind card). */}
          <div
            style={{
              position: "absolute",
              right: "6%",
              top: "8%",
              bottom: "8%",
              width: "30%",
              zIndex: flapOpen ? 0 : 3,
              transformOrigin: "right center",
              transform: `perspective(1400px) rotateY(${flapOpen ? -115 : 0}deg)`,
              transition: `transform 850ms ${EASE}, opacity 600ms ease`,
              opacity: flapOpen ? 0.85 : 1,
              background:
                "linear-gradient(90deg, #02152f 0%, #031f44 55%, #0a2c5e 100%)",
              boxShadow: "inset 1px 0 0 rgba(200,164,93,0.45)",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
              backfaceVisibility: "hidden",
            }}
          >
            {/* gold hinge crease on the left edge of the flap */}
            <div
              className="absolute left-0 top-0 h-full w-px"
              style={{ background: "rgba(200,164,93,0.6)" }}
            />
            {/* subtle lotus mark on the flap */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <LotusMark width={28} color="#C8A45D" className="opacity-60" />
            </div>
          </div>
        </div>

        {/* Open Invitation button — appears only when ready */}
        <div
          className={`relative z-20 mt-8 flex flex-col items-center transition-all duration-700 ${
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
