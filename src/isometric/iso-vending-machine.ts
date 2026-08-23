export interface IsoVendingMachineOptions {
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

export function createIsoVendingMachine(options: IsoVendingMachineOptions = {}): string {
  const { accent = '#4ade80' } = options;
  const rand = rng(1682501986);
  const parts: string[] = [];

parts.push('<ellipse cx="0" cy="100" rx="60" ry="16" fill="#000" opacity="0.35"/>');
parts.push(box(-32, -18, 0, 64, 36, 122, '#dc2626'));
parts.push('<path d="' + poly([[-28, 17.5, 66], [16, 17.5, 66], [16, 17.5, 114], [-28, 17.5, 114]]) + '" fill="#bae6fd" opacity="0.3"/>');
const rows = [['#fbbf24', '#22d3ee', '#f472b6'], ['#4ade80', '#f97316', '#a78bfa'], ['#fca5a5', '#67e8f9', '#fde047']];
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    parts.push('<path d="' + poly([[-24 + c * 14, 17.3, 70 + r * 14], [-12 + c * 14, 17.3, 70 + r * 14], [-12 + c * 14, 17.3, 81 + r * 14], [-24 + c * 14, 17.3, 81 + r * 14]]) + '" fill="' + rows[r][c] + '"' + (r === 1 && c === 2 ? ' opacity="0.25"' : '') + '/>');
  }
  parts.push('<path d="' + poly([[-26, 17.2, 82.5 + r * 14], [16, 17.2, 82.5 + r * 14]]) + '" stroke="#7f1d1d" stroke-width="1.5" fill="none"/>');
}
parts.push('<path d="' + poly([[20, 17.5, 66], [28, 17.5, 66], [28, 17.5, 114], [20, 17.5, 114]]) + '" fill="#0c0a09"/>');
for (let i = 0; i < 4; i++) parts.push(box(21, 17.2, 70 + i * 11, 6, 0.5, 6, '#52525b'));
parts.push('<path d="' + poly([[-28, 17.5, 12], [28, 17.5, 12], [28, 17.5, 30], [-28, 17.5, 30]]) + '" fill="#450a0a"/>');
const drop = project(-4, 16, 118);
parts.push('<rect x="' + drop[0].toFixed(1) + '" y="' + drop[1].toFixed(1) + '" width="8" height="9" rx="2" fill="#fbbf24"><animate attributeName="y" values="' + drop[1].toFixed(1) + ';' + (drop[1] + 88).toFixed(1) + ';' + (drop[1] + 88).toFixed(1) + '" keyTimes="0;0.4;1" dur="3s" repeatCount="indefinite"/></rect>');
parts.push(led(24, 17.5, 118, accent, 1.6, 0));
parts.push(led(24, 17.5, 108, '#ef4444', 1.6, 0.8));

  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#101216"/><stop offset="1" stop-color="#0b0b10"/>' +
    '</linearGradient></defs>' +
    '<rect width="320" height="320" fill="url(#bg)"/>' +
    '<g transform="translate(160 245)">' +
    parts.join('') +
    '</g></svg>';
}
