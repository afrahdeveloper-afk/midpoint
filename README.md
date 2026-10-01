# Midpoint — ميدبوينت

Bilingual (Arabic RTL / English LTR) website for **Midpoint**, the official agent in Iraq for
Roca, TOTO, Laminam, Infinity Surfaces, Argenta, Benadresa, Alaplana, Mayolica and Vidrepur.

Built with **Next.js 16 (App Router) + TypeScript**, fully static (SSG): 2 home pages + 18 brand pages.

- [English](#english)
- [العربية](#العربية)

---

## English

### Requirements

- Node.js **20.9 or newer** (22 LTS recommended) and npm.

### Install, run, build

```bash
npm install          # install dependencies
npm run dev          # development server → http://localhost:3000 (redirects to /ar)
npm run build        # production build (static pages)
npm start            # serve the production build → http://localhost:3000
npm run lint         # ESLint
npm run typecheck    # TypeScript
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real domain
(used for canonical URLs, hreflang, Open Graph, sitemap, robots and JSON-LD).

### URLs

| URL | Page |
| --- | --- |
| `/` | Redirects to `/ar` (or `/en` if the visitor last chose English) |
| `/ar`, `/en` | Home: hero, about, brands, products, contact |
| `/ar/brands/roca`, `/en/brands/roca`, … | Brand pages (9 brands × 2 languages) |
| `/sitemap.xml`, `/robots.txt` | Generated from `app/sitemap.ts` / `app/robots.ts` |

Section links (`#about`, `#brands`, `#products`, `#contact`) are anchors on the home page.
The language switch keeps the current page and scroll position (`/ar/brands/roca` ↔ `/en/brands/roca`)
and remembers the choice in the `NEXT_LOCALE` cookie. The redirect from `/` lives in `proxy.ts`
(Next.js 16's new name for `middleware.ts`).

### Project structure

```
app/
  [locale]/layout.tsx          <html lang dir>, fonts, JSON-LD, header/menu/footer/WhatsApp
  [locale]/page.tsx            home page
  [locale]/brands/[slug]/      brand pages (generateStaticParams)
  globals.css                  the original stylesheet (unchanged except font variables)
  fonts.ts                     Cormorant Garamond + Amiri (next/font); body-fonts.css: Plex Arabic + Manrope
  sitemap.ts, robots.ts, not-found.tsx, icon.png, apple-icon.png, favicon.ico
components/
  chrome/   Preloader, Header, OverlayMenu, Footer, WhatsAppConcierge, BrandWipe
  home/     HeroSlider, About, BrandsSection, ProductsBento, ProductDrawer, Contact(Form)
  brand/    BrandPage, BrandHero, BrandGallery, GalleryLightbox, BrandTimeline, BrandSubNav
  media/    Media (next/image + focal point, or procedural SVG), Logo, BrandPair
data/        all content (see below)
lib/         store (shared UI state), navigation, SEO, procedural materials, hooks
public/      images/, logos/, brand/, og.jpg
scripts/     extract-assets.ts, fetch-fonts.ts
proxy.ts     locale redirect
lib/preloader-mode.ts   decides before first paint whether the preloader shows
```

### Editing content

All text and data live in `/data` — no need to touch components.

| What | File |
| --- | --- |
| UI text (both languages) | `data/translations.ts` — every key exists in `en` and `ar` |
| Hero slides | `data/slides.ts` |
| Brands (name, country, tags, website, filter category) | `data/brands.ts` |
| Brand pages (intro, product lines, images, founded/HQ) | `data/brand-details.ts` (keyed by slug) |
| Product categories + drawer features | `data/products.ts` |
| Phone, WhatsApp, email, address, hours, social links | `data/site.ts` |
| Page titles / descriptions, JSON-LD | `data/site.ts`, `lib/seo.ts` |

**Add a brand:** add an entry to `BRANDS` (with a new `slug`), a matching entry in `BDATA`
(`data/brand-details.ts`), and its logo (below). The page `/ar/brands/<slug>` and `/en/brands/<slug>`,
the menu, rail, sitemap and structured data pick it up automatically.

### Images

- **Photos:** put the file in `public/images/` (WebP recommended, ~1600–1920 px wide), then add a key in
  `data/images.ts` → `IMGS`. Optionally set a focal point in `IPOS` (e.g. `"my_photo": "40% 60%"`).
  Use the key anywhere a `mat` / `mats` / `hero` is expected. `next/image` serves resized versions
  automatically. When replacing a photo, prefer a new file name so caches refresh.
- **Brand logos:** put an SVG or PNG in `public/logos/` and add/update the entry in `data/logos.ts`
  (keyed by the brand name). Logos are shown as-is (the stylesheet tints them).
- **Procedural materials:** `marble`, `nero`, `stone`, `tile`, `mosaic`… are generated SVGs
  (`lib/materials.ts`) and can be used wherever a photo key can.
- **Re-extracting from the original file:** `npm run extract-assets` decodes every base64 image from
  `midpoint.html` into `public/`, regenerates the favicon/app icons and `public/og.jpg`, and writes
  `data/assets.generated.ts` (image sizes). Only needed if the original HTML changes.

### Fonts, preloader and accessibility

- **Fonts.** Display fonts come from `next/font` (`app/fonts.ts`): Cormorant Garamond 400/500 and Amiri 400,
  not preloaded. The body fonts are self-hosted in `public/fonts` (`app/body-fonts.css`, generated by
  `npm run fetch-fonts`): IBM Plex Sans Arabic 400/600 (weight 500 renders with the 600 file) and Manrope.
  Each locale preloads only its own body font (`/ar` → Plex Arabic, `/en` → Manrope). They are
  self-hosted because `next/font` can only preload per layout, and both locales share one.
- **Preloader.** Shown on desktop on the first visit of a browser session only. Phones and tablets
  (`max-width: 760px` or `pointer: coarse`) and later visits skip it: an inline script in `<head>`
  (`lib/preloader-mode.ts`) decides before the first paint, so the hero renders immediately and the
  hero photo is the LCP element.
- **Contrast.** Brass text on light backgrounds uses `--brass-ink` / `--brass-ink-lg` (end of
  `globals.css`) to meet WCAG AA. On phone widths the slide bars are progress indicators; slides change
  with the arrows or by swiping.

### Deploy to Vercel

1. Push the project to a GitHub/GitLab/Bitbucket repository.
2. In Vercel: **Add New… → Project → Import** the repository. The framework (Next.js) is detected
   automatically; keep the default build command (`next build`).
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` = `https://your-domain` (Production).
4. **Deploy.** Then add your domain under **Settings → Domains**.

Or from the terminal: `npm i -g vercel`, then `vercel` (preview) and `vercel --prod` (production).

---

<div dir="rtl" lang="ar">

## العربية

### المتطلبات

- Node.js **الإصدار 20.9 أو أحدث** (يُفضّل 22 LTS) مع npm.

### التثبيت والتشغيل والبناء

```bash
npm install          # تثبيت الحزم
npm run dev          # خادم التطوير ← http://localhost:3000 (يحوّل إلى /ar)
npm run build        # بناء نسخة الإنتاج (صفحات ثابتة)
npm start            # تشغيل نسخة الإنتاج ← http://localhost:3000
npm run lint         # فحص الكود (ESLint)
npm run typecheck    # فحص الأنواع (TypeScript)
```

انسخ الملف `.env.example` إلى `.env.local` وضع في `NEXT_PUBLIC_SITE_URL` رابط النطاق الحقيقي
(يُستخدم في الروابط الأساسية canonical وروابط اللغات وOpen Graph وملف sitemap وrobots والبيانات المنظمة).

### الروابط

| الرابط | الصفحة |
| --- | --- |
| `/` | يحوّل إلى `/ar` (أو `/en` إذا اختار الزائر الإنجليزية سابقاً) |
| `/ar` و`/en` | الصفحة الرئيسية: الواجهة، من نحن، العلامات، المنتجات، التواصل |
| `/ar/brands/roca` و`/en/brands/roca` … | صفحات العلامات (9 علامات × لغتين) |
| `/sitemap.xml` و`/robots.txt` | تُولَّد من `app/sitemap.ts` و`app/robots.ts` |

روابط الأقسام (`#about`، `#brands`، `#products`، `#contact`) هي روابط داخلية في الصفحة الرئيسية.
زر تبديل اللغة يُبقيك في نفس الصفحة ونفس موضع التمرير (`/ar/brands/roca` ↔ `/en/brands/roca`)
ويحفظ اختيارك في ملف تعريف الارتباط `NEXT_LOCALE`. التحويل من `/` موجود في `proxy.ts`
(الاسم الجديد لملف `middleware.ts` في Next.js 16).

### تعديل المحتوى

كل النصوص والبيانات موجودة في مجلد `/data` ولا حاجة لتعديل المكوّنات.

| المحتوى | الملف |
| --- | --- |
| نصوص الواجهة (باللغتين) | `data/translations.ts` — كل مفتاح موجود في `en` و`ar` |
| شرائح الواجهة الرئيسية | `data/slides.ts` |
| العلامات (الاسم، البلد، الوسوم، الموقع، فئة التصفية) | `data/brands.ts` |
| صفحات العلامات (النبذة، خطوط المنتجات، الصور، سنة التأسيس/المقر) | `data/brand-details.ts` (حسب الـ slug) |
| فئات المنتجات ومميزاتها | `data/products.ts` |
| الهاتف وواتساب والبريد والعنوان وأوقات الدوام وحسابات التواصل | `data/site.ts` |
| عناوين الصفحات ووصفها والبيانات المنظمة | `data/site.ts` و`lib/seo.ts` |

**إضافة علامة جديدة:** أضف عنصراً إلى `BRANDS` مع `slug` جديد، وعنصراً مطابقاً في `BDATA`
داخل `data/brand-details.ts`، ثم شعارها (انظر أدناه). ستظهر تلقائياً صفحتا `/ar/brands/<slug>` و`/en/brands/<slug>`
وفي القائمة وشريط العلامات وملف sitemap والبيانات المنظمة.

### الصور

- **الصور الفوتوغرافية:** ضع الملف في `public/images/` (يُفضّل WebP بعرض 1600–1920 بكسل تقريباً)، ثم أضف مفتاحاً في
  `data/images.ts` داخل `IMGS`، ويمكنك تحديد نقطة التركيز في `IPOS` (مثال: `"my_photo": "40% 60%"`).
  استخدم المفتاح في أي حقل `mat` أو `mats` أو `hero`. يقوم `next/image` بتوليد المقاسات المناسبة تلقائياً.
  عند استبدال صورة يُفضّل استخدام اسم ملف جديد لتحديث التخزين المؤقت.
- **شعارات العلامات:** ضع ملف SVG أو PNG في `public/logos/` وأضف/حدّث العنصر في `data/logos.ts` (حسب اسم العلامة).
- **الخامات المولّدة:** `marble` و`nero` و`stone` و`tile` و`mosaic`… هي رسومات SVG مولّدة برمجياً
  (`lib/materials.ts`) ويمكن استخدامها مكان أي صورة.
- **إعادة الاستخراج من الملف الأصلي:** الأمر `npm run extract-assets` يفكّ كل الصور المضمّنة بصيغة base64 من
  `midpoint.html` إلى `public/`، ويعيد توليد الأيقونات وصورة المشاركة `public/og.jpg`، ويكتب `data/assets.generated.ts`.
  لا تحتاجه إلا إذا تغيّر ملف HTML الأصلي.

### الخطوط وشاشة التحميل وإمكانية الوصول

- **الخطوط:** خطوط العناوين تأتي من `next/font` (`app/fonts.ts`): Cormorant Garamond بوزنَي 400/500 وAmiri بوزن 400،
  دون تحميل مسبق. خطوط النصوص مستضافة ذاتياً في `public/fonts` (`app/body-fonts.css` ويولّدها الأمر `npm run fetch-fonts`):
  IBM Plex Sans Arabic بوزنَي 400/600 (الوزن 500 يُعرض بملف 600) وManrope.
  كل لغة تحمّل مسبقاً خط نصوصها فقط (`/ar` ← Plex Arabic، `/en` ← Manrope). استُضيفت ذاتياً لأن `next/font`
  لا يستطيع التحميل المسبق إلا لكل ملف layout، واللغتان تشتركان في ملف واحد.
- **شاشة التحميل:** تظهر على الحاسوب في أول زيارة ضمن جلسة المتصفح فقط. الهواتف والأجهزة اللوحية
  (`max-width: 760px` أو `pointer: coarse`) والزيارات اللاحقة تتخطاها: سكربت صغير داخل `<head>`
  (`lib/preloader-mode.ts`) يقرر قبل أول رسم للصفحة، فتظهر الواجهة فوراً وتكون صورتها هي عنصر LCP.
- **التباين:** النصوص النحاسية على الخلفيات الفاتحة تستخدم `--brass-ink` و`--brass-ink-lg` (نهاية
  `globals.css`) لتحقيق معيار WCAG AA. على شاشات الهواتف تعمل أشرطة الشرائح كمؤشر تقدّم فقط، ويتم التنقل بالأسهم أو بالسحب.

### النشر على Vercel

1. ارفع المشروع إلى مستودع على GitHub أو GitLab أو Bitbucket.
2. في Vercel: **Add New… ← Project ← Import** واختر المستودع. سيتعرّف تلقائياً على Next.js؛ اترك أمر البناء الافتراضي (`next build`).
3. في **Environment Variables** أضف `NEXT_PUBLIC_SITE_URL` = `https://نطاقك` (لبيئة Production).
4. اضغط **Deploy**، ثم أضف النطاق من **Settings ← Domains**.

أو من الطرفية: `npm i -g vercel` ثم `vercel` (نسخة معاينة) و`vercel --prod` (الإنتاج).

</div>
