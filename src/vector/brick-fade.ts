export interface BrickFadeOptions {
  seed?: number;
  size?: number;
  rows?: number;
  base?: string;
  accent?: string;
}

export function createBrickFade(options: BrickFadeOptions = {}): string {
  const { seed = 11, size = 720, rows = 16, base = '#18181b', accent = '#8b5cf6' } = options;

  let t = seed >>> 0;
  const rand = () => {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const rh = size / rows;
  const bw = rh * 2.1;
  const els: string[] = [];
  for (let row = 0; row < rows; row++) {
    const offset = row % 2 === 0 ? 0 : -bw / 2;
    const fade = 1 - row / rows;
    for (let col = -1; col * bw + offset < size + bw; col++) {
      const x = col * bw + offset + 2;
      const y = row * rh + 2;
      if (rand() > fade * 0.96 + 0.04) continue;
      const isAccent = rand() > 0.94;
      els.push(`    <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(bw - 4).toFixed(1)}" height="${(rh - 4).toFixed(1)}" rx="2" fill="${isAccent ? accent : base}" stroke="#3f3f46" stroke-width="0.75" opacity="${(0.35 + fade * 0.65).toFixed(2)}" />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${els.join('\n')}\n</svg>`;
}
