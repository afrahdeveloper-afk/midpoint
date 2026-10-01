"use client";
import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/media/Media";
import { IcNext, IcPrev } from "@/components/icons";
import { BrandLink, SecLink } from "@/components/nav/Links";
import { SLIDES } from "@/data/slides";
import { BRANDS } from "@/data/brands";
import { LOGOS } from "@/data/logos";
import { Logo } from "@/components/media/Logo";
import { T } from "@/data/translations";
import { pad2, prefersReduced, useCompact, useIsoLayoutEffect, useLocale, useReducedMotion } from "@/lib/hooks";
import { getShared, on, persist, remember, useHeroStarted } from "@/lib/store";

const DUR = 7000;
const N = SLIDES.length;

/** Keep the hero copy clear of the header and the controls (adds .fit1–.fit3). */
export function fitHero() {
  const h = document.getElementById("home"), copy = document.getElementById("heroCopy");
  const ctrl = h?.querySelector<HTMLElement>(".hero-ctrl"), hb = document.querySelector<HTMLElement>(".hdr .hdr-in");
  if (!h || !copy || !ctrl || !hb) return;
  h.classList.remove("fit1", "fit2", "fit3");
  const hr = h.getBoundingClientRect(), gapBottom = hr.bottom - ctrl.getBoundingClientRect().top + 36;
  copy.style.bottom = gapBottom + "px";
  const need = () => copy.getBoundingClientRect().top < hb.getBoundingClientRect().bottom + 48;
  for (const c of ["fit1", "fit2", "fit3"]) {
    if (!need()) break;
    h.classList.add(c);
  }
}

