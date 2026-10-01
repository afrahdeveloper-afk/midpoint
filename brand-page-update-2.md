# Midpoint: Brand page update 2

Changes on the brand page (/[locale]/brands/[slug]):
1. Remove the small brand logo above the brand name in the hero (keep the big name).
2. Hide the thin top utility bar (status / address / phone / socials) on brand pages only.
3. New section "Heritage timeline" (المسيرة) after "About the company" and before "Product lines":
   horizontal, scroll-snap, drag-to-scroll with mouse, prev/next buttons, gold progress line,
   staggered reveal when in view. RTL-aware. Hidden for brands without timeline data
   (Infinity Surfaces, Nueva Alaplana).

## Timeline data (add `tl` to each brand in BDATA)
Each item: [year, titleEN, textEN, titleAR, textAR]
```json
{
 "roca": [
  [
   "1917",
   "Founded in Gavà",
   "The Roca brothers start making cast-iron radiators near Barcelona.",
   "التأسيس في غافا",
   "الإخوة روكا يبدؤون صناعة المشعّات الحديدية قرب برشلونة."
  ],
  [
   "1929",
   "Into the bathroom",
   "Production of cast-iron baths marks Roca's entry into the bathroom.",
   "دخول عالم الحمّام",
   "إنتاج أحواض الاستحمام الحديدية يفتح لروكا باب قطاع الحمّامات."
  ],
  [
   "1936",
   "Vitreous china",
   "Roca begins producing vitreous china sanitaryware.",
   "البورسلين الصحي",
   "روكا تبدأ إنتاج الأدوات الصحية من البورسلين."
  ],
  [
   "1954",
   "Faucets",
   "Manufacturing of taps begins.",
   "الخلاطات",
   "بدء تصنيع الخلاطات."
  ],
  [
   "1999",
   "Laufen",
   "Acquisition of Keramik Holding Laufen, the world's fourth-largest vitreous china maker.",
   "لاوفن",
   "الاستحواذ على مجموعة Laufen السويسرية، رابع أكبر مصنّع للبورسلين الصحي في العالم."
  ],
  [
   "2006",
   "World leader",
   "Roca becomes the global leader in the bathroom sector.",
   "الريادة العالمية",
   "روكا تصبح الشركة الرائدة عالمياً في قطاع الحمّامات."
  ],
  [
   "2017",
   "Centenary",
   "Roca celebrates 100 years since its founding.",
   "مئوية روكا",
   "روكا تحتفل بمرور 100 عام على تأسيسها."
  ]
 ],
 "toto": [
  [
   "1917",
   "Founded in Kitakyushu",
   "TOTO begins producing ceramic sanitaryware in Japan.",
   "التأسيس في كيتاكيوشو",
   "توتو تبدأ إنتاج الأدوات الصحية الخزفية في اليابان."
  ],
  [
   "1980",
   "WASHLET is born",
   "The warm-water cleansing seat that changed bathroom culture.",
   "ولادة WASHLET",
   "مقعد الشطاف بالماء الدافئ الذي غيّر ثقافة الحمّام."
  ],
  [
   "1987",
   "First integrated WASHLET",
   "WASHLET QUEEN, the first toilet with WASHLET built in.",
   "أول WASHLET مدمج",
   "WASHLET QUEEN، أول مرحاض بشطاف مدمج."
  ],
  [
   "1993",
   "NEOREST",
   "The first tankless toilet design, with electronic flush control.",
   "NEOREST",
   "أول تصميم مرحاض بدون خزان، مع تحكّم إلكتروني بالسيفون."
  ],
  [
   "1997",
   "CEFIONTECT",
   "An ultra-smooth glaze that leaves nowhere for waste to cling.",
   "CEFIONTECT",
   "طلاء فائق النعومة لا يسمح للأوساخ بالالتصاق."
  ],
  [
   "2002",
   "Tornado Flush",
   "The first rimless toilet with the powerful Tornado Flush.",
   "Tornado Flush",
   "أول مرحاض بدون حافة مع نظام السيفون الإعصاري."
  ],
  [
   "2022",
   "60 million WASHLET",
   "60 million WASHLET units sold worldwide since 1980.",
   "60 مليون WASHLET",
   "بيع 60 مليون وحدة WASHLET حول العالم منذ 1980."
  ]
 ],
 "laminam": [
  [
   "2001",
   "Founded",
   "Laminam is founded in Fiorano Modenese, Italy.",
   "التأسيس",
   "تأسيس لامينام في فيورانو مودينيزي بإيطاليا."
  ],
  [
   "Slabs",
   "Large and thin",
   "Large ceramic slabs with minimum thickness challenge traditional uses of ceramics.",
   "ألواح كبيرة ورقيقة",
   "ألواح سيراميك كبيرة بأقل سماكة تتجاوز الاستخدامات التقليدية."
  ],
  [
   "Today",
   "Architecture to furniture",
   "Façades, interiors, kitchen tops and furnishing elements worldwide.",
   "من العمارة إلى الأثاث",
   "واجهات وتصميم داخلي وأسطح مطابخ وأثاث حول العالم."
  ]
 ],
 "argenta": [
  [
   "1999",
   "Founded in Vila-real",
   "A young, people-friendly ceramic concept is born in Spain.",
   "التأسيس في فيلاريال",
   "ولادة مفهوم سيراميك شاب وقريب من الناس في إسبانيا."
  ],
  [
   "Looks",
   "Six material worlds",
   "Stone, marble, wood, concrete, rustic and textures.",
   "ستة عوالم للمواد",
   "حجر ورخام وخشب وإسمنت وريفي وملمس."
  ],
  [
   "2026",
   "General Catalogue 2026",
   "New collections, including stonetech porcelain such as San Vicente.",
   "كتالوج 2026",
   "مجموعات جديدة، منها بورسلين stonetech مثل San Vicente."
  ]
 ],
 "benadresa": [
  [
   "AB",
   "Constant evolution",
   "Innovative collections in many sizes, textures and colours.",
   "تطوّر دائم",
   "مجموعات مبتكرة بمقاسات وملمس وألوان متعددة."
  ],
  [
   "100+",
   "Global reach",
   "Present in more than a hundred countries.",
   "انتشار عالمي",
   "متواجدة في أكثر من مئة دولة."
  ],
  [
   "2026",
   "Cersaie 2026",
   "New collections FRAGMENTA, THOLOS, IMPULSE, SABINE and TORINO.",
   "Cersaie 2026",
   "مجموعات جديدة: FRAGMENTA وTHOLOS وIMPULSE وSABINE وTORINO."
  ]
 ],
 "mayolica": [
  [
   "L'Alcora",
   "Born in ceramic country",
   "Rooted in the heart of Spain's ceramic district.",
   "من قلب السيراميك",
   "وُلدت في قلب منطقة السيراميك الإسبانية."
  ],
  [
   "Styles",
   "Four styles",
   "Small formats, subway, rustic and hydraulic tiles.",
   "أربعة أنماط",
   "بلاط صغير المقاس وسبواي وريفي وهيدروليكي."
  ],
  [
   "2026",
   "Cersaie 2026",
   "New collections Moon, Formentera, Stripes, Strata and Vulcano.",
   "Cersaie 2026",
   "مجموعات جديدة: Moon وFormentera وStripes وStrata وVulcano."
  ]
 ],
 "vidrepur": [
  [
   "30+",
   "Three decades of glass",
   "More than 30 years making recycled glass mosaic in Almazora.",
   "ثلاثة عقود من الزجاج",
   "أكثر من 30 عاماً في صناعة الموزاييك من الزجاج المعاد تدويره."
  ],
  [
   "2.5 · 3.8",
   "Iconic formats",
   "The classic 2.5 and 3.8 cm mosaic formats.",
   "مقاسات أيقونية",
   "مقاسا الموزاييك الكلاسيكيان 2.5 و3.8 سم."
  ],
  [
   "2026",
   "New 5×5 format",
   "A new 5×5 cm format presented at Cersaie 2026.",
   "مقاس 5×5 الجديد",
   "مقاس جديد 5×5 سم قُدّم في Cersaie 2026."
  ],
  [
   "Today",
   "Worldwide projects",
   "Pools and spaces from Kuala Lumpur to England and Miami.",
   "مشاريع حول العالم",
   "مسابح ومساحات من كوالالمبور إلى إنكلترا وميامي."
  ]
 ]
}
```
Translations: en `tl_k:"Heritage"`, `tl_h:"The story of"`; ar `tl_k:"المسيرة"`, `tl_h:"قصة"`.

