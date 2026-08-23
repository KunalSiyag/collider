export interface ShapeFlowRibbonsOptions {
  colors?: string[];
  size?: number;
}

export function createShapeFlowRibbons(options: ShapeFlowRibbonsOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320 } = options;
  const ribbons: string[] = [];

  for (let k = 0; k < 3; k++) {
    const y0 = 80 + k * 80;
    const path = `M -20 ${y0} C 70 ${y0 - 55}, 130 ${y0 + 55}, 200 ${y0} S 300 ${y0 - 45}, 340 ${y0}`;
    ribbons.push(
      `  <path d="${path}" fill="none" stroke="${colors[k]}" stroke-width="${16 - k * 3}" stroke-linecap="round" opacity="0.9">
    <animate attributeName="stroke-dasharray" values="60 24;24 60;60 24" dur="${(5 + k * 2).toFixed(0)}s" repeatCount="indefinite" />
    <animate attributeName="stroke-dashoffset" from="0" to="-168" dur="${(5 + k * 2).toFixed(0)}s" repeatCount="indefinite" />
  </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${ribbons.join('\n')}
</svg>`;
}
