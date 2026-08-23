export interface ShapeZipperTeethOptions {
  colors?: string[];
  size?: number;
}

export function createShapeZipperTeeth(options: ShapeZipperTeethOptions = {}): string {
  const { colors = ['#8b5cf6', '#67e8f9'], size = 320 } = options;
  const teeth: string[] = [];

  for (let i = 0; i < 9; i++) {
    const x = 34 + i * 28;
    const topFill = i % 2 === 0 ? colors[0] : colors[1];
    const botFill = i % 2 === 0 ? colors[1] : colors[0];
    teeth.push(
      `  <polygon points="${x},128 ${x + 20},128 ${x + 24},${146} ${x - 4},${146}" fill="${topFill}"><animate attributeName="opacity" values="1;0.55;1" dur="${(2 + i * 0.15).toFixed(2)}s" begin="${(i * 0.12).toFixed(2)}s" repeatCount="indefinite" /></polygon>
  <polygon points="${x},192 ${x + 20},192 ${x + 24},${174} ${x - 4},${174}" fill="${botFill}" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<line x1="20" y1="160" x2="300" y2="160" stroke="#27272a" stroke-width="4" stroke-dasharray="6 6">
  <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.5s" repeatCount="indefinite" />
</line>
${teeth.join('\n')}
<g>
  <animate attributeName="transform" type="translate" values="0 0;120 0;0 0" dur="6s" repeatCount="indefinite" />
  <rect x="236" y="140" width="26" height="40" rx="6" fill="#fafafa" />
  <circle cx="249" cy="190" r="10" fill="none" stroke="#fafafa" stroke-width="5" />
</g>
</svg>`;
}
