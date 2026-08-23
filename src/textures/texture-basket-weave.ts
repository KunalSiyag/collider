export interface TextureBasketWeaveOptions {
  over?: string;
  under?: string;
  gap?: string;
}

export function createTextureBasketWeave(options: TextureBasketWeaveOptions = {}): string {
  const { over = '#b45309', under = '#78350f', gap = '#291a08' } = options;
  const cell = 40, half = cell / 2;
  const strands: string[] = [];
  for (let row = -1; row < 9; row++) {
    for (let col = -1; col < 9; col++) {
      const x = col * cell, y = row * cell;
      const horizontal = (row + col) % 2 === 0;
      const color = horizontal ? over : under;
      if (horizontal) {
        strands.push(`<rect x="${x}" y="${y + 3}" width="${cell}" height="${cell - 6}" rx="4" fill="${color}"/>`);
        strands.push(`<line x1="${x + 4}" y1="${y + half}" x2="${x + cell - 4}" y2="${y + half}" stroke="#000" stroke-width="1.5" opacity="0.25"/>`);
        strands.push(`<line x1="${x + 4}" y1="${y + 8}" x2="${x + cell - 4}" y2="${y + 8}" stroke="#fff" stroke-width="1.2" opacity="0.18"/>`);
      } else {
        strands.push(`<rect x="${x + 3}" y="${y}" width="${cell - 6}" height="${cell}" rx="4" fill="${color}"/>`);
        strands.push(`<line x1="${x + half}" y1="${y + 4}" x2="${x + half}" y2="${y + cell - 4}" stroke="#000" stroke-width="1.5" opacity="0.25"/>`);
      }
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${gap}"/>
  <g>${strands.join('\n  ')}</g>
</svg>`;
}
