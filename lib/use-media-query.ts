"use client";

import { useCallback, useSyncExternalStore } from "react";

function getServerSnapshot() {
  return false;
}

/**
 * SSR/hydration-safe media query hook. useSyncExternalStore is the one
 * primitive that can read a client-only value (matchMedia) without the
 * first client render diverging from the server-rendered markup.
 *
 * subscribe/getSnapshot are memoized on `query` so React doesn't tear down
 * and recreate the matchMedia listener on every render — only when the
 * query string itself changes.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
