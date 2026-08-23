export interface ShapeCelticKnotOptions {
  colors?: string[];
  size?: number;
}

export function createShapeCelticKnot(options: ShapeCelticKnotOptions = {}): string {
  const { colors = ['#8b5cf6', '#67e8f9'], size = 320 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<g fill="none" stroke-width="14" stroke-linecap="round">
  <path d="M ${c - 80} ${c} C ${c - 80} ${c - 90}, ${c + 80} ${c - 90}, ${c + 80} ${c} C ${c + 80} ${c + 90}, ${c - 80} ${c + 90}, ${c - 80} ${c} Z" stroke="${colors[0]}">
    <animate attributeName="stroke-opacity" values="1;0.6;1" dur="5s" repeatCount="indefinite" />
  </path>
  <path d="M ${c} ${c - 80} C ${c - 90} ${c - 80}, ${c - 90} ${c + 80}, ${c} ${c + 80} C ${c + 90} ${c + 80}, ${c + 90} ${c - 80}, ${c} ${c - 80} Z" stroke="${colors[1]}" stroke-dasharray="150 60">
    <animate attributeName="stroke-dashoffset" from="210" to="0" dur="7s" repeatCount="indefinite" />
  </path>
</g>
<g fill="#18181b" stroke="#fafafa" stroke-opacity="0.4" stroke-width="2">
  <circle cx="${c - 56}" cy="${c - 40}" r="11"><animate attributeName="r" values="11;15;11" dur="3s" repeatCount="indefinite" /></circle>
  <circle cx="${c + 56}" cy="${c + 40}" r="11" />
</g>
</svg>`;
}
