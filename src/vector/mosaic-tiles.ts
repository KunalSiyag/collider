export interface MosaicTilesOptions {
  seed?: number;
  size?: number;
  cells?: number;
  base?: string;
  accents?: string[];
}

export function createMosaicTiles(options: MosaicTilesOptions = {}): string {
  const { seed = 23, size = 720, cells = 12, base = '#1c1c22', accents = ['#8b5cf6', '#22d3ee', '#f472b6', '#fbbf24', '#67e8f9'] } = options;

  let t = seed >>> 0;
  const rand = () => {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const step = size / cells;
  const tiles: string[] = [];
  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      const x = col * step;
      const y = row * step;
      const jitter = () => (rand() - 0.5) * step * 0.18;
      const pts = [
        [x + jitter(), y + jitter()],
        [x + step + jitter(), y + jitter()],
        [x + step + jitter(), y + step + jitter()],
        [x + jitter(), y + step + jitter()],
      ];
      const d = 'M' + pts.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(' L') + ' Z';
      const roll = rand();
      const fill = roll > 0.82 ? accents[Math.floor(rand() * accents.length)] : base;
      const op = roll > 0.82 ? 0.35 + rand() * 0.3 : 0.85 + rand() * 0.15;
      tiles.push(`    <path d="${d}" fill="${fill}" fill-opacity="${op.toFixed(2)}" stroke="#3f3f46" stroke-width="1" />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${tiles.join('\n')}\n</svg>`;
}
