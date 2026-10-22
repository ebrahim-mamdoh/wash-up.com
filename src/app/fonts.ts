import { Unbounded } from "next/font/google";
import localFont from "next/font/local";

/**
 * Body and Arabic headings: Thmanyah Sans (self-hosted, same files as the Qhub site).
 * Only the three weights the design uses ship: 400 text, 700 for semibold/bold,
 * 900 for extrabold headings — each file is ~78 KB, so every extra weight costs.
 */
export const body = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "./fonts/thmanyahsans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/thmanyahsans-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/thmanyahsans-Black.woff2", weight: "900", style: "normal" },
  ],
});

/**
 * Latin display face for the wordmark and English headings — wide and geometric,
 * close to the "WASHUP" lettering. Downloaded at build time and served from our
 * own origin by next/font, so there is no request to Google at runtime.
 */
export const displayLatin = Unbounded({
  variable: "--font-display-latin",
  display: "swap",
  subsets: ["latin"],
  weight: ["800"],
  // Preloaded (~21 KB): without it the English headings swap from a much
  // narrower fallback after first paint and the whole hero shifts (CLS 0.17).
});
