import { useTranslations } from "next-intl";
import { SITE } from "@/lib/site";

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.65.8-3.33.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.74 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.15.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.32-3.5zM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.56-1.23z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path d="M3.6 2.2c-.3.3-.4.7-.4 1.2v17.2c0 .5.1.9.4 1.2l9.6-9.8z" fill="#34d399" />
      <path d="M16.4 15.2 13.2 12 3.6 21.8c.4.4 1 .4 1.7 0z" fill="#ef4444" />
      <path d="M20.3 10.9 16.4 8.8 13.2 12l3.2 3.2 3.9-2.2c1.1-.6 1.1-1.5 0-2.1z" fill="#facc15" />
      <path d="M16.4 8.8 5.3 2.2c-.7-.4-1.3-.4-1.7 0l9.6 9.8z" fill="#3b82f6" />
    </svg>
  );
}

/**
 * App Store / Google Play buttons. Links come from SITE (env). A store without a listing yet
 * renders as a non-link badge with "coming soon" (GAP-058) instead of linking back to the page.
 */
export function StoreBadges({ className = "" }: { className?: string }) {
  const t = useTranslations("download");
  const badge =
    "group inline-flex h-14 items-center gap-3 rounded-2xl bg-[#0b1b3a] px-5 text-white shadow-[0_14px_30px_-14px_rgba(11,27,58,.8)] ring-1 ring-white/10 transition-transform duration-300 ease-[var(--ease-out-expo)]";
  const stores = [
    { key: "appStore", href: SITE.appStoreUrl, glyph: <AppleGlyph /> },
    { key: "googlePlay", href: SITE.playStoreUrl, glyph: <PlayGlyph /> },
  ] as const;
  const missing = stores.some((s) => !s.href);
  return (
    <div>
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {stores.map((s) => {
          const body = (
            <>
              {s.glyph}
              <span className="text-start leading-tight">
                <span className="block text-[11px] text-white/70">{s.href ? t("getOn") : t("soonShort")}</span>
                <span className="block text-[17px] font-bold" dir="ltr">{t(s.key)}</span>
              </span>
            </>
          );
          return s.href ? (
            <a key={s.key} href={s.href} className={`${badge} hover:-translate-y-0.5`} aria-label={`${t("getOn")} ${t(s.key)}`}>
              {body}
            </a>
          ) : (
            <span key={s.key} className={`${badge} cursor-default opacity-80`} aria-disabled="true" title={t("soon")}>
              {body}
            </span>
          );
        })}
      </div>
      {missing ? <p className="mt-2 text-center text-[13px] opacity-70 lg:text-start">{t("soon")}</p> : null}
    </div>
  );
}
