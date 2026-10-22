import type { CSSProperties, ReactNode } from "react";

/**
 * Moves its content against the scroll: `speed` 0.2 drifts 20% of the
 * viewport height over the element's pass through the screen. Server-rendered
 * markup; <Effects /> animates every `[data-parallax]` near the viewport from
 * one scroll loop, using the `translate`/`rotate` properties so any
 * `transform` animation inside still composes.
 */
export function Parallax({
  children,
  speed = 0.15,
  axis = "y",
  rotate = 0,
  className = "",
  style,
}: {
  children?: ReactNode;
  speed?: number;
  axis?: "x" | "y";
  /** Extra degrees of rotation over the pass. */
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div data-parallax={speed} data-parallax-axis={axis} data-parallax-rotate={rotate || undefined} className={className} style={style}>
      {children}
    </div>
  );
}
