export interface ButterflyWingOptions {
  size?: number;
  stroke?: string;
  accent?: string;
}

export function createButterflyWing(options: ButterflyWingOptions = {}): string {
  const { size = 720, stroke = '#3f3f46', accent = '#f472b6' } = options;
  const cx = size / 2;

  const spots: string[] = [];
  for (const [dx, dy, r] of [[70, -90, 26], [110, -40, 16], [60, -30, 10], [130, -100, 9]] as const) {
    for (const side of [1, -1]) {
      spots.push(`      <circle cx="${(cx + side * dx).toFixed(1)}" cy="${(size / 2 + dy).toFixed(1)}" r="${r}" fill="${accent}" opacity="0.35">
        <animate attributeName="opacity" values="0.15;0.45;0.15" dur="${(4 + r / 8).toFixed(1)}s" repeatCount="indefinite" />
      </circle>`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g stroke="${stroke}" stroke-width="2" fill="#14141c">
    <path d="M${cx} ${size * 0.52} C${cx + 150} ${size * 0.12} ${cx + 300} ${size * 0.18} ${cx + 260} ${size * 0.42} C${cx + 230} ${size * 0.55} ${cx + 120} ${size * 0.58} ${cx} ${size * 0.52} Z" />
    <path d="M${cx} ${size * 0.48} C${cx - 150} ${size * 0.08} ${cx - 300} ${size * 0.14} ${cx - 260} ${size * 0.38} C${cx - 230} ${size * 0.51} ${cx - 120} ${size * 0.54} ${cx} ${size * 0.48} Z" />
    <path d="M${cx} ${size * 0.54} C${cx + 120} ${size * 0.6} ${cx + 200} ${size * 0.72} ${cx + 140} ${size * 0.84} C${cx + 90} ${size * 0.92} ${cx + 30} ${size * 0.7} ${cx} ${size * 0.56} Z" />
    <path d="M${cx} ${size * 0.5} C${cx - 120} ${size * 0.56} ${cx - 200} ${size * 0.68} ${cx - 140} ${size * 0.8} C${cx - 90} ${size * 0.88} ${cx - 30} ${size * 0.66} ${cx} ${size * 0.52} Z" />
  </g>
  <g>
${spots.join('\n')}
  </g>
  <line x1="${cx}" y1="${size * 0.44}" x2="${cx}" y2="${size * 0.72}" stroke="${accent}" stroke-width="5" stroke-linecap="round">
    <animate attributeName="stroke-opacity" values="1;0.5;1" dur="5s" repeatCount="indefinite" />
  </line>
</svg>`;
}
