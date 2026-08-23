export interface TextureGrainOptions {
  intensity?: number;
}

export function createTextureGrain(options: TextureGrainOptions = {}): string {
  const { intensity = 0.16 } = options;
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <filter id="grain-f">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0" />
    <feComponentTransfer>
      <feFuncA type="linear" slope="${intensity * 4}" intercept="0" />
    </feComponentTransfer>
  </filter>
  <rect width="400" height="400" fill="#808080" />
  <rect width="400" height="400" filter="url(#grain-f)" style="mix-blend-mode:overlay" />
</svg>`;
}
