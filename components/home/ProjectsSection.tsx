"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Logo } from "@/components/media/Logo";
import { IcArrow, IcWa } from "@/components/icons";
import { countUp } from "./About";
import { ProjectDialog } from "./ProjectDialog";
import { BRANDS } from "@/data/brands";
import { LOGOS } from "@/data/logos";
import { PJ_BI, PJ_TYPE, PROJECTS, pjImages, pjMatch, type Project, type ProjectFilter } from "@/data/projects";
import { T } from "@/data/translations";
import { waLink } from "@/data/site";
import { pad2, useLocale } from "@/lib/hooks";
import { useGoHome } from "@/lib/nav";
import { persist, remember } from "@/lib/store";
import { useReveal } from "@/lib/reveal";

/** The projects page (/[locale]/projects): compact intro + stats, filter sidebar, one portfolio row per project
 *  (framed photo + its facts, alternating sides), closing call to action. */
export function ProjectsSection() {
  const locale = useLocale();
  const L = T[locale];
  const [filter, setFilterState] = useState<ProjectFilter>(() => persist.projects.filter as ProjectFilter);
  const [dlg, setDlg] = useState({ open: false, i: 0, nonce: 0, swap: false });
  const goHome = useGoHome();
  const root = useRef<HTMLElement>(null);
  const stats = useRef<HTMLDListElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useReveal("projects", root);

  const name = (p: Project) => (locale === "ar" ? p.ar : p.en);
  const scope = (p: Project) => [p.por && L.pj_s_por, p.san.length > 0 && L.pj_s_san, p.elev && L.pj_s_elev].filter((x): x is string => !!x);
  const list = PROJECTS.map((p, i) => [p, i] as const).filter(([p]) => pjMatch(p, filter));

  const setFilter = (f: ProjectFilter) => {
    remember("projects", { filter: f });
    setFilterState(f);
  };

  /* stats count-up, once, when 35% visible */
  useEffect(() => {
    const el = stats.current!;
    if (persist.seenIds.has(el.id) || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (!en.isIntersecting) return;
          el.querySelectorAll<HTMLElement>(".num").forEach(countUp);
          persist.seenIds.add(el.id);
          io.disconnect();
        }),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  const years = PROJECTS.map((p) => p.y).filter((y): y is number => !!y);
  const cnt = (k: string) => PROJECTS.filter((p) => PJ_TYPE[p.id] === k).length;
  /* filter groups: a sidebar on desktop, one swipeable chip row on smaller screens */
  const groups: { h?: string; items: [ProjectFilter, string, number][] }[] = [
    { items: [["all", L.pj_all, PROJECTS.length]] },
    {
      h: L.pjf_type,
      items: [
        ["auto", L.pjt_auto, cnt("auto")],
        ["res", L.pjt_res, cnt("res")],
        ["com", L.pjt_com, cnt("com")],
        ["ent", L.pjt_ent, cnt("ent")],
      ],
    },
    {
      h: L.pj_scope,
      items: [
        ["roca", "Roca", PROJECTS.filter((p) => p.san.includes("roca")).length],
        ["toto", "TOTO", PROJECTS.filter((p) => p.san.includes("toto")).length],
        ["por", L.pj_por, PROJECTS.filter((p) => p.por).length],
      ],
    },
  ];

  return (
    <>
      <section className="sec projects" id="projects" ref={root}>
        <div className="pj-top rv">
          <div>
            <p className="kicker">{L.nav_projects}</p>
            <h1>{L.pj_h}</h1>
            <p className="pj-lead">{L.pj_pv}</p>
          </div>
          <dl className="pj-stats" id="pjStats" ref={stats}>
            <div><dt><span className="num" data-to={PROJECTS.length}>{PROJECTS.length}</span></dt><dd>{L.pj_total}</dd></div>
            <div><dt><span className="num" data-to={cnt("auto")}>{cnt("auto")}</span></dt><dd>{L.pjt_auto}</dd></div>
            <div><dt dir="ltr">{`${Math.min(...years)}–${Math.max(...years)}`}</dt><dd>{L.pj_years}</dd></div>
          </dl>
        </div>
        <div className="side-body">
          <aside className="side-filter rv" aria-label={L.nav_projects}>
            <div className="chips" id="pjChips">
              {groups.map((g, gi) => (
                <div key={gi} className="side-fg" role="group" aria-labelledby={g.h ? `pjFh${gi}` : undefined}>
                  {g.h && <h2 className="side-fh" id={`pjFh${gi}`}>{g.h}</h2>}
                  {g.items.map(([f, label, n]) => (
                    <button key={f} className="chip" type="button" data-f={f} aria-pressed={f === filter} onClick={() => setFilter(f)}>
                      {label}
                      <small>{n}</small>
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <p className="px-count" id="pjCount" aria-live="polite">{`${list.length} ${list.length === 1 ? L.pj_n1 : L.pj_n}`}</p>
          </aside>
          {/* keyed by filter so the rows replay their staggered entrance on every change */}
          <ol className="pr-list" key={filter}>
            {list.map(([p, i], k) => {
              const nm = name(p), im = pjImages(p.id);
              return (
                <li key={p.id} className="pr-row" style={{ "--k": k } as React.CSSProperties}>
                  <button className="pjs-frame pr-frame" type="button" aria-haspopup="dialog" aria-label={`${L.pj_open}: ${nm}`} onClick={(e) => openDlg(i, e.currentTarget)}>
                    <span className="pjs-img"><Image src={im[0]} alt="" fill priority={k === 0} sizes="(min-width: 1080px) 42vw, (min-width: 980px) 55vw, 100vw" /></span>
                    {im.length > 1 && <span className="pr-cnt">{`${im.length} ${L.pj_photos}`}</span>}
                  </button>
                  <div className="pr-info">
                    <span className="pr-n" aria-hidden="true">{pad2(k + 1)}</span>
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
        </div>
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
