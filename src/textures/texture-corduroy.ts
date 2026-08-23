export interface TextureCorduroyOptions {
  ridge?: string;
  valley?: string;
}

export function createTextureCorduroy(options: TextureCorduroyOptions = {}): string {
  const { ridge = '#8b3a2f', valley = '#3c150f' } = options;
  const wales: string[] = [];
  for (let x = 0; x < 320; x += 18) {
    wales.push(`<rect x="${x}" y="0" width="12" height="320" fill="${ridge}"/>`);
    wales.push(`<rect x="${x + 2.5}" y="0" width="3" height="320" fill="#d97a5a" opacity="0.45"/>`);
    wales.push(`<rect x="${x}" y="0" width="3" height="320" fill="${valley}" opacity="0.7"/>`);
    wales.push(`<rect x="${x + 13}" y="0" width="4" height="320" fill="${valley}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="crd-v" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity="0.35"/>
      <stop offset="0.35" stop-color="#fff" stop-opacity="0.08"/>
      <stop offset="0.6" stop-color="#fff" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.4"/>
    </linearGradient>
    <filter id="crd-f"><feTurbulence type="fractalNoise" baseFrequency="0.25 0.02" numOctaves="2" seed="6"/><feDisplacementMap in="SourceGraphic" scale="2"/></filter>
  </defs>
  <rect width="320" height="320" fill="${valley}"/>
  <g filter="url(#crd-f)">
    ${wales.join('\n    ')}
    <rect width="320" height="320" fill="url(#crd-v)"/>
  </g>
</svg>`;
}
