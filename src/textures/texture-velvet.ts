export interface TextureVelvetOptions {
  base?: string;
  sheen?: string;
}

export function createTextureVelvet(options: TextureVelvetOptions = {}): string {
  const { base = '#4a1259', sheen = '#c86bd8' } = options;
  let seed = 47;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const wisps: string[] = [];
  for (let i = 0; i < 60; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    wisps.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(20 + rnd() * 45).toFixed(0)}" ry="${(6 + rnd() * 14).toFixed(0)}" transform="rotate(${(rnd() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${sheen}" opacity="${(0.03 + rnd() * 0.06).toFixed(3)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="vlv-g" cx="38%" cy="30%" r="85%">
      <stop offset="0%" stop-color="${sheen}" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="#7a2b8f" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#16041c" stop-opacity="0.75"/>
    </radialGradient>
    <filter id="vlv-f"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${base}"/>
  ${wisps.join('\n  ')}
  <rect width="320" height="320" fill="url(#vlv-g)"/>
  <rect width="320" height="320" fill="${base}" filter="url(#vlv-f)" opacity="0.6"/>
</svg>`;
}
