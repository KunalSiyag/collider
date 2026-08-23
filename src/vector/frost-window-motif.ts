export interface FrostWindowOptions {
  seed?: number;
  size?: number;
  branches?: number;
  base?: string;
  accent?: string;
}

export function createFrostWindow(options: FrostWindowOptions = {}): string {
  const { seed = 73, size = 720, branches = 7, base = '#3f3f46', accent = '#67e8f9' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  const grow = (x: number, y: number, angle: number, len: number, depth: number): void => {
    if (depth === 0 || len < 4) return;
    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;
    els.push(`      <line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${depth > 2 ? base : accent}" stroke-width="${(depth * 0.5).toFixed(1)}" opacity="0.85" />`);
    grow(ex, ey, angle - 0.5 - rnd() * 0.3, len * 0.62, depth - 1);
    grow(ex, ey, angle + 0.5 + rnd() * 0.3, len * 0.62, depth - 1);
  };
  for (let b = 0; b < branches; b++) {
    const edge = Math.floor(rnd() * 4);
    let x = 0, y = 0, angle = 0;
    if (edge === 0) { x = rnd() * size; y = 0; angle = Math.PI / 2; }
    else if (edge === 1) { x = size; y = rnd() * size; angle = Math.PI; }
    else if (edge === 2) { x = rnd() * size; y = size; angle = -Math.PI / 2; }
    else { x = 0; y = rnd() * size; angle = 0; }
    grow(x, y, angle + (rnd() - 0.5) * 0.8, size * (0.08 + rnd() * 0.12), 5);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
