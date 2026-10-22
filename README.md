# WashUp — marketing website

The public face of WashUp, the car-wash booking platform: the story for car owners, the
partner pitch for car-wash owners, and the trust story behind the admin console.
Arabic (RTL) at `/`, English at `/en`.

## Run

```bash
npm install
npm run dev        # http://localhost:3400
npm run typecheck
npm run lint
npm run build && npm start
```

No environment variables are needed. Links that are still placeholders (store listings,
contact inboxes, production domain) live in `src/lib/site.ts` — change them there only.

## Stack

Same toolchain as the Qhub site it is modelled on: Next.js 16 (App Router, Turbopack),
React 19, TypeScript, Tailwind CSS 4, next-intl 4 (Arabic default, `localePrefix: "as-needed"`),
lucide-react. No animation library: motion is CSS keyframes/transitions plus one shared
scroll loop.

Fonts: Thmanyah Sans (self-hosted, 400/700/900) for Arabic and body text; Unbounded 800
(via `next/font`, served from our origin) for the wordmark and English headings.

## Structure

```
src/
  app/[locale]/        layout (html dir/lang, fonts, Navbar, Footer, <Effects/>), home, /partners
  i18n/                next-intl routing / request / navigation
  messages/{ar,en}.json  every visible string
  modules/home/        HomeView + sections (Hero, Problem, Steps, Features, Journey*, Services,
                       PartnersBand, Trust, Numbers, Download, HomeFaq), copy.ts
  modules/partners/    PartnersView + PortalTour + TourMocks
  shared/brand/        Logo (W ribbon mark + wordmark, SVG)
  shared/mock/         Phone frame, app screens, tracking screen, partner dashboard, car, bubbles
  shared/ui/           Reveal, WordsReveal, ScrollTintText, Parallax, SpotlightCard, ScrollTilt,
                       Counter, LazyMount, Button, Section, StoreBadges, Effects
  shared/sections/     StepsPath, Faq, FinalCta
  lib/                 scroll loop + helpers, typography (kashida), site links
```

## How the motion works (and why it is cheap)

- **Reveal / WordsReveal / Parallax / SpotlightCard are server components** that only write
  `data-*` attributes. A single client island, `shared/ui/Effects.tsx`, drives all of them:
  one IntersectionObserver flips `data-shown` (CSS runs the transition), one scroll loop moves
  `[data-parallax]` elements that are near the viewport, one delegated pointer listener feeds
  the card glow. Nothing per element hydrates. Without JS everything is simply visible
  (the hidden state only applies under `html.js`).
- **Scroll scenes** (hero, live tracking, steps path, tilt) use `useScrollFrame` from
  `lib/scroll.ts`: one shared `requestAnimationFrame`, gated by an IntersectionObserver so
  far-away scenes cost nothing, writing styles straight to the DOM (no React state per frame).
- **Below-the-fold sections** use `content-visibility: auto` (`.cv-auto`).
- **Decorative mocks** below the fold mount on approach (`LazyMount`); the desktop tracking
  scene is code-split and loaded only on wide screens (`JourneyDesktop`).
- **Client components receive translated strings as props** — no message catalogue or ICU
  formatter ships to the browser.
- Glows are radial gradients, never `filter: blur()`, and there is no `backdrop-filter` on
  animated layers: both are very expensive to rasterise on phones.
- `prefers-reduced-motion` stops every animation and shows final states.

## Conventions

- Text never lives in components: add keys to both `messages/ar.json` and `messages/en.json`.
- Logical properties (`ms/me/ps/pe/start/end`) so RTL and LTR both work; horizontal motion
  uses `--dir-x` or mirrors the scene (the wash bay is drawn LTR and flipped in Arabic).
- Western digits everywhere; numbers inside Arabic text use `.num` / `dir="ltr"`.
- Buttons put responsive visibility on a wrapper (`<span className="hidden lg:block">`),
  never on the button itself — its own `inline-flex` would beat `hidden`.

## Open items

- Replace the redrawn logo paths in `shared/brand/Logo.tsx` with the designer's master SVG.
- Real App Store / Google Play links, contact inboxes and the production domain (`lib/site.ts`).
- Partner applications currently open an email; they could post straight into the Super
  Admin's applications queue (Supabase) instead.
