export interface ShapeDunesOptions {
  colors?: string[];
  size?: number;
}

export function createShapeDunes(options: ShapeDunesOptions = {}): string {
  const { colors = ['#fbbf24', '#f59e0b', '#d97706'], size = 700 } = options;
  const bands: string[] = [];

  colors.forEach((color, i) => {
    const baseY = size * (0.42 + i * 0.17);
    const d = `M0 ${baseY.toFixed(0)} C ${size * 0.28} ${(baseY - size * (0.09 - i * 0.02)).toFixed(0)}, ${size * 0.52} ${(baseY + size * 0.05).toFixed(0)}, ${mid(size)} ${(baseY + size * 0.01).toFixed(0)} S ${size * 0.85} ${(baseY + size * 0.06).toFixed(0)}, ${size} ${(baseY - size * 0.04).toFixed(0)} L ${size} ${size} L 0 ${size} Z`;

    bands.push(`  <path d="${d}" fill="${color}" opacity="${(0.9 - i * 0.12).toFixed(2)}">
    <animateTransform attributeName="translate" type="translate" values="0 0; ${i % 2 ? 8 : -8} ${i % 2 ? -3 : 3}; 0 0" dur="${(7 + i * 2).toFixed(0)}s" repeatCount="indefinite"/>
  </path>`);
  });

  function mid(s: number): number {
    return s / 2;
  }

  return `<svg viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${bands.join('\n')}
</svg>`;
}
