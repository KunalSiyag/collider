export interface TextureArgyleOptions {
  base?: string;
  a?: string;
  b?: string;
  line?: string;
}

export function createTextureArgyle(options: TextureArgyleOptions = {}): string {
  const { base = '#1e3a5f', a = '#27496d', b = '#5c1a1a', line = '#e8dcc8' } = options;
  const w = 80, h = 80;
  const diamonds: string[] = [];
  for (let row = -1; row < 5; row++) {
    for (let col = -1; col < 5; col++) {
      const cx = col * w + (row % 2 ? w / 2 : 0);
      const cy = row * h;
      const color = (col + row) % 2 ? a : b;
      diamonds.push(`<path d="M${cx} ${cy} L${cx + w / 2} ${cy + h / 2} L${cx} ${cy + h} L${cx - w / 2} ${cy + h / 2} Z" fill="${color}"/>`);
      diamonds.push(`<line x1="${cx}" y1="${cy + 12}" x2="${cx + w / 2 - 12}" y2="${cy + h / 2}" stroke="${line}" stroke-width="1.4" opacity="0.55"/>`);
      diamonds.push(`<line x1="${cx}" y1="${cy + h - 12}" x2="${cx + w / 2 - 12}" y2="${cy + h / 2}" stroke="${line}" stroke-width="1.4" opacity="0.55"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  <g>${diamonds.join('\n  ')}</g>
</svg>`;
}
