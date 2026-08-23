export interface ShapeHexClusterOptions {
  colors?: string[];
  size?: number;
  seed?: number;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createShapeHexCluster(options: ShapeHexClusterOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'], size = 320, seed = 13 } = options;
  const rand = mulberry32(seed);
  const r = 34;
  const h = Math.sqrt(3) * r;
  const cells: string[] = [];

  for (let q = -2; q <= 2; q++) {
    for (let row = -2; row <= 2; row++) {
      const cx = 160 + q * r * 1.5;
      const cy = 160 + row * h + (q % 2 !== 0 ? h / 2 : 0);
      if (Math.hypot(cx - 160, cy - 160) > 138) continue;
      if (rand() < 0.18) continue;
      const pts: string[] = [];
      for (let k = 0; k < 6; k++) {
        const a = (Math.PI / 180) * (60 * k);
        pts.push(`${(cx + r * 0.92 * Math.cos(a)).toFixed(1)},${(cy + r * 0.92 * Math.sin(a)).toFixed(1)}`);
      }
      const filled = rand() > 0.45;
      cells.push(
        `<polygon points="${pts.join(' ')}" fill="${filled ? colors[Math.floor(rand() * colors.length)]! : 'none'}" stroke="#3f3f46" stroke-width="2">${filled ? `<animate attributeName="fill-opacity" values="1;0.4;1" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" />` : ''}</polygon>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${cells.join('\n')}
</svg>`;
}
