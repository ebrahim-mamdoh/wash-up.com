import type { CSSProperties, ElementType } from "react";
import { kashida, matchesWord } from "@/lib/typography";
export { ScrollTintText } from "./ScrollTintText";

/**
 * A heading whose words rise in one after another when it enters the viewport.
 * Server-rendered: each word carries its index, CSS staggers the transition,
 * and <Effects /> flips `data-shown` on the heading.
 */
export function WordsReveal({
  text,
  as: Tag = "h2",
  className = "",
  highlight = [],
  stretch,
  step = 55,
  startDelay = 0,
  gradient = true,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words painted in the brand colour. */
  highlight?: string[];
  /** Words stretched with a kashida; defaults to the highlighted ones. */
  stretch?: string[];
  step?: number;
  startDelay?: number;
  /** Highlight with the brand gradient (default) or the flat brand colour. */
  gradient?: boolean;
}) {
  const words = text.split(" ");
  const stretchList = stretch ?? highlight;
  const style = { ["--ws" as string]: `${step}ms`, ["--wd" as string]: `${startDelay}ms` } as CSSProperties;

  return (
    <Tag data-reveal="words" className={className} style={style}>
      {words.map((word, i) => {
        const isHighlighted = highlight.some((h) => matchesWord(word, h));
        const isStretched = stretchList.some((s) => matchesWord(word, s));
        return (
          <span
            key={`${word}-${i}`}
            className={`wr-word whitespace-pre ${isHighlighted ? (gradient ? "text-brand-grad" : "text-brand-600") : ""}`}
            style={{ ["--i" as string]: i } as CSSProperties}
          >
            {isStretched ? kashida(word) : word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
