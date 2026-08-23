export interface TextureMarbleOptions {
  base?: string;
  vein?: string;
}

export function createTextureMarble(options: TextureMarbleOptions = {}): string {
  const { base = '#0f0f13', vein = '#e4e4e7' } = options;
  return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="marble-f" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="5" seed="4" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="90" xChannelSelector="R" yChannelSelector="G" result="d" />
      <feComponentTransfer in="d">
        <feFuncA type="gamma" exponent="3.2" amplitude="1" offset="0" />
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="600" height="600" fill="${base}" />
  <g filter="url(#marble-f)">
    ${Array.from({ length: 16 }, (_, i) => {
      const y = 20 + i * 38 + (i % 3) * 12;
      const w = 2 + (i % 4);
      return `<path d="M -40 ${y} C 140 ${y - 50}, 300 ${y + 60}, 660 ${y - 24}" fill="none" stroke="${vein}" stroke-width="${w}" opacity="${0.25 + (i % 4) * 0.16}" />`;
    }).join('\n    ')}
  </g>
</svg>`;
}
