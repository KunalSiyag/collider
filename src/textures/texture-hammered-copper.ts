export interface TextureHammeredCopperOptions {
  copper?: string;
  dimple?: string;
}

export function createTextureHammeredCopper(options: TextureHammeredCopperOptions = {}): string {
  const { copper = '#b0653a', dimple = '#6e3417' } = options;
  const marks: string[] = [];
  for (let r = -1; r < 10; r++) {
    for (let c = -1; c < 9; c++) {
      const x = c * 40 + ((r % 2) * 20) + 8;
      const y = r * 36 + 14;
      const jx = ((r * 31 + c * 17) % 7) - 3;
      marks.push(`<circle cx="${x + jx}" cy="${y}" r="19" fill="${dimple}" opacity="0.55"/>`);
      marks.push(`<circle cx="${x + jx}" cy="${y}" r="16" fill="#d98a52" opacity="0.35"/>`);
      marks.push(`<path d="M${x - 12},${y - 8} A15,15 0 0 1 ${x + 4},${y - 15}" fill="none" stroke="#f2c290" stroke-width="2" opacity="0.7"/>`);
      marks.push(`<circle cx="${x + jx}" cy="${(y + 3).toFixed(1)}" r="13" fill="none" stroke="${dimple}" stroke-width="1.5" opacity="0.5"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="hcp-g" cx="40%" cy="35%" r="90%">
      <stop offset="0%" stop-color="#cf7c46"/>
      <stop offset="100%" stop-color="#7c421e"/>
    </radialGradient>
  </defs>
  <rect width="320" height="320" fill="url(#hcp-g)"/>
  ${marks.join('\n  ')}
</svg>`;
}
