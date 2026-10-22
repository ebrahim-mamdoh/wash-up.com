import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-[var(--ease-out-expo)] " +
  "outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] " +
  "active:scale-[0.97]";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-grad text-white shadow-[0_10px_26px_-10px_rgba(27,116,245,.7)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(27,116,245,.8)]",
  secondary:
    "border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--fg)] hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[var(--shadow-card)]",
  ghost: "text-[var(--fg-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--fg)]",
  light: "bg-white text-navy-800 shadow-[0_10px_30px_-12px_rgba(0,0,0,.5)] hover:-translate-y-0.5",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-7 text-base sm:px-8",
};

/** Sweep of light across primary buttons on hover. */
function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover:animate-[wu-shine_900ms_var(--ease-out-expo)]"
    />
  );
}

type Common = { children: ReactNode; variant?: Variant; size?: Size; className?: string };

/** Internal link styled as a button (locale-aware). */
export function Button({ children, variant = "primary", size = "md", className = "", ...rest }: Common & Omit<ComponentProps<typeof Link>, "className">) {
  return (
    <Link className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      {variant === "primary" && <Shine />}
      {children}
    </Link>
  );
}

/** External link or in-page anchor styled as a button. */
export function ButtonA({ children, variant = "primary", size = "md", className = "", ...rest }: Common & Omit<ComponentProps<"a">, "className">) {
  return (
    <a className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      {variant === "primary" && <Shine />}
      {children}
    </a>
  );
}

/** Arrow pointing in the reading direction; nudges forward on hover. */
export function Arrow({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`${className} transition-transform duration-300 ease-[var(--ease-out-expo)] ltr:-scale-x-100 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1`}
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}
