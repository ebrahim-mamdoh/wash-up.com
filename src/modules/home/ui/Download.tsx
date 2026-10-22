import { useTranslations } from "next-intl";
import { Smartphone } from "lucide-react";
import { Container, Eyebrow, Section } from "@/shared/ui/Section";
import { Reveal } from "@/shared/ui/Reveal";
import { WordsReveal } from "@/shared/ui/TextReveal";
import { Parallax } from "@/shared/ui/Parallax";
import { StoreBadges } from "@/shared/ui/StoreBadges";
import { LazyMount } from "@/shared/ui/LazyMount";
import { useJourneyCopy } from "../copy";
import { PhoneFrame } from "@/shared/mock/Phone";
import { AppHomeScreen } from "@/shared/mock/AppScreens";
import { OrderTrackScreen } from "@/shared/mock/TrackScreen";
import { Bubbles } from "@/shared/mock/Bubbles";

export function Download() {
  const t = useTranslations("download");
  const track = useJourneyCopy();
  return (
    <Section id="download" tone="subtle" pad="py-20 sm:py-28">
      <Bubbles count={8} seed={23} />
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div className="text-center lg:text-start">
          <Reveal>
            <Eyebrow icon={<Smartphone className="size-4 text-brand-600" />}>{t("eyebrow")}</Eyebrow>
          </Reveal>
          <WordsReveal text={t("title")} highlight={t.raw("highlight") as string[]} className="mt-5 text-[clamp(32px,4.6vw,58px)] leading-[1.15]" />
          <Reveal delay={120}>
            <p className="mx-auto mt-5 max-w-[480px] text-[18px] leading-[1.8] text-[var(--fg-muted)] lg:mx-0">{t("lede")}</p>
          </Reveal>
          <Reveal delay={220}>
            <StoreBadges className="mt-8 justify-center lg:justify-start" />
            <p className="mt-4 text-[13px] font-semibold text-[var(--fg-subtle)]">{t("soon")}</p>
          </Reveal>
        </div>

        {/* Two phones at different depths: the far one drifts slower. */}
        {/* Phones: one centred on small screens, two overlapping from `sm` up. Centring uses
            inset + mx-auto because Parallax owns the `translate` property. */}
        <div className="relative mx-auto h-[560px] w-full max-w-[480px] sm:h-[600px]">
          <Parallax speed={0.05} className="absolute start-0 top-16 hidden w-[250px] rotate-[-8deg] opacity-90 sm:block">
            <LazyMount className="aspect-[9/19.2]">
              <PhoneFrame>
                <AppHomeScreen />
              </PhoneFrame>
            </LazyMount>
          </Parallax>
          <Parallax speed={0.14} className="absolute inset-x-0 top-4 mx-auto w-[250px] rotate-[4deg] sm:inset-x-auto sm:end-0 sm:mx-0 sm:w-[260px] sm:rotate-[6deg]">
            <LazyMount className="aspect-[9/19.2]">
              <PhoneFrame>
                <OrderTrackScreen active={4} copy={track} />
              </PhoneFrame>
            </LazyMount>
          </Parallax>
        </div>
      </Container>
    </Section>
  );
}
