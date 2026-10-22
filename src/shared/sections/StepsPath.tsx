"use client";

import { useRef, type ReactNode } from "react";
import { clamp01, useScrollFrame } from "@/lib/scroll";

/**
 * A row of numbered steps joined by a track that fills as you scroll — and
 * empties if you scroll back. The fill and each step's "passed" state are
 * written straight to the DOM from the shared scroll loop.
 */
export function StepsPath({ steps }: { steps: { title: string; body: string; icon: ReactNode }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const paint = (el: HTMLDivElement, progress: number) => {
    const fill = el.querySelector<HTMLDivElement>("[data-fill]");
    if (fill) fill.style.width = `${progress * 100}%`;
    el.querySelectorAll<HTMLLIElement>("[data-step]").forEach((li, i) => {
      li.dataset.on = String(progress * 100 >= ((i + 0.5) / steps.length) * 100);
    });
  };

  useScrollFrame(
    ref,
    (el) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts when the row reaches 80% of the screen, complete at 40%.
      paint(el, clamp01((vh * 0.8 - rect.top) / (vh * 0.4)));
    },
    (el) => paint(el, 1),
  );

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute inset-x-[12%] top-[38px] hidden h-1 lg:block">
        <div className="absolute inset-0 rounded-full bg-[var(--border-strong)] opacity-60" />
        <div data-fill className="absolute inset-y-0 start-0 rounded-full bg-brand-grad shadow-[0_0_16px_rgba(56,182,255,.7)]" style={{ width: 0 }} />
      </div>
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((step, i) => (
          <li key={step.title} data-step data-on="false" className="group/step relative min-w-0">
            <div className="flex flex-col items-center text-center">
              <span className="relative z-10 grid size-[76px] place-items-center rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--fg-subtle)] shadow-[var(--shadow-card)] transition-all duration-500 ease-[var(--ease-out-expo)] group-data-[on=true]/step:scale-105 group-data-[on=true]/step:border-brand-200 group-data-[on=true]/step:text-brand-600">
                {step.icon}
                <span
                  dir="ltr"
                  className="num absolute -bottom-2 -start-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[11px] font-bold text-[var(--fg-subtle)] transition-colors duration-500 group-data-[on=true]/step:border-transparent group-data-[on=true]/step:bg-brand-600 group-data-[on=true]/step:text-white"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <h3 className="mt-6 text-[19px] font-bold text-[var(--fg-subtle)] transition-colors duration-500 group-data-[on=true]/step:text-[var(--fg)]">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[260px] text-[14.5px] leading-[1.8] text-[var(--fg-muted)] opacity-50 transition-opacity duration-500 group-data-[on=true]/step:opacity-100">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
