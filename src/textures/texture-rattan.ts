export interface TextureRattanOptions {
  pole?: string;
  shadow?: string;
}

export function createTextureRattan(options: TextureRattanOptions = {}): string {
  const { pole = '#c89b5e', shadow = '#7a5228' } = options;
  const rows: string[] = [];
  for (let y = 8; y < 320; y += 34) {
    for (let x = -20; x < 340; x += 52) {
      const px = x + ((y / 34) % 2) * 26;
      const d = `M${px - 30},${y + 14} Q${px - 15},${y - 6} ${px},${y + 14} Q${px + 15},${y + 34} ${px + 30},${y + 14}`;
      rows.push(`<path d="${d}" stroke="${pole}" stroke-width="13" fill="none" stroke-linecap="round"/>`);
      rows.push(`<path d="${d}" stroke="${shadow}" stroke-width="3" fill="none" opacity="0.4" transform="translate(0 5)"/>`);
      rows.push(`<ellipse cx="${px}" cy="${y + 14}" rx="4.5" ry="7.5" fill="${shadow}" opacity="0.55"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#3a2712"/>
  ${rows.join('\n  ')}
</svg>`;
}
