"use client";
import { useEffect } from "react";
import { bodyClass, emit, persist, takeIntent } from "@/lib/store";

/** Home-page wide effects (reveal-on-scroll lives in each section's own effect). */
export function HomeEffects() {
  useEffect(() => {
    bodyClass("on-brand", false);
    if (persist.preloaderDone) document.getElementById("main")?.setAttribute("aria-busy", "false");
    // "All brands" on a brand page → back to the list with that brand selected
    const it = takeIntent("selectBrand");
    const t = it ? window.setTimeout(() => emit("selectBrand", it.k), 40) : 0;
    return () => clearTimeout(t);
  }, []);
  return null;
}
