"use client";

import { useCallback, useEffect, useState } from "react";
import { type Lang } from "@/lib/i18n";
import { getMusicEngine } from "@/lib/music";
import { LanguageScreen } from "@/components/invitation/LanguageScreen";
import { EnvelopeScreen } from "@/components/invitation/EnvelopeScreen";
import { MainInvitation } from "@/components/invitation/MainInvitation";
import { MusicToggle } from "@/components/invitation/MusicToggle";
import { LoadingSplash } from "@/components/invitation/LoadingSplash";
import { PageCurtain } from "@/components/invitation/PageCurtain";
import { DICT } from "@/lib/i18n";

type Stage = "language" | "envelope" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("language");
  const [lang, setLang] = useState<Lang>("en");
  const [curtainFire, setCurtainFire] = useState(0);

  const handleSelectLanguage = useCallback((l: Lang) => {
    setLang(l);
    // Start music after language selection (user gesture)
    const eng = getMusicEngine();
    if (eng && !eng.isPlaying) {
      eng.start().catch(() => {});
    }
    setStage("envelope");
  }, []);

  const handleOpenInvitation = useCallback(() => {
    // Mount the curtain (keyed), then swap to main stage mid-animation
    setCurtainFire((n) => n + 1);
    setTimeout(() => {
      setStage("main");
      requestAnimationFrame(() => window.scrollTo({ top: 0 }));
    }, 250);
  }, []);

  const handleReplay = useCallback(() => {
    setStage("envelope");
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  }, []);

  const handleLangChange = useCallback((l: Lang) => {
    setLang(l);
  }, []);

  const musicLabel = stage === "language" ? "" : DICT[lang].musicOn;

  // Global keyboard shortcut: press "m" to toggle music (after language selection)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (stage === "language") return;
      // Ignore when typing in an input/textarea/select
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return;
      }
      if (e.key === "m" || e.key === "M") {
        const eng = getMusicEngine();
        if (!eng) return;
        if (eng.isPlaying) eng.stop();
        else eng.start().catch(() => {});
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage]);

  return (
    <div className="relative min-h-[100dvh] w-full">
      {/* Loading splash (auto-dismisses on load) */}
      <LoadingSplash />

      {/* Cinematic page curtain (envelope → main transition) */}
      {curtainFire > 0 && stage === "main" ? (
        <PageCurtain key={curtainFire} />
      ) : null}

      {/* Stage transitions via fade */}
      <div
        className={stage === "language" ? "anim-fade-in" : "hidden"}
        aria-hidden={stage !== "language"}
      >
        {stage === "language" ? (
          <LanguageScreen onSelect={handleSelectLanguage} />
        ) : null}
      </div>

      <div
        className={stage === "envelope" ? "anim-fade-in" : "hidden"}
        aria-hidden={stage !== "envelope"}
      >
        {stage === "envelope" ? (
          <EnvelopeScreen lang={lang} onOpen={handleOpenInvitation} />
        ) : null}
      </div>

      <div
        className={stage === "main" ? "anim-fade-in" : "hidden"}
        aria-hidden={stage !== "main"}
      >
        {stage === "main" ? (
          <MainInvitation
            lang={lang}
            onReplay={handleReplay}
            onLangChange={handleLangChange}
          />
        ) : null}
      </div>

      {/* Music toggle (after language selection) */}
      {stage !== "language" ? <MusicToggle label={musicLabel} /> : null}
    </div>
  );
}
