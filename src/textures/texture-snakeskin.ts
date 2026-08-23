export interface TextureSnakeskinOptions {
  scale?: string;
  edge?: string;
}

export function createTextureSnakeskin(options: TextureSnakeskinOptions = {}): string {
  const { scale = '#5a7d3a', edge = '#1f2e12' } = options;
  const rows: string[] = [];
  for (let r = 0; r < 14; r++) {
    const y = r * 24 - 12;
    for (let c = -1; c < 10; c++) {
      const x = c * 36 + ((r % 2) * 18);
      const shade = (r + c) % 2 === 0 ? '#6d9348' : '#4a6a2e';
      rows.push(`<path d="M${x},${y} Q${x + 18},${y - 16} ${x + 36},${y} L${x + 30},${y + 22} Q${x + 18},${y + 32} ${x + 6},${y + 22} Z" fill="${shade}" stroke="${edge}" stroke-width="1.4"/>`);
      rows.push(`<path d="M${x + 8},${y + 4} Q${x + 18},${y - 6} ${x + 28},${y + 4}" fill="none" stroke="#c9dba2" stroke-width="1" opacity="0.35"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${edge}"/>
  ${rows.join('\n  ')}
</svg>`;
}
