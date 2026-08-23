export interface PlusGridOptions {
  color?: string;
  accentColor?: string;
  size?: number;
  gap?: number;
}

export function createPlusGrid(options: PlusGridOptions = {}): string {
  const { color = '#3f3f46', accentColor = '#22d3ee', size = 640, gap = 56 } = options;
  const pluses: string[] = [];
  const arm = gap * 0.18;

  for (let y = gap / 2; y < size; y += gap) {
    for (let x = gap / 2; x < size; x += gap) {
      const isAccent =
        Math.abs(x - size / 2) < gap && Math.abs(y - size / 2) < gap * 1.2;
      const stroke = isAccent ? accentColor : color;
      const width = isAccent ? 4 : 2.5;
      pluses.push(
        `    <path d="M ${x - arm} ${y} H ${x + arm} M ${x} ${y - arm} V ${y + arm}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" />`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${pluses.join('\n')}
</svg>`;
}
