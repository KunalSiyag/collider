export interface IsoSpaceTelescopeOptions {
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

export function createIsoSpaceTelescope(options: IsoSpaceTelescopeOptions = {}): string {
  const { accent = '#fbbf24' } = options;
  const rand = rng(4042454024);
  const parts: string[] = [];

for (let i = 0; i < 12; i++) {
  parts.push('<circle cx="' + (rand() * 300 - 150).toFixed(0) + '" cy="' + (rand() * 260 - 220).toFixed(0) + '" r="1.3" fill="#e2e8f0"><animate attributeName="opacity" values="0.2;1;0.2" dur="' + (1.4 + rand() * 2).toFixed(1) + 's" repeatCount="indefinite"/></circle>');
}
parts.push('<circle cx="118" cy="96" r="58" fill="#7c3aed" opacity="0.85"/><circle cx="100" cy="76" r="16" fill="#a78bfa" opacity="0.5"/><circle cx="134" cy="110" r="10" fill="#c4b5fd" opacity="0.4"/>');
let body = cyl(0, 0, 40, 26, 52, '#d4a017', 10);
body += '<ellipse cx="' + project(0, 0, 92)[0].toFixed(1) + '" cy="' + project(0, 0, 92)[1].toFixed(1) + '" rx="24" ry="12" fill="#18181b"/>';
const hexes = [[-14, -4], [2, -4], [-7, 6], [9, 6], [-14, -4]];
for (let hx = 0; hx < 3; hx++) {
  for (let hy = 0; hy < 2; hy++) {
    const cxx = -16 + hx * 17;
    const cyy = hy * 10;
    const hp = project(cxx, cyy, 93);
    body += '<polygon points="' + (hp[0]) .toFixed(1) + ',' + (hp[1] - 6).toFixed(1) + ' ' + (hp[0] + 8).toFixed(1) + ',' + (hp[1] - 3).toFixed(1) + ' ' + (hp[0] + 8).toFixed(1) + ',' + (hp[1] + 3).toFixed(1) + ' ' + hp[0].toFixed(1) + ',' + (hp[1] + 6).toFixed(1) + ' ' + (hp[0] - 8).toFixed(1) + ',' + (hp[1] + 3).toFixed(1) + ' ' + (hp[0] - 8).toFixed(1) + ',' + (hp[1] - 3).toFixed(1) + '" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1"/>';
  }
}
body += orb(0, 0, 108, 6, '#e2e8f0');
parts.push('<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="6s" repeatCount="indefinite"/>' + body);
parts.push(box(-86, -8, 66, 54, 16, 3, '#1e40af') + box(32, -8, 66, 54, 16, 3, '#1e40af'));
for (let i = 0; i < 4; i++) parts.push('<path d="' + poly([[-82 + i * 14, -7.5, 69], [-72 + i * 14, -7.5, 69]]) + '" stroke="#3b82f6" stroke-width="1.5" fill="none"/>');
for (let i = 0; i < 4; i++) parts.push('<path d="' + poly([[36 + i * 14, -7.5, 69], [46 + i * 14, -7.5, 69]]) + '" stroke="#3b82f6" stroke-width="1.5" fill="none"/>');
parts.push('</g>');

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#0a0916"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 235)">' +
    '<circle r="106" fill="#8b5cf6" opacity="0.08"/>' +
    parts.join('') +
    '</g></svg>';
}
