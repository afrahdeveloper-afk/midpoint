"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Logo } from "@/components/media/Logo";
import { IcArrow, IcWa } from "@/components/icons";
import { ProjectDialog } from "./ProjectDialog";
import { BRANDS } from "@/data/brands";
import { LOGOS } from "@/data/logos";
import { PJ_BI, PJ_TYPE, PROJECTS, pjImages, type Project } from "@/data/projects";
import { T } from "@/data/translations";
import { waLink } from "@/data/site";
import { pad2, useLocale } from "@/lib/hooks";
import { useGoHome } from "@/lib/nav";
import { useReveal } from "@/lib/reveal";

/** The projects page (/[locale]/projects): one portfolio row per project (framed photo + its facts,
 *  alternating sides), then the closing call to action. */
export function ProjectsSection() {
  const locale = useLocale();
  const L = T[locale];
  const [dlg, setDlg] = useState({ open: false, i: 0, nonce: 0, swap: false });
  const goHome = useGoHome();
  const root = useRef<HTMLElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useReveal("projects", root);

  const name = (p: Project) => (locale === "ar" ? p.ar : p.en);
  const scope = (p: Project) => [p.por && L.pj_s_por, p.san.length > 0 && L.pj_s_san, p.elev && L.pj_s_elev].filter((x): x is string => !!x);

  const openDlg = (i: number, from: HTMLElement) => {
    lastFocus.current = from;
    setDlg((d) => ({ open: true, i, nonce: d.nonce + 1, swap: false }));
  };
  const closeDlg = useCallback(() => {
    setDlg((d) => (d.open ? { ...d, open: false } : d));
    lastFocus.current?.focus({ preventScroll: true });
  }, []);

  /* the contact form lives on the home page: go there with the message prefilled */
  const quote = () => {
    closeDlg();
    goHome("contact", { type: "prefill", msg: `${L.pj_wa_msg} ${name(PROJECTS[dlg.i])}` });
  };

  return (
    <>
      <section className="sec projects" id="projects" ref={root}>
        {/* no visible heading or filters: the project rows open the page; the h1 stays for screen readers and search */}
        <h1 className="sr">{L.nav_projects}</h1>
        <ol className="pr-list">
          {PROJECTS.map((p, i) => {
            const nm = name(p), im = pjImages(p.id);
            return (
              <li key={p.id} className="pr-row" style={{ "--k": i } as React.CSSProperties}>
                <button className="pjs-frame pr-frame" type="button" aria-haspopup="dialog" aria-label={`${L.pj_open}: ${nm}`} onClick={(e) => openDlg(i, e.currentTarget)}>
                  <span className="pjs-img"><Image src={im[0]} alt="" fill priority={i === 0} sizes="(min-width: 1080px) 42vw, (min-width: 980px) 55vw, 100vw" /></span>
                  {im.length > 1 && <span className="pr-cnt">{`${im.length} ${L.pj_photos}`}</span>}
                </button>
                <div className="pr-info">
                  <span className="pr-n" aria-hidden="true">{pad2(i + 1)}</span>
                  <p className="pjs-kicker">{L[`pjt_${PJ_TYPE[p.id]}`]}</p>
                  <h2 dir={/^[A-Za-z]/.test(nm) ? "ltr" : undefined}>{nm}</h2>
                  <dl className="pjs-facts">
                    {p.place && <div><dt>{L.pjs_place}</dt><dd>{locale === "ar" ? p.place[1] : p.place[0]}</dd></div>}
                    {scope(p).length > 0 && <div><dt>{L.pj_scope}</dt><dd>{scope(p).join(locale === "ar" ? "، " : ", ")}</dd></div>}
                    {p.san.length > 0 && (
                      <div>
                        <dt>{L.pjf_brands}</dt>
                        <dd className="pr-logos">
                          {p.san.map((s) => {
                            const b = BRANDS[PJ_BI[s]];
                            return LOGOS[b.n] ? <Logo key={s} name={b.n} alt={b.n} slug={b.slug} /> : <span key={s} dir="ltr">{b.n}</span>;
                          })}
                        </dd>
                      </div>
                    )}
                    {p.y && <div><dt>{L.pjf_year}</dt><dd dir="ltr">{p.y}</dd></div>}
                  </dl>
                  <button className="pjs-more" type="button" aria-haspopup="dialog" onClick={(e) => openDlg(i, e.currentTarget)}>{L.pj_open}<IcArrow /></button>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="page-cta rv">
          <div>
            <h2>{L.pj_cta_t}</h2>
            <p>{L.pj_cta_p}</p>
          </div>
          <div className="page-cta-act">
            <button type="button" className="btn solid" onClick={() => goHome("contact")}>{L.cta_contact}<IcArrow /></button>
            <a className="btn ghost" href={waLink(L.pj_cta_wa)} target="_blank" rel="noopener"><IcWa full={false} /><span>WhatsApp</span></a>
          </div>
        </div>
      </section>
      <ProjectDialog
        open={dlg.open}
        i={dlg.i}
        nonce={dlg.nonce}
        swap={dlg.swap}
        onClose={closeDlg}
        onGo={(i) => setDlg((d) => ({ ...d, i, nonce: d.nonce + 1, swap: true }))}
        onQuote={quote}
      />
    </>
  );
}
