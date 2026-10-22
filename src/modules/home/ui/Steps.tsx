import { useTranslations } from "next-intl";
import { BellRing, CalendarCheck, MapPin, Smartphone, Zap } from "lucide-react";
import { Container, Section, SectionHeading } from "@/shared/ui/Section";
import { StepsPath } from "@/shared/sections/StepsPath";

const ICONS = [Smartphone, MapPin, CalendarCheck, BellRing];

export function Steps() {
  const t = useTranslations("steps");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <Section id="how" tone="subtle" texture="grid">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          eyebrowIcon={<Zap className="size-4 text-brand-600" />}
          title={t("title")}
          highlight={t.raw("highlight") as string[]}
          description={t("lede")}
          className="mb-16"
        />
        <StepsPath
          steps={items.map((s, i) => {
            const Icon = ICONS[i];
            return { ...s, icon: <Icon className="size-8" strokeWidth={1.7} /> };
          })}
        />
      </Container>
    </Section>
  );
}
