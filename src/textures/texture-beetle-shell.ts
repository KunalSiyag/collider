export interface TextureBeetleShellOptions {
  base?: string;
  sheen?: string;
}

export function createTextureBeetleShell(options: TextureBeetleShellOptions = {}): string {
  const { base = '#1c4a38', sheen = '#6ad8a8' } = options;
  const striae: string[] = [];
  for (let x = -10; x < 340; x += 22) {
    let d = `M${x},-10 `;
    for (let y = -10; y <= 340; y += 40) {
      d += `L${(x + Math.sin(y * 0.03 + x) * 4).toFixed(1)},${y} `;
    }
    striae.push(`<polyline points="${d.replace('M', '').trim()}" fill="none" stroke="#0d2419" stroke-width="5" opacity="0.8"/>`);
    striae.push(`<polyline points="${d.replace('M', '').trim()}" fill="none" stroke="${sheen}" stroke-width="1.6" opacity="0.55"/>`);
    for (let y = 12; y < 320; y += 26) {
      striae.push(`<circle cx="${x + Math.sin(y * 0.03 + x) * 4}" cy="${y}" r="2" fill="#a8f0cc" opacity="0.35"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="btl-g" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stop-color="#2c6b50"/>
      <stop offset="0.45" stop-color="#123324"/>
      <stop offset="0.7" stop-color="#3f8a68"/>
      <stop offset="1" stop-color="#173c2c"/>
    </linearGradient>
    <filter id="btl-n"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="167"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#btl-g)"/>
  ${striae.join('\n  ')}
  <rect width="320" height="320" fill="#fff" filter="url(#btl-n)" opacity="0.25"/>
</svg>`;
}
