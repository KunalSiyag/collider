export interface TextureGlazeCrackleOptions {
  glaze?: string;
  crack?: string;
}

export function createTextureGlazeCrackle(options: TextureGlazeCrackleOptions = {}): string {
  const { glaze = '#4a6f8a', crack = '#d8e8ef' } = options;
  let seed = 257;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const web: string[] = [];
  for (let i = 0; i < 60; i++) {
    let x = rnd() * 320;
    let y = rnd() * 320;
    let a = rnd() * Math.PI * 2;
    let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
    for (let s = 0; s < 3 + Math.floor(rnd() * 5); s++) {
      a += (rnd() - 0.5) * 2.4;
      x += Math.cos(a) * (12 + rnd() * 24);
      y += Math.sin(a) * (12 + rnd() * 24);
      d += `L${x.toFixed(1)},${y.toFixed(1)} `;
    }
    web.push(`<path d="${d}" stroke="${crack}" stroke-width="${(0.6 + rnd()).toFixed(1)}" fill="none" opacity="${(0.35 + rnd() * 0.45).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="glz-g" cx="40%" cy="35%" r="90%">
      <stop offset="0%" stop-color="#6d93ad"/>
      <stop offset="100%" stop-color="#2c4a61"/>
    </radialGradient>
    <filter id="glz-n"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="83"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#glz-g)"/>
  ${web.join('\n  ')}
  <rect width="320" height="320" fill="#fff" filter="url(#glz-n)" opacity="0.3"/>
</svg>`;
}
