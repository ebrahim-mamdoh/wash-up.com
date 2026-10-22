import { useTranslations } from "next-intl";
import { Bell, CalendarDays, ChartColumn, ChevronDown, LayoutDashboard, Radio, Star, Store, Users, Wallet, type LucideIcon } from "lucide-react";
import { WashUpMark } from "@/shared/brand/Logo";

type Source = "app" | "walk_in" | "phone";

const SOURCE_TONE: Record<Source, string> = { app: "#1b74f5", walk_in: "#0ea5e9", phone: "#7c3aed" };

/* Order cards per kanban column (plates are Egyptian-style: letters + digits). */
const COLUMNS: { plate: string; service: string; time: string; source: Source; late?: boolean }[][] = [
  [
    { plate: "ق ل م 482", service: "Full", time: "10:30", source: "app" },
    { plate: "ب ج د 1290", service: "Ext", time: "11:00", source: "phone" },
  ],
  [{ plate: "س ر ع 731", service: "Int", time: "10:15", source: "app" }],
  [
    { plate: "أ ك ن 5521", service: "Full", time: "09:50", source: "walk_in" },
    { plate: "ه و ي 316", service: "Deep", time: "09:40", source: "app", late: true },
  ],
  [{ plate: "ط م ر 802", service: "Ext", time: "09:20", source: "walk_in" }],
];

const SERVICE_LABEL: Record<string, { ar: string; en: string }> = {
  Full: { ar: "داخلي وخارجي", en: "Inside & out" },
  Ext: { ar: "غسيل خارجي", en: "Exterior" },
  Int: { ar: "غسيل داخلي", en: "Interior" },
  Deep: { ar: "تنظيف عميق", en: "Deep clean" },
};

const NAV: LucideIcon[] = [LayoutDashboard, Radio, CalendarDays, Users, Wallet, ChartColumn, Store];

/** The partner portal's live-operations screen, in a browser window. */
export function DashboardMock({ locale, className = "" }: { locale: "ar" | "en"; className?: string }) {
  const t = useTranslations("partners.dashboard");
  const kpis = t.raw("kpis") as { label: string; value: string; unit: string }[];
  const columns = t.raw("columns") as string[];

  return (
    <div aria-hidden className={`overflow-hidden rounded-[22px] border border-white/15 bg-[#f6f9fd] text-[#0b1b3a] shadow-[0_50px_100px_-40px_rgba(0,0,0,.7)] ${className}`}>
      {/* Window chrome */}
      <div dir="ltr" className="flex items-center gap-2 border-b border-[#e1e8f1] bg-white px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto rounded-md bg-[#eff4fa] px-10 py-1 text-[10px] text-[#5f6b80]">partners.washup.app/live</span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-14 shrink-0 flex-col items-center gap-3 border-e border-[#e1e8f1] bg-white py-4 sm:flex">
          <WashUpMark className="h-4 w-auto" />
          {NAV.map((Icon, i) => (
            <span key={i} className={`grid size-8 place-items-center rounded-lg ${i === 1 ? "bg-brand-600 text-white" : "text-[#5f6b80]"}`}>
              <Icon className="size-4" />
            </span>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-[13px] font-extrabold">{t("title")}</div>
              <div className="mt-0.5 flex items-center gap-1 text-[10px] text-[#5f6b80]">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#16a34a] opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[#16a34a]" />
                </span>
                {t("branch")}
                <ChevronDown className="size-3" />
              </div>
            </div>
            <span className="relative grid size-7 place-items-center rounded-full bg-white shadow-sm">
              <Bell className="size-3.5" />
              <span className="num absolute -end-1 -top-1 grid size-3.5 place-items-center rounded-full bg-[#ef4444] text-[8px] font-bold text-white">2</span>
            </span>
          </div>

          {/* KPIs */}
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            {kpis.map((k, i) => (
              <div key={k.label} className="rounded-xl border border-[#e1e8f1] bg-white p-2.5">
                <div className="text-[9.5px] text-[#5f6b80]">{k.label}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="num text-[16px] font-extrabold">{k.value}</span>
                  {k.unit && <span className="text-[9px] text-[#5f6b80]">{k.unit}</span>}
                  {i === 3 && <Star className="size-3 fill-[#f59e0b] text-[#f59e0b]" />}
                </div>
              </div>
            ))}
          </div>

          {/* Kanban */}
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            {columns.map((col, ci) => (
              <div key={col} className="rounded-xl bg-[#eef3f9] p-2">
                <div className="flex items-center justify-between px-1 pb-1.5 text-[10px] font-bold text-[#45536b]">
                  {col}
                  <span className="num rounded-full bg-white px-1.5 text-[9px]">{COLUMNS[ci].length}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {COLUMNS[ci].map((o) => (
                    <div key={o.plate} className={`rounded-lg border bg-white p-2 shadow-sm ${o.late ? "border-[#fca5a5]" : "border-transparent"}`}>
                      <div className="flex items-center justify-between gap-1">
                        <span className="rounded border border-[#0b1b3a]/20 px-1 text-[9.5px] font-bold">{o.plate}</span>
                        <span className="num text-[9px] text-[#5f6b80]">{o.time}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-1">
                        <span className="truncate text-[9.5px] text-[#45536b]">{SERVICE_LABEL[o.service][locale]}</span>
                        <span className="rounded-full px-1.5 py-px text-[8.5px] font-bold text-white" style={{ background: SOURCE_TONE[o.source] }}>
                          {t(`sources.${o.source}`)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
