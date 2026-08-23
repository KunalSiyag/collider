export interface SmokeCurlOptions {
  size?: number;
  wisps?: number;
  stroke?: string;
  accent?: string;
}

export function createSmokeCurl(options: SmokeCurlOptions = {}): string {
  const { size = 720, wisps = 8, stroke = '#3f3f46', accent = '#a78bfa' } = options;
  const baseX = size / 2;
  const paths: string[] = [];
  const steps = 48;

  for (let w = 0; w < wisps; w++) {
    const phase = w * 0.8;
    const amp = 14 + w * 6;
    const pts: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const y = size * 0.94 - t * size * 0.84;
      const sway = Math.sin(t * Math.PI * 2.2 + phase) * amp * t;
      const x = baseX + sway + (w - wisps / 2) * 3;
      pts.push(`${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    const color = w === wisps - 1 ? accent : stroke;
    paths.push(`    <path d="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${w === wisps - 1 ? 1.8 : 1.2}" opacity="${(0.35 + (w / wisps) * 0.5).toFixed(2)}">`);
    if (w % 3 === 0) {
      paths.push(`      <animate attributeName="opacity" values="0.2;0.75;0.2" dur="${(6 + w).toFixed(1)}s" repeatCount="indefinite" />`);
    }
    paths.push(`    </path>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${paths.join('\n')}
  <line x1="${baseX - 60}" y1="${size * 0.95}" x2="${baseX + 60}" y2="${size * 0.95}" stroke="#27272a" stroke-width="3" />
</svg>`;
}
