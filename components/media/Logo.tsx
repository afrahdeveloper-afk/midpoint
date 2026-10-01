import Image from "next/image";
import { LOGOS, MARKS } from "@/data/logos";

/**
 * Partner brand logo. Logos are tiny SVG/PNG files whose rendered size comes from the
 * stylesheet (width/height:auto + max-width/max-height), so they are served as-is
 * (`unoptimized`) to keep their natural size identical to the original.
 */
export function Logo({ name, alt = "", eager, slug }: { name: string; alt?: string; eager?: boolean; slug?: string }) {
  const l = LOGOS[name];
  if (!l) return null;
  // data-b: per-brand sizing hook (e.g. Roca's SVG has inner padding)
  return <Image src={l.src} alt={alt} width={l.w} height={l.h} unoptimized loading={eager ? "eager" : "lazy"} draggable={false} data-b={slug} />;
}

/** Brand logo when available, otherwise the fallback (name or initials) — like the original `mark()`. */
export function LogoOr({ name, fallback, alt }: { name: string; fallback: React.ReactNode; alt?: string }) {
  return LOGOS[name] ? <Logo name={name} alt={alt} /> : <>{fallback}</>;
}

/** The Midpoint wordmark + divider + heart pair (header, menu, footer, preloader). */
export function BrandPair({ className = "pair", decorative = false, preload = false }: { className?: string; decorative?: boolean; preload?: boolean }) {
  const { wordmark: w, heart: h } = MARKS;
  const img = { unoptimized: true, loading: "eager" as const, preload };
  return (
    <span className={className} dir="ltr">
      <span className="brandmark">
        <Image className="p-main" src={w.src} width={w.w} height={w.h} alt={decorative ? "" : "Midpoint"} {...img} />
      </span>
      <span className="pair-div" aria-hidden={decorative ? undefined : true}></span>
      <Image className="p-heart" src={h.src} width={h.w} height={h.h} alt={decorative ? "" : "Inside The Heart"} {...img} />
    </span>
  );
}
