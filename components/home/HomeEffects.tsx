"use client";
import { useEffect } from "react";
import { bodyClass, persist } from "@/lib/store";

/** Home-page wide effects (reveal-on-scroll lives in each section's own effect). */
export function HomeEffects() {
  useEffect(() => {
    bodyClass("on-brand", false);
    if (persist.preloaderDone) document.getElementById("main")?.setAttribute("aria-busy", "false");
  }, []);
  return null;
}
