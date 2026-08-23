export interface TextureDamascusSteelOptions {
  light?: string;
  dark?: string;
}

export function createTextureDamascusSteel(options: TextureDamascusSteelOptions = {}): string {
  const { light = '#c8d0d8', dark = '#4a525c' } = options;
  const bands: string[] = [];
  for (let i = -2; i < 18; i++) {
    let y = i * 20;
    let top = `M-10,${y} `;
    for (let x = -10; x <= 340; x += 25) {
      const yy = y + Math.sin(x * 0.035 + i * 0.8) * 12 + Math.cos(x * 0.09 + i) * 5;
      top += `${x},${yy.toFixed(1)} `;
    }
    bands.push(`<polygon points="${top} 350,350 -10,350" fill="${i % 2 === 0 ? light : dark}" opacity="0.85"/>`);
    bands.push(`<polyline points="${top}" stroke="#eef4fa" stroke-width="1" fill="none" opacity="0.4"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="dms-g" x1="0" y1="0" x2="1" y2="0.3">
      <stop offset="0" stop-color="#9aa4ae"/>
      <stop offset="0.45" stop-color="#6a7480"/>
      <stop offset="1" stop-color="#b8c2cc"/>
    </linearGradient>
    <filter id="dms-n"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="131"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#dms-g)"/>
  ${bands.join('\n  ')}
  <rect width="320" height="320" fill="#fff" filter="url(#dms-n)" opacity="0.3"/>
</svg>`;
}
