"use client";

import { useEffect, useRef } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { FrameCorners, ClassicDivider, LotusMark, FloralSprig } from "./Ornaments";
import { Reveal } from "./Reveal";
import { GoldenPetals } from "./GoldenPetals";

export function Hero({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Subtle parallax: tilt the framed card slightly toward the cursor
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    // Skip on touch / small screens
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const tiltX = Math.max(-4, Math.min(4, -dy * 5));
      const tiltY = Math.max(-4, Math.min(4, dx * 5));
      card.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at ${(dx + 0.5) * 100}% ${(dy + 0.5) * 100}%, rgba(200,164,93,0.18), transparent 55%)`;
      }
    };
    const onLeave = () => {
      card.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
      if (glowRef.current) {
        glowRef.current.style.background = "transparent";
      }
    };
    window.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pt-10 sm:pt-16">
      {/* Floating golden petals for celebratory ambiance */}
      <GoldenPetals count={14} opacity={0.25} speed={0.6} className="!fixed" style={{ position: "fixed" }} />

      <div className="relative mx-auto max-w-3xl">
        {/* framed invitation card with parallax tilt */}
        <Reveal className="frame-classic relative bg-white/60 px-6 py-10 text-center shadow-[0_30px_70px_-30px_rgba(3,31,68,0.45)] sm:px-12 sm:py-14">
          <div
            ref={cardRef}
            className="relative"
            style={{
              transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* cursor-tracking gold glow */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0 transition-[background] duration-300"
              aria-hidden="true"
            />
            <FrameCorners color="navy" inset={8} size={38} />

            {/* logo */}
            <div className="mx-auto mb-6 w-full max-w-[360px]">
              <img
                src="/invitation/logo.png"
                alt="Modern Cancer Hospital Guangzhou — St. Stamford International Medical"
                className="mx-auto w-full select-none object-contain"
                draggable={false}
              />
            </div>

            <ClassicDivider className="mx-auto mb-6 max-w-[220px]" color="#031F44" />

            <p className="font-cormorant text-sm uppercase tracking-[0.3em] text-orange sm:text-base">
              {t.heroEyebrow}
            </p>

            <h1 className="mt-3 font-serif-inv text-5xl font-bold leading-[1.05] text-navy sm:text-6xl">
              {t.heroTitleLine1}
            </h1>

            {/* monogram crest between title lines */}
            <div className="my-3 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold/60" />
              <LotusMark width={28} color="#C8A45D" />
              <span className="h-px w-12 bg-gold/60" />
            </div>

            <p className="font-serif-inv text-2xl italic text-royal sm:text-3xl">
              {t.heroTitleLine2}
            </p>

            <div className="my-6 flex items-center justify-center">
              <LotusMark width={48} color="#C8A45D" />
            </div>

            <p className="mx-auto max-w-md font-cormorant text-lg italic leading-relaxed text-navy/80 sm:text-xl">
              {t.heroSubtitle}
            </p>

            <ClassicDivider className="mx-auto mt-7 max-w-[220px]" color="#031F44" />

            {/* quick event line */}
            <div className="mt-6 flex flex-col items-center gap-1 font-body-inv text-xs uppercase tracking-[0.2em] text-navy/70 sm:flex-row sm:justify-center sm:gap-4">
              <span>{t.dateValue}</span>
              <span className="hidden text-gold sm:inline">◆</span>
              <span>{t.timeValue}</span>
              <span className="hidden text-gold sm:inline">◆</span>
              <span className="text-royal">{t.venueName}</span>
            </div>
          </div>
        </Reveal>

        {/* floral accents */}
        <FloralSprig
          className="pointer-events-none absolute -left-8 -top-6 hidden -rotate-12 lg:block"
          width={120}
          opacity={0.18}
        />
        <FloralSprig
          className="pointer-events-none absolute -right-8 -top-6 hidden rotate-12 lg:block"
          width={120}
          opacity={0.18}
        />
      </div>
    </section>
  );
}
