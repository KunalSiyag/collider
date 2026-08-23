export interface TextureBurlapOptions {
  thread?: string;
  gap?: string;
}

export function createTextureBurlap(options: TextureBurlapOptions = {}): string {
  const { thread = '#c9a86a', gap = '#5e4726' } = options;
  const cells: string[] = [];
  for (let y = 0; y < 320; y += 14) {
    for (let x = 0; x < 320; x += 14) {
      const wobble = ((x * 31 + y * 17) % 5) - 2;
      cells.push(`<rect x="${x + 2}" y="${y + 2 + wobble * 0.4}" width="10" height="10" rx="2" fill="${thread}" opacity="${x % 28 === 2 ? 0.95 : 0.8}"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="blp-f"><feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="2" seed="21"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter>
  </defs>
  <rect width="320" height="320" fill="${gap}"/>
  <g filter="url(#blp-f)">
    ${cells.join('\n    ')}
  </g>
</svg>`;
}
