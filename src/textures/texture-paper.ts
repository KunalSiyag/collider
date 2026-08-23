export interface TexturePaperOptions {
  tint?: string;
}

export function createTexturePaper(options: TexturePaperOptions = {}): string {
  const { tint = '#e8e2d4' } = options;
  return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="paper-f">
      <feTurbulence type="fractalNoise" baseFrequency="0.04 0.18" numOctaves="4" seed="11" result="n" />
      <feDiffuseLighting in="n" lighting-color="${tint}" surfaceScale="1.6" diffuseConstant="1.1">
        <feDistantLight azimuth="235" elevation="62" />
      </feDiffuseLighting>
    </filter>
  </defs>
  <rect width="500" height="500" fill="${tint}" />
  <rect width="500" height="500" filter="url(#paper-f)" opacity="0.9" style="mix-blend-mode:multiply" />
</svg>`;
}
