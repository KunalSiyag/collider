export interface MagneticFieldOptions {
  size?: number;
  linesPerPole?: number;
  stroke?: string;
  accent?: string;
}

export function createMagneticField(options: MagneticFieldOptions = {}): string {
  const { size = 720, linesPerPole = 9, stroke = '#3f3f46', accent = '#8b5cf6' } = options;
  const p1: [number, number] = [size * 0.32, size / 2];
  const p2: [number, number] = [size * 0.68, size / 2];
  const els: string[] = [];

  for (let k = -linesPerPole; k <= linesPerPole; k++) {
    if (k === 0) continue;
    const spread = (k / linesPerPole) * size * 0.34;
    const mx = (p1[0] + p2[0]) / 2;
    const my = (p1[1] + p2[1]) / 2 + Math.sign(k) * spread * 1.4;
    const steps = 60;
    const pts: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const x = p1[0] + (p2[0] - p1[0]) * t;
      const bulge = Math.sin(t * Math.PI) * spread;
      const y = p1[1] + Math.sign(k) * Math.abs(bulge) + (my - p1[1]) * Math.sin(t * Math.PI) * 0.25;
      pts.push(`${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    const color = Math.abs(k) % 4 === 0 ? accent : stroke;
    els.push(`      <path d="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${color === accent ? 1.6 : 1}" opacity="0.8">
        <animate attributeName="stroke-opacity" values="0.8;0.3;0.8" dur="${(4 + Math.abs(k) % 5).toFixed(1)}s" repeatCount="indefinite" />
      </path>`);
  }
  for (const [px, py] of [p1, p2]) {
    els.push(`      <circle cx="${px}" cy="${py}" r="14" fill="#18181b" stroke="#52525b" stroke-width="2" />`);
    els.push(`      <circle cx="${px}" cy="${py}" r="5" fill="${accent}">
        <animate attributeName="r" values="4;7;4" dur="3s" repeatCount="indefinite" />
      </circle>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
