# Midpoint: Brand page update 4

1. Brand hero: the brand LOGO (white) replaces the text name, centered above the images.
   The H1 stays in the DOM for SEO but is visually hidden. The gallery becomes full width
   (both sides = page padding) under the logo. Mobile: logo above the gallery.
   Roca's SVG has inner padding, so it gets a larger height.
2. Sticky brand sub-nav:
   - Start side: small Midpoint wordmark linking to the home page.
   - End side: the "Ask about <brand>" button is REPLACED by the brand logo as a link to the
     brand's official website (new tab, rel="noopener"), with a small ↗ icon and title "Official site".

## Sub-nav markup
```html
<a class="bp-sub-home" href="/[locale]" aria-label="Midpoint"><img src="/brand/midpoint-mark.webp" alt="Midpoint"></a>
<!-- tabs unchanged -->
<a class="bp-sub-brand" href="{brand.url}" target="_blank" rel="noopener" aria-label="{brand.name}: Official site">
  <img src="{brand.logo}" alt="" data-b="{brand.slug}"> <svg>↗ icon</svg>
</a>
```

## CSS (hero logo)
```css
/* brand logo as the hero title, above a full-width gallery */
#bp .bh .bp-logo img[data-b="roca"]{height:clamp(48px,5.6vw,84px) !important}
#bp .bh h1{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;margin:0}
.bh .bp-logo{display:flex !important;justify-content:center;align-items:center;height:auto;margin:0}
#bp .bh .bp-logo img{height:clamp(30px,3.4vw,52px);max-height:none;max-width:min(380px,70vw);width:auto;object-fit:contain;filter:brightness(0) invert(1);opacity:0;animation:inUp .9s var(--ease-out) .15s forwards}
.bh-copy{max-width:none !important;text-align:center}
@media (min-width:761px){
  .bh-copy{inset-inline:var(--pad) !important;top:calc(env(safe-area-inset-top,0px) + 76px);bottom:auto !important;display:flex;justify-content:center}
  .bh-gal{inset-inline:var(--pad) !important;width:auto !important;top:calc(env(safe-area-inset-top,0px) + 76px + clamp(30px,3.4vw,52px) + 34px) !important;bottom:clamp(40px,6vh,72px) !important}
}
@media (max-width:760px){
  .bh{display:flex;flex-direction:column}
  .bh-copy{order:-1;margin:6px var(--pad) 18px !important;padding-bottom:0 !important}
  #bp .bh .bp-logo img{height:32px}
  #bp .bh .bp-logo img[data-b="roca"]{height:52px}
}
```

## CSS (sub-nav)
```css
/* brand sub-nav: Midpoint mark (home) + brand logo linking to the official site */
.bp-sub-home{display:flex;align-items:center;height:30px;text-decoration:none}
.bp-sub-home .brandmark{height:100%}
.bp-sub-home img{height:26px;width:auto}
.bp-sub-brand{display:inline-flex;align-items:center;gap:10px;min-height:40px;padding:0 14px;border:1px solid rgba(233,230,224,.18);text-decoration:none;color:var(--pearl);transition:border-color .25s,background .25s}
.bp-sub-brand img{height:20px;width:auto;max-width:130px;object-fit:contain;filter:brightness(0) invert(1)}
.bp-sub-brand img[data-b="roca"]{height:30px}
.bp-sub-brand svg{width:12px;height:12px;color:var(--brass-soft);transition:transform .3s var(--ease-out)}
[dir="rtl"] .bp-sub-brand svg{transform:scaleX(-1)}
.bp-sub-brand:hover{border-color:var(--brass-soft);background:rgba(217,198,163,.08)}
.bp-sub-brand:hover svg{transform:translate(2px,-2px)}[dir="rtl"] .bp-sub-brand:hover svg{transform:scaleX(-1) translate(2px,-2px)}
```

---
## Prompt for Claude Code
Read ./brand-page-update-4.md and apply it to our Next.js brand pages:
1. In the brand hero, show the brand logo (white, centered) instead of the text name; keep an
   H1 with the brand name visually hidden for SEO; make the gallery full width under the logo.
2. In the sticky brand sub-nav, put the Midpoint wordmark (link home) on the start side and
   replace the "Ask about" button with the brand logo linking to the brand's official website.
Run `npm run build` and fix any errors.
