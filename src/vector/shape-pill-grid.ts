export interface ShapePillGridOptions {
  colors?: string[];
  size?: number;
  gap?: number;
}

export function createShapePillGrid(options: ShapePillGridOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#facc15'], size = 560, gap = 18 } = options;
  const pills: string[] = [];
  let s = 41;
  const rand = () => ((s = (s * 48271) % 2147483647) / 2147483647);

  for (let y = gap; y < size - gap; y += gap + 26) {
    for (let x = gap; x < size - gap; x += gap + 52) {
      if (rand() > 0.72) continue;
      const color = colors[Math.floor(rand() * colors.length)]!;
      const w = 40 + rand() * 44;
      pills.push(
        `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="26" rx="13" fill="${color}" opacity="${(0.35 + rand() * 0.6).toFixed(2)}"/>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0f0f13"/>
${pills.join('\n')}
</svg>`;
}
