import { useTranslations } from "next-intl";
import { CircleHelp } from "lucide-react";
import { Container, Section, SectionHeading } from "@/shared/ui/Section";
import { FaqTabs } from "@/shared/sections/Faq";

type QA = { q: string; a: string };

export function HomeFaq() {
  const t = useTranslations("faq");
  return (
    <Section id="faq">
      <Container className="max-w-[860px]">
        <SectionHeading
          eyebrow={t("eyebrow")}
          eyebrowIcon={<CircleHelp className="size-4 text-brand-600" />}
          title={t("title")}
          highlight={t.raw("highlight") as string[]}
          className="mb-10"
        />
        <FaqTabs
          tabs={[
            { label: t("owners"), items: t.raw("ownersItems") as QA[] },
            { label: t("partners"), items: t.raw("partnersItems") as QA[] },
          ]}
        />
      </Container>
    </Section>
  );
}
