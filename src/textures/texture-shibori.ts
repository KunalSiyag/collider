export interface TextureShiboriOptions {
  indigo?: string;
  resist?: string;
}

export function createTextureShibori(options: TextureShiboriOptions = {}): string {
  const { indigo = '#28355e', resist = '#dfe6ee' } = options;
  const bands: string[] = [];
  for (let y = -10; y < 340; y += 34) {
    const wob = ((y / 34) % 2) * 8;
    let top = '';
    for (let x = -10; x <= 330; x += 20) {
      top += `${x},${(y + Math.sin(x * 0.05 + y) * 5).toFixed(1)} `;
    }
    bands.push(`<polygon points="${top}" fill="${indigo}" opacity="0.9"/>`);
    bands.push(`<polyline points="${top}" stroke="${resist}" stroke-width="${(2.4 + (y / 34) % 3).toFixed(1)}" fill="none" opacity="0.85" transform="translate(${wob / 2} 6)" filter="url(#shb-b)"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="shb-b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.8"/></filter>
    <filter id="shb-n"><feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" seed="103"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${indigo}"/>
  ${bands.join('\n  ')}
  <rect width="320" height="320" fill="#fff" filter="url(#shb-n)" opacity="0.25"/>
</svg>`;
}
