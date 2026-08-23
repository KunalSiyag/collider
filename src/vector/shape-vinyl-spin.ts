export interface ShapeVinylSpinOptions {
  colors?: string[];
  size?: number;
}

export function createShapeVinylSpin(options: ShapeVinylSpinOptions = {}): string {
  const { colors = ['#8b5cf6', '#f472b6'], size = 320 } = options;
  const c = size / 2;
  const grooves: string[] = [];

  for (let i = 0; i < 7; i++) {
    grooves.push(`<circle cx="${c}" cy="${c}" r="${132 - i * 12}" fill="none" stroke="#27272a" stroke-width="${i % 2 === 0 ? 3 : 1.5}" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<g>
  <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="8s" repeatCount="indefinite" />
  <circle cx="${c}" cy="${c}" r="140" fill="#0b0b10" stroke="#3f3f46" stroke-width="4" />
  ${grooves.join('')}
  <path d="M ${c} ${c - 138} A 138 138 0 0 1 ${c + 98} ${c - 98}" fill="none" stroke="#fafafa" stroke-opacity="0.18" stroke-width="16">
    <animate attributeName="stroke-opacity" values="0.18;0.05;0.18" dur="3s" repeatCount="indefinite" />
  </path>
  <circle cx="${c}" cy="${c}" r="46" fill="${colors[0]}" />
  <circle cx="${c}" cy="${c}" r="20" fill="${colors[1]}" />
  <circle cx="${c}" cy="${c}" r="5" fill="#0b0b10" />
</g>
</svg>`;
}
