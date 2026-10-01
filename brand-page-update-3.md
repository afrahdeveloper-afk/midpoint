# Midpoint: Brand page update 3

1. Brand pages keep the thin top utility bar (status, address, email, phone, WhatsApp, socials, language)
   and it stays visible (44px) while scrolling.
2. On brand pages (desktop ≥900px) the main header row is removed (logo, "Visit the showroom",
   section indicator). A compact "Menu ☰" button is added inside the utility bar
   (next to the language switch) to open the overlay menu.
   Mobile keeps the normal header.
3. Brand hero shows ONLY the brand name (no breadcrumb, chips, intro, specs, buttons).
   The mosaic gallery moves up under the slim bar.
4. Sticky brand sub-nav sits under the 44px bar (top: 0 when the header hides).

## Markup: add to the utility bar, before the language switch
```html
<button class="u-menu" type="button" data-open-menu>
  <span>Menu / القائمة</span><span class="burger" aria-hidden="true"><i></i><i></i></span>
</button>
```
JS: clicking `[data-open-menu]` opens the overlay menu (same as the main menu button).

## CSS
```css
/* ---- Brand pages: slim header (utility bar only) + name-only hero ---- */
.u-menu{display:none;align-items:center;gap:10px;min-height:32px;padding:0 4px;font-size:12.5px;color:var(--pearl)}
.u-menu .burger{width:22px;height:9px}
.u-menu:hover{color:var(--brass-soft)}
@media (min-width:900px){
  body.on-brand .hdr-in{display:none}
  body.on-brand .u-menu{display:inline-flex}
  body.on-brand .hdr.solid .util,body.on-brand .util{height:44px;opacity:1;border-color:rgba(233,230,224,.1)}
  body.on-brand .util-in{height:44px}
  body.on-brand .hdr{background:rgba(12,22,38,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
  body.on-brand .bp-sub{top:calc(env(safe-area-inset-top,0px) + 44px)}
  body.on-brand.hdr-hidden .bp-sub{top:env(safe-area-inset-top,0px)}
  body.on-brand .bh-gal{top:calc(env(safe-area-inset-top,0px) + 84px)}
}
/* hero: brand name only */
.bh .crumbs,.bh .bp-chips,.bh .bp-intro,.bh .bh-specs,.bh .bp-cta{display:none !important}
#bp .bh h1{margin:0;font-size:clamp(34px,3.6vw,58px);line-height:1}
.bh-copy{bottom:clamp(56px,10vh,110px) !important}
```

---
## Prompt for Claude Code
Read ./brand-page-update-3.md and apply it to the brand pages of our Next.js site:
- Keep the top utility bar on brand pages and keep it visible on scroll.
- On brand pages (desktop) hide the main header row and add the compact Menu button to the utility bar
  (it opens the existing overlay menu). Mobile header unchanged.
- Brand hero: show only the brand name; remove breadcrumb, chips, intro, specs and CTA buttons from the hero.
- Adjust the gallery top offset and the sticky sub-nav offset as in the CSS.
Then run `npm run build` and fix any errors.
