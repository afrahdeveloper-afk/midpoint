import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/custom/social-icons";
import {
  COMPANY_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  NAV_ITEMS,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_TAGLINE,
  SOCIAL_LINKS,
} from "@/lib/site-config";

const SOCIAL_ITEMS: {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [city, ...restOfAddress] = COMPANY_ADDRESS_LINES;

  return (
    <footer className="bg-brand-navy text-white">
      <div className="shell shell-y">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="max-w-sm lg:col-span-5">
            <div className="relative h-10 w-44 md:h-11 md:w-48">
              <Image
                src="/brand/midpoint-logo-white.png"
                alt={SITE_NAME}
                fill
                sizes="200px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              Architectural materials &amp; solutions for spaces that leave
              an impression.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="lg:col-span-7 lg:justify-self-end"
          >
            <ul className="grid grid-cols-1 gap-x-10 gap-y-0.5 sm:grid-cols-2 sm:gap-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-baseline gap-3 py-3"
                  >
                    <span className="label-caps text-white/60">
                      {item.number}
                    </span>
                    <span className="relative font-heading text-base tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white">
                      {item.label}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-brand-blue transition-transform duration-300 ease-out group-hover:scale-x-100"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-white/10 pt-12 sm:grid-cols-3 md:mt-20 md:pt-14">
          <div>
            <p className="label-caps text-white/60">Location</p>
            <address className="mt-4 flex flex-col gap-1 not-italic">
              <span className="font-heading text-lg tracking-tight text-white">
                {city}
              </span>
              {restOfAddress.map((line) => (
                <span
                  key={line}
                  className="text-sm leading-relaxed text-white/60"
                >
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div>
            <p className="label-caps text-white/60">Contact</p>
            <div className="mt-4 flex flex-col gap-1">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-block py-1.5 text-sm text-white/70 transition-colors hover:text-brand-blue"
              >
                {CONTACT_EMAIL}
              </a>
              {CONTACT_PHONE && (
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
                  className="inline-block py-1.5 text-sm text-white/70 transition-colors hover:text-brand-blue"
                >
                  {CONTACT_PHONE}
                </a>
              )}
            </div>
          </div>

          <div>
            <p className="label-caps text-white/60">Follow Us</p>
            <ul className="mt-4 flex flex-col gap-1">
              {SOCIAL_ITEMS.map(({ label, href, Icon }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${SITE_NAME} on ${label} (opens in a new tab)`}
                      className="group inline-flex items-center gap-2.5 py-1.5 text-sm text-white/70 transition-colors hover:text-brand-blue"
                    >
                      <Icon className="text-white/50 transition-colors group-hover:text-brand-blue" />
                      {label}
                      <ArrowUpRight
                        aria-hidden
                        strokeWidth={1.5}
                        className="size-3.5 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue"
                      />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2.5 py-1.5 text-sm text-white/60">
                      <Icon className="text-white/30" />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row-reverse sm:items-center sm:justify-between">
          <span>
            &copy; {year} {SITE_LEGAL_NAME}. All rights reserved.
          </span>
          <span className="text-[9px] font-medium tracking-[0.14em] text-white/60 uppercase">
            {SITE_TAGLINE}
          </span>
        </div>
      </div>
    </footer>
  );
}
