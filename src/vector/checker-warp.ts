export interface CheckerWarpOptions {
  size?: number;
  cells?: number;
  dark?: string;
  light?: string;
  accent?: string;
}

export function createCheckerWarp(options: CheckerWarpOptions = {}): string {
  const { size = 720, cells = 12, dark = '#18181b', light = '#3f3f46', accent = '#22d3ee' } = options;
  const paths: string[] = [];
  const c = size / 2;

  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      if ((row + col) % 2 !== 0) continue;
      const corners: [number, number][] = [
        [(col / cells) * size, (row / cells) * size],
        [((col + 1) / cells) * size, (row / cells) * size],
        [((col + 1) / cells) * size, ((row + 1) / cells) * size],
        [(col / cells) * size, ((row + 1) / cells) * size],
      ];
      const warped = corners.map(([x, y]) => {
        const dx = x - c;
        const dy = y - c;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const pull = 1 - (size * 0.06) / d;
        return `${(c + dx * pull).toFixed(1)},${(c + dy * pull).toFixed(1)}`;
      });
      const isAccent = row === Math.floor(cells / 2) && col === Math.floor(cells / 2);
      paths.push(`      <polygon points="${warped.join(' ')}" fill="${isAccent ? accent : light}" opacity="${isAccent ? 0.8 : 0.85}" />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="${dark}" />
${paths.join('\n')}
</svg>`;
}
