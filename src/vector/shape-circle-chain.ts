export interface ShapeCircleChainOptions {
  colors?: string[];
  size?: number;
  count?: number;
}

export function createShapeCircleChain(options: ShapeCircleChainOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320, count = 5 } = options;
  const links: string[] = [];

  for (let i = 0; i < count; i++) {
    const cx = 52 + i * (216 / (count - 1));
    const cy = i % 2 === 0 ? 140 : 180;
    links.push(
      `  <circle cx="${cx.toFixed(0)}" cy="${cy}" r="34" fill="none" stroke="${colors[i % colors.length]}" stroke-width="10">
    <animate attributeName="stroke-width" values="10;6;10" dur="${(3 + i * 0.5).toFixed(1)}s" repeatCount="indefinite" />
  </circle>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${links.join('\n')}
<line x1="20" y1="160" x2="300" y2="160" stroke="#27272a" stroke-width="2" stroke-dasharray="4 8" />
</svg>`;
}
