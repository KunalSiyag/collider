export interface CafeWallOptions {
  size?: number;
  rows?: number;
  cols?: number;
  brick?: string;
  mortar?: string;
  accent?: string;
}

export function createCafeWall(options: CafeWallOptions = {}): string {
  const { size = 720, rows = 10, cols = 8, brick = '#3f3f46', mortar = '#18181b', accent = '#f472b6' } = options;
  const rowH = size / rows;
  const tileW = size / cols;
  const els: string[] = [];

  for (let r = 0; r < rows; r++) {
    const shift = ((r % 2 === 0 ? -1 : 1) * r * tileW * 0.12);
    for (let cIdx = -1; cIdx <= cols; cIdx++) {
      const x = cIdx * tileW + shift;
      const isAccent = r === Math.floor(rows / 2) && cIdx % 4 === 0;
      els.push(`      <rect x="${x.toFixed(1)}" y="${(r * rowH + 1).toFixed(1)}" width="${(tileW - 2).toFixed(1)}" height="${(rowH - 2).toFixed(1)}" fill="${isAccent ? accent : brick}" opacity="${isAccent ? 0.7 : 0.9}" />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="${mortar}" />
${els.join('\n')}
</svg>`;
}
