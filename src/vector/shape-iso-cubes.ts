export interface ShapeIsoCubesOptions {
  top?: string;
  left?: string;
  right?: string;
  size?: number;
}

export function createShapeIsoCubes(options: ShapeIsoCubesOptions = {}): string {
  const { top = '#67e8f9', left = '#8b5cf6', right = '#a78bfa', size = 320 } = options;
  const s = 44;
  const cubes = [
    [160, 96],
    [116, 140],
    [204, 140],
    [160, 184],
    [116, 228],
    [204, 228],
    [160, 272] as const,
  ];

  const faces = cubes
    .map(([x, y]) => {
      return `  <g>
    <polygon points="${x},${y} ${x + s},${y - s / 2} ${x + s * 2},${y} ${x + s},${y + s / 2}" fill="${top}" />
    <polygon points="${x},${y} ${x + s},${y + s / 2} ${x + s},${y + s * 1.5} ${x},${y + s}" fill="${left}" />
    <polygon points="${x + s},${y + s / 2} ${x + s * 2},${y} ${x + s * 2},${y + s} ${x + s},${y + s * 1.5}" fill="${right}" opacity="0.85" />
  </g>`;
    })
    .join('\n');

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${faces}
</svg>`;
}
