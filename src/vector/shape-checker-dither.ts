export interface ShapeCheckerDitherOptions {
  colors?: string[];
  size?: number;
  cells?: number;
}

export function createShapeCheckerDither(options: ShapeCheckerDitherOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320, cells = 12 } = options;
  const cell = size / cells;
  const parts: string[] = [];

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      if ((r + c) % 2 !== 0) continue;
      const x = c * cell;
      const y = r * cell;
      const t = (r + c) / (cells * 2);
      const color = colors[c % colors.length]!;
      if (t < 0.45) {
        parts.push(`  <rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${color}" />`);
      } else if (t < 0.8) {
        parts.push(
          `  <circle cx="${(x + cell / 2).toFixed(1)}" cy="${(y + cell / 2).toFixed(1)}" r="${(cell * 0.32).toFixed(1)}" fill="${color}" opacity="${(1.15 - t).toFixed(2)}"><animate attributeName="r" values="${(cell * 0.32).toFixed(1)};${(cell * 0.42).toFixed(1)};${(cell * 0.32).toFixed(1)}" dur="4s" repeatCount="indefinite" /></circle>`,
        );
      } else {
        parts.push(
          `  <circle cx="${(x + cell / 2).toFixed(1)}" cy="${(y + cell / 2).toFixed(1)}" r="${(cell * 0.16).toFixed(1)}" fill="${color}" opacity="0.5"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="${(3 + (c % 3)).toFixed(0)}s" repeatCount="indefinite" /></circle>`,
        );
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${parts.join('\n')}
</svg>`;
}
