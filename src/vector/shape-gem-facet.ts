export interface ShapeGemFacetOptions {
  colors?: string[];
  size?: number;
}

export function createShapeGemFacet(options: ShapeGemFacetOptions = {}): string {
  const { colors = ['#8b5cf6', '#a78bfa', '#67e8f9', '#22d3ee'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g stroke="#fafafa" stroke-opacity="0.25" stroke-width="2">
  <animateTransform attributeName="transform" type="rotate" values="-2 160 170;2 160 170;-2 160 170" dur="10s" repeatCount="indefinite" />
  <polygon points="100,70 220,70 260,130 160,270 60,130" fill="${colors[0]}" opacity="0.35" />
  <polygon points="100,70 130,130 60,130" fill="${colors[1]}" opacity="0.7" />
  <polygon points="100,70 220,70 190,130 130,130" fill="${colors[2]}" opacity="0.6" />
  <polygon points="220,70 260,130 190,130" fill="${colors[3]}" opacity="0.65" />
  <polygon points="60,130 130,130 160,270" fill="${colors[1]}" opacity="0.45" />
  <polygon points="130,130 190,130 160,270" fill="${colors[0]}" opacity="0.55">
    <animate attributeName="opacity" values="0.55;0.9;0.55" dur="4s" repeatCount="indefinite" />
  </polygon>
  <polygon points="190,130 260,130 160,270" fill="${colors[3]}" opacity="0.4" />
</g>
</svg>`;
}
