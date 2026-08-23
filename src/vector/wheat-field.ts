export interface WheatFieldOptions {
  seed?: number;
  size?: number;
  stalks?: number;
  base?: string;
  accent?: string;
}

export function createWheatField(options: WheatFieldOptions = {}): string {
  const { seed = 58, size = 720, stalks = 26, base = '#3f3f46', accent = '#fbbf24' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < stalks; i++) {
    const x = (i / stalks) * size + (rnd() - 0.5) * 14;
    const h = size * (0.35 + rnd() * 0.3);
    const topY = size - h;
    const lean = (rnd() - 0.5) * 30;
    const color = rnd() > 0.82 ? accent : base;
    els.push(`      <path d="M${x.toFixed(1)} ${size} Q${x.toFixed(1)} ${(size - h * 0.6).toFixed(1)} ${(x + lean).toFixed(1)} ${topY.toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.4" />`);
    for (let g = 0; g < 5; g++) {
      const gy = topY + g * 9;
      const gx = x + lean * ((g / 5));
      els.push(`      <ellipse cx="${(gx - 4).toFixed(1)}" cy="${gy.toFixed(1)}" rx="2.4" ry="5.5" fill="${color}" opacity="0.85" transform="rotate(-28 ${(gx - 4).toFixed(1)} ${gy.toFixed(1)})" />`);
      els.push(`      <ellipse cx="${(gx + 4).toFixed(1)}" cy="${gy.toFixed(1)}" rx="2.4" ry="5.5" fill="${color}" opacity="0.85" transform="rotate(28 ${(gx + 4).toFixed(1)} ${gy.toFixed(1)})" />`);
    }
  }

  return `<svg viewBox="0 0 720 720" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="720" height="720" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
