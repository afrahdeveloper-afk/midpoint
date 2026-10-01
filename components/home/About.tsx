"use client";
import { useEffect, useRef } from "react";
import { Media } from "@/components/media/Media";
import { IcArrow, PILLAR_PATHS } from "@/components/icons";
import { WORLD_MAP_SVG } from "./world-map";
import { T } from "@/data/translations";
import { pad2, prefersReduced, useLocale } from "@/lib/hooks";
import { persist } from "@/lib/store";
import { addInstant, useReveal } from "@/lib/reveal";

function countUp(el: HTMLElement) {
  const to = +(el.dataset.to ?? 0), from = +(el.dataset.from ?? 0);
  if (prefersReduced()) {
    el.textContent = String(to);
    return;
  }
  const t0 = performance.now(), d = 1600;
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 3);
    el.textContent = String(Math.round(from + (to - from) * e));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function About() {
  const L = T[useLocale()];
  const stack = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  useReveal("about", root);

  /* stats count-up, origin arcs and the steps line (added once, when 35% visible) */
  useEffect(() => {
    const els = ["stats", "origin", "steps"].map((id) => document.getElementById(id)!);
    const pending = els.filter((el) => {
      if (!persist.seenIds.has(el.id)) return true;
      addInstant(el, "seen");
      return false;
    });
    if (!("IntersectionObserver" in window)) {
      pending.forEach((el) => el.classList.add("seen"));
      return;
    }
    const io2 = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          if (el.id === "stats") el.querySelectorAll<HTMLElement>(".num").forEach(countUp);
          el.classList.add("seen");
          persist.seenIds.add(el.id);
          io2.unobserve(el);
        }),
      { threshold: 0.35 },
    );
    pending.forEach((el) => io2.observe(el));
    return () => io2.disconnect();
  }, []);

  /* parallax material stack */
  useEffect(() => {
    if (prefersReduced()) return;
    const st = stack.current!;
    const layers = [...st.querySelectorAll<HTMLElement>(".layer")];
    let tk = false;
    const par = () => {
      tk = false;
      const r = st.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const c = r.top + r.height / 2 - innerHeight / 2;
      layers.forEach((l) => (l.style.transform = `translate3d(0,${(c * +(l.dataset.speed ?? 0)).toFixed(1)}px,0)`));
    };
    const onScroll = () => {
      if (!tk) {
        tk = true;
        requestAnimationFrame(par);
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    const raf = requestAnimationFrame(par); // first measure after the first frame
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="sec about" id="about" ref={root}>
      <div className="ab-head wrap">
        <div className="rv">
          <p className="kicker">{L.nav_about}</p>
          <h2 className="ab-title">{L.about_quote}</h2>
        </div>
        <div className="ab-intro rv">
          <p>{L.about_p1}</p>
          <a className="link-arrow" href="#contact"><span>{L.cta_visit}</span><IcArrow /></a>
        </div>
      </div>

      <div className="ab-body wrap">
        <div className="stack rv" id="stack" aria-hidden="true" ref={stack}>
          <div className="layer l1" data-speed="-0.06"><Media k="inf_vanity" sizes="(min-width: 980px) 420px, 74vw" /></div>
          <div className="layer l2" data-speed="0.08"><Media k="ab_wall_relief" sizes="(min-width: 980px) 300px, 52vw" /></div>
          <div className="layer l3" data-speed="0.16"><Media k="ab_mosaic_silver" sizes="(min-width: 980px) 170px, 30vw" /></div>
          <div className="seal"><b>2019</b><span>{L.seal}</span></div>
        </div>
        <div className="ab-copy">
          <p className="ab-lead rv">{L.about_p2}</p>
          <ul className="pillars" id="pillars">
            {L.pillars.map((p, i) => (
              <li key={i} className="pillar rv seen">
                <span className="ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">{PILLAR_PATHS[i]}</svg>
                </span>
                <div><h3>{p[0]}</h3><p>{p[1]}</p></div>
              </li>
            ))}
          </ul>
          <div className="aud rv">
            <p>{L.aud_h}</p>
            <ul id="aud">{L.aud.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </div>
      </div>

      <dl className="stats wrap rv" id="stats">
        <div><dt><span className="num" data-to="2019" data-from="2000">2019</span></dt><dd>{L.f1}</dd></div>
        <div><dt><span className="num" data-to="9">9</span></dt><dd>{L.f2}</dd></div>
        <div><dt><span className="num" data-to="3">3</span></dt><dd>{L.f3}</dd></div>
        <div><dt><span className="num" data-to="1">1</span></dt><dd>{L.f4}</dd></div>
      </dl>

      <div className="origin wrap rv" id="origin">
        <div className="origin-txt">
          <h3>{L.or_h}</h3>
          <p>{L.or_p}</p>
          <ul className="legend" id="legend">
            {L.legend.map((l) => (
              <li key={l[1]}><b>{l[0]}</b><span dir="ltr">{l[1]}</span><em>{l[2]}</em></li>
            ))}
          </ul>
        </div>
        <div className="map">
          <svg className="map-svg" viewBox="0 0 1000 420" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: WORLD_MAP_SVG }} />
          <span className="pin-l" style={{ left: "9.1%", top: "47.4%" }}>{L.c_spain}</span>
          <span className="pin-l" style={{ left: "15.6%", top: "35.5%" }}>{L.c_italy}</span>
          <span className="pin-l" style={{ left: "88.4%", top: "63.4%" }}>{L.c_japan}</span>
          <span className="pin-l hub" style={{ left: "36.0%", top: "65.0%" }}>{L.c_baghdad}</span>
        </div>
      </div>

      <div className="how wrap">
        <div className="how-head rv"><p className="kicker">{L.how_k}</p><h3>{L.how_h}</h3></div>
        <ol className="steps rv" id="steps">
          {L.steps.map((s, i) => (
            <li key={i} className="step"><span className="n">{pad2(i + 1)}</span><h4>{s[0]}</h4><p>{s[1]}</p></li>
          ))}
        </ol>
      </div>
      <p className="ab-close wrap rv">{L.about_p3}</p>
    </section>
  );
}
