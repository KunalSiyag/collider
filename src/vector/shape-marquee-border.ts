export interface ShapeMarqueeBulbsOptions {
  colors?: string[];
  size?: number;
}

export function createShapeMarqueeBulbs(options: ShapeMarqueeBulbsOptions = {}): string {
  const { colors = ['#facc15', '#f472b6', '#22d3ee'], size = 320 } = options;
  const bulbs: string[] = [];
  const positions: [number, number][] = [];

  for (let i = 0; i <= 8; i++) {
    positions.push([36 + i * 31, 30]);
    positions.push([36 + i * 31, 290]);
  }
  for (let i = 1; i < 8; i++) {
    positions.push([30, 36 + i * 31]);
    positions.push([290, 36 + i * 31]);
  }

  positions.forEach(([x, y], i) => {
    bulbs.push(
      `  <circle cx="${x}" cy="${y}" r="7" fill="${colors[i % colors.length]}"><animate attributeName="opacity" values="1;0.15;1" dur="2.4s" begin="${((i % 6) * 0.4).toFixed(1)}s" repeatCount="indefinite" /></circle>`,
    );
  });

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<rect x="14" y="14" width="292" height="292" rx="18" fill="none" stroke="#8b5cf6" stroke-width="4" />
<rect x="70" y="110" width="180" height="100" rx="12" fill="#0b0b10" stroke="#3f3f46" stroke-width="2" />
<polygon points="130,135 200,160 130,185" fill="#f472b6"><animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" /></polygon>
${bulbs.join('\n')}
</svg>`;
}
