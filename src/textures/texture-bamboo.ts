export interface TextureBambooOptions {
  culm?: string;
  node?: string;
  highlight?: string;
}

export function createTextureBamboo(options: TextureBambooOptions = {}): string {
  const { culm = '#65a30d', node = '#3f6212', highlight = '#bef264' } = options;
  const stalks: string[] = [];
  const widths = [54, 40, 66];
  for (let c = 0; c < 3; c++) {
    const x = 30 + c * 105;
    const w = widths[c];
    stalks.push(`<rect x="${x}" y="-10" width="${w}" height="340" rx="${w / 2}" fill="${culm}"/>`);
    stalks.push(`<rect x="${x + w * 0.12}" y="-10" width="${w * 0.2}" height="340" rx="${w * 0.1}" fill="${highlight}" opacity="0.35"/>`);
    stalks.push(`<rect x="${x + w * 0.75}" y="-10" width="${w * 0.08}" height="340" fill="#000000" opacity="0.15"/>`);
    for (let ny = 30; ny < 320; ny += 90 + c * 12) {
      stalks.push(`<ellipse cx="${x + w / 2}" cy="${ny}" rx="${w / 2}" ry="5" fill="${node}"/>`);
      stalks.push(`<ellipse cx="${x + w / 2}" cy="${ny + 3}" rx="${w / 2 - 2}" ry="3" fill="${culm}" opacity="0.6"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="bb-f"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.35" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter>
  </defs>
  <rect width="320" height="320" fill="#1a2e05"/>
  <g filter="url(#bb-f)">${stalks.join('\n  ')}</g>
</svg>`;
}
