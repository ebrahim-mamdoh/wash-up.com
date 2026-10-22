"use client";

import { useRef, type ReactNode } from "react";
import { clamp01, easeOut, useScrollFrame } from "@/lib/scroll";

/**
 * Lays a screen back in 3D and stands it upright as it scrolls into view —
 * the "product reveal" move. Done when the element's top reaches 35% of the viewport.
 */
export function ScrollTilt({ children, className = "", from = 24 }: { children: ReactNode; className?: string; from?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFrame(
    ref,
    (el) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = easeOut(clamp01((vh - rect.top) / (vh * 0.65)));
      const inner = el.firstElementChild as HTMLElement | null;
      if (!inner) return;
      inner.style.transform = `rotateX(${((1 - t) * from).toFixed(2)}deg) scale(${(0.9 + t * 0.1).toFixed(3)}) translateY(${((1 - t) * 40).toFixed(1)}px)`;
      inner.style.opacity = String(0.4 + t * 0.6);
    },
    (el) => {
      const inner = el.firstElementChild as HTMLElement | null;
      if (inner) inner.style.transform = "none";
    },
  );
  return (
    <div ref={ref} className={className} style={{ perspective: "1400px" }}>
      <div style={{ transformOrigin: "50% 100%", willChange: "transform, opacity" }}>{children}</div>
    </div>
  );
}
