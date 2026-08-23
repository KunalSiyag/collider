export interface TextureRustOptions {
  base?: string;
  bloom?: string;
}

export function createTextureRust(options: TextureRustOptions = {}): string {
  const { base = '#4a3226', bloom = '#b4551f' } = options;
  let seed = 67;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const patches: string[] = [];
  for (let i = 0; i < 70; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 6 + rnd() * 34;
    const c = rnd() < 0.4 ? bloom : rnd() < 0.7 ? '#8a3d16' : '#d98e3a';
    patches.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * (0.5 + rnd() * 0.7)).toFixed(1)}" transform="rotate(${(rnd() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${c}" opacity="${(0.2 + rnd() * 0.45).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="rst-f"><feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" seed="27"/><feDisplacementMap in="SourceGraphic" scale="18"/></filter>
    <filter id="rst-n"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="28"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${base}"/>
  <g filter="url(#rst-f)">
    ${patches.join('\n    ')}
  </g>
  <rect width="320" height="320" fill="#000" filter="url(#rst-n)" opacity="0.4"/>
</svg>`;
}
