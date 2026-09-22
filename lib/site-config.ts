/**
 * Production origin, no trailing slash. Overridable via
 * NEXT_PUBLIC_SITE_URL (e.g. for a staging deploy); defaults to the verified
 * production domain so metadataBase/canonical/sitemap/robots never fall back
 * to localhost.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.midpointco.com";

export const SITE_NAME = "Midpoint";

export const SITE_LEGAL_NAME = "Midpoint General Trading Company";

export const SITE_TAGLINE = "Architectural Materials & Solutions";

export const SITE_DESCRIPTION =
  "Midpoint is an architectural materials and solutions company based in Baghdad, Iraq — importing superior porcelain, ceramic, glass mosaic, sanitary, and vertical transportation brands for architects and designers.";

export const NAV_ITEMS = [
  { number: "01", label: "Home", href: "/" },
  { number: "02", label: "About Us", href: "/about-us" },
  { number: "03", label: "Brands", href: "/brands" },
  { number: "04", label: "Our Products", href: "/products" },
  { number: "05", label: "Projects", href: "/projects" },
  { number: "06", label: "Services", href: "/services" },
  { number: "07", label: "Contact Us", href: "/contact-us" },
] as const;

export const COMPANY_ADDRESS_LINES = [
  "Baghdad",
  "Al-Mansour",
  "Baghdad Tower Street",
  "Godia Plaza Building",
  "next to Green Apple",
] as const;

export const CONTACT_EMAIL = "info@midpointco.com";

export const CONTACT_PHONE: string = "+9647852222250";

/**
 * Centralized WhatsApp configuration — change the number here only; every
 * entry point (floating button, contact page link) derives from this single
 * source. Empty (and every dependent UI hidden) when CONTACT_PHONE is unset.
 */
export const WHATSAPP_URL = CONTACT_PHONE
  ? `https://wa.me/${CONTACT_PHONE.replace(/\D/g, "")}`
  : "";

/**
 * Centralized map/location configuration. No verified GPS coordinates or
 * saved Google Maps place link exist in this project, so nothing is
 * invented or guessed here — both URLs are built from the company's own
 * verified name and address, handed off to Google's own keyless,
 * no-API-key URL schemes (search + embed) to resolve.
 * Change the address in COMPANY_ADDRESS_LINES above and both derive from it.
 */
export const MAP_QUERY = `${SITE_NAME} ${COMPANY_ADDRESS_LINES.join(", ")}`;

export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`;

/**
 * Centralized social links — change an account here only; the footer only
 * renders a link once its URL is filled in here.
 */
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/midpoint_iraq/",
  facebook: "https://www.facebook.com/midpointiq/",
} as const;
