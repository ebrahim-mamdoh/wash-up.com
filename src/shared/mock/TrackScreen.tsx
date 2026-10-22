import { CalendarCheck, Car, CircleCheck, ClipboardCheck, Droplets, MapPin, Sparkles, Star, Wallet } from "lucide-react";
import { StatusBar } from "./Phone";

/*
  The order-tracking screen lives apart from AppScreens on purpose: it renders
  inside the client tracking scene, and must not drag next-intl's message
  formatter (used by AppHomeScreen) into the browser bundle.
*/

const STAGE_ICONS = [ClipboardCheck, CalendarCheck, MapPin, Droplets, Sparkles, Wallet];

/** Strings for the tracking screen (from the `journey` namespace), passed in so it also renders inside client scenes. */
export type TrackCopy = { order: string; wash: string; service: string; stages: { title: string; note: string }[] };

/** The order-tracking screen, showing stage `active` (0..5) of the six order stages. */
export function OrderTrackScreen({ active, copy }: { active: number; copy: TrackCopy }) {
  const t = (key: "order" | "wash" | "service") => copy[key];
  const stages = copy.stages;
  const Icon = STAGE_ICONS[active];
  const ring = 2 * Math.PI * 34;
  const done = (active + 1) / stages.length;

  return (
    <div className="flex h-full flex-col text-[#0b1b3a]">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-1 text-[11px]">
        <span className="font-bold">
          {t("order")} <span className="num" dir="ltr">#CZ-10482</span>
        </span>
        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[9.5px] font-bold text-brand-700">{stages[active].note}</span>
      </div>

      <div className="mx-4 mt-2.5 flex items-center gap-2.5 rounded-2xl bg-white p-2.5 shadow-sm">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#38b6ff] to-[#1b74f5] text-white">
          <Car className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[10.5px] font-bold">{t("wash")}</span>
          <span className="block truncate text-[9.5px] text-[#5f6b80]">{t("service")}</span>
        </span>
      </div>

      {/* Progress ring */}
      <div className="mt-3 flex flex-col items-center">
        <div className="relative size-[96px]">
          <svg viewBox="0 0 80 80" className="size-full -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="#e1e8f1" strokeWidth="6" />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={ring}
              strokeDashoffset={ring * (1 - done)}
              style={{ transition: "stroke-dashoffset 700ms var(--ease-out-expo)" }}
            />
            <defs>
              <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#38b6ff" />
                <stop offset="1" stopColor="#1b74f5" />
              </linearGradient>
            </defs>
          </svg>
          <span key={active} className="absolute inset-0 grid place-items-center" style={{ animation: "wu-pop 500ms var(--ease-out-back) both" }}>
            <span className={`grid size-12 place-items-center rounded-full text-white ${active === 4 ? "bg-[#16a34a]" : "bg-brand-600"}`}>
              <Icon className="size-6" />
            </span>
          </span>
        </div>
        <span key={`t-${active}`} className="mt-2 text-[14px] font-extrabold" style={{ animation: "wu-rise 450ms var(--ease-out-expo) both" }}>
          {stages[active].title}
        </span>
      </div>

      {/* Timeline */}
      <ol className="mx-4 mt-3 flex flex-col gap-0 rounded-2xl bg-white p-3 shadow-sm">
        {stages.map((s, i) => {
          const state = i < active ? "done" : i === active ? "now" : "next";
          return (
            <li key={s.title} className="relative flex items-center gap-2.5 py-1">
              {i < stages.length - 1 && (
                <span className={`absolute start-[7px] top-[18px] h-[calc(100%-6px)] w-0.5 ${i < active ? "bg-brand-500" : "bg-[#e1e8f1]"}`} />
              )}
              <span
                className={`relative grid size-4 shrink-0 place-items-center rounded-full ${
                  state === "done" ? "bg-brand-600 text-white" : state === "now" ? "bg-white ring-2 ring-brand-600" : "bg-[#e1e8f1]"
                }`}
              >
                {state === "done" && <CircleCheck className="size-3" />}
                {state === "now" && <span className="size-1.5 rounded-full bg-brand-600" />}
              </span>
              <span className={`text-[10.5px] ${state === "next" ? "text-[#5f6b80]" : "font-bold"}`}>{s.title}</span>
            </li>
          );
        })}
      </ol>

      {active === 5 && (
        <div className="mx-4 mt-2.5 flex items-center justify-center gap-1 rounded-xl bg-[#fff7e6] py-2" style={{ animation: "wu-rise 450ms var(--ease-out-expo) both" }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-4 fill-[#f59e0b] text-[#f59e0b]" />
          ))}
        </div>
      )}
    </div>
  );
}
