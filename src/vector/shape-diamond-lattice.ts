/** Diamond Lattice — interlocking diamond grid with traveling shimmer. */
export interface DiamondLatticeOptions {
  lineColor?: string;
  accentColor?: string;
  cell?: number;
  background?: string;
}

export function createDiamondLattice(options: DiamondLatticeOptions = {}): string {
  const { lineColor = '#565e6e', accentColor = '#22d3ee', cell = 56, background = 'transparent' } = options;
  const cols = Math.ceil(1440 / cell) + 2;
  const rows = Math.ceil(720 / (cell * 0.58)) + 2;

  let cells = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cell + (r % 2 ? cell / 2 : 0) - cell;
      const y = r * cell * 0.58 - cell * 0.3;
      const phase = ((r * 7 + c * 13) % 10) / 10;
      const isAccent = (r * 5 + c * 3) % 11 === 0;
      cells += `<path d="M${x} ${y} l${cell / 2} ${-cell * 0.29} l${cell / 2} ${cell * 0.29} l${-cell / 2} ${cell * 0.29} Z"
        fill="none" stroke="${isAccent ? accentColor : lineColor}" stroke-width="${isAccent ? 2.4 : 1.4}" opacity="${isAccent ? 0.9 : 0.5}">
        <animate attributeName="opacity" values="${isAccent ? '0.25;0.95;0.25' : '0.2;0.6;0.2'}" dur="${(4 + phase * 4).toFixed(1)}s" begin="${(-phase * 4).toFixed(1)}s" repeatCount="indefinite"/>
      </path>`;
    }
  }

  return `<svg viewBox="0 0 1440 720" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="1440" height="720" fill="${background}"/>
  ${cells}
</svg>`;
}
