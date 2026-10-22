"use client";

import { useLocale } from "next-intl";
import { useRef, type ReactNode } from "react";
import { BadgePercent, CalendarCheck, CircleCheck, MapPin, Star, type LucideIcon } from "lucide-react";
import { Arrow, Button } from "@/shared/ui/Button";
import { Eyebrow } from "@/shared/ui/Section";
import { WashUpMark } from "@/shared/brand/Logo";
import { kashida } from "@/lib/typography";
import { easeInOut, easeOut, lerp, pinnedProgress, stage, useScrollFrame } from "@/lib/scroll";

type CardKey = "nearby" | "slot" | "rating" | "offer" | "ready";

/** Hero strings, translated on the server (keys as in the `hero` namespace, cards flattened as `cards.<key>Title`). */
export type HeroCopy = { text: Record<string, string>; headline: string[]; highlightFrom: number };

/*
  Floating cards around the phone. x/y are % of the pinned screen: x0/y0 is
  where each card starts (scattered around the headline), x1/y1 where it
  gathers next to the phone. At the end of the scene every card merges into
  the phone — the whole story ends "inside one app".
  `x` is in reading direction: 100 = the start edge (right in Arabic).
*/
const CARDS: { key: CardKey; icon: LucideIcon; tone: string; x0: number; y0: number; x1: number; y1: number; tilt: number }[] = [
  { key: "nearby", icon: MapPin, tone: "#1b74f5", x0: 88, y0: 24, x1: 70, y1: 34, tilt: -4 },
  { key: "slot", icon: CalendarCheck, tone: "#0f2a66", x0: 90, y0: 56, x1: 71, y1: 58, tilt: 3 },
  { key: "rating", icon: Star, tone: "#f59e0b", x0: 11, y0: 22, x1: 29, y1: 30, tilt: 4 },
  { key: "offer", icon: BadgePercent, tone: "#22b8f0", x0: 9, y0: 52, x1: 28, y1: 52, tilt: -3 },
  { key: "ready", icon: CircleCheck, tone: "#16a34a", x0: 14, y0: 80, x1: 30, y1: 74, tilt: 2 },
];

/**
 * `phone` and `bubbles` are rendered on the server and passed in: they are the
 * heaviest markup in the hero and never change, so they skip hydration.
 */
