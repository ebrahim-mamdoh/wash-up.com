"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** A number that counts up the first time it enters the viewport. */
export function Counter({
  to,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  /** Glued to the number inside the LTR isolate — for "+", "%", "K". */
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();
  const shown = reduced ? to : value;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let start: number | null = null;
        const tick = (now: number) => {
          if (start === null) start = now;
          const t = Math.min(1, (now - start) / duration);
          setValue(to * easeOutExpo(t));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      <span dir="ltr" className="num">
        {prefix}
        {shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        {suffix}
      </span>
    </span>
  );
}
