export interface OceanSwellsOptions {
  size?: number;
  rows?: number;
  stroke?: string;
  accent?: string;
}

export function createOceanSwells(options: OceanSwellsOptions = {}): string {
  const { size = 720, rows = 13, stroke = '#3f3f46', accent = '#67e8f9' } = options;
  const paths: string[] = [];
  const steps = 60;

  for (let r = 0; r < rows; r++) {
    const yBase = size * 0.14 + r * ((size * 0.78) / rows);
    const amp = 10 + r * 3;
    const phase = r * 0.9;
    const pts: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const x = (s / steps) * size;
      const y = yBase + Math.sin((s / steps) * Math.PI * 3 + phase) * amp;
      pts.push(`${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    const color = r === 5 ? accent : stroke;
    paths.push(`    <path d="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${r === 5 ? 2 : 1.3}">`);
    paths.push(`      <animateTransform attributeName="transform" type="translate" values="-20 0; 20 0; -20 0" dur="${(6 + r).toFixed(1)}s" repeatCount="indefinite" />`);
    paths.push(`    </path>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g>
${paths.join('\n')}
  </g>
</svg>`;
}
