"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { onScrollFrame, viewProgress } from "@/lib/scroll";

/**
 * The one client island behind the page's ambient motion:
 * - `[data-reveal]`   → sets `data-shown` once the element enters the viewport (CSS animates it);
 * - `[data-parallax]` → drifts elements near the viewport from a single scroll loop;
 * - `[data-spotlight]`→ feeds the pointer position to the card glow.
 *
 * Elements are plain server-rendered markup, so nothing per element hydrates.
 * Rescans on every route change (client navigation brings new elements).
 */
export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- Reveal ---- */
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])");
    const revealIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.shown = "";
          revealIO.unobserve(e.target);
        }
      },
      // Any pixel counts (tall blocks never stay blank); the bottom margin keeps
      // the entrance from firing right on the edge of the screen.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el) => (reduced ? (el.dataset.shown = "") : revealIO.observe(el)));

    /* ---- Parallax: only elements within ~a screen of the viewport do work ---- */
    const active = new Set<HTMLElement>();
    const parallaxIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) active.add(e.target as HTMLElement);
          else active.delete(e.target as HTMLElement);
        }
      },
      { rootMargin: "50% 0px 50% 0px" },
    );
    const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");
    let stopScroll = () => {};
    if (!reduced) {
      parallaxEls.forEach((el) => parallaxIO.observe(el));
      stopScroll = onScrollFrame(() => {
        const vh = window.innerHeight;
        active.forEach((el) => {
          const speed = Number(el.dataset.parallax);
          const centered = viewProgress(el) - 0.5;
          const shift = (-centered * speed * vh).toFixed(1);
          el.style.translate = el.dataset.parallaxAxis === "x" ? `${shift}px 0` : `0 ${shift}px`;
          const rotate = Number(el.dataset.parallaxRotate || 0);
          if (rotate) el.style.rotate = `${(centered * rotate).toFixed(2)}deg`;
        });
      });
    }

    /* ---- Late content (lazy scenes, tab panels): wire up what gets added ---- */
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const found = [node, ...node.querySelectorAll<HTMLElement>("[data-reveal],[data-parallax]")];
          for (const el of found) {
            if (el.matches("[data-reveal]:not([data-shown])")) {
              if (reduced) el.dataset.shown = "";
              else revealIO.observe(el);
            }
            if (!reduced && el.matches("[data-parallax]")) parallaxIO.observe(el);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    /* ---- Spotlight ---- */
    const onPointer = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>("[data-spotlight]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      mo.disconnect();
      revealIO.disconnect();
      parallaxIO.disconnect();
      stopScroll();
      document.removeEventListener("pointermove", onPointer);
    };
  }, [pathname]);

  return null;
}
