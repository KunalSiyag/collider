export interface TextureCondensationOptions {
  glass?: string;
  bead?: string;
}

export function createTextureCondensation(options: TextureCondensationOptions = {}): string {
  const { glass = '#3a4a42', bead = '#cfe8dd' } = options;
  let seed = 239;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const mist: string[] = [];
  for (let i = 0; i < 18; i++) {
    mist.push(`<ellipse cx="${(rnd() * 320).toFixed(1)}" cy="${(rnd() * 320).toFixed(1)}" rx="${(30 + rnd() * 70).toFixed(0)}" ry="${(20 + rnd() * 50).toFixed(0)}" fill="#fff" opacity="0.05"/>`);
  }
  const beads: string[] = [];
  for (let i = 0; i < 420; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 0.7 + rnd() * 2.4;
    beads.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${bead}" opacity="${(0.25 + rnd() * 0.5).toFixed(2)}"/>`);
    if (r > 2) {
      beads.push(`<circle cx="${(x - r * 0.3).toFixed(1)}" cy="${(y - r * 0.3).toFixed(1)}" r="${(r * 0.35).toFixed(1)}" fill="#fff" opacity="0.8"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${glass}"/>
  ${mist.join('\n  ')}
  ${beads.join('\n  ')}
</svg>`;
}
