export interface TextureDragonScaleOptions {
  hide?: string;
  scale?: string;
}

export function createTextureDragonScale(options: TextureDragonScaleOptions = {}): string {
  const { hide = '#0d1f1a', scale = '#2e6b52' } = options;
  const rows: string[] = [];
  let seed = 491;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let r = 0; r < 8; r++) {
    for (let c = -1; c < 7; c++) {
      const x = c * 58 + ((r % 2) * 29);
      const y = r * 44;
      const tone = rnd();
      const fill = tone < 0.5 ? '#357a5c' : tone < 0.85 ? '#275c46' : '#41886a';
      rows.push(`<path d="M${x},${y + 40} A29,36 0 0 1 ${x + 58},${y + 40} L${x + 50},${y + 10} Q${x + 29},${y - 6} ${x + 8},${y + 10} Z" fill="${fill}" stroke="#08120e" stroke-width="3"/>`);
      rows.push(`<path d="M${x + 10},${y + 12} Q${x + 29},${y - 2} ${x + 48},${y + 12}" fill="none" stroke="#9ae8c0" stroke-width="2" opacity="0.55"/>`);
      rows.push(`<path d="M${x + 14},${(y + 34).toFixed(0)} L${x + 29},${(y + 16).toFixed(0)} L${x + 44},${(y + 34).toFixed(0)}" fill="none" stroke="#123324" stroke-width="2" opacity="0.7"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${hide}"/>
  ${rows.join('\n  ')}
</svg>`;
}
