export interface MeteorlingOptions {
  size?: number;
}

export function createMeteorling(options: MeteorlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="34" cy="89" rx="16" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;2 -3;0 0" dur="1.4s" repeatCount="indefinite"/>
    <path d="M56 40 Q80 30 92 14 Q84 34 64 46 Z" fill="#f97316" opacity=".85">
      <animate attributeName="opacity" values=".85;.5;.85" dur=".8s" repeatCount="indefinite"/>
    </path>
    <path d="M54 48 Q74 46 88 38 Q76 52 58 54 Z" fill="#fbbf24" opacity=".8">
      <animate attributeName="opacity" values=".5;.85;.5" dur=".7s" repeatCount="indefinite"/>
    </path>
    <polygon points="34,26 52,34 54,56 40,70 22,64 18,42" fill="#78716c"/>
    <polygon points="34,26 52,34 44,46 26,42" fill="#a8a29e"/>
    <circle cx="30" cy="34" r="2.4" fill="#57534e"/>
    <circle cx="44" cy="58" r="2" fill="#57534e"/>
    <circle cx="33" cy="46" r="3.6" fill="#fff"/>
    <circle cx="44" cy="44" r="3.6" fill="#fff"/>
    <circle cx="34" cy="47" r="1.8" fill="#292524"/>
    <circle cx="45" cy="45" r="1.8" fill="#292524"/>
    <path d="M35 54 Q38 57 41 54" stroke="#292524" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </g>
  <circle cx="16" cy="22" r="1.3" fill="#fef08a"><animate attributeName="opacity" values=".9;.1;.9" dur="1.6s" repeatCount="indefinite"/></circle>
  <circle cx="80" cy="70" r="1" fill="#fef08a"><animate attributeName="opacity" values=".1;.8;.1" dur="2s" repeatCount="indefinite"/></circle>
</svg>`;
}
