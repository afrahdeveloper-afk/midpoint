/**
 * Extracts every base64 data URI embedded in the original single-file site
 * (midpoint.html) into real files, and generates the derived assets.
 *
 *   npm run extract-assets            # reads ./midpoint.html
 *   npm run extract-assets -- other.html
 *
 * Writes:
 *   public/images/<key>.webp        photography (the IMGS map)
 *   public/logos/<slug>.svg|png     partner brand logos (the LOGOS map)
 *   public/brand/*.webp             Midpoint wordmark + "Inside The Heart" logo
 *   public/og.jpg                   1200×630 Open Graph image
 *   app/icon.png, app/apple-icon.png, app/favicon.ico   (from the heart logo)
 *   data/assets.generated.ts        intrinsic sizes of everything above
 *
 * Image bytes are written untouched (no re-encoding), so quality is identical
 * to the original file. It is safe to re-run: files are overwritten.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(__dirname, "..");
const SRC = path.resolve(ROOT, process.argv[2] ?? "midpoint.html");
const NAVY = "#142238";

type Size = { w: number; h: number };

const EXT: Record<string, string> = {
  "image/webp": "webp",
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/jpeg": "jpg",
};

function decode(dataUri: string) {
  const m = dataUri.match(/^data:([a-z]+\/[a-z0-9.+-]+);base64,(.+)$/);
  if (!m) throw new Error(`Not a base64 data URI: ${dataUri.slice(0, 40)}…`);
  const ext = EXT[m[1]];
  if (!ext) throw new Error(`Unsupported mime type ${m[1]}`);
  return { mime: m[1], ext, buf: Buffer.from(m[2], "base64") };
}

/** Pulls `const NAME = {...};` (a JSON literal on one line) out of the script. */
function jsonConst<T>(html: string, name: string): T {
  const m = html.match(new RegExp(`const ${name} ?= ?(\\{.*\\}|\\[.*\\]);`));
  if (!m) throw new Error(`Could not find const ${name} in ${SRC}`);
  return JSON.parse(m[1]) as T;
}

async function sizeOf(buf: Buffer, mime: string): Promise<Size> {
  if (mime === "image/svg+xml") {
    // Prefer the viewBox: some logos declare width/height in mm.
    const vb = buf.toString("utf8").match(/viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/);
    if (vb) return { w: Math.round(+vb[1]), h: Math.round(+vb[2]) };
  }
  const meta = await sharp(buf).metadata();
  if (!meta.width || !meta.height) throw new Error("Unable to read image size");
  return { w: meta.width, h: meta.height };
}

async function write(rel: string, buf: Buffer) {
  const abs = path.join(ROOT, rel);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, buf);
}

/** Minimal .ico writer: PNG-compressed entries (supported by every modern browser). */
function toIco(pngs: { size: number; buf: Buffer }[]) {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, buf }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt8(0, e + 2);
    header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(buf.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.buf)]);
}

