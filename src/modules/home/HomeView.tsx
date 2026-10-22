import { useTranslations } from "next-intl";
import { Hero, type HeroCopy } from "./ui/Hero";
import { Problem } from "./ui/Problem";
import { Steps } from "./ui/Steps";
import { Features } from "./ui/Features";
import { JourneySection } from "./ui/JourneySection";
import { Services } from "./ui/Services";
import { PartnersBand } from "./ui/PartnersBand";
import { Trust } from "./ui/Trust";
import { Numbers } from "./ui/Numbers";
import { Download } from "./ui/Download";
import { HomeFaq } from "./ui/HomeFaq";
import { FinalCta } from "@/shared/sections/FinalCta";
import { Arrow, Button } from "@/shared/ui/Button";
import { PhoneFrame } from "@/shared/mock/Phone";
import { AppHomeScreen } from "@/shared/mock/AppScreens";
import { Bubbles } from "@/shared/mock/Bubbles";

/**
 * Home page body, shared by both locales. The story runs:
 * promise (hero) → the pain → how it works → what drivers get → live tracking
 * → services → what washes get → why it's trustworthy → numbers → get the app → FAQ → CTA.
 */
const HERO_KEYS = ["label", "badge", "lede", "ctaDownload", "ctaPartners", "scroll"] as const;
const CARD_KEYS = ["nearby", "slot", "rating", "offer", "ready"] as const;

export function HomeView() {
  const t = useTranslations("cta");
  const h = useTranslations("hero");
  const heroCopy: HeroCopy = {
    headline: h.raw("headline") as string[],
    highlightFrom: Number(h.raw("highlightFrom")),
    text: Object.fromEntries([
      ...HERO_KEYS.map((k) => [k, h(k)]),
      ...CARD_KEYS.flatMap((k) => [
        [`cards.${k}Title`, h(`cards.${k}Title`)],
        [`cards.${k}Body`, h(`cards.${k}Body`)],
      ]),
    ]),
  };
  return (
    <div id="content">
      <Hero
        phone={
          <PhoneFrame>
            <AppHomeScreen />
          </PhoneFrame>
        }
        bubbles={<Bubbles count={14} seed={11} />}
        copy={heroCopy}
      />
      <Problem />
      <Steps />
      <Features />
      <JourneySection />
      <Services />
      <PartnersBand />
      <Trust />
      <Numbers />
      <Download />
      <HomeFaq />
      <FinalCta
        title={t("title")}
        highlight={t.raw("highlight") as string[]}
        lede={t("lede")}
        actions={
          <>
            <Button href="/#download" size="lg" variant="light">
              {t("primary")}
              <Arrow />
            </Button>
            <Button href="/partners" size="lg" variant="secondary" className="!border-white/30 !bg-white/10 !text-white">
              {t("secondary")}
            </Button>
          </>
        }
      />
    </div>
  );
}
