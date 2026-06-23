"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook using IntersectionObserver.
 * Returns a ref to attach and a boolean indicating whether the element
 * has entered the viewport. Once revealed, stays revealed.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; once?: boolean },
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const once = options?.once ?? true;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.12,
        rootMargin: options?.rootMargin ?? "0px 0px -6% 0px",
      },
    );
    obs.observe(el);
    // Safety fallback: ensure content is never stuck hidden (e.g. when the
    // element is rendered off-screen in a tall/full-page capture context where
    // IntersectionObserver may not fire). Reveal after a short delay.
    const fallback = setTimeout(() => setVisible(true), 1400);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, [options?.threshold, options?.rootMargin, options?.once]);

  return { ref, visible };
}

/**
 * Reveal wrapper component. Wraps children with a fade+rise animation
 * triggered when scrolled into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: As = "div",
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
  threshold?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold });
  return (
    <As
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </As>
  );
}
