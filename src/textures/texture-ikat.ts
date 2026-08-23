export interface TextureIkatOptions {
  base?: string;
  dye?: string;
}

export function createTextureIkat(options: TextureIkatOptions = {}): string {
  const { base = '#c8b28a', dye = '#8a3b3b' } = options;
  const bands: string[] = [];
  for (let y = -10; y < 340; y += 44) {
    for (let x = -10; x < 340; x += 56) {
      const tone = ((x + y) / 56) % 2 === 0 ? dye : '#4a6b5a';
      bands.push(`<path d="M${x},${y + 22} L${x + 28},${y} L${x + 56},${y + 22} L${x + 28},${y + 44} Z" fill="${tone}" opacity="0.85" filter="url(#ikt-b)"/>`);
      bands.push(`<circle cx="${(x + 28).toFixed(0)}" cy="${(y + 22).toFixed(0)}" r="6" fill="#f0e6cc" filter="url(#ikt-b)"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="ikt-b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter>
    <filter id="ikt-n"><feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="97"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${base}"/>
  ${bands.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#ikt-n)" opacity="0.35"/>
</svg>`;
}
