export interface CoralBranchOptions {
  seed?: number;
  size?: number;
  depth?: number;
  base?: string;
  accent?: string;
}

export function createCoralBranch(options: CoralBranchOptions = {}): string {
  const { seed = 66, size = 720, depth = 5, base = '#3f3f46', accent = '#f472b6' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  const grow = (x: number, y: number, angle: number, len: number, d: number): void => {
    if (d === 0 || len < 5) return;
    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;
    const isTip = d === 1;
    els.push(`      <line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${isTip ? accent : base}" stroke-width="${(d * 1.4).toFixed(1)}" stroke-linecap="round"${isTip ? '>\n        <animate attributeName="opacity" values="1;0.45;1" dur="5s" repeatCount="indefinite" />\n      ' : ''} />`);
    if (!isTip) {
      const n = rnd() > 0.6 ? 3 : 2;
      for (let i = 0; i < n; i++) {
        grow(ex, ey, angle + (rnd() - 0.5) * 1.5 + (i - (n - 1) / 2) * 0.55, len * (0.55 + rnd() * 0.25), d - 1);
      }
    }
  };
  grow(size * 0.5, size * 0.92, -Math.PI / 2, size * 0.16, depth);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
