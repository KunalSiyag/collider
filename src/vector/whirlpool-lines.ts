export interface WhirlpoolLinesOptions {
  size?: number;
  arms?: number;
  stroke?: string;
  accent?: string;
}

export function createWhirlpoolLines(options: WhirlpoolLinesOptions = {}): string {
  const { size = 720, arms = 16, stroke = '#3f3f46', accent = '#67e8f9' } = options;
  const c: [number, number] = [size * 0.5, size * 0.55];
  const steps = 70;
  const paths: string[] = [];

  for (let k = 0; k < arms; k++) {
    const phase = (k / arms) * Math.PI * 2;
    const pts: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const th = phase + t * Math.PI * 2.6;
      const r = c[0] * 0.95 * (1 - t) + 8;
      const x = c[0] + Math.cos(th) * r;
      const y = c[1] + Math.sin(th) * r * 0.62;
      pts.push(`${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    const color = k % 5 === 2 ? accent : stroke;
    paths.push(`      <path d="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${color === accent ? 1.8 : 1}" opacity="0.85">
        <animate attributeName="stroke-opacity" values="0.85;${color === accent ? '1' : '0.4'};0.85" dur="${(4 + k % 4).toFixed(1)}s" repeatCount="indefinite" />
      </path>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${paths.join('\n')}
  <ellipse cx="${c[0]}" cy="${c[1]}" rx="10" ry="6" fill="#0b0b10" stroke="${accent}" stroke-width="1.5">
    <animate attributeName="rx" values="10;14;10" dur="3s" repeatCount="indefinite" />
  </ellipse>
</svg>`;
}
