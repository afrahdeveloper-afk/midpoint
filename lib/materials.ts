/**
 * Procedural materials (marble, stone, tile, mosaic…) — ported verbatim from the
 * original script. Each returns the inner markup of a 1200×800 <svg>; ids are
 * prefixed with `id` (from React's useId) instead of a global counter so the
 * server and client render identical markup.
 */
import type { ProceduralKey } from "@/data/images";

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}
function hex(h: string) {
  h = h.replace("#", "");
  return [0, 2, 4].map((i) => (parseInt(h.substr(i, 2), 16) / 255).toFixed(3));
}
function marbleLayer(id: string, freq: string, seed: number, color: string, k: number, alpha: number) {
  const c = hex(color);
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="${freq}" numOctaves="5" seed="${seed}"/><feColorMatrix type="matrix" values="0 0 0 0 ${c[0]} 0 0 0 0 ${c[1]} 0 0 0 0 ${c[2]} -${k} 0 0 0 ${alpha}"/></filter>`;
}
function cloud(id: string, freq: string, seed: number, color: string, a: number) {
  const c = hex(color);
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="4" seed="${seed}"/><feColorMatrix type="matrix" values="0 0 0 0 ${c[0]} 0 0 0 0 ${c[1]} 0 0 0 0 ${c[2]} 0 0 0 ${a} 0"/></filter>`;
}
const wrap = (inner: string, defs: string) => `<defs>${defs}</defs>${inner}`;

type Gen = (id: string, seed?: number) => string;

