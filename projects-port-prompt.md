# Add the "Projects / مشاريعنا" section to the Next.js site (new feature)

The Projects section was added to the design AFTER the Next.js port, so it does not exist in the
project yet. The latest design file (midpoint.html in this folder) contains the complete, final
version. Port it from there — do not use the older update notes.

Files to place in the project root (next to package.json):
- midpoint.html            -> the LATEST design file (replace the old copy)
- project-images.zip       -> project photos, already cropped/compressed, named <id>-<n>.webp

## Prompt for Claude Code (paste this)

The Projects section ("مشاريعنا") is a new feature that only exists in the latest ./midpoint.html.
Port it into our Next.js site exactly as it behaves there.

1. Assets: unzip ./project-images.zip into /public/projects/ (files are <project-id>-<n>.webp).
2. Data: create data/projects.ts from these constants in midpoint.html:
   PROJECTS (14 projects: id, en, ar, y, san, por, elev?, place?), PJ_TYPE (car showrooms /
   residential / hotels & retail / leisure), PJ_BI, and the project translations
   (keys starting with nav_projects, pj_, pjt_, pjf_, pjd_, pjp_). Map each project's images to
   /public/projects/<id>-<n>.webp instead of the embedded PJ_IMG data URIs.
3. Section (home page, between "Our brands" and "Products"), id="projects":
   - Title + stats (count-up), filter chips (All, Car showrooms, Residential, Hotels & retail,
     Leisure | Roca, TOTO, Porcelain).
   - ONE continuous moving lane of same-size portrait photo cards (class prefix pj-mq / pj-lane /
     pj-track / pj-card / pjc-*), seamless loop ~4.2s per card, pauses only on card hover/focus or
     via the pause button, mouse drag to browse (a drag must not open the dialog), duplicates
     aria-hidden + tabindex -1, reduced motion = static scrollable lane.
4. Project dialog (#pjDlg, class "pj-dlg pjx"): split layout with photo viewer (contain-fit,
   prev/next, swipe, arrow keys, counter, thumbnails) and details panel (type + year, name, place,
   facts grid, scope cards with icons, brand logo links to brand pages, sticky WhatsApp
   "Start a similar project" + "Request a quote" that prefills the contact form, previous/next
   project inside the dialog). Full-screen on mobile. Native <dialog>, focus management, Escape.
5. Menu & navigation: add "Projects / مشاريعنا" to the overlay menu as item 05 (Contact becomes 06)
   with its preview panel, to the header section indicator, and to the footer links.
6. Styles: copy the CSS blocks from midpoint.html whose comments start with
   "Projects", "project photos", "Projects: moving strip", "Project details: pro" and
   "single continuous lane" (ignore "Projects: pro" — that list layout was replaced).
7. Keep RTL/LTR, both languages, reduced motion. Use next/image.
8. Run `npm run build`, fix errors, and show me screenshots of the section and the dialog
   in Arabic and English (desktop and mobile).

Before finishing, also compare the brand pages and the colours with midpoint.html. If any of these
newer design changes are missing, list them for me (do not apply them yet):
the brand page hero (mosaic gallery + lightbox), the heritage timeline, the slim/transparent brand
header with the brand-logo link, the brand logo in "Get to know", and the slate-blue colour palette.
