/**
 * Soap bubbles rising through a section. Pure CSS (one keyframe, GPU
 * transforms); positions come from a seeded generator so server and client
 * render the same markup.
 */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Bubble = { left: number; size: number; delay: number; duration: number; sway: number; opacity: number };

function makeBubbles(count: number, seed: number): Bubble[] {
  const rnd = seeded(seed);
  return Array.from({ length: count }, () => ({
    left: rnd() * 100,
    size: 6 + rnd() * 26,
    delay: -rnd() * 18,
    duration: 12 + rnd() * 14,
    sway: (rnd() - 0.5) * 60,
    opacity: 0.35 + rnd() * 0.5,
  }));
}

export function Bubbles({ count = 18, seed = 7, className = "" }: { count?: number; seed?: number; className?: string }) {
  const bubbles = makeBubbles(count, seed);
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-[-40px] rounded-full"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,.95) 0 14%, rgba(255,255,255,.25) 22%, rgba(56,182,255,.18) 60%, rgba(56,182,255,.32) 100%)",
            boxShadow: "inset 0 0 6px rgba(255,255,255,.6), 0 0 0 1px rgba(56,182,255,.25)",
            animation: `wu-bubble ${b.duration}s linear ${b.delay}s infinite`,
            ["--sway" as string]: `${b.sway}px`,
            ["--bubble-opacity" as string]: b.opacity,
          }}
        />
      ))}
    </div>
  );
}
