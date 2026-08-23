export interface ShapeBlindShiftOptions {
  colors?: string[];
  size?: number;
  bars?: number;
}

export function createShapeBlindShift(options: ShapeBlindShiftOptions = {}): string {
  const { colors = ['#8b5cf6', '#0b0b10', '#22d3ee', '#18181b', '#f472b6'], size = 320, bars = 10 } = options;
  const cols: string[] = [];

  for (let i = 0; i < bars; i++) {
    const x = i * (size / bars);
    cols.push(
      `  <rect x="${x}" y="0" width="${size / bars - 4}" height="${size}" rx="${(size / bars / 2).toFixed(1)}" fill="${colors[i % colors.length]}"><animate attributeName="y" values="0;-${(i % 3) * 8};0" dur="${(3 + i * 0.3).toFixed(1)}s" repeatCount="indefinite" /></rect>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${cols.join('\n')}
</svg>`;
}
