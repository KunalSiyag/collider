export interface TextureCoralOptions {
  water?: string;
  polyp?: string;
}

export function createTextureCoral(options: TextureCoralOptions = {}): string {
  const { water = '#122a3a', polyp = '#e0685a' } = options;
  let seed = 307;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const branches: string[] = [];
  for (let t = 0; t < 16; t++) {
    let x = rnd() * 320;
    let y = 320 + rnd() * 20;
    let a = -Math.PI / 2 + (rnd() - 0.5) * 0.6;
    let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
    for (let s = 0; s < 6; s++) {
      a += (rnd() - 0.5) * 1.1;
      const len = 22 + rnd() * 26;
      x += Math.cos(a) * len;
      y += Math.sin(a) * len;
      d += `L${x.toFixed(1)},${y.toFixed(1)} `;
      if (rnd() > 0.5 && s > 1) {
        const ba = a + (rnd() - 0.5) * 2;
        branches.push(`<path d="M${x.toFixed(1)},${y.toFixed(1)} l${(Math.cos(ba) * len * 0.7).toFixed(1)},${(Math.sin(ba) * len * 0.7).toFixed(1)}" stroke="${polyp}" stroke-width="6" stroke-linecap="round" opacity="0.9"/>`);
      }
    }
    branches.push(`<path d="${d}" stroke="${polyp}" stroke-width="9" fill="none" stroke-linecap="round"/>`);
    branches.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#f2a08c"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="cor-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1d4258"/>
      <stop offset="1" stop-color="#081824"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#cor-g)"/>
  ${branches.join('\n  ')}
</svg>`;
}
