export interface TextureTweedOptions {
  base?: string;
  fleck?: string;
}

export function createTextureTweed(options: TextureTweedOptions = {}): string {
  const { base = '#5c584e', fleck = '#d8cfb8' } = options;
  let seed = 269;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const weave: string[] = [];
  for (let i = -2; i < 22; i++) {
    const o = i * 18;
    weave.push(`<line x1="${o}" y1="-10" x2="${o + 340}" y2="330" stroke="#7a7466" stroke-width="6" opacity="0.6"/>`);
    weave.push(`<line x1="${o + 9}" y1="-10" x2="${o + 349}" y2="330" stroke="#443f36" stroke-width="4" opacity="0.6"/>`);
    weave.push(`<line x1="${o}" y1="330" x2="${o + 340}" y2="-10" stroke="#6a6456" stroke-width="5" opacity="0.55"/>`);
  }
  const neps: string[] = [];
  for (let i = 0; i < 160; i++) {
    neps.push(`<rect x="${(rnd() * 320).toFixed(0)}" y="${(rnd() * 320).toFixed(0)}" width="${(2 + rnd() * 3).toFixed(0)}" height="2.4" rx="1" fill="${rnd() < 0.5 ? fleck : '#b04a3a'}" transform="rotate(${(rnd() * 180).toFixed(0)} ${(rnd() * 320).toFixed(0)} ${(rnd() * 320).toFixed(0)})" opacity="${(0.5 + rnd() * 0.5).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${weave.join('\n  ')}
  ${neps.join('\n  ')}
</svg>`;
}