## Markup
```html
<section class="bp-tl" id="bpTl" aria-labelledby="bpTlH">
    <div class="tl-head"><div><p class="kicker" data-i="tl_k"></p><h2 id="bpTlH"></h2></div>
      <div class="tl-nav"><button class="arrow" type="button" id="tlPrev" data-i-aria="prev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M15 5l-7 7 7 7"/></svg></button><button class="arrow" type="button" id="tlNext" data-i-aria="next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M9 5l7 7-7 7"/></svg></button></div></div>
    <div class="tl-wrap"><div class="tl-line" aria-hidden="true"><i id="tlFill"></i></div><ol class="tl-track" id="tlTrack"></ol></div>
  </section>
```

## Render logic (inside brand page render)
```js
  { const tl=d.tl||[], sec=$("#bpTl"); sec.hidden=!tl.length;
    $("#bpTlH").innerHTML=`${L.tl_h} <span dir="ltr">${b.n}</span>`;
    $("#tlTrack").innerHTML=tl.map((x,i)=>`<li class="tl-item" style="--i:${i}"><span class="tl-dot" aria-hidden="true"></span><b class="tl-year" dir="ltr">${x[0]}</b><h3>${lang==="ar"?x[3]:x[1]}</h3><p>${lang==="ar"?x[4]:x[2]}</p></li>`).join("");
    sec.classList.remove("seen"); $("#tlTrack").scrollLeft=0; requestAnimationFrame(()=>tlUpdate()); }
```

