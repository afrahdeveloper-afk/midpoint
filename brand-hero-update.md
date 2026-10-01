# Midpoint: Brand page hero update (mosaic gallery + lightbox)

This file contains ONLY the new brand-page hero from midpoint.html:
- The full-bleed auto slider is replaced by ONE static hero with a mosaic of up to 4 images.
- Clicking any tile opens a full-screen gallery (lightbox) with all brand images,
  prev/next, keyboard arrows, swipe, counter, caption + line description, thumbnails.

## Data used (already in your project)
- `bh` = ordered list of slides for the current brand: `{ key, li }`
  - `key` = image key (IMGS) or procedural material key (MAT)
  - `li`  = index into `BDATA[slug].lines` (or -1 = use category name)
  - Built as: hero image first (`d.hero`, label from `d.heroLi` if set), then each `d.mats[i]`
    (skip duplicates of the hero image), max 6.
- `BHT[i]` = pre-rendered thumbnail/tile markup for `bh[i]` (img or svg).
- Label: `bhLabel(d, s)`; description: `d.lines[s.li][1]` (EN) / `[3]` (AR).

## Markup (hero)
```html
<div class="bh" id="bpTop">
    <div class="bh-slides" id="bpMat"></div>
    <div class="bh-bg" id="bhBg" aria-hidden="true"></div>
    <div class="bh-gal" id="bhGal" role="list"></div>
    <div class="bh-copy" id="bhCopy">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#home" data-i="nav_home"></a><span aria-hidden="true">/</span><a href="#brands" data-i="nav_brands"></a><span aria-hidden="true">/</span><span id="bpCrumb" aria-current="page" dir="ltr"></span></nav>
      <div class="bp-logo" id="bpLogo" aria-hidden="true"></div>
      <h1 id="bpName" tabindex="-1" dir="ltr" aria-label=""></h1>
      <ul class="bp-chips" id="bpChips"></ul>
      <p class="bp-intro" id="bpIntro"></p>
      <ul class="specs bh-specs" id="bhSpecs"></ul>
      <div class="bp-cta">
        <button class="btn solid-dark" type="button" id="bpAsk"></button>
        <a class="btn line" id="bpSite" target="_blank" rel="noopener"><span data-i="br_site"></span><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 12L12 4M6 4h6v6"/></svg></a>
      </div>
    </div>
    <a class="next bh-next" id="bhNextBrand" href="#brands">
      <span class="next-thumb" id="bhNextThumb" aria-hidden="true"></span>
      <span class="next-txt"><small data-i="bp_next"></small><span id="bhNextName" dir="ltr"></span></span>
    </a>
    <div class="bh-cap" id="bhCap" aria-live="polite"><small data-i="bh_now"></small><b id="bhCapT"></b><p id="bhCapP"></p></div>
    <button class="cue bh-cue" type="button" id="bhCue"><span class="cue-mouse" aria-hidden="true"><i></i></span><span data-i="scroll"></span></button>
    <div class="bh-ctrl" id="bhCtrl">
      <div class="count" aria-hidden="true"><span class="cn"><b id="bhNum">01</b></span><span class="ct" id="bhTot">/ 01</span></div>
      <div class="bars bh-bars" id="bhBars"></div>
      <div class="arrows">
        <button class="arrow" id="bhZoom" type="button" data-i-aria="bp_zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>
        <button class="arrow bh-nav" id="bhPrev" type="button" data-i-aria="prev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M15 5l-7 7 7 7"/></svg></button>
        <button class="arrow bh-nav" id="bhNext" type="button" data-i-aria="next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M9 5l7 7-7 7"/></svg></button>
      </div>
    </div>
  </div>
```
Note: `.bh-slides`, `.bh-ctrl`, `.bh-cap`, `.bh-cue`, `.bh-next` are now hidden and can be deleted.
The new elements are `#bhBg` (blurred background) and `#bhGal` (mosaic).

## Markup (lightbox dialog)
```html
<dialog class="lb" id="bpLb" aria-labelledby="lbCap">
  <div class="lb-stage"><div class="lb-media" id="lbMedia"></div></div>
  <div class="lb-info"><span class="lb-count" id="lbCount"></span><p class="lb-cap" id="lbCap"></p><p class="lb-desc" id="lbDesc"></p></div>
  <button class="lb-nav lb-prev" type="button" id="lbPrev" data-i-aria="prev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M15 5l-7 7 7 7"/></svg></button>
  <button class="lb-nav lb-next" type="button" id="lbNext" data-i-aria="next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M9 5l7 7-7 7"/></svg></button>
  <div class="lb-thumbs" id="lbThumbs"></div>
  <button class="lb-x" type="button" id="lbClose" data-i-aria="close"><span class="x" aria-hidden="true"></span></button>
</dialog>
```

