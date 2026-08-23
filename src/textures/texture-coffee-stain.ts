export interface TextureCoffeeStainOptions {
  paper?: string;
  stain?: string;
}

export function createTextureCoffeeStain(options: TextureCoffeeStainOptions = {}): string {
  const { paper = '#f2ecdd', stain = '#7a5230' } = options;
  let seed = 331;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const rings: string[] = [];
  for (let i = 0; i < 12; i++) {
    const cx = rnd() * 320;
    const cy = rnd() * 320;
    const r = 14 + rnd() * 46;
    rings.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="${stain}" stroke-width="${(3 + rnd() * 6).toFixed(1)}" opacity="${(0.15 + rnd() * 0.3).toFixed(2)}"/>`);
    if (rnd() > 0.4) {
      rings.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r * 0.8).toFixed(1)}" fill="${stain}" opacity="${(0.06 + rnd() * 0.12).toFixed(2)}"/>`);
    }
    rings.push(`<path d="M${(cx - r).toFixed(1)},${cy.toFixed(1)} a${r.toFixed(1)},${r.toFixed(1)} 0 0 1 ${(r * 1.4).toFixed(1)},${(-r * 0.4).toFixed(1)}" stroke="#4a2f18" stroke-width="2.5" fill="none" opacity="0.35"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="cfs-n"><feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="109"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${paper}"/>
  ${rings.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#cfs-n)" opacity="0.25"/>
</svg>`;
}
