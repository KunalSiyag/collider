export interface LavalingOptions {
  size?: number;
}

export function createLavaling(options: LavalingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#000" opacity=".3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M26 60 Q24 36 48 32 Q72 36 70 60 Q70 78 48 80 Q26 78 26 60 Z" fill="#44403c"/>
    <path d="M32 48 L44 52 L40 64 L52 68" stroke="#f97316" stroke-width="3" fill="none" stroke-linecap="round">
      <animate attributeName="stroke" values="#f97316;#fbbf24;#f97316" dur="1.6s" repeatCount="indefinite"/>
    </path>
    <path d="M62 42 L56 52 L64 58" stroke="#f97316" stroke-width="3" fill="none" stroke-linecap="round">
      <animate attributeName="stroke" values="#fbbf24;#f97316;#fbbf24" dur="1.9s" repeatCount="indefinite"/>
    </path>
    <path d="M34 72 Q42 76 50 74" stroke="#fb923c" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"/>
    <circle cx="41" cy="48" r="4.2" fill="#fef3c7"/>
    <circle cx="55" cy="48" r="4.2" fill="#fef3c7"/>
    <circle cx="42" cy="49" r="2" fill="#7c2d12"/>
    <circle cx="56" cy="49" r="2" fill="#7c2d12"/>
    <path d="M44 58 L47 61 L50 58 L53 61" stroke="#fbbf24" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="55" rx="2.6" ry="1.7" fill="#f97316" opacity=".7"/>
    <ellipse cx="62" cy="55" rx="2.6" ry="1.7" fill="#f97316" opacity=".7"/>
  </g>
  <circle cx="74" cy="28" r="1.6" fill="#fb923c"><animate attributeName="cy" values="32;20" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.8;0" dur="2.2s" repeatCount="indefinite"/></circle>
  <circle cx="22" cy="34" r="1.2" fill="#fbbf24"><animate attributeName="cy" values="38;24" dur="2.7s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.7;0" dur="2.7s" repeatCount="indefinite"/></circle>
</svg>`;
}
