import { useTranslations } from "next-intl";
import { WashUpMark } from "@/shared/brand/Logo";
import { Button } from "@/shared/ui/Button";

export default function NotFound() {
  const t = useTranslations("nav");
  return (
    <div className="grid min-h-[80vh] place-items-center px-5 pt-24 text-center">
      <div>
        <WashUpMark className="mx-auto h-20 w-auto animate-float" />
        <p className="num mt-8 text-[64px] leading-none font-extrabold text-brand-grad" dir="ltr">404</p>
        <div className="mt-8">
          <Button href="/" size="lg">
            {t("home")}
          </Button>
        </div>
      </div>
    </div>
  );
}
