export interface CrystalClusterOptions {
  seed?: number;
  size?: number;
  crystals?: number;
  base?: string;
  accent?: string;
}

export function createCrystalCluster(options: CrystalClusterOptions = {}): string {
  const { seed = 19, size = 720, crystals = 9, base = '#18181b', accent = '#a78bfa' } = options;

  let t = seed >>> 0;
  const rand = () => {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const groundY = size * 0.86;
  const gems: string[] = [];
  for (let i = 0; i < crystals; i++) {
    const bx = size * 0.12 + (i / (crystals - 1)) * size * 0.76 + (rand() - 0.5) * 24;
    const h = size * (0.14 + rand() * rand() * 0.42);
    const wHalf = 10 + rand() * 20;
    const lean = (rand() - 0.5) * h * 0.18;
    const tipX = bx + lean;
    const tipY = groundY - h;
    const isBig = h > size * 0.34;
    const fill = isBig ? accent : base;
    gems.push(
      `    <polygon points="${(bx - wHalf).toFixed(1)},${groundY} ${(bx - wHalf * 0.55).toFixed(1)},${(groundY - h * 0.82).toFixed(1)} ${tipX.toFixed(1)},${tipY.toFixed(1)} ${(bx + wHalf * 0.55).toFixed(1)},${(groundY - h * 0.8).toFixed(1)} ${(bx + wHalf).toFixed(1)},${groundY}" fill="${fill}" fill-opacity="${isBig ? 0.4 : 0.92}" stroke="${isBig ? accent : '#3f3f46'}" stroke-width="1.2" />`,
    );
    gems.push(
      `    <line x1="${tipX.toFixed(1)}" y1="${tipY.toFixed(1)}" x2="${(bx - wHalf * 0.2).toFixed(1)}" y2="${groundY}" stroke="${isBig ? '#e9d5ff' : '#3f3f46'}" stroke-width="0.9" opacity="${isBig ? 0.7 : 0.6}" />`,
    );
    if (isBig) {
      gems.push(`      <animate attributeName="opacity" values="1;0.75;1" dur="${(4 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${gems.join('\n')}
  <line x1="0" y1="${groundY}" x2="${size}" y2="${groundY}" stroke="#27272a" stroke-width="2" />
</svg>`;
}
