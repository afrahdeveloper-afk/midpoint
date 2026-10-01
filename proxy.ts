import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE } from "@/data/i18n";

/**
 * Locale routing (Next.js 16 renamed `middleware.ts` to `proxy.ts`; same API).
 * Any path without /ar or /en is redirected to the visitor's last choice
 * (NEXT_LOCALE cookie, set by the language switch) or to Arabic by default.
 *   /              → /ar
 *   /brands/roca   → /ar/brands/roca
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : DEFAULT_LOCALE;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, metadata files and anything with a file extension (images, icons, og.jpg…).
  matcher: ["/((?!_next/|api/|sitemap.xml|robots.txt|.*\\..*).*)"],
};
