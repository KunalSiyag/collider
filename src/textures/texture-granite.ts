export interface TextureGraniteOptions {
  base?: string;
  fleck?: string;
}

export function createTextureGranite(options: TextureGraniteOptions = {}): string {
  const { base = '#4b4b52', fleck = '#d9d9e0' } = options;
  let seed = 41;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const dots: string[] = [];
  for (let i = 0; i < 900; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 0.6 + rnd() * 2.4;
    const pick = rnd();
    const c = pick < 0.45 ? fleck : pick < 0.75 ? '#1c1c22' : pick < 0.92 ? '#8f8f9a' : '#b78e6a';
    dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}" opacity="${(0.35 + rnd() * 0.5).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${dots.join('\n  ')}
</svg>`;
}
