export interface MarshmoOptions {
  size?: number;
}

export function createMarshmo(options: MarshmoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <g transform-origin="48px 88px">
    <animateTransform attributeName="transform" type="scale" values="1 1;1.07 .93;1 1" dur="2.2s" repeatCount="indefinite"/>
    <rect x="28" y="30" width="40" height="52" rx="14" fill="#fef9c3"/>
    <path d="M28 58 Q40 50 48 60 Q56 70 68 60 L68 68 Q56 80 48 72 Q40 64 28 72 Z" fill="#fbbf24" opacity=".85"/>
    <path d="M30 34 Q34 30 40 31" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="41" cy="50" r="4.2" fill="#fff"/>
    <circle cx="56" cy="50" r="4.2" fill="#fff"/>
    <circle cx="42" cy="51" r="2.1" fill="#713f12"/>
    <circle cx="57" cy="51" r="2.1" fill="#713f12"/>
    <path d="M44 60 Q48 64 52 60" stroke="#92400e" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="56" rx="3" ry="2" fill="#fb923c" opacity=".6"/>
    <ellipse cx="63" cy="56" rx="3" ry="2" fill="#fb923c" opacity=".6"/>
    <path d="M36 74 q4 -3 8 0" stroke="#fcd34d" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <line x1="48" y1="10" x2="48" y2="30" stroke="#78350f" stroke-width="2.4"/>
  </g>
  <path d="M74 20 q3 -4 6 0 q-3 -1 -6 0" fill="#fb923c" opacity=".6"><animate attributeName="x" values="0;-6;0" dur="2s" repeatCount="indefinite"/></path>
</svg>`;
}
