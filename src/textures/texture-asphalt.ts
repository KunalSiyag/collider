export interface TextureAsphaltOptions {
  base?: string;
  aggregate?: string;
}

export function createTextureAsphalt(options: TextureAsphaltOptions = {}): string {
  const { base = '#292524', aggregate = '#a8a29e' } = options;
  let s = 99;
  const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const stones: string[] = [];
  for (let i = 0; i < 420; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 0.6 + rnd() * 2.4;
    const o = 0.12 + rnd() * 0.4;
    stones.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${aggregate}" opacity="${o.toFixed(2)}"/>`);
  }
  for (let i = 0; i < 60; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    stones.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(1 + rnd() * 3).toFixed(1)}" height="1" fill="#000" opacity="0.35"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="ap-f"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" seed="11"/></filter>
  </defs>
  <rect width="320" height="320" fill="${base}"/>
  <rect width="320" height="320" filter="url(#ap-f)" opacity="0.22" style="mix-blend-mode:overlay"/>
  ${stones.join('\n  ')}
</svg>`;
}
