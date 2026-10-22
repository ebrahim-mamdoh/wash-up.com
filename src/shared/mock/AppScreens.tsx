import { useTranslations } from "next-intl";
import { Armchair, Bell, CalendarCheck, Car, ChevronDown, Droplets, Heart, House, MapPin, Search, Sparkles, Star, User } from "lucide-react";
import { WashUpMark } from "@/shared/brand/Logo";
import { StatusBar } from "./Phone";

const WASH_TONES = ["#1b74f5", "#0f2a66", "#22b8f0"];
const WASH_META = [
  { rating: "4.8", reviews: "320", km: "2.1", min: "10-15" },
  { rating: "4.6", reviews: "190", km: "3.4", min: "15-20" },
  { rating: "4.7", reviews: "210", km: "4.1", min: "20-25" },
];

/** Stylised city map with roads, the Nile and pulsing wash pins. */
function MiniMap() {
  return (
    <div className="relative h-[118px] overflow-hidden rounded-2xl bg-[#e8f1fb]">
      <svg viewBox="0 0 260 120" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M-10 92 C40 70 70 100 120 78 S210 40 270 58" fill="none" stroke="#bfe0ff" strokeWidth="14" />
        <g stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round">
          <path d="M0 30 L260 44" />
          <path d="M70 0 L92 120" />
          <path d="M170 0 L150 120" />
          <path d="M0 70 L260 96" />
        </g>
        <g stroke="#d6e4f3" strokeWidth="2" fill="none">
          <path d="M20 0 L36 120" />
          <path d="M220 0 L206 120" />
          <path d="M0 10 L260 16" />
        </g>
      </svg>
      {[
        { x: "24%", y: "34%", d: 0 },
        { x: "62%", y: "22%", d: 0.6 },
        { x: "76%", y: "64%", d: 1.2 },
      ].map((p, i) => (
        <span key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: p.x, top: p.y }}>
          <span
            className="absolute left-1/2 top-full size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/40"
            style={{ animation: `wu-pulse-ring 2.4s ease-out ${p.d}s infinite` }}
          />
          <MapPin className="relative size-6 fill-brand-600 text-white drop-shadow" strokeWidth={1.6} />
        </span>
      ))}
      {/* You are here */}
      <span className="absolute left-[46%] top-[58%] grid size-4 place-items-center rounded-full bg-white shadow">
        <span className="size-2.5 rounded-full bg-[#0f2a66]" />
      </span>
    </div>
  );
}

/** The customer app's home screen: location, search, categories, map and nearby washes. */
export function AppHomeScreen() {
  const t = useTranslations("app");
  const categories = t.raw("categories") as string[];
  const washes = t.raw("washes") as { name: string; area: string }[];
  const tabs = t.raw("tabs") as string[];
  const catIcons = [Sparkles, Car, Armchair, Droplets];
  const tabIcons = [House, CalendarCheck, Heart, User];

  return (
    <div className="flex h-full flex-col text-[#0b1b3a]">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-1">
        <span dir="ltr" className="inline-flex items-center gap-1.5">
          <WashUpMark className="h-4 w-auto" />
          <span className="text-[12px] font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display-latin)" }}>
            WASH<span className="text-brand-600">UP</span>
          </span>
        </span>
        <span className="relative grid size-7 place-items-center rounded-full bg-white shadow-sm">
          <Bell className="size-3.5" />
          <span className="absolute end-1 top-1 size-1.5 rounded-full bg-[#ef4444]" />
        </span>
      </div>

      <div className="px-4 pt-2.5">
        <div className="flex items-center gap-1 text-[10.5px] text-[#5f6b80]">
          <MapPin className="size-3 text-brand-600" />
          {t("location")}
          <ChevronDown className="size-3" />
        </div>
        <div className="mt-2 flex h-8 items-center gap-2 rounded-xl bg-white px-2.5 text-[10.5px] text-[#5f6b80] shadow-sm">
          <Search className="size-3.5" />
          {t("search")}
        </div>
        <div className="mt-2.5 grid grid-cols-4 gap-1.5">
          {categories.map((c, i) => {
            const Icon = catIcons[i];
            return (
              <div
                key={c}
                className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-[9.5px] font-semibold ${i === 0 ? "bg-brand-600 text-white" : "bg-white text-[#45536b] shadow-sm"}`}
              >
                <Icon className="size-3.5" />
                {c}
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 pt-2.5">
        <MiniMap />
      </div>

      <div className="flex items-center justify-between px-4 pt-2.5 text-[11px]">
        <span className="font-bold">{t("nearby")}</span>
        <span className="text-[10px] font-semibold text-brand-600">{t("seeAll")}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-4 pt-1.5">
        {washes.map((w, i) => (
          <div key={w.name} className="flex items-center gap-2 rounded-xl bg-white p-1.5 shadow-sm">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-lg text-white"
              style={{ background: `linear-gradient(135deg, ${WASH_TONES[i]}, #38b6ff)` }}
            >
              <Car className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[10.5px] font-bold">{w.name}</div>
              <div className="flex items-center gap-1 text-[9px] text-[#5f6b80]">
                <Star className="size-2.5 fill-[#f59e0b] text-[#f59e0b]" />
                <span className="num">{WASH_META[i].rating}</span>
                <span className="num">({WASH_META[i].reviews})</span>
                <span>·</span>
                <span className="num" dir="ltr">
                  {WASH_META[i].km} {t("km")}
                </span>
              </div>
            </div>
            <span className="rounded-lg bg-brand-600 px-2.5 py-1 text-[9.5px] font-bold text-white">{t("book")}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-4 border-t border-[#e1e8f1] bg-white px-2 pb-4 pt-1.5">
        {tabs.map((tab, i) => {
          const Icon = tabIcons[i];
          return (
            <span key={tab} className={`flex flex-col items-center gap-0.5 text-[8.5px] font-semibold ${i === 0 ? "text-brand-600" : "text-[#5f6b80]"}`}>
              <Icon className="size-3.5" />
              {tab}
            </span>
          );
        })}
      </div>
    </div>
  );
}
