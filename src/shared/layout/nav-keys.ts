/** Navbar label keys (`nav` namespace). Kept out of the client Navbar module so the server layout can read the list. */
export const NAV_KEYS = ["home", "how", "features", "services", "partners", "faq", "download", "partnerLogin", "menu", "close", "language", "languageLabel", "skip"] as const;
export type NavLabels = Record<(typeof NAV_KEYS)[number], string>;
