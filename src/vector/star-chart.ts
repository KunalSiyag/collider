export interface StarChartOptions {
  seed?: number;
  size?: number;
  stars?: number;
  stroke?: string;
  accent?: string;
}

export function createStarChart(options: StarChartOptions = {}): string {
  const { seed = 12, size = 720, stars = 34, stroke = '#3f3f46', accent = '#fbbf24' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const pts: [number, number][] = [];
  for (let i = 0; i < stars; i++) {
    pts.push([size * 0.1 + rnd() * size * 0.8, size * 0.1 + rnd() * size * 0.8]);
  }
  const els: string[] = [];
  pts.forEach(([x, y], i) => {
    const big = i % 7 === 3;
    if (big) {
      els.push(`      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${accent}">
        <animate attributeName="opacity" values="1;0.4;1" dur="${(3 + i * 0.2).toFixed(1)}s" repeatCount="indefinite" />
      </circle>`);
    } else {
      els.push(`      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="#d4d4d8" />`);
    }
  });
  for (let i = 0; i < stars - 1; i++) {
    if ((i * 5 + 2) % 3 === 0) continue;
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    els.push(`      <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${stroke}" stroke-width="0.7" opacity="0.6" />`);
  }
  els.push(`      <circle cx="${pts[0][0].toFixed(1)}" cy="${pts[0][1].toFixed(1)}" r="10" fill="none" stroke="${accent}" stroke-width="1.2">
        <animate attributeName="r" values="9;13;9" dur="3s" repeatCount="indefinite" />
      </circle>`);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
