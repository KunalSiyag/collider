export interface SnakeScalesOptions {
  size?: number;
  rows?: number;
  base?: string;
  accent?: string;
}

export function createSnakeScales(options: SnakeScalesOptions = {}): string {
  const { size = 720, rows = 12, base = '#27272a', accent = '#22d3ee' } = options;
  const rowH = size / rows;
  const colW = rowH * 1.15;
  const cols = Math.ceil(size / colW) + 1;
  const paths: string[] = [];

  for (let r = 0; r <= rows; r++) {
    for (let cIdx = 0; cIdx < cols; cIdx++) {
      const x = cIdx * colW + (r % 2 ? colW / 2 : 0);
      const y = r * rowH;
      const isAccent = (r * 5 + cIdx * 3) % 17 === 4;
      const color = isAccent ? accent : base;
      paths.push(`      <path d="M${x.toFixed(1)} ${y.toFixed(1)} A${(colW / 2).toFixed(1)} ${(rowH * 0.9).toFixed(1)} 0 0 0 ${(x + colW).toFixed(1)} ${y.toFixed(1)} Z" fill="${color}" fill-opacity="${isAccent ? 0.55 : 0.9}" stroke="#18181b" stroke-width="1.2"${isAccent ? '>\n        <animate attributeName="fill-opacity" values="0.55;0.2;0.55" dur="4s" repeatCount="indefinite" />\n      ' : ''} />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#101016" />
${paths.join('\n')}
</svg>`;
}
