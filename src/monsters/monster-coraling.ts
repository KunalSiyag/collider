export interface CoralingOptions {
  size?: number;
}

export function createCoraling(options: CoralingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#164e63" opacity=".6"/>
  <path d="M20 90 Q30 80 34 90 M62 90 Q70 82 78 90" stroke="#155e75" stroke-width="3" fill="none" opacity=".6"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-3 48 88;3 48 88;-3 48 88" dur="3.6s" repeatCount="indefinite"/>
    <path d="M44 84 Q42 62 30 52 Q24 44 28 36 Q36 42 40 50 Q38 38 34 30 Q44 36 46 48 Z" fill="#f472b6"/>
    <path d="M52 84 Q54 62 66 52 Q72 44 68 36 Q60 42 56 50 Q58 38 62 30 Q52 36 50 48 Z" fill="#ec4899"/>
    <path d="M48 84 Q46 66 48 54 L52 54 Q54 68 52 84 Z" fill="#f9a8d4"/>
    <circle cx="48" cy="62" r="13" fill="#f9a8d4"/>
    <circle cx="44" cy="60" r="3.2" fill="#fff"/>
    <circle cx="53" cy="60" r="3.2" fill="#fff"/>
    <circle cx="45" cy="61" r="1.6" fill="#831843"/>
    <circle cx="54" cy="61" r="1.6" fill="#831843"/>
    <path d="M45 68 Q48.5 71 52 68" stroke="#9d174d" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="34" r="2.5" fill="#fbcfe8"/>
    <circle cx="68" cy="34" r="2.5" fill="#fbcfe8"/>
    <circle cx="50" cy="52" r="2.5" fill="#fbcfe8"/>
  </g>
  <circle cx="78" cy="26" r="2" fill="#bae6fd"><animate attributeName="cy" values="30;14" dur="3.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.7;0" dur="3.4s" repeatCount="indefinite"/></circle>
  <circle cx="16" cy="40" r="1.5" fill="#bae6fd"><animate attributeName="cy" values="44;26" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.6;0" dur="4s" repeatCount="indefinite"/></circle>
</svg>`;
}
