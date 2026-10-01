"use client";
import { useEffect, type RefObject } from "react";
import { persist } from "./store";

/** Add `cls` without playing any transition (used to restore state after a remount). */
export function addInstant(el: Element, cls: string) {
  el.classList.add("no-tr");
  el.classList.add(cls);
  void (el as HTMLElement).offsetWidth;
  el.classList.remove("no-tr");
}

/**
 * Reveal-on-scroll for every `.rv` inside a section (adds `.seen`), like the original.
 * Runs from the section's own effect, i.e. only once that section has hydrated.
 * Elements already revealed earlier in this page load are restored instantly
 * (keys are `<scope>:<index>`, stable across a language switch).
 */
export function useReveal(scope: string, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = [...root.querySelectorAll<HTMLElement>(".rv")];
    const key = (el: Element) => `${scope}:${els.indexOf(el as HTMLElement)}`;
    const pending: HTMLElement[] = [];
    els.forEach((el) => {
      if (el.classList.contains("seen")) return;
      if (persist.seenRv.has(key(el))) addInstant(el, "seen");
      else pending.push(el);
    });
    if (!("IntersectionObserver" in window)) {
      pending.forEach((el) => el.classList.add("seen"));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("seen");
          persist.seenRv.add(key(en.target));
          io.unobserve(en.target);
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scope, ref]);
}
