export interface TextureConcreteOptions {
  base?: string;
  pore?: string;
}

export function createTextureConcrete(options: TextureConcreteOptions = {}): string {
  const { base = '#8d8d89', pore = '#4f4f4c' } = options;
  let seed = 53;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const blotches: string[] = [];
  for (let i = 0; i < 40; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    blotches.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(18 + rnd() * 45).toFixed(0)}" ry="${(12 + rnd() * 30).toFixed(0)}" fill="${rnd() > 0.5 ? '#a3a39e' : '#767672'}" opacity="0.25"/>`);
  }
  const pores: string[] = [];
  for (let i = 0; i < 160; i++) {
    pores.push(`<circle cx="${(rnd() * 320).toFixed(1)}" cy="${(rnd() * 320).toFixed(1)}" r="${(0.7 + rnd() * 2.2).toFixed(1)}" fill="${pore}" opacity="${(0.3 + rnd() * 0.5).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="con-f"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" seed="19"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${base}"/>
  ${blotches.join('\n  ')}
  <rect width="320" height="320" fill="#fff" filter="url(#con-f)" opacity="0.35"/>
  ${pores.join('\n  ')}
</svg>`;
}
