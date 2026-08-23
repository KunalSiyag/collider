export interface LotusoOptions {
  size?: number;
}

export function createLotuso(options: LotusoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="88" rx="28" ry="4" fill="#155e75" opacity=".6"/>
  <path d="M14 88 Q24 84 34 88 Q44 92 54 88 Q64 84 74 88 L82 88" stroke="#22d3ee" stroke-width="2" fill="none" opacity=".6">
    <animate attributeName="d" values="M14 88 Q24 84 34 88 Q44 92 54 88 Q64 84 74 88 L82 88;M14 88 Q24 92 34 88 Q44 84 54 88 Q64 92 74 88 L82 88;M14 88 Q24 84 34 88 Q44 92 54 88 Q64 84 74 88 L82 88" dur="3s" repeatCount="indefinite"/>
  </path>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="3s" repeatCount="indefinite"/>
    <path d="M48 66 Q30 62 26 44 Q40 46 46 58 Z" fill="#f9a8d4"/>
    <path d="M48 66 Q66 62 70 44 Q56 46 50 58 Z" fill="#f472b6"/>
    <path d="M48 66 Q36 56 40 36 Q50 44 50 60 Z" fill="#fbcfe8"/>
    <path d="M48 66 Q60 56 56 36 Q46 44 46 60 Z" fill="#fbcfe8"/>
    <ellipse cx="48" cy="52" rx="10" ry="11" fill="#fff"/>
    <circle cx="44" cy="51" r="3" fill="#fff"/>
    <circle cx="52" cy="51" r="3" fill="#fff"/>
    <circle cx="44.8" cy="52" r="1.5" fill="#831843"/>
    <circle cx="52.8" cy="52" r="1.5" fill="#831843"/>
    <path d="M45 57 Q48 59.5 51 57" stroke="#be185d" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="41" cy="56" rx="2" ry="1.3" fill="#fb7185" opacity=".6"/>
    <ellipse cx="55" cy="56" rx="2" ry="1.3" fill="#fb7185" opacity=".6"/>
  </g>
</svg>`;
}
