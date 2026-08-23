export interface TextureFoamBubblesOptions {
  liquid?: string;
  bubble?: string;
}

export function createTextureFoamBubbles(options: TextureFoamBubblesOptions = {}): string {
  const { liquid = '#2a6f77', bubble = '#e8fbff' } = options;
  let seed = 241;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const circles: string[] = [];
  for (let i = 0; i < 130; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 3 + rnd() * 16;
    circles.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${bubble}" opacity="${(0.08 + rnd() * 0.18).toFixed(2)}"/>`);
    circles.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.4"/>`);
    if (r > 6) {
      circles.push(`<ellipse cx="${(x - r * 0.35).toFixed(1)}" cy="${(y - r * 0.4).toFixed(1)}" rx="${(r * 0.25).toFixed(1)}" ry="${(r * 0.16).toFixed(1)}" fill="#fff" opacity="0.9"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="foam-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3d8b93"/>
      <stop offset="1" stop-color="#17454c"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#foam-g)"/>
  ${circles.join('\n  ')}
</svg>`;
}
