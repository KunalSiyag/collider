export interface TextureMosaicTileOptions {
  grout?: string;
  tiles?: string[];
}

export function createTextureMosaicTile(options: TextureMosaicTileOptions = {}): string {
  const { grout = '#3a3630', tiles = ['#7c9885', '#b5654a', '#d8b45a', '#5f7d9e', '#a08bc0'] } = options;
  let seed = 263;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const cells: string[] = [];
  for (let y = 0; y < 320; y += 24) {
    for (let x = 0; x < 320; x += 24) {
      const jx = (rnd() - 0.5) * 3;
      const jy = (rnd() - 0.5) * 3;
      const c = tiles[Math.floor(rnd() * tiles.length)];
      const s = 18 + rnd() * 3;
      cells.push(`<rect x="${(x + 2 + jx).toFixed(1)}" y="${(y + 2 + jy).toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" rx="2" fill="${c}"/>`);
      cells.push(`<rect x="${(x + 2 + jx).toFixed(1)}" y="${(y + 2 + jy).toFixed(1)}" width="${(s / 2).toFixed(1)}" height="3" fill="#fff" opacity="0.22"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${grout}"/>
  ${cells.join('\n  ')}
</svg>`;
}
