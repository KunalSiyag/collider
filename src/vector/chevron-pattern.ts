export interface ChevronPatternOptions {
  color?: string;
  accentColor?: string;
  rows?: number;
  columns?: number;
  width?: number;
}

export function createChevronPattern(options: ChevronPatternOptions = {}): string {
  const {
    color = '#27272a',
    accentColor = '#8b5cf6',
    rows = 10,
    columns = 14,
    width = 900,
  } = options;

  const chevrons: string[] = [];
  const cell = width / columns;
  const height = rows * cell * 0.9;
  const v = cell * 0.32;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const x = col * cell;
      const y = row * cell * 0.9;
      const isAccent = (row * columns + col) % 11 === 5;
      const stroke = isAccent ? accentColor : color;
      chevrons.push(
        `    <path d="M ${x} ${y} L ${x + cell / 2} ${(y + v).toFixed(1)} L ${x + cell} ${y} L ${x + cell} ${(y + v * 0.9).toFixed(1)} L ${x + cell / 2} ${(y + v * 1.9).toFixed(1)} L ${x} ${(y + v * 0.9).toFixed(1)} Z" fill="${stroke}" opacity="${isAccent ? 0.95 : 0.55}" />`,
      );
    }
  }

  return `<svg viewBox="0 0 ${width} ${height.toFixed(0)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${chevrons.join('\n')}
</svg>`;
}
