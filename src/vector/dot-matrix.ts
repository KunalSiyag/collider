export interface DotMatrixOptions {
  dot?: string;
  accent?: string;
  size?: number;
  gap?: number;
}

export function createDotMatrix(options: DotMatrixOptions = {}): string {
  const { dot = '#3f3f46', accent = '#8b5cf6', size = 640, gap = 32 } = options;
  const circles: string[] = [];
  const center = size / 2;
  const maxDistance = Math.hypot(center, center);

  for (let y = gap / 2; y < size; y += gap) {
    for (let x = gap / 2; x < size; x += gap) {
      const distance = Math.hypot(x - center, y - center);
      const t = 1 - distance / maxDistance;
      if (t < 0.12) continue;
      const radius = (0.9 + t * 2.4).toFixed(2);
      const isAccent = Math.abs(x - center) < gap && Math.abs(y - center) < gap * 1.5;
      const fill = isAccent ? accent : dot;
      const opacity = (0.25 + t * 0.75).toFixed(2);
      circles.push(`    <circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" opacity="${opacity}" />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${circles.join('\n')}
</svg>`;
}
