import { routing, type AppLocale } from "@/i18n/routing";

export type Locale = AppLocale;
export const LOCALES = routing.locales;

/** A value in both languages — for structured demo data inside `modules/<x>/data`. */
export type Dual<T> = Record<Locale, T>;

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");
export const ogLocale = (locale: Locale) => (locale === "ar" ? "ar_EG" : "en_US");
