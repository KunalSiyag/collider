export interface ShapeBalloonBunchOptions {
  colors?: string[];
  size?: number;
}

export function createShapeBalloonBunch(options: ShapeBalloonBunchOptions = {}): string {
  const { colors = ['#f472b6', '#8b5cf6', '#22d3ee', '#facc15'], size = 320 } = options;
  const balloons: [number, number, number, string][] = [
    [110, 96, 40, colors[0]!],
    [180, 76, 44, colors[1]!],
    [232, 130, 36, colors[2]!],
    [150, 160, 38, colors[3]!],
  ];

  const parts = balloons
    .map(
      ([x, y, r, color], i) => `  <g>
    <animateTransform attributeName="transform" type="rotate" values="${-4 - i} ${160} ${300};${4 + i} ${160} ${300};${-4 - i} ${160} ${300}" dur="${(5 + i).toFixed(0)}s" repeatCount="indefinite" />
    <path d="M ${x} ${(y + r + 2).toFixed(0)} q 8 30 -4 60 q -10 26 2 58" fill="none" stroke="#3f3f46" stroke-width="2.5" />
    <ellipse cx="${x}" cy="${y}" rx="${r * 0.86}" ry="${r}" fill="${color}" />
    <polygon points="${x},${(y + r).toFixed(0)} ${x - 8},${(y + r + 10).toFixed(0)} ${x + 8},${(y + r + 10).toFixed(0)}" fill="${color}" />
    <ellipse cx="${x - r * 0.3}" cy="${y - r * 0.35}" rx="${r * 0.18}" ry="${r * 0.28}" fill="#ffffff" opacity="0.35" />
  </g>`,
    )
    .join('\n');

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${parts}
</svg>`;
}
