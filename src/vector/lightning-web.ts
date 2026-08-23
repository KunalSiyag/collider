export interface LightningWebOptions {
  seed?: number;
  size?: number;
  bolts?: number;
  stroke?: string;
  accent?: string;
}

export function createLightningWeb(options: LightningWebOptions = {}): string {
  const { seed = 88, size = 720, bolts = 7, stroke = '#3f3f46', accent = '#fbbf24' } = options;

  let t = seed >>> 0;
  const rand = () => {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const paths: string[] = [];
  for (let b = 0; b < bolts; b++) {
    let x = size * (0.15 + rand() * 0.7);
    let y = size * 0.06;
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
    const endY = size * (0.62 + rand() * 0.3);
    while (y < endY) {
      x += (rand() - 0.5) * size * 0.09;
      y += size * (0.03 + rand() * 0.05);
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
      if (rand() > 0.72 && y < endY * 0.8) {
        let bx = x, by = y;
        const branchEnd = Math.min(y + size * (0.08 + rand() * 0.12), endY);
        let bd = `M${bx.toFixed(1)} ${by.toFixed(1)}`;
        while (by < branchEnd) {
          bx += (rand() > 0.5 ? 1 : -1) * size * (0.02 + rand() * 0.05);
          by += size * 0.04;
          bd += ` L${bx.toFixed(1)} ${by.toFixed(1)}`;
        }
        paths.push(`      <path d="${bd}" fill="none" stroke="${stroke}" stroke-width="1" opacity="0.7">`);
        paths.push(`        <animate attributeName="opacity" values="0;0.9;0" dur="5s" begin="${(rand() * 4).toFixed(1)}s" repeatCount="indefinite" />`);
        paths.push(`      </path>`);
      }
    }
    const main = b === 0;
    paths.push(`      <path d="${d}" fill="none" stroke="${main ? accent : stroke}" stroke-width="${main ? 2.4 : 1.3}" stroke-linejoin="round"${main ? '' : ' opacity="0.8"'}>`);
    if (main) {
      paths.push(`        <animate attributeName="opacity" values="0.25;1;0.25" dur="3.2s" repeatCount="indefinite" />`);
    }
    paths.push(`      </path>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${paths.join('\n')}
</svg>`;
}
