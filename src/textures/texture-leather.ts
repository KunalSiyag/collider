export interface TextureLeatherOptions {
  base?: string;
  grain?: string;
}

export function createTextureLeather(options: TextureLeatherOptions = {}): string {
  const { base = '#6e3410', grain = '#8a4a20' } = options;
  let seed = 59;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const pebbles: string[] = [];
  for (let i = 0; i < 260; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 4 + rnd() * 9;
    pebbles.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 0.75).toFixed(1)}" fill="none" stroke="#3d1c08" stroke-width="1.2" opacity="0.5"/>`);
    pebbles.push(`<ellipse cx="${(x - r * 0.2).toFixed(1)}" cy="${(y - r * 0.25).toFixed(1)}" rx="${(r * 0.7).toFixed(1)}" ry="${(r * 0.5).toFixed(1)}" fill="${grain}" opacity="${(0.15 + rnd() * 0.2).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="lth-g" cx="45%" cy="40%" r="85%">
      <stop offset="0%" stop-color="#96551f"/>
      <stop offset="100%" stop-color="#3a1a06"/>
    </radialGradient>
    <filter id="lth-f"><feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="3" seed="11"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#lth-g)"/>
  ${pebbles.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#lth-f)" opacity="0.3"/>
</svg>`;
}
