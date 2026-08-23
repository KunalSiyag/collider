export interface ShapeArrowMosaicOptions {
  colors?: string[];
  size?: number;
  cells?: number;
  seed?: number;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createShapeArrowMosaic(options: ShapeArrowMosaicOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320, cells = 4, seed = 27 } = options;
  const rand = mulberry32(seed);
  const cell = size / cells;
  const tiles: string[] = [];

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const cx = c * cell + cell / 2;
      const cy = r * cell + cell / 2;
      const dir = Math.floor(rand() * 4) * 90;
      const color = colors[Math.floor(rand() * colors.length)]!;
      const tip = cell * 0.34;
      tiles.push(
        `  <g transform="rotate(${dir} ${cx} ${cy})">
    <polygon points="${cx},${cy - tip} ${cx - tip},${cy + tip * 0.5} ${cx + tip},${cy + tip * 0.5}" fill="${color}" />
    <rect x="${cx - tip * 0.28}" y="${cy}" width="${tip * 0.56}" height="${tip}" fill="${color}" />
    <animateTransform attributeName="transform" type="rotate" from="${dir} ${cx} ${cy}" to="${dir + 90} ${cx} ${cy}" dur="${(5 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" />
  </g>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${tiles.join('\n')}
</svg>`;
}
