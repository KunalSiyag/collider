/** Level Medal — a rank medal with a ribbon, shine sweep and level number. */
export interface LevelMedalOptions {
  level?: number;
  color?: string;
  size?: number;
}

export function createLevelMedal(options: LevelMedalOptions = {}): string {
  const { level = 7, color = '#fbbf24', size = 110 } = options;
  return `<svg viewBox="0 0 100 120" width="${size * 0.83}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M36 2 h28 l6 40 -20 12 -20 -12 z" fill="#7f1d1d"/>
  <path d="M36 2 h14 l-2 40 -18 -6 z" fill="#b91c1c"/>
  <g>
    <circle cx="50" cy="76" r="30" fill="${color}"/>
    <circle cx="50" cy="76" r="30" fill="none" stroke="#92400e" stroke-width="3"/>
    <circle cx="50" cy="76" r="22" fill="none" stroke="#fde68a" stroke-width="2" stroke-dasharray="4 5"/>
    <text x="50" y="84" text-anchor="middle" fill="#451a03" font-size="26" font-weight="800" font-family="system-ui">${level}</text>
    <animateTransform attributeName="transform" type="rotate" values="-2 50 76;2 50 76;-2 50 76" dur="4s" repeatCount="indefinite"/>
  </g>
  <!-- shine sweep -->
  <rect x="-20" y="40" width="14" height="80" fill="#ffffff" opacity="0.28" transform="rotate(20 50 76)">
    <animate attributeName="x" values="-30;120" dur="3.4s" repeatCount="indefinite"/>
  </rect>
</svg>`;
}
