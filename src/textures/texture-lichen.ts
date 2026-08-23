export interface TextureLichenOptions {
  rock?: string;
  lichen?: string;
}

export function createTextureLichen(options: TextureLichenOptions = {}): string {
  const { rock = '#6f6f68', lichen = '#a9c48a' } = options;
  let seed = 197;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const crusts: string[] = [];
  for (let i = 0; i < 34; i++) {
    const cx = rnd() * 320;
    const cy = rnd() * 320;
    const r = 10 + rnd() * 30;
    const c = rnd() < 0.5 ? lichen : rnd() < 0.5 ? '#c3d8a4' : '#7d9b62';
    crusts.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}" opacity="0.28"/>`);
    for (let j = 0; j < 22; j++) {
      const a = rnd() * Math.PI * 2;
      const d = rnd() * r;
      crusts.push(`<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" r="${(0.8 + rnd() * 2).toFixed(1)}" fill="${c}" opacity="${(0.5 + rnd() * 0.4).toFixed(2)}"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="lch-n"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" seed="71"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${rock}"/>
  ${crusts.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#lch-n)" opacity="0.3"/>
</svg>`;
}
