export interface ShapeArchRepeatOptions {
  colors?: string[];
  size?: number;
  count?: number;
}

export function createShapeArchRepeat(options: ShapeArchRepeatOptions = {}): string {
  const { colors = ['#8b5cf6', '#67e8f9', '#f472b6', '#a78bfa', '#22d3ee'], size = 320, count = 6 } = options;
  const w = size / count;
  const arches: string[] = [];

  for (let i = 0; i < count; i++) {
    arches.push(
      `  <path d="M ${i * w + w * 0.15} ${size - 30} L ${i * w + w * 0.15} ${size / 2} A ${w * 0.35} ${w * 0.35} 0 0 1 ${i * w + w * 0.85} ${size / 2} L ${i * w + w * 0.85} ${size - 30} Z" fill="${colors[i % colors.length]}">
    <animate attributeName="transform" type="translate" values="0 0;0 -10;0 0" dur="${(2.8 + i * 0.35).toFixed(2)}s" begin="${(i * 0.2).toFixed(1)}s" repeatCount="indefinite" />
  </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<line x1="0" y1="${size - 30}" x2="${size}" y2="${size - 30}" stroke="#3f3f46" stroke-width="3" />
${arches.join('\n')}
</svg>`;
}
