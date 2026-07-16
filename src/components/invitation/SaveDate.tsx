"use client";

import { useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { Bell, BellRing, Check, X } from "lucide-react";

const STORAGE_KEY = "bali-anniversary-reminder-v1";

/**
 * SaveDate — "Save the date" reminder button.
 * Requests browser notification permission, then schedules a notification
 * for one day before the event (July 27, 2026 10:00 AM). Stores the
 * scheduled state in localStorage so the toggle reflects status.
 */
export function SaveDate({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  // SSR-safe lazy initializer reads localStorage on the client only
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [toast, setToast] = useState<"granted" | "denied" | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  const schedule = () => {
    // Event: July 28, 2026 4:00 PM +08:00. Reminder: July 27, 4:00 PM.
    const remindAt = new Date("2026-07-27T16:00:00+08:00").getTime();
    const now = Date.now();
    const delay = Math.max(1000, remindAt - now);
    // setTimeout works while the page is open; this is a best-effort reminder.
    const id = setTimeout(() => {
      try {
        new Notification(t.saveDate, {
          body: t.heroTitleLine1 + " — " + t.heroTitleLine2 + " · " + t.dateValue,
          icon: "/invitation/logo-white.png",
        });
      } catch {
        /* ignore */
      }
    }, Math.min(delay, 2147483647));
    return id;
  };

  const enable = async () => {
    if (typeof Notification === "undefined") {
      setToast("denied");
      setTimeout(() => setToast(null), 3500);
      return;
    }
    if (Notification.permission === "granted") {
      schedule();
      setEnabled(true);
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setToast("granted");
      setTimeout(() => setToast(null), 3500);
      return;
    }
    if (Notification.permission === "denied") {
      setToast("denied");
      setTimeout(() => setToast(null), 3500);
      return;
    }
    setShowPrompt(true);
  };

  const confirmEnable = async () => {
    setShowPrompt(false);
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      schedule();
      setEnabled(true);
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setToast("granted");
    } else {
      setToast("denied");
    }
    setTimeout(() => setToast(null), 3500);
  };

  const cancelEnable = () => setShowPrompt(false);

  return (
    <>
      <button
        onClick={enable}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-body-inv text-xs uppercase tracking-[0.18em] transition-all duration-500 ${
          enabled
            ? "border-orange/60 bg-orange/10 text-orange"
            : "border-navy/40 bg-ivory/50 text-navy hover:border-orange hover:text-orange"
        }`}
        aria-pressed={enabled}
      >
        {enabled ? (
          <>
            <BellRing className="h-3.5 w-3.5" strokeWidth={1.5} />
            {t.saveDateOn}
          </>
        ) : (
          <>
            <Bell className="h-3.5 w-3.5" strokeWidth={1.5} />
            {t.saveDateOff}
          </>
        )}
      </button>

      {/* Confirmation prompt modal */}
      {showPrompt ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/70 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.saveDate}
          onClick={cancelEnable}
        >
          <div
            className="frame-classic relative max-w-sm bg-ivory px-6 py-7 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cancelEnable}
              className="absolute right-3 top-3 text-navy/40 transition-colors hover:text-orange"
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-orange/40 bg-orange/5 text-orange">
              <BellRing className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <p className="font-serif-inv text-lg text-navy">{t.saveDate}</p>
            <p className="mx-auto mt-2 max-w-xs font-body-inv text-sm leading-relaxed text-navy/65">
              {t.saveDatePrompt}
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={confirmEnable}
                className="btn-pill solid-navy px-5 py-2 text-xs uppercase tracking-[0.18em]"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={1.5} />
                OK
              </button>
              <button
                onClick={cancelEnable}
                className="btn-pill px-5 py-2 text-xs uppercase tracking-[0.18em]"
              >
                {t.cannotAttend === "Cannot attend" ? "Cancel" : lang === "id" ? "Batal" : "取消"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Toast */}
      {toast ? (
        <div className="anim-fade-in fixed bottom-20 left-1/2 z-[85] -translate-x-1/2">
          <div
            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm shadow-xl backdrop-blur-md ${
              toast === "granted"
                ? "border-orange/50 bg-navy/90 text-ivory"
                : "border-red-400/50 bg-navy/90 text-ivory"
            }`}
          >
            {toast === "granted" ? (
              <>
                <Check className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <span className="font-body-inv text-xs tracking-wide">{t.saveDateGranted}</span>
              </>
            ) : (
              <>
                <X className="h-4 w-4 text-orange" strokeWidth={1.5} />
                <span className="font-body-inv text-xs tracking-wide">{t.saveDateDenied}</span>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
