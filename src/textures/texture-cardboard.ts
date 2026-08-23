export interface TextureCardboardOptions {
  face?: string;
  flute?: string;
}

export function createTextureCardboard(options: TextureCardboardOptions = {}): string {
  const { face = '#b98d5a', flute = '#8a6236' } = options;
  const ridges: string[] = [];
  for (let x = 0; x < 320; x += 16) {
    ridges.push(`<path d="M${x},0 Q${x + 4},160 ${x},320" stroke="${flute}" stroke-width="7" fill="none"/>`);
    ridges.push(`<path d="M${x + 8},0 Q${x + 12},160 ${x + 8},320" stroke="#d3a86f" stroke-width="2.5" fill="none" opacity="0.6"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="cbd-n"><feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" seed="51"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
    <linearGradient id="cbd-g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity="0.18"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="${face}"/>
  ${ridges.join('\n  ')}
  <rect width="320" height="320" fill="url(#cbd-g)"/>
  <rect width="320" height="320" fill="#000" filter="url(#cbd-n)" opacity="0.4"/>
</svg>`;
}
