"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders decorative, below-the-fold markup (phone and dashboard mocks) only
 * when it comes within a screen of the viewport. Until then the wrapper keeps
 * the space (give it the mock's size or aspect ratio via `className`), so
 * nothing shifts. The page's text stays server-rendered; only illustrations
 * wait — which keeps the initial DOM, and its hydration, small.
 */
export function LazyMount({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      {shown && children}
    </div>
  );
}
