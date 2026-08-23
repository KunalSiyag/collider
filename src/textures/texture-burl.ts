export interface TextureBurlOptions {
  base?: string;
  swirl?: string;
}

export function createTextureBurl(options: TextureBurlOptions = {}): string {
  const { base = '#6b4423', swirl = '#d2a15f' } = options;
  const rings: string[] = [];
  let seed = 31;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let c = 0; c < 7; c++) {
    const cx = rnd() * 300 + 10;
    const cy = rnd() * 300 + 10;
    for (let r = 6; r < 60; r += 7 + rnd() * 6) {
      rings.push(
        `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${r}" ry="${(r * (0.55 + rnd() * 0.5)).toFixed(1)}" transform="rotate(${(rnd() * 180).toFixed(0)} ${cx.toFixed(1)} ${cy.toFixed(1)})" fill="none" stroke="${swirl}" stroke-width="${(1 + rnd() * 2.5).toFixed(1)}" opacity="${(0.2 + rnd() * 0.35).toFixed(2)}"/>`,
      );
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="burl-f"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" seed="8"/><feDisplacementMap in="SourceGraphic" scale="26"/></filter>
  </defs>
  <rect width="320" height="320" fill="${base}"/>
  <g filter="url(#burl-f)">
    ${rings.join('\n    ')}
  </g>
</svg>`;
}
