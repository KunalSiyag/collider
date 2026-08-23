export interface TexturePebblesOptions {
  stone?: string;
  gap?: string;
}

export function createTexturePebbles(options: TexturePebblesOptions = {}): string {
  const { stone = '#8d8578', gap = '#4a453c' } = options;
  let seed = 311;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const pebbles: string[] = [];
  for (let r = -1; r < 12; r++) {
    for (let c = -1; c < 9; c++) {
      const x = c * 42 + ((r % 2) * 21) + rnd() * 6;
      const y = r * 32 + rnd() * 5;
      const rx = 15 + rnd() * 7;
      const ry = 11 + rnd() * 5;
      const tone = 0.75 + rnd() * 0.5;
      const c2 = rnd() < 0.25 ? '#a89f92' : rnd() < 0.2 ? '#6b6357' : stone;
      pebbles.push(`<ellipse cx="${x.toFixed(1)}" cy="${(y + 3).toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="#000" opacity="0.4"/>`);
      pebbles.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${c2}" opacity="${tone.toFixed(2)}"/>`);
      pebbles.push(`<ellipse cx="${(x - rx * 0.25).toFixed(1)}" cy="${(y - ry * 0.3).toFixed(1)}" rx="${(rx * 0.5).toFixed(1)}" ry="${(ry * 0.35).toFixed(1)}" fill="#fff" opacity="0.14"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${gap}"/>
  ${pebbles.join('\n  ')}
</svg>`;
}
