export interface HarborSkylineOptions {
  seed?: number;
  size?: number;
  buildings?: number;
  base?: string;
  window?: string;
  accent?: string;
}

export function createHarborSkyline(options: HarborSkylineOptions = {}): string {
  const { seed = 7, size = 720, buildings = 14, base = '#18181b', window: winColor = '#fbbf24', accent = '#22d3ee' } = options;

  let t = seed >>> 0;
  const rand = () => {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const horizon = size * 0.68;
  const blocks: string[] = [];
  let x = -10;
  while (x < size) {
    const w = 28 + rand() * 52;
    const h = size * (0.12 + rand() * rand() * 0.34);
    const y = horizon - h;
    const spire = rand() > 0.78 ? `    <line x1="${(x + w / 2).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + w / 2).toFixed(1)}" y2="${(y - 18 - rand() * 16).toFixed(1)}" stroke="${accent}" stroke-width="1.4" />` : '';
    blocks.push(`    <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${base}" stroke="#3f3f46" stroke-width="0.8" />${spire}`);
    for (let wy = y + 10; wy < horizon - 8; wy += 13) {
      for (let wx = x + 6; wx < x + w - 8; wx += 11) {
        if (rand() > 0.62) {
          blocks.push(`    <rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="4" height="6" fill="${winColor}" opacity="${(0.35 + rand() * 0.6).toFixed(2)}" />`);
        }
      }
    }
    x += w + 4 + rand() * 12;
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${horizon}" fill="#0b0b10" />
${blocks.join('\n')}
  <rect x="0" y="${horizon}" width="${size}" height="${size - horizon}" fill="#0d0d14" />
  <g opacity="0.25" transform="translate(0 ${(horizon * 2).toFixed(0)}) scale(1,-1)">
${blocks.join('\n')}
  </g>
</svg>`;
}
