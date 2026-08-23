export interface ShapeStainedPaneOptions {
  colors?: string[];
  size?: number;
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

export function createShapeStainedPane(options: ShapeStainedPaneOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#facc15', '#a78bfa'], size = 320, seed = 55 } = options;
  const rand = mulberry32(seed);
  const panes: string[] = [];
  const cols = 4;
  const rows = 4;
  const w = size / cols;
  const h = size / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * w + rand() * w * 0.3 - w * 0.15;
      const y = r * h + rand() * h * 0.3 - h * 0.15;
      const pw = w + rand() * w * 0.25;
      const ph = h + rand() * h * 0.25;
      panes.push(
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${pw.toFixed(1)}" height="${ph.toFixed(1)}" fill="${colors[Math.floor(rand() * colors.length)]}" stroke="#18181b" stroke-width="7"><animate attributeName="fill-opacity" values="1;${(0.45 + rand() * 0.2).toFixed(2)};1" dur="${(4 + rand() * 4).toFixed(1)}s" begin="${(rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></rect>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#27272a" />
${panes.join('\n')}
</svg>`;
}
