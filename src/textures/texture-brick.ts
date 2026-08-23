export interface TextureBrickOptions {
  brick?: string;
  mortar?: string;
}

export function createTextureBrick(options: TextureBrickOptions = {}): string {
  const { brick = '#9a3412', mortar = '#d6d3d1' } = options;
  const rows: string[] = [];
  const bw = 76, bh = 34, gap = 5;
  for (let row = 0; row < 10; row++) {
    const offset = row % 2 ? -bw / 2 : 0;
    for (let col = -1; col < 8; col++) {
      const x = col * (bw + gap) + offset;
      const y = row * (bh + gap);
      const shadeRow = row % 3 === 0 ? 0.92 : 1;
      rows.push(`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="2.5" fill="${brick}" opacity="${shadeRow}"/>`);
    }
  }
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="480" height="480" fill="${mortar}"/>
${rows.join('\n')}
</svg>`;
}
