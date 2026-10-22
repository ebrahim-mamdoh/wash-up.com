import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { WashUpLogo, WashUpMark } from "@/shared/brand/Logo";
import { Container } from "@/shared/ui/Section";
import { SITE } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  const linkClass = "text-[15px] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]";

  return (
    <footer className="cv-auto surface-ink relative overflow-hidden pt-20 pb-10">
      {/* Oversized mark drifting off the edge — the brand signature at the end of every page. */}
      <WashUpMark className="pointer-events-none absolute -bottom-24 -end-24 h-[340px] w-auto opacity-[0.07]" />
      <Container className="relative">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-[340px]">
            <WashUpLogo light />
            <p className="mt-5 text-[15px] leading-[1.9] text-[var(--fg-muted)]">{t("tagline")}</p>
            <p dir="ltr" className="mt-4 text-[11px] font-semibold tracking-[0.32em] text-[var(--fg-subtle)] rtl:text-right">
              CAR WASH BOOKING PLATFORM
            </p>
          </div>

          <div>
            <h3 className="text-[14px] font-bold tracking-wide text-white">{t("platform")}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li><Link href="/#how" className={linkClass}>{nav("how")}</Link></li>
              <li><Link href="/#features" className={linkClass}>{nav("features")}</Link></li>
              <li><Link href="/#services" className={linkClass}>{nav("services")}</Link></li>
              <li><Link href="/#faq" className={linkClass}>{nav("faq")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-bold tracking-wide text-white">{t("partners")}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li><Link href="/partners" className={linkClass}>{t("join")}</Link></li>
              <li><Link href="/partners#tour" className={linkClass}>{t("portalFeatures")}</Link></li>
              <li><a href={SITE.partnerPortalUrl} className={linkClass}>{nav("partnerLogin")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-bold tracking-wide text-white">{t("contact")}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href={`mailto:${SITE.supportEmail}`} className={`${linkClass} inline-flex items-center gap-2`}>
                  <Mail className="size-4" />
                  <span dir="ltr">{SITE.supportEmail}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.partnersEmail}`} className={`${linkClass} inline-flex items-center gap-2`}>
                  <Mail className="size-4" />
                  <span dir="ltr">{SITE.partnersEmail}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-[13px] text-[var(--fg-subtle)] sm:flex-row">
          <p>
            © <span className="num">{year}</span> WashUp. {t("rights")}
          </p>
          <p>{t("made")}</p>
        </div>
      </Container>
    </footer>
  );
}
