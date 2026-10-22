import { useTranslations } from "next-intl";
import { BadgeCheck, Calculator, Headset, MessageSquareWarning, ReceiptText, ScrollText, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/shared/ui/Section";
import { Reveal } from "@/shared/ui/Reveal";
import { IconTile, SpotlightCard } from "@/shared/ui/SpotlightCard";

const ICONS: Record<string, LucideIcon> = {
  verified: BadgeCheck,
  price: Calculator,
  reviews: MessageSquareWarning,
  support: Headset,
  finance: ReceiptText,
  audit: ScrollText,
};

export function Trust() {
  const t = useTranslations("trust");
  const items = t.raw("items") as { key: string; title: string; body: string }[];

  return (
    <Section id="trust" glow>
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          eyebrowIcon={<ShieldCheck className="size-4 text-brand-600" />}
          title={t("title")}
          highlight={t.raw("highlight") as string[]}
          description={t("lede")}
          className="mb-14"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[item.key];
            return (
              <Reveal key={item.key} delay={(i % 3) * 90}>
                <SpotlightCard className="h-full p-6 sm:p-7">
                  <IconTile tone={i % 2 ? "navy" : "brand"}>
                    <Icon className="size-6" />
                  </IconTile>
                  <h3 className="mt-5 text-[18.5px] font-bold">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.85] text-[var(--fg-muted)]">{item.body}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
