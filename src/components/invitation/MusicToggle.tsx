"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getMusicEngine } from "@/lib/music";

export function MusicToggle({ label }: { label: string }) {
  // Music starts on language selection (before this toggle mounts), so default to on.
  const [on, setOn] = useState(true);

  // Poll the engine state so the UI stays in sync if music is toggled
  // externally (e.g. via the "M" keyboard shortcut).
  useEffect(() => {
    const id = setInterval(() => {
      const eng = getMusicEngine();
      if (eng && eng.isPlaying !== on) setOn(eng.isPlaying);
    }, 600);
    return () => clearInterval(id);
  }, [on]);

  const toggle = () => {
    const eng = getMusicEngine();
    if (!eng) return;
    if (eng.isPlaying) {
      eng.stop();
      setOn(false);
    } else {
      eng.start();
      setOn(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={label}
      aria-pressed={on}
      className="group fixed right-4 top-4 z-[60] flex items-center gap-2 rounded-full border border-gold/60 bg-navy/80 px-3 py-2 text-ivory backdrop-blur-md transition-all hover:border-orange hover:bg-royal/80"
    >
      {on ? (
        <Volume2 className="h-4 w-4 text-gold" />
      ) : (
        <VolumeX className="h-4 w-4 text-ivory/70" />
      )}
      {/* equalizer bars */}
      <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] rounded-full bg-gold"
            style={{
              height: on ? `${[6, 12, 9, 14][i]}px` : "3px",
              transition: "height 300ms ease",
              animation: on
                ? `eq 900ms ease-in-out ${i * 120}ms infinite alternate`
                : "none",
            }}
          />
        ))}
      </span>
      <span className="hidden text-[11px] font-medium tracking-wide sm:inline">
        {label}
      </span>
      <style>{`@keyframes eq { from { transform: scaleY(0.5); } to { transform: scaleY(1); } }`}</style>
    </button>
  );
}
