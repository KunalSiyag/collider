export interface TextureLavaCrustOptions {
  crust?: string;
  glow?: string;
}

export function createTextureLavaCrust(options: TextureLavaCrustOptions = {}): string {
  const { crust = '#1c1512', glow = '#ff5a1f' } = options;
  let seed = 223;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const cracks: string[] = [];
  for (let i = 0; i < 34; i++) {
    let x = rnd() * 320;
    let y = rnd() * 320;
    let a = rnd() * Math.PI * 2;
    let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
    for (let s = 0; s < 5 + Math.floor(rnd() * 5); s++) {
      a += (rnd() - 0.5) * 1.4;
      x += Math.cos(a) * (20 + rnd() * 35);
      y += Math.sin(a) * (20 + rnd() * 35);
      d += `L${x.toFixed(1)},${y.toFixed(1)} `;
    }
    cracks.push(`<path d="${d}" stroke="#7a2408" stroke-width="9" fill="none" opacity="0.9"/>`);
    cracks.push(`<path d="${d}" stroke="${glow}" stroke-width="3.5" fill="none"/>`);
    cracks.push(`<path d="${d}" stroke="#ffd23e" stroke-width="1.2" fill="none" opacity="0.9"/>`);
  }
  const plates: string[] = [];
  for (let i = 0; i < 40; i++) {
    plates.push(`<ellipse cx="${(rnd() * 320).toFixed(1)}" cy="${(rnd() * 320).toFixed(1)}" rx="${(14 + rnd() * 30).toFixed(0)}" ry="${(10 + rnd() * 22).toFixed(0)}" fill="#241a15" opacity="${(0.4 + rnd() * 0.4).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${crust}"/>
  <g filter="url(#lav-b)">
    ${cracks.join('\n  ')}
  </g>
  ${plates.join('\n  ')}
  <defs>
    <filter id="lav-b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5"/></filter>
  </defs>
</svg>`;
}
