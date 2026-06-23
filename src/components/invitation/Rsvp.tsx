"use client";

import { useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassicDivider, LotusMark, FrameCorners } from "./Ornaments";
import { Reveal } from "./Reveal";
import { MessageCircle, Check, Sparkles } from "lucide-react";

const WA_NUMBER = "6285710558888";

export function Rsvp({ lang, onConfirm }: { lang: Lang; onConfirm?: () => void }) {
  const t = DICT[lang];
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"attend" | "no">("attend");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(
        lang === "id"
          ? "Mohon isi nama Anda."
          : lang === "zh"
            ? "请填写姓名。"
            : "Please enter your name.",
      );
      return;
    }
    setError("");
    const attendanceText = attendance === "attend" ? t.attend : t.cannotAttend;
    const text = t.waMessage(name.trim(), attendanceText, guests, message.trim() || "—");
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpened(true);
    setTimeout(() => setOpened(false), 4000);
    // Trigger celebratory confetti burst
    onConfirm?.();
  };

  return (
    <section id="rsvp" className="relative px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <LotusMark width={44} className="mx-auto mb-2" color="#C8A45D" />
          <h2 className="font-serif-inv text-3xl font-semibold text-navy sm:text-4xl">
            {t.rsvpTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-md font-cormorant text-base italic text-navy/65">
            {t.rsvpIntro}
          </p>
          <ClassicDivider className="mx-auto mt-5 max-w-[240px]" color="#031F44" />
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={submit}
            className="frame-classic relative mt-9 bg-white/70 px-6 py-8 sm:px-10 sm:py-10"
          >
            <FrameCorners color="navy" inset={6} size={28} />

            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="rsvp-name"
                className="font-cormorant text-xs uppercase tracking-[0.25em] text-navy/70"
              >
                {t.fieldName}
              </Label>
              <Input
                id="rsvp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="border-navy/30 bg-ivory/40 font-body-inv text-navy placeholder:text-navy/35 transition-all focus:border-orange focus:bg-white focus:ring-2 focus:ring-gold/30 focus:shadow-[0_0_0_4px_rgba(200,164,93,0.15),0_8px_20px_-8px_rgba(240,120,0,0.3)]"
              />
            </div>

            {/* Attendance */}
            <div className="mt-5 space-y-2">
              <Label className="font-cormorant text-xs uppercase tracking-[0.25em] text-navy/70">
                {t.attendance}
              </Label>
              <RadioGroup
                value={attendance}
                onValueChange={(v) => setAttendance(v as "attend" | "no")}
                className="flex flex-col gap-2 sm:flex-row sm:gap-6"
              >
                <label
                  htmlFor="att-yes"
                  className={`flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 transition-all ${
                    attendance === "attend"
                      ? "border-orange bg-orange/5"
                      : "border-navy/25 bg-ivory/40 hover:border-orange"
                  }`}
                >
                  <RadioGroupItem
                    id="att-yes"
                    value="attend"
                    className="border-navy/50 text-orange"
                  />
                  <span className="flex items-center gap-1.5 font-body-inv text-sm text-navy">
                    <Check className="h-3.5 w-3.5 text-orange" /> {t.attend}
                  </span>
                </label>
                <label
                  htmlFor="att-no"
                  className={`flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 transition-all ${
                    attendance === "no"
                      ? "border-orange bg-orange/5"
                      : "border-navy/25 bg-ivory/40 hover:border-orange"
                  }`}
                >
                  <RadioGroupItem
                    id="att-no"
                    value="no"
                    className="border-navy/50 text-orange"
                  />
                  <span className="font-body-inv text-sm text-navy">{t.cannotAttend}</span>
                </label>
              </RadioGroup>
            </div>

            {/* Guests */}
            <div className="mt-5 space-y-2">
              <Label
                htmlFor="rsvp-guests"
                className="font-cormorant text-xs uppercase tracking-[0.25em] text-navy/70"
              >
                {t.numGuests}
              </Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger
                  id="rsvp-guests"
                  className="border-navy/30 bg-ivory/40 font-body-inv text-navy transition-all focus:border-orange focus:bg-white focus:ring-2 focus:ring-gold/30 focus:shadow-[0_0_0_4px_rgba(200,164,93,0.15),0_8px_20px_-8px_rgba(240,120,0,0.3)]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4", "5", "6+"].map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="mt-5 space-y-2">
              <Label
                htmlFor="rsvp-msg"
                className="font-cormorant text-xs uppercase tracking-[0.25em] text-navy/70"
              >
                {t.message}
              </Label>
              <Textarea
                id="rsvp-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                rows={3}
                className="resize-none border-navy/30 bg-ivory/40 font-body-inv text-navy placeholder:text-navy/35 transition-all focus:border-orange focus:bg-white focus:ring-2 focus:ring-gold/30 focus:shadow-[0_0_0_4px_rgba(200,164,93,0.15),0_8px_20px_-8px_rgba(240,120,0,0.3)]"
              />
            </div>

            {error ? <p className="mt-4 text-sm text-orange">{error}</p> : null}

            <div className="mt-7 flex flex-col items-center">
              <button
                type="submit"
                className="btn-pill solid-navy w-full px-7 py-3 text-sm uppercase tracking-[0.2em] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                {t.confirmBtn}
              </button>
              <p className="mt-3 font-cormorant text-xs tracking-[0.2em] text-navy/45">
                {t.rsvpPhone}
              </p>
            </div>

            {/* opened confirmation toast */}
            {opened ? (
              <div className="anim-fade-in pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full">
                <div className="flex items-center gap-2 rounded-full border border-gold/60 bg-navy px-4 py-2 text-ivory shadow-xl">
                  <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  <span className="text-xs tracking-wide">
                    {lang === "id"
                      ? "Membuka WhatsApp…"
                      : lang === "zh"
                        ? "正在打开 WhatsApp…"
                        : "Opening WhatsApp…"}
                  </span>
                </div>
              </div>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
