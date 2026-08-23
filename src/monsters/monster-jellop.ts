export interface JellopOptions {
  size?: number;
}

export function createJellop(options: JellopOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#000" opacity=".25"/>
  <g transform-origin="48px 88px">
    <animateTransform attributeName="transform" type="scale" values="1 1;1.06 .94;1 1" dur="1.6s" repeatCount="indefinite"/>
    <path d="M24 50 Q24 34 48 34 Q72 34 72 50 L72 74 Q72 82 62 82 L34 82 Q24 82 24 74 Z" fill="#4ade80" opacity=".85"/>
    <path d="M30 48 Q30 40 40 38" stroke="#bbf7d0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
    <circle cx="41" cy="56" r="4" fill="#fff" opacity=".9"/>
    <circle cx="55" cy="56" r="4" fill="#fff" opacity=".9"/>
    <circle cx="42" cy="57" r="2" fill="#14532d"/>
    <circle cx="56" cy="57" r="2" fill="#14532d"/>
    <path d="M44 66 Q48 69.5 52 66" stroke="#15803d" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="33" cy="63" rx="2.8" ry="1.8" fill="#86efac" opacity=".9"/>
    <ellipse cx="63" cy="63" rx="2.8" ry="1.8" fill="#86efac" opacity=".9"/>
    <circle cx="48" cy="28" r="5.5" fill="#dc2626">
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="1.6s" repeatCount="indefinite"/>
    </circle>
    <path d="M48 23 Q49 19 52 18" stroke="#166534" stroke-width="1.6" fill="none"/>
    <rect x="26" y="78" width="44" height="4" rx="2" fill="#166534" opacity=".5"/>
  </g>
</svg>`;
}
