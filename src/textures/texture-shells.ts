export interface TextureShellsOptions {
  sand?: string;
  shell?: string;
}

export function createTextureShells(options: TextureShellsOptions = {}): string {
  const { sand = '#e2d3ae', shell = '#f5ead0' } = options;
  let seed = 293;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const specks: string[] = [];
  for (let i = 0; i < 200; i++) {
    specks.push(`<circle cx="${(rnd() * 320).toFixed(1)}" cy="${(rnd() * 320).toFixed(1)}" r="${(0.6 + rnd() * 1.4).toFixed(1)}" fill="#b8a377" opacity="${(0.3 + rnd() * 0.4).toFixed(2)}"/>`);
  }
  const fans: string[] = [];
  for (let i = 0; i < 22; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const s = 0.45 + rnd() * 0.75;
    const rot = (rnd() * 360).toFixed(0);
    fans.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot}) scale(${s.toFixed(2)})">
      <path d="M-27,0 A27,27 0 0 1 27,0 L0,4 Z" fill="${shell}" stroke="#b89a6e" stroke-width="1.4"/>
      <path d="M0,0 L0,-28 M0,0 L-19,-20 M0,0 L19,-20 M0,0 L-9,-26 M0,0 L9,-26" stroke="#c8a97e" stroke-width="1.4"/>
    </g>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${sand}"/>
  ${specks.join('\n  ')}
  ${fans.join('\n  ')}
</svg>`;
}
