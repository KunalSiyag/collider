export interface ShapeNestedSquaresOptions {
  colors?: string[];
  size?: number;
  count?: number;
}

export function createShapeNestedSquares(options: ShapeNestedSquaresOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9'], size = 320, count = 6 } = options;
  const c = size / 2;
  const squares: string[] = [];

  for (let i = 0; i < count; i++) {
    const half = size * 0.42 - i * (size * 0.062);
    const rot = i * 12;
    squares.push(
      `  <g transform="rotate(${rot} ${c} ${c})">
    <rect x="${(c - half).toFixed(1)}" y="${(c - half).toFixed(1)}" width="${(half * 2).toFixed(1)}" height="${(half * 2).toFixed(1)}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="5">
      <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="${i % 2 === 0 ? 360 : -360} ${c} ${c}" dur="${(18 + i * 4).toFixed(0)}s" repeatCount="indefinite" additive="sum" />
    </rect>
  </g>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${squares.join('\n')}
</svg>`;
}
