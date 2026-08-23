export interface TextureTortoiseshellOptions {
  amber?: string;
  dark?: string;
}

export function createTextureTortoiseshell(options: TextureTortoiseshellOptions = {}): string {
  const { amber = '#c8862e', dark = '#3a1f0a' } = options;
  let seed = 367;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const blobs: string[] = [];
  for (let i = 0; i < 60; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 8 + rnd() * 30;
    const c = rnd() < 0.45 ? amber : rnd() < 0.55 ? '#8a5216' : '#e8b054';
    blobs.push(`<path d="M${x.toFixed(1)},${y.toFixed(1)} m-${r},0 a${r},${(r * 0.75).toFixed(1)} 0 1,0 ${(r * 2).toFixed(1)},0 a${r},${(r * 0.75).toFixed(1)} 0 1,0 ${(-r * 2).toFixed(1)},0" fill="${c}" stroke="${dark}" stroke-width="${(3 + rnd() * 5).toFixed(1)}" opacity="0.9"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="tor-b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <rect width="320" height="320" fill="${dark}"/>
  <g filter="url(#tor-b)">
    ${blobs.join('\n    ')}
  </g>
</svg>`;
}
