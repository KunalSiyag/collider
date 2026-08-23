export interface ShapeTrianglesOptions {
  colors?: string[];
  size?: number;
  cells?: number;
}

export function createShapeTriangles(options: ShapeTrianglesOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#27272a'], size = 600, cells = 6 } = options;
  const cell = size / cells;
  const h = cell * 0.866;
  const triangles: string[] = [];

  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      const x = col * cell;
      const y = row * h;
      const up = (row + col) % 2 === 0;
      const color = colors[(row * 2 + col * 3) % colors.length]!;
      const opacity = (0.45 + ((row * col) % 4) / 4 * 0.55).toFixed(2);

      if (up) {
        triangles.push(
          `    <polygon points="${x},${(y + h).toFixed(1)} ${x + cell},${(y + h).toFixed(1)} ${x + cell / 2},${y.toFixed(1)}" fill="${color}" opacity="${opacity}" />`,
        );
      } else {
        triangles.push(
          `    <polygon points="${x},${y.toFixed(1)} ${x + cell},${y.toFixed(1)} ${x + cell / 2},${(y + h).toFixed(1)}" fill="${color}" opacity="${opacity}" />`,
        );
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${(h * cells).toFixed(0)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${triangles.join('\n')}
</svg>`;
}
