export interface ShapeGridQuartersOptions {
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

export function createShapeGridQuarters(options: ShapeGridQuartersOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320, cells = 6, seed = 19 } = options;
  const rand = mulberry32(seed);
  const cell = size / cells;
  const tiles: string[] = [];

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      if (rand() > 0.45) continue;
      const x = c * cell;
      const y = r * cell;
      const corner = Math.floor(rand() * 4);
      const color = colors[Math.floor(rand() * colors.length)]!;
      const cx = corner % 2 === 0 ? x : x + cell;
      const cy = corner < 2 ? y : y + cell;
      const ex = cx === x ? cx + cell : cx - cell;
      const ey = cy === y ? cy + cell : cy - cell;
      tiles.push(
        `  <path d="M ${cx} ${cy} L ${ex} ${cy} A ${cell} ${cell} 0 0 ${(cy === y ? 1 : 0) ^ (cx === x ? 1 : 0)} ${cx} ${ey} Z" fill="${color}" opacity="0.9"><animate attributeName="opacity" values="0.9;0.5;0.9" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></path>`,
      );
    }
  }

  const lines: string[] = [];
  for (let i = 0; i <= cells; i++) {
    lines.push(
      `<line x1="0" y1="${i * cell}" x2="${size}" y2="${i * cell}" stroke="#27272a" /><line x1="${i * cell}" y1="0" x2="${i * cell}" y2="${size}" stroke="#27272a" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${lines.join('')}
${tiles.join('\n')}
</svg>`;
}
