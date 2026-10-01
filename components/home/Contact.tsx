"use client";
import { useRef } from "react";
import { Socials } from "@/components/icons";
import { ContactForm } from "./ContactForm";
import { T } from "@/data/translations";
import { SITE } from "@/data/site";
import { useLocale } from "@/lib/hooks";
import { useReveal } from "@/lib/reveal";

export function Contact() {
  const L = T[useLocale()];
  const root = useRef<HTMLElement>(null);
  useReveal("contact", root);
  return (
    <section className="sec contact" id="contact" ref={root}>
      <div className="sec-head rv">
        <div><p className="kicker">{L.nav_contact}</p><h2>{L.c_h}</h2></div>
        <p>{L.c_p}</p>
      </div>
      <div className="c-grid">
        <div className="c-info rv">
          <div><h3>{L.c_address}</h3><p>{L.address}</p></div>
          <div><h3>{L.c_phone}</h3><p><a href={`tel:+${SITE.phone}`} dir="ltr">{SITE.phoneDisplay}</a></p></div>
          <div><h3>{L.c_hours}</h3><p>{L.hours}</p></div>
          <div><h3>{L.c_email}</h3><p><a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a></p></div>
          <div><h3>{L.c_follow}</h3><Socials className="soc c-soc" /></div>
          <div><h3>WhatsApp</h3><p><a href={SITE.whatsapp} target="_blank" rel="noopener">{L.c_wa}</a></p></div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
