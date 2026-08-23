export interface ShapePlaneTrailOptions {
  colors?: string[];
  size?: number;
}

export function createShapePlaneTrail(options: ShapePlaneTrailOptions = {}): string {
  const { colors = ['#fafafa', '#22d3ee'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g transform="rotate(24 200 110)">
  <polygon points="200,70 258,128 200,116 142,128" fill="${colors[0]}">
    <animateTransform attributeName="transform" type="translate" values="0 0;-8 8;0 0" dur="3s" repeatCount="indefinite" additive="sum" />
  </polygon>
  <line x1="200" y1="116" x2="200" y2="146" stroke="#3f3f46" stroke-width="4" />
</g>
<path d="M 60 280 C 100 240, 130 260, 160 220 C 185 187, 210 180, 236 150" fill="none" stroke="${colors[1]}" stroke-width="4" stroke-dasharray="10 12" stroke-linecap="round">
  <animate attributeName="stroke-dashoffset" from="-44" to="44" dur="2.6s" repeatCount="indefinite" />
</path>
</svg>`;
}
