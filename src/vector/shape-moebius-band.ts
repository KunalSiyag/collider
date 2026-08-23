export interface ShapeMoebiusBandOptions {
  colors?: string[];
  size?: number;
}

export function createShapeMoebiusBand(options: ShapeMoebiusBandOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g fill="none" stroke-linecap="round">
    <path d="M ${c - 110} ${c} C ${c - 110} ${c - 120}, ${c + 60} ${c - 130}, ${c + 90} ${c - 50} C ${c + 115} ${c + 20}, ${c + 40} ${c + 90}, ${c - 30} ${c + 60}" stroke="${colors[0]}" stroke-width="18">
      <animate attributeName="stroke-dashoffset" from="0" to="-220" dur="7s" repeatCount="indefinite" />
    </path>
    <path d="M ${c + 110} ${c} C ${c + 110} ${c + 120}, ${c - 60} ${c + 130}, ${c - 90} ${c + 50} C ${c - 115} ${c - 20}, ${c - 40} ${c - 90}, ${c + 30} ${c - 60}" stroke="${colors[1]}" stroke-width="18">
      <animate attributeName="stroke-dashoffset" from="0" to="-220" dur="7s" repeatCount="indefinite" />
    </path>
  </g>
  <circle cx="${c - 30}" cy="${c + 60}" r="14" fill="#18181b" stroke="${colors[0]}" stroke-width="4" />
  <circle cx="${c + 30}" cy="${c - 60}" r="14" fill="#18181b" stroke="${colors[1]}" stroke-width="4" />
</svg>`;
}
