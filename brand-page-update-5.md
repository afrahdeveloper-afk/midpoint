# Midpoint: Brand page update 5 (fixed header)

On brand pages only:
- The header (utility bar on desktop / main bar on mobile) is FIXED and never hides on scroll.
- The brand sub-nav (Midpoint mark, tabs, brand-logo link) is visible immediately at the top,
  not only after scrolling past the hero, and stays fixed under the header.
- The hero content is pushed down so the logo and gallery sit below both bars.

JS changes:
- Header auto-hide on scroll is disabled when the body has `on-brand`.
- Sub-nav visibility is always `on` for brand pages.

```css
/* ---- Brand pages: fixed header + sub-nav always visible ---- */
body.on-brand .bp-sub{transform:none !important;opacity:1 !important;pointer-events:auto !important}
@media (min-width:900px){
  #bp .bh .bh-copy{top:calc(env(safe-area-inset-top,0px) + 44px + 56px + 26px)}
  #bp .bh .bh-gal{top:calc(env(safe-area-inset-top,0px) + 44px + 56px + 26px + clamp(30px,3.4vw,52px) + 30px) !important}
}
@media (max-width:899px){
  body.on-brand .hdr-in{height:68px}
  body.on-brand .hdr{background:rgba(12,22,38,.94)}
  body.on-brand .bp-sub{top:calc(env(safe-area-inset-top,0px) + 68px)}
}
@media (max-width:760px){ #bp .bh{padding-top:calc(env(safe-area-inset-top,0px) + 68px + 56px + 16px)} }
```

## Prompt for Claude Code
Read ./brand-page-update-5.md and apply it to the brand pages of our Next.js site:
make the header and the brand sub-nav fixed and visible from the top (no auto-hide on scroll),
and offset the hero content as in the CSS. Home page behaviour stays unchanged.
Run `npm run build` and fix any errors.
