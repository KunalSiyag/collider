export interface TextureCrumpledPaperOptions {
  base?: string;
  shade?: string;
}

export function createTextureCrumpledPaper(options: TextureCrumpledPaperOptions = {}): string {
  const { base = '#e8e2d2', shade = '#9a927d' } = options;
  let seed = 149;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const facets: string[] = [];
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < 90; i++) {
    pts.push([rnd() * 320, rnd() * 320]);
  }
  for (let i = 0; i < 70; i++) {
    const [x, y] = pts[i];
    const n1 = pts[(i * 7 + 13) % pts.length];
    const n2 = pts[(i * 11 + 29) % pts.length];
    const lift = rnd();
    facets.push(`<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${n1[0].toFixed(1)},${n1[1].toFixed(1)} ${n2[0].toFixed(1)},${n2[1].toFixed(1)}" fill="${lift > 0.5 ? '#fff' : shade}" opacity="${(Math.abs(lift - 0.5) * 0.8).toFixed(2)}"/>`);
    facets.push(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${n1[0].toFixed(1)}" y2="${n1[1].toFixed(1)}" stroke="${shade}" stroke-width="0.6" opacity="0.35"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${facets.join('\n  ')}
</svg>`;
}
