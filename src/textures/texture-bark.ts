export interface TextureBarkOptions {
  ridge?: string;
  furrow?: string;
}

export function createTextureBark(options: TextureBarkOptions = {}): string {
  const { ridge = '#5c4033', furrow = '#2e1f16' } = options;
  const ridges: string[] = [];
  for (let x = -10; x < 330; x += 26) {
    const wobble: string[] = [];
    for (let y = 0; y <= 320; y += 40) {
      const dx = Math.sin(y * 0.05 + x) * 7 + ((x * 13 + y * 7) % 9 - 4);
      wobble.push(`${dx.toFixed(1)},${y}`);
    }
    ridges.push(`<polyline points="${wobble.join(' ')}" stroke="${furrow}" stroke-width="14" fill="none" stroke-linecap="round" opacity="0.85"/>`);
    ridges.push(`<polyline points="${wobble.join(' ')}" stroke="${ridge}" stroke-width="9" fill="none" stroke-linecap="round"/>`);
    ridges.push(`<polyline points="${wobble.join(' ')}" stroke="#8a6642" stroke-width="2.5" fill="none" opacity="0.5" transform="translate(-4 0)"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="bk-f"><feTurbulence type="fractalNoise" baseFrequency="0.04 0.12" numOctaves="3" seed="9"/><feDisplacementMap in="SourceGraphic" scale="10"/></filter>
  </defs>
  <rect width="320" height="320" fill="${furrow}"/>
  <g filter="url(#bk-f)">${ridges.join('\n  ')}</g>
</svg>`;
}
