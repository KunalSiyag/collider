export interface ShapeDominoRowOptions {
  colors?: string[];
  size?: number;
}

export function createShapeDominoRow(options: ShapeDominoRowOptions = {}): string {
  const { colors = ['#fafafa', '#8b5cf6'], size = 320 } = options;
  const dominoes: string[] = [];

  for (let i = 0; i < 6; i++) {
    const x = 40 + i * 44;
    const tilt = -(i + 1) * 7;
    dominoes.push(
      `  <g transform="rotate(${tilt} ${x} 250)">
    <rect x="${x}" y="150" width="30" height="100" rx="5" fill="${colors[0]}" stroke="#27272a" stroke-width="2" />
    <circle cx="${x + 15}" cy="${170 + (i % 3) * 22}" r="4" fill="${colors[1]}" />
    <circle cx="${x + 15}" cy="${222 - ((i + 1) % 3) * 18}" r="4" fill="${colors[1]}"><animate attributeName="opacity" values="1;0.3;1" dur="${(2.5 + i * 0.3).toFixed(1)}s" repeatCount="indefinite" /></circle>
  </g>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${dominoes.join('\n')}
<line x1="20" y1="252" x2="300" y2="252" stroke="#3f3f46" stroke-width="3" />
</svg>`;
}
