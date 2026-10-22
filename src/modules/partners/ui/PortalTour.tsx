"use client";

import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";

type Tab = { key: string; label: string; title: string; points: string[] };

/**
 * Tabbed tour of the partner portal. The mock for each tab is rendered on the
 * server and passed in, so this island only owns the selected index.
 */
export function PortalTour({ tabs, mocks }: { tabs: Tab[]; mocks: Record<string, ReactNode> }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div>
      <div role="tablist" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-[22px] border border-[var(--border)] bg-[var(--bg-elevated)] p-1.5 shadow-[var(--shadow-card)] sm:rounded-full">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            role="tab"
            type="button"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-[14.5px] font-semibold transition-colors duration-300 sm:px-5 ${active === i ? "bg-brand-grad text-white" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div key={`text-${tab.key}`} style={{ animation: "wu-rise 600ms var(--ease-out-expo) both" }}>
          <h3 className="text-[clamp(24px,2.6vw,34px)] leading-[1.3] font-extrabold">{tab.title}</h3>
          <ul className="mt-6 flex flex-col gap-3.5">
            {tab.points.map((p, i) => (
              <li key={p} className="flex items-start gap-3 text-[16px] leading-relaxed text-[var(--fg-muted)]" style={{ animation: `wu-rise 600ms var(--ease-out-expo) ${120 + i * 70}ms both` }}>
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div key={`mock-${tab.key}`} style={{ animation: "wu-pop 700ms var(--ease-out-expo) both" }}>
          {mocks[tab.key]}
        </div>
      </div>
    </div>
  );
}
