import Link from "next/link";
import { RevealText } from "@/components/custom/reveal-text";
import { Arrow } from "@/components/custom/arrow";

/**
 * Homepage-only closing statement. Deliberately not the shared ContactCta
 * (components/sections/contact-cta.tsx) — that component is reused as a
 * contextual CTA on Brands/Products/Services/Projects/About and stays
 * untouched; this is the homepage's own final, centered treatment.
 */
export function HomeContactCta() {
  return (
    <section className="border-t border-white/10 bg-brand-navy text-white">
      <div className="shell shell-y flex flex-col items-center text-center">
        <RevealText>
          <h2 className="font-heading text-[clamp(2.75rem,6vw+1rem,7rem)] leading-[0.98] tracking-tight uppercase">
            Let&apos;s Build
            <br />
            Something Remarkable.
          </h2>
        </RevealText>

        <RevealText delay={0.15} className="mt-8">
          <p className="max-w-sm text-lg text-white/60">
            Tell us about your next project.
          </p>
        </RevealText>

        <RevealText delay={0.28} className="mt-12">
          <Link
            href="/contact-us"
            className="group relative inline-flex items-center gap-2 py-1 label-caps text-white transition-colors duration-300 hover:text-brand-blue"
          >
            Contact Us
            <Arrow />
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-brand-blue transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
          </Link>
        </RevealText>
      </div>
    </section>
  );
}