export const MATERIALS: Record<ProceduralKey, Gen> = {
  marble(id, seed = 3) {
    const a = id + "a", b = id + "b", c = id + "c";
    return wrap(
      `<rect width="1200" height="800" fill="#E7E4DE"/><rect width="1200" height="800" filter="url(#${c})"/><rect width="1200" height="800" filter="url(#${a})"/><rect width="1200" height="800" filter="url(#${b})"/>`,
      cloud(c, "0.0025 0.006", seed + 7, "#B9B2A6", 0.55) + marbleLayer(a, "0.0022 0.0065", seed, "#8E867A", 9, 1.05) + marbleLayer(b, "0.005 0.012", seed + 2, "#A69C8B", 14, 0.9),
    );
  },
  nero(id, seed = 11) {
    const a = id + "a", b = id + "b", c = id + "c";
    return wrap(
      `<rect width="1200" height="800" fill="#16181C"/><rect width="1200" height="800" filter="url(#${c})"/><rect width="1200" height="800" filter="url(#${a})"/><rect width="1200" height="800" filter="url(#${b})"/>`,
      cloud(c, "0.003 0.008", seed + 5, "#2D3038", 0.6) + marbleLayer(a, "0.002 0.006", seed, "#D8C3A0", 10, 1.0) + marbleLayer(b, "0.006 0.014", seed + 3, "#E9E6E0", 16, 0.7),
    );
  },
  stone(id, seed = 21) {
    const a = id + "a", c = id + "c";
    let g = "";
    for (let x = 0; x <= 1200; x += 300) g += `<rect x="${x - 1}" y="0" width="2" height="800" fill="#9C958A" opacity=".55"/>`;
    for (let y = 0; y <= 800; y += 300) g += `<rect x="0" y="${y - 1}" width="1200" height="2" fill="#9C958A" opacity=".55"/>`;
    return wrap(
      `<rect width="1200" height="800" fill="#C9C3B8"/><rect width="1200" height="800" filter="url(#${c})"/><rect width="1200" height="800" filter="url(#${a})"/>${g}`,
      cloud(c, "0.012", seed, "#E2DDD3", 0.8) + cloud(a, "0.06", seed + 1, "#8F887C", 0.35),
    );
  },
  tile(_id, seed = 31) {
    const r = rng(seed);
    let s = "";
    const pal = ["#EEF0EC", "#E4E7E2", "#F3F3EF", "#DDE2DC"];
    for (let y = 0; y < 800; y += 100)
      for (let x = 0; x < 1200; x += 100) {
        s += `<rect x="${x + 2}" y="${y + 2}" width="96" height="96" fill="${pal[Math.floor(r() * pal.length)]}"/><rect x="${x + 2}" y="${y + 2}" width="96" height="30" fill="#fff" opacity="${(r() * 0.25).toFixed(2)}"/>`;
      }
    return wrap(`<rect width="1200" height="800" fill="#B7BDB6"/>${s}`, "");
  },
  mosaic(_id, seed = 41) {
    const r = rng(seed);
    let s = "";
    const pal = ["#0E4F6B", "#12627F", "#1B7A94", "#2A8FA6", "#0B3E57", "#3AA3B5", "#7CC4CC", "#0A2F45"];
    const sz = 40;
    for (let y = 0; y < 800; y += sz)
      for (let x = 0; x < 1200; x += sz) {
        const i = Math.min(pal.length - 1, Math.floor(Math.pow(r(), 1.3) * pal.length));
        s += `<rect x="${x + 2.5}" y="${y + 2.5}" width="${sz - 5}" height="${sz - 5}" rx="3" fill="${pal[i]}"/>`;
        if (r() > 0.55) s += `<rect x="${x + 5}" y="${y + 5}" width="${sz - 18}" height="5" rx="2" fill="#fff" opacity=".18"/>`;
      }
    return wrap(`<rect width="1200" height="800" fill="#D7DCDB"/>${s}`, "");
  },
  deco(_id, seed = 51) {
    const r = rng(seed);
    let s = "";
    const blues = ["#1D3F7A", "#244B8C", "#1A376B"];
    const grounds = ["#F1EDE3", "#EAE5D9", "#F4F1EA", "#E6E1D4"];
    for (let y = 0; y < 800; y += 160)
      for (let x = 0; x < 1200; x += 160) {
        const b = blues[Math.floor(r() * 3)], cx = x + 80, cy = y + 80;
        s +=
          `<rect x="${x + 3}" y="${y + 3}" width="154" height="154" fill="${grounds[Math.floor(r() * 4)]}"/>` +
          `<g fill="none" stroke="${b}" stroke-width="7" opacity="${(0.78 + r() * 0.2).toFixed(2)}"><circle cx="${x + 3}" cy="${y + 3}" r="52"/><circle cx="${x + 157}" cy="${y + 3}" r="52"/><circle cx="${x + 3}" cy="${y + 157}" r="52"/><circle cx="${x + 157}" cy="${y + 157}" r="52"/></g>` +
          `<path d="M${cx} ${cy - 30} L${cx + 30} ${cy} L${cx} ${cy + 30} L${cx - 30} ${cy}Z" fill="${b}" opacity=".85"/><circle cx="${cx}" cy="${cy}" r="7" fill="#B8976A"/>`;
      }
    return wrap(`<rect width="1200" height="800" fill="#CFC8B8"/>${s}`, "");
  },
  bath(id, seed = 61) {
    const c = id + "c", a = id + "a";
    return wrap(
      `<rect width="1200" height="800" fill="#2A3140"/><rect width="1200" height="800" filter="url(#${c})"/><rect width="1200" height="800" filter="url(#${a})"/>
   <rect x="0" y="520" width="1200" height="280" fill="#1B2230" opacity=".9"/><rect x="0" y="518" width="1200" height="3" fill="#D9C6A3" opacity=".5"/>
   <g transform="translate(760 0)"><ellipse cx="0" cy="470" rx="185" ry="36" fill="#E9E6E0"/><path d="M-185 470 C-178 560 -95 600 0 600 C95 600 178 560 185 470 Z" fill="#DCD8D0"/><ellipse cx="0" cy="470" rx="160" ry="26" fill="#C9C4BA"/>
   <path d="M60 470 V300 Q60 262 20 262 H-40" fill="none" stroke="#D9C6A3" stroke-width="10" stroke-linecap="round"/><rect x="40" y="480" width="40" height="12" fill="#D9C6A3" opacity=".0"/></g>`,
      cloud(c, "0.004 0.01", seed, "#3A4356", 0.9) + marbleLayer(a, "0.002 0.007", seed + 4, "#6A7386", 12, 0.6),
    );
  },
  porcelain(id, seed = 71) {
    const c = id + "c";
    return wrap(
      `<rect width="1200" height="800" fill="#EDEBE7"/><rect width="1200" height="800" filter="url(#${c})"/><circle cx="600" cy="400" r="260" fill="none" stroke="#B8976A" stroke-width="2" opacity=".6"/><circle cx="600" cy="400" r="200" fill="#F8F7F4"/><circle cx="600" cy="400" r="200" fill="none" stroke="#D5D1C9" stroke-width="3"/>`,
      cloud(c, "0.008", seed, "#D8D4CC", 0.6),
    );
  },
};
