export interface ShapeTruchetQuartersOptions {
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

export function createShapeTruchetQuarters(options: ShapeTruchetQuartersOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320, cells = 5, seed = 33 } = options;
  const rand = mulberry32(seed);
  const cell = size / cells;
  const tiles: string[] = [];

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const x = c * cell;
      const y = r * cell;
      const flip = rand() > 0.5 ? 1 : 0;
      const colorA = colors[Math.floor(rand() * colors.length)]!;
      const colorB = colors[Math.floor(rand() * colors.length)]!;
      const arc = flip
        ? [`M ${x} ${y} A ${cell / 2} ${cell / 2} 0 0 1 ${x + cell} ${y}`, `M ${x} ${y + cell} A ${cell / 2} ${cell / 2} 0 0 1 ${x + cell} ${y + cell}`]
        : [`M ${x} ${y} A ${cell / 2} ${cell / 2} 0 0 0 ${x} ${y + cell}`, `M ${x + cell} ${y} A ${cell / 2} ${cell / 2} 0 0 0 ${x + cell} ${y + cell}`];
      tiles.push(
        `  <path d="${arc[0]}" fill="none" stroke="${colorA}" stroke-width="10" stroke-linecap="round" />
  <path d="${arc[1]}" fill="none" stroke="${colorB}" stroke-width="10" stroke-linecap="round"><animate attributeName="stroke-opacity" values="1;0.45;1" dur="${(3 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></path>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${tiles.join('\n')}
</svg>`;
}
