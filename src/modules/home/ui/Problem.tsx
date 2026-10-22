import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import { Container, Section, SectionHeading } from "@/shared/ui/Section";
import { Reveal } from "@/shared/ui/Reveal";
import { ScrollTintText } from "@/shared/ui/TextReveal";

export function Problem() {
  const t = useTranslations("problem");
  const pairs = t.raw("pairs") as { before: string; after: string }[];

  return (
    <Section id="why">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} highlight={t.raw("highlight") as string[]} />

        <ScrollTintText
          text={t("story")}
          highlight={t.raw("storyHighlight") as string[]}
          className="mx-auto mt-12 max-w-[920px] text-center text-[clamp(22px,3vw,36px)] leading-[1.6] font-bold text-[var(--fg)]"
        />

        <div className="mx-auto mt-16 max-w-[980px] overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-2 border-b border-[var(--border)] text-[14px] font-bold">
            <div className="flex items-center gap-2 px-5 py-4 text-[var(--fg-subtle)] sm:px-8">
              <span className="size-2 rounded-full bg-[#ef4444]" />
              {t("before")}
            </div>
            <div className="flex items-center gap-2 border-s border-[var(--border)] bg-brand-50/60 px-5 py-4 text-brand-700 sm:px-8">
              <span className="size-2 rounded-full bg-brand-600" />
              {t("after")}
            </div>
          </div>
          {pairs.map((pair, i) => (
            <Reveal key={pair.before} delay={i * 90} className="grid grid-cols-2 border-b border-[var(--border)] last:border-b-0">
              <div className="flex items-start gap-3 px-5 py-5 sm:px-8">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#fee2e2] text-[#dc2626]">
                  <X className="size-3.5" strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-relaxed text-[var(--fg-subtle)] line-through decoration-[#ef4444]/40 sm:text-[16.5px]">{pair.before}</span>
              </div>
              <div className="flex items-start gap-3 border-s border-[var(--border)] bg-brand-50/40 px-5 py-5 sm:px-8">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-relaxed font-semibold text-[var(--fg)] sm:text-[16.5px]">{pair.after}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
