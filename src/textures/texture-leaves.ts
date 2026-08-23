export interface TextureLeavesOptions {
  base?: string;
  leaf?: string;
}

export function createTextureLeaves(options: TextureLeavesOptions = {}): string {
  const { base = '#1c2a12', leaf = '#4e7a2e' } = options;
  let seed = 199;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const leaves: string[] = [];
  for (let i = 0; i < 46; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const s = 0.6 + rnd() * 1.1;
    const rot = rnd() * 360;
    const c = rnd() < 0.5 ? leaf : rnd() < 0.5 ? '#6b9c42' : '#37591f';
    leaves.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)}) scale(${s.toFixed(2)})" opacity="${(0.75 + rnd() * 0.25).toFixed(2)}">
      <path d="M0,26 C-16,10 -14,-14 0,-28 C14,-14 16,10 0,26 Z" fill="${c}"/>
      <line x1="0" y1="24" x2="0" y2="-24" stroke="#a8cc7d" stroke-width="1.2" opacity="0.6"/>
    </g>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${leaves.join('\n  ')}
</svg>`;
}
