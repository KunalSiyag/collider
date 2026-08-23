export interface ShapeTriWeaveOptions {
  colors?: string[];
  size?: number;
  rows?: number;
}

export function createShapeTriWeave(options: ShapeTriWeaveOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320, rows = 6 } = options;
  const cols = 8;
  const w = size / cols;
  const h = size / rows;
  const tris: string[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * w;
      const y = r * h;
      const up = (r + c) % 2 === 0;
      const color = colors[c % 2]!;
      const pts = up
        ? `${x},${y + h} ${x + w / 2},${y} ${x + w},${y + h}`
        : `${x},${y} ${x + w},${y} ${x + w / 2},${y + h}`;
      const dy = up ? -4 : 4;
      tris.push(
        `  <polygon points="${pts}" fill="${color}" opacity="0.9"><animate attributeName="transform" type="translate" values="0 0;0 ${dy};0 0" dur="${(3 + ((r + c) % 4) * 0.5).toFixed(1)}s" repeatCount="indefinite" /></polygon>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${tris.join('\n')}
</svg>`;
}
