export interface ShapeLightningSplitOptions {
  colors?: string[];
  size?: number;
}

export function createShapeLightningSplit(options: ShapeLightningSplitOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#18181b" />
  <polygon points="0,0 ${size},0 0,${size}" fill="${colors[0]}" opacity="0.28" />
  <polygon points="${size},0 ${size},${size} 0,${size}" fill="${colors[1]}" opacity="0.22" />
  <polyline points="190,20 130,140 178,150 96,300 128,168 84,158 150,20"
    fill="#facc15" stroke="#fafafa" stroke-width="3" stroke-linejoin="round">
    <animate attributeName="opacity" values="1;0.35;1;0.7;1" dur="2.4s" repeatCount="indefinite" keyTimes="0;0.15;0.35;0.45;1" />
  </polyline>
  <line x1="0" y1="${size - 24}" x2="${size}" y2="${size - 24}" stroke="#3f3f46" stroke-width="4" />
</svg>`;
}
