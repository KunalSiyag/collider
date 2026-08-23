export interface TextureDunesOptions {
  light?: string;
  dark?: string;
}

export function createTextureDunes(options: TextureDunesOptions = {}): string {
  const { light = '#e0b97a', dark = '#8f6a34' } = options;
  const ripples: string[] = [];
  for (let y = -20; y < 340; y += 26) {
    const amp = 6 + ((y / 26) % 3) * 3;
    let up = '';
    for (let x = 0; x <= 320; x += 16) {
      const yy = y + Math.sin(x * 0.03 + y * 0.08) * amp + Math.sin(x * 0.09 + y) * (amp / 3);
      up += `${x},${yy.toFixed(1)} `;
    }
    ripples.push(`<polyline points="${up}" stroke="${dark}" stroke-width="7" fill="none" opacity="0.5"/>`);
    ripples.push(`<polyline points="${up}" stroke="${light}" stroke-width="2.5" fill="none" transform="translate(0 -4)" opacity="0.8"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="dun-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ecc98c"/>
      <stop offset="1" stop-color="#a67c40"/>
    </linearGradient>
    <filter id="dun-f"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.15" numOctaves="2" seed="73"/><feDisplacementMap in="SourceGraphic" scale="8"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#dun-g)"/>
  <g filter="url(#dun-f)">
    ${ripples.join('\n    ')}
  </g>
</svg>`;
}
