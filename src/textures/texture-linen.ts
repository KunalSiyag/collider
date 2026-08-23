export interface TextureLinenOptions {
  warp?: string;
  weft?: string;
}

export function createTextureLinen(options: TextureLinenOptions = {}): string {
  const { warp = '#d8d2c4', weft = '#b8b0a0' } = options;
  const lines: string[] = [];
  for (let i = 0; i < 320; i += 4) {
    lines.push(`<line x1="0" y1="${i}" x2="320" y2="${i}" stroke="${weft}" stroke-width="2.4" opacity="0.8"/>`);
    lines.push(`<line x1="${i}" y1="0" x2="${i}" y2="320" stroke="${warp}" stroke-width="1.6" opacity="0.7"/>`);
    if (i % 16 === 0) {
      lines.push(`<line x1="0" y1="${i + 1.5}" x2="320" y2="${i + 1.5}" stroke="#f3efe6" stroke-width="0.8" opacity="0.5"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="lin-f"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="14"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="#cfc8ba"/>
  ${lines.join('\n  ')}
  <rect width="320" height="320" fill="#807a6c" filter="url(#lin-f)" opacity="0.35"/>
</svg>`;
}
