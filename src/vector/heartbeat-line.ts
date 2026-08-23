export interface HeartbeatLineOptions {
  size?: number;
  beats?: number;
  stroke?: string;
  accent?: string;
}

export function createHeartbeatLine(options: HeartbeatLineOptions = {}): string {
  const { size = 720, beats = 4, stroke = '#27272a', accent = '#f472b6' } = options;
  const c = size / 2;
  const span = size * 0.9;
  const unit = span / beats;

  let d = `M${size * 0.05} ${c}`;
  for (let b = 0; b < beats; b++) {
    const x0 = size * 0.05 + b * unit;
    d += ` L${(x0 + unit * 0.3).toFixed(1)} ${c}`;
    d += ` L${(x0 + unit * 0.38).toFixed(1)} ${(c - 14).toFixed(1)}`;
    d += ` L${(x0 + unit * 0.46).toFixed(1)} ${(c + 52).toFixed(1)}`;
    d += ` L${(x0 + unit * 0.54).toFixed(1)} ${(c - 64).toFixed(1)}`;
    d += ` L${(x0 + unit * 0.62).toFixed(1)} ${(c + 22).toFixed(1)}`;
    d += ` L${(x0 + unit * 0.7).toFixed(1)} ${c}`;
    d += ` L${(x0 + unit).toFixed(1)} ${c}`;
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${[1, 2, 3].map((i) => `  <line x1="0" y1="${c - i * 90}" x2="${size}" y2="${c - i * 90}" stroke="${stroke}" stroke-width="0.6" opacity="0.5" />
  <line x1="0" y1="${c + i * 90}" x2="${size}" y2="${c + i * 90}" stroke="${stroke}" stroke-width="0.6" opacity="0.5" />`).join('\n')}
  <path d="${d}" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">
    <animate attributeName="stroke-opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite" />
  </path>
  <circle r="5" fill="${accent}">
    <animateMotion dur="5s" repeatCount="indefinite" path="${d}" />
  </circle>
</svg>`;
}
