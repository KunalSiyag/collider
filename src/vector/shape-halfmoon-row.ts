export interface ShapeHalfmoonRowOptions {
  colors?: string[];
  size?: number;
  count?: number;
}

export function createShapeHalfmoonRow(options: ShapeHalfmoonRowOptions = {}): string {
  const { colors = ['#f472b6', '#22d3ee', '#a78bfa'], size = 320, count = 5 } = options;
  const w = size / count;
  const moons: string[] = [];

  for (let i = 0; i < count; i++) {
    const up = i % 2 === 0;
    const y = up ? size / 2 : size / 2;
    const sweep = up ? 1 : 0;
    moons.push(
      `  <path d="M ${i * w} ${y} A ${w / 2} ${w / 2} 0 0 ${sweep} ${i * w + w} ${y} Z" fill="${colors[i % colors.length]}">
    <animate attributeName="transform" type="translate" values="0 0;0 ${up ? -12 : 12};0 0" dur="${(2.5 + i * 0.4).toFixed(1)}s" repeatCount="indefinite" />
  </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#18181b" />
  <line x1="0" y1="${size / 2}" x2="${size}" y2="${size / 2}" stroke="#3f3f46" stroke-width="2" />
${moons.join('\n')}
</svg>`;
}
