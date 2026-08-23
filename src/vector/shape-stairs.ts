export interface ShapeStairsOptions {
  colors?: string[];
  steps?: number;
}

export function createShapeStairs(options: ShapeStairsOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], steps = 7 } = options;
  const size = 480;
  const stepW = size / steps;
  const stepH = (size * 0.78) / steps;
  const rects: string[] = [];
  for (let i = 0; i < steps; i++) {
    const color = colors[i % colors.length]!;
    rects.push(
      `<rect x="${(i * stepW).toFixed(1)}" y="${(size - (i + 1) * stepH).toFixed(1)}" width="${stepW.toFixed(1)}" height="${((i + 1) * stepH).toFixed(1)}" fill="${color}" opacity="${(0.5 + (i % 3) * 0.2).toFixed(2)}"/>`,
    );
    rects.push(
      `<rect x="${(i * stepW).toFixed(1)}" y="${(size - (i + 1) * stepH).toFixed(1)}" width="${stepW.toFixed(1)}" height="${stepH.toFixed(1)}" fill="#09090b" opacity="0.25"/>`,
    );
  }
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0f0f13"/>
${rects.join('\n')}
</svg>`;
}
