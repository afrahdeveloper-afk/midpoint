import { OpenStatus } from "@/components/chrome/Header";
import { BrandPair } from "@/components/media/Logo";
import { IcMail, IcPhone, IcPin, IcWa, Socials } from "@/components/icons";
import { BrandLink, SecLink } from "@/components/nav/Links";
import { BRANDS } from "@/data/brands";
import { T } from "@/data/translations";
import { SITE } from "@/data/site";
import type { Locale } from "@/data/i18n";

/** Site footer: brand + tagline + socials, then sitemap / brands / showroom columns, then the legal line. */
export function Footer({ locale }: { locale: Locale }) {
  const L = T[locale];
  return (
    <footer>
      <div className="f-grid">
        <div className="f-about">
          <span className="f-logo"><BrandPair /></span>
          <p className="f-tag">{L.tagline}</p>
          <Socials className="soc f-soc" />
        </div>
        <nav className="f-col" aria-labelledby="fNavH">
          <h2 className="f-h" id="fNavH">{L.menu}</h2>
          <ul className="f-links">
            <li><SecLink sec="home">{L.nav_home}</SecLink></li>
            <li><SecLink sec="about">{L.nav_about}</SecLink></li>
            <li><SecLink sec="brands">{L.nav_brands}</SecLink></li>
            <li><SecLink sec="products">{L.nav_products}</SecLink></li>
            <li><SecLink sec="contact">{L.nav_contact}</SecLink></li>
          </ul>
        </nav>
        <nav className="f-col" aria-labelledby="fBrandsH">
          <h2 className="f-h" id="fBrandsH">{L.nav_brands}</h2>
          <ul className="f-links f-brands-list">
            {BRANDS.map((x) => (
              <li key={x.slug}><BrandLink slug={x.slug} dir="ltr">{x.n}</BrandLink></li>
            ))}
          </ul>
        </nav>
        <div className="f-col">
          <h2 className="f-h">{L.c_address}</h2>
          <ul className="f-contact">
            <li><IcPin /><a href={SITE.maps} target="_blank" rel="noopener">{L.address}</a></li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
              <span>{L.hours}<OpenStatus className="status f-status" /></span>
            </li>
            <li><IcPhone /><a href={`tel:+${SITE.phone}`} dir="ltr">{SITE.phoneDisplay}</a></li>
            <li><IcMail /><a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a></li>
          </ul>
          <a className="btn line f-wa" href={SITE.whatsapp} target="_blank" rel="noopener"><IcWa full={false} /><span>WhatsApp</span></a>
        </div>
      </div>
      <div className="f-bot">
        <span>{L.rights}</span>
        <span dir="ltr">{SITE.legalName}</span>
      </div>
    </footer>
  );
}
