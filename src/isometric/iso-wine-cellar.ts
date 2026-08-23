export interface IsoWineCellarOptions {
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

export function createIsoWineCellar(options: IsoWineCellarOptions = {}): string {
  const { accent = '#fbbf24' } = options;
  const rand = rng(2955387300);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="90" rx="115" ry="28" fill="#292524" opacity="0.8"/>');
parts.push('<path d="' + poly([[-95, -35, 0], [95, -35, 0], [95, -35, 175], [-95, -35, 175]]) + '" fill="#44403c"/>');
for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) {
  parts.push('<path d="' + poly([[-92 + c * 62, -35.5, 10 + r * 21], [-38 + c * 62, -35.5, 10 + r * 21], [-38 + c * 62, -35.5, 13 + r * 21], [-92 + c * 62, -35.5, 13 + r * 21]]) + '" fill="#292524"/>');
}
function bottle(bx, bz) {
  let s = cyl(bx, -33, bz, 5, 15, '#3f1d1d', 8);
  s += box(bx - 2, -35, bz + 15, 4, 4, 8, '#1c1917');
  s += orb(bx, -33, bz + 24, 2, '#7f1d1d');
  return s;
}
for (let i = 0; i < 5; i++) parts.push(bottle(-84 + i * 11, 16));
for (let i = 0; i < 4; i++) parts.push(bottle(-82 + i * 13, 37));
for (let i = 0; i < 5; i++) parts.push(bottle(-84 + i * 11, 58));
parts.push(cyl(52, 20, 0, 30, 66, '#8d5a2b', 12));
parts.push('<path d="' + poly([[23, 20, 16], [81, 20, 16]]) + '" stroke="#5d3a1a" stroke-width="3" fill="none"/>');
parts.push('<path d="' + poly([[23, 20, 44], [81, 20, 44]]) + '" stroke="#5d3a1a" stroke-width="3" fill="none"/>');
parts.push(orb(52, 20, 68, 4, '#a16207'));
parts.push(cyl(-70, 40, 0, 9, 16, '#52525b', 8));
parts.push('<circle cx="' + project(-70, 40, 20)[0].toFixed(1) + '" cy="' + project(-70, 40, 20)[1].toFixed(1) + '" r="6" fill="' + accent + '"><animate attributeName="opacity" values="1;0.6;1" dur="1.8s" repeatCount="indefinite"/></circle>');
parts.push('<path d="M-88 -140 q10 8 0 16 q-10 8 0 16 M-88 -140 q-10 8 0 16 q10 8 0 16" stroke="#a8a29e" stroke-width="1" fill="none" opacity="0.5"/>');

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#120c0c"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 240)">' +
    parts.join('') +
    '</g></svg>';
}
