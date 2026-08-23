export interface AvatarPixelOptions {
  seed?: number;
  fg?: string;
  bg?: string;
  size?: number;
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

export function createAvatarPixel(options: AvatarPixelOptions = {}): string {
  const { seed = 42, fg = '#8b5cf6', bg = '#1c1c22', size = 128 } = options;

  const rand = mulberry32(seed);
  const cells = 5;
  const cell = 100 / cells;
  const rects: string[] = [];

  for (let col = 0; col < Math.ceil(cells / 2); col++) {
    for (let row = 0; row < cells; row++) {
      if (rand() > 0.55) continue;
      const x = col * cell + 14;
      const y = row * cell + 14;
      rects.push(`    <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cell.toFixed(1)}" height="${cell.toFixed(1)}" fill="${fg}" />`);
      const mirrorCol = cells - 1 - col;
      if (mirrorCol !== col) {
        const mx = mirrorCol * cell + 14;
        rects.push(`    <rect x="${mx.toFixed(1)}" y="${y.toFixed(1)}" width="${cell.toFixed(1)}" height="${cell.toFixed(1)}" fill="${fg}" />`);
      }
    }
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Identicon ${seed}">
  <rect width="128" height="128" rx="36" fill="${bg}" />
${rects.join('\n')}
</svg>`;
}
