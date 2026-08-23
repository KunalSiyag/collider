export interface HerringboneOptions {
  size?: number;
  stroke?: string;
  accent?: string;
  unit?: number;
}

export function createHerringbone(options: HerringboneOptions = {}): string {
  const { size = 720, stroke = '#27272a', accent = '#f472b6', unit = 36 } = options;
  const lines: string[] = [];
  const bandW = unit * 2;
  let idx = 0;

  for (let x = -bandW; x < size + bandW; x += bandW) {
    for (let y = -unit; y < size + unit; y += unit) {
      const up = (Math.floor((y + unit) / unit) + Math.floor((x + bandW) / bandW)) % 2 === 0;
      const color = idx % 11 === 0 ? accent : stroke;
      if (up) {
        lines.push(`      <line x1="${x}" y1="${y + unit}" x2="${x + bandW}" y2="${y}" />`);
      } else {
        lines.push(`      <line x1="${x}" y1="${y}" x2="${x + bandW}" y2="${y + unit}" />`);
      }
      void color;
      idx++;
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g stroke="${stroke}" stroke-width="3" opacity="0.9">
${lines.join('\n')}
  </g>
  <g stroke="${accent}" stroke-width="3">
    <line x1="${size * 0.5 - bandW}" y1="${size * 0.5 + unit}" x2="${size * 0.5 + bandW}" y2="${size * 0.5 - unit}" />
    <animate attributeName="stroke-opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite" />
  </g>
</svg>`;
}
