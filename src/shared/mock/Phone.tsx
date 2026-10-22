import type { ReactNode } from "react";

/** A modern phone frame (dynamic island, thin bezel). Content fills the screen. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    // Decorative illustration of the app: hidden from assistive tech.
    <div
      aria-hidden
      className={`relative aspect-[9/19.2] rounded-[46px] bg-[#0a1430] p-[9px] shadow-[var(--shadow-hero)] ring-1 ring-white/10 ${className}`}
    >
      {/* Side buttons */}
      <span aria-hidden className="absolute -start-[3px] top-[22%] h-12 w-[3px] rounded-s bg-[#0a1430]" />
      <span aria-hidden className="absolute -end-[3px] top-[18%] h-16 w-[3px] rounded-e bg-[#0a1430]" />
      <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[#f6f9fd]">
        <span aria-hidden className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-[#0a1430]" />
        {children}
      </div>
    </div>
  );
}

/** iOS-like status bar, always LTR. */
export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div dir="ltr" className={`flex h-10 items-end justify-between px-6 pb-1 text-[11px] font-semibold ${dark ? "text-white" : "text-[#0b1b3a]"}`}>
      <span className="num">9:41</span>
      <span className="flex items-center gap-1">
        <svg viewBox="0 0 18 12" className="h-2.5 w-auto" fill="currentColor" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-2.5 w-auto" fill="none" stroke="currentColor" aria-hidden>
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" />
          <rect x="2.5" y="2.5" width="16" height="7" rx="1.5" fill="currentColor" stroke="none" />
          <path d="M24.5 4v4" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}
