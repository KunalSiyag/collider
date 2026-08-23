export interface TextureCobblestoneOptions {
  stone?: string;
  mortar?: string;
}

export function createTextureCobblestone(options: TextureCobblestoneOptions = {}): string {
  const { stone = '#7d7d76', mortar = '#3c3a34' } = options;
  const cobbles: string[] = [];
  let seed = 313;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let r = -1; r < 9; r++) {
    for (let c = -1; c < 8; c++) {
      const x = c * 46 + ((r % 2) * 23);
      const y = r * 40;
      const tone = 0.75 + rnd() * 0.5;
      cobbles.push(`<path d="M${x + 6},${y + 4} Q${x + 20},${y - 3} ${x + 36},${y + 5} Q${x + 42},${y + 18} ${x + 35},${y + 32} Q${x + 20},${y + 39} ${x + 6},${y + 31} Q${x - 1},${y + 17} ${x + 6},${y + 4} Z" fill="${rnd() < 0.3 ? '#94948c' : stone}" opacity="${tone.toFixed(2)}"/>`);
      cobbles.push(`<path d="M${x + 10},${y + 10} Q${x + 20},${y + 5} ${x + 30},${y + 11}" stroke="#b5b5ac" stroke-width="1.6" fill="none" opacity="0.45"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${mortar}"/>
  ${cobbles.join('\n  ')}
</svg>`;
}
