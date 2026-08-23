export interface TextureInkWashOptions {
  paper?: string;
  ink?: string;
}

export function createTextureInkWash(options: TextureInkWashOptions = {}): string {
  const { paper = '#f0ece0', ink = '#2a3038' } = options;
  let seed = 443;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const washes: string[] = [];
  for (let i = 0; i < 16; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const rx = 30 + rnd() * 80;
    const ry = 18 + rnd() * 50;
    washes.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" transform="rotate(${(rnd() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${ink}" opacity="${(0.05 + rnd() * 0.14).toFixed(2)}"/>`);
    if (rnd() > 0.5) {
      washes.push(`<path d="M${(x - rx).toFixed(1)},${y.toFixed(1)} q${rx.toFixed(1)},${(-ry * 0.8).toFixed(1)} ${(rx * 2).toFixed(1)},0" stroke="#141a22" stroke-width="3.5" fill="none" opacity="0.55"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="ink-b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="ink-n"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="151"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${paper}"/>
  <g filter="url(#ink-b)">
    ${washes.join('\n    ')}
  </g>
  <rect width="320" height="320" fill="#000" filter="url(#ink-n)" opacity="0.15"/>
</svg>`;
}
