export interface TextureOptions {
  opacity?: number;
  size?: number;
}

export function createTextureStatic(options: TextureOptions = {}): string {
  const { size = 300 } = options;
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <filter id="static-f">
    <feTurbulence type="turbulence" baseFrequency="0.75" numOctaves="1" seed="7" stitchTiles="stitch">
      <animate attributeName="seed" values="1;50;1" dur="0.6s" repeatCount="indefinite" />
    </feTurbulence>
    <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
  </filter>
  <rect width="${size}" height="${size}" fill="#000" />
  <rect width="${size}" height="${size}" filter="url(#static-f)" opacity="0.5" />
</svg>`;
}
