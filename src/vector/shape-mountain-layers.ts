export interface ShapeMountainLayersOptions {
  colors?: string[];
  size?: number;
}

export function createShapeMountainLayers(options: ShapeMountainLayersOptions = {}): string {
  const { colors = ['#8b5cf6', '#a78bfa', '#67e8f9', '#22d3ee'], size = 320 } = options;
  const ridges = [
    'M0 210 L60 150 L110 200 L170 120 L230 190 L280 140 L320 180 L320 320 L0 320 Z',
    'M0 250 L50 205 L120 255 L190 185 L260 245 L320 215 L320 320 L0 320 Z',
    'M0 285 L80 240 L160 290 L240 235 L320 275 L320 320 L0 320 Z',
  ];
  const layers: string[] = [
    `  <circle cx="236" cy="76" r="26" fill="#f472b6"><animate attributeName="cy" values="76;68;76" dur="7s" repeatCount="indefinite" /></circle>`,
  ];

  for (let i = 0; i < ridges.length; i++) {
    layers.push(
      `  <path d="${ridges[i]}" fill="${colors[i]}" opacity="${(0.85 - i * 0.12).toFixed(2)}"><animateTransform attributeName="transform" type="translate" values="0 0;${i % 2 === 0 ? 8 : -8} 0;0 0" dur="${(8 + i * 3).toFixed(0)}s" repeatCount="indefinite" /></path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${layers.join('\n')}
</svg>`;
}
