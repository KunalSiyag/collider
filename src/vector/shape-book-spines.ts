export interface ShapeBookSpinesOptions {
  colors?: string[];
  size?: number;
}

export function createShapeBookSpines(options: ShapeBookSpinesOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9'], size = 320 } = options;
  const widths = [26, 38, 22, 44, 30, 36];
  const spines: string[] = [];
  let x = 28;

  widths.forEach((w, i) => {
    const h = 190 + ((i * 29) % 60);
    const lean = i === 3 ? -6 : 0;
    spines.push(
      `  <g transform="rotate(${lean} ${x + w / 2} 280)">
    <rect x="${x}" y="${(290 - h).toFixed(0)}" width="${w}" height="${h}" rx="4" fill="${colors[i % colors.length]}">
      <animate attributeName="opacity" values="1;0.75;1" dur="${(3 + i * 0.6).toFixed(1)}s" repeatCount="indefinite" />
    </rect>
    <line x1="${x + 6}" y1="${(306 - h).toFixed(0)}" x2="${x + w - 6}" y2="${(306 - h).toFixed(0)}" stroke="#0b0b10" stroke-width="3" />
    <line x1="${x + 6}" y1="${(316 - h).toFixed(0)}" x2="${x + w - 6}" y2="${(316 - h).toFixed(0)}" stroke="#0b0b10" stroke-width="3" />
  </g>`,
    );
    x += w + 6;
  });

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${spines.join('\n')}
<rect x="20" y="288" width="280" height="14" rx="7" fill="#3f3f46" />
</svg>`;
}
