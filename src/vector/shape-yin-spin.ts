export interface ShapeYinSpinOptions {
  colors?: string[];
  size?: number;
}

export function createShapeYinSpin(options: ShapeYinSpinOptions = {}): string {
  const { colors = ['#8b5cf6', '#0b0b10'], size = 320 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<g>
  <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="18s" repeatCount="indefinite" />
  <path d="M ${c} 30 A 130 130 0 0 1 ${c} 290 A 65 65 0 0 1 ${c} 160 A 65 65 0 0 0 ${c} 30 Z" fill="${colors[0]}" />
  <path d="M ${c} 30 A 130 130 0 0 0 ${c} 290 A 65 65 0 0 0 ${c} 160 A 65 65 0 0 1 ${c} 30 Z" fill="${colors[1]}" stroke="#3f3f46" stroke-width="3" />
  <circle cx="${c}" cy="95" r="14" fill="${colors[1]}" />
  <circle cx="${c}" cy="225" r="14" fill="${colors[0]}" />
</g>
<circle cx="${c}" cy="95" r="6" fill="${colors[0]}"><animate attributeName="r" values="6;10;6" dur="4s" repeatCount="indefinite" /></circle>
<circle cx="${c}" cy="225" r="6" fill="${colors[1]}"><animate attributeName="r" values="6;10;6" dur="4s" repeatCount="indefinite" /></circle>
</svg>`;
}
