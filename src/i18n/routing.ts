import { defineRouting } from "next-intl/routing";

/**
 * Arabic (default) lives at the root with no prefix — `/partners` — and English
 * under `/en` — `/en/partners`. Same scheme as the Qhub site. Detection is off so
 * `/` is always Arabic, whatever the browser language.
 */
export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
