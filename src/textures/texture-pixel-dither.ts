export interface TexturePixelDitherOptions {
  dark?: string;
  light?: string;
}

export function createTexturePixelDither(options: TexturePixelDitherOptions = {}): string {
  const { dark = '#101418', light = '#8ae86a' } = options;
  const px: string[] = [];
  const cell = 8;
  for (let y = 0; y < 320; y += cell) {
    for (let x = 0; x < 320; x += cell) {
      const t = (x + y) / 640 + ((x / cell) % 2) * 0.02;
      const on =
        t > 0.95 ? true :
        t > 0.75 ? (x / cell + y / cell) % 2 === 0 :
        t > 0.55 ? (y / cell) % 2 === 1 :
        t > 0.35 ? ((x / cell) % 2 === 0 && (y / cell) % 2 === 0) :
        false;
      if (on) {
        px.push(`<rect x="${x}" y="${y}" width="${cell - 1}" height="${cell - 1}" fill="${light}"/>`);
      }
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${dark}"/>
  ${px.join('\n  ')}
</svg>`;
}
