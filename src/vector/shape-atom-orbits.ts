export interface ShapeAtomOrbitsOptions {
  colors?: string[];
  size?: number;
}

export function createShapeAtomOrbits(options: ShapeAtomOrbitsOptions = {}): string {
  const { colors = ['#22d3ee', '#f472b6', '#8b5cf6'], size = 320 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g fill="none" stroke-width="4">
  ${[0, 60, 120]
    .map(
      (a, i) =>
        `<ellipse cx="${c}" cy="${c}" rx="130" ry="52" stroke="${colors[i]}" stroke-opacity="0.7" transform="rotate(${a} ${c} ${c})"><animate attributeName="stroke-opacity" values="0.7;0.25;0.7" dur="${(3 + i).toFixed(0)}s" repeatCount="indefinite" /></ellipse>`,
    )
    .join('\n  ')}
</g>
${colors
  .map(
    (color, i) => `  <g transform="rotate(${i * 60} ${c} ${c})">
    <animateTransform attributeName="transform" type="rotate" from="${i * 60} ${c} ${c}" to="${i * 60 + 360} ${c} ${c}" dur="${(6 + i * 2).toFixed(0)}s" repeatCount="indefinite" />
    <circle cx="${c + 130}" cy="${c}" r="9" fill="${color}" />
  </g>`,
  )
  .join('\n')}
<circle cx="${c}" cy="${c}" r="18" fill="#fafafa"><animate attributeName="r" values="18;23;18" dur="2.5s" repeatCount="indefinite" /></circle>
</svg>`;
}
