export interface TwistSpiralOptions {
  size?: number;
  strands?: number;
  stroke?: string;
  accent?: string;
}

export function createTwistSpiral(options: TwistSpiralOptions = {}): string {
  const { size = 720, strands = 40, stroke = '#3f3f46', accent = '#67e8f9' } = options;
  const c = size / 2;
  const steps = 70;
  const paths: string[] = [];

  for (let k = 0; k < strands; k++) {
    const phase = (k / strands) * Math.PI * 2;
    const pts: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const th = t * Math.PI * 4 + phase;
      const r = t * c * 0.95;
      const twist = Math.sin(th * 2) * t * c * 0.06;
      const x = c + Math.cos(th) * (r + twist);
      const y = c + Math.sin(th) * (r - twist);
      pts.push(`${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    const color = k % 8 === 0 ? accent : stroke;
    paths.push(`      <path d="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${color === accent ? 1.8 : 0.9}" opacity="0.9"${k === 0 ? '' : ''} />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${paths.join('\n')}
</svg>`;
}
