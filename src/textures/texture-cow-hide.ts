export interface TextureCowHideOptions {
  coat?: string;
  patch?: string;
}

export function createTextureCowHide(options: TextureCowHideOptions = {}): string {
  const { coat = '#f0ece2', patch = '#1c1a18' } = options;
  let seed = 479;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const blobs: string[] = [];
  for (let i = 0; i < 9; i++) {
    const cx = rnd() * 320;
    const cy = rnd() * 320;
    let d = '';
    for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.4) {
      const r = 34 + rnd() * 42;
      d += `${a === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r * 0.8).toFixed(1)} `;
    }
    blobs.push(`<path d="${d}Z" fill="${patch}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="cow-n"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="163"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${coat}"/>
  ${blobs.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#cow-n)" opacity="0.25"/>
</svg>`;
}
