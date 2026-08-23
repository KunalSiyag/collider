export interface RainbowlingOptions {
  size?: number;
}

export function createRainbowling(options: RainbowlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <g fill="none" stroke-linecap="round">
    <path d="M20 62 A28 28 0 0 1 76 62" stroke="#ef4444" stroke-width="5"/>
    <path d="M25 62 A23 23 0 0 1 71 62" stroke="#f97316" stroke-width="5"/>
    <path d="M30 62 A18 18 0 0 1 66 62" stroke="#fbbf24" stroke-width="5"/>
    <path d="M35 62 A13 13 0 0 1 61 62" stroke="#4ade80" stroke-width="5"/>
  </g>
  <ellipse cx="20" cy="66" rx="9" ry="7" fill="#e2e8f0"/>
  <ellipse cx="76" cy="66" rx="9" ry="7" fill="#e2e8f0"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.3s" repeatCount="indefinite"/>
    <circle cx="48" cy="52" r="10" fill="#fbbf24"/>
    <circle cx="44.5" cy="51" r="2.4" fill="#fff"/>
    <circle cx="51.5" cy="51" r="2.4" fill="#fff"/>
    <circle cx="45" cy="51.8" r="1.2" fill="#713f12"/>
    <circle cx="52" cy="51.8" r="1.2" fill="#713f12"/>
    <path d="M45 56.5 Q48 59 51 56.5" stroke="#92400e" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>
  <circle cx="30" cy="26" r="1.6" fill="#fca5a5"><animate attributeName="cy" values="30;18" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.8;0" dur="2.8s" repeatCount="indefinite"/></circle>
  <circle cx="66" cy="22" r="1.4" fill="#93c5fd"><animate attributeName="cy" values="26;12" dur="3.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.7;0" dur="3.2s" repeatCount="indefinite"/></circle>
</svg>`;
}
