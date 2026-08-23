export interface VortexLinesOptions {
  size?: number;
  lines?: number;
  turns?: number;
  stroke?: string;
  accent?: string;
}

export function createVortexLines(options: VortexLinesOptions = {}): string {
  const { size = 720, lines = 22, turns = 2.4, stroke = '#27272a', accent = '#a78bfa' } = options;
  const c = size / 2;
  const paths: string[] = [];
  const steps = 90;

  for (let i = 0; i < lines; i++) {
    const offset = (i / lines) * Math.PI * 2;
    const pts: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const theta = offset + t * Math.PI * 2 * turns;
      const r = 12 + t * c * 0.94;
      pts.push(`${s === 0 ? 'M' : 'L'}${(c + Math.cos(theta) * r).toFixed(1)} ${(c + Math.sin(theta) * r).toFixed(1)}`);
    }
    const color = i % 5 === 0 ? accent : stroke;
    paths.push(`      <path d="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${i % 5 === 0 ? 2 : 1.2}" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g>
${paths.join('\n')}
    <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="-360 ${c} ${c}" dur="40s" repeatCount="indefinite" />
  </g>
</svg>`;
}
