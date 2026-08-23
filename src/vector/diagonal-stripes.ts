export interface DiagonalStripesOptions {
  color?: string;
  accentColor?: string;
  size?: number;
  gap?: number;
}

export function createDiagonalStripes(options: DiagonalStripesOptions = {}): string {
  const { color = '#1f1f23', accentColor = '#8b5cf6', size = 600, gap = 40 } = options;
  const stripes: string[] = [];
  const total = size * 2;
  let index = 0;

  for (let x = -size; x < total; x += gap) {
    const isAccent = index % 9 === 4;
    stripes.push(
      `    <rect x="${x}" y="0" width="${isAccent ? 6 : gap / 2}" height="${total}" fill="${isAccent ? accentColor : color}" transform="rotate(45 ${size / 2} ${size / 2})" />`,
    );
    index++;
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <clipPath id="stripes-clip">
      <rect x="0" y="0" width="${size}" height="${size}" />
    </clipPath>
    <g clip-path="url(#stripes-clip)">
${stripes.join('\n')}
    </g>
</svg>`;
}
