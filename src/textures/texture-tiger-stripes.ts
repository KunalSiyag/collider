export interface TextureTigerStripesOptions {
  coat?: string;
  stripe?: string;
}

export function createTextureTigerStripes(options: TextureTigerStripesOptions = {}): string {
  const { coat = '#d98a2e', stripe = '#1c130a' } = options;
  let seed = 463;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const bands: string[] = [];
  for (let i = -1; i < 13; i++) {
    let x0 = i * 30 + rnd() * 10;
    const pts: Array<[number, number]> = [];
    for (let y = -10; y <= 340; y += 45) {
      x0 += Math.sin(y * 0.03 + i * 2) * 10 + (rnd() - 0.5) * 6;
      pts.push([x0, y]);
    }
    const wTop = 4 + rnd() * 5;
    const wMid = 14 + rnd() * 12;
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1]}`;
    for (const [px, py] of pts.slice(1)) d += ` L${px.toFixed(1)},${py}`;
    for (let k = pts.length - 1; k >= 0; k--) {
      const [px, py] = pts[k];
      const t = Math.abs(k / (pts.length - 1) - 0.5);
      d += ` L${(px + (wTop + (wMid - wTop) * Math.sin(t * Math.PI))).toFixed(1)},${py}`;
    }
    bands.push(`<path d="${d}Z" fill="${stripe}" stroke="#000" stroke-width="0.6"/>`);
    bands.push(`<path d="${d}Z" fill="none" stroke="#c87f28" stroke-width="1.4" opacity="0.35" transform="translate(-2 0)"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="tgr-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e8a04a"/>
      <stop offset="1" stop-color="#b56a1e"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#tgr-g)"/>
  ${bands.join('\n  ')}
</svg>`;
}
