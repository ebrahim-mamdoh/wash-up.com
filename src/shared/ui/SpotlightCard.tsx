import type { ReactNode } from "react";

/**
 * Card with a soft brand glow that follows the pointer. Server-rendered; the
 * pointer position is written to `--mx/--my` by one delegated listener in
 * <Effects />, and the glow is a single radial-gradient layer.
 */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-spotlight
      className={`group/spot relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-float)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), color-mix(in srgb, var(--color-brand-500) 14%, transparent), transparent 70%)" }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/** Gradient icon tile used at the top of feature cards. */
export function IconTile({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "navy" | "aqua" | "amber" | "green" }) {
  const tones = {
    brand: "linear-gradient(135deg,#59b1ff,#1b74f5)",
    navy: "linear-gradient(135deg,#1d4fb3,#0b2152)",
    aqua: "linear-gradient(135deg,#5eead4,#0ea5e9)",
    amber: "linear-gradient(135deg,#fcd34d,#f59e0b)",
    green: "linear-gradient(135deg,#4ade80,#16a34a)",
  } as const;
  return (
    <span
      className="grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-[0_10px_22px_-10px_rgba(27,116,245,.7)] transition-transform duration-500 ease-[var(--ease-out-back)] group-hover/spot:-rotate-6 group-hover/spot:scale-110"
      style={{ background: tones[tone] }}
    >
      {children}
    </span>
  );
}
