export interface ShapeWavesOptions {
  colors?: string[];
  size?: number;
}

export function createShapeWaves(options: ShapeWavesOptions = {}): string {
  const { colors = ['#8b5cf6', '#7c3aed', '#6d28d9'], size = 800 } = options;
  const midX = size / 2;
  const bands: string[] = [];

  colors.forEach((color, i) => {
    const baseY = size * (0.55 + i * 0.14);
    const amplitude = 40 - i * 8;
    const d = [
      `M 0 ${baseY.toFixed(0)}`,
      `C ${(size * 0.25).toFixed(0)} ${(baseY - amplitude).toFixed(0)}, ${(size * 0.45).toFixed(0)} ${(baseY + amplitude).toFixed(0)}, ${midX.toFixed(0)} ${(baseY - 6 + i * 4).toFixed(0)}`,
      `S ${(size * 0.82).toFixed(0)} ${(baseY + amplitude - 10).toFixed(0)}, ${size} ${(baseY + i * 6).toFixed(0)}`,
      `L ${size} ${size} L 0 ${size} Z`,
    ].join(' ');
    bands.push(`  <path d="${d}" fill="${color}" opacity="${(0.85 - i * 0.18).toFixed(2)}" />`);
  });

  return `<svg viewBox="0 0 ${size} ${size}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${bands.join('\n')}
</svg>`;
}
