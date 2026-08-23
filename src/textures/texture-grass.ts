export interface TextureGrassOptions {
  base?: string;
  blade?: string;
}

export function createTextureGrass(options: TextureGrassOptions = {}): string {
  const { base = '#1e3312', blade = '#4e7d2a' } = options;
  let seed = 337;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const blades: string[] = [];
  for (let i = 0; i < 260; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const h = 16 + rnd() * 34;
    const bend = (rnd() - 0.5) * 22;
    const c = rnd() < 0.5 ? blade : rnd() < 0.5 ? '#6da03c' : '#33551f';
    blades.push(`<path d="M${x.toFixed(1)},${(y + h).toFixed(1)} Q${x.toFixed(1)},${(y + h / 2).toFixed(1)} ${(x + bend).toFixed(1)},${y.toFixed(1)}" stroke="${c}" stroke-width="${(1.2 + rnd() * 1.6).toFixed(1)}" fill="none" stroke-linecap="round" opacity="${(0.55 + rnd() * 0.45).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${blades.join('\n  ')}
</svg>`;
}
