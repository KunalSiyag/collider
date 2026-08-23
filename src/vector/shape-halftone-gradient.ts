export interface ShapeHalftoneGradientOptions {
  colors?: string[];
  size?: number;
  cells?: number;
}

export function createShapeHalftoneGradient(options: ShapeHalftoneGradientOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320, cells = 9 } = options;
  const step = size / cells;
  const dots: string[] = [];

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const t = (r + c) / ((cells - 1) * 2);
      const radius = 2 + t * (step * 0.48);
      const color = t < 0.5 ? colors[0]! : colors[1]!;
      dots.push(
        `  <circle cx="${((c + 0.5) * step).toFixed(1)}" cy="${((r + 0.5) * step).toFixed(1)}" r="${radius.toFixed(1)}" fill="${color}" opacity="${(0.55 + t * 0.45).toFixed(2)}"><animate attributeName="r" values="${radius.toFixed(1)};${(radius * 1.12).toFixed(1)};${radius.toFixed(1)}" dur="${(3 + ((r * cells + c) % 5) * 0.5).toFixed(1)}s" repeatCount="indefinite" /></circle>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${dots.join('\n')}
</svg>`;
}
