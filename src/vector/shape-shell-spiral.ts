export interface ShapeShellSpiralOptions {
  colors?: string[];
  size?: number;
}

export function createShapeShellSpiral(options: ShapeShellSpiralOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'], size = 320 } = options;
  const arcs: string[] = [];

  for (let i = 0; i < 10; i++) {
    const r = 140 - i * 13;
    const cx = 150 - i * 4;
    const cy = 170 + i * 2;
    arcs.push(
      `  <path d="M ${(cx - r).toFixed(1)} ${cy} A ${r} ${r} 0 0 1 ${(cx + r).toFixed(1)} ${cy}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="7" stroke-linecap="round"><animate attributeName="stroke-width" values="7;3;7" dur="${(3 + i * 0.4).toFixed(1)}s" repeatCount="indefinite" /></path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${arcs.join('\n')}
</svg>`;
}
