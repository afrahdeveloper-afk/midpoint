"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Logo } from "@/components/media/Logo";
import { IcArrow } from "@/components/icons";
import { countUp } from "./About";
import { ProjectDialog } from "./ProjectDialog";
import { BRANDS } from "@/data/brands";
import { LOGOS } from "@/data/logos";
import { PJ_BI, PJ_TYPE, PROJECTS, pjImages, pjMatch, type Project, type ProjectFilter } from "@/data/projects";
import { T } from "@/data/translations";
import { prefersReduced, useIsoLayoutEffect, useLocale } from "@/lib/hooks";
import { emit, persist, remember } from "@/lib/store";
import { useReveal } from "@/lib/reveal";

/** Seconds of travel per card in the moving lane. */
const SEC_PER_CARD = 4.2;

export function ProjectsSection() {
  const locale = useLocale();
  const L = T[locale];
  const [filter, setFilterState] = useState<ProjectFilter>(() => persist.projects.filter as ProjectFilter);
  const [paused, setPaused] = useState(() => persist.projects.paused);
  const [dlg, setDlg] = useState({ open: false, i: 0, nonce: 0, swap: false });
  const [filterNonce, setFilterNonce] = useState(0);
  const root = useRef<HTMLElement>(null);
  const mq = useRef<HTMLDivElement>(null);
  const lane = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stats = useRef<HTMLDListElement>(null);
  const dragged = useRef(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  useReveal("projects", root);

  const name = (p: Project) => (locale === "ar" ? p.ar : p.en);
  const list = PROJECTS.map((p, i) => [p, i] as const).filter(([p]) => pjMatch(p, filter));
  // each half of the track must be wide enough to loop seamlessly (translateX 0 → -50%)
  let reps = 1;
  while (list.length * reps < 6) reps++;
  const half = Array.from({ length: reps }, (_, r) => list.map(([p, i]) => ({ p, i, dup: r > 0 }))).flat();
  const cards = [...half, ...half.map((c) => ({ ...c, dup: true }))];

  const setFilter = (f: ProjectFilter) => {
    remember("projects", { filter: f });
    setFilterState(f);
    setFilterNonce((n) => n + 1);
  };

  /* filter change: restart the lane from the start, with the fade-in */
  useIsoLayoutEffect(() => {
    if (!filterNonce || prefersReduced()) return;
    const tr = track.current!, ln = lane.current!;
    tr.style.animation = "none";
    void tr.offsetWidth;
    tr.style.animation = "";
    ln.classList.remove("fade");
    void ln.offsetWidth;
    ln.classList.add("fade");
  }, [filterNonce]);

  /* pause button (toggled on the element: .pj-mq also carries the reveal class) */
  useIsoLayoutEffect(() => {
    mq.current?.classList.toggle("paused", paused);
  }, [paused]);

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

  /* mouse drag to scrub the lane; the loop resumes from wherever it was dropped */
  useEffect(() => {
    const ln = lane.current!, tr = track.current!;
    let down = false, sx = 0, off = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || prefersReduced()) return;
      down = true;
      dragged.current = false;
      sx = e.clientX;
      off = new DOMMatrix(getComputedStyle(tr).transform).m41;
      tr.style.animationPlayState = "paused";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 6) dragged.current = true;
      if (dragged.current) {
        tr.style.animation = "none";
        tr.style.transform = `translateX(${off + dx}px)`;
      }
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (!dragged.current) {
        tr.style.animationPlayState = "";
        return;
      }
      const w = tr.scrollWidth / 2;
      const x = ((parseFloat(tr.style.transform.replace(/[^-\d.]/g, "")) % w) - w) % w;
      const d = parseFloat(getComputedStyle(tr).getPropertyValue("--dur")) || 60;
      tr.style.transform = "";
      tr.style.animation = "";
      tr.style.animationDelay = (x / w) * d + "s";
      setTimeout(() => (dragged.current = false), 50);
    };
    ln.addEventListener("pointerdown", onDown);
    addEventListener("pointermove", onMove);
    addEventListener("pointerup", onUp);
    return () => {
      ln.removeEventListener("pointerdown", onDown);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
    };
  }, []);

  const openDlg = (i: number, from: HTMLElement) => {
    if (dragged.current) return; // a drag must not open the dialog
    lastFocus.current = from;
    setDlg((d) => ({ open: true, i, nonce: d.nonce + 1, swap: false }));
  };
  const closeDlg = useCallback(() => {
    setDlg((d) => (d.open ? { ...d, open: false } : d));
    lastFocus.current?.focus({ preventScroll: true });
  }, []);

  const quote = () => {
    const reduce = prefersReduced();
    emit("prefill", { msg: `${L.pj_wa_msg} ${name(PROJECTS[dlg.i])}`, focusDelay: reduce ? 0 : 700 });
    closeDlg();
    document.getElementById("contact")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const years = PROJECTS.map((p) => p.y).filter((y): y is number => !!y);
  const cnt = (k: string) => PROJECTS.filter((p) => PJ_TYPE[p.id] === k).length;
  const chips: ([ProjectFilter, string, number] | null)[] = [
    ["all", L.pj_all, PROJECTS.length],
    ["auto", L.pjt_auto, cnt("auto")],
    ["res", L.pjt_res, cnt("res")],
    ["com", L.pjt_com, cnt("com")],
    ["ent", L.pjt_ent, cnt("ent")],
    null,
    ["roca", "Roca", PROJECTS.filter((p) => p.san.includes("roca")).length],
    ["toto", "TOTO", PROJECTS.filter((p) => p.san.includes("toto")).length],
    ["por", L.pj_por, PROJECTS.filter((p) => p.por).length],
  ];

  return (
    <>
      <section className="sec projects" id="projects" ref={root}>
        <div className="pj-top rv">
          <div><p className="kicker">{L.nav_projects}</p><h2>{L.pj_h}</h2></div>
          <dl className="pj-stats" id="pjStats" ref={stats}>
            <div><dt><span className="num" data-to={PROJECTS.length}>{PROJECTS.length}</span></dt><dd>{L.pj_total}</dd></div>
            <div><dt><span className="num" data-to={cnt("auto")}>{cnt("auto")}</span></dt><dd>{L.pjt_auto}</dd></div>
            <div><dt dir="ltr">{`${Math.min(...years)}–${Math.max(...years)}`}</dt><dd>{L.pj_years}</dd></div>
          </dl>
        </div>
        <div className="pj-bar rv">
          <div className="chips" role="group" id="pjChips">
            {chips.map((c, k) =>
              c ? (
                <button key={c[0]} className="chip" type="button" data-f={c[0]} aria-pressed={c[0] === filter} onClick={() => setFilter(c[0])}>
                  {c[1]}
                  <small>{c[2]}</small>
                </button>
              ) : (
                <span key={`sep${k}`} className="pj-sep" aria-hidden="true"></span>
              ),
            )}
          </div>
          <p className="px-count" id="pjCount" aria-live="polite">{`${list.length} ${list.length === 1 ? L.pj_n1 : L.pj_n}`}</p>
        </div>
        <div className="pj-mq rv" id="pjMq" role="region" aria-label={L.nav_projects} ref={mq}>
          <div className="pj-lane" data-dir="1" ref={lane} hidden={!list.length}>
            <div className="pj-track" ref={track} style={{ "--dur": `${list.length * reps * SEC_PER_CARD}s` } as React.CSSProperties}>
              {cards.map(({ p, i, dup }, k) => {
                const nm = name(p), im = pjImages(p.id);
                return (
                  <button
                    key={`${filter}-${k}`}
                    className="pj-card"
                    type="button"
                    data-i={i}
                    aria-hidden={dup || undefined}
                    tabIndex={dup ? -1 : undefined}
                    aria-haspopup={dup ? undefined : "dialog"}
                    aria-label={`${nm}${p.y ? ", " + p.y : ""}`}
                    onClick={(e) => openDlg(i, e.currentTarget)}
                  >
                    <span className="pjc-img"><Image src={im[0]} alt="" fill sizes="(max-width: 760px) 70vw, 380px" draggable={false} /></span>
                    <span className="pjc-top">
                      <span className="pjc-type">{L[`pjt_${PJ_TYPE[p.id]}`]}</span>
                      {im.length > 1 && <span className="pjc-cnt" dir="ltr">{im.length}</span>}
                    </span>
                    <span className="pjc-body">
                      <span className="pjc-year" dir="ltr">{p.y || ""}</span>
                      <b dir={/^[A-Za-z]/.test(nm) ? "ltr" : undefined}>{nm}</b>
                      <span className="pjc-foot">
                        <span className="pjc-logos">
                          {p.san.map((s) => {
                            const b = BRANDS[PJ_BI[s]];
                            return LOGOS[b.n] ? <Logo key={s} name={b.n} alt={b.n} slug={b.slug} /> : b.n;
                          })}
                        </span>
                        <span className="pjc-more">{L.pj_open}<IcArrow /></span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pj-mq-ctrl rv">
          <button
            className="arrow play"
            id="pjPlay"
            type="button"
            aria-pressed={paused}
            aria-label={paused ? L.play : L.pause}
            onClick={() => {
              remember("projects", { paused: !paused });
              setPaused(!paused);
            }}
          >
            <svg className="i-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3" height="14" /><rect x="14" y="5" width="3" height="14" /></svg>
            <svg className="i-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
          </button>
          <span className="pj-hint">{L.pj_hint}</span>
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
