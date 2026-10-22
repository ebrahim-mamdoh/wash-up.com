"use client";

import { useEffect, type RefObject } from "react";

/*
  One shared scroll loop for every scroll-driven effect on the page.

  Each effect registers a job; scroll/resize/visibility schedule a single
  requestAnimationFrame that runs all jobs, and jobs write styles straight to
  the DOM (no React state), so scrolling never re-renders a component.
*/

type Job = () => void;

const jobs = new Set<Job>();
let raf = 0;

const run = () => {
  raf = 0;
  jobs.forEach((job) => job());
};

const schedule = () => {
  if (!raf) raf = requestAnimationFrame(run);
};

function listen(on: boolean) {
  const method = on ? "addEventListener" : "removeEventListener";
  window[method]("scroll", schedule, { passive: true });
  window[method]("resize", schedule);
  // rAF pauses in hidden tabs; resync the scene when the visitor comes back.
  document[method]("visibilitychange", schedule);
}

export function onScrollFrame(job: Job): () => void {
  jobs.add(job);
  if (jobs.size === 1) listen(true);
  schedule();
  return () => {
    jobs.delete(job);
    if (jobs.size === 0) {
      listen(false);
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

export const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
export const clamp = (lo: number, hi: number, n: number) => (n < lo ? lo : n > hi ? hi : n);
/** Maps overall progress `p` to progress inside the `[from, to]` window. */
export const stage = (p: number, from: number, to: number) => clamp01((p - from) / (to - from));
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Progress of a tall section whose child is `position: sticky`: 0 when its top
 * reaches the top of the viewport, 1 when its bottom reaches the bottom.
 */
export function pinnedProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const scrollable = el.offsetHeight - window.innerHeight;
  return scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
}

/** 0 when the element's top enters at the bottom of the viewport, 1 when its bottom leaves at the top. */
export function viewProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  return clamp01((vh - rect.top) / (vh + rect.height));
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Runs `frame(el)` on every scroll frame while the element is within half a
 * screen of the viewport — an IntersectionObserver switches the job on and
 * off, so far-away effects cost nothing (and never force layout of sections
 * skipped by `content-visibility`). With reduced motion it runs `settle(el)`
 * once instead (the scene's final, still state).
 */
export function useScrollFrame<T extends HTMLElement>(
  ref: RefObject<T | null>,
  frame: (el: T) => void,
  settle?: (el: T) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      settle?.(el);
      return;
    }
    let off: (() => void) | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !off) off = onScrollFrame(() => frame(el));
        else if (!entry.isIntersecting && off) {
          off();
          off = null;
        }
      },
      { rootMargin: "50% 0px 50% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      off?.();
    };
    // `frame`/`settle` are module-level or stable per component by convention.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
