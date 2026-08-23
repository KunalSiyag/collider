export interface TextureObsidianOptions {
  base?: string;
  sheen?: string;
}

export function createTextureObsidian(options: TextureObsidianOptions = {}): string {
  const { base = '#0d0d12', sheen = '#5a5f7a' } = options;
  let seed = 373;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const facets: string[] = [];
  for (let i = 0; i < 40; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 20 + rnd() * 60;
    facets.push(`<path d="M${x.toFixed(1)},${y.toFixed(1)} L${(x + r * (rnd() - 0.2)).toFixed(1)},${(y + r * rnd()).toFixed(1)} L${(x + r * 0.4).toFixed(1)},${(y + r).toFixed(1)} Z" fill="${sheen}" opacity="${(0.05 + rnd() * 0.14).toFixed(2)}"/>`);
  }
  const cracks: string[] = [];
  for (let i = 0; i < 10; i++) {
    let x = rnd() * 320;
    let y = rnd() * 320;
    let a = rnd() * Math.PI * 2;
    let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
    for (let s = 0; s < 5; s++) {
      a += (rnd() - 0.5) * 1.6;
      d += `L${(x += Math.cos(a) * 34).toFixed(1)},${(y += Math.sin(a) * 34).toFixed(1)} `;
    }
    cracks.push(`<path d="${d}" stroke="#3a3f55" stroke-width="1.2" fill="none" opacity="0.7"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="obs-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a1c26"/>
      <stop offset="0.5" stop-color="#0a0a0e"/>
      <stop offset="1" stop-color="#14161f"/>
    </linearGradient>
    <filter id="obs-b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#obs-g)"/>
  <g filter="url(#obs-b)">
    ${facets.join('\n    ')}
  </g>
  ${cracks.join('\n  ')}
</svg>`;
}
