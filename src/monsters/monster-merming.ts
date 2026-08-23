export interface MermingOptions {
  size?: number;
}

export function createMerming(options: MermingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#164e63" opacity=".6"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M44 62 Q36 76 26 82 Q40 82 50 74 Z" fill="#2dd4bf"/>
    <path d="M52 62 Q60 76 70 82 Q56 82 46 74 Z" fill="#2dd4bf"/>
    <path d="M40 66 Q48 78 56 66 L54 60 L42 60 Z" fill="#5eead4"/>
    <ellipse cx="48" cy="56" rx="15" ry="12" fill="#67e8f9"/>
    <circle cx="48" cy="38" r="15" fill="#a5f3fc"/>
    <path d="M33 34 Q30 24 36 20 Q40 26 39 33 Z" fill="#f472b6"/>
    <path d="M63 34 Q66 24 60 20 Q56 26 57 33 Z" fill="#f472b6"/>
    <path d="M36 20 Q34 14 38 12" stroke="#f9a8d4" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M60 20 Q62 14 58 12" stroke="#f9a8d4" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="43" cy="38" r="3.4" fill="#fff"/>
    <circle cx="53" cy="38" r="3.4" fill="#fff"/>
    <circle cx="44" cy="39" r="1.7" fill="#155e75"/>
    <circle cx="54" cy="39" r="1.7" fill="#155e75"/>
    <path d="M45 45 Q48 47.5 51 45" stroke="#0e7490" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <g fill="#f472b6" opacity=".8"><circle cx="40" cy="60" r="1.4"/><circle cx="48" cy="63" r="1.4"/><circle cx="56" cy="60" r="1.4"/></g>
  </g>
  <circle cx="78" cy="34" r="1.6" fill="#bae6fd"><animate attributeName="cy" values="38;24" dur="3.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.7;0" dur="3.1s" repeatCount="indefinite"/></circle>
</svg>`;
}
