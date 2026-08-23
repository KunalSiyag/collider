export interface TextureIceCracksOptions {
  ice?: string;
  crack?: string;
}

export function createTextureIceCracks(options: TextureIceCracksOptions = {}): string {
  const { ice = '#bfe3f5', crack = '#4d7fa3' } = options;
  let seed = 227;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const lines: string[] = [];
  for (let i = 0; i < 16; i++) {
    let x = rnd() * 320;
    let y = rnd() * 320;
    let a = rnd() * Math.PI * 2;
    let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
    for (let s = 0; s < 6 + Math.floor(rnd() * 5); s++) {
      a += (rnd() - 0.5) * 1.1;
      d += `L${(x += Math.cos(a) * (22 + rnd() * 34)).toFixed(1)},${(y += Math.sin(a) * (22 + rnd() * 34)).toFixed(1)} `;
      if (rnd() < 0.35) {
        const ba = a + (rnd() - 0.5) * 2.2;
        d += `M${x.toFixed(1)},${y.toFixed(1)} l${(Math.cos(ba) * 26).toFixed(1)},${(Math.sin(ba) * 26).toFixed(1)} M`;
        d += `${x.toFixed(1)},${y.toFixed(1)} `;
      }
    }
    lines.push(`<path d="${d}" stroke="#ffffff" stroke-width="4.5" fill="none" opacity="0.55"/>`);
    lines.push(`<path d="${d}" stroke="${crack}" stroke-width="1.4" fill="none" opacity="0.85"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="ice-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e8f6fd"/>
      <stop offset="0.5" stop-color="${ice}"/>
      <stop offset="1" stop-color="#8fbdd9"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#ice-g)"/>
  ${lines.join('\n  ')}
</svg>`;
}
