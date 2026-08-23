export interface IsoRetroRadioOptions {
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

export function createIsoRetroRadio(options: IsoRetroRadioOptions = {}): string {
  const { accent = '#fbbf24' } = options;
  const rand = rng(97450313);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="66" rx="85" ry="22" fill="#000" opacity="0.35"/>');
parts.push(box(-52, -24, 0, 104, 48, 54, '#7c4a21'));
parts.push(box(-56, -28, 54, 112, 56, 8, '#8d5a2b'));
parts.push('<path d="' + poly([[-44, 23.5, 8], [4, 23.5, 8], [4, 23.5, 46], [-44, 23.5, 46]]) + '" fill="#44403c"/>');
for (let i = 0; i < 6; i++) parts.push('<path d="' + poly([[-42, 23.7, 11 + i * 6], [2, 23.7, 11 + i * 6]]) + '" stroke="#292524" stroke-width="2" fill="none"/>');
for (let j = 0; j < 5; j++) parts.push('<path d="' + poly([[-40 + j * 9, 23.6, 10], [-40 + j * 9, 23.6, 44]]) + '" stroke="#292524" stroke-width="1.5" fill="none"/>');
const dp = project(24, 18, 30);
parts.push('<ellipse cx="' + dp[0].toFixed(1) + '" cy="' + dp[1].toFixed(1) + '" rx="15" ry="13" fill="#0c0a09"/><ellipse cx="' + (dp[0] - 2).toFixed(1) + '" cy="' + dp[1].toFixed(1) + '" rx="12" ry="11" fill="' + accent + '" opacity="0.35"/>');
parts.push('<path d="M' + (dp[0] - 8).toFixed(1) + ' ' + (dp[1] - 4).toFixed(1) + ' L' + (dp[0] - 8).toFixed(1) + ' ' + (dp[1] + 4).toFixed(1) + '" stroke="#fef3c7" stroke-width="2"><animate attributeName="transform" attributeType="XML" type="translate" values="0 0;14 0;0 0" dur="4s" repeatCount="indefinite"/></path>');
parts.push(orb(-36, -12, 62, 4.5, '#e7e5e4'));
parts.push(orb(-22, -12, 62, 4.5, '#e7e5e4'));
parts.push('<path d="M40 -24 L66 -84 M46 -24 L70 -82" stroke="#78716c" stroke-width="2" fill="none"/>');
parts.push(orb(68, -86, -88, 3, '#ef4444'));
for (let i = 0; i < 3; i++) {
  parts.push('<circle cx="' + (-64 + i * 10) + '" cy="' + (-70 - i * 14) + '" r="2.5" fill="#fde68a"><animate attributeName="cy" values="' + (-70 - i * 14) + ';' + (-120 - i * 10) + ';' + (-70 - i * 14) + '" dur="' + (2.2 + i * 0.5) + 's" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="' + (2.2 + i * 0.5) + 's" repeatCount="indefinite"/></circle>');
}

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#131009"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 232)">' +
    parts.join('') +
    '</g></svg>';
}
