export interface PlumeSwirlOptions {
  size?: number;
  barbs?: number;
  stroke?: string;
  accent?: string;
}

export function createPlumeSwirl(options: PlumeSwirlOptions = {}): string {
  const { size = 720, barbs = 30, stroke = '#3f3f46', accent = '#a78bfa' } = options;
  const steps = 60;
  const paths: string[] = [];

  for (let b = 0; b < barbs; b++) {
    const t0 = b / barbs;
    const bx = size * (0.3 + t0 * 0.45) + Math.sin(t0 * 6) * 20;
    const by = size * 0.85 - t0 * size * 0.7;
    const len = size * 0.09 * Math.sin(Math.PI * t0 * 0.9 + 0.2);
    const dir = -Math.PI / 4;
    const ex = bx + Math.cos(dir) * len;
    const ey = by - Math.sin(dir) * len;
    paths.push(`      <path d="M${bx.toFixed(1)} ${by.toFixed(1)} Q${(bx + Math.cos(dir - 0.5) * len * 0.6).toFixed(1)} ${(by - Math.sin(dir - 0.5) * len * 0.6).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${b % 8 === 0 ? accent : stroke}" stroke-width="1.1" opacity="0.9" />`);
  }

  let spine = `M${size * 0.32} ${size * 0.86}`;
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const x = size * (0.3 + t * 0.45) + Math.sin(t * 6) * 20;
    const y = size * 0.85 - t * size * 0.7;
    spine += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${paths.join('\n')}
  <path d="${spine}" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linecap="round">
    <animate attributeName="stroke-opacity" values="1;0.55;1" dur="5s" repeatCount="indefinite" />
  </path>
</svg>`;
}
