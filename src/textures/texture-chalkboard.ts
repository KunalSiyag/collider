export interface TextureChalkboardOptions {
  board?: string;
  chalk?: string;
}

export function createTextureChalkboard(options: TextureChalkboardOptions = {}): string {
  const { board = '#22392e', chalk = '#e9e6da' } = options;
  let seed = 179;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const smudges: string[] = [];
  for (let i = 0; i < 26; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    smudges.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(25 + rnd() * 60).toFixed(0)}" ry="${(8 + rnd() * 24).toFixed(0)}" transform="rotate(${(rnd() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${chalk}" opacity="${(0.03 + rnd() * 0.07).toFixed(3)}"/>`);
  }
  const dust: string[] = [];
  for (let i = 0; i < 220; i++) {
    dust.push(`<circle cx="${(rnd() * 320).toFixed(1)}" cy="${(rnd() * 320).toFixed(1)}" r="${(0.5 + rnd()).toFixed(1)}" fill="${chalk}" opacity="${(0.1 + rnd() * 0.4).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${board}"/>
  ${smudges.join('\n  ')}
  ${dust.join('\n  ')}
</svg>`;
}
