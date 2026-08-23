export interface WaveLinesOptions {
  color?: string;
  lines?: number;
  width?: number;
  height?: number;
}

export function createWaveLines(options: WaveLinesOptions = {}): string {
  const { color = '#8b5cf6', lines = 12, width = 1200, height = 600 } = options;
  const paths: string[] = [];
  const gap = height / (lines + 1);

  for (let i = 0; i < lines; i++) {
    const baseY = gap * (i + 1);
    const amplitude = 14 + (i % 3) * 8;
    const wavelength = 150 + i * 30;
    const points: string[] = [];

    for (let x = -wavelength; x <= width + wavelength; x += 20) {
      const y = baseY + Math.sin((x / wavelength) * Math.PI * 2 + i) * amplitude;
      points.push(`L ${x.toFixed(0)} ${y.toFixed(1)}`);
    }

    paths.push(
      `    <path d="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2" opacity="${(0.25 + ((i % 4) / 4) * 0.5).toFixed(2)}">
      <animateTransform attributeName="transform" type="translate" values="0 0; ${wavelength.toFixed(0)} 0; 0 0" dur="${(9 + i).toFixed(0)}s" repeatCount="indefinite" />
    </path>`,
    );
  }

  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${paths.join('\n')}
</svg>`;
}
