export interface ShapePillarBarsOptions {
  colors?: string[];
  size?: number;
}

export function createShapePillarBars(options: ShapePillarBarsOptions = {}): string {
  const { colors = ['#8b5cf6', '#a78bfa', '#67e8f9'], size = 320 } = options;
  const bars: string[] = [];
  const heights = [70, 110, 150, 190, 150, 110, 70];

  heights.forEach((h, i) => {
    const x = 34 + i * 38;
    const color = colors[i % colors.length]!;
    bars.push(
      `  <rect x="${x}" y="${(290 - h).toFixed(0)}" width="26" height="${h}" rx="13" fill="${color}" opacity="0.9">
    <animate attributeName="height" values="${h};${Math.round(h * 0.75)};${h}" dur="${(3 + i * 0.35).toFixed(2)}s" begin="${(i * 0.15).toFixed(2)}s" repeatCount="indefinite" />
    <animate attributeName="y" values="${(290 - h).toFixed(0)};${Math.round(290 - h * 0.75)};${(290 - h).toFixed(0)}" dur="${(3 + i * 0.35).toFixed(2)}s" begin="${(i * 0.15).toFixed(2)}s" repeatCount="indefinite" />
  </rect>`,
    );
  });

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${bars.join('\n')}
</svg>`;
}
