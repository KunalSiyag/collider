export interface TextureWatercolorOptions {
  colors?: string[];
}

export function createTextureWatercolor(options: TextureWatercolorOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'] } = options;
  const blobs = colors
    .map(
      (color, i) => `
    <g filter="url(#wc-f)" opacity="0.75">
      <path fill="${color}" d="M${120 + i * 140} ${140 + (i % 2) * 180} c-70 -10 -120 40 -100 100 c18 55 90 70 150 50 c60 -20 90 -80 60 -120 c-25 -35 -70 -22 -110 -30 Z">
        <animateTransform attributeName="transform" type="rotate" values="0 ${(120 + i * 140).toFixed(0)} ${(230 + (i % 2) * 180).toFixed(0)};360 ${(120 + i * 140).toFixed(0)} ${(230 + (i % 2) * 180).toFixed(0)}" dur="${(40 + i * 14)}s" repeatCount="indefinite" />
      </path>
    </g>`,
    )
    .join('');

  return `<svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="wc-f" x="-40%" y="-40%" width="180%" height="180%">
      <feTurbulence type="fractalNoise" baseFrequency="0.024" numOctaves="4" seed="9" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="46" />
      <feGaussianBlur stdDeviation="3.5" />
    </filter>
  </defs>
  <rect width="640" height="480" fill="#f5f3ee" />${blobs}
</svg>`;
}
