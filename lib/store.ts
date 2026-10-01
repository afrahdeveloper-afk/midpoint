"use client";
/**
 * Client-side UI state shared between components.
 *
 * The original site was one document: switching language re-rendered text in place and
 * brand pages were a hidden <section>, so nothing ever lost state. Here /ar ↔ /en remounts
 * the locale layout and home ↔ brand swaps pages, so:
 *  - `persist` keeps what must survive a remount (slide index, filters, form fields…)
 *  - `shared` is a tiny reactive store for live cross-component flags
 *  - `bus` carries one-off actions between sections (e.g. "ask about this brand")
 *  - `intent` carries an action across a page navigation (brand page → home#contact)
 */
import { useSyncExternalStore } from "react";

export type SectionKey = "home" | "about" | "brands" | "products" | "contact";
export const SECTIONS: SectionKey[] = ["home", "about", "brands", "products", "contact"];

export const persist = {
  /** The preloader has finished once in this page load. */
  preloaderDone: false,
  /** The preloader handed over to the hero (copy in + slider clock running). */
  heroStarted: false,
  /** Set right before a language switch; cleared once the new tree has mounted. */
  langSwitch: false,
  /** Element to focus after a language switch (the button that was clicked). */
  focusSel: null as string | null,
  /** WhatsApp badge already revealed in this page load. */
  waBadge: false,
  hdr: { solid: false, hide: false },
  menu: { open: false, pvKey: "home" as SectionKey },
  hero: { cur: 0, userPaused: null as boolean | null, prog: 0 },
  brands: { cat: "all", sel: 0, open: -1 },
  pxSpace: "all",
  form: { name: "", phone: "", type: 0, brand: 0, msg: "" },
  /** `.rv` elements already revealed ("<section>:<index>"), plus ids marked `seen`. */
  seenRv: new Set<string>(),
  seenIds: new Set<string>(),
};

/** Merge `patch` into one of the `persist` groups (keeps writes out of component render scope). */
export function remember<K extends "hdr" | "menu" | "hero" | "brands" | "form">(group: K, patch: Partial<(typeof persist)[K]>) {
  Object.assign(persist[group], patch);
}
export function rememberSpace(s: string) {
  persist.pxSpace = s;
}

/* ---------- reactive shared flags ---------- */
type Shared = {
  curSec: SectionKey;
  menuOpen: boolean;
  drOpen: boolean;
  waOpen: boolean;
  loaded: boolean;
};
let shared: Shared = { curSec: "home", menuOpen: false, drOpen: false, waOpen: false, loaded: false };
const listeners = new Set<() => void>();
export const getShared = () => shared;
export function setShared(patch: Partial<Shared>) {
  const next = { ...shared, ...patch };
  if ((Object.keys(patch) as (keyof Shared)[]).every((k) => next[k] === shared[k])) return;
  shared = next;
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
/** Call `cb(value, prev)` whenever `key` changes. Returns an unsubscribe function. */
export function watchShared<K extends keyof Shared>(key: K, cb: (v: Shared[K], prev: Shared[K]) => void) {
  let prev = shared[key];
  return subscribe(() => {
    const v = shared[key];
    if (v !== prev) {
      const p = prev;
      prev = v;
      cb(v, p);
    }
  });
}
const serverShared: Shared = { curSec: "home", menuOpen: false, drOpen: false, waOpen: false, loaded: false };
export function useShared<K extends keyof Shared>(key: K): Shared[K] {
  return useSyncExternalStore(
    subscribe,
    () => shared[key],
    () => serverShared[key],
  );
}

/* ---------- event bus ---------- */
type Events = {
  /** Preloader finished: hero copy in + start the slider clock. */
  heroStart: [];
  /** Fill the contact form. `brand` is the <select> index (0 = "not sure yet"). */
  prefill: [opts: { brand?: number; msg?: string; focusDelay: number }];
  /** Open the product drawer. */
  openDrawer: [i: number, from?: HTMLElement | null];
  /** Close the overlay menu without returning focus. */
  closeMenuNow: [];
  /** Show the header (it may be hidden by the smart-hide). */
  showHeader: [];
  /** Select a brand in the home brand list (after returning from a brand page). */
  selectBrand: [k: number];
  /** Brand-to-brand slab wipe. */
  wipe: [phase: "cover" | "uncover"];
};
const bus = new Map<keyof Events, Set<(...a: never[]) => void>>();
export function on<E extends keyof Events>(ev: E, fn: (...a: Events[E]) => void) {
  if (!bus.has(ev)) bus.set(ev, new Set());
  bus.get(ev)!.add(fn as (...a: never[]) => void);
  return () => void bus.get(ev)!.delete(fn as (...a: never[]) => void);
}
export function emit<E extends keyof Events>(ev: E, ...args: Events[E]) {
  bus.get(ev)?.forEach((fn) => (fn as (...a: Events[E]) => void)(...args));
}

/**
 * Has the hero started? `false` while hydrating (matches the server HTML even if a
 * section hydrates late), then the real value — re-rendering when the preloader hands over.
 */
const subscribeHeroStart = (cb: () => void) => on("heroStart", cb);
export function useHeroStarted() {
  return useSyncExternalStore(
    subscribeHeroStart,
    () => persist.heroStarted,
    () => false,
  );
}

/* ---------- cross-page intents ---------- */
export type Intent =
  | { type: "prefill"; brand?: number; msg?: string }
  | { type: "openDrawer"; i: number; delay: number }
  | { type: "selectBrand"; k: number };
let intent: Intent | null = null;
export const setIntent = (i: Intent | null) => {
  intent = i;
};
export function takeIntent<T extends Intent["type"]>(type: T): Extract<Intent, { type: T }> | null {
  if (intent?.type !== type) return null;
  const v = intent as Extract<Intent, { type: T }>;
  intent = null;
  return v;
}

/* ---------- body classes (the original toggled these on <body>) ---------- */
export const bodyClass = (cls: string, on: boolean) => document.body.classList.toggle(cls, on);
