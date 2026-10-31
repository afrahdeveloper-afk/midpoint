# Midpoint: Projects strip — ONE continuous lane

Apply this change only to the projects moving strip (ProjectsMarquee). Nothing else changes.

## What changes
1. Show ONE lane only. Remove the second (reverse-direction) lane. All filtered projects go in that single lane.
2. All cards have the same size: portrait 4:5, width `clamp(280px, 26vw, 380px)`; on mobile `70vw`.
3. The strip moves continuously (about 4.2 seconds per card, seamless loop).
4. It pauses ONLY when a card is hovered or keyboard-focused, or when the pause button is pressed.
   Hovering the empty space of the strip does NOT stop it.
5. Hint text under the strip:
   - EN: "Hover a project to pause, drag to browse, click for details"
   - AR: "مرّر على أي مشروع لإيقافه، اسحب للتصفح، واضغط لعرض التفاصيل"

## Logic
```js
// build only one lane (no split into two rows)
const items = filteredProjects;                 // every project that passes the active filter
let reps = 1; while (items.length * reps < 6) reps++;   // make each half wide enough
// track content = (items repeated `reps` times) twice  -> animate translateX(0 -> -50%) for a seamless loop
// duplicates (everything except the first set) get aria-hidden="true" and tabindex="-1"
track.style.setProperty("--dur", (items.length * reps * 4.2) + "s");
```

## CSS
```css
/* single lane */
.pj-lane[data-dir="-1"]{ display:none !important; }   /* or remove the second lane from the markup */

.pj-mq .pj-card{ width:clamp(280px,26vw,380px); aspect-ratio:4/5; }
@media (max-width:760px){ .pj-mq .pj-card{ width:70vw; } }

/* keep moving when hovering the strip; pause only on a card */
.pj-mq:hover .pj-track{ animation-play-state:running; }
.pj-mq .pj-track:has(.pj-card:hover),
.pj-mq .pj-track:has(.pj-card:focus-visible),
.pj-mq.paused .pj-track{ animation-play-state:paused; }
```

---

## Prompt for Claude Code (paste this)

Read ./projects-single-lane-update.md and apply it to our ProjectsMarquee component:
- Render a single lane only (remove the reverse lane) with all filtered projects.
- Same-size portrait cards as in the CSS, 70vw on mobile.
- Continuous seamless loop at ~4.2s per card; pause only while a card is hovered or focused, or when
  the pause button is pressed (hovering the empty strip keeps it moving).
- Update the hint text in both languages.
Keep the filters, drag-to-browse, reduced-motion behaviour, RTL and the project dialog unchanged.
Run `npm run build` and fix any errors.
