export interface TextureDriftwoodOptions {
  wood?: string;
  grain?: string;
}

export function createTextureDriftwood(options: TextureDriftwoodOptions = {}): string {
  const { wood = '#9a8a76', grain = '#5c4f3e' } = options;
  const lines: string[] = [];
  for (let i = -1; i < 14; i++) {
    let y = i * 24;
    let d = `M-10,${y} `;
    for (let x = 0; x <= 330; x += 30) {
      d += `L${x},${(y + Math.sin(x * 0.04 + i) * 6 + ((x * 7 + i * 13) % 5) - 2).toFixed(1)} `;
    }
    lines.push(`<path d="${d}" stroke="${i % 3 === 0 ? grain : '#7a6c58'}" stroke-width="${(2 + (i % 3)).toFixed(0)}" fill="none" opacity="0.85"/>`);
    if (i % 4 === 1) {
      const kx = ((i * 53) % 280) + 20;
      lines.push(`<ellipse cx="${kx}" cy="${y}" rx="12" ry="5" fill="none" stroke="${grain}" stroke-width="2.4" opacity="0.8"/>`);
      lines.push(`<ellipse cx="${kx}" cy="${y}" rx="4" ry="2" fill="${grain}" opacity="0.8"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="drw-n"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.4" numOctaves="3" seed="107"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${wood}"/>
  ${lines.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#drw-n)" opacity="0.45"/>
</svg>`;
}
