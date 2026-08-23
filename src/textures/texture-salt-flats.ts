export interface TextureSaltFlatsOptions {
  brine?: string;
  crust?: string;
}

export function createTextureSaltFlats(options: TextureSaltFlatsOptions = {}): string {
  const { brine = '#cfd6d8', crust = '#ffffff' } = options;
  let seed = 401;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const pans: string[] = [];
  for (let i = 0; i < 60; i++) {
    let x = rnd() * 320;
    let y = rnd() * 320;
    let a = rnd() * Math.PI * 2;
    let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
    for (let s = 0; s < 4 + Math.floor(rnd() * 3); s++) {
      a += (rnd() - 0.5) * 1.9 + Math.PI / 4.5;
      d += `L${(x += Math.cos(a) * (26 + rnd() * 30)).toFixed(1)},${(y += Math.sin(a) * (26 + rnd() * 30)).toFixed(1)} `;
    }
    pans.push(`<path d="${d}Z" fill="${crust}" stroke="#aeb8bc" stroke-width="1.6" opacity="0.9"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="slt-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eef2f4"/>
      <stop offset="1" stop-color="#b8c2c8"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#slt-g)"/>
  ${pans.join('\n  ')}
</svg>`;
}
