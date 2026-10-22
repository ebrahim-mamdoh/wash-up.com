import type { ReactNode } from "react";
import { Container } from "@/shared/ui/Section";
import { Reveal } from "@/shared/ui/Reveal";
import { WordsReveal } from "@/shared/ui/TextReveal";
import { Parallax } from "@/shared/ui/Parallax";
import { WashUpMark } from "@/shared/brand/Logo";
import { Bubbles } from "@/shared/mock/Bubbles";

/** Closing call to action: a deep brand card with the mark and rising bubbles. */
export function FinalCta({ title, highlight, lede, actions }: { title: string; highlight: string[]; lede: string; actions: ReactNode }) {
  return (
    <section className="cv-auto relative py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] bg-brand-deep px-6 py-16 text-center text-white shadow-[var(--shadow-hero)] sm:px-12 sm:py-24">
          <Bubbles count={10} seed={41} />
          <Parallax speed={0.2} rotate={-12} className="pointer-events-none absolute -bottom-28 -start-24 w-[420px] opacity-[0.12]">
            <WashUpMark className="h-auto w-full" mono />
          </Parallax>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(255,255,255,.2),transparent)]" />
          <div className="relative">
            <WordsReveal
              text={title}
              highlight={highlight}
              gradient={false}
              className="mx-auto max-w-[760px] text-[clamp(32px,5vw,62px)] leading-[1.12] [&_.text-brand-600]:text-[#d6efff] [&_.text-brand-600]:[text-shadow:0_2px_24px_rgba(11,33,82,.35)]"
            />
            <Reveal delay={150}>
              <p className="mx-auto mt-5 max-w-[560px] text-[17.5px] leading-[1.8] text-white/80">{lede}</p>
            </Reveal>
            <Reveal delay={260} className="mt-9 flex flex-wrap justify-center gap-3">
              {actions}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
