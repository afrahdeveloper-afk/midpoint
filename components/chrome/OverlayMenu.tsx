"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { BrandPair } from "@/components/media/Logo";
import { Media } from "@/components/media/Media";
import { IcArrowBare, IcDown, IcMail, IcPhone, IcPin, IcWa, Socials } from "@/components/icons";
import { BrandLink, SecLink } from "@/components/nav/Links";
import { OpenStatus } from "./Header";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { T } from "@/data/translations";
import { SITE } from "@/data/site";
import type { MatKey } from "@/data/images";
import type { Locale } from "@/data/i18n";
import { pad2, prefersReduced, useIsHome, useIsoLayoutEffect, useLocale } from "@/lib/hooks";
import { useSwitchLang } from "@/lib/nav";
import { bodyClass, emit, getShared, on, persist, remember, SECTIONS, setIntent, setShared, useShared, watchShared, type SectionKey } from "@/lib/store";

const PV_MAT: Record<SectionKey, MatKey> = { home: "inf_kitchen", about: "roca_tenet_room", brands: "inf_agate", products: "toto_vessels", contact: "roca_inwall" };

export function OverlayMenu() {
  const locale = useLocale();
  const L = T[locale];
  const home = useIsHome();
  const switchLang = useSwitchLang();
  const open = useShared("menuOpen");
  const curSec = useShared("curSec");
  const menu = useRef<HTMLDivElement>(null);
  const links = useRef<HTMLUListElement>(null);
  const [pvKey, setPvKey] = useState<SectionKey>(() => persist.menu.pvKey);
  const [hot, setHotKey] = useState<SectionKey | null>(null);
  const [sub, setSub] = useState<"brands" | "products" | null>(null);

  const setPreview = (k: SectionKey) => {
    remember("menu", { pvKey: k });
    setPvKey(k);
  };
  const setHot = (k: SectionKey | null) => {
    setHotKey(k);
    if (k) setPreview(k);
  };

  /* open / close side effects (the original setMenu) */
  useIsoLayoutEffect(() => {
    bodyClass("locked", getShared().menuOpen || getShared().drOpen); // also restores after a remount
    let t = 0;
    const off = watchShared("menuOpen", (o) => {
      bodyClass("locked", o);
      clearTimeout(t);
      if (o) {
        setPreview(getShared().curSec);
        t = window.setTimeout(() => document.getElementById("closeBtn")?.focus(), 60);
      } else setHotKey(null);
    });
    return () => {
      off();
      clearTimeout(t);
    };
  }, []);

  const setMenu = (o: boolean) => {
    setShared({ menuOpen: o });
    if (!o) {
      // back to whichever menu button is showing (brand pages on desktop use the one in the utility bar)
      const btn = ["menuBtn", "uMenuBtn"].map((id) => document.getElementById(id)).find((el) => el?.offsetParent);
      btn?.focus({ preventScroll: true });
    }
  };
  /** Close without moving focus (link clicks). */
  const closeMenuNow = () => setShared({ menuOpen: false });
  useEffect(() => on("closeMenuNow", closeMenuNow), []);

  /* keyboard: Escape, focus trap, ↑/↓ between the main links */
  useEffect(() => {
    if (!open) return;
    const m = menu.current!;
    const focusables = () =>
      [...m.querySelectorAll<HTMLElement>("a,button")].filter(
        (el) => el.tabIndex !== -1 && el.getClientRects().length && getComputedStyle(el).visibility !== "hidden",
      );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        return;
      }
      if (e.key === "Tab") {
        const f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      const a = document.activeElement as HTMLElement | null;
      if ((e.key === "ArrowDown" || e.key === "ArrowUp") && a?.classList.contains("m-link")) {
        e.preventDefault();
        const ls = [...links.current!.querySelectorAll<HTMLElement>(".m-link")], i = ls.indexOf(a);
        ls[(i + (e.key === "ArrowDown" ? 1 : ls.length - 1)) % ls.length].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* any [data-close] link closes the menu; product links also open the drawer */
  const onMenuClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>("[data-close]");
    if (!a) return;
    const p = a.dataset.prod;
    closeMenuNow();
    if (p === undefined) return;
    const delay = prefersReduced() ? 0 : 450;
    if (home) setTimeout(() => emit("openDrawer", +p), delay);
    else setIntent({ type: "openDrawer", i: +p, delay });
  };

  const langGroup = (where: "m-info" | "m-quick") => (
    <div className="m-lang" role="group" aria-label="Language">
      {(["ar", "en"] as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          data-lang={l}
          lang={l}
          aria-pressed={locale === l}
          onClick={() => switchLang(l, `#menu .${where} .m-lang button[data-lang="${l}"]`)}
        >
          {l === "ar" ? "العربية" : "English"}
        </button>
      ))}
    </div>
  );

  const mLink = (k: SectionKey, i: number) => (
    <SecLink
      sec={k}
      className={"m-link" + (hot === k ? " hot" : "")}
      data-key={k}
      data-close=""
      aria-current={open ? (k === curSec ? "true" : "false") : undefined}
      onMouseEnter={() => setHot(k)}
      onFocus={() => setHot(k)}
    >
      <span>{L[`nav_${k}`]}</span>
      <sup>{pad2(i + 1)}</sup>
    </SecLink>
  );
  const toggle = (k: "brands" | "products") => (
    <button
      className="m-toggle"
      type="button"
      aria-expanded={sub === k}
      aria-controls={`sub-${k}`}
      aria-label={k === "brands" ? L.more_brands : L.more_products}
      onClick={() => setSub(sub === k ? null : k)}
    >
      <IcDown />
    </button>
  );

  const pvBody: Record<SectionKey, React.ReactNode> = {
    home: (
      <>
        <h3>{L.pv_home_t}</h3>
        <p>{L.pv_home_p}</p>
        <SecLink sec="brands" className="pv-cta" data-close="" tabIndex={-1}>{L.cta_brands}<IcArrowBare /></SecLink>
      </>
    ),
    about: (
      <>
        <h3>{L.pv_about_t}</h3>
        <p>{L.pv_about_p}</p>
        <div className="pv-stats">
          <div><b>2019</b><span>{L.s1}</span></div>
          <div><b>9</b><span>{L.s2}</span></div>
          <div><b>3</b><span>{L.s3}</span></div>
        </div>
      </>
    ),
    brands: (
      <>
        <h3>{L.pv_brands_t}</h3>
        <ul className="pv-list pvb">
          {BRANDS.map((b) => (
            <li key={b.slug}><BrandLink slug={b.slug} prefetch={false} data-close="" tabIndex={-1} dir="ltr">{b.n}</BrandLink></li>
          ))}
        </ul>
      </>
    ),
    products: (
      <>
        <h3>{L.pv_products_t}</h3>
        <ul className="pv-list">
          {PRODUCTS.map((p, i) => (
            <li key={i}><SecLink sec="products" data-prod={i} data-close="" tabIndex={-1}>{p[locale].t}</SecLink></li>
          ))}
        </ul>
      </>
    ),
    contact: (
      <>
        <h3>{L.pv_contact_t}</h3>
        <p>{L.address}<br />{L.hours}<br /><span dir="ltr">{SITE.phoneDisplay}</span></p>
        <SecLink sec="contact" className="pv-cta" data-close="" tabIndex={-1}>{L.cta_contact}<IcArrowBare /></SecLink>
      </>
    ),
  };

  return (
    <div className={"menu" + (open ? " open" : "")} id="menu" role="dialog" aria-modal="true" aria-labelledby="menuTitle" ref={menu} onClick={onMenuClick}>
      <h2 className="sr" id="menuTitle">{L.menu}</h2>
      <div className="menu-top">
        <SecLink sec="home" className="logo" data-close="" aria-label="Midpoint"><BrandPair /></SecLink>
        <button className="close-btn" id="closeBtn" type="button" onClick={() => setMenu(false)}>
          <span>{L.close}</span><span className="x" aria-hidden="true"></span>
        </button>
      </div>
      <div className="menu-body">
        <div className="m-info">
          <p className="m-tag">{L.tagline}</p>
          <OpenStatus as="p" className="m-status" id="mStatus" />
          <div className="m-actions">
            <a className="m-act" href={`mailto:${SITE.email}`}><IcMail /><span dir="ltr">{SITE.email}</span></a>
            <a className="m-act" href={`tel:+${SITE.phone}`}><IcPhone /><span>{L.m_call}</span></a>
            <a className="m-act" href={SITE.whatsapp} target="_blank" rel="noopener"><IcWa /><span>WhatsApp</span></a>
            <a className="m-act" href={SITE.maps} target="_blank" rel="noopener"><IcPin /><span>{L.m_dir}</span></a>
          </div>
          <Socials className="soc m-soc" />
          {langGroup("m-info")}
        </div>
        <nav className="m-nav" aria-labelledby="menuTitle">
          <ul
            className={"menu-links" + (hot ? " dim" : "")}
            id="mLinks"
            ref={links}
            onMouseLeave={() => {
              setHot(null);
              setPreview(curSec);
            }}
          >
            <li><div className="m-row">{mLink("home", 0)}</div></li>
            <li><div className="m-row">{mLink("about", 1)}</div></li>
            <li>
              <div className="m-row">{mLink("brands", 2)}{toggle("brands")}</div>
              <div className={"m-sub" + (sub === "brands" ? " open" : "")} id="sub-brands">
                <div>
                  <ul>
                    {BRANDS.map((b) => (
                      <li key={b.slug}><BrandLink slug={b.slug} prefetch={false} data-close="" dir="ltr">{b.n}</BrandLink></li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div className="m-row">{mLink("products", 3)}{toggle("products")}</div>
              <div className={"m-sub" + (sub === "products" ? " open" : "")} id="sub-products">
                <div>
                  <ul>
                    {PRODUCTS.map((p, i) => (
                      <li key={i}><SecLink sec="products" data-prod={i} data-close="">{p[locale].t}</SecLink></li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            <li><div className="m-row">{mLink("contact", 4)}</div></li>
          </ul>
        </nav>
        <div className="m-preview" id="mPreview" onMouseEnter={() => setHot(pvKey)} onMouseLeave={() => setHotKey(null)}>
          {SECTIONS.map((k, i) => (
            <div key={k} className={"pv" + (pvKey === k ? " on" : "")} data-key={k}>
              <div className="pv-mat"><Media k={PV_MAT[k]} seed={300 + i * 13} sizes="(min-width: 1080px) 30vw, 1px" /></div>
              <div className="pv-body">{pvBody[k]}</div>
            </div>
          ))}
        </div>
        <div className="m-quick">
          <Socials className="soc m-soc mq-soc" />
          <a className="m-act" href={`tel:+${SITE.phone}`}><IcPhone /><span>{L.m_call}</span></a>
          <a className="m-act" href={SITE.whatsapp} target="_blank" rel="noopener"><IcWa /><span>WhatsApp</span></a>
          {langGroup("m-quick")}
        </div>
      </div>
      <div className="menu-foot"><span>{L.tagline}</span><span dir="ltr">© 2026 Midpoint</span></div>
    </div>
  );
}
