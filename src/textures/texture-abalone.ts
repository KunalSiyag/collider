export interface TextureAbaloneOptions {
  nacre?: string;
  seam?: string;
}

export function createTextureAbalone(options: TextureAbaloneOptions = {}): string {
  const { nacre = '#3f6b7a', seam = '#1a2e38' } = options;
  const bands: string[] = [];
  for (let i = -2; i < 16; i++) {
    let y = i * 24;
    let d = `M-10,${y} `;
    for (let x = -10; x <= 340; x += 40) {
      d += `Q${x + 20},${(y + Math.sin(x * 0.05 + i) * 10).toFixed(1)} ${x + 40},${y} `;
    }
    const hue = ['5aa8c8', '7ac8a8', 'c8a85a', '9a7ac8', '5a8ad8'][((i % 5) + 5) % 5];
    bands.push(`<path d="${d}" stroke="#${hue}" stroke-width="${(8 + (i % 3) * 4).toFixed(0)}" fill="none" opacity="0.4"/>`);
    bands.push(`<path d="${d}" stroke="#e8f4fa" stroke-width="1.2" fill="none" opacity="0.35"/>`);
    bands.push(`<path d="${d}" stroke="${seam}" stroke-width="1.6" fill="none" opacity="0.6"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="aba-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6d9fb0"/>
      <stop offset="0.5" stop-color="#8fc4ae"/>
      <stop offset="1" stop-color="#527a96"/>
    </linearGradient>
    <filter id="aba-n"><feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="2" seed="113"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#aba-g)"/>
  ${bands.join('\n  ')}
  <rect width="320" height="320" fill="#fff" filter="url(#aba-n)" opacity="0.3"/>
</svg>`;
}
