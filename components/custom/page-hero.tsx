import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  /** Short tag/category rendered directly under the title (e.g. a category label). */
  meta?: React.ReactNode;
  intro?: string;
  className?: string;
  /** Optional breadcrumb trail rendered above the eyebrow. */
  breadcrumb?: React.ReactNode;
};

/**
 * Shared editorial opening spread for inner pages — the Hero-equivalent
 * moment for /about-us, /brands, /products, /services, /contact-us.
 */
export function PageHero({
  index,
  eyebrow,
  title,
  meta,
  intro,
  className,
  breadcrumb,
}: PageHeroProps) {
  return (
    <div className={cn("shell pt-32 pb-20 md:pt-40 md:pb-28", className)}>
      {breadcrumb && <div className="mb-8">{breadcrumb}</div>}
      <RevealText>
        <SectionLabel index={index}>{eyebrow}</SectionLabel>
      </RevealText>
      <RevealText delay={0.1} className="mt-6">
        <h1 className="max-w-4xl font-heading text-[clamp(2.5rem,5vw+1rem,5.5rem)] leading-[0.98] tracking-tight uppercase">
          {title}
        </h1>
      </RevealText>
      {meta && (
        <RevealText delay={0.18} className="mt-4">
          {meta}
        </RevealText>
      )}
      {intro && (
        <RevealText delay={0.2} className="mt-8">
          <p className="max-w-lg text-base leading-relaxed text-brand-muted">
            {intro}
          </p>
        </RevealText>
      )}
    </div>
  );
}
