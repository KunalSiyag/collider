export interface IsoTurntableBoothOptions {
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

export function createIsoTurntableBooth(options: IsoTurntableBoothOptions = {}): string {
  const { accent = '#8b5cf6' } = options;
  const rand = rng(1145601575);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="80" rx="115" ry="26" fill="#000" opacity="0.35"/>');
parts.push(box(-64, -22, 0, 128, 44, 44, '#18181b'));
parts.push('<path d="' + poly([[-60, 21.5, 6], [60, 21.5, 6], [60, 21.5, 38], [-60, 21.5, 38]]) + '" fill="#312e81"/>');
parts.push('<circle cx="' + project(0, 21.5, 22)[0].toFixed(1) + '" cy="' + project(0, 21.5, 22)[1].toFixed(1) + '" r="9" fill="' + accent + '" opacity="0.85"><animate attributeName="opacity" values="0.85;0.4;0.85" dur="1.4s" repeatCount="indefinite"/></circle>');
parts.push(box(-68, -26, 44, 136, 52, 6, '#3f3f46'));
function deck(dx) {
  let s = '<ellipse cx="' + project(dx, -12, 51)[0].toFixed(1) + '" cy="' + project(dx, -12, 51)[1].toFixed(1) + '" rx="19" ry="9.5" fill="#111"/>';
  s += '<ellipse cx="' + project(dx, -12, 51)[0].toFixed(1) + '" cy="' + project(dx, -12, 51)[1].toFixed(1) + '" rx="6" ry="3" fill="#f472b6"/>';
  s += orb(dx + 22, -12, 52, 3, '#d6d3d1');
  s += '<path d="M' + project(dx + 22, -12, 53)[0].toFixed(1) + ' ' + project(dx + 22, -12, 53)[1].toFixed(1) + ' L' + project(dx + 8, -6, 54)[0].toFixed(1) + ' ' + project(dx + 8, -6, 54)[1].toFixed(1) + '" stroke="#e7e5e4" stroke-width="2" fill="none"/>';
  return s;
}
parts.push(deck(-38));
parts.push(deck(24));
parts.push(box(-8, -14, 49, 16, 26, 3, '#27272a'));
for (let i = 0; i < 4; i++) {
  const fy = 46 - rand() * 18;
  parts.push('<rect x="' + (project(-4, -14 + 4 + i * 5, 51)[0] - 1).toFixed(1) + '" y="' + project(-4, -14 + 4 + i * 5, 51)[1].toFixed(1) + '" width="3" height="6" fill="#4ade80"/>');
}
for (let i = 0; i < 10; i++) {
  const cc = ['#f472b6', '#22d3ee', '#fbbf24'][i % 3];
  const y0 = (-rand() * 160).toFixed(0);
  parts.push('<circle cx="' + (rand() * 240 - 120).toFixed(0) + '" cy="' + y0 + '" r="2" fill="' + cc + '"><animate attributeName="cy" values="' + y0 + ';150;' + y0 + '" dur="' + (2.5 + rand() * 2).toFixed(1) + 's" repeatCount="indefinite"/></circle>');
}
parts.push('<g><animateTransform attributeName="transform" type="rotate" values="-18 0 -170;18 0 -170;-18 0 -170" dur="5s" repeatCount="indefinite"/><polygon points="-4,-168 -140,-220 -140,-120" fill="#22d3ee" opacity="0.12"/></g>');
parts.push('<g><animateTransform attributeName="transform" type="rotate" values="18 0 -170;-18 0 -170;18 0 -170" dur="5s" repeatCount="indefinite"/><polygon points="4,-168 140,-220 140,-120" fill="#f472b6" opacity="0.12"/></g>');

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#100c18"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 235)">' +
    '<circle r="106" fill="#f472b6" opacity="0.08"/>' +
    parts.join('') +
    '</g></svg>';
}
