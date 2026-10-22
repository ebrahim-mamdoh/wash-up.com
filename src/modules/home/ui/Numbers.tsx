import { useTranslations } from "next-intl";
import { Container } from "@/shared/ui/Section";
import { Reveal } from "@/shared/ui/Reveal";
import { WordsReveal } from "@/shared/ui/TextReveal";
import { Counter } from "@/shared/ui/Counter";

export function Numbers() {
  const t = useTranslations("numbers");
  const items = t.raw("items") as { value: number; suffix: string; label: string }[];

  return (
    <section className="cv-auto relative py-6">
      <Container>
        <div className="relative overflow-hidden rounded-[36px] bg-brand-deep px-6 py-14 text-white shadow-[var(--shadow-hero)] sm:px-12">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_0%,rgba(255,255,255,.22),transparent)]" />
          <div className="relative text-center">
            <Reveal>
              <span className="text-[14px] font-semibold text-white/70">{t("eyebrow")}</span>
            </Reveal>
            <WordsReveal text={t("title")} highlight={t.raw("highlight") as string[]} gradient={false} className="mx-auto mt-3 max-w-[760px] text-[clamp(26px,3.4vw,42px)] leading-[1.25] [&_.text-brand-600]:text-[#8ecdff]" />
          </div>
          <dl className="relative mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {items.map((item, i) => (
              <Reveal key={item.label} delay={i * 100} className="text-center">
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <Counter to={item.value} suffix={item.suffix} className="block text-[clamp(44px,6vw,72px)] leading-none font-extrabold" />
                  <span className="mx-auto mt-3 block max-w-[220px] text-[15px] leading-relaxed text-white/75">{item.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
