export interface IsoStatuePlinthOptions {
  accent?: string;
}

const K = 0.866;

function project(x: number, y: number, z: number): [number, number] {
  return [(x - y) * K, (x + y) * 0.5 - z];
}

function poly(list: Array<[number, number, number]>): string {
  const p = list.map((v) => project(v[0], v[1], v[2]));
  let s = '';
  for (let i = 0; i < p.length; i++) s += (i === 0 ? 'M' : 'L') + p[i][0].toFixed(1) + ' ' + p[i][1].toFixed(1);
  return s + 'Z';
}

function shade(hex: string, f: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) * f));
  const g = Math.min(255, Math.round(((n >> 8) & 255) * f));
  const b = Math.min(255, Math.round((n & 255) * f));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function box(x: number, y: number, z: number, w: number, d: number, h: number, c: string): string {
  return [
    '<path d="' + poly([[x, y + d, z + h], [x + w, y + d, z + h], [x + w, y, z + h], [x, y, z + h]]) + '" fill="' + shade(c, 1.28) + '"/>',
    '<path d="' + poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]) + '" fill="' + shade(c, 0.92) + '"/>',
    '<path d="' + poly([[x + w, y + d, z], [x + w, y, z], [x + w, y, z + h], [x + w, y + d, z + h]]) + '" fill="' + shade(c, 0.62) + '"/>'
  ].join('');
}

function pyr(x: number, y: number, z: number, w: number, d: number, h: number, c: string): string {
  return [
    '<path d="' + poly([[x, y + d, z], [x + w, y + d, z], [x + w / 2, y + d / 2, z + h]]) + '" fill="' + shade(c, 0.92) + '"/>',
    '<path d="' + poly([[x + w, y + d, z], [x + w, y, z], [x + w / 2, y + d / 2, z + h]]) + '" fill="' + shade(c, 0.6) + '"/>'
  ].join('');
}

function cyl(ccx: number, ccy: number, zz: number, r: number, h: number, c: string, n?: number): string {
  const m = n ?? 8;
  const vs: Array<[number, number]> = [];
  for (let i = 0; i < m; i++) {
    const th = (Math.PI * 2 * i) / m + Math.PI / m;
    vs.push([ccx + r * Math.cos(th), ccy + r * Math.sin(th)]);
  }
  const order = vs.map((v, i) => ({ i, dep: v[0] + v[1] })).sort((a, b) => a.dep - b.dep);
  let s = '';
  for (const o of order) {
    const j = (o.i + 1) % m;
    const u = ((vs[o.i][0] + vs[o.i][1]) / (2 * r) + 1) / 2;
    const f = 0.55 + 0.5 * u;
    s += '<path d="' + poly([[vs[o.i][0], vs[o.i][1], zz], [vs[j][0], vs[j][1], zz], [vs[j][0], vs[j][1], zz + h], [vs[o.i][0], vs[o.i][1], zz + h]]) + '" fill="' + shade(c, f) + '"/>';
  }
  s += '<path d="' + poly(vs.map((v) => [v[0], v[1], zz + h])) + '" fill="' + shade(c, 1.25) + '"/>';
  return s;
}

function orb(ccx: number, ccy: number, zz: number, r: number, c: string): string {
  const p = project(ccx, ccy, zz);
  return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + r + '" fill="' + c + '"/>' +
    '<circle cx="' + (p[0] - r * 0.3).toFixed(1) + '" cy="' + (p[1] - r * 0.3).toFixed(1) + '" r="' + (r * 0.35).toFixed(1) + '" fill="#ffffff" opacity="0.3"/>';
}

function led(ccx: number, ccy: number, zz: number, color: string, dur?: number, begin?: number): string {
  const p = project(ccx, ccy, zz);
  const a = dur ? '<animate attributeName="opacity" values="1;0.15;1" dur="' + dur + 's" begin="' + (begin ?? 0) + 's" repeatCount="indefinite"/>' : '';
  return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.2" fill="' + color + '">' + a + '</circle>';
}

function puff(ccx: number, ccy: number, zz: number, r: number, dur: number, begin: number, color?: string): string {
  const p = project(ccx, ccy, zz);
  const col = color ?? '#cbd5e1';
  return '<ellipse cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" rx="' + r + '" ry="' + (r * 0.62).toFixed(1) + '" fill="' + col + '" opacity="0">' +
    '<animate attributeName="cy" values="' + p[1].toFixed(1) + ';' + (p[1] - 44).toFixed(1) + ';' + p[1].toFixed(1) + '" dur="' + dur + 's" begin="' + begin + 's" repeatCount="indefinite"/>' +
    '<animate attributeName="opacity" values="0.5;0;0.5" dur="' + dur + 's" begin="' + begin + 's" repeatCount="indefinite"/></ellipse>';
}

function rng(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createIsoStatuePlinth(options: IsoStatuePlinthOptions = {}): string {
  const { accent = '#4ade80' } = options;
  const rand = rng(1048159695);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="88" rx="105" ry="26" fill="#000" opacity="0.4"/>');
parts.push(box(-42, -30, 0, 84, 60, 14, '#57534e'));
parts.push(box(-32, -22, 14, 64, 44, 40, '#78716c'));
const brz = '#16a34a';
parts.push(box(-14, -10, 54, 28, 20, 40, shade(brz, 0.8)));
parts.push(orb(0, 0, 102, 11, brz));
parts.push('<path d="M' + project(-14, 6, 88)[0].toFixed(1) + ' ' + project(-14, 6, 88)[1].toFixed(1) + ' L' + project(-30, 16, 70)[0].toFixed(1) + ' ' + project(-30, 16, 70)[1].toFixed(1) + '" stroke="' + brz + '" stroke-width="6" stroke-linecap="round"/>');
parts.push('<path d="M' + project(14, -6, 88)[0].toFixed(1) + ' ' + project(14, -6, 88)[1].toFixed(1) + ' L' + project(28, -14, 98)[0].toFixed(1) + ' ' + project(28, -14, 98)[1].toFixed(1) + '" stroke="' + brz + '" stroke-width="6" stroke-linecap="round"/>');
parts.push(orb(30, -15, 102, 5, brz));
parts.push('<polygon points="-40,-160 -120,-230 -40,-230" fill="#fefce8" opacity="0.05"/><polygon points="40,-160 120,-230 40,-230" fill="#fefce8" opacity="0.05"/>');
parts.push('<polygon points="-44,-158 -128,-236 -128,-180" fill="#fef08a" opacity="0.07"/>');
for (const rx of [-64, -20, 24, 68]) {
  parts.push(cyl(rx, 40, 0, 4, 26, '#b91c1c', 6));
  parts.push(orb(rx, 40, 28, 4, '#fbbf24'));
}
parts.push('<path d="M' + project(-60, 40, 24)[0].toFixed(1) + ' ' + project(-60, 40, 24)[1].toFixed(1) + ' Q' + project(-42, 40, 16)[0].toFixed(1) + ' ' + project(-42, 40, 16)[1].toFixed(1) + ' ' + project(-22, 40, 24)[0].toFixed(1) + ' ' + project(-22, 40, 24)[1].toFixed(1) + ' T' + project(24, 40, 24)[0].toFixed(1) + ' ' + project(24, 40, 24)[1].toFixed(1) + ' T' + project(66, 40, 24)[0].toFixed(1) + ' ' + project(66, 40, 24)[1].toFixed(1) + '" stroke="#b91c1c" stroke-width="3" fill="none"/>');

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#101014"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 240)">' +
    parts.join('') +
    '</g></svg>';
}
