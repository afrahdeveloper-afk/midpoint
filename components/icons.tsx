/* Inline SVG icons, copied from the original markup. */
import { SITE } from "@/data/site";

type P = { className?: string; style?: React.CSSProperties };

export const IcPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
);
export const IcMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 6l8.5 7 8.5-7" /></svg>
);
export const IcPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
/** Outline WhatsApp bubble; `full` adds the handset (utility bar / menu). */
export const IcWa = ({ full = true }: { full?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4z" />{full && <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z" />}</svg>
);
export const IcWaSolid = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2A9.7 9.7 0 0 0 3.7 16.9L2.3 21.8l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.3-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5 1.5.6 2 .7 2.7.6.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.5-.2z" /></svg>
);
/** → (16px grid), flipped in RTL by the stylesheet where needed. */
export const IcArrow = ({ className, style }: P) => (
  <svg className={className} style={style} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);
/** ← (16px grid). */
export const IcArrowL = ({ style }: P) => (
  <svg style={style} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" /></svg>
);
/** Plain arrow without aria-hidden (inside elements that are themselves hidden). */
export const IcArrowBare = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);
export const IcExt = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 12L12 4M6 4h6v6" /></svg>
);
export const IcChev = () => (
  <svg className="bx-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 3l5 5-5 5" /></svg>
);
export const IcPrev = ({ w = "1.4" }: { w?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
);
export const IcNext = ({ w = "1.4" }: { w?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
);
export const IcZoom = ({ w = "1.4" }: { w?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
);
export const IcDown = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
);

/** About pillars (star, house, grid) — also reused by the brand facts row. */
export const PILLAR_PATHS = [
  <path key="0" d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />,
  <path key="1" d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />,
  <g key="2"><rect x="4" y="4" width="7" height="7" /><rect x="13" y="4" width="7" height="7" /><rect x="4" y="13" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /></g>,
];

/** Facts row icons: pin, calendar, grid, star. */
export const FACT_PATHS = [
  <g key="0"><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></g>,
  <g key="1"><rect x="4" y="5" width="16" height="15" rx="1" /><path d="M4 10h16M9 3v4M15 3v4" /></g>,
  PILLAR_PATHS[2],
  PILLAR_PATHS[0],
];

/** Facebook / Instagram / TikTok list, used in five places with different classes. */
export function Socials({ className }: { className: string }) {
  return (
    <ul className={className}>
      <li><a href={SITE.social.facebook} target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" /></svg></a></li>
      <li><a href={SITE.social.instagram} target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none" /></svg></a></li>
      <li><a href={SITE.social.tiktok} target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.3 2.2 1.6 3.8 3.9 4v3a7 7 0 0 1-3.9-1.2v6.3a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 1 0 1.7 2.4V3z" /></svg></a></li>
    </ul>
  );
}
