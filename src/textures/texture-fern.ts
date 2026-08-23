export interface TextureFernOptions {
  base?: string;
  frond?: string;
}

export function createTextureFern(options: TextureFernOptions = {}): string {
  const { base = '#14231a', frond = '#4a8a52' } = options;
  let seed = 353;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const fronds: string[] = [];
  for (let i = 0; i < 14; i++) {
    const x0 = rnd() * 320;
    const y0 = rnd() * 320;
    const rot = rnd() * Math.PI * 2;
    const len = 70 + rnd() * 90;
    let d = `M${x0.toFixed(1)},${y0.toFixed(1)} `;
    for (let t = 1; t <= 6; t++) {
      const x = x0 + Math.cos(rot) * len * (t / 6);
      const y = y0 + Math.sin(rot) * len * (t / 6) + Math.sin(t * 1.2 + i) * 5;
      d += `L${x.toFixed(1)},${y.toFixed(1)} `;
    }
    fronds.push(`<path d="${d}" stroke="#2c5233" stroke-width="3" fill="none"/>`);
    const segs = 9;
    for (let s = 1; s <= segs; s++) {
      const px = x0 + Math.cos(rot) * len * (s / segs);
      const py = y0 + Math.sin(rot) * len * (s / segs) + Math.sin(s * 1.2 + i) * 5;
      const ll = 16 * (1 - s / (segs + 4));
      fronds.push(`<ellipse cx="${(px - Math.sin(rot) * ll).toFixed(1)}" cy="${(py + Math.cos(rot) * ll).toFixed(1)}" rx="${ll.toFixed(1)}" ry="${(ll * 0.42).toFixed(1)}" transform="rotate(${((rot * 180) / Math.PI + 45).toFixed(0)} ${(px - Math.sin(rot) * ll).toFixed(1)} ${(py + Math.cos(rot) * ll).toFixed(1)})" fill="${rnd() < 0.5 ? frond : '#5da367'}" opacity="0.85"/>`);
      fronds.push(`<ellipse cx="${(px + Math.sin(rot) * ll).toFixed(1)}" cy="${(py - Math.cos(rot) * ll).toFixed(1)}" rx="${ll.toFixed(1)}" ry="${(ll * 0.42).toFixed(1)}" transform="rotate(${((rot * 180) / Math.PI - 45).toFixed(0)} ${(px + Math.sin(rot) * ll).toFixed(1)} ${(py - Math.cos(rot) * ll).toFixed(1)})" fill="#417f4b" opacity="0.85"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${fronds.join('\n  ')}
</svg>`;
}
