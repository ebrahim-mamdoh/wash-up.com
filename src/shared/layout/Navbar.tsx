"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, getPathname, usePathname } from "@/i18n/navigation";
import { WashUpLogo } from "@/shared/brand/Logo";
import { Button, ButtonA } from "@/shared/ui/Button";
import { SITE } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import type { NavLabels } from "./nav-keys";

const LINKS = [
  { key: "how", href: "/#how" },
  { key: "features", href: "/#features" },
  { key: "services", href: "/#services" },
  { key: "partners", href: "/partners" },
  { key: "faq", href: "/#faq" },
] as const;


/** Full page load on purpose: the other locale has its own dir, fonts and messages. */
function LanguageToggle({ labels, className = "" }: { labels: NavLabels; className?: string }) {
  const t = (key: keyof NavLabels) => labels[key];
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const other: Locale = locale === "ar" ? "en" : "ar";
  return (
    <a
      href={getPathname({ href: pathname, locale: other })}
      hrefLang={other}
      aria-label={t("languageLabel")}
      className={`inline-flex h-9 items-center rounded-full px-3 text-[14px] font-semibold text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--fg)] ${className}`}
    >
      {t("language")}
    </a>
  );
}

/**
 * Labels arrive translated from the server layout, so the client bundle needs
 * no message formatting at all.
 */
export function Navbar({ labels }: { labels: NavLabels }) {
  const t = (key: keyof NavLabels) => labels[key];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow"
      >
        {t("skip")}
      </a>
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-expo)] ${
          scrolled || open
            ? "border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[70px] w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="WashUp" className="shrink-0" onClick={() => setOpen(false)}>
              <WashUpLogo />
            </Link>
            <ul className="hidden items-center gap-1 lg:flex">
              {LINKS.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    className="rounded-full px-3.5 py-2 text-[15px] text-[var(--fg-muted)] transition-colors duration-200 hover:bg-[var(--bg-subtle)] hover:text-[var(--fg)]"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visibility lives on wrappers: the buttons' own `inline-flex` would beat `hidden`. */}
          <div className="flex items-center gap-1.5">
            <span className="hidden sm:block">
              <LanguageToggle labels={labels} />
            </span>
            <span className="hidden lg:block">
              <ButtonA href={SITE.partnerPortalUrl} variant="ghost" size="sm">
                {t("partnerLogin")}
              </ButtonA>
            </span>
            <span className="hidden sm:block">
              <Button href="/#download" size="sm">
                {t("download")}
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("close") : t("menu")}
              className="grid size-10 place-items-center rounded-full text-[var(--fg)] transition-colors hover:bg-[var(--bg-subtle)] lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[70px] bottom-0 bg-[var(--bg)] transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 pt-4">
          {LINKS.map((l, i) => (
            <li
              key={l.key}
              style={{ transition: `opacity 500ms var(--ease-out-expo) ${open ? 60 + i * 50 : 0}ms, transform 500ms var(--ease-out-expo) ${open ? 60 + i * 50 : 0}ms`, opacity: open ? 1 : 0, transform: open ? "none" : "translateY(10px)" }}
            >
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3.5 text-[18px] font-semibold text-[var(--fg)] hover:bg-[var(--bg-subtle)]"
              >
                {t(l.key)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 px-5">
          <Button href="/#download" size="lg" onClick={() => setOpen(false)}>
            {t("download")}
          </Button>
          <ButtonA href={SITE.partnerPortalUrl} variant="secondary" size="lg">
            {t("partnerLogin")}
          </ButtonA>
          <LanguageToggle labels={labels} className="justify-center" />
        </div>
      </div>
    </header>
  );
}
