/** Heatmap Grid — a GitHub-style contribution grid with staggered cell pops. */
export interface HeatmapGridOptions {
  cols?: number;
  rows?: number;
  seed?: number;
  accent?: string;
  cell?: number;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createHeatmapGrid(options: HeatmapGridOptions = {}): string {
  const { cols = 26, rows = 7, seed = 42, accent = '#4ade80', cell = 18 } = options;
  const rand = mulberry32(seed);
  const gap = 4;
  const width = cols * (cell + gap);

  // Weekly rhythm: weekends quieter, occasional streak bursts.
  const cells: string[] = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const weekend = r >= 5;
      const burst = rand() > 0.93 ? 1 : 0;
      const level = Math.min(4, Math.floor(rand() * (weekend ? 2.4 : 3.6)) + burst);
      const x = c * (cell + gap);
      const y = r * (cell + gap);
      const opacities = [0.12, 0.35, 0.6, 0.85, 1];
      cells.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="4.5" fill="${accent}" opacity="0">
        <animate attributeName="opacity" from="0" to="${opacities[level]}" dur="0.35s" begin="${(c * 0.03 + r * 0.012).toFixed(3)}s" fill="freeze"/>
      </rect>`);
    }
  }

  return `<svg viewBox="0 0 ${width} ${rows * (cell + gap)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${cells.join('')}
</svg>`;
}
