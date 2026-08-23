export interface IsoMushroomGroveOptions {
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

export function createIsoMushroomGrove(options: IsoMushroomGroveOptions = {}): string {
  const { accent = '#22d3ee' } = options;
  const rand = rng(2906124341);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="56" rx="115" ry="32" fill="#14532d" opacity="0.45"/>');
function shroom(x, y, sc, cap, glow) {
  let s = cyl(x, y, 46 - 30 * sc, 4 * sc, 16 * sc, glow ? shade(cap, 1.2) : '#e7e5e4', 8);
  s += '<ellipse cx="' + project(x, y, 62 * sc + 2)[0].toFixed(1) + '" cy="' + project(x, y, 62 * sc + 2)[1].toFixed(1) + '" rx="' + (14 * sc).toFixed(1) + '" ry="' + (7 * sc).toFixed(1) + '" fill="' + cap + '"/>';
  s += '<circle cx="' + project(x - 5 * sc, y - 2 * sc, 63 * sc)[0].toFixed(1) + '" cy="' + project(x - 5 * sc, y - 2 * sc, 63 * sc)[1].toFixed(1) + '" r="' + (1.8 * sc).toFixed(1) + '" fill="#fafaf9"/>';
  s += '<circle cx="' + project(x + 6 * sc, y + 3 * sc, 64 * sc)[0].toFixed(1) + '" cy="' + project(x + 6 * sc, y + 3 * sc, 64 * sc)[1].toFixed(1) + '" r="' + (2.2 * sc).toFixed(1) + '" fill="#fafaf9"/>';
  if (glow) {
    const gp = project(x, y, 66 * sc);
    s += '<circle cx="' + gp[0].toFixed(1) + '" cy="' + gp[1].toFixed(1) + '" r="' + (18 * sc).toFixed(1) + '" fill="' + cap + '" opacity="0.15"><animate attributeName="opacity" values="0.15;0.35;0.15" dur="2.6s" repeatCount="indefinite"/></circle>';
  }
  return s;
}
parts.push(shroom(-30, -10, 1.6, '#dc2626', false));
parts.push(shroom(-6, 8, 1.2, '#ea580c', false));
parts.push(shroom(24, -6, 1.9, accent, true));
parts.push(shroom(48, 12, 1.0, '#a78bfa', true));
parts.push(shroom(-52, 12, 0.9, '#f59e0b', false));
parts.push(pyr(-70, -20, 42, 24, 18, 12, '#3f3f46'));
parts.push(pyr(64, -20, 44, 18, 14, 9, '#57534e'));
for (let i = 0; i < 6; i++) {
  parts.push('<circle cx="' + (rand() * 200 - 100).toFixed(0) + '" cy="' + (-30 - rand() * 90).toFixed(0) + '" r="1.8" fill="#a7f3d0"><animate attributeName="opacity" values="0;0.9;0" dur="' + (2 + rand() * 2).toFixed(1) + 's" begin="' + (rand() * 2.5).toFixed(1) + 's" repeatCount="indefinite"/></circle>');
}

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#0d1216"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 230)">' +
    '<circle r="106" fill="#22d3ee" opacity="0.08"/>' +
    parts.join('') +
    '</g></svg>';
}
