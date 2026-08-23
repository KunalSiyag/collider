export interface TextureCarbonOptions {
  color?: string;
}

export function createTextureCarbon(options: TextureCarbonOptions = {}): string {
  const { color = '#27272a' } = options;
  const weave: string[] = [];
  const cell = 32;
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const x = col * cell;
      const y = row * cell;
      const horizontal = (row + col) % 2 === 0;
      if (horizontal) {
        weave.push(
          `    <rect x="${x}" y="${y + 4}" width="${cell}" height="${cell - 8}" rx="6" fill="${color}" />
    <rect x="${x}" y="${y + 7}" width="${cell}" height="5" rx="2.5" fill="#3f3f46" opacity="0.8" />`,
        );
      } else {
        weave.push(
          `    <rect x="${x + 4}" y="${y}" width="${cell - 8}" height="${cell}" rx="6" fill="${color}" opacity="0.85" />
    <rect x="${x + 7}" y="${y}" width="5" height="${cell}" rx="2.5" fill="#3f3f46" opacity="0.7" />`,
        );
      }
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#18181b" />
${weave.join('\n')}
</svg>`;
}
