export interface TextureFrostOptions {
  glass?: string;
  ice?: string;
}

export function createTextureFrost(options: TextureFrostOptions = {}): string {
  const { glass = '#9fb8c8', ice = '#eef8ff' } = options;
  let seed = 419;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const crystals: string[] = [];
  for (let c = 0; c < 10; c++) {
    const cx = rnd() * 320;
    const cy = rnd() * 320;
    const main = rnd() * Math.PI * 2;
    for (let arm = 0; arm < 6; arm++) {
      let x = cx;
      let y = cy;
      let a = main + (arm * Math.PI) / 3;
      let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
      for (let s = 0; s < 5; s++) {
        a += (rnd() - 0.5) * 0.7;
        x += Math.cos(a) * (12 + rnd() * 14);
        y += Math.sin(a) * (12 + rnd() * 14);
        d += `L${x.toFixed(1)},${y.toFixed(1)} `;
        if (rnd() > 0.35 && s > 0) {
          const ba = a - Math.PI / 2.6;
          crystals.push(`<path d="M${x.toFixed(1)},${y.toFixed(1)} l${(Math.cos(ba) * 9).toFixed(1)},${(Math.sin(ba) * 9).toFixed(1)} M${x.toFixed(1)},${y.toFixed(1)} l${(-Math.cos(ba) * 9).toFixed(1)},${(-Math.sin(ba) * 9).toFixed(1)}" stroke="${ice}" stroke-width="1" opacity="0.75"/>`);
        }
      }
      crystals.push(`<path d="${d}" stroke="${ice}" stroke-width="${(2.2 - arm * 0.15).toFixed(1)}" fill="none" stroke-linecap="round" opacity="0.9"/>`);
    }
    crystals.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="3.4" fill="#fff"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="frs-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#b8ccd8"/>
      <stop offset="1" stop-color="#7894a8"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#frs-g)"/>
  ${crystals.join('\n  ')}
</svg>`;
}