## CSS
```css
/* ---- Brand hero: mosaic gallery (3–4 tiles) + lightbox ---- */
.bh .bh-slides,.bh .bh-ctrl,.bh .bh-cap,.bh .bh-cue,.bh .bh-next{display:none !important}
.bh{background:var(--navy-deep)}
.bh-bg{position:absolute;inset:-60px;background-size:cover;background-position:center;filter:blur(48px) saturate(1.1) brightness(.38);transform:scale(1.1);opacity:.9}
.bh-bg::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 30% 60%,rgba(12,22,38,.2),rgba(12,22,38,.85))}
.bh-copy{z-index:5;max-width:min(560px,40vw)}
.bh-copy::before{display:none}
.bh-gal{position:absolute;z-index:4;inset-inline-end:var(--pad);top:calc(env(safe-area-inset-top,0px) + 140px);bottom:clamp(48px,8vh,90px);width:min(56vw,860px);display:grid;gap:12px;grid-template-columns:1.35fr 1fr 1fr;grid-template-rows:1fr 1fr}
.bh-gal[data-n="1"]{grid-template-columns:1fr;grid-template-rows:1fr}
.bh-gal[data-n="2"]{grid-template-columns:1.3fr 1fr;grid-template-rows:1fr}
.bh-gal[data-n="3"] .gt1{grid-row:1 / span 2}.bh-gal[data-n="3"] .gt2,.bh-gal[data-n="3"] .gt3{grid-column:2 / span 2}
.bh-gal[data-n="4"] .gt1{grid-row:1 / span 2}.bh-gal[data-n="4"] .gt2{grid-column:2 / span 2}
.gt{position:relative;overflow:hidden;display:block;padding:0;border:0;background:var(--navy);cursor:zoom-in;color:var(--pearl);text-align:start;clip-path:inset(0 0 100% 0);animation:gtIn 1.1s var(--ease) var(--d,.2s) forwards;box-shadow:0 30px 60px -30px rgba(0,0,0,.7)}
@keyframes gtIn{to{clip-path:inset(0 0 0 0)}}
.gt-img{position:absolute;inset:0}
.gt-img img.ph,.gt-img svg{position:absolute;inset:0;width:100%;height:100%;transform:scale(1.12);transition:transform 1.2s var(--ease-out)}
.gt .gt-img img.ph,.gt .gt-img svg{animation:gtZoom 1.6s var(--ease-out) var(--d,.2s) forwards}
@keyframes gtZoom{to{transform:scale(1)}}
.gt:hover .gt-img img.ph,.gt:hover .gt-img svg,.gt:focus-visible .gt-img img.ph{transform:scale(1.07) !important;transition:transform 1s var(--ease-out)}
.gt::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(12,22,38,.8) 0,rgba(12,22,38,0) 46%);transition:opacity .4s}
.gt-lbl{position:absolute;z-index:2;inset-inline:16px;bottom:14px;display:flex;align-items:baseline;gap:10px;font-size:14px;font-weight:500;transform:translateY(4px);transition:transform .4s var(--ease-out)}
.gt-lbl small{font-size:11px;color:var(--brass-soft);font-variant-numeric:tabular-nums}
.gt1 .gt-lbl{font-family:var(--f-display);font-size:22px;font-weight:400}
.gt-zoom{position:absolute;z-index:2;top:12px;inset-inline-end:12px;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(12,22,38,.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(233,230,224,.25);opacity:0;transform:scale(.8);transition:opacity .3s,transform .4s var(--ease-out)}
.gt-zoom svg{width:16px;height:16px;color:var(--brass-soft)}
.gt:hover .gt-zoom,.gt:focus-visible .gt-zoom{opacity:1;transform:none}
.gt:hover .gt-lbl{transform:none}
.gt-more{position:absolute;z-index:3;inset:0;display:grid;place-items:center;background:rgba(12,22,38,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);font-family:var(--f-display);font-size:40px;color:var(--pearl);transition:background .3s}
.gt:hover .gt-more{background:rgba(12,22,38,.4)}
.gt:focus-visible{outline:2px solid var(--brass-soft);outline-offset:3px}
@media (hover:none){.gt-zoom{opacity:1;transform:none}}
@media (max-width:1100px){.bh-copy{max-width:min(520px,44vw)}.bh-gal{width:48vw}}
@media (max-width:760px){
  .bh{height:auto;min-height:0;padding-top:calc(env(safe-area-inset-top,0px) + 76px);padding-bottom:28px}
  .bh-bg{inset:0}
  .bh-gal{position:relative;inset:auto;width:auto;margin:0 12px;height:62vw;min-height:260px}
  .bh-copy{position:relative;inset:auto;max-width:none;margin:22px var(--pad) 0;padding-bottom:0}
  .gt1 .gt-lbl{font-size:17px}.gt-lbl{font-size:12px;inset-inline:10px;bottom:10px}
}
/* gallery lightbox */
.lb{padding:0}
.lb[open]{display:grid;grid-template-rows:1fr auto auto;place-items:stretch}
.lb-stage{position:relative;display:grid;place-items:center;padding:calc(env(safe-area-inset-top,0px) + 64px) clamp(56px,8vw,120px) 10px;min-height:0}
.lb-media{max-width:100%;max-height:100%;display:grid;place-items:center;min-height:0;height:100%}
.lb-media img{max-width:100%;max-height:calc(100vh - 260px);width:auto;height:auto;object-fit:contain;box-shadow:0 40px 100px -30px rgba(0,0,0,.8)}
.lb-media .lb-svg{width:min(80vw,1100px);aspect-ratio:16/10;position:relative}
.lb-media .lb-svg svg{position:absolute;inset:0;width:100%;height:100%}
.lb-media.in>*{animation:lbImg .5s var(--ease-out)}
.lb-info{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:center;gap:6px 16px;padding:10px 24px 0;text-align:center}
.lb-count{font-size:12px;color:rgba(233,230,224,.5);font-variant-numeric:tabular-nums}
.lb .lb-cap{position:static;font-size:22px;margin:0}
.lb-desc{flex-basis:100%;margin:0;font-size:13px;color:rgba(233,230,224,.62);max-width:60ch;margin-inline:auto}
.lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:56px;height:56px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(233,230,224,.25);color:var(--pearl);transition:border-color .2s,background .2s}
.lb-nav:hover{border-color:var(--brass-soft);background:rgba(217,198,163,.08)}
.lb-nav svg{width:20px;height:20px}
.lb-prev{left:clamp(10px,2vw,28px)}.lb-next{right:clamp(10px,2vw,28px)}
.lb-thumbs{display:flex;justify-content:center;gap:8px;overflow-x:auto;scrollbar-width:none;padding:14px 20px calc(env(safe-area-inset-bottom,0px) + 18px)}
.lb-thumbs::-webkit-scrollbar{display:none}
.lb-thumbs button{flex:none;position:relative;width:72px;height:50px;overflow:hidden;opacity:.45;outline:1px solid rgba(233,230,224,.2);transition:opacity .25s,outline-color .25s}
.lb-thumbs button span{position:absolute;inset:0}
.lb-thumbs button img.ph,.lb-thumbs button svg{position:absolute;inset:0;width:100%;height:100%}
.lb-thumbs button:hover{opacity:.8}.lb-thumbs button.on{opacity:1;outline:2px solid var(--brass-soft)}
@media (max-width:760px){.lb-nav{width:44px;height:44px}.lb-stage{padding-inline:12px}.lb-thumbs button{width:56px;height:40px}}
@media (prefers-reduced-motion:reduce){.gt{animation:none;clip-path:none}.gt .gt-img img.ph,.gt .gt-img svg{animation:none;transform:none}}
```

