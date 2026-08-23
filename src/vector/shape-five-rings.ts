export interface ShapeFiveRingsOptions {
  colors?: string[];
  size?: number;
}

export function createShapeFiveRings(options: ShapeFiveRingsOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#67e8f9', '#a78bfa'], size = 320 } = options;
  const rings: [number, number, number, string][] = [
    [80, 120, 44, colors[0]!],
    [160, 120, 44, colors[1]!],
    [240, 120, 44, colors[2]!],
    [120, 190, 44, colors[3]!],
    [200, 190, 44, colors[4]!],
  ];

  const parts = rings
    .map(
      ([cx, cy, r, color], i) => `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="9">
    <animate attributeName="cy" values="${cy};${cy - (i % 2 === 0 ? 6 : 4)};${cy}" dur="${(3.5 + i * 0.5).toFixed(1)}s" repeatCount="indefinite" />
    <animate attributeName="stroke-opacity" values="1;0.55;1" dur="${(4 + i * 0.4).toFixed(1)}s" repeatCount="indefinite" />
  </circle>`,
    )
    .join('\n');

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${parts}
</svg>`;
}
