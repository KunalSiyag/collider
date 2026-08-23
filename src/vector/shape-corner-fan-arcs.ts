export interface ShapeCornerFanArcsOptions {
  colors?: string[];
  size?: number;
  count?: number;
}

export function createShapeCornerFanArcs(options: ShapeCornerFanArcsOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320, count = 7 } = options;
  const arcs: string[] = [];

  for (let i = 0; i < count; i++) {
    const r = 50 + i * 38;
    arcs.push(
      `  <path d="M ${r} 0 A ${r} ${r} 0 0 1 0 ${r}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="10" opacity="${(1 - i * 0.09).toFixed(2)}">
    <animate attributeName="stroke-width" values="10;4;10" dur="${(3.5 + i * 0.5).toFixed(1)}s" repeatCount="indefinite" />
  </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<circle cx="0" cy="0" r="26" fill="#fafafa">
  <animate attributeName="r" values="26;34;26" dur="4s" repeatCount="indefinite" />
</circle>
${arcs.join('\n')}
</svg>`;
}
