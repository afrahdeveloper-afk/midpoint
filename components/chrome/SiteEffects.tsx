"use client";
import { useEffect, useRef } from "react";
import { on, persist } from "@/lib/store";
import { wipe } from "@/lib/nav";

/** The five-slab curtain played between two brand pages. */
export function BrandWipe() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let t = 0;
    return on("wipe", (phase) => {
      const w = el.current!;
      clearTimeout(t);
      if (phase === "cover") {
        w.classList.remove("uncover", "reset");
        void w.offsetWidth;
        w.classList.add("cover");
      } else {
        wipe.covered = false;
        w.classList.remove("cover");
        w.classList.add("uncover");
        t = window.setTimeout(() => {
          w.classList.add("reset");
          w.classList.remove("uncover");
        }, 800);
      }
    });
  }, []);
  return (
    <div className="bp-wipe" id="bpWipe" aria-hidden="true" ref={el}>
      <i></i><i></i><i></i><i></i><i></i>
    </div>
  );
}

/**
 * Rendered last in the layout: its effect runs after every other component has mounted,
 * so it can end the initial-load mode (`np-boot`) and finish a language switch
 * (restore focus on the button that was clicked).
 */
export function SiteEffects() {
  useEffect(() => {
    document.documentElement.classList.remove("np-boot");
    if (!persist.langSwitch) return;
    const sel = persist.focusSel;
    persist.langSwitch = false;
    persist.focusSel = null;
    if (sel) document.querySelector<HTMLElement>(sel)?.focus({ preventScroll: true });
  }, []);
  return null;
}
