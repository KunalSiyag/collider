export interface ShapeTargetOffsetOptions {
  colors?: string[];
  size?: number;
  rings?: number;
}

export function createShapeTargetOffset(options: ShapeTargetOffsetOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'], size = 320, rings = 6 } = options;
  const parts: string[] = [];

  for (let i = 0; i < rings; i++) {
    const r = 130 - i * 20;
    parts.push(
      `  <circle cx="${60 + r}" cy="${size / 2}" r="${r}" fill="${i % 2 === 0 ? colors[i % colors.length] : '#0b0b10'}" stroke="#3f3f46" stroke-width="${i % 2 === 0 ? 0 : 2}"><animate attributeName="r" values="${r};${(r * 1.05).toFixed(0)};${r}" dur="${(4 + i * 0.7).toFixed(1)}s" repeatCount="indefinite" /></circle>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${parts.join('\n')}
<circle cx="${size / 2}" cy="${size / 2}" r="8" fill="#fafafa">
  <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
</circle>
</svg>`;
}