## Behaviour
```js
/* brand timeline */
function tlUpdate(){ const tr=$("#tlTrack"); if(!tr) return; const max=tr.scrollWidth-tr.clientWidth; const p=max>0?Math.abs(tr.scrollLeft)/max:1;
  $("#tlFill").style.transform=`scaleX(${Math.max(.08,p)})`; $("#tlPrev").disabled=Math.abs(tr.scrollLeft)<4; $("#tlNext").disabled=Math.abs(tr.scrollLeft)>max-4; }
$("#tlTrack").addEventListener("scroll",()=>requestAnimationFrame(tlUpdate),{passive:true});
const tlStep=dir=>{ const tr=$("#tlTrack"), w=(tr.querySelector(".tl-item")||{offsetWidth:300}).offsetWidth+24; tr.scrollBy({left:dir*w*(document.documentElement.dir==="rtl"?-1:1),behavior:reduce?"auto":"smooth"}); };
$("#tlPrev").addEventListener("click",()=>tlStep(-1)); $("#tlNext").addEventListener("click",()=>tlStep(1));
if("IntersectionObserver" in window) new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting) en.target.classList.add("seen"); }),{threshold:.25}).observe($("#bpTl"));
{ let down=false,sx=0,sl=0; const tr=$("#tlTrack");
  tr.addEventListener("pointerdown",e=>{ if(e.pointerType!=="mouse") return; down=true; sx=e.clientX; sl=tr.scrollLeft; tr.classList.add("drag"); });
  addEventListener("pointermove",e=>{ if(!down) return; tr.scrollLeft=sl-(e.clientX-sx); });
  addEventListener("pointerup",()=>{ down=false; tr.classList.remove("drag"); }); }
```

