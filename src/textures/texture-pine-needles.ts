export interface TexturePineNeedlesOptions {
  base?: string;
  needle?: string;
}

export function createTexturePineNeedles(options: TexturePineNeedlesOptions = {}): string {
  const { base = '#1c2a16', needle = '#3e6b2a' } = options;
  let seed = 349;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const bundles: string[] = [];
  for (let i = 0; i < 40; i++) {
    const cx = rnd() * 320;
    const cy = rnd() * 320;
    const rot = rnd() * Math.PI * 2;
    for (let n = -2; n <= 2; n++) {
      const a = rot + n * 0.28;
      const len = 44 + rnd() * 26;
      bundles.push(`<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + Math.cos(a) * len).toFixed(1)}" y2="${(cy + Math.sin(a) * len).toFixed(1)}" stroke="#243d18" stroke-width="4" opacity="0.5"/>`);
      bundles.push(`<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + Math.cos(a) * len).toFixed(1)}" y2="${(cy + Math.sin(a) * len).toFixed(1)}" stroke="${rnd() < 0.5 ? needle : '#56873a'}" stroke-width="2.2" stroke-linecap="round"/>`);
    }
    bundles.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="3" fill="#8a6c3c"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${bundles.join('\n  ')}
</svg>`;
}
