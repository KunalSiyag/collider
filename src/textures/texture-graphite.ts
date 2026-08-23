export interface TextureGraphiteOptions {
  paper?: string;
  lead?: string;
}

export function createTextureGraphite(options: TextureGraphiteOptions = {}): string {
  const { paper = '#eceae2', lead = '#3a3a3c' } = options;
  let seed = 433;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const strokes: string[] = [];
  for (let band = 0; band < 5; band++) {
    for (let i = 0; i < 46; i++) {
      const y = 30 + band * 58 + rnd() * 44;
      const x0 = rnd() * 60;
      const x1 = x0 + 140 + rnd() * 140;
      strokes.push(`<line x1="${x0.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${(y + (rnd() - 0.5) * 6).toFixed(1)}" stroke="${lead}" stroke-width="${(0.8 + rnd() * 2.4).toFixed(1)}" opacity="${(0.12 + rnd() * 0.3).toFixed(2)}"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="gph-b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.1"/></filter>
    <filter id="gph-n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" seed="139"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${paper}"/>
  <g filter="url(#gph-b)">
    ${strokes.join('\n    ')}
  </g>
  <rect width="320" height="320" fill="#000" filter="url(#gph-n)" opacity="0.2"/>
</svg>`;
}
