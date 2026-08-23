export interface ShapeEnsoBrushOptions {
  color?: string;
  size?: number;
}

export function createShapeEnsoBrush(options: ShapeEnsoBrushOptions = {}): string {
  const { color = '#8b5cf6', size = 320 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<path d="M ${c + 96} ${c - 40} A 100 100 0 1 0 ${c + 104} ${c - 12}" fill="none" stroke="${color}" stroke-width="22" stroke-linecap="round">
  <animate attributeName="stroke-width" values="22;14;22" dur="6s" repeatCount="indefinite" />
</path>
<path d="M ${c + 96} ${c - 40} A 100 100 0 1 0 ${c + 104} ${c - 12}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" opacity="0.4">
  <animateTransform attributeName="transform" type="rotate" from="-3 ${c} ${c}" to="3 ${c} ${c}" dur="7s" repeatCount="indefinite" />
</path>
<circle cx="${c + 118}" cy="${c - 26}" r="5" fill="#fafafa"><animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" /></circle>
</svg>`;
}
