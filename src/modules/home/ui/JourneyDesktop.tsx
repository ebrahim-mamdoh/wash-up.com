"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { JourneyCopy } from "../copy";

const JourneyScene = dynamic(() => import("./Journey").then((m) => m.JourneyScene), { ssr: false });

/**
 * Mounts the pinned tracking scene only on wide screens and only once the
 * section is within a screen of the viewport. Phones never download or
 * hydrate it — they get the server-rendered stacked version instead.
 */
export function JourneyDesktop({ foam, copy }: { foam: ReactNode; copy: JourneyCopy }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(min-width: 1024px)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setMounted(true);
        io.disconnect();
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 hidden lg:block">
      {mounted && <JourneyScene foam={foam} copy={copy} />}
    </div>
  );
}
