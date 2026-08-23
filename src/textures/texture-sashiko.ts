export interface TextureSashikoOptions {
  indigo?: string;
  stitch?: string;
}

export function createTextureSashiko(options: TextureSashikoOptions = {}): string {
  const { indigo = '#2a3f66', stitch = '#eef2f6' } = options;
  const rows: string[] = [];
  const step = 24;
  for (let y = step / 2; y < 320; y += step) {
    for (let x = -step; x < 320; x += step * 2) {
      const off = ((y / step) % 2) * step;
      rows.push(`<line x1="${x + off}" y1="${y}" x2="${x + off + step * 0.7}" y2="${y}" stroke="${stitch}" stroke-width="4" stroke-linecap="round"/>`);
      rows.push(`<line x1="${y}" y1="${x + off}" x2="${y}" y2="${x + off + step * 0.7}" stroke="${stitch}" stroke-width="4" stroke-linecap="round" opacity="0.9"/>`);
    }
  }
  for (let gy = 0; gy < 320; gy += step * 2) {
    for (let gx = 0; gx < 320; gx += step * 2) {
      rows.push(`<circle cx="${gx + step}" cy="${gy + step}" r="5.5" fill="none" stroke="${stitch}" stroke-width="3" opacity="0.85"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="ssh-n"><feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="173"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${indigo}"/>
  ${rows.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#ssh-n)" opacity="0.3"/>
</svg>`;
}
