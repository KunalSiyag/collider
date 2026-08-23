export interface TexturePapyrusOptions {
  base?: string;
  strip?: string;
}

export function createTexturePapyrus(options: TexturePapyrusOptions = {}): string {
  const { base = '#d8bd8a', strip = '#b3945e' } = options;
  const bands: string[] = [];
  let seed = 173;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let y = -6; y < 330; y += 22 + rnd() * 10) {
    const h = 18 + rnd() * 12;
    const tone = rnd() > 0.5 ? strip : '#c7a76f';
    bands.push(`<rect x="-5" y="${y.toFixed(1)}" width="330" height="${(h - 2).toFixed(1)}" fill="${tone}" opacity="0.85"/>`);
    bands.push(`<line x1="0" y1="${y.toFixed(1)}" x2="320" y2="${y.toFixed(1)}" stroke="#8a6c3c" stroke-width="1.2" opacity="0.7"/>`);
    for (let f = 0; f < 14; f++) {
      bands.push(`<line x1="${(rnd() * 320).toFixed(0)}" y1="${(y + rnd() * h).toFixed(1)}" x2="${(rnd() * 320).toFixed(0)}" y2="${(y + rnd() * h).toFixed(1)}" stroke="#a08351" stroke-width="0.5" opacity="0.35"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${bands.join('\n  ')}
</svg>`;
}
