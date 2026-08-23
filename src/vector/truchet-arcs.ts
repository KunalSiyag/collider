export interface TruchetArcsOptions {
  seed?: number;
  size?: number;
  cells?: number;
  stroke?: string;
  accent?: string;
}

export function createTruchetArcs(options: TruchetArcsOptions = {}): string {
  const { seed = 5, size = 720, cells = 9, stroke = '#3f3f46', accent = '#22d3ee' } = options;

  let t = seed >>> 0;
  const rand = () => {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const step = size / cells;
  const r = step / 2;
  const paths: string[] = [];
  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      const x = col * step;
      const y = row * step;
      const flip = rand() > 0.5;
      const color = rand() > 0.88 ? accent : stroke;
      const sw = color === accent ? 2.4 : 1.4;
      if (!flip) {
        paths.push(`      <path d="M${(x + r).toFixed(1)} ${y.toFixed(1)} A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${x.toFixed(1)} ${(y + r).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${sw}" />`);
        paths.push(`      <path d="M${(x + r).toFixed(1)} ${(y + step).toFixed(1)} A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${(x + step).toFixed(1)} ${(y + r).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${sw}" />`);
      } else {
        paths.push(`      <path d="M${x.toFixed(1)} ${(y + r).toFixed(1)} A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${(x + r).toFixed(1)} ${(y + step).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${sw}" />`);
        paths.push(`      <path d="M${(x + r).toFixed(1)} ${y.toFixed(1)} A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${(x + step).toFixed(1)} ${(y + r).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${sw}" />`);
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g>
${paths.join('\n')}
  </g>
</svg>`;
}
