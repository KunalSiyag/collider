export interface TextureGoldFoilOptions {
  light?: string;
  dark?: string;
}

export function createTextureGoldFoil(options: TextureGoldFoilOptions = {}): string {
  const { light = '#f5d67a', dark = '#8a5f14' } = options;
  let seed = 131;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const facets: string[] = [];
  for (let i = 0; i < 130; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const s = 18 + rnd() * 46;
    const a1 = rnd() * Math.PI * 2;
    const a2 = a1 + 0.7 + rnd() * 1.2;
    const tone = rnd();
    const c = tone < 0.3 ? light : tone < 0.55 ? '#c99b2e' : tone < 0.8 ? '#a87c1e' : dark;
    facets.push(`<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${(x + Math.cos(a1) * s).toFixed(1)},${(y + Math.sin(a1) * s).toFixed(1)} ${(x + Math.cos(a2) * s).toFixed(1)},${(y + Math.sin(a2) * s).toFixed(1)}" fill="${c}" opacity="${(0.35 + rnd() * 0.5).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="gfl-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e9bf4e"/>
      <stop offset="0.5" stop-color="#b98a20"/>
      <stop offset="1" stop-color="#f2d47e"/>
    </linearGradient>
    <filter id="gbl-f"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="41"/><feDisplacementMap in="SourceGraphic" scale="30"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#gfl-g)"/>
  <g filter="url(#gbl-f)">
    ${facets.join('\n    ')}
  </g>
</svg>`;
}
