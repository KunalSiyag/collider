export interface ShapeLadderTiltOptions {
  colors?: string[];
  size?: number;
}

export function createShapeLadderTilt(options: ShapeLadderTiltOptions = {}): string {
  const { colors = ['#a78bfa', '#3f3f46'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<g transform="rotate(-24 160 160)">
  <animateTransform attributeName="transform" type="rotate" values="-27 160 160;-21 160 160;-27 160 160" dur="8s" repeatCount="indefinite" additive="sum" />
  <line x1="112" y1="20" x2="112" y2="300" stroke="${colors[1]}" stroke-width="10" />
  <line x1="208" y1="20" x2="208" y2="300" stroke="${colors[1]}" stroke-width="10" />
  ${Array.from({ length: 7 }, (_, i) => {
    const y = 42 + i * 38;
    return `<line x1="112" y1="${y}" x2="208" y2="${y}" stroke="${colors[0]}" stroke-width="9"><animate attributeName="stroke-opacity" values="1;0.4;1" dur="${(2.5 + i * 0.25).toFixed(2)}s" begin="${(i * 0.18).toFixed(2)}s" repeatCount="indefinite" /></line>`;
  }).join('\n  ')}
</g>
</svg>`;
}
