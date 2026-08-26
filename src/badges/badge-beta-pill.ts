/** Beta Pill — a rounded "BETA" chip with a scanning shimmer. */
export interface BetaPillOptions {
  label?: string;
  color?: string;
}

export function createBetaPill(options: BetaPillOptions = {}): string {
  const { label = 'BETA', color = '#a78bfa' } = options;
  return `<svg viewBox="0 0 110 40" height="40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="bp-sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="bp-clip"><rect x="1" y="1" width="108" height="38" rx="19"/></clipPath>
  </defs>
  <rect x="1" y="1" width="108" height="38" rx="19" fill="#18181b" stroke="${color}" stroke-opacity="0.7"/>
  <g clip-path="url(#bp-clip)">
    <rect x="-40" y="0" width="34" height="40" fill="url(#bp-sheen)">
      <animate attributeName="x" values="-40;120" dur="2.8s" repeatCount="indefinite"/>
    </rect>
  </g>
  <text x="55" y="25.5" text-anchor="middle" fill="${color}" font-size="15" font-weight="800" letter-spacing="4" font-family="system-ui">${label}</text>
</svg>`;
}
