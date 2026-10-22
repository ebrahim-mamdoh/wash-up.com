import type { CSSProperties, ElementType, ReactNode } from "react";

type Direction = "up" | "down" | "start" | "end" | "zoom" | "none";

/**
 * Fades its children in when they enter the viewport. Server-rendered: it only
 * writes `data-reveal` and timing variables; the single <Effects /> island
 * flips `data-shown` and CSS runs the transition (see globals.css). Without JS
 * the hidden state never applies, so content is always readable.
 */
export function Reveal({
  children,
  as: Tag = "div",
  direction = "up",
  delay = 0,
  duration = 800,
  className = "",
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Tag
      data-reveal={direction}
      className={className}
      style={{ ...style, ["--rd" as string]: `${delay}ms`, ["--rdur" as string]: `${duration}ms` }}
    >
      {children}
    </Tag>
  );
}
