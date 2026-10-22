/**
 * Site-wide links in one place. Values marked TODO are placeholders until the
 * real ones exist (store listings, contact inbox) — swap them here only.
 */
export const SITE = {
  name: "WashUp",
  url: "https://washup-eg.vercel.app", // TODO: switch to the custom domain once it is bought
  /** Partner portal (vendor app on Vercel). */
  partnerPortalUrl: "https://washup-vendor.vercel.app/login",
  /** TODO: real store listings once the customer app is published. */
  appStoreUrl: "#download",
  playStoreUrl: "#download",
  /** TODO: real partner sales inbox. */
  partnersEmail: "partners@washup.app",
  supportEmail: "support@washup.app",
} as const;
