import { useTranslations } from "next-intl";
import {
  BadgePercent,
  CalendarClock,
  Car,
  CircleCheck,
  LayoutList,
  MapPinned,
  MessageCircleHeart,
  Radar,
  RefreshCw,
  Star,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/shared/ui/Section";
import { Reveal } from "@/shared/ui/Reveal";
import { IconTile, SpotlightCard } from "@/shared/ui/SpotlightCard";

type Item = { key: string; title: string; body: string };

const META: Record<string, { icon: LucideIcon; tone: "brand" | "navy" | "aqua" | "amber" | "green"; span?: string }> = {
  map: { icon: MapPinned, tone: "brand", span: "lg:col-span-2" },
  compare: { icon: LayoutList, tone: "navy" },
  slot: { icon: CalendarClock, tone: "brand" },
  offers: { icon: BadgePercent, tone: "aqua" },
  garage: { icon: Car, tone: "navy" },
  pay: { icon: Wallet, tone: "green" },
  live: { icon: Radar, tone: "brand", span: "lg:col-span-2" },
  reviews: { icon: MessageCircleHeart, tone: "amber", span: "lg:col-span-2" },
  reschedule: { icon: RefreshCw, tone: "aqua" },
};

/** Grid order: 2+1, 1+1+1, 1+2, 2+1 — the wide cards alternate sides. */
const ORDER = ["map", "compare", "slot", "offers", "garage", "pay", "live", "reviews", "reschedule"];

function MapVisual() {
  return (
    <div className="relative mt-6 h-[150px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[#e8f1fb]">
      <svg viewBox="0 0 600 150" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M-20 120 C80 90 160 130 260 100 S440 40 620 70" fill="none" stroke="#bfe0ff" strokeWidth="22" />
        <g stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round">
          <path d="M0 40 L600 60" />
          <path d="M140 0 L180 150" />
          <path d="M360 0 L330 150" />
          <path d="M500 0 L520 150" />
          <path d="M0 100 L600 130" />
        </g>
        {/* Route from "you" to the chosen wash */}
        <path d="M290 112 C300 90 340 70 372 52" fill="none" stroke="#1b74f5" strokeWidth="4" strokeDasharray="8 7" strokeLinecap="round" />
      </svg>
      {[
        { x: "18%", y: "40%", r: "4.6" },
        { x: "62%", y: "32%", r: "4.9" },
        { x: "86%", y: "70%", r: "4.7" },
      ].map((p, i) => (
        <span key={i} className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center" style={{ left: p.x, top: p.y }}>
          <span className="mb-1 flex items-center gap-0.5 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#0b1b3a] shadow">
            <Star className="size-2.5 fill-[#f59e0b] text-[#f59e0b]" />
            <span className="num">{p.r}</span>
          </span>
          <span className="grid size-7 place-items-center rounded-full bg-brand-600 text-white shadow-lg ring-4 ring-white">
            <Car className="size-3.5" />
          </span>
        </span>
      ))}
      <span className="absolute left-[48%] top-[74%] grid size-5 place-items-center rounded-full bg-white shadow">
        <span className="size-3 rounded-full bg-[#0f2a66]" />
        <span className="absolute inset-0 rounded-full bg-[#0f2a66]/30" style={{ animation: "wu-pulse-ring 2s ease-out infinite" }} />
      </span>
    </div>
  );
}

function LiveVisual({ labels }: { labels: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-1.5">
      {labels.map((label, i) => (
        <span key={label} className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[12px] font-semibold whitespace-nowrap ${
              i < 4 ? "bg-brand-600 text-white" : "border border-[var(--border)] bg-[var(--bg)] text-[var(--fg-subtle)]"
            }`}
          >
            {i < 4 ? <CircleCheck className="size-3.5" /> : <span className="size-2 rounded-full bg-[var(--border-strong)]" />}
            {label}
          </span>
          {i < labels.length - 1 && <span className={`h-0.5 w-3 rounded-full ${i < 3 ? "bg-brand-500" : "bg-[var(--border-strong)]"}`} />}
        </span>
      ))}
    </div>
  );
}

function ReviewsVisual() {
  return (
    <div className="mt-6 flex gap-3">
      {[5, 5, 4].map((stars, i) => (
        <div key={i} className={`min-w-0 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-3 ${i === 2 ? "hidden sm:block" : ""}`} style={{ rotate: `${(i - 1) * 2}deg` }}>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, s) => (
              <Star key={s} className={`size-3.5 ${s < stars ? "fill-[#f59e0b] text-[#f59e0b]" : "text-[var(--border-strong)]"}`} />
            ))}
          </div>
          <div className="mt-2.5 h-2 w-4/5 rounded-full bg-[var(--border)]" />
          <div className="mt-1.5 h-2 w-3/5 rounded-full bg-[var(--border)]" />
        </div>
      ))}
    </div>
  );
}

export function Features() {
  const t = useTranslations("features");
  const journey = useTranslations("journey");
  const items = new Map((t.raw("items") as Item[]).map((i) => [i.key, i]));
  const stageLabels = (journey.raw("stages") as { title: string }[]).map((s) => s.title);

  return (
    <Section id="features" glow>
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} highlight={t.raw("highlight") as string[]} description={t("lede")} className="mb-14" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {ORDER.map((key, i) => {
            const item = items.get(key);
            if (!item) return null;
            const meta = META[key];
            return (
              <Reveal key={key} delay={(i % 3) * 90} className={`min-w-0 ${meta.span ?? ""} ${meta.span ? "sm:col-span-2" : ""}`}>
                <SpotlightCard className="h-full p-6 sm:p-7">
                  <IconTile tone={meta.tone}>
                    <meta.icon className="size-6" />
                  </IconTile>
                  <h3 className="mt-5 text-[19px] font-bold text-[var(--fg)]">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.85] text-[var(--fg-muted)]">{item.body}</p>
                  {key === "map" && <MapVisual />}
                  {key === "live" && <LiveVisual labels={stageLabels} />}
                  {key === "reviews" && <ReviewsVisual />}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
