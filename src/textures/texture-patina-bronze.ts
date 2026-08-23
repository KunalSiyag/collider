export interface TexturePatinaBronzeOptions {
  bronze?: string;
  verdigris?: string;
}

export function createTexturePatinaBronze(options: TexturePatinaBronzeOptions = {}): string {
  const { bronze = '#7c5a2e', verdigris = '#3e9c8a' } = options;
  let seed = 113;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const crust: string[] = [];
  for (let i = 0; i < 90; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 4 + rnd() * 30;
    const c = rnd() < 0.6 ? verdigris : rnd() < 0.5 ? '#63bfa9' : '#2a6b60';
    crust.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * (0.45 + rnd() * 0.75)).toFixed(1)}" transform="rotate(${(rnd() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${c}" opacity="${(0.25 + rnd() * 0.5).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="pbr-f"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed="33"/><feDisplacementMap in="SourceGraphic" scale="22"/></filter>
    <linearGradient id="pbr-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a37c3f"/>
      <stop offset="1" stop-color="#59401d"/>
    </linearGradient>
    <filter id="pbr-n"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="34"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#pbr-g)"/>
  <g filter="url(#pbr-f)">
    ${crust.join('\n    ')}
  </g>
  <rect width="320" height="320" fill="#000" filter="url(#pbr-n)" opacity="0.35"/>
</svg>`;
}
