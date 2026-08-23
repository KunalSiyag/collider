export interface IsoPondDockOptions {
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

export function createIsoPondDock(options: IsoPondDockOptions = {}): string {
  const { accent = '#fbbf24' } = options;
  const rand = rng(703996982);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="40" rx="130" ry="38" fill="#164e63"/>');
for (let i = 0; i < 3; i++) parts.push('<ellipse cx="' + (-60 + i * 55) + '" cy="' + (20 + i * 10) + '" rx="' + (14 + i * 6) + '" ry="' + (6 + i * 2) + '" fill="none" stroke="#22d3ee" stroke-width="1.5"><animate attributeName="rx" values="' + (14 + i * 6) + ';' + (24 + i * 6) + '" dur="' + (2.5 + i) + 's" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0" dur="' + (2.5 + i) + 's" repeatCount="indefinite"/></ellipse>');
parts.push(box(-30, -50, 6, 60, 100, 5, '#8d5a2b'));
for (let i = 0; i < 6; i++) parts.push('<path d="' + poly([[6, -48 + i * 17, 11], [6, -48 + i * 17 + 12, 11]]) + '" stroke="#713f12" stroke-width="2" fill="none"/>');
function post(x, y) {
  let s = box(x - 4, y - 4, -14, 8, 8, 22, '#6d4c41');
  s += orb(x, y, 10, 5, '#fde68a');
  s += '<circle cx="' + project(x, y, 10)[0].toFixed(1) + '" cy="' + project(x, y, 10)[1].toFixed(1) + '" r="10" fill="#fde68a" opacity="0.12"/>';
  return s;
}
parts.push(post(24, -44));
parts.push(post(24, 42));
parts.push('<ellipse cx="' + project(-40, 10, 7)[0].toFixed(1) + '" cy="' + project(-40, 10, 7)[1].toFixed(1) + '" rx="12" ry="6" fill="#15803d"/><circle cx="' + project(-43, 7, 8)[0].toFixed(1) + '" cy="' + project(-43, 7, 8)[1].toFixed(1) + '" r="3" fill="#f9a8d4"/>');
parts.push('<ellipse cx="' + project(-62, 30, 6)[0].toFixed(1) + '" cy="' + project(-62, 30, 6)[1].toFixed(1) + '" rx="10" ry="5" fill="#15803d"/>');
parts.push('<ellipse cx="-90" cy="10" rx="7" ry="2.5" fill="#0ea5e9"><animate attributeName="cy" values="10;-6;10" dur="2.2s" repeatCount="indefinite"/></ellipse>');
parts.push('<path d="M-40 -60 q4 -8 10 -6" stroke="#4ade80" stroke-width="2" fill="none"><animate attributeName="d" values="M-40 -60 q4 -8 10 -6;M-40 -60 q-4 -8 -10 -6;M-40 -60 q4 -8 10 -6" dur="3s" repeatCount="indefinite"/></path>');

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#0a1018"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 228)">' +
    parts.join('') +
    '</g></svg>';
}
