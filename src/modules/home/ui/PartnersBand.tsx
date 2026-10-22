import { useLocale, useTranslations } from "next-intl";
import { BellRing, Check, Store } from "lucide-react";
import { Container, Eyebrow } from "@/shared/ui/Section";
import { Reveal } from "@/shared/ui/Reveal";
import { WordsReveal } from "@/shared/ui/TextReveal";
import { Arrow, Button, ButtonA } from "@/shared/ui/Button";
import { ScrollTilt } from "@/shared/ui/ScrollTilt";
import { LazyMount } from "@/shared/ui/LazyMount";
import { Parallax } from "@/shared/ui/Parallax";
import { DashboardMock } from "@/shared/mock/Dashboard";
import { WashUpMark } from "@/shared/brand/Logo";
import { SITE } from "@/lib/site";

export function PartnersBand() {
  const t = useTranslations("partners");
  const locale = useLocale() as "ar" | "en";
  const points = t.raw("points") as string[];

  return (
    <section id="for-partners" className="cv-auto surface-ink texture-noise relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-radial-center" />
      <Parallax speed={0.3} rotate={10} className="pointer-events-none absolute -start-40 top-10 w-[620px] opacity-[0.06]">
        <WashUpMark className="h-auto w-full" mono />
      </Parallax>
      <div aria-hidden className="animate-orb pointer-events-none absolute end-[-10%] top-[20%] h-[640px] w-[760px] bg-[radial-gradient(closest-side,rgba(56,182,255,.3),transparent)]" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <Eyebrow icon={<Store className="size-4 text-brand-300" />}>{t("eyebrow")}</Eyebrow>
          </Reveal>
          <WordsReveal text={t("title")} highlight={t.raw("highlight") as string[]} className="mt-5 text-[clamp(30px,3.8vw,50px)] leading-[1.2]" />
          <Reveal delay={120}>
            <p className="mt-5 max-w-[540px] text-[17px] leading-[1.85] text-[var(--fg-muted)]">{t("lede")}</p>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((point, i) => (
              <Reveal as="li" key={point} delay={i * 70} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--fg)]">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {point}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
            <Button href="/partners" size="lg" variant="light">
              {t("cta")}
              <Arrow />
            </Button>
            <ButtonA href={SITE.partnerPortalUrl} size="lg" variant="secondary">
              {t("login")}
            </ButtonA>
          </Reveal>
        </div>

        <div className="relative">
          <ScrollTilt>
            <LazyMount className="min-h-[420px]">
              <DashboardMock locale={locale} />
            </LazyMount>
          </ScrollTilt>
          {/* New-order toast floating over the screen */}
          <Parallax speed={-0.18} className="absolute -bottom-8 start-4 z-10 sm:-start-8">
            <div className="animate-float flex items-center gap-3 rounded-2xl border border-white/20 p-3 pe-5 text-[#0b1b3a] shadow-[var(--shadow-float)]" style={{ background: "rgba(255,255,255,.92)" }}>
              <span className="grid size-10 place-items-center rounded-xl bg-brand-grad text-white">
                <BellRing className="size-5" />
              </span>
              <span>
                <span className="block text-[14px] font-bold">{t("toastTitle")}</span>
                <span className="block text-[12px] text-[#5f6b80]">{t("toastBody")}</span>
              </span>
            </div>
          </Parallax>
        </div>
      </Container>
    </section>
  );
}
