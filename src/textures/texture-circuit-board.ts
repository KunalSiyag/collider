export interface TextureCircuitBoardOptions {
  board?: string;
  trace?: string;
}

export function createTextureCircuitBoard(options: TextureCircuitBoardOptions = {}): string {
  const { board = '#0e4a2e', trace = '#d8b84a' } = options;
  let seed = 431;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const paths: string[] = [];
  for (let i = 0; i < 34; i++) {
    let x = rnd() * 320;
    let y = rnd() * 320;
    const horizFirst = rnd() > 0.5;
    let d = `M${x.toFixed(1)},${y.toFixed(1)} L${(x += (horizFirst ? 1 : -1) * (30 + rnd() * 70)).toFixed(1)},${y.toFixed(1)}`;
    for (let s = 0; s < 3; s++) {
      d += ` L${x.toFixed(1)},${(y += (rnd() > 0.5 ? 1 : -1) * (24 + rnd() * 50)).toFixed(1)} L${(x += (rnd() > 0.5 ? 1 : -1) * (26 + rnd() * 60)).toFixed(1)},${y.toFixed(1)}`;
    }
    paths.push(`<path d="${d}" stroke="${trace}" stroke-width="2.2" fill="none" opacity="0.9"/>`);
    paths.push(`<circle cx="${d.match(/M(-?[\d.]+),(-?[\d.]+)/)?.[1] ?? x}" cy="${y}" r="0" fill="none"/>`);
    paths.push(`<circle cx="${(x).toFixed(1)}" cy="${y.toFixed(1)}" r="4.6" fill="${board}" stroke="${trace}" stroke-width="2"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${board}"/>
  <filter id="ckt-n"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="137"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  <rect width="320" height="320" fill="#000" filter="url(#ckt-n)" opacity="0.4"/>
  ${paths.join('\n  ')}
</svg>`;
}
