import { useTranslations } from "next-intl";
import type { TrackCopy } from "@/shared/mock/TrackScreen";

/** Live-tracking strings, read on the server and handed to client scenes as props. */
export type JourneyCopy = Omit<TrackCopy, "stages"> & {
  eyebrow: string;
  title: string;
  highlight: string[];
  lede: string;
  stages: { title: string; body: string; note: string }[];
};

export function useJourneyCopy(): JourneyCopy {
  const t = useTranslations("journey");
  return {
    eyebrow: t("eyebrow"),
    title: t("title"),
    highlight: t.raw("highlight") as string[],
    lede: t("lede"),
    order: t("order"),
    wash: t("wash"),
    service: t("service"),
    stages: t.raw("stages") as JourneyCopy["stages"],
  };
}
