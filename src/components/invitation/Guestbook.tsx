"use client";

import { useEffect, useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClassicDivider, LotusMark, FrameCorners } from "./Ornaments";
import { Reveal } from "./Reveal";
import { Send, Heart, MessageSquareQuote } from "lucide-react";

type Wish = {
  id: string;
  name: string;
  message: string;
  ts: number;
};

const STORAGE_KEY = "bali-anniversary-wishes-v1";

// A few seed wishes so the guestbook never looks empty on first visit
const SEED_WISHES: Wish[] = [
  {
    id: "seed-1",
    name: "dr. Linda Hartono",
    message:
      "Selamat satu tahun! Semoga Bali Office terus berkembang dan membawa kehangatan bagi pasien. — Selalu di hati.",
    ts: Date.now() - 86400000 * 3,
  },
  {
    id: "seed-2",
    name: "Marlyne",
    message:
      "Thank you for being part of our first year. Your trust and care mean everything to us. We look forward to celebrating together.",
    ts: Date.now() - 86400000 * 1,
  },
  {
    id: "seed-3",
    name: "陈医生",
    message: "感恩一年的同行与信任。愿我们继续携手，为每一位患者带去希望与温暖。",
    ts: Date.now() - 3600000 * 8,
  },
];

function loadWishes(): Wish[] {
  if (typeof window === "undefined") return SEED_WISHES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_WISHES;
    const parsed = JSON.parse(raw) as Wish[];
    if (!Array.isArray(parsed)) return SEED_WISHES;
    // Merge saved user wishes on top of seeds (user wishes first, newest first)
    const userWishes = parsed.filter((w) => !w.id.startsWith("seed"));
    return [...userWishes, ...SEED_WISHES];
  } catch {
    return SEED_WISHES;
  }
}

function timeAgo(ts: number, lang: Lang): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (lang === "zh") {
    if (d > 0) return `${d}天前`;
    if (h > 0) return `${h}小时前`;
    if (m > 0) return `${m}分钟前`;
    return "刚刚";
  }
  if (lang === "id") {
    if (d > 0) return `${d} hari lalu`;
    if (h > 0) return `${h} jam lalu`;
    if (m > 0) return `${m} menit lalu`;
    return "baru saja";
  }
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return "just now";
}

export function Guestbook({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  // SSR-safe: start with seeds, hydrate from localStorage via lazy read in
  // a useState initializer guarded by typeof window.
  const [wishes, setWishes] = useState<Wish[]>(() => {
    if (typeof window === "undefined") return SEED_WISHES;
    return loadWishes();
  });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [justAdded, setJustAdded] = useState<string | null>(null);

  // Keep storage in sync when wishes change after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only persist user-added wishes (id not starting with "seed")
      const toSave = wishes.filter((w) => !w.id.startsWith("seed"));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch {
        /* ignore */
      }
    }
  }, [wishes]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError(
        lang === "id"
          ? "Mohon isi nama dan ucapan."
          : lang === "zh"
            ? "请填写姓名和祝福。"
            : "Please enter your name and wish.",
      );
      return;
    }
    setError("");
    const wish: Wish = {
      id: `w-${Date.now()}`,
      name: name.trim().slice(0, 60),
      message: message.trim().slice(0, 400),
      ts: Date.now(),
    };
    const next = [wish, ...wishes];
    setWishes(next); // effect persists user wishes to localStorage
    setName("");
    setMessage("");
    setJustAdded(wish.id);
    setTimeout(() => setJustAdded(null), 2500);
  };

  return (
    <section className="relative px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <LotusMark width={44} className="mx-auto mb-2" color="#C8A45D" />
          <h2 className="font-serif-inv text-3xl font-semibold text-navy sm:text-4xl">
            {t.guestbookTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-md font-cormorant text-base italic text-navy/65">
            {t.guestbookIntro}
          </p>
          <ClassicDivider className="mx-auto mt-5 max-w-[240px]" color="#031F44" />
        </Reveal>

        {/* Form */}
        <Reveal delay={100}>
          <form
            onSubmit={submit}
            className="frame-classic relative mt-8 bg-white/60 px-6 py-7 sm:px-10 sm:py-8"
          >
            <FrameCorners color="navy" inset={6} size={26} />
            <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
              <div className="space-y-2">
                <Label
                  htmlFor="wish-name"
                  className="font-cormorant text-xs uppercase tracking-[0.25em] text-navy/70"
                >
                  {t.wishName}
                </Label>
                <Input
                  id="wish-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.wishNamePlaceholder}
                  maxLength={60}
                  className="border-navy/30 bg-ivory/40 font-body-inv text-navy placeholder:text-navy/35 transition-all focus:border-orange focus:bg-white focus:ring-2 focus:ring-gold/30"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="wish-msg"
                  className="font-cormorant text-xs uppercase tracking-[0.25em] text-navy/70"
                >
                  {t.wishMessage}
                </Label>
                <Textarea
                  id="wish-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.wishMessagePlaceholder}
                  rows={2}
                  maxLength={400}
                  className="resize-none border-navy/30 bg-ivory/40 font-body-inv text-navy placeholder:text-navy/35 transition-all focus:border-orange focus:bg-white focus:ring-2 focus:ring-gold/30"
                />
              </div>
            </div>
            {error ? <p className="mt-3 text-sm text-orange">{error}</p> : null}
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="font-cormorant text-xs tracking-[0.2em] text-navy/45">
                {t.guestbookCount(wishes.length)}
              </span>
              <button
                type="submit"
                className="btn-pill solid-navy px-6 py-2.5 text-xs uppercase tracking-[0.2em]"
              >
                <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
                {t.wishSubmit}
              </button>
            </div>
          </form>
        </Reveal>

        {/* Wishes list */}
        <div className="mt-8 max-h-[460px] space-y-4 overflow-y-auto pr-1 fancy-scroll">
          {wishes.length === 0 ? (
            <p className="py-8 text-center font-cormorant text-sm italic text-navy/50">
              {t.wishEmpty}
            </p>
          ) : (
            wishes.map((w, i) => {
              const isNew = justAdded === w.id;
              return (
                <Reveal key={w.id} delay={Math.min(i, 6) * 60}>
                  <article
                    className={`relative bg-white/70 px-5 py-4 transition-all duration-500 ${
                      isNew ? "ring-2 ring-orange/40" : ""
                    }`}
                    style={{
                      border: "1px solid #031F44",
                      boxShadow:
                        "inset 0 0 0 3px #f7f3ea, inset 0 0 0 4px rgba(3,31,68,0.18), 0 10px 24px -18px rgba(3,31,68,0.4)",
                    }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-gold">
                        <MessageSquareQuote className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <div className="flex-1">
                        <p className="font-serif-inv text-sm font-semibold text-navy">
                          {w.name}
                        </p>
                        <p className="font-body-inv text-[10px] tracking-wide text-navy/45">
                          {timeAgo(w.ts, lang)}
                        </p>
                      </div>
                      <Heart
                        className="h-3.5 w-3.5 text-orange/50"
                        strokeWidth={1.5}
                        fill="currentColor"
                      />
                    </div>
                    <p className="font-cormorant text-base italic leading-relaxed text-navy/80">
                      “{w.message}”
                    </p>
                  </article>
                </Reveal>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
