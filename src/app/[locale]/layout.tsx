import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { body, displayLatin } from "../fonts";
import { routing } from "@/i18n/routing";
import { dirOf, ogLocale, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { Navbar } from "@/shared/layout/Navbar";
import { NAV_KEYS, type NavLabels } from "@/shared/layout/nav-keys";
import { Footer } from "@/shared/layout/Footer";
import { Effects } from "@/shared/ui/Effects";

export const viewport: Viewport = {
  themeColor: "#f7fafd",
};

type LayoutProps = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t("title"), template: "%s | WashUp" },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: { languages: { ar: "/", en: "/en" } },
    openGraph: {
      type: "website",
      locale: ogLocale(locale as Locale),
      siteName: "WashUp",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  // Client components receive their strings already translated as props, so no
  // messages (and no ICU formatter) are shipped to the browser — the provider
  // only carries the locale for locale-aware links.
  const tn = await getTranslations({ locale, namespace: "nav" });
  const navLabels = Object.fromEntries(NAV_KEYS.map((k) => [k, tn(k)])) as NavLabels;

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      data-scroll-behavior="smooth"
      // The inline script adds `js` to the class list before hydration.
      suppressHydrationWarning
      className={`${body.variable} ${displayLatin.variable} h-full antialiased`}
      // `--dir-x` flips horizontal entrance offsets for RTL.
      style={{ ["--dir-x" as string]: locale === "ar" ? "1" : "-1" }}
    >
      <head>
        {/* Marks JS as available before first paint, so reveal-on-scroll may hide content it will animate in. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider locale={locale} messages={{}}>
          <Effects />
          <Navbar labels={navLabels} />
          {/* `clip`, not `hidden`: no horizontal scroll, and sticky scenes keep the viewport as their scroller. */}
          <main className="flex-1 overflow-x-clip">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
