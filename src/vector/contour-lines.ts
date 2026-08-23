export interface ContourLinesOptions {
  stroke?: string;
  lines?: number;
  size?: number;
}

export function createContourLines(options: ContourLinesOptions = {}): string {
  const { stroke = '#3f3f46', lines = 14, size = 800 } = options;
  const center = size / 2;
  const paths: string[] = [];

  for (let i = 0; i < lines; i++) {
    const base = 30 + i * (center * 0.92) / lines;
    const phase = i * 0.55;
    const points: string[] = [];
    const steps = 72;
    for (let s = 0; s <= steps; s++) {
      const theta = (s / steps) * Math.PI * 2;
      const wobble =
        Math.sin(theta * 3 + phase) * 10 +
        Math.sin(theta * 5 - phase * 1.7) * 6 +
        Math.sin(theta * 8 + phase * 0.6) * 4;
      const r = base + wobble;
      const x = center + Math.cos(theta) * r;
      const y = center + Math.sin(theta) * r;
      points.push(`${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    paths.push(`    <path d="${points.join(' ')} Z" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="none" stroke="${stroke}" stroke-width="1.25">
${paths.join('\n')}
  </g>
</svg>`;
}
