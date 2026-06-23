"use client";

import { useEffect, useRef } from "react";

/**
 * GoldenPetals — ambient floating petal/particle animation.
 * Renders a lightweight canvas overlay with slowly drifting golden
 * petal shapes. Inspired by premium event invitation aesthetics.
 *
 * Props:
 *  - count: number of particles (default 18)
 *  - color: CSS color string (default gold)
 *  - opacity: base opacity (default 0.35)
 *  - speed: animation speed multiplier (default 1)
 *  - style: optional CSS for the canvas container
 */

interface Petal {
  x: number;
  y: number;
  size: number;
  rot: number;
  rotSpeed: number;
  vx: number;
  vy: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
  shape: "petal" | "dot" | "spark";
}

export function GoldenPetals({
  count = 18,
  color = "#C8A45D",
  opacity = 0.35,
  speed = 1,
  className,
  style,
}: {
  count?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      W = rect?.width ?? window.innerWidth;
      H = rect?.height ?? window.innerHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Parse hex color to rgb for rgba usage
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const shapes: Petal["shape"][] = ["petal", "dot", "spark"];

    const petals: Petal[] = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H - H * 0.1,
      size: 3 + Math.random() * 7,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      vx: (Math.random() - 0.5) * 0.3,
      vy: 0.15 + Math.random() * 0.35,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.005 + Math.random() * 0.01,
      opacity: 0.15 + Math.random() * opacity,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of petals) {
        // update
        p.wobble += p.wobbleSpeed * speed;
        p.rot += p.rotSpeed * speed;
        p.x += (p.vx + Math.sin(p.wobble) * 0.4) * speed;
        p.y += p.vy * speed;

        // wrap
        if (p.y > H + 20) {
          p.y = -20;
          p.x = Math.random() * W;
        }
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;

        // draw
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;

        if (p.shape === "petal") {
          // elongated petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.45, p.size * 1.4, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
          ctx.fill();
        } else if (p.shape === "dot") {
          // small circle
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},0.8)`;
          ctx.fill();
        } else {
          // spark / diamond
          const s = p.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.4, 0);
          ctx.moveTo(0, s);
          ctx.lineTo(-s * 0.4, 0);
          ctx.moveTo(0, -s);
          ctx.lineTo(-s * 0.4, 0);
          ctx.moveTo(0, s);
          ctx.lineTo(s * 0.4, 0);
          ctx.strokeStyle = `rgba(${r},${g},${b},0.9)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          // tiny center dot
          ctx.beginPath();
          ctx.arc(0, 0, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},1)`;
          ctx.fill();
        }

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, color, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 5,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
