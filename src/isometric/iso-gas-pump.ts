export interface IsoGasPumpOptions {
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

export function createIsoGasPump(options: IsoGasPumpOptions = {}): string {
  const { accent = '#ef4444' } = options;
  const rand = rng(193453815);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="66" rx="80" ry="20" fill="#000" opacity="0.35"/>');
parts.push(box(-60, 20, 0, 120, 26, 5, '#3f3f46'));
parts.push(box(-26, -18, 0, 52, 36, 84, '#b91c1c'));
parts.push(box(-30, -22, 84, 60, 44, 10, '#7f1d1d'));
parts.push('<path d="' + poly([[-20, 18.5, 58], [20, 18.5, 58], [20, 18.5, 74], [-20, 18.5, 74]]) + '" fill="#020617"/>');
for (let i = 0; i < 4; i++) {
  parts.push('<path d="' + poly([[-16 + i * 9, 18.3, 61], [-11 + i * 9, 18.3, 61], [-11 + i * 9, 18.3, 70], [-16 + i * 9, 18.3, 70]]) + '" fill="#4ade80"><animate attributeName="opacity" values="1;0.3;1" dur="1.2s" begin="' + i * 0.25 + 's" repeatCount="indefinite"/></path>');
}
for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) parts.push(box(-14 + c * 11, 18.2, 30 + r * 8, 8, 1, 5, '#27272a'));
parts.push(box(28, -14, 40, 8, 8, 10, '#27272a'));
parts.push('<path d="M32 40 q26 4 22 30 q-3 16 -14 14" stroke="#18181b" stroke-width="5" fill="none"/>');
parts.push(box(38, 28, 66, 10, 8, 14, shade(accent, 1.05)));
parts.push(orb(0, -2, 100, 5, '#fbbf24'));
parts.push(led(-20, 18.5, 80, '#4ade80', 2, 0));

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#12100c"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 225)">' +
    parts.join('') +
    '</g></svg>';
}
