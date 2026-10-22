import { useTranslations } from "next-intl";
import { Armchair, Car, Droplets, Sparkles, type LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/shared/ui/Section";
import { Reveal } from "@/shared/ui/Reveal";
import { Parallax } from "@/shared/ui/Parallax";

const META: Record<string, { icon: LucideIcon; from: string; to: string }> = {
  exterior: { icon: Droplets, from: "#59b1ff", to: "#1b74f5" },
  interior: { icon: Armchair, from: "#1d4fb3", to: "#0b2152" },
  full: { icon: Car, from: "#38b6ff", to: "#0f2a66" },
  deep: { icon: Sparkles, from: "#22d3ee", to: "#1b74f5" },
};

function Chips({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // One half must be wider than any screen; then the half is doubled so the -50% loop is seamless.
  const half = [...items, ...items, ...items];
  const loop = [...half, ...half];
  return (
    <div className="marquee mask-fade-x overflow-hidden" dir="ltr">
      <div className="marquee-track flex w-max gap-3 py-1.5" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {loop.map((label, i) => (
          <span
            key={`${label}-${i}`}
            // A CSS dot instead of an icon: these chips repeat ~60 times, so every node counts.
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 text-[15px] font-semibold whitespace-nowrap text-[var(--fg-muted)] shadow-[var(--shadow-card)] before:size-1.5 before:rounded-full before:bg-brand-500 before:content-['']"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { key: string; title: string; body: string }[];
  const addons = t.raw("addons") as string[];
  const half = Math.ceil(addons.length / 2);

  return (
    <Section id="services" tone="subtle" texture="dots">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} highlight={t.raw("highlight") as string[]} description={t("lede")} className="mb-14" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const meta = META[item.key];
            return (
              <Reveal key={item.key} delay={i * 100}>
                <article className="group relative h-full overflow-hidden rounded-[28px] p-6 text-white shadow-[var(--shadow-float)] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5" style={{ background: `linear-gradient(150deg, ${meta.from}, ${meta.to})` }}>
                  {/* Big icon drifting with the scroll */}
                  <Parallax speed={0.12} className="pointer-events-none absolute -bottom-6 -end-6 opacity-20">
                    <meta.icon className="size-40 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-12 group-hover:scale-110" strokeWidth={1.2} />
                  </Parallax>
                  {/* Light sweep on hover */}
                  <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-[wu-shine_1100ms_var(--ease-out-expo)]" />
                  <span className="relative grid size-12 place-items-center rounded-2xl bg-white/20">
                    <meta.icon className="size-6" />
                  </span>
                  <h3 className="relative mt-16 text-[21px] font-extrabold">{item.title}</h3>
                  <p className="relative mt-2 text-[15px] leading-[1.8] text-white/80">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 text-center">
          <h3 className="text-[18px] font-bold text-[var(--fg)]">{t("addonsTitle")}</h3>
        </Reveal>
      </Container>
      <div className="mt-6 flex flex-col gap-3">
        <Chips items={addons.slice(0, half)} />
        <Chips items={addons.slice(half)} reverse />
      </div>
    </Section>
  );
}
