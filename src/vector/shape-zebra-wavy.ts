export interface ShapeZebraWavyOptions {
  colors?: string[];
  size?: number;
}

export function createShapeZebraWavy(options: ShapeZebraWavyOptions = {}): string {
  const { colors = ['#0b0b10', '#fafafa'], size = 320 } = options;
  const bands: string[] = [];

  for (let i = 0; i < 7; i++) {
    const baseX = i * 48 - 20;
    bands.push(
      `  <path d="M ${baseX} -10 Q ${baseX + 24} 160 ${baseX} 330 Q ${baseX + 12} 340 ${baseX + 18} 330 Q ${baseX + 42} 160 ${baseX + 18} -10 Z" fill="${colors[0]}">
    <animateTransform attributeName="transform" type="translate" values="-8 0;8 0;-8 0" dur="${(4 + i * 0.4).toFixed(1)}s" repeatCount="indefinite" />
  </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="${colors[1]}" />
${bands.join('\n')}
</svg>`;
}
