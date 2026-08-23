export interface TextureButterflyWingOptions {
  base?: string;
  accent?: string;
}

export function createTextureButterflyWing(options: TextureButterflyWingOptions = {}): string {
  const { base = '#3a2a6b', accent = '#e8964a' } = options;
  const cells: string[] = [];
  let seed = 487;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let r = -1; r < 9; r++) {
    for (let c = -1; c < 7; c++) {
      const x = c * 54 + ((r % 2) * 27);
      const y = r * 42;
      const tone = rnd();
      const fill = tone < 0.55 ? '#54409a' : tone < 0.8 ? '#2c1f52' : accent;
      const s = 0.85 + rnd() * 0.35;
      cells.push(`<g transform="translate(${x} ${y}) scale(${s.toFixed(2)})">
        <path d="M0,20 C-22,14 -26,-10 0,-22 C26,-10 22,14 0,20 Z" fill="${fill}" stroke="#c8b8f0" stroke-width="1.4" opacity="0.95"/>
        <circle cx="0" cy="-4" r="${(2 + rnd() * 3).toFixed(1)}" fill="#f2d8a8"/>
      </g>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${cells.join('\n  ')}
</svg>`;
}
