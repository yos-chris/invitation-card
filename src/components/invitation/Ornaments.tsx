import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

/* Classic corner ornament — thin double-line filigree inspired by the
   printed invitation card border. Rotates per corner via className/style. */
export function CornerOrnament({
  className,
  style,
  color = "navy",
  size = 46,
}: {
  className?: string;
  style?: CSSProperties;
  color?: "navy" | "gold";
  size?: number;
}) {
  const stroke = color === "gold" ? "#C8A45D" : "#031F44";
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn("pointer-events-none absolute", className)}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 2 H30" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 2 V30" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M2 10 H22 M10 2 V22"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M2 18 C 10 18, 18 18, 18 10 C 18 6, 16 2, 12 2"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="6" cy="6" r="1.6" fill={stroke} />
    </svg>
  );
}

/* Four corner ornaments placed in a relative container */
export function FrameCorners({
  color = "navy",
  inset = 10,
  size = 46,
}: {
  color?: "navy" | "gold";
  inset?: number;
  size?: number;
}) {
  const base: CSSProperties = { position: "absolute", width: size, height: size };
  return (
    <>
      <CornerOrnament
        color={color}
        size={size}
        style={{ ...base, top: inset, left: inset }}
      />
      <CornerOrnament
        color={color}
        size={size}
        style={{ ...base, top: inset, right: inset, transform: "rotate(90deg)" }}
      />
      <CornerOrnament
        color={color}
        size={size}
        style={{ ...base, bottom: inset, right: inset, transform: "rotate(180deg)" }}
      />
      <CornerOrnament
        color={color}
        size={size}
        style={{ ...base, bottom: inset, left: inset, transform: "rotate(270deg)" }}
      />
    </>
  );
}

/* Elegant divider with a center diamond + side flourishes */
export function ClassicDivider({
  className,
  color = "#031F44",
  width = "100%",
}: {
  className?: string;
  color?: string;
  width?: string;
}) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      style={{ width }}
      aria-hidden="true"
    >
      <span
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to right, transparent, ${color}99, transparent)`,
        }}
      />
      <svg width="48" height="14" viewBox="0 0 48 14" fill="none">
        <path d="M2 7 H18" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        <path d="M30 7 H46" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        <path d="M24 2 L28 7 L24 12 L20 7 Z" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="24" cy="7" r="1.4" fill={color} />
      </svg>
      <span
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to left, transparent, ${color}99, transparent)`,
        }}
      />
    </div>
  );
}

/* Subtle floral line-art sprig (inspired by the envelope lotus motif) */
export function FloralSprig({
  className,
  color = "#031F44",
  width = 120,
  opacity = 0.5,
}: {
  className?: string;
  color?: string;
  width?: number;
  opacity?: number;
}) {
  return (
    <svg
      width={width}
      viewBox="0 0 120 60"
      fill="none"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <path d="M60 58 C 60 40, 60 24, 60 6" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M60 30 C 50 26, 44 18, 42 8 C 52 12, 58 20, 60 30 Z" stroke={color} strokeWidth="0.9" fill="none" />
      <path d="M60 30 C 70 26, 76 18, 78 8 C 68 12, 62 20, 60 30 Z" stroke={color} strokeWidth="0.9" fill="none" />
      <path d="M60 18 C 54 14, 50 8, 50 2 C 56 6, 59 12, 60 18 Z" stroke={color} strokeWidth="0.9" fill="none" />
      <path d="M60 18 C 66 14, 70 8, 70 2 C 64 6, 61 12, 60 18 Z" stroke={color} strokeWidth="0.9" fill="none" />
      <circle cx="60" cy="6" r="2.4" fill={color} />
    </svg>
  );
}

/* Lotus motif echo of the envelope artwork */
export function LotusMark({
  className,
  color = "#C8A45D",
  width = 64,
}: {
  className?: string;
  color?: string;
  width?: number;
}) {
  return (
    <svg
      width={width}
      viewBox="0 0 64 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 38 C 18 34, 8 26, 4 16 C 12 18, 20 22, 26 28 C 22 18, 22 8, 26 2 C 30 10, 32 20, 32 30 C 32 20, 34 10, 38 2 C 42 8, 42 18, 38 28 C 44 22, 52 18, 60 16 C 56 26, 46 34, 32 38 Z"
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="22" r="1.6" fill={color} />
    </svg>
  );
}
