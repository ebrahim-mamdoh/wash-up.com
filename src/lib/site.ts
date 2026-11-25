/**
 * Site-wide links in one place, overridable per deployment through env vars (GAP-058, GAP-101).
 * Store links stay null until the apps are live — the badges then say "coming soon" instead of
 * linking back to the page.
 */
const env = (v: string | undefined) => (v && v.trim() ? v.trim().replace(/\/$/, "") : null);

const portal = env(process.env.NEXT_PUBLIC_VENDOR_PORTAL_URL) ?? "https://washup-vendor.vercel.app";

export const SITE = {
  name: "WashUp",
  /** Canonical origin (metadata, Open Graph). Set NEXT_PUBLIC_SITE_URL to the custom domain when bought. */
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://washup-eg.vercel.app",
  /** Partner portal (vendor app). */
  partnerPortalUrl: `${portal}/login`,
  /** Partner application registration URL. */
  partnerRegisterUrl: env(process.env.NEXT_PUBLIC_VENDOR_REGISTER_URL) ?? `${portal}/register`,
  /** Store listings of the customer app; null = not published yet. */
  appStoreUrl: env(process.env.NEXT_PUBLIC_APP_STORE_URL),
  playStoreUrl: env(process.env.NEXT_PUBLIC_PLAY_STORE_URL),
  partnersEmail: env(process.env.NEXT_PUBLIC_PARTNERS_EMAIL) ?? "partners@washup.app",
  supportEmail: env(process.env.NEXT_PUBLIC_SUPPORT_EMAIL) ?? "support@washup.app",
} as const;
