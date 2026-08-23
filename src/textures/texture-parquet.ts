export interface TextureParquetOptions {
  plank?: string;
  seam?: string;
}

export function createTextureParquet(options: TextureParquetOptions = {}): string {
  const { plank = '#9c7040', seam = '#5a3d1e' } = options;
  const blocks: string[] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const x = col * 80;
      const y = row * 80;
      const horizontal = (row + col) % 2 === 0;
      for (let i = 0; i < 4; i++) {
        const tone = ((row * 7 + col * 3 + i * 11) % 4) * 0.06;
        blocks.push(horizontal
          ? `<rect x="${x}" y="${y + i * 20}" width="80" height="19" fill="#b08050" opacity="${(0.85 + tone).toFixed(2)}"/>`
          : `<rect x="${x + i * 20}" y="${y}" width="19" height="80" fill="#b08050" opacity="${(0.85 + tone).toFixed(2)}"/>`);
      }
      for (let g = 1; g < 4; g++) {
        blocks.push(horizontal
          ? `<line x1="${x}" y1="${y + g * 20}" x2="${x + 80}" y2="${y + g * 20}" stroke="${seam}" stroke-width="1.4" opacity="0.8"/>`
          : `<line x1="${x + g * 20}" y1="${y}" x2="${x + g * 20}" y2="${y + 80}" stroke="${seam}" stroke-width="1.4" opacity="0.8"/>`);
      }
      blocks.push(`<rect x="${x}" y="${y}" width="80" height="80" fill="none" stroke="${seam}" stroke-width="2"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="prq-f"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.35" numOctaves="2" seed="89"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${plank}"/>
  ${blocks.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#prq-f)" opacity="0.4"/>
</svg>`;
}
