export interface TextureSuedeOptions {
  base?: string;
  nap?: string;
}

export function createTextureSuede(options: TextureSuedeOptions = {}): string {
  const { base = '#7a5230', nap = '#c99e63' } = options;
  let seed = 83;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const strokes: string[] = [];
  for (let i = 0; i < 220; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const len = 8 + rnd() * 26;
    const a = rnd() * Math.PI * 2;
    strokes.push(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + Math.cos(a) * len).toFixed(1)}" y2="${(y + Math.sin(a) * len).toFixed(1)}" stroke="${nap}" stroke-width="${(1 + rnd() * 2).toFixed(1)}" stroke-linecap="round" opacity="${(0.05 + rnd() * 0.14).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="sde-g" cx="50%" cy="42%" r="80%">
      <stop offset="0%" stop-color="#a87844"/>
      <stop offset="70%" stop-color="${base}"/>
      <stop offset="100%" stop-color="#4a2f18"/>
    </radialGradient>
    <filter id="sde-f"><feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="17"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#sde-g)"/>
  ${strokes.join('\n  ')}
  <rect width="320" height="320" fill="${base}" filter="url(#sde-f)" opacity="0.5"/>
</svg>`;
}
