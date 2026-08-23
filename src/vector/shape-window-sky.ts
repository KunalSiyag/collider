export interface ShapeWindowSkyOptions {
  colors?: string[];
  size?: number;
}

export function createShapeWindowSky(options: ShapeWindowSkyOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320 } = options;
  const panes: string[] = [];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 2; c++) {
      const x = 60 + c * 105;
      const y = 50 + r * 78;
      panes.push(
        `  <rect x="${x}" y="${y}" width="95" height="68" rx="4" fill="${(r + c) % 2 === 0 ? colors[1] : colors[0]}" opacity="${(0.25 + ((r * 2 + c) % 4) * 0.12).toFixed(2)}" stroke="#3f3f46" stroke-width="6">
    <animate attributeName="opacity" values="${(0.25 + ((r * 2 + c) % 4) * 0.12).toFixed(2)};${(0.5 + ((r * 2 + c) % 3) * 0.1).toFixed(2)};${(0.25 + ((r * 2 + c) % 4) * 0.12).toFixed(2)}" dur="${(5 + r * 2 + c).toFixed(0)}s" repeatCount="indefinite" />
  </rect>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<rect x="44" y="34" width="232" height="252" rx="10" fill="#0b0b10" stroke="#27272a" stroke-width="8" />
<circle cx="230" cy="90" r="26" fill="#facc15"><animate attributeName="cy" values="90;84;90" dur="8s" repeatCount="indefinite" /></circle>
${panes.join('\n')}
<rect x="30" y="286" width="260" height="14" rx="7" fill="#3f3f46" />
</svg>`;
}
