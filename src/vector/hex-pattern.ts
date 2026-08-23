export interface HexPatternOptions {
  stroke?: string;
  accent?: string;
  accentCells?: number[];
  size?: number;
  cellSize?: number;
}

function hexPoints(cx: number, cy: number, r: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    points.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return points.join(' ');
}

export function createHexPattern(options: HexPatternOptions = {}): string {
  const {
    stroke = '#27272a',
    accent = '#8b5cf6',
    accentCells = [7, 18, 24, 33],
    size = 720,
    cellSize = 40,
  } = options;

  const hexes: string[] = [];
  const width = Math.sqrt(3) * cellSize;
  const heightStep = cellSize * 1.5;
  let index = 0;

  for (let row = 0; heightStep * row < size + cellSize; row++) {
    for (let col = 0; width * col < size + width; col++) {
      const cx = width * col + (row % 2 === 0 ? 0 : width / 2);
      const cy = heightStep * row;
      if (cx > size + width || cy > size) continue;
      const isAccent = accentCells.includes(index);
      hexes.push(
        `    <polygon points="${hexPoints(cx, cy, cellSize * 0.92)}" fill="${isAccent ? accent : 'none'}" fill-opacity="${isAccent ? 0.25 : 0}" stroke="${isAccent ? accent : stroke}" stroke-width="${isAccent ? 1.5 : 1}" />`,
      );
      index++;
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${hexes.join('\n')}
</svg>`;
}
