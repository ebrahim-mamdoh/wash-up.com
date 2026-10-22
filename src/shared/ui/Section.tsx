import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { WordsReveal } from "./TextReveal";

/** Page-width container used by every section. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Small pill above a section title. */
export function Eyebrow({ children, icon, className = "" }: { children: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3.5 py-1.5 text-[14px] font-semibold text-[var(--fg-muted)] shadow-[var(--shadow-card)] ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  highlight = [],
  stretch,
  description,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  title: string;
  highlight?: string[];
  stretch?: string[];
  description?: string;
  align?: "center" | "start";
  className?: string;
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-start";
  return (
    <div className={`flex flex-col ${alignment} gap-4 ${className}`}>
      {eyebrow && (
        <Reveal duration={620}>
          <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <WordsReveal
        text={title}
        highlight={highlight}
        stretch={stretch}
        className="max-w-[860px] text-balance text-[clamp(28px,4.4vw,50px)] leading-[1.2] text-[var(--fg)]"
      />
      {description && (
        <Reveal delay={140} duration={760}>
          <p
            className={`max-w-[640px] text-pretty text-[16px] leading-[1.85] text-[var(--fg-muted)] sm:text-[18px] ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  children,
  id,
  className = "",
  texture = "none",
  glow = false,
  tone = "base",
  clip = true,
  pad = "py-20 sm:py-28",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  texture?: "none" | "grid" | "dots";
  glow?: boolean;
  tone?: "base" | "subtle" | "ink";
  /** Clipping keeps decorations inside, but it breaks `position: sticky` — pass false for pinned scenes. */
  clip?: boolean;
  pad?: string;
}) {
  const tones = { base: "bg-[var(--bg)]", subtle: "bg-[var(--bg-subtle)]", ink: "surface-ink" } as const;
  const textures = { none: "", grid: "bg-grid", dots: "bg-dots" } as const;

  return (
    <section id={id} className={`cv-auto texture-noise relative ${pad} ${clip ? "overflow-hidden" : ""} ${tones[tone]} ${className}`}>
      {texture !== "none" && (
        <div aria-hidden className={`pointer-events-none absolute inset-0 ${textures[texture]} mask-radial-center`} />
      )}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -top-24 h-[560px] w-[1000px] max-w-full -translate-x-1/2"
          style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--color-brand-500) 14%, transparent), transparent)" }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
