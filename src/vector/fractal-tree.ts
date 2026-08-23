export interface FractalTreeOptions {
  seed?: number;
  size?: number;
  depth?: number;
  base?: string;
  accent?: string;
}

export function createFractalTree(options: FractalTreeOptions = {}): string {
  const { seed = 13, size = 720, depth = 8, base = '#27272a', accent = '#a78bfa' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  let leafCount = 0;
  const grow = (x: number, y: number, angle: number, len: number, d: number): void => {
    if (d === 0 || len < 3) {
      if (leafCount % 5 === 0) {
        els.push(`      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="${accent}" opacity="0.85">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="${(3 + rnd() * 3).toFixed(1)}s" repeatCount="indefinite" />
      </circle>`);
      }
      leafCount++;
      return;
    }
    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;
    els.push(`      <line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${base}" stroke-width="${(d * 0.7).toFixed(1)}" />`);
    const spread = 0.45 + rnd() * 0.25;
    grow(ex, ey, angle - spread, len * (0.68 + rnd() * 0.08), d - 1);
    grow(ex, ey, angle + spread, len * (0.68 + rnd() * 0.08), d - 1);
  };
  grow(size / 2, size * 0.95, -Math.PI / 2, size * 0.17, depth);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
