export interface ShapeNotchSquareOptions {
  colors?: string[];
  size?: number;
}

export function createShapeNotchSquare(options: ShapeNotchSquareOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <mask id="ns-notches">
      <rect width="${size}" height="${size}" fill="#fff" />
      <circle cx="160" cy="0" r="34" fill="#000" />
      <circle cx="160" cy="320" r="34" fill="#000" />
      <circle cx="0" cy="160" r="34" fill="#000" />
      <circle cx="320" cy="160" r="34" fill="#000" />
    </mask>
  </defs>
  <rect width="${size}" height="${size}" fill="#18181b" />
  <rect x="46" y="46" width="228" height="228" rx="18" fill="${colors[0]}" mask="url(#ns-notches)">
    <animate attributeName="rx" values="18;60;18" dur="8s" repeatCount="indefinite" />
  </rect>
  <rect x="96" y="96" width="128" height="128" rx="12" fill="#0b0b10" mask="url(#ns-notches)" />
  <rect x="122" y="122" width="76" height="76" fill="${colors[1]}">
    <animateTransform attributeName="transform" type="rotate" from="0 160 160" to="360 160 160" dur="14s" repeatCount="indefinite" />
  </rect>
</svg>`;
}
