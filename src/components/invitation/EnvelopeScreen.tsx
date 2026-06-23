"use client";

import { useEffect, useRef, useState } from "react";
import { DICT, cardFor, type Lang } from "@/lib/i18n";
import { LotusMark, ClassicDivider } from "./Ornaments";
import { GoldenPetals } from "./GoldenPetals";
import { playPaperRustle, playChime } from "@/lib/sfx";

type Phase = "enter" | "flap" | "rise-half" | "rise-full" | "focus" | "ready";

export function EnvelopeScreen({
  lang,
  onOpen,
}: {
  lang: Lang;
  onOpen: () => void;
}) {
  const t = DICT[lang];
  const [phase, setPhase] = useState<Phase>("enter");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rustledRef = useRef(false);

  useEffect(() => {
    const push = (fn: () => void, ms: number) =>
      timers.current.push(setTimeout(fn, ms));

    // Sequence: envelope appears → flap opens → card rises (upright) → focus → ready
    push(() => {
      setPhase("flap");
      if (!rustledRef.current) {
        rustledRef.current = true;
        try {
          playPaperRustle();
        } catch {
          /* audio unavailable */
        }
      }
    }, 1300);
    push(() => setPhase("rise-half"), 2400);
    push(() => setPhase("rise-full"), 3800);
    push(() => {
      setPhase("focus");
      try {
        playChime();
      } catch {
        /* audio unavailable */
      }
    }, 5100);
    push(() => setPhase("ready"), 5700);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const flapOpen = ["flap", "rise-half", "rise-full", "focus", "ready"].includes(phase);
  const cardRising = ["rise-half", "rise-full", "focus", "ready"].includes(phase);
  const cardClass =
    phase === "enter"
      ? "env-card"
      : phase === "rise-half"
        ? "env-card rise-half"
        : phase === "rise-full"
          ? "env-card rise-full"
          : "env-card focus"; // focus & ready
  const baseClass = phase === "focus" || phase === "ready" ? "env-base recede" : "env-base";
  const showButton = phase === "focus" || phase === "ready";

  // advance on click (skip to ready)
  const handleStageClick = () => {
    if (phase === "ready") {
      onOpen();
    } else if (phase !== "enter") {
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
      {/* spotlight behind envelope */}
      <div className="spotlight pointer-events-none absolute left-1/2 top-[42%] h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2" />

      {/* golden sparkle dust floating around envelope */}
      <GoldenPetals count={10} opacity={0.18} speed={0.4} />

      {/* faint lotus watermark */}
      <LotusMark
        className="anim-shimmer pointer-events-none absolute left-1/2 top-[10%] -translate-x-1/2 opacity-20"
        width={90}
        color="#C8A45D"
      />

      <div className="env-stage relative z-10 flex w-full flex-col items-center">
        {/* Envelope + card stack */}
        <div
          className="relative mx-auto anim-scale-in"
          style={{
            width: "min(440px, 84vw)",
            // portrait aspect ratio 1410:2000 (envelope artwork is portrait)
            aspectRatio: "1410 / 2000",
          }}
        >
          {/* Card layer — upright, centered. Behind envelope body while hidden (z1),
              raised to front (z5) once rising so it's never covered by flap/envelope. */}
          <div
            className={cardClass}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: cardRising ? 5 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              className="relative"
              style={{
                width: "82%",
                maxHeight: "82vh",
                boxShadow:
                  "0 30px 60px -20px rgba(0,0,0,0.7), 0 0 40px rgba(200,164,93,0.25)",
              }}
            >
              {/* gold frame around the card */}
              <div className="pointer-events-none absolute inset-0 border border-gold/60" />
              <img
                src={cardFor(lang)}
                alt="Invitation card"
                className="block w-full select-none object-contain"
                style={{ maxHeight: "82vh" }}
                draggable={false}
              />
            </div>
          </div>

          {/* Envelope body (opaque — hides the card while it's inside) */}
          <div className={baseClass} style={{ position: "absolute", inset: 0, zIndex: 2 }}>
            {/* soft ground shadow */}
            <div
              className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[78%] -translate-x-1/2 rounded-[50%] blur-xl"
              style={{ background: "rgba(0,0,0,0.55)" }}
            />
            <div className="relative h-full w-full">
              <div className="pointer-events-none absolute inset-0 border border-gold/40" />
              <img
                src="/invitation/envelope.png"
                alt="Official invitation envelope"
                className="block h-full w-full select-none object-contain"
                draggable={false}
              />
            </div>
          </div>

          {/* Flap — CSS navy triangle hinged at top center.
              z3 normally; lowered to z0 once the card is rising so it can
              never cover the card. Folds up/back via rotateX(-165deg). */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "30%",
              zIndex: cardRising ? 0 : 3,
              transformStyle: "preserve-3d",
              pointerEvents: "none",
            }}
          >
            <div
              className={`env-flap ${flapOpen ? "open" : ""}`}
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "top center",
                background:
                  "linear-gradient(180deg, #0a2c5e 0%, #031f44 70%, #02152f 100%)",
                clipPath: "polygon(0 0, 100% 0, 88% 100%, 12% 100%)",
                boxShadow: "inset 0 -1px 0 rgba(200,164,93,0.5)",
              }}
            >
              {/* gold crease line */}
              <div
                className="absolute bottom-0 left-[12%] right-[12%] h-px"
                style={{ background: "rgba(200,164,93,0.7)" }}
              />
              {/* small wax-seal style mark */}
              <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2">
                <LotusMark width={34} color="#C8A45D" />
              </div>
            </div>
          </div>

          {/* lighting/shadow overlay — subtle, non-blocking */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex: 4,
              background:
                "linear-gradient(180deg, rgba(200,164,93,0.08) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 100%)",
            }}
          />

          {/* Cinematic light rays — appear when card is in focus (behind everything) */}
          {(phase === "focus" || phase === "ready") ? (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(200,164,93,0.12) 8deg, transparent 16deg, transparent 40deg, rgba(200,164,93,0.10) 48deg, transparent 56deg, transparent 90deg, rgba(200,164,93,0.12) 98deg, transparent 106deg, transparent 180deg, rgba(200,164,93,0.10) 188deg, transparent 196deg, transparent 270deg, rgba(200,164,93,0.12) 278deg, transparent 286deg)",
                animation: "env-rays 12s linear infinite",
                opacity: 0.9,
              }}
            />
          ) : null}

          {/* Warm card glow in focus phase (behind card) */}
          {(phase === "focus" || phase === "ready") ? (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[90%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(200,164,93,0.28) 0%, rgba(240,120,0,0.10) 35%, transparent 70%)",
                filter: "blur(6px)",
                animation: "env-glow 3s ease-in-out infinite",
              }}
            />
          ) : null}
        </div>

        {/* Open Invitation button */}
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
        <LotusMark width={42} color="#C8A45D" />
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 hidden sm:block">
        <LotusMark width={42} color="#C8A45D" />
      </div>
    </div>
  );
}
