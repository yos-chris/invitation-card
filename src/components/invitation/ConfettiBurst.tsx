"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ConfettiBurst — lightweight canvas confetti in the invitation palette
 * (gold, navy, orange, ivory). Renders a one-shot burst, then cleans up.
 * Call via the `fire` prop (boolean true → trigger a burst).
 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  size: number;
  color: string;
  shape: "rect" | "circle" | "petal";
  life: number;
  maxLife: number;
}

const COLORS = ["#C8A45D", "#F07800", "#031F44", "#123083", "#F7F3EA"];

export function ConfettiBurst({ fire }: { fire: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!fire) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    setActive(true);

    // Two burst origins: top-left and top-right for a fuller celebration
    const origins = [
      { x: W * 0.2, y: H * 0.35 },
      { x: W * 0.8, y: H * 0.35 },
    ];
    const shapes: Particle["shape"][] = ["rect", "circle", "petal"];
    const particles: Particle[] = [];
    origins.forEach((o) => {
      const count = 60;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 4 + Math.random() * 6;
        particles.push({
          x: o.x,
          y: o.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.3,
          size: 5 + Math.random() * 7,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          life: 0,
          maxLife: 90 + Math.random() * 40,
        });
      }
    });
    particlesRef.current = particles;

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = 0;
      for (const p of particlesRef.current) {
        p.life++;
        if (p.life > p.maxLife) continue;
        alive++;
        // physics
        p.vy += 0.18; // gravity
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;

        const alpha = 1 - p.life / p.maxLife;
        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.35, p.size * 0.9, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      frame++;
      if (alive > 0 && frame < 240) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        setActive(false);
      }
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [fire]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[70]"
      aria-hidden="true"
    />
  );
}
