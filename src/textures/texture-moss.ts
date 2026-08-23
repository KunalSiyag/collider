export interface TextureMossOptions {
  base?: string;
  clump?: string;
}

export function createTextureMoss(options: TextureMossOptions = {}): string {
  const { base = '#2c3b1e', clump = '#6a8f3c' } = options;
  let seed = 191;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const tufts: string[] = [];
  for (let i = 0; i < 55; i++) {
    const cx = rnd() * 320;
    const cy = rnd() * 320;
    for (let j = 0; j < 16; j++) {
      const a = rnd() * Math.PI * 2;
      const d = rnd() * 16;
      const x = cx + Math.cos(a) * d;
      const y = cy + Math.sin(a) * d;
      const c = rnd() < 0.5 ? clump : rnd() < 0.5 ? '#87ab52' : '#4d6e2a';
      tufts.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1 + rnd() * 2.6).toFixed(1)}" fill="${c}" opacity="${(0.5 + rnd() * 0.45).toFixed(2)}"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${tufts.join('\n  ')}
</svg>`;
}
