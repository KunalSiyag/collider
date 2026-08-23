export interface TextureFurOptions {
  base?: string;
  tip?: string;
}

export function createTextureFur(options: TextureFurOptions = {}): string {
  const { base = '#4a3220', tip = '#d8b98a' } = options;
  let seed = 97;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const hairs: string[] = [];
  for (let i = 0; i < 420; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const len = 14 + rnd() * 34;
    const bend = (rnd() - 0.5) * 18;
    hairs.push(`<path d="M${x.toFixed(1)},${(y + len).toFixed(1)} Q${(x + bend).toFixed(1)},${(y + len / 2).toFixed(1)} ${(x + bend * 1.6).toFixed(1)},${y.toFixed(1)}" stroke="${rnd() > 0.5 ? base : tip}" stroke-width="${(1 + rnd()).toFixed(1)}" fill="none" stroke-linecap="round" opacity="${(0.25 + rnd() * 0.55).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#2b1c10"/>
  ${hairs.join('\n  ')}
</svg>`;
}
