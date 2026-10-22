"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

type QA = { q: string; a: string };

/** Accordion; one answer open at a time. Height animates via grid rows (no measuring). */
export function FaqList({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li
            key={item.q}
            className={`rounded-2xl border bg-[var(--bg-elevated)] transition-[border-color,box-shadow] duration-300 ${isOpen ? "border-brand-200 shadow-[var(--shadow-card)]" : "border-[var(--border)]"}`}
          >
            <button
              type="button"
              id={`${id}-q-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${id}-a-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-start text-[16.5px] font-bold text-[var(--fg)] sm:px-6"
            >
              {item.q}
              <span className={`grid size-8 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${isOpen ? "rotate-45 bg-brand-600 text-white" : "bg-[var(--bg-subtle)] text-[var(--fg-muted)]"}`}>
                <Plus className="size-4" />
              </span>
            </button>
            <div
              id={`${id}-a-${i}`}
              role="region"
              aria-labelledby={`${id}-q-${i}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <p className="overflow-hidden px-5 text-[15.5px] leading-[1.9] text-[var(--fg-muted)] sm:px-6">
                <span className="block pb-5">{item.a}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Two audiences, one list each. */
export function FaqTabs({ tabs }: { tabs: { label: string; items: QA[] }[] }) {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <div role="tablist" className="mx-auto mb-8 flex w-fit gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] p-1 shadow-[var(--shadow-card)]">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            type="button"
            aria-selected={tab === i}
            onClick={() => setTab(i)}
            className={`rounded-full px-5 py-2 text-[15px] font-semibold transition-colors duration-300 ${tab === i ? "bg-brand-grad text-white" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <FaqList key={tab} items={tabs[tab].items} />
    </div>
  );
}
