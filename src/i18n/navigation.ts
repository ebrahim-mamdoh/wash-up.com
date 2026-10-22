import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Locale-aware `Link` / `usePathname` / `getPathname`. */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
