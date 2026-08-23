export interface TextureRainDropletsOptions {
  glass?: string;
  drop?: string;
}

export function createTextureRainDroplets(options: TextureRainDropletsOptions = {}): string {
  const { glass = '#31424f', drop = '#9fc4d8' } = options;
  let seed = 233;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const drops: string[] = [];
  for (let i = 0; i < 46; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 3 + rnd() * 9;
    drops.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${drop}" opacity="0.28"/>`);
    drops.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="#e8f6ff" stroke-width="1" opacity="0.55"/>`);
    drops.push(`<ellipse cx="${(x - r * 0.3).toFixed(1)}" cy="${(y - r * 0.35).toFixed(1)}" rx="${(r * 0.32).toFixed(1)}" ry="${(r * 0.22).toFixed(1)}" fill="#fff" opacity="0.85"/>`);
    if (rnd() > 0.55) {
      drops.push(`<path d="M${x.toFixed(1)},${(y + r).toFixed(1)} q${((rnd() - 0.5) * 8).toFixed(1)} ${(10 + rnd() * 26).toFixed(0)} ${((rnd() - 0.5) * 12).toFixed(1)} ${(22 + rnd() * 40).toFixed(0)}" stroke="#cbe6f5" stroke-width="${(1 + rnd() * 2).toFixed(1)}" fill="none" opacity="0.35"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="rng-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#42586a"/>
      <stop offset="1" stop-color="#1d2a35"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#rng-g)"/>
  ${drops.join('\n  ')}
</svg>`;
}
