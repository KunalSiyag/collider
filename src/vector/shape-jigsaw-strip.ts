export interface ShapeJigsawStripOptions {
  colors?: string[];
  size?: number;
}

export function createShapeJigsawStrip(options: ShapeJigsawStripOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320 } = options;
  let d = 'M 20 130 L 20 190 ';
  for (let i = 0; i < 5; i++) {
    const x = 20 + i * 56;
    const bumpUp = i % 2 === 0;
    if (bumpUp) {
      d += `L ${x + 16} 190 A 14 14 0 0 0 ${x + 16} 162 L ${x + 40} 162 `;
    } else {
      d += `L ${x + 16} 190 L ${x + 16} 218 A 14 14 0 0 0 ${x + 44} 218 L ${x + 44} 190 `;
    }
  }
  d += 'L 300 130 Z';

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<path d="${d}" fill="${colors[0]}" opacity="0.9">
  <animate attributeName="opacity" values="0.9;0.6;0.9" dur="5s" repeatCount="indefinite" />
</path>
<circle cx="76" cy="176" r="7" fill="#fafafa"><animate attributeName="r" values="7;10;7" dur="2.4s" repeatCount="indefinite" /></circle>
<circle cx="188" cy="204" r="7" fill="#0b0b10" stroke="#fafafa" stroke-width="3"><animate attributeName="r" values="7;10;7" dur="2.8s" begin="0.5s" repeatCount="indefinite" /></circle>
</svg>`;
}
