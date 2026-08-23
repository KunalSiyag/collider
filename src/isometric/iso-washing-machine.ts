export interface IsoWashingMachineOptions {
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

export function createIsoWashingMachine(options: IsoWashingMachineOptions = {}): string {
  const { accent = '#22d3ee' } = options;
  const rand = rng(3583943274);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="92" rx="70" ry="18" fill="#000" opacity="0.35"/>');
parts.push(box(-36, -22, 0, 72, 44, 96, '#e7e5e4'));
parts.push(box(-40, -26, 96, 80, 52, 8, '#d6d3d1'));
parts.push('<path d="' + poly([[-32, 21.5, 30], [16, 21.5, 30], [16, 21.5, 78], [-32, 21.5, 78]]) + '" fill="#52525b"/>');
const wp = project(-8, 21, 54);
parts.push('<circle cx="' + wp[0].toFixed(1) + '" cy="' + wp[1].toFixed(1) + '" r="20" fill="#0c4a6e"/><circle cx="' + wp[0].toFixed(1) + '" cy="' + wp[1].toFixed(1) + '" r="16" fill="#0ea5e9" opacity="0.55"/>');
parts.push('<g><animateTransform attributeName="transform" type="rotate" values="0 ' + wp[0].toFixed(0) + ' ' + wp[1].toFixed(0) + ';360 ' + wp[0].toFixed(0) + ' ' + wp[1].toFixed(0) + '" dur="2.2s" repeatCount="indefinite"/>');
parts.push(orb(wp[0] - 6, wp[1] - 4, 0, 4, '#fef3c7').replace(/cx="([^"]+)"/, 'cx="$1"'));
parts.push('</g>');
parts.push('<circle cx="' + (wp[0] - 5).toFixed(1) + '" cy="' + (wp[1] - 4).toFixed(1) + '" r="4" fill="#fde68a"/><circle cx="' + (wp[0] + 6).toFixed(1) + '" cy="' + (wp[1] + 5).toFixed(1) + '" r="3.5" fill="#f9a8d4"/>');
parts.push('<path d="' + poly([[-32, 21.5, 82], [16, 21.5, 82], [16, 21.5, 92], [-32, 21.5, 92]]) + '" fill="#f5f5f4"/>');
for (let i = 0; i < 3; i++) parts.push(led(-26 + i * 9, 21, 87, [accent, '#4ade80', '#fbbf24'][i], 1.2, i * 0.4));
parts.push(orb(8, 21, 87, 4, '#a1a1aa'));
parts.push(box(48, -16, 0, 14, 14, 26, '#f472b6'));
parts.push(box(48, -16, 26, 14, 14, 4, '#ec4899'));
parts.push(cyl(70, 20, 0, 10, 18, '#38bdf8', 8));
parts.push('<circle cx="60" cy="-110" r="2.5" fill="#bae6fd"><animate attributeName="cy" values="-110;-140;-110" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite"/></circle>');

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#101318"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 240)">' +
    parts.join('') +
    '</g></svg>';
}
