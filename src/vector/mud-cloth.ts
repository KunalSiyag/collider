export interface MudClothOptions {
  seed?: number;
  size?: number;
  rows?: number;
  base?: string;
  accent?: string;
}

export function createMudCloth(options: MudClothOptions = {}): string {
  const { seed = 68, size = 720, rows = 8, base = '#1c1c22', accent = '#fbbf24' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const rowH = size / rows;
  const els: string[] = [];
  const glyphs: ((x: number, y: number, w: number, h: number) => string)[] = [
    (x, y, w, h) => `      <line x1="${x + w * 0.2}" y1="${y + h * 0.5}" x2="${x + w * 0.8}" y2="${y + h * 0.5}" />`,
    (x, y, w, h) => `      <polyline points="${x + w * 0.25},${y + h * 0.7} ${x + w * 0.5},${y + h * 0.3} ${x + w * 0.75},${y + h * 0.7}" fill="none" />`,
    (x, y, w, h) => `      <circle cx="${x + w / 2}" cy="${y + h / 2}" r="${Math.min(w, h) * 0.22}" fill="none" />`,
    (x, y, w, h) => `      <path d="M${x + w * 0.3} ${y + h * 0.75} v-${h * 0.4} l${w * 0.2} -${h * 0.15} l${w * 0.2} ${h * 0.15} v${h * 0.4}" fill="none" />`,
    (x, y, w, h) => `      <path d="M${x + w * 0.35} ${y + h * 0.3} h${w * 0.3} M${x + w * 0.35} ${y + h * 0.5} h${w * 0.3} M${x + w * 0.35} ${y + h * 0.7} h${w * 0.3}" fill="none" />`,
  ];

  for (let r = 0; r < rows; r++) {
    els.push(`      <rect x="0" y="${(r * rowH).toFixed(1)}" width="${size}" height="${rowH.toFixed(1)}" fill="${base}" stroke="#3f3f46" stroke-width="1" />`);
    for (let c = 0; c < rows + 2; c++) {
      if (rnd() > 0.55) continue;
      const x = c * (size / (rows + 2)) + size * 0.02;
      const y = r * rowH + rowH * 0.18;
      const g = glyphs[Math.floor(rnd() * glyphs.length)];
      const color = rnd() > 0.85 ? accent : '#a1a1aa';
      els.push(`      <g stroke="${color}" stroke-width="2" opacity="0.9">${g(x, y, size / (rows + 2) * 0.96, rowH * 0.64)}</g>`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${els.join('\n')}\n</svg>`;
}
