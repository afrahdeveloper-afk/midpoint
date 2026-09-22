import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";
import {
  MAP_DIRECTIONS_URL,
  MAP_EMBED_URL,
  WHATSAPP_URL,
} from "@/lib/site-config";

/**
 * Map + info panel for the Contact page. The embed and directions link
 * are both derived from the company's verified name/address in
 * lib/site-config.ts via Google's keyless search/embed URL schemes — no
 * separate coordinates or saved Google place link were invented.
 */
export function LocationMap() {
  return (
    <section className="shell shell-y border-t border-brand-line">
      <RevealText>
        <SectionLabel index="04">Visit Our Showroom</SectionLabel>
      </RevealText>
      <RevealText delay={0.08} className="mt-4">
        <p className="max-w-lg text-base leading-relaxed text-brand-muted">
          Discover our materials and collections at our showroom in Baghdad.
        </p>
      </RevealText>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <RevealText delay={0.1} className="lg:col-span-3">
          <div className="relative aspect-[4/3] overflow-hidden border border-brand-line bg-brand-navy shadow-lg lg:aspect-[16/11]">
            <iframe
              title="Map showing Midpoint's showroom location in Baghdad, Iraq"
              src={MAP_EMBED_URL}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </RevealText>

        <RevealText delay={0.16} className="lg:col-span-2">
          <div className="flex h-full flex-col justify-between gap-10 border border-brand-line bg-brand-paper p-8 sm:p-10">
            <div>
              <span className="font-heading text-2xl tracking-tight">
                Midpoint
              </span>
              <address className="mt-2 text-base leading-relaxed text-brand-muted not-italic">
                Baghdad, Iraq
              </address>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 label-caps text-brand-blue"
              >
                Get Directions
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              {WHATSAPP_URL && (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 label-caps text-brand-blue"
                >
                  Chat on WhatsApp
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}
