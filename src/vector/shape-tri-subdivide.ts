export interface ShapeTriSubdivideOptions {
  colors?: string[];
  size?: number;
}

export function createShapeTriSubdivide(options: ShapeTriSubdivideOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#18181b', '#a78bfa'], size = 320 } = options;
  const tris: string[] = [];

  const subdivide = (ax: number, ay: number, bx: number, by: number, cx: number, cy: number, depth: number) => {
    if (depth === 0) return;
    const mx1 = (ax + bx) / 2;
    const my1 = (ay + by) / 2;
    const mx2 = (bx + cx) / 2;
    const my2 = (by + cy) / 2;
    const mx3 = (cx + ax) / 2;
    const my3 = (cy + ay) / 2;
    tris.push(
      `<polygon points="${mx1},${my1} ${mx2},${my2} ${mx3},${my3}" fill="${colors[depth % colors.length]}"><animate attributeName="opacity" values="1;0.55;1" dur="${(3 + depth).toFixed(0)}s" repeatCount="indefinite" /></polygon>`,
    );
    subdivide(ax, ay, mx1, my1, mx3, my3, depth - 1);
    subdivide(mx1, my1, bx, by, mx2, my2, depth - 1);
    subdivide(mx3, my3, mx2, my2, cx, cy, depth - 1);
  };

  subdivide(160, 24, 24, 296, 296, 296, 4);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<polygon points="160,24 24,296 296,296" fill="${colors[0]}" opacity="0.25" />
${tris.join('\n')}
</svg>`;
}
