export interface IsoSlotMachineOptions {
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

export function createIsoSlotMachine(options: IsoSlotMachineOptions = {}): string {
  const { accent = '#fbbf24' } = options;
  const rand = rng(1912567509);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="76" rx="80" ry="20" fill="#000" opacity="0.35"/>');
parts.push(box(-34, -20, 0, 68, 40, 74, '#7f1d1d'));
parts.push(box(-38, -24, 74, 76, 48, 34, shade(accent, 0.9)));
parts.push('<path d="' + poly([[-28, 19.5, 44], [28, 19.5, 44], [28, 19.5, 68], [-28, 19.5, 68]]) + '" fill="#0c0a09"/>');
for (let r = 0; r < 3; r++) {
  const rx = -24 + r * 19;
  parts.push('<path d="' + poly([[rx, 19.3, 47], [rx + 15, 19.3, 47], [rx + 15, 19.3, 65], [rx, 19.3, 65]]) + '" fill="#fafaf9"/>');
  const symCols = ['#ef4444', '#4ade80', '#8b5cf6'];
  for (let s = 0; s < 3; s++) {
    const sp = project(rx + 7.5, 19.2, 49 + s * 5.5);
    parts.push('<circle cx="' + sp[0].toFixed(1) + '" cy="' + sp[1].toFixed(1) + '" r="3" fill="' + symCols[(r + s) % 3] + '"><animate attributeName="cy" values="' + project(rx + 7.5, 19.2, 49)[1].toFixed(1) + ';' + project(rx + 7.5, 19.2, 63)[1].toFixed(1) + ';' + project(rx + 7.5, 19.2, 49)[1].toFixed(1) + '" dur="' + (0.8 + r * 0.3) + 's" repeatCount="indefinite"/></circle>');
  }
}
for (let i = 0; i < 4; i++) parts.push(led(-24 + i * 15, 19.5, 71, [accent, '#f472b6'][i % 2], 0.7, i * 0.17));
const lv = project(38, -2, 96);
parts.push('<g><animateTransform attributeName="transform" type="rotate" values="-30 ' + lv[0].toFixed(0) + ' ' + lv[1].toFixed(0) + ';20 ' + lv[0].toFixed(0) + ' ' + lv[1].toFixed(0) + ';-30 ' + lv[0].toFixed(0) + ' ' + lv[1].toFixed(0) + '" keyTimes="0;0.2;1" dur="3.4s" repeatCount="indefinite"/><path d="M' + lv[0].toFixed(1) + ' ' + lv[1].toFixed(1) + ' L' + lv[0].toFixed(1) + ' ' + (lv[1] - 30).toFixed(1) + '" stroke="#d6d3d1" stroke-width="4" stroke-linecap="round"/><circle cx="' + lv[0].toFixed(1) + '" cy="' + (lv[1] - 30).toFixed(1) + '" r="6" fill="' + accent + '"/></g>');
parts.push('<path d="' + poly([[-20, 19.5, 8], [20, 19.5, 8], [20, 19.5, 18], [-20, 19.5, 18]]) + '" fill="#0c0a09"/>');
for (let i = 0; i < 5; i++) {
  parts.push('<circle cx="' + (-16 + i * 8) + '" cy="-96" r="3" fill="#fde047"><animate attributeName="cy" values="-96;-60;-96" dur="1.4s" begin="' + (i * 0.12) + 's" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.3;1" dur="1.4s" begin="' + (i * 0.12) + 's" repeatCount="indefinite"/></circle>');
}

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#150d14"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 232)">' +
    '<circle r="106" fill="#f472b6" opacity="0.08"/>' +
    parts.join('') +
    '</g></svg>';
}
