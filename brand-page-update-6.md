# Midpoint: Brand page update 6

- Remove the brand logo/name block under the header in the brand hero (keep the visually-hidden H1 for SEO
  if you prefer, but nothing visible). The gallery moves up under the sub-nav.
- The fixed header + brand sub-nav are TRANSPARENT (no background, no blur, no borders) while they sit over
  the hero. After the hero scrolls away (hero bottom < 110px) the body gets `past-hero` and the bars get
  their dark background back so they stay readable over light sections.

JS (inside the scroll handler of brand pages):
```js
document.body.classList.toggle("past-hero", heroEl.getBoundingClientRect().bottom < 110);
```

```css
/* ---- Brand pages: no logo under header; transparent header over the hero ---- */
#bp .bh .bh-copy{display:none !important}
@media (min-width:900px){ #bp .bh .bh-gal{top:calc(env(safe-area-inset-top,0px) + 44px + 56px + 24px) !important} }
@media (max-width:760px){ #bp .bh{padding-top:calc(env(safe-area-inset-top,0px) + 68px + 56px + 12px)} }
body.on-brand:not(.past-hero) .hdr,
body.on-brand:not(.past-hero) .hdr.solid{background:transparent !important;backdrop-filter:none !important;-webkit-backdrop-filter:none !important;box-shadow:none !important}
body.on-brand:not(.past-hero) .util{border-color:transparent !important}
body.on-brand:not(.past-hero) .bp-sub{background:transparent !important;backdrop-filter:none !important;-webkit-backdrop-filter:none !important;border-color:transparent}
body.on-brand .hdr,body.on-brand .bp-sub{transition:background .45s var(--ease-out),backdrop-filter .45s,border-color .45s,box-shadow .45s}
```

## Prompt for Claude Code
Read ./brand-page-update-6.md and apply it to our Next.js brand pages: remove the visible brand name/logo
under the header in the hero, move the gallery up, and make the fixed header and sub-nav transparent over
the hero, turning solid only after the hero is scrolled past (past-hero class). Run `npm run build`.
