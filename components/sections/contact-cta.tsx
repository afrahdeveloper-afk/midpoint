import Link from "next/link";
import { RevealText } from "@/components/custom/reveal-text";
import { MagneticButton } from "@/components/custom/magnetic-button";
import { Arrow } from "@/components/custom/arrow";

type ContactCtaProps = {
  subtext?: string;
  ctaLabel?: string;
  href?: string;
};

export function ContactCta({
  subtext = "Tell us about your next project.",
  ctaLabel = "Contact Us",
  href = "/contact-us",
}: ContactCtaProps) {
  return (
    <section className="shell shell-y border-t border-brand-line">
      <RevealText>
        <h2 className="font-heading text-[clamp(2.5rem,6vw+1rem,6rem)] leading-[0.98] tracking-tight uppercase">
          Let&apos;s Build
          <br />
          Something
          <br />
          Remarkable.
        </h2>
      </RevealText>

      <div className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <RevealText delay={0.15}>
          <p className="max-w-sm text-lg text-brand-muted">{subtext}</p>
        </RevealText>

        <RevealText delay={0.25}>
          <MagneticButton>
            <Link
              href={href}
              className="group flex items-center gap-2 bg-brand-blue px-8 py-4 label-caps text-white transition-colors hover:bg-brand-navy"
            >
              {ctaLabel}
              <Arrow />
            </Link>
          </MagneticButton>
        </RevealText>
      </div>
    </section>
  );
}
