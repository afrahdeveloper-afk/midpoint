"use client";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/data/i18n";
import { emit, persist, setIntent, type Intent, type SectionKey } from "./store";
import { prefersReduced, useLocale } from "./hooks";

const brandPathRe = /^\/(ar|en)\/brands\/([^/?#]+)/;
export const currentBrandSlug = (pathname: string | null) => pathname?.match(brandPathRe)?.[2] ?? null;

/** Wipe transition state (the five navy slabs between two brand pages). */
export const wipe = { covered: false };

/**
 * Navigate to a brand page. Between two brand pages it plays the slab wipe first
 * (cover 520 ms → swap → uncover), exactly like the original hash router.
 */
export function useGoBrand() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  return useCallback(
    (slug: string, e?: { preventDefault(): void }) => {
      const href = `/${locale}/brands/${slug}`;
      const from = currentBrandSlug(pathname);
      if (from && from !== slug && !prefersReduced()) {
        e?.preventDefault();
        router.prefetch(href);
        wipe.covered = true;
        emit("wipe", "cover");
        setTimeout(() => router.push(href), 520);
        return;
      }
      if (!e) router.push(href);
    },
    [locale, pathname, router],
  );
}

/** Go to a home-page section from anywhere, optionally carrying an intent (prefill, open drawer…). */
export function useGoHome() {
  const router = useRouter();
  const locale = useLocale();
  return useCallback(
    (sec: SectionKey, intent?: Intent) => {
      if (intent) setIntent(intent);
      router.push(`/${locale}#${sec}`);
    },
    [locale, router],
  );
}

/**
 * Switch language on the same page (/ar/brands/roca ↔ /en/brands/roca), keeping the
 * scroll position. `focusSel` is re-focused after the new tree mounts (like the original).
 */
export function useSwitchLang() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  return useCallback(
    (to: Locale, focusSel?: string) => {
      if (to === locale) return;
      persist.langSwitch = true;
      persist.focusSel = focusSel ?? null;
      try {
        document.cookie = `${LOCALE_COOKIE}=${to};path=/;max-age=31536000;samesite=lax`;
      } catch {}
      const next = (pathname ?? `/${locale}`).replace(/^\/(ar|en)(?=\/|$)/, `/${to}`);
      router.replace(next + location.hash, { scroll: false });
    },
    [locale, pathname, router],
  );
}
