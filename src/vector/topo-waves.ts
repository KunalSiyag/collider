export interface TopoWavesOptions {
  stroke?: string;
  accent?: string;
  lines?: number;
  width?: number;
  height?: number;
}

function bump(x: number, center: number, spread: number): number {
  const d = (x - center) / spread;
  return Math.exp(-d * d);
}

export function createTopoWaves(options: TopoWavesOptions = {}): string {
  const {
    stroke = '#3f3f46',
    accent = '#22d3ee',
    lines = 34,
    width = 1200,
    height = 600,
  } = options;

  const paths: string[] = [];
  const rowGap = height / (lines + 4);

  for (let i = 0; i < lines; i++) {
    const y = rowGap * (i + 2);
    const points: string[] = [];
    for (let x = 0; x <= width; x += 12) {
      const envelope =
        bump(x, width * 0.32, 150) * 90 +
        bump(x, width * 0.62, 190) * 130 +
        bump(x, width * 0.82, 90) * 55;
      const ridge = Math.sin(i * 0.7 + x * 0.008) * 12 * envelope * 0.02;
      const displacement = -envelope * Math.max(0, Math.sin(i * 1.9)) + ridge;
      const py = y + displacement;
      points.push(`${points.length === 0 ? 'M' : 'L'}${x} ${py.toFixed(1)}`);
    }
    const isAccentLine = i === Math.floor(lines / 2);
    paths.push(
      `    <path d="${points.join(' ')}" fill="none" stroke="${isAccentLine ? accent : stroke}" stroke-width="${isAccentLine ? 2 : 1.25}" ${isAccentLine ? 'opacity="0.9"' : ''} />`,
    );
  }

  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${paths.join('\n')}
</svg>`;
}
