"use client";

import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { clamp01, useScrollFrame } from "@/lib/scroll";
import { matchesWord } from "@/lib/typography";

/**
 * A paragraph that "lights up" word by word as it scrolls through the viewport —
 * from a faint grey to full ink. Writes opacity directly, no re-render per frame.
 */
export function ScrollTintText({ text, className = "", highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  useScrollFrame(ref, (el) => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // Starts when the paragraph reaches 85% of the screen, done at 35%.
    const progress = clamp01((vh * 0.85 - rect.top) / (vh * 0.5));
    const spans = el.children;
    const lit = progress * spans.length;
    for (let i = 0; i < spans.length; i++) {
      (spans[i] as HTMLElement).style.opacity = String(0.18 + clamp01(lit - i) * 0.82);
    }
  });

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`inline-block whitespace-pre transition-opacity duration-150 ${highlight.some((h) => matchesWord(word, h)) ? "text-brand-grad" : ""}`}
          style={{ opacity: reduced ? 1 : 0.18 }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
