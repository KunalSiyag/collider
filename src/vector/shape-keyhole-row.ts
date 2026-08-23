export interface ShapeKeyholeRowOptions {
  colors?: string[];
  size?: number;
}

export function createShapeKeyholeRow(options: ShapeKeyholeRowOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'], size = 320 } = options;
  const keys: string[] = [];

  for (let i = 0; i < 4; i++) {
    const x = 55 + i * 70;
    const flip = i % 2 === 0 ? 1 : -1;
    keys.push(
      `  <g transform="translate(${x} 160) scale(${flip} 1) translate(${-x} -160)">
    <circle cx="${x}" cy="128" r="30" fill="${colors[i]}" />
    <polygon points="${x - 16},${146} ${x + 16},${146} ${x + 24},${236} ${x - 24},${236}" fill="${colors[i]}" />
    <circle cx="${x}" cy="128" r="11" fill="#0b0b10"><animate attributeName="r" values="11;15;11" dur="${(3 + i * 0.6).toFixed(1)}s" repeatCount="indefinite" /></circle>
  </g>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${keys.join('\n')}
<rect x="20" y="252" width="280" height="10" rx="5" fill="#3f3f46" />
</svg>`;
}
