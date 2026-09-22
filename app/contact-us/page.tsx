import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/contact-form";
import { LocationMap } from "@/components/contact/LocationMap";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";
import {
  COMPANY_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/lib/site-config";

const CONTACT_DESCRIPTION = `Get in touch with Midpoint — ${COMPANY_ADDRESS_LINES.join(", ")}.`;

export const metadata: Metadata = {
  title: "Contact Us",
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Us",
    description: CONTACT_DESCRIPTION,
    type: "website",
  },
};

type ContactUsPageProps = {
  searchParams: Promise<{ about?: string }>;
};

export default async function ContactUsPage({ searchParams }: ContactUsPageProps) {
  const { about } = await searchParams;
  const context = typeof about === "string" ? about.trim().slice(0, 120) : "";

  return (
    <>
      <ContactHero />

      <section className="shell pb-24 md:pb-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-12 lg:col-span-4">
            <div>
              <RevealText>
                <SectionLabel index="01">Studio</SectionLabel>
              </RevealText>
              <RevealText delay={0.1} className="mt-6">
                <address className="flex flex-col gap-1 text-lg leading-relaxed text-brand-ink not-italic">
                  {COMPANY_ADDRESS_LINES.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </RevealText>
            </div>

            <div>
              <RevealText>
                <SectionLabel index="02">Contact</SectionLabel>
              </RevealText>
              <RevealText delay={0.1} className="mt-6 flex flex-col gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group inline-flex w-fit flex-col text-lg leading-relaxed text-brand-ink transition-colors hover:text-brand-blue"
                >
                  {CONTACT_EMAIL}
                  <span className="h-px w-full origin-left scale-x-0 bg-brand-blue transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
                {CONTACT_PHONE && (
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
                    className="group inline-flex w-fit flex-col text-lg leading-relaxed text-brand-ink transition-colors hover:text-brand-blue"
                  >
                    {CONTACT_PHONE}
                    <span className="h-px w-full origin-left scale-x-0 bg-brand-blue transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </a>
                )}
              </RevealText>
            </div>
          </div>

          <div className="lg:col-span-8">
            <RevealText>
              <SectionLabel index="03">Send A Message</SectionLabel>
            </RevealText>
            {context && (
              <RevealText delay={0.08} className="mt-3">
                <p className="label-caps text-brand-muted">
                  Regarding: <span className="text-brand-blue">{context}</span>
                </p>
              </RevealText>
            )}
            <div className="mt-8">
              <ContactForm
                initialMessage={
                  context ? `Hi, I'm interested in ${context}. ` : undefined
                }
              />
            </div>
          </div>
        </div>
      </section>

      <LocationMap />

      <section className="shell shell-y border-t border-brand-line">
        <RevealText>
          <p className="max-w-xl font-heading text-2xl leading-snug tracking-tight sm:text-3xl">
            We look forward to hearing about your project.
          </p>
        </RevealText>
      </section>
    </>
  );
}
