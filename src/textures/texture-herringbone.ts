export interface TextureHerringboneOptions {
  plank?: string;
  seam?: string;
}

export function createTextureHerringbone(options: TextureHerringboneOptions = {}): string {
  const { plank = '#8a5a34', seam = '#3d2712' } = options;
  const rows: string[] = [];
  const w = 60;
  const h = 20;
  for (let row = -1; row < 12; row++) {
    for (let col = -1; col < 6; col++) {
      const x = col * (w + h) + row * (w + h) * 0;
      const y = row * (h + 4);
      const tone = ((row * 5 + col * 13) % 5) * 0.05;
      rows.push(`<g transform="translate(${x} ${y})">
        <rect x="0" y="0" width="${w}" height="${h}" fill="#a06c40" opacity="${(0.85 + tone).toFixed(2)}" stroke="${seam}" stroke-width="1.2"/>
        <rect x="${h + 2}" y="${h + 4}" width="${w}" height="${h}" fill="#a06c40" opacity="${(0.75 + tone).toFixed(2)}" stroke="${seam}" stroke-width="1.2"/>
        <line x1="${h + 2}" y1="${h + 4}" x2="${w + h + 2}" y2="${h + 4}" stroke="#c99a66" stroke-width="1" opacity="0.35"/>
        <line x1="0" y1="0" x2="${w}" y2="0" stroke="#c99a66" stroke-width="1" opacity="0.45"/>
      </g>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${plank}"/>
  ${rows.join('\n  ')}
</svg>`;
}
