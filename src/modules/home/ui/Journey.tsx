"use client";

import type { JourneyCopy } from "../copy";
import { useRef, useState, type ReactNode } from "react";
import { Radar } from "lucide-react";
import { Container, Eyebrow } from "@/shared/ui/Section";
import { WordsReveal } from "@/shared/ui/TextReveal";
import { PhoneFrame } from "@/shared/mock/Phone";
import { OrderTrackScreen } from "@/shared/mock/TrackScreen";
import { CarSilhouette } from "@/shared/mock/Car";
import { clamp01, easeInOut, lerp, pinnedProgress, stage, useScrollFrame } from "@/lib/scroll";

type Stage = { title: string; body: string; note: string };

/** Dusty grey → deep brand blue as the wash progresses. */
function carColor(clean: number) {
  const from = [138, 143, 152];
  const to = [22, 61, 143];
  const c = from.map((f, i) => Math.round(lerp(f, to[i], clean)));
  return `rgb(${c.join(",")})`;
}

/**
 * The wash bay, drawn left-to-right; the whole scene is mirrored in Arabic
 * so the car drives in the reading direction. Nothing inside it is text.
 */
function WashBay({ carRef, foamRef, sprayRef, sparkleRef, foam }: {
  foam: ReactNode;
  carRef: React.RefObject<HTMLDivElement | null>;
  foamRef: React.RefObject<HTMLDivElement | null>;
  sprayRef: React.RefObject<HTMLDivElement | null>;
  sparkleRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative h-[330px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] rtl:-scale-x-100">
      {/* Gantry */}
      <div aria-hidden className="absolute bottom-[38px] left-1/2 h-[230px] w-[82%] -translate-x-1/2 rounded-t-[30px] border-x-[12px] border-t-[12px] border-[#1d4fb3]/80 shadow-[0_0_40px_rgba(56,182,255,.25)]" />
      <div aria-hidden className="absolute bottom-[256px] left-1/2 h-1.5 w-[64%] -translate-x-1/2 rounded-full bg-[#38b6ff]/60" />
      {/* Spray bars */}
      <div ref={sprayRef} aria-hidden className="absolute bottom-[96px] left-1/2 flex h-[160px] w-[74%] -translate-x-1/2 justify-between opacity-0" style={{ transformOrigin: "top" }}>
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className="h-[150px] w-[3px] rounded-full bg-gradient-to-b from-[#8ecdff] to-transparent"
            style={{ animation: `wu-spray ${0.9 + (i % 3) * 0.25}s ease-in-out ${i * 0.08}s infinite`, transformOrigin: "top" }}
          />
        ))}
      </div>
      {/* Foam */}
      <div ref={foamRef} className="absolute inset-x-[15%] bottom-0 top-0 opacity-0">
        {foam}
      </div>
      {/* Ground */}
      <div aria-hidden className="absolute inset-x-0 bottom-[38px] h-px bg-white/15" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[38px] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.06)_0_40px,transparent_40px_80px)]" />
      {/* Car */}
      <div ref={carRef} className="absolute bottom-[30px] left-0 w-[64%] max-w-[300px]" style={{ willChange: "translate", color: carColor(0), translate: "-110% 0" }}>
        <CarSilhouette className="h-auto w-full" />
        <div ref={sparkleRef} aria-hidden className="absolute inset-0 opacity-0">
          {[
            { x: "22%", y: "18%", d: 0 },
            { x: "58%", y: "8%", d: 0.4 },
            { x: "80%", y: "34%", d: 0.8 },
          ].map((s, i) => (
            <span key={i} className="absolute text-white" style={{ left: s.x, top: s.y, animation: `wu-pop 1.4s ease-in-out ${s.d}s infinite alternate` }}>
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The pinned tracking scene (desktop only). Loaded on demand by
 * <JourneyDesktop /> when the section nears the viewport on a wide screen;
 * `foam` (the bay's bubbles) is server-rendered markup passed through.
 */
export function JourneyScene({ foam, copy }: { foam: ReactNode; copy: JourneyCopy }) {
  const stages: Stage[] = copy.stages;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const foamRef = useRef<HTMLDivElement>(null);
  const sprayRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useScrollFrame(
    sectionRef,
    (section) => {
      if (window.innerWidth < 1024) return;
      const p = pinnedProgress(section);
      const n = stages.length;
      const index = Math.min(n - 1, Math.floor(p * n));
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
      barsRef.current.forEach((bar, i) => {
        if (bar) bar.style.transform = `scaleX(${clamp01(p * n - i)})`;
      });

      // Car path across the bay (in % of the scene width, scene is LTR-drawn):
      // drive in → wait at the entrance → under the gantry → parked clean → drive out.
      const car = carRef.current;
      if (car) {
        const scene = car.parentElement as HTMLElement;
        const w = scene.offsetWidth;
        const carW = car.offsetWidth;
        // Waits at the entrance with its nose just inside the bay, then rolls to the centre.
        const xIn = lerp(-carW, -carW * 0.45, easeInOut(stage(p, 0.12, 0.33)));
        const xBay = lerp(0, w * 0.5 - carW / 2 + carW * 0.45, easeInOut(stage(p, 0.42, 0.55)));
        const xOut = lerp(0, w, easeInOut(stage(p, 0.86, 1)));
        car.style.translate = `${(xIn + xBay + xOut).toFixed(1)}px 0`;
        const clean = easeInOut(stage(p, 0.52, 0.68));
        car.style.color = carColor(clean);
      }
      const washing = stage(p, 0.48, 0.54) * (1 - stage(p, 0.68, 0.72));
      if (sprayRef.current) sprayRef.current.style.opacity = String(washing);
      if (foamRef.current) foamRef.current.style.opacity = String(washing);
      if (sparkleRef.current) sparkleRef.current.style.opacity = String(stage(p, 0.68, 0.74) * (1 - stage(p, 0.9, 0.95)));
    },
    () => {
      activeRef.current = stages.length - 2;
      setActive(stages.length - 2);
    },
  );

  return (
    // Fills the whole (tall) section; its child is the sticky screen being pinned.
    <div ref={sectionRef} className="absolute inset-0">
      <div className="sticky top-0 flex h-screen items-center">
        <Container className="grid grid-cols-[1fr_1.1fr] items-center gap-14">
          <div>
            <Eyebrow icon={<Radar className="size-4 text-brand-300" />}>{copy.eyebrow}</Eyebrow>
            <WordsReveal text={copy.title} highlight={copy.highlight} className="mt-5 text-[clamp(30px,3.6vw,48px)] leading-[1.2]" />
            <p className="mt-4 max-w-[480px] text-[17px] leading-[1.85] text-[var(--fg-muted)]">{copy.lede}</p>

            <ol className="mt-8 flex flex-col gap-2">
              {stages.map((s, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li
                    key={s.title}
                    className={`relative overflow-hidden rounded-2xl border px-4 py-3 transition-all duration-500 ease-[var(--ease-out-expo)] ${
                      on ? "border-brand-400/50 bg-white/[0.08]" : "border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`num grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold transition-colors duration-500 ${
                          on || done ? "bg-brand-grad text-white" : "bg-white/10 text-[var(--fg-subtle)]"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={`text-[16px] font-bold transition-colors duration-500 ${on ? "text-white" : done ? "text-[var(--fg-muted)]" : "text-[var(--fg-subtle)]"}`}>
                        {s.title}
                      </span>
                    </div>
                    <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <p className="overflow-hidden ps-10 pt-1 text-[14.5px] leading-[1.8] text-[var(--fg-muted)]">{s.body}</p>
                    </div>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5">
                      <span
                        ref={(el) => {
                          barsRef.current[i] = el;
                        }}
                        className="block h-full origin-left bg-brand-grad rtl:origin-right"
                        style={{ transform: "scaleX(0)" }}
                      />
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex items-end gap-5">
            <div className="min-w-0 flex-1">
              <WashBay carRef={carRef} foamRef={foamRef} sprayRef={sprayRef} sparkleRef={sparkleRef} foam={foam} />
            </div>
            <div className="w-[220px] shrink-0 xl:w-[240px]">
              <PhoneFrame>
                <OrderTrackScreen active={active} copy={copy} />
              </PhoneFrame>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
