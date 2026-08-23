export interface TextureSlateOptions {
  base?: string;
  seam?: string;
}

export function createTextureSlate(options: TextureSlateOptions = {}): string {
  const { base = '#3a4149', seam = '#1c2126' } = options;
  let seed = 23;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const shards: string[] = [];
  for (let y = -10; y < 330; ) {
    const h = 14 + rnd() * 30;
    let x = rnd() * -20;
    while (x < 320) {
      const w = 40 + rnd() * 80;
      const tone = 0.85 + rnd() * 0.3;
      shards.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${(h - 2).toFixed(1)}" fill="#59626c" opacity="${tone.toFixed(2)}"/>`);
      shards.push(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${(y + h - 2).toFixed(1)}" stroke="${seam}" stroke-width="2.5"/>`);
      shards.push(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + w).toFixed(1)}" y2="${y.toFixed(1)}" stroke="#7d8894" stroke-width="1" opacity="0.6"/>`);
      x += w;
    }
    shards.push(`<rect x="0" y="${(y + h - 3).toFixed(1)}" width="320" height="3" fill="${seam}" opacity="0.8"/>`);
    y += h + 2;
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${shards.join('\n  ')}
</svg>`;
}
