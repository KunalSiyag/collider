export interface RootNetworkOptions {
  seed?: number;
  size?: number;
  depth?: number;
  base?: string;
  accent?: string;
}

export function createRootNetwork(options: RootNetworkOptions = {}): string {
  const { seed = 27, size = 720, depth = 5, base = '#3f3f46', accent = '#22d3ee' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  const nodes: [number, number][] = [];
  const grow = (x: number, y: number, angle: number, len: number, d: number): void => {
    if (d === 0 || len < 6) return;
    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;
    els.push(`      <line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${d === depth ? '#52525b' : base}" stroke-width="${(d * 0.8).toFixed(1)}" opacity="0.85" />`);
    if (d === 1 && rnd() > 0.6) {
      nodes.push([ex, ey]);
      els.push(`      <circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="2.2" fill="${accent}" />`);
    }
    grow(ex, ey, angle + (rnd() - 0.5) * 0.9, len * 0.7, d - 1);
    grow(ex, ey, angle + (rnd() - 0.5) * 0.9, len * 0.7, d - 1);
  };
  grow(size * 0.5, size * 0.06, Math.PI / 2, size * 0.15, depth);

  for (const [nx, ny] of nodes.slice(0, 12)) {
    for (const [mx, my] of nodes) {
      if ((nx !== mx || ny !== my) && rnd() > 0.82) {
        els.push(`      <line x1="${nx.toFixed(1)}" y1="${ny.toFixed(1)}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="${accent}" stroke-width="0.6" opacity="0.4">
        <animate attributeName="opacity" values="0.05;0.5;0.05" dur="${(3 + rnd() * 4).toFixed(1)}s" repeatCount="indefinite" />
      </line>`);
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