export function HeroSlider() {
  const locale = useLocale();
  const L = T[locale];
  const reduce = useReducedMotion();
  const compact = useCompact();

  const [cur, setCur] = useState(() => persist.hero.cur);
  const [prev, setPrev] = useState<number | null>(null);
  const [textIdx, setTextIdx] = useState(() => persist.hero.cur);
  // copy is "in" once the preloader has handed over, except while a slide change swaps the text
  const started = useHeroStarted();
  const [textOut, setTextOut] = useState(false);
  const copyIn = started && !textOut;
  const [roll, setRoll] = useState(false);
  const [userPausedSet, setUserPausedSet] = useState<boolean | null>(() => persist.hero.userPaused);
  const userPaused = userPausedSet ?? reduce;

  const hero = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const sweep = useRef<HTMLDivElement>(null);
  const nextProg = useRef<HTMLElement>(null);
  const barI = useRef<(HTMLElement | null)[]>([]);
  const clock = useRef({ cur: persist.hero.cur, start: 0, prog: persist.hero.prog, hover: false, hidden: false, userPaused: false, textT: 0, pendingIn: false });

  const paintProgress = () => {
    const c = clock.current, w = c.prog * 100 + "%";
    const bar = barI.current[c.cur];
    if (bar) bar.style.width = w;
    if (nextProg.current) nextProg.current.style.width = w;
  };

  const setHeroText = (i: number, animate: boolean) => {
    const c = clock.current;
    clearTimeout(c.textT);
    if (!animate || prefersReduced()) {
      setTextIdx(i);
      setTextOut(false);
      return;
    }
    setTextOut(true);
    setRoll(true);
    c.textT = window.setTimeout(() => {
      c.pendingIn = true;
      setTextIdx(i);
      setRoll(false);
    }, 520);
  };

  const go = (n: number) => {
    const c = clock.current;
    n = (n + N) % N;
    if (n === c.cur) return;
    setPrev(c.cur);
    setCur(n);
    const sw = sweep.current;
    if (sw) {
      sw.classList.remove("run");
      void sw.offsetWidth;
      sw.classList.add("run");
    }
    c.cur = n;
    c.prog = 0;
    c.start = performance.now();
    remember("hero", { cur: n, prog: 0 });
    setHeroText(n, true);
  };
  const goRef = useRef(go);
  useIsoLayoutEffect(() => {
    goRef.current = go;
    clock.current.userPaused = userPaused;
  });

  /* new slide: reset the inline progress on every bar (the original rebuilt them) */
  useIsoLayoutEffect(() => {
    barI.current.forEach((i) => i && (i.style.width = ""));
    paintProgress();
  }, [cur]);

  /* new text: fit, then slide the lines in on the next frame */
  const mounted = useRef(false);
  useIsoLayoutEffect(() => {
    // first mount on page load: the copy is still hidden under the preloader, so measure
    // after the first frame instead of forcing a layout during hydration
    if (!mounted.current && !persist.heroStarted) {
      mounted.current = true;
      const raf = requestAnimationFrame(fitHero);
      return () => cancelAnimationFrame(raf);
    }
    mounted.current = true;
    fitHero();
    const c = clock.current;
    if (!c.pendingIn) return;
    c.pendingIn = false;
    void copy.current?.offsetWidth;
    const raf = requestAnimationFrame(() => setTextOut(false));
    return () => cancelAnimationFrame(raf);
  }, [textIdx]);

  /* the clock (starts when the preloader hands over) */
  useEffect(() => {
    const c = clock.current;
    let raf = 0;
    const isPaused = () => c.userPaused || c.hover || c.hidden;
    const tick = (t: number) => {
      if (!isPaused()) {
        c.prog = Math.min(1, (t - c.start) / DUR);
        remember("hero", { prog: c.prog });
        paintProgress();
        if (c.prog >= 1) goRef.current(c.cur + 1);
      } else c.start = t - c.prog * DUR;
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      c.start = performance.now() - c.prog * DUR;
      raf = requestAnimationFrame(tick);
    };
    let off = () => {};
    if (persist.heroStarted) start();
    else off = on("heroStart", start);
    return () => {
      off();
      cancelAnimationFrame(raf);
      clearTimeout(c.textT);
    };
  }, []);

  /* keyboard, visibility, parallax, swipe, resize */
  /* glass chips fill with the brand blue as the hero scrolls away (--hs: 0 at the top → 1 at 40% scrolled) */
  useEffect(() => {
    const h = hero.current!;
    let raf = 0;
    const set = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, scrollY / (h.offsetHeight * 0.4)));
      h.style.setProperty("--hs", p.toFixed(3));
    };
    const onScroll = () => void (raf ||= requestAnimationFrame(set));
    set();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const h = hero.current!, c = clock.current;
    const rtl = () => document.documentElement.dir === "rtl";
    const onKey = (e: KeyboardEvent) => {
      if (getShared().menuOpen) return;
      if (h.getBoundingClientRect().bottom < 100) return;
      if (/INPUT|TEXTAREA|SELECT/.test((document.activeElement as HTMLElement | null)?.tagName ?? "")) return;
      if (e.key === "ArrowRight") goRef.current(c.cur + (rtl() ? -1 : 1));
      if (e.key === "ArrowLeft") goRef.current(c.cur + (rtl() ? 1 : -1));
    };
    const onVis = () => {
      c.hidden = document.hidden;
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVis);
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => es.forEach((en) => (c.hidden = !en.isIntersecting || document.hidden)), { threshold: 0.2 });
      io.observe(h);
    }
    const onMove = (e: PointerEvent) => {
      const r = h.getBoundingClientRect();
      h.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      h.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    const onLeave = () => {
      h.style.setProperty("--mx", "0");
      h.style.setProperty("--my", "0");
    };
    const parallax = matchMedia("(pointer:fine)").matches && !prefersReduced();
    if (parallax) {
      h.addEventListener("pointermove", onMove);
      h.addEventListener("pointerleave", onLeave);
    }
    let px: number | null = null, py = 0;
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) return;
      px = e.clientX;
      py = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      if (px === null) return;
      const dx = e.clientX - px, dy = e.clientY - py;
      px = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        const fwd = rtl() ? dx > 0 : dx < 0;
        goRef.current(c.cur + (fwd ? 1 : -1));
      }
    };
    h.addEventListener("pointerdown", onDown);
    h.addEventListener("pointerup", onUp);
    const onResize = () => requestAnimationFrame(fitHero);
    addEventListener("resize", onResize);
    if (document.fonts?.ready) document.fonts.ready.then(() => fitHero());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
      if (parallax) {
        h.removeEventListener("pointermove", onMove);
        h.removeEventListener("pointerleave", onLeave);
      }
      h.removeEventListener("pointerdown", onDown);
      h.removeEventListener("pointerup", onUp);
      removeEventListener("resize", onResize);
    };
  }, []);

  const pauseOn = () => {
    clock.current.hover = true;
  };
  const pauseOff = () => {
    clock.current.hover = false;
  };
  const s = SLIDES[textIdx], d = s[locale];
  const n = (textIdx + 1) % N;

  return (
    <section
      className="hero"
      id="home"
      aria-roledescription="carousel"
      aria-label="Midpoint"
      ref={hero}
      onFocus={pauseOn}
      onBlur={pauseOff}
    >
      <div className="slides-wrap">
        <div id="slides">
          {SLIDES.map((sl, i) => (
            <div key={i} className={"slide" + (i === cur ? " active" : "") + (i === prev && i !== cur ? " prev" : "")} aria-hidden={i !== cur}>
              <div className="mat"><Media k={sl.mat} sizes="100vw" preload={i === 0} fetchPriority={i === 0 ? "high" : undefined} /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="sweep" id="sweep" aria-hidden="true" ref={sweep}></div>
      <div
        className={"hero-copy" + (copyIn ? " in" : "") + (started && textOut ? " out" : "")}
        id="heroCopy"
        aria-live={userPaused ? "polite" : "off"}
        aria-atomic="true"
        ref={copy}
        onMouseEnter={pauseOn}
        onMouseLeave={pauseOff}
      >
        <div className="ln d1">
          <ul className="pills" id="hBrands">
            {s.brands.split(" · ").map((b) => {
              // short names in the slide data ("Benadresa", "Alaplana") are part of the full name
              const k = BRANDS.findIndex((x) => x.n.split(" ").includes(b) || x.n.startsWith(b));
              return (
                <li key={b}>
                  {k >= 0 ? (
                    <BrandLink slug={BRANDS[k].slug} dir="ltr" className={LOGOS[BRANDS[k].n] ? "pill-logo" : undefined}>
                      {LOGOS[BRANDS[k].n] ? <Logo name={BRANDS[k].n} alt={b} slug={BRANDS[k].slug} eager /> : b}
                    </BrandLink>
                  ) : (
                    <SecLink sec="brands" dir="ltr">{b}</SecLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <h1 id="hTitle">
          {d.t.map((l, k) => (
            <span key={k} className={`ln d${k + 1}`}><span>{l}</span></span>
          ))}
        </h1>
        <p className="lead ln d3"><span id="hText">{d.s}</span></p>
        <div className="ln d4">
          <ul className="specs" id="hSpecs">{d.sp.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="btns ln d5">
          <span className="btn-row">
            {/* the whitespace matters: .btn-row is display:block here (.ln>span wins), so the gap is a space */}
            <a className="btn solid" href="#brands">{L.cta_brands}</a>{" "}
            <a className="btn ghost" href="#contact">{L.cta_contact}</a>
          </span>
        </div>
      </div>
      <button
        className="next"
        id="nextCard"
        type="button"
        aria-label={`${L.next_up}: ${SLIDES[n][locale].bar}`}
        onClick={() => go(clock.current.cur + 1)}
        onMouseEnter={pauseOn}
        onMouseLeave={pauseOff}
      >
        <span className="next-thumb" id="nextThumb" aria-hidden="true"><Media key={n} k={SLIDES[n].mat} seed={500 + n * 11} sizes="84px" /></span>
        <span className="next-txt"><small>{L.next_up}</small><span id="nextTitle">{SLIDES[n][locale].bar}</span></span>
        <span className="next-prog" aria-hidden="true"><i id="nextProg" ref={nextProg}></i></span>
      </button>
      <a className="cue" href="#about"><span className="cue-mouse" aria-hidden="true"><i></i></span><span>{L.scroll}</span></a>
      <div className="hero-ctrl" onMouseEnter={pauseOn} onMouseLeave={pauseOff}>
        <div className={"count" + (roll ? " roll" : "")} aria-hidden="true">
          <span className="cn"><b id="cNum">{pad2(textIdx + 1)}</b></span>
          <span className="ct">/ {pad2(N)}</span>
        </div>
        <div className="bars" id="bars">
          {SLIDES.map((sl, i) => (
            <button
              key={i}
              type="button"
              className={"bar" + (i < cur ? " done" : "") + (i === cur ? " on" : "")}
              aria-label={`${i + 1} / ${N}: ${sl[locale].bar}`}
              aria-current={i === cur ? "true" : undefined}
              disabled={compact}
              aria-hidden={compact || undefined}
              onClick={() => go(i)}
            >
              <em>{sl[locale].bar}</em>
              <i ref={(el) => void (barI.current[i] = el)}></i>
            </button>
          ))}
        </div>
        <div className="arrows">
          <button
            className="arrow play"
            id="playBtn"
            type="button"
            aria-pressed={userPaused}
            aria-label={userPaused ? L.play : L.pause}
            onClick={() => {
              remember("hero", { userPaused: !userPaused });
              setUserPausedSet(!userPaused);
            }}
          >
            <svg className="i-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3" height="14" /><rect x="14" y="5" width="3" height="14" /></svg>
            <svg className="i-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
          </button>
          <button className="arrow" id="prevBtn" type="button" aria-label={L.prev} onClick={() => go(clock.current.cur - 1)}><IcPrev /></button>
          <button className="arrow" id="nextBtn" type="button" aria-label={L.next} onClick={() => go(clock.current.cur + 1)}><IcNext /></button>
        </div>
      </div>
    </section>
  );
}
