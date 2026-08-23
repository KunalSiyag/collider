export interface TextureCrackedMudOptions {
  base?: string;
  crack?: string;
}

export function createTextureCrackedMud(options: TextureCrackedMudOptions = {}): string {
  const { base = '#7a5a3a', crack = '#332414' } = options;
  let seed = 211;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const lines: string[] = [];
  for (let i = 0; i < 46; i++) {
    let x = rnd() * 320;
    let y = rnd() * 320;
    let a = rnd() * Math.PI * 2;
    let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
    const segs = 4 + Math.floor(rnd() * 6);
    for (let s = 0; s < segs; s++) {
      a += (rnd() - 0.5) * 1.6;
      x += Math.cos(a) * (18 + rnd() * 30);
      y += Math.sin(a) * (18 + rnd() * 30);
      d += `L${x.toFixed(1)},${y.toFixed(1)} `;
    }
    lines.push(`<path d="${d}" stroke="${crack}" stroke-width="${(2 + rnd() * 4).toFixed(1)}" fill="none" opacity="0.9"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="mud-g" cx="50%" cy="45%" r="85%">
      <stop offset="0%" stop-color="#96744e"/>
      <stop offset="100%" stop-color="#57402a"/>
    </radialGradient>
    <filter id="mud-n"><feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="79"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#mud-g)"/>
  ${lines.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#mud-n)" opacity="0.3"/>
</svg>`;
}
