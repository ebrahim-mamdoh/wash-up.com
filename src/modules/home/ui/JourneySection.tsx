import { useJourneyCopy } from "../copy";
import { Radar } from "lucide-react";
import { Container, Eyebrow } from "@/shared/ui/Section";
import { WordsReveal } from "@/shared/ui/TextReveal";
import { Reveal } from "@/shared/ui/Reveal";
import { PhoneFrame } from "@/shared/mock/Phone";
import { OrderTrackScreen } from "@/shared/mock/TrackScreen";
import { Bubbles } from "@/shared/mock/Bubbles";
import { LazyMount } from "@/shared/ui/LazyMount";
import { JourneyDesktop } from "./JourneyDesktop";

/**
 * Live tracking. Phones get the stacked, server-rendered version below; wide
 * screens get the pinned wash-bay scene, loaded on demand into the tall section.
 */
export function JourneySection() {
  const copy = useJourneyCopy();
  const { stages } = copy;

  return (
    <section id="tracking" className="surface-ink texture-noise relative lg:h-[440vh]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-radial-center" />
      <JourneyDesktop foam={<Bubbles count={16} seed={3} />} copy={copy} />

      <div className="py-20 lg:hidden">
        <Container>
          <Eyebrow icon={<Radar className="size-4 text-brand-300" />}>{copy.eyebrow}</Eyebrow>
          <WordsReveal text={copy.title} highlight={copy.highlight} className="mt-5 text-[clamp(28px,7vw,40px)] leading-[1.2]" />
          <p className="mt-4 text-[16px] leading-[1.85] text-[var(--fg-muted)]">{copy.lede}</p>
          <LazyMount className="mx-auto mt-10 aspect-[9/19.2] w-[260px]">
            <PhoneFrame>
              <OrderTrackScreen active={4} copy={copy} />
            </PhoneFrame>
          </LazyMount>
          <ol className="mt-10 flex flex-col gap-3">
            {stages.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="flex gap-3 rounded-2xl border border-[var(--border)] bg-white/[0.04] p-4">
                <span className="num grid size-7 shrink-0 place-items-center rounded-full bg-brand-grad text-[12px] font-bold text-white">{i + 1}</span>
                <span>
                  <span className="block text-[16px] font-bold text-white">{s.title}</span>
                  <span className="mt-1 block text-[14.5px] leading-[1.8] text-[var(--fg-muted)]">{s.body}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}
