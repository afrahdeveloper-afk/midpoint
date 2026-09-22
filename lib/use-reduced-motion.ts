"use client";

import { useMediaQuery } from "@/lib/use-media-query";

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