export function Hero({ phone, bubbles, copy }: { phone: ReactNode; bubbles: ReactNode; copy: HeroCopy }) {
  const t = (key: string) => copy.text[key] ?? "";
  const isRtl = useLocale() === "ar";
  const { headline, highlightFrom } = copy;

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useScrollFrame(
    sectionRef,
    (section) => {
      const desktop = window.innerWidth >= 1024;
      const rtl = document.documentElement.dir === "rtl";
      const text = textRef.current;
      const phone = phoneRef.current;

      if (!desktop) {
        // Mobile: the phone sits in the flow under the buttons; only the mark drifts.
        if (text) text.style.cssText = "";
        if (phone) {
          phone.style.translate = "";
          phone.style.scale = "";
        }
        if (markRef.current) markRef.current.style.translate = `-50% calc(-50% + ${(window.scrollY * 0.25).toFixed(1)}px)`;
        return;
      }

      const p = pinnedProgress(section);
      const tText = easeOut(stage(p, 0, 0.32));
      const tPhone = easeOut(stage(p, 0, 0.42));
      const tGather = easeOut(stage(p, 0.08, 0.55));
      const tMerge = easeInOut(stage(p, 0.66, 0.96));

      if (text) {
        text.style.translate = `0 ${(-tText * 140).toFixed(1)}px`;
        text.style.opacity = String(1 - tText);
      }
      if (hintRef.current) hintRef.current.style.opacity = String(1 - stage(p, 0, 0.08));
      if (phone) {
        // Starts peeking under the buttons, rises to the centre of the screen.
        phone.style.translate = `-50% calc(-50% + ${lerp(window.innerHeight * 0.42, 0, tPhone).toFixed(1)}px)`;
        phone.style.scale = String(lerp(0.9, 1, tPhone));
      }
      if (markRef.current) {
        markRef.current.style.translate = `-50% calc(-50% + ${(-p * 160).toFixed(1)}px)`;
        markRef.current.style.rotate = `${(p * -8).toFixed(2)}deg`;
        markRef.current.style.scale = String(1 + p * 0.15);
      }

      CARDS.forEach((c, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const x = lerp(lerp(c.x0, c.x1, tGather), 50, tMerge);
        const y = lerp(lerp(c.y0, c.y1, tGather), 52, tMerge);
        el.style.left = `${rtl ? x : 100 - x}%`;
        el.style.top = `${y}%`;
        el.style.scale = String(lerp(1, 0.35, tMerge));
        el.style.opacity = String(1 - stage(tMerge, 0.55, 1));
      });
    },
    () => {
      // Reduced motion: the gathered layout — text visible, phone centred, cards beside it.
      if (window.innerWidth < 1024) return;
      const rtl = document.documentElement.dir === "rtl";
      if (phoneRef.current) {
        phoneRef.current.style.translate = "-50% -50%";
        phoneRef.current.style.scale = "1";
        phoneRef.current.style.top = "calc(50% + 140px)";
      }
      CARDS.forEach((c, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        el.style.left = `${rtl ? c.x1 : 100 - c.x1}%`;
        el.style.top = `${c.y1 + 14}%`;
      });
    },
  );

  return (
    <section ref={sectionRef} aria-label={t("label")} className="relative lg:h-[250vh]">
      <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-screen">
        {/* ===== Background ===== */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#e9f5ff] via-[var(--bg)] to-[var(--bg)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-radial-center" />
        <div
          aria-hidden
          // A wide, soft radial gradient instead of a blur() filter: same glow, no costly raster.
          className="animate-orb pointer-events-none absolute left-1/2 top-[30%] h-[640px] w-[1100px] max-w-[140vw] -translate-x-1/2"
          style={{ background: "radial-gradient(closest-side, rgba(56,182,255,.26), rgba(27,116,245,.10) 50%, transparent)" }}
        />
        <div ref={markRef} aria-hidden className="pointer-events-none absolute left-1/2 top-[44%] w-[1100px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" style={{ willChange: "translate, rotate, scale" }}>
          <WashUpMark className="h-auto w-full" />
        </div>
        {bubbles}

        {/* ===== Floating cards (desktop) ===== */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
          {CARDS.map((c, i) => (
            <div
              key={c.key}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${isRtl ? c.x0 : 100 - c.x0}%`, top: `${c.y0}%`, willChange: "left, top, scale, opacity" }}
            >
              <div style={{ animation: `wu-pop 820ms var(--ease-out-expo) ${600 + i * 120}ms both` }}>
                <div
                  className="flex w-[236px] items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-[var(--shadow-float)]"
                  style={{ rotate: `${c.tilt}deg` }}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white" style={{ background: c.tone }}>
                    <c.icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-bold text-[var(--fg)]">{t(`cards.${c.key}Title`)}</span>
                    <span className="line-clamp-2 block text-[12px] leading-snug text-[var(--fg-subtle)]">{t(`cards.${c.key}Body`)}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Content ===== */}
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-5 pt-[118px] sm:px-8 lg:h-full lg:pt-[128px]">
          <div ref={textRef} className="flex flex-col items-center text-center" style={{ willChange: "translate, opacity" }}>
            <span style={{ animation: "wu-rise 700ms var(--ease-out-expo) both" }}>
              <Eyebrow
                icon={
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand-600" />
                  </span>
                }
              >
                {t("badge")}
              </Eyebrow>
            </span>

            <h1 className="mt-6 max-w-[760px] text-balance text-[clamp(38px,6vw,76px)] leading-[1.08] text-[var(--fg)] lg:max-w-[min(760px,calc(60vw-120px))]">
              {headline.map((word, i) => {
                const hot = i >= highlightFrom;
                return (
                  <span
                    key={`${word}-${i}`}
                    className={`inline-block whitespace-pre ${hot ? "text-brand-grad" : ""}`}
                    style={{ animation: `wu-focus 760ms var(--ease-out-expo) ${i * 70}ms both` }}
                  >
                    {hot && i === highlightFrom ? kashida(word) : word}
                    {i < headline.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </h1>

            <p
              className="mt-5 max-w-[600px] text-pretty text-[17px] leading-[1.8] text-[var(--fg-muted)] sm:text-[18.5px]"
              style={{ animation: "wu-focus 800ms var(--ease-out-expo) 240ms both" }}
            >
              {t("lede")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animation: "wu-rise 800ms var(--ease-out-expo) 440ms both" }}>
              <Button href="/#download" size="lg">
                {t("ctaDownload")}
                <Arrow />
              </Button>
              <Button href="/partners" size="lg" variant="secondary">
                {t("ctaPartners")}
              </Button>
            </div>
          </div>

          {/* Phone: in the flow on mobile, centred and driven by the scroll on desktop. */}
          <div
            ref={phoneRef}
            className="relative mt-12 mb-16 w-[280px] sm:w-[300px] lg:absolute lg:left-1/2 lg:top-[calc(50%+35px)] lg:mt-0 lg:mb-0 lg:w-[min(300px,calc((100vh-110px)*0.47))] lg:[translate:-50%_calc(-50%_+_42vh)] lg:scale-[0.9]"
            style={{ willChange: "translate, scale" }}
          >
            <div style={{ animation: "wu-rise 1000ms var(--ease-out-expo) 520ms both" }}>
              {/* Halo behind the device */}
              <div aria-hidden className="absolute -inset-16 -z-10 bg-[radial-gradient(closest-side,rgba(56,182,255,.4),rgba(56,182,255,.12)_55%,transparent)]" />
              {phone}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div ref={hintRef} aria-hidden className="pointer-events-none absolute bottom-8 start-8 z-10 hidden items-center gap-3 text-[12px] font-semibold text-[var(--fg-subtle)] lg:flex">
          <span className="relative h-9 w-[22px] rounded-full border-2 border-[var(--border-strong)]">
            <span className="absolute left-1/2 top-1.5 h-2 w-1 -translate-x-1/2 rounded-full bg-brand-600" style={{ animation: "wu-float 1.6s ease-in-out infinite" }} />
          </span>
          {t("scroll")}
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[var(--bg)]" />
      </div>
    </section>
  );
}
