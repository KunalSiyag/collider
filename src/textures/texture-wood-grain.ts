export interface TextureWoodGrainOptions {
  base?: string;
  grain?: string;
}

export function createTextureWoodGrain(options: TextureWoodGrainOptions = {}): string {
  const { base = '#8a5a2e', grain = '#5c3a1a' } = options;
  const lines: string[] = [];
  for (let i = -1; i < 15; i++) {
    let y = i * 24;
    let d = `M-10,${y} `;
    for (let x = -10; x <= 340; x += 30) {
      const wobble = Math.sin(x * 0.02 + i * 1.7) * 9 + ((x * 7 + i * 31) % 7) - 3;
      d += `${x},${(y + wobble).toFixed(1)} `;
    }
    lines.push(`<polyline points="${d}" stroke="${i % 4 === 0 ? grain : '#6e451f'}" stroke-width="${(1.5 + (i % 3)).toFixed(1)}" fill="none" opacity="0.85"/>`);
    if (i % 5 === 2) {
      const kx = ((i * 67) % 260) + 30;
      const ky = y + Math.sin(kx * 0.02 + i * 1.7) * 9;
      lines.push(`<ellipse cx="${kx}" cy="${ky.toFixed(1)}" rx="16" ry="6" fill="none" stroke="${grain}" stroke-width="2.5"/>`);
      lines.push(`<ellipse cx="${kx}" cy="${ky.toFixed(1)}" rx="6" ry="2.5" fill="${grain}"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="wgr-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9c6a38"/>
      <stop offset="1" stop-color="#75481f"/>
    </linearGradient>
    <filter id="wgr-n"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.5" numOctaves="3" seed="179"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#wgr-g)"/>
  ${lines.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#wgr-n)" opacity="0.35"/>
</svg>`;
}
