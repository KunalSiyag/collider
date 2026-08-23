export interface ShapeQuiltPatchOptions {
  colors?: string[];
  size?: number;
}

export function createShapeQuiltPatch(options: ShapeQuiltPatchOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320 } = options;
  const cell = size / 4;
  const patches: string[] = [];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const x = c * cell;
      const y = r * cell;
      const kind = (r * 3 + c) % 3;
      const a = colors[(r + c) % colors.length]!;
      const b = colors[(r + c + 1) % colors.length]!;
      if (kind === 0) {
        patches.push(
          `<polygon points="${x},${y} ${x + cell},${y} ${x},${y + cell}" fill="${a}" /><polygon points="${x + cell},${y} ${x + cell},${y + cell} ${x},${y + cell}" fill="${b}" />`,
        );
      } else if (kind === 1) {
        patches.push(
          `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${a}" opacity="0.9" />`,
        );
      } else {
        patches.push(
          `<path d="M ${x} ${y + cell} A ${cell} ${cell} 0 0 1 ${x + cell} ${y + cell} Z" fill="${a}" transform="rotate(${(r + c) % 2 === 0 ? 180 : 0} ${x + cell / 2} ${y + cell / 2}) translate(${(c % 2) * 0} ${(r % 2) * 0}) rotate(0)" fill-opacity="0.95" /><rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="none" stroke="#27272a" stroke-width="1.5" />`,
        );
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${patches.join('\n')}
</svg>`;
}
