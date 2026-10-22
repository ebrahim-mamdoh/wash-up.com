import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PartnersView } from "@/modules/partners/PartnersView";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { absolute: t("partnersTitle") },
    description: t("partnersDescription"),
    alternates: { languages: { ar: "/partners", en: "/en/partners" } },
  };
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PartnersView />;
}
