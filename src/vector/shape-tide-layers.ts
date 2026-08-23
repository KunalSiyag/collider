export interface ShapeTideLayersOptions {
  colors?: string[];
  size?: number;
}

export function createShapeTideLayers(options: ShapeTideLayersOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320 } = options;
  const bands: string[] = [];

  for (let k = 0; k < 3; k++) {
    const baseY = 120 + k * 55;
    let d = `M -40 ${baseY}`;
    for (let x = -40; x <= size + 40; x += 20) {
      d += ` Q ${x + 10} ${(baseY + Math.sin(x * 0.05 + k) * 18).toFixed(1)} ${x + 20} ${(baseY + Math.sin((x + 20) * 0.05 + k) * 18).toFixed(1)}`;
    }
    d += ` L ${size + 40} ${size + 40} L -40 ${size + 40} Z`;
    bands.push(
      `  <path d="${d}" fill="${colors[k]}" opacity="0.85"><animateTransform attributeName="transform" type="translate" values="-24 0;24 0;-24 0" dur="${(7 + k * 2).toFixed(0)}s" repeatCount="indefinite" /></path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${bands.join('\n')}
</svg>`;
}