async function main() {
  const html = await readFile(SRC, "utf8");
  console.log(`Reading ${path.relative(ROOT, SRC)} (${(html.length / 1e6).toFixed(1)} MB)`);

  /* ---- photography ---- */
  const IMGS = jsonConst<Record<string, string>>(html, "IMGS");
  const photos: Record<string, Size> = {};
  for (const [key, uri] of Object.entries(IMGS)) {
    const { buf, mime, ext } = decode(uri);
    await write(`public/images/${key}.${ext}`, buf);
    photos[key] = await sizeOf(buf, mime);
  }
  console.log(`  ${Object.keys(photos).length} photos → public/images/`);

  /* ---- partner logos (keyed by brand name, saved by slug) ---- */
  const LOGOS = jsonConst<Record<string, string>>(html, "LOGOS");
  const slugs = jsonConst<string[]>(html, "SLUGS");
  const brandBlock = html.slice(html.indexOf("const BRANDS"), html.indexOf("const BDATA"));
  const names = [...brandBlock.matchAll(/\{n:"([^"]+)"/g)].map((m) => m[1]);
  if (names.length !== slugs.length) throw new Error("BRANDS / SLUGS length mismatch");
  const logos: Record<string, Size & { src: string }> = {};
  for (const [name, uri] of Object.entries(LOGOS)) {
    const slug = slugs[names.indexOf(name)];
    if (!slug) throw new Error(`No slug for logo "${name}"`);
    const { buf, mime, ext } = decode(uri);
    const src = `/logos/${slug}.${ext}`;
    await write(`public${src}`, buf);
    logos[name] = { src, ...(await sizeOf(buf, mime)) };
  }
  console.log(`  ${Object.keys(logos).length} logos → public/logos/`);

  /* ---- Midpoint brand marks ---- */
  const wm = html.match(/class="p-main" src="(data:[^"]+)"/);
  const ht = html.match(/class="p-heart" src="(data:[^"]+)"/);
  if (!wm || !ht) throw new Error("Brand marks not found");
  const wordmark = decode(wm[1]);
  const heart = decode(ht[1]);
  await write(`public/brand/midpoint-wordmark.${wordmark.ext}`, wordmark.buf);
  await write(`public/brand/midpoint-heart.${heart.ext}`, heart.buf);
  const marks = {
    wordmark: { src: `/brand/midpoint-wordmark.${wordmark.ext}`, ...(await sizeOf(wordmark.buf, wordmark.mime)) },
    heart: { src: `/brand/midpoint-heart.${heart.ext}`, ...(await sizeOf(heart.buf, heart.mime)) },
  };
  console.log("  wordmark + heart → public/brand/");

  /* ---- favicon / app icons: heart (without the tagline) on navy ---- */
  const hs = marks.heart;
  const heartOnly = await sharp(heart.buf)
    .extract({ left: 0, top: 0, width: hs.w, height: Math.round(hs.h * 0.79) })
    .toBuffer();
  const icon = async (size: number, pad: number, radius: number) => {
    const inner = Math.round(size * (1 - pad * 2));
    const glyph = await sharp(heartOnly).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    const bg = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}"/></svg>`,
    );
    return sharp(bg).composite([{ input: glyph, gravity: "center" }]).png().toBuffer();
  };
  await write("app/icon.png", await icon(512, 0.1, 96));
  await write("app/apple-icon.png", await icon(180, 0.12, 0));
  await write(
    "app/favicon.ico",
    toIco(await Promise.all([16, 32, 48].map(async (s) => ({ size: s, buf: await icon(s, 0.06, Math.round(s * 0.18)) })))),
  );
  console.log("  icon.png, apple-icon.png, favicon.ico → app/");

  /* ---- Open Graph image: first hero slide + the header logo pair ---- */
  const lh = 200; // mirrors the .pair proportions in globals.css
  const wmH = Math.round(lh * 0.82);
  const htH = Math.round(lh * 1.12);
  const wmImg = await sharp(wordmark.buf).resize({ height: wmH }).png().toBuffer();
  const htImg = await sharp(heart.buf).resize({ height: htH }).png().toBuffer();
  const wmW = (await sharp(wmImg).metadata()).width!;
  const htW = (await sharp(htImg).metadata()).width!;
  const gap = 30;
  const total = wmW + gap + 2 + gap + htW;
  const x0 = Math.round((1200 - total) / 2);
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#445D81" stop-opacity=".8"/><stop offset="1" stop-color="#364B6A" stop-opacity=".92"/></linearGradient>
      <radialGradient id="r" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#B8976A" stop-opacity=".16"/><stop offset="1" stop-color="#B8976A" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#r)"/>
    <rect x="${x0 + wmW + gap}" y="${315 - lh * 0.39}" width="2" height="${lh * 0.78}" fill="#D9C6A3" fill-opacity=".45"/>
    <rect x="60" y="590" width="1080" height="1" fill="#D9C6A3" fill-opacity=".35"/>
  </svg>`);
  const heroKey = "inf_rosso";
  const og = await sharp(Buffer.from(decode(IMGS[heroKey]).buf))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: wmImg, left: x0, top: Math.round(315 - wmH / 2) },
      { input: htImg, left: x0 + wmW + gap * 2 + 2, top: Math.round(315 - htH / 2) },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await write("public/og.jpg", og);
  console.log("  og.jpg → public/");

  /* ---- manifest of intrinsic sizes ---- */
  const ts = `// AUTO-GENERATED by scripts/extract-assets.ts — do not edit by hand.
// Intrinsic pixel sizes of the extracted assets (used for next/image width/height).

export const PHOTO_SIZES: Record<string, { w: number; h: number }> = ${JSON.stringify(photos, null, 2)};

export const LOGO_FILES: Record<string, { src: string; w: number; h: number }> = ${JSON.stringify(logos, null, 2)};

export const BRAND_MARKS = ${JSON.stringify(marks, null, 2)} as const;
`;
  await write("data/assets.generated.ts", Buffer.from(ts));
  console.log("  data/assets.generated.ts");
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
