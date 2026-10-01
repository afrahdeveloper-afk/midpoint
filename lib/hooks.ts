"use client";
import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { useParams, usePathname } from "next/navigation";
import { isLocale, type Locale, DEFAULT_LOCALE } from "@/data/i18n";
import { isOpenNow } from "@/data/site";

/** useLayoutEffect on the client, no-op warning-free on the server. */
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function mq(query: string) {
  return {
    subscribe(cb: () => void) {
      const m = matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    get: () => matchMedia(query).matches,
  };
}
const reduceMq = mq("(prefers-reduced-motion: reduce)");
const compactMq = mq("(max-width: 760px)");

/**
 * Phone-width layout (≤760px): the slide bars there are only a few px wide, so they act as
 * progress indicators and slides change via the 44px arrows / swipe (WCAG 2.5.8, "equivalent").
 * `false` during SSR/hydration.
 */
export function useCompact() {
  return useSyncExternalStore(compactMq.subscribe, compactMq.get, () => false);
}

/** prefers-reduced-motion (false during SSR/hydration, then the real value). */
export function useReducedMotion() {
  return useSyncExternalStore(reduceMq.subscribe, reduceMq.get, () => false);
}
/** Non-hook read for event handlers and effects. */
export const prefersReduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useLocale(): Locale {
  const p = useParams<{ locale?: string }>();
  return isLocale(p?.locale) ? p.locale : DEFAULT_LOCALE;
}

/** True on the home page (/ar or /en), where section links are same-page anchors. */
export function useIsHome() {
  const pathname = usePathname();
  return /^\/(ar|en)\/?$/.test(pathname ?? "");
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

const statusStore = {
  subscribe(cb: () => void) {
    const t = setInterval(cb, 60000);
    return () => clearInterval(t);
  },
  get: () => isOpenNow(),
};
/** Showroom open right now? `null` during SSR/hydration (time-dependent), then refreshed every minute. */
export function useOpenNow(): boolean | null {
  return useSyncExternalStore(statusStore.subscribe, statusStore.get, () => null);
}
