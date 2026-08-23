export interface ShapeKiteFlyOptions {
  colors?: string[];
  size?: number;
}

export function createShapeKiteFly(options: ShapeKiteFlyOptions = {}): string {
  const { colors = ['#f472b6', '#22d3ee'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g>
  <animateTransform attributeName="transform" type="rotate" values="-6 120 90;6 120 90;-6 120 90" dur="7s" repeatCount="indefinite" />
  <polygon points="120,30 190,105 120,180 50,105" fill="${colors[0]}" />
  <polygon points="120,30 190,105 120,105 50,105" fill="${colors[1]}" opacity="0.85" />
  <line x1="120" y1="30" x2="120" y2="180" stroke="#fafafa" stroke-width="2" opacity="0.6" />
  <line x1="50" y1="105" x2="190" y2="105" stroke="#fafafa" stroke-width="2" opacity="0.6" />
</g>
<path d="M 120 180 Q 150 210 130 235 Q 110 260 140 285" fill="none" stroke="#fafafa" stroke-width="2">
  <animate attributeName="stroke-dasharray" values="4 6;10 4;4 6" dur="3s" repeatCount="indefinite" />
</path>
<polygon points="126,206 142,214 128,222" fill="#facc15"><animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" /></polygon>
</svg>`;
}
