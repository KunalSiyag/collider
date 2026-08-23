export interface TextureHalftoneOptions {
  color?: string;
  size?: number;
}

export function createTextureHalftone(options: TextureHalftoneOptions = {}): string {
  const { color = '#fafafa', size = 480 } = options;
  const dots: string[] = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const t = 1 - Math.hypot(x - 4.5, y - 4.5) / 7;
      if (t <= 0.05) continue;
      dots.push(
        `    <circle cx="${x * size / 10 + size / 20}" cy="${y * size / 10 + size / 20}" r="${(t * size / 22).toFixed(1)}" fill="${color}" />`,
      );
    }
  }
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#09090b" />
${dots.join('\n')}
</svg>`;
}
