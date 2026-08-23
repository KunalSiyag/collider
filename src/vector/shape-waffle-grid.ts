export interface ShapeWaffleGridOptions {
  colors?: string[];
  size?: number;
  cells?: number;
}

export function createShapeWaffleGrid(options: ShapeWaffleGridOptions = {}): string {
  const { colors = ['#8b5cf6', '#18181b'], size = 320, cells = 5 } = options;
  const cell = size / cells;
  const wells: string[] = [];

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const isButter = r === 2 && c === 2;
      wells.push(
        `  <rect x="${(c * cell + 7).toFixed(1)}" y="${(r * cell + 7).toFixed(1)}" width="${(cell - 14).toFixed(1)}" height="${(cell - 14).toFixed(1)}" rx="9" fill="${isButter ? '#facc15' : colors[(r + c) % 2]}">
    ${isButter ? '<animate attributeName="fill-opacity" values="1;0.75;1" dur="3s" repeatCount="indefinite" />' : `<animate attributeName="rx" values="9;${(cell * 0.4).toFixed(0)};9" dur="${(5 + ((r * cells + c) % 4)).toFixed(0)}s" repeatCount="indefinite" />`}
  </rect>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${wells.join('\n')}
</svg>`;
}
