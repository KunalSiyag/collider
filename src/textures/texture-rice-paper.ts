export interface TextureRicePaperOptions {
  base?: string;
  fiber?: string;
}

export function createTextureRicePaper(options: TextureRicePaperOptions = {}): string {
  const { base = '#f4efe2', fiber = '#c9bfa5' } = options;
  let seed = 167;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const strands: string[] = [];
  for (let i = 0; i < 200; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const len = 20 + rnd() * 70;
    const a = rnd() > 0.6 ? Math.PI / 2 : rnd() * 0.4 - 0.2 + Math.PI / 2;
    strands.push(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + Math.cos(a) * len).toFixed(1)}" y2="${(y + Math.sin(a) * len).toFixed(1)}" stroke="${fiber}" stroke-width="0.7" opacity="${(0.25 + rnd() * 0.45).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="rcp-n"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="61"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${base}"/>
  ${strands.join('\n  ')}
  <rect width="320" height="320" fill="#8a8064" filter="url(#rcp-n)" opacity="0.4"/>
</svg>`;
}
