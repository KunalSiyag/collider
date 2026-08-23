export interface TextureScalesOptions {
  scale?: string;
  edge?: string;
}

export function createTextureScales(options: TextureScalesOptions = {}): string {
  const { scale = '#2e7d8f', edge = '#0d2530' } = options;
  const rows: string[] = [];
  for (let r = 0; r < 12; r++) {
    const y = r * 28;
    for (let c = -1; c < 9; c++) {
      const x = c * 40 + ((r % 2) * 20);
      rows.push(`<path d="M${x - 20},${y} A20,22 0 0 1 ${x + 20},${y} Z" fill="${scale}" stroke="${edge}" stroke-width="1.6"/>`);
      rows.push(`<path d="M${x - 13},${y - 3} A13,15 0 0 1 ${x + 13},${y - 3}" fill="none" stroke="#8fd4e0" stroke-width="1.4" opacity="0.45"/>`);
      rows.push(`<circle cx="${x}" cy="${(y - 10).toFixed(0)}" r="2" fill="#bfeaf2" opacity="0.5"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${edge}"/>
  ${rows.join('\n  ')}
</svg>`;
}
