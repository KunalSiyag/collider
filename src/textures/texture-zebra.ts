export interface TextureZebraOptions {
  coat?: string;
  stripe?: string;
}

export function createTextureZebra(options: TextureZebraOptions = {}): string {
  const { coat = '#e8e2d2', stripe = '#181410' } = options;
  const bands: string[] = [];
  let seed = 457;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = -1; i < 16; i++) {
    let x0 = i * 24 + rnd() * 8;
    let d1 = `M${x0.toFixed(1)},-10 `;
    for (let y = -10; y <= 340; y += 40) {
      x0 += Math.sin(y * 0.04 + i) * 9 + (rnd() - 0.5) * 5;
      d1 += `${x0.toFixed(1)},${y} `;
    }
    const w = 8 + rnd() * 8;
    bands.push(`<path d="${d1} l${w.toFixed(1)},350 L-20,340 Z" fill="none"/>`);
    bands.push(`<polyline points="${d1}" stroke="${stripe}" stroke-width="${w.toFixed(1)}" fill="none" stroke-linecap="butt"/>`);
    bands.push(`<polyline points="${d1}" stroke="#3a342c" stroke-width="${(w * 0.4).toFixed(1)}" fill="none" opacity="0.6" transform="translate(${(w * 0.35).toFixed(1)} 0)"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${coat}"/>
  ${bands.join('\n  ')}
</svg>`;
}
