export interface ShapeRopeCrossOptions {
  colors?: string[];
  size?: number;
}

export function createShapeRopeCross(options: ShapeRopeCrossOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320 } = options;

  const rope = (phase: number, color: string) => {
    let d = `M -20 ${160}`;
    for (let x = -20; x <= 340; x += 40) {
      const y1 = 160 + Math.sin((x / 320) * Math.PI * 3 + phase) * 52;
      const y2 = 160 + Math.sin(((x + 20) / 320) * Math.PI * 3 + phase) * 52;
      d += ` Q ${x + 10} ${y1.toFixed(1)} ${x + 20} ${y2.toFixed(1)}`;
    }
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round"><animate attributeName="stroke-dasharray" values="0.1 18;14 6;0.1 18" dur="5s" repeatCount="indefinite" /></path>`;
  };

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${rope(0, colors[0]!)}
${rope(Math.PI, colors[1]!)}
<circle cx="160" cy="160" r="12" fill="#fafafa"><animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" /></circle>
</svg>`;
}