## JavaScript (logic to port into React components)
```js
function bhLabel(d,s){ const i=s.li; return i>=0&&d.lines[i] ? (lang==="ar"?d.lines[i][2]:d.lines[i][0]) : PRODUCTS[d.cat][lang].t; }

function renderGal(k){
  const d=BDATA[BRANDS[k].slug], g=$("#bhGal"), n=bh.length, show=Math.min(4,n), extra=n-show;
  g.dataset.n=show; const L=T[lang];
  g.innerHTML=bh.slice(0,show).map((s,i)=>`<button class="gt gt${i+1}" type="button" role="listitem" style="--d:${.25+i*.12}s" aria-label="${bhLabel(d,s)}">
      <span class="gt-img">${BHT[i]}</span>
      <span class="gt-lbl"><small>${String(i+1).padStart(2,"0")}</small>${bhLabel(d,s)}</span>
      <span class="gt-zoom" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></span>
      ${i===show-1&&extra>0?`<span class="gt-more" dir="ltr">+${extra}</span>`:""}</button>`).join("");
  $$("#bhGal .gt").forEach((b,i)=>b.addEventListener("click",()=>openGal(i)));
  const k0=bh[0].key; $("#bhBg").style.backgroundImage = IMGS[k0] ? `url(${IMGS[k0]})` : "none";
}

let lbI=0, lbList=[];
function lbShow(i,anim){ if(!lbList.length) return; lbI=(i+lbList.length)%lbList.length; const s=lbList[lbI], d=BDATA[BRANDS[bhKey].slug];
  const m=$("#lbMedia"); m.classList.remove("in"); void m.offsetWidth;
  m.innerHTML = IMGS[s.key] ? `<img src="${IMGS[s.key]}" alt="${bhLabel(d,s)}">` : `<div class="lb-svg">${MAT[s.key](2000+lbI*13)}</div>`; m.classList.add("in");
  $("#lbCount").textContent=`${String(lbI+1).padStart(2,"0")} / ${String(lbList.length).padStart(2,"0")}`;
  $("#lbCap").textContent=`${BRANDS[bhKey].n}: ${bhLabel(d,s)}`;
  const li=s.li; $("#lbDesc").textContent = li>=0&&d.lines[li] ? (lang==="ar"?d.lines[li][3]:d.lines[li][1]) : "";
  $$("#lbThumbs button").forEach((b,k)=>{ b.classList.toggle("on",k===lbI); b.setAttribute("aria-current",k===lbI); });
  const on=$("#lbThumbs .on"); on&&on.scrollIntoView({inline:"center",block:"nearest",behavior:reduce?"auto":"smooth"}); }
function openGal(i){ lbList=bh.slice(); const d=BDATA[BRANDS[bhKey].slug];
  $("#lbThumbs").innerHTML=lbList.map((s,k)=>`<button type="button" aria-label="${bhLabel(d,s)}"><span>${BHT[k]||MAT[s.key](3000+k)}</span></button>`).join("");
  $$("#lbThumbs button").forEach((b,k)=>b.addEventListener("click",()=>lbShow(k)));
  lbShow(i); if(lb.showModal) lb.showModal(); else lb.setAttribute("open",""); document.body.classList.add("locked"); setTimeout(()=>$("#lbClose").focus(),50); }
function openLb(k,cap){ const i=bh.findIndex(s=>s.key===k); openGal(i<0?0:i); }

function closeLb(){ lb.close?lb.close():lb.removeAttribute("open"); }
lb.addEventListener("close",()=>document.body.classList.remove("locked"));
$("#lbClose").addEventListener("click",closeLb);
$("#lbPrev").addEventListener("click",()=>lbShow(lbI+(lang==="ar"?1:-1)));
$("#lbNext").addEventListener("click",()=>lbShow(lbI+(lang==="ar"?-1:1)));
lb.addEventListener("keydown",e=>{ if(e.key==="ArrowRight") lbShow(lbI+(lang==="ar"?-1:1)); if(e.key==="ArrowLeft") lbShow(lbI+(lang==="ar"?1:-1)); });
{ let sx=null; lb.addEventListener("pointerdown",e=>{ sx=e.clientX; }); lb.addEventListener("pointerup",e=>{ if(sx===null) return; const dx=e.clientX-sx; sx=null; if(Math.abs(dx)>50){ const fwd=lang==="ar"?dx>0:dx<0; lbShow(lbI+(fwd?1:-1)); } }); }
lb.addEventListener("click",e=>{ if(e.target===lb) closeLb(); });
```
- Autoplay of the old slider is disabled (no timer needed any more).
- `fitBh()` now sets the copy bottom to `clamp(48px,8vh,90px)` (no control bar).
- `+N` badge uses `dir="ltr"` so it reads "+2" in Arabic.

