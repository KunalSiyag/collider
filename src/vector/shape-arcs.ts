export interface ShapeArcsOptions {
  colors?: string[];
  size?: number;
  cells?: number;
}

export function createShapeArcs(options: ShapeArcsOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#fb7185', '#fafafa'], size = 600, cells = 4 } = options;
  const cell = size / cells;
  const tiles: string[] = [];

  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      const x = col * cell;
      const y = row * cell;
      const variant = (row * 3 + col * 5) % 4;
      const color = colors[(row + col) % colors.length]!;
      const cx = x + cell / 2;
      const cy = y + cell / 2;

      if (variant === 0) {
        tiles.push(
          `    <path d="M ${cx} ${cy} m -${cell / 2} 0 a ${cell / 2} ${cell / 2} 0 0 1 ${cell} 0 Z" fill="${color}" transform="rotate(${((row * 7 + col * 13) % 4) * 90} ${cx} ${cy})" />`,
        );
      } else if (variant === 1) {
        const r1 = (cell / 2) * 0.66;
        tiles.push(
          `    <circle cx="${cx}" cy="${cy}" r="${r1}" fill="${color}" opacity="0.9" />
    <circle cx="${cx}" cy="${cy}" r="${r1 / 2}" fill="#09090b" />`,
        );
      } else if (variant === 2) {
        tiles.push(
          `    <rect x="${(x + cell * 0.17).toFixed(1)}" y="${(y + cell * 0.17).toFixed(1)}" width="${(cell * 0.66).toFixed(1)}" height="${(cell * 0.66).toFixed(1)}" rx="${(cell * 0.12).toFixed(1)}" fill="${color}" transform="rotate(${variant * 45} ${cx} ${cy})" />`,
        );
      } else {
        const inner = cell * 0.36;
        tiles.push(
          `    <path d="M ${(x + cell * 0.14).toFixed(1)} ${cy} L ${cx} ${(cy - inner).toFixed(1)} L ${(x + cell * 0.86).toFixed(1)} ${cy} L ${cx} ${(cy + inner).toFixed(1)} Z" fill="${color}" />`,
        );
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${tiles.join('\n')}
</svg>`;
}
