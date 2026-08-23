export interface TexturePaisleyOptions {
  base?: string;
  motif?: string;
}

export function createTexturePaisley(options: TexturePaisleyOptions = {}): string {
  const { base = '#2a1a3e', motif = '#d98cb3' } = options;
  let seed = 271;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const drops: string[] = [];
  for (let i = 0; i < 18; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const s = 0.5 + rnd() * 0.9;
    const rot = (rnd() * 360).toFixed(0);
    drops.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot}) scale(${s.toFixed(2)})">
      <path d="M0,40 C-26,22 -24,-12 -6,-30 C-2,-34 2,-34 4,-28 C14,-8 16,20 0,40 Z" fill="${motif}" stroke="#7a3f63" stroke-width="1.6"/>
      <path d="M-2,30 C-14,16 -13,-6 -3,-22" fill="none" stroke="#7a3f63" stroke-width="1.4"/>
      <circle cx="0" cy="-10" r="4.5" fill="#8fd4b0"/>
      <circle cx="-6" cy="6" r="2.4" fill="#e8c86a"/>
      <circle cx="5" cy="12" r="2.4" fill="#e8c86a"/>
    </g>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${drops.join('\n  ')}
</svg>`;
}
