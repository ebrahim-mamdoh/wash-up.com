import { useLocale, useTranslations } from "next-intl";
import {
  CalendarRange,
  ChartNoAxesCombined,
  ClipboardList,
  Crown,
  FileCheck2,
  Handshake,
  MessageSquareHeart,
  Radio,
  Rocket,
  Settings2,
  Smartphone,
  UserCog,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { Container, Eyebrow, Section, SectionHeading } from "@/shared/ui/Section";
import { Reveal } from "@/shared/ui/Reveal";
import { WordsReveal } from "@/shared/ui/TextReveal";
import { Arrow, ButtonA } from "@/shared/ui/Button";
import { IconTile, SpotlightCard } from "@/shared/ui/SpotlightCard";
import { ScrollTilt } from "@/shared/ui/ScrollTilt";
import { StepsPath } from "@/shared/sections/StepsPath";
import { FaqList } from "@/shared/sections/Faq";
import { FinalCta } from "@/shared/sections/FinalCta";
import { DashboardMock } from "@/shared/mock/Dashboard";
import { Bubbles } from "@/shared/mock/Bubbles";
import { PortalTour } from "./ui/PortalTour";
import { FinanceMock, OrdersMock, TeamMock } from "./ui/TourMocks";
import { SITE } from "@/lib/site";

const BENEFIT_ICONS: Record<string, LucideIcon> = {
  customers: Users,
  schedule: CalendarRange,
  live: Radio,
  team: UserCog,
  money: ChartNoAxesCombined,
  reputation: MessageSquareHeart,
};
const ROLE_ICONS: Record<string, LucideIcon> = { owner: Crown, manager: Settings2, employee: Smartphone };
const STEP_ICONS = [ClipboardList, FileCheck2, Settings2, Rocket];

type Item = { key: string; title: string; body: string };

export function PartnersView() {
  const t = useTranslations("partnersPage");
  const faq = useTranslations("faq");
  const locale = useLocale() as "ar" | "en";
  const applyHref = SITE.partnerRegisterUrl;

  const benefits = t.raw("benefits.items") as Item[];
  const roles = t.raw("roles.items") as Item[];
  const steps = t.raw("onboarding.items") as { title: string; body: string }[];
  const tabs = t.raw("tour.tabs") as { key: string; label: string; title: string; points: string[] }[];

  return (
    <div id="content">
      {/* ===== Hero ===== */}
      <section className="texture-noise relative overflow-hidden pt-[130px] pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#e9f5ff] via-[var(--bg)] to-[var(--bg)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-radial-center" />
        <div aria-hidden className="animate-orb pointer-events-none absolute left-1/2 top-[18%] h-[600px] w-[1100px] max-w-[140vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(56,182,255,.26),transparent)]" />
        <Bubbles count={10} seed={5} />
        <Container className="relative text-center">
          <span style={{ animation: "wu-rise 700ms var(--ease-out-expo) both" }} className="inline-block">
            <Eyebrow icon={<Handshake className="size-4 text-brand-600" />}>{t("hero.eyebrow")}</Eyebrow>
          </span>
          <WordsReveal
            as="h1"
            text={t("hero.title")}
            highlight={t.raw("hero.highlight") as string[]}
            step={80}
            className="mx-auto mt-6 max-w-[900px] text-balance text-[clamp(36px,5.6vw,72px)] leading-[1.1]"
          />
          <p className="mx-auto mt-6 max-w-[680px] text-[17px] leading-[1.85] text-[var(--fg-muted)] sm:text-[18.5px]" style={{ animation: "wu-rise 800ms var(--ease-out-expo) 500ms both" }}>
            {t("hero.lede")}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3" style={{ animation: "wu-rise 800ms var(--ease-out-expo) 650ms both" }}>
            <ButtonA href={applyHref} size="lg">
              {t("hero.apply")}
              <Arrow />
            </ButtonA>
            <ButtonA href={SITE.partnerPortalUrl} size="lg" variant="secondary">
              {t("hero.login")}
            </ButtonA>
          </div>
          <ScrollTilt className="mx-auto mt-16 max-w-[1040px]" from={28}>
            <div className="surface-ink rounded-[30px] p-2 sm:p-3">
              <DashboardMock locale={locale} />
            </div>
          </ScrollTilt>
        </Container>
      </section>

      {/* ===== Benefits ===== */}
      <Section tone="subtle" texture="dots">
        <Container>
          <SectionHeading eyebrow={t("benefits.eyebrow")} title={t("benefits.title")} highlight={t.raw("benefits.highlight") as string[]} className="mb-14" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[b.key];
              return (
                <Reveal key={b.key} delay={(i % 3) * 90}>
                  <SpotlightCard className="h-full p-6 sm:p-7">
                    <IconTile tone={(["brand", "navy", "aqua"] as const)[i % 3]}>
                      <Icon className="size-6" />
                    </IconTile>
                    <h3 className="mt-5 text-[19px] font-bold">{b.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.85] text-[var(--fg-muted)]">{b.body}</p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ===== Portal tour ===== */}
      <Section id="tour" glow>
        <Container>
          <SectionHeading eyebrow={t("tour.eyebrow")} title={t("tour.title")} highlight={t.raw("tour.highlight") as string[]} className="mb-10" />
          <PortalTour
            tabs={tabs}
            mocks={{
              live: <DashboardMock locale={locale} />,
              orders: <OrdersMock locale={locale} />,
              team: <TeamMock locale={locale} />,
              finance: <FinanceMock locale={locale} />,
            }}
          />
        </Container>
      </Section>

      {/* ===== Onboarding ===== */}
      <Section tone="subtle" texture="grid">
        <Container>
          <SectionHeading eyebrow={t("onboarding.eyebrow")} title={t("onboarding.title")} highlight={t.raw("onboarding.highlight") as string[]} className="mb-16" />
          <StepsPath
            steps={steps.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return { ...s, icon: <Icon className="size-8" strokeWidth={1.7} /> };
            })}
          />
        </Container>
      </Section>

      {/* ===== Roles ===== */}
      <section className="cv-auto surface-ink texture-noise relative overflow-hidden py-24 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-radial-center" />
        <Container className="relative">
          <SectionHeading
            eyebrow={t("roles.eyebrow")}
            eyebrowIcon={<UsersRound className="size-4 text-brand-300" />}
            title={t("roles.title")}
            highlight={t.raw("roles.highlight") as string[]}
            className="mb-14"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {roles.map((r, i) => {
              const Icon = ROLE_ICONS[r.key];
              return (
                <Reveal key={r.key} delay={i * 110}>
                  <div className="h-full rounded-[28px] border border-white/10 bg-white/[0.05] p-7 transition-colors duration-500 hover:border-brand-400/40 hover:bg-white/[0.08]">
                    <span className="grid size-14 place-items-center rounded-2xl bg-brand-grad text-white shadow-[0_12px_30px_-12px_rgba(56,182,255,.8)]">
                      <Icon className="size-7" />
                    </span>
                    <h3 className="mt-6 text-[21px] font-extrabold text-white">{r.title}</h3>
                    <p className="mt-2 text-[15.5px] leading-[1.85] text-[var(--fg-muted)]">{r.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===== FAQ ===== */}
      <Section>
        <Container className="max-w-[860px]">
          <SectionHeading eyebrow={faq("eyebrow")} title={faq("title")} highlight={faq.raw("highlight") as string[]} className="mb-10" />
          <FaqList items={faq.raw("partnersItems") as { q: string; a: string }[]} />
        </Container>
      </Section>

      <FinalCta
        title={t("cta.title")}
        highlight={t.raw("cta.highlight") as string[]}
        lede={t("cta.lede")}
        actions={
          <>
            <ButtonA href={applyHref} size="lg" variant="light">
              {t("cta.primary")}
              <Arrow />
            </ButtonA>
            <ButtonA href={SITE.partnerPortalUrl} size="lg" variant="secondary" className="!border-white/30 !bg-white/10 !text-white">
              {t("cta.secondary")}
            </ButtonA>
          </>
        }
      />
    </div>
  );
}
