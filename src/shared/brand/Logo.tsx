import { useId } from "react";

/**
 * The W ribbon of the WashUp mark: a sky-blue ribbon (left) folding over a
 * deep-navy ribbon (right). Redrawn as SVG from the logo artwork — swap the
 * paths for the designer's master vector when it is available.
 */
export function WashUpMark({ className = "h-8 w-auto", mono = false }: { className?: string; mono?: boolean }) {
  const id = useId().replace(/:/g, "");
  const sky = `wu-sky-${id}`;
  const navy = `wu-navy-${id}`;
  const fold = `wu-fold-${id}`;
  return (
    <svg viewBox="0 0 128 80" className={className} aria-hidden>
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={mono ? "currentColor" : "#5fd0ff"} />
          <stop offset="0.55" stopColor={mono ? "currentColor" : "#2aa4ff"} />
          <stop offset="1" stopColor={mono ? "currentColor" : "#1b74f5"} />
        </linearGradient>
        <linearGradient id={navy} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={mono ? "currentColor" : "#0b2152"} />
          <stop offset="0.6" stopColor={mono ? "currentColor" : "#163d8f"} />
          <stop offset="1" stopColor={mono ? "currentColor" : "#1d4fb3"} />
        </linearGradient>
        <linearGradient id={fold} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={mono ? "currentColor" : "#1b74f5"} />
          <stop offset="1" stopColor={mono ? "currentColor" : "#0f2a66"} />
        </linearGradient>
      </defs>
      <g fill="none" strokeWidth="15">
        {/* Navy ribbon: from the middle fold, down into the right valley, up to the top-right tip. */}
        <path stroke={`url(#${navy})`} d="M74 28 C84 28 85 70 96 70 C108 70 110 30 126 11" />
        {/* Sky ribbon: from the top-left tip, down into the left valley, up to the fold at the middle peak. */}
        <path stroke={`url(#${sky})`} d="M2 12 C18 4 30 16 36 32 C42 50 44 70 55 70 C67 70 68 28 77 28" />
        {/* Shadow cast by the fold onto the navy ribbon. */}
        <path stroke={`url(#${fold})`} opacity="0.35" strokeWidth="9" d="M77 28 C80 30 81 34 82 38" />
      </g>
    </svg>
  );
}

/** Mark + wordmark ("WASH" in navy ink, "UP" in brand blue). */
export function WashUpLogo({ className = "", light = false, compact = false }: { className?: string; light?: boolean; compact?: boolean }) {
  return (
    <span dir="ltr" className={`inline-flex items-center gap-2 ${className}`}>
      <WashUpMark className={compact ? "h-6 w-auto" : "h-7 w-auto"} />
      <span
        className={`font-display text-[19px] leading-none font-extrabold tracking-[-0.02em] ${light ? "text-white" : "text-navy-800"}`}
        style={{ fontFamily: "var(--font-display-latin), sans-serif" }}
      >
        WASH<span className={light ? "text-brand-300" : "text-brand-600"}>UP</span>
      </span>
    </span>
  );
}
