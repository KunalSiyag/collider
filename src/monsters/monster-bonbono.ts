export interface BonbonoOptions {
  size?: number;
}

export function createBonbono(options: BonbonoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-3 48 88;3 48 88;-3 48 88" dur="2.8s" repeatCount="indefinite"/>
    <path d="M22 48 L10 38 Q16 48 10 58 Z" fill="#f472b6">
      <animateTransform attributeName="transform" type="skewX" values="0;6;0" dur="1.8s" repeatCount="indefinite"/>
    </path>
    <path d="M74 48 L86 38 Q80 48 86 58 Z" fill="#f472b6">
      <animateTransform attributeName="transform" type="skewX" values="0;-6;0" dur="1.8s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="48" cy="48" rx="27" ry="21" fill="#fb7185"/>
    <path d="M34 29 Q40 48 36 67" stroke="#fecdd3" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M60 29 Q66 48 62 67" stroke="#be123c" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="40" cy="38" rx="6" ry="3" fill="#fff" opacity=".5" transform="rotate(-25 40 38)"/>
    <circle cx="42" cy="49" r="4" fill="#fff"/>
    <circle cx="55" cy="49" r="4" fill="#fff"/>
    <circle cx="43" cy="50" r="2" fill="#4c0519"/>
    <circle cx="56" cy="50" r="2" fill="#4c0519"/>
    <path d="M44 57 Q48 61 52 57" stroke="#881337" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="34" cy="55" r="2.5" fill="#fda4af" opacity=".8"/>
    <circle cx="63" cy="55" r="2.5" fill="#fda4af" opacity=".8"/>
  </g>
</svg>`;
}