---

## Prompt for Claude Code (paste this)

I updated the brand page hero in the original design. The new spec is in
./brand-hero-update.md (markup, CSS and JS logic from the source HTML).

Update our Next.js brand page (/[locale]/brands/[slug]) to match it exactly:
1. Replace the current full-bleed hero slider with a static hero:
   - Left/right copy stays as it is (logo, title, chips, intro, specs, CTAs).
   - New `BrandGallery` component: mosaic of up to 4 tiles
     (layout rules for 1/2/3/4 tiles as in the CSS), "+N" on the last tile
     when the brand has more images, staggered clip-path reveal, hover zoom,
     expand icon, number + line label on each tile.
   - Blurred background layer from the first image (`.bh-bg`).
   - Remove the slider controls, "now showing" card, scroll cue and
     next-brand card from the hero, and remove the autoplay timer.
2. New `GalleryLightbox` component (use the native <dialog>):
   - Opens at the clicked tile index and shows ALL brand images, not only 4.
   - Prev/next buttons, ArrowLeft/ArrowRight (reversed in Arabic RTL),
     swipe on touch, Escape to close, focus the close button on open,
     restore focus on close, lock body scroll while open.
   - Counter "03 / 06", caption "Brand: Line", line description,
     thumbnail strip with the active one highlighted and scrolled into view.
   - Images shown uncropped (object-fit: contain) with next/image.
3. Keep RTL/LTR, prefers-reduced-motion, and mobile layout (gallery on top,
   copy below) exactly as in the CSS.
4. Run `npm run build` and fix any errors. Then show me the result.
