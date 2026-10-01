import { Logo } from "@/components/media/Logo";
import { BRANDS } from "@/data/brands";
import { LOGOS } from "@/data/logos";

/**
 * The brand's logo in place of its name inside a heading (sized from the heading's font size).
 * The image's alt is the name, so the heading still reads "Get to know Roca". `dark`: on a navy
 * section (white logo). Falls back to the name when the brand has no logo file.
 */
export function BrandMark({ k, dark }: { k: number; dark?: boolean }) {
  const b = BRANDS[k];
  if (!LOGOS[b.n]) return <span dir="ltr">{b.n}</span>;
  return (
    <span className={"h-logo" + (dark ? " dark" : "")}>
      <Logo name={b.n} alt={b.n} slug={b.slug} />
    </span>
  );
}
