"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandPair } from "@/components/media/Logo";
import { IcMail, IcPhone, IcPin, IcWa, Socials } from "@/components/icons";
import { SecLink } from "@/components/nav/Links";
import { T } from "@/data/translations";
import { SITE } from "@/data/site";
import { pad2, prefersReduced, useIsHome, useIsoLayoutEffect, useLocale, useOpenNow } from "@/lib/hooks";
import { useSwitchLang } from "@/lib/nav";
import { bodyClass, getShared, on, persist, SECTIONS, setShared, useShared, watchShared, type SectionKey } from "@/lib/store";

/** "Open now / Closed" pill, shared by the utility bar, menu and WhatsApp popover. */
export function OpenStatus({ as: Tag = "span", className, id }: { as?: "span" | "p"; className: string; id?: string }) {
  const L = T[useLocale()];
  const open = useOpenNow();
  return (
    <Tag className={className + (open === false ? " closed" : "")} id={id}>
      <i aria-hidden="true"></i>
      <span>{open === null ? "" : open ? L.open_now : L.closed_now}</span>
    </Tag>
  );
}

export function Header() {
  const locale = useLocale();
  const L = T[locale];
  const home = useIsHome();
  const pathname = usePathname();
  const switchLang = useSwitchLang();
  const menuOpen = useShared("menuOpen");
  const hdr = useRef<HTMLElement>(null);
  const prog = useRef<HTMLElement>(null);

  /* ---- current-section indicator ("where") ---- */
  const [whereSec, setWhereSec] = useState<SectionKey>(() => getShared().curSec);
  const [swap, setSwap] = useState(false);
  useEffect(() => {
    let t = 0;
    const off = watchShared("curSec", (v) => {
      clearTimeout(t);
      if (prefersReduced()) return setWhereSec(v);
      setSwap(true);
      t = window.setTimeout(() => {
        setWhereSec(v);
        setSwap(false);
      }, 220);
    });
    return () => {
      off();
      clearTimeout(t);
    };
  }, []);

  /* scroll spy on the home page; brand pages always read "Our brands" */
  useEffect(() => {
    if (!home) {
      setShared({ curSec: "brands" });
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    const spy = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (en.isIntersecting) setShared({ curSec: en.target.id as SectionKey });
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, [home, pathname]);

  /* ---- solid / smart-hide / progress ---- */
  useIsoLayoutEffect(() => {
    const h = hdr.current!;
    const setHide = (v: boolean) => {
      h.classList.toggle("hide", v);
      bodyClass("hdr-hidden", v);
      persist.hdr.hide = v;
    };
    // restore across remounts so nothing re-animates
    h.classList.toggle("solid", persist.hdr.solid);
    setHide(persist.hdr.hide);
    let lastY = scrollY, ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
        h.classList.toggle("solid", y > 40);
        persist.hdr.solid = y > 40;
        // brand pages keep the header fixed (no smart-hide)
        if (!h.classList.contains("hdr-brand") && !getShared().menuOpen && !h.contains(document.activeElement)) setHide(y > innerHeight * 0.9 && y > lastY + 4);
        if (y < lastY - 4) setHide(false);
        if (prog.current) prog.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        lastY = y;
        ticking = false;
      });
    };
    const onFocus = () => setHide(false);
    h.addEventListener("focusin", onFocus);
    addEventListener("scroll", onScroll, { passive: true });
    const offShow = on("showHeader", () => setHide(false));
    onScroll();
    return () => {
      h.removeEventListener("focusin", onFocus);
      removeEventListener("scroll", onScroll);
      offShow();
    };
  }, []);

  const whereIdx = SECTIONS.indexOf(whereSec);
  const other = locale === "ar" ? "en" : "ar";
  // brand pages: slim header (utility bar only, desktop); decided from the URL so the server HTML already matches
  const onBrand = /^\/(ar|en)\/brands\//.test(pathname ?? "");

  return (
    <>
      <a className="skip" href={home ? "#about" : "#bpAbout"}>{L.skip}</a>
      <header className={"hdr" + (onBrand ? " hdr-brand" : "")} id="hdr" ref={hdr}>
        <div className="util">
          <div className="util-in">
            <div className="util-g">
              <OpenStatus className="status js-status" />
              <a className="addr" href={SITE.maps} target="_blank" rel="noopener"><IcPin /><span>{L.address}</span></a>
              <a className="u-mail" href={`mailto:${SITE.email}`}><IcMail /><span dir="ltr">{SITE.email}</span></a>
            </div>
            <div className="util-g">
              <a href={`tel:+${SITE.phone}`}><IcPhone /><span dir="ltr">{SITE.phoneDisplay}</span></a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener"><IcWa /><span>WhatsApp</span></a>
              <Socials className="soc u-soc" />
              {/* brand pages (desktop) hide the main row, so the menu opens from here */}
              <button className="u-menu" id="uMenuBtn" type="button" aria-expanded={menuOpen} aria-controls="menu" onClick={() => setShared({ menuOpen: true })}>
                <span>{L.menu}</span>
                <span className="burger" aria-hidden="true"><i></i><i></i></span>
              </button>
              <span className="seg js-lang" role="group" aria-label="Language">
                <button type="button" data-lang="ar" lang="ar" aria-pressed={locale === "ar"} onClick={() => switchLang("ar", '.js-lang button[data-lang="ar"]')}>عربي</button>
                <button type="button" data-lang="en" lang="en" aria-pressed={locale === "en"} onClick={() => switchLang("en", '.js-lang button[data-lang="en"]')}>EN</button>
              </span>
            </div>
          </div>
        </div>
        <div className="hdr-in">
          <div className="hdr-start">
            <button
              className="lang-btn"
              id="langBtn"
              type="button"
              lang={other}
              aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
              onClick={() => switchLang(other, "#langBtn")}
            >
              {locale === "ar" ? "English" : "العربية"}
            </button>
            <SecLink sec={whereSec} className={"where" + (swap ? " swap" : "")} id="where">
              <b id="whereN">{pad2(whereIdx + 1)}</b>
              <span className="wl"><span id="whereL">{L[`nav_${whereSec}`]}</span></span>
            </SecLink>
          </div>
          <SecLink sec="home" className="logo" aria-label="Midpoint — Inside The Heart"><BrandPair /></SecLink>
          <div className="hdr-end">
            <SecLink sec="contact" className="hdr-cta"><IcPin /><span>{L.cta_visit}</span></SecLink>
            <button className="menu-btn" id="menuBtn" type="button" aria-expanded={menuOpen} aria-controls="menu" onClick={() => setShared({ menuOpen: true })}>
              <span>{L.menu}</span>
              <span className="burger" aria-hidden="true"><i></i><i></i></span>
            </button>
          </div>
        </div>
        <div className="prog" aria-hidden="true"><i id="prog" ref={prog}></i></div>
      </header>
    </>
  );
}
