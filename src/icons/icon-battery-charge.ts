/** Battery Charge — a battery filling cell by cell, then flashing full. */
export interface BatteryChargeOptions {
  color?: string;
  lowColor?: string;
  cells?: number;
  size?: number;
}

export function createBatteryCharge(options: BatteryChargeOptions = {}): string {
  const { color = '#4ade80', lowColor = '#fbbf24', cells = 4, size = 120 } = options;
  const cellW = 16;
  const gap = 5;
  const bodyW = cells * cellW + (cells - 1) * gap + 12;
  const h = 52;

  const fills = Array.from({ length: cells }, (_, i) => {
    const x = 6 + i * (cellW + gap);
    const tone = i === 0 ? lowColor : color;
    return `<rect x="${x}" y="6" width="${cellW}" height="${h - 12}" rx="4" fill="${tone}" opacity="0">
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;${(0.1 + i * 0.18).toFixed(2)};${(0.85 + i * 0.02).toFixed(2)};1" dur="3.2s" repeatCount="indefinite"/>
    </rect>`;
  }).join('');

  return `<svg viewBox="0 0 ${bodyW + 14} ${h}" width="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="0" y="0" width="${bodyW}" height="${h}" rx="10" fill="none" stroke="#52525b" stroke-width="4"/>
  <rect x="${bodyW + 3}" y="${h / 2 - 8}" width="7" height="16" rx="3" fill="#52525b"/>
  ${fills}
</svg>`;
}
