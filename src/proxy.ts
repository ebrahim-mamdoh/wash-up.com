import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Next 16's `proxy.ts` (was `middleware.ts`): maps `/` → ar and `/en/*` → en. */
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and anything with a file extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
