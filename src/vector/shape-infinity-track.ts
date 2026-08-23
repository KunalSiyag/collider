export interface ShapeInfinityTrackOptions {
  colors?: string[];
  size?: number;
}

export function createShapeInfinityTrack(options: ShapeInfinityTrackOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<path id="if-lemni" d="M 160 160 C 100 90, 30 110, 30 160 C 30 210, 100 230, 160 160 C 220 90, 290 110, 290 160 C 290 210, 220 230, 160 160 Z" fill="none" stroke="#27272a" stroke-width="22" stroke-linejoin="round" />
<path d="M 160 160 C 100 90, 30 110, 30 160 C 30 210, 100 230, 160 160 C 220 90, 290 110, 290 160 C 290 210, 220 230, 160 160 Z" fill="none" stroke="${colors[0]}" stroke-width="8" stroke-dasharray="40 200" stroke-linejoin="round">
  <animate attributeName="stroke-dashoffset" from="480" to="0" dur="5s" repeatCount="indefinite" />
</path>
<path d="M 160 160 C 100 90, 30 110, 30 160 C 30 210, 100 230, 160 160 C 220 90, 290 110, 290 160 C 290 210, 220 230, 160 160 Z" fill="none" stroke="${colors[1]}" stroke-width="8" stroke-dasharray="20 260" stroke-linejoin="round">
  <animate attributeName="stroke-dashoffset" from="-240" to="240" dur="7s" repeatCount="indefinite" />
</path>
</svg>`;
}
