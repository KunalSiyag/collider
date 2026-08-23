export interface ShapeDiagonalBandsOptions {
  colors?: string[];
  size?: number;
}

export function createShapeDiagonalBands(options: ShapeDiagonalBandsOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9'], size = 320 } = options;
  const bands: string[] = [];

  for (let i = 0; i < colors.length; i++) {
    const offset = i * 90;
    bands.push(
      `  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;-90 90;0 0" dur="${(6 + i * 1.5).toFixed(1)}s" repeatCount="indefinite" />
    <rect x="${offset - 320}" y="${offset - 320}" width="220" height="900" fill="${colors[i]}" opacity="0.85" transform="rotate(-45 160 160)" />
  </g>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<clipPath id="db-clip"><rect width="${size}" height="${size}" /></clipPath>
<rect width="${size}" height="${size}" fill="#18181b" />
<g clip-path="url(#db-clip)">
${bands.join('\n')}
</g>
</svg>`;
}
