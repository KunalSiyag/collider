export interface BathymetryMapOptions {
  size?: number;
  rings?: number;
  stroke?: string;
  accent?: string;
}

export function createBathymetryMap(options: BathymetryMapOptions = {}): string {
  const { size = 720, rings = 12, stroke = '#3f3f46', accent = '#22d3ee' } = options;
  const cx = size * 0.42;
  const cy = size * 0.5;
  const paths: string[] = [];
  const steps = 80;

  for (let i = 1; i <= rings; i++) {
    const base = i * (size * 0.42) / rings;
    const phase = i * 0.7;
    let d = '';
    for (let s = 0; s <= steps; s++) {
      const th = (s / steps) * Math.PI * 2;
      const wobble =
        Math.sin(th * 3 + phase) * (6 + i * 1.4) +
        Math.sin(th * 7 - phase * 1.3) * (3 + i * 0.8);
      const r = base + wobble;
      const x = cx + Math.cos(th) * r;
      const y = cy + Math.sin(th) * r * 0.82;
      d += `${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    const color = i === rings - 3 ? accent : stroke;
    paths.push(`      <path d="${d} Z" fill="none" stroke="${color}" stroke-width="${i === rings - 3 ? 1.8 : 1}" opacity="${0.5 + (i / rings) * 0.5}">
        <animate attributeName="opacity" values="0.45;0.9;0.45" dur="${(5 + i * 0.4).toFixed(1)}s" repeatCount="indefinite" />
      </path>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${paths.join('\n')}
</svg>`;
}
