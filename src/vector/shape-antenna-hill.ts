export interface ShapeAntennaHillOptions {
  colors?: string[];
  size?: number;
}

export function createShapeAntennaHill(options: ShapeAntennaHillOptions = {}): string {
  const { colors = ['#22d3ee', '#8b5cf6'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<path d="M 0 300 Q 90 210 170 268 Q 240 310 320 260 L 320 320 L 0 320 Z" fill="#18181b" stroke="#27272a" stroke-width="2" />
<line x1="150" y1="252" x2="150" y2="110" stroke="${colors[1]}" stroke-width="6" stroke-linecap="round" />
<line x1="136" y1="140" x2="164" y2="120" stroke="${colors[1]}" stroke-width="4" />
<circle cx="150" cy="104" r="9" fill="${colors[0]}">
  <animate attributeName="r" values="9;13;9" dur="1.8s" repeatCount="indefinite" />
</circle>
${[0, 1, 2]
  .map(
    (i) =>
      `<path d="M ${118 - i * 18} ${86 - i * 20} A 46 46 0 0 1 ${182 + i * 18} ${86 - i * 20}" fill="none" stroke="${colors[0]}" stroke-width="3.5" opacity="${(0.7 - i * 0.2).toFixed(2)}"><animate attributeName="opacity" values="${(0.7 - i * 0.2).toFixed(2)};0.05;${(0.7 - i * 0.2).toFixed(2)}" dur="2.4s" begin="${(i * 0.35).toFixed(2)}s" repeatCount="indefinite" /></path>`,
  )
  .join('\n')}
</svg>`;
}
