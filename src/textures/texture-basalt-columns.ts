export interface TextureBasaltColumnsOptions {
  base?: string;
  edge?: string;
}

export function createTextureBasaltColumns(options: TextureBasaltColumnsOptions = {}): string {
  const { base = '#3c3f45', edge = '#14161a' } = options;
  const cols: string[] = [];
  let seed = 389;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let c = -1; c < 8; c++) {
    const w = 44 + rnd() * 10;
    const x = c * 46;
    const tone = 0.75 + rnd() * 0.5;
    cols.push(`<rect x="${x}" y="-5" width="${w.toFixed(1)}" height="330" fill="#4a4e55" opacity="${tone.toFixed(2)}"/>`);
    cols.push(`<rect x="${(x + w - 6).toFixed(1)}" y="-5" width="7" height="330" fill="${edge}" opacity="0.85"/>`);
    for (let y = 20; y < 330; y += 40 + rnd() * 30) {
      cols.push(`<line x1="${x}" y1="${y.toFixed(1)}" x2="${(x + w).toFixed(1)}" y2="${y.toFixed(1)}" stroke="${edge}" stroke-width="3.5"/>`);
      cols.push(`<line x1="${x}" y1="${(y - 1.5).toFixed(1)}" x2="${(x + w).toFixed(1)}" y2="${(y - 1.5).toFixed(1)}" stroke="#6b7078" stroke-width="1" opacity="0.6"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${cols.join('\n  ')}
</svg>`;
}
