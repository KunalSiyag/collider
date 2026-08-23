export interface IsoSwimmingPoolOptions {
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

export function createIsoSwimmingPool(options: IsoSwimmingPoolOptions = {}): string {
  const { accent = '#22d3ee' } = options;
  const rand = rng(409046249);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="60" rx="125" ry="34" fill="#a8a29e" opacity="0.25"/>');
parts.push(box(-90, -50, 0, 180, 100, 8, '#d6d3d1'));
parts.push('<path d="' + poly([[-72, -34, 2], [72, -34, 2], [72, 34, 2], [-72, 34, 2]]) + '" fill="#032539"/>');
parts.push('<path d="' + poly([[-66, -28, 4], [66, -28, 4], [66, 28, 4], [-66, 28, 4]]) + '" fill="' + accent + '" opacity="0.85"/>');
for (let i = 0; i < 3; i++) {
  parts.push('<path d="M' + (-50 + i * 44) + ' -10 q10 8 20 0 t20 0" stroke="#7dd3fc" stroke-width="2" fill="none" opacity="0.7"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="' + (2 + i * 0.7) + 's" repeatCount="indefinite"/></path>');
}
parts.push(box(84, -10, 8, 34, 16, 5, '#e7e5e4'));
parts.push(box(112, -6, 8, 8, 10, 14, '#a8a29e'));
parts.push('<path d="M' + project(-80, 40, 8)[0].toFixed(1) + ' ' + project(-80, 40, 8)[1].toFixed(1) + ' L' + project(-80, 40, 34)[0].toFixed(1) + ' ' + project(-80, 40, 34)[1].toFixed(1) + '" stroke="#e2e8f0" stroke-width="3" fill="none"/><path d="M' + project(-72, 40, 8)[0].toFixed(1) + ' ' + project(-72, 40, 8)[1].toFixed(1) + ' L' + project(-72, 40, 34)[0].toFixed(1) + ' ' + project(-72, 40, 34)[1].toFixed(1) + '" stroke="#e2e8f0" stroke-width="3" fill="none"/>');
parts.push('<g><animateTransform attributeName="transform" type="translate" values="0 0;6 4;0 0" dur="3.4s" repeatCount="indefinite"/>');
parts.push('<circle cx="' + project(-30, 8, 6)[0].toFixed(1) + '" cy="' + project(-30, 8, 6)[1].toFixed(1) + '" r="11" fill="#f8fafc"/><path d="M' + (project(-30, 8, 6)[0] - 11) + ' ' + project(-30, 8, 6)[1].toFixed(1) + ' a11 11 0 0 1 22 0 Z" fill="#ef4444" transform="rotate(24 ' + project(-30, 8, 6)[0].toFixed(1) + ' ' + project(-30, 8, 6)[1].toFixed(1) + ')"/>');
parts.push('</g>');
parts.push(box(-96, -44, 8, 22, 14, 8, '#f472b6'));
parts.push(box(-96, -44, 16, 22, 14, 4, '#ec4899'));

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#0e141a"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 228)">' +
    parts.join('') +
    '</g></svg>';
}
