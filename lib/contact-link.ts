/**
 * Builds a /contact-us link that carries a short, human-readable context
 * string (e.g. a product or brand name) so the contact page can pre-fill
 * the inquiry. Purely a display hint — never used for routing logic or
 * rendered as anything but escaped text, and capped to a sane length.
 */
export function contactHref(about?: string): string {
  if (!about) return "/contact-us";
  const trimmed = about.trim().slice(0, 120);
  if (!trimmed) return "/contact-us";
  return `/contact-us?about=${encodeURIComponent(trimmed)}`;
}
