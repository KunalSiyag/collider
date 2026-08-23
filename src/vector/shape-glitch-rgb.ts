export interface ShapeGlitchRgbOptions {
  colors?: string[];
  size?: number;
}

export function createShapeGlitchRgb(options: ShapeGlitchRgbOptions = {}): string {
  const { colors = ['#22d3ee', '#f472b6', '#fafafa'], size = 320 } = options;
  const slices: [number, number, number][] = [
    [40, 40, -14],
    [90, 34, 12],
    [140, 52, -8],
    [200, 30, 16],
    [240, 44, -18],
  ];

  const bars = slices
    .map(
      ([y, h, dx], i) => `<g>
    <animate attributeName="transform" type="translate" values="${dx} 0;${-dx} 0;${dx} 0" dur="${(1.2 + i * 0.35).toFixed(2)}s" repeatCount="indefinite" />
    <rect x="${60 + dx}" y="${y}" width="200" height="${h}" fill="${colors[i % colors.length]}" opacity="0.75" />
    <rect x="${60 - dx}" y="${y}" width="90" height="${h / 2}" fill="#0b0b10" opacity="0.6" />
  </g>`,
    )
    .join('\n');

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<circle cx="160" cy="160" r="70" fill="#18181b" stroke="#3f3f46" stroke-width="2" />
${bars}
</svg>`;
}