## CSS
```css
/* ---- remove small logo in brand hero + top utility bar on brand pages ---- */
.bh .bp-logo{display:none}
body.on-brand .util{display:none}
@media (min-width:900px){body.on-brand .bh-gal{top:calc(env(safe-area-inset-top,0px) + 108px)}}
/* ---- Brand heritage timeline ---- */
.bp-tl[hidden]{display:none}
.bp-tl{margin-top:clamp(72px,9vw,128px);padding:clamp(56px,7vw,96px) 0 clamp(56px,7vw,88px);background:var(--navy-deep);color:var(--pearl);position:relative;overflow:hidden}
.bp-tl::before{content:"";position:absolute;inset:0;background:radial-gradient(60vmax 40vmax at 85% 0%,rgba(184,151,106,.12),transparent 60%);pointer-events:none}
.tl-head{position:relative;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding:0 var(--pad);margin-bottom:clamp(36px,5vw,64px)}
.tl-head .kicker{color:var(--brass-soft)}
.tl-head h2{font-size:clamp(32px,4vw,56px)}
.tl-head h2 span{font-family:"Cormorant Garamond",Georgia,serif;color:var(--brass-soft)}
.tl-nav{display:flex;gap:8px}
.tl-nav .arrow{color:var(--pearl)}
.tl-nav .arrow:disabled{opacity:.3;cursor:default}
.tl-wrap{position:relative}
.tl-line{position:absolute;inset-inline:var(--pad);top:62px;height:1px;background:rgba(233,230,224,.14)}
.tl-line i{position:absolute;inset:0;background:linear-gradient(90deg,var(--brass),var(--brass-soft));transform-origin:left;transform:scaleX(.08);transition:transform .5s var(--ease-out)}
[dir="rtl"] .tl-line i{transform-origin:right;background:linear-gradient(270deg,var(--brass),var(--brass-soft))}
.tl-track{list-style:none;margin:0;padding:0 var(--pad) 8px;display:flex;gap:24px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:var(--pad);scrollbar-width:none;cursor:grab}
.tl-track::-webkit-scrollbar{display:none}
.tl-track.drag{cursor:grabbing;scroll-snap-type:none}
.tl-item{flex:0 0 clamp(240px,24vw,320px);scroll-snap-align:start;position:relative;padding-top:0;opacity:0;transform:translateY(24px);transition:opacity .8s var(--ease-out) calc(var(--i)*.09s),transform .9s var(--ease-out) calc(var(--i)*.09s)}
.bp-tl.seen .tl-item{opacity:1;transform:none}
.tl-year{display:block;height:48px;font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;font-size:clamp(34px,3.2vw,46px);line-height:48px;color:var(--brass-soft);font-variant-numeric:lining-nums;white-space:nowrap;text-align:start}
[dir="rtl"] .tl-year{text-align:right}
.tl-dot{position:absolute;top:56px;inset-inline-start:0;width:13px;height:13px;border-radius:50%;background:var(--navy-deep);border:1px solid var(--brass-soft);transition:background .4s}
.tl-item:hover .tl-dot{background:var(--brass-soft)}
.tl-item h3{margin:44px 0 8px;font-size:18px;font-weight:600;color:var(--pearl)}
.tl-item p{margin:0;font-size:14px;line-height:1.7;color:rgba(233,230,224,.66);max-width:34ch}
@media (max-width:640px){.tl-head{flex-wrap:wrap}.tl-item{flex-basis:78vw}}
@media (prefers-reduced-motion:reduce){.tl-item{opacity:1;transform:none;transition:none}}
```

---
## Prompt for Claude Code
Read ./brand-page-update-2.md and apply it to our Next.js brand page:
1. Remove the small logo above the brand title in the brand hero.
2. Hide the top utility bar in the header only on brand pages.
3. Create a `BrandTimeline` client component with the data, markup, behaviour and CSS in the file
   (add `tl` to the brands data, add the translations). Place it after the About section.
   Hide it when a brand has no `tl`. Keep RTL, drag scroll, scroll-snap with scroll-padding,
   prev/next buttons (disabled at the ends), progress line, reveal-on-view and reduced motion.
4. Run `npm run build` and fix any errors.
