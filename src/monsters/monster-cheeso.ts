export interface CheesoOptions {
  size?: number;
}

export function createCheeso(options: CheesoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="24" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.3s" repeatCount="indefinite"/>
    <path d="M14 76 L48 24 L82 76 Z" fill="#facc15"/>
    <path d="M48 24 L82 76 L70 76 Z" fill="#fbbf24"/>
    <circle cx="44" cy="52" r="4" fill="#ca8a04"/>
    <circle cx="60" cy="64" r="3" fill="#ca8a04"/>
    <circle cx="34" cy="68" r="3.5" fill="#ca8a04"/>
    <circle cx="52" cy="42" r="2" fill="#fde68a"/>
    <circle cx="42" cy="58" r="4.5" fill="#fff"/>
    <circle cx="55" cy="56" r="4.5" fill="#fff"/>
    <circle cx="43" cy="59" r="2.2" fill="#713f12"/>
    <circle cx="56" cy="57" r="2.2" fill="#713f12"/>
    <path d="M45 66 Q48 69 51 66" stroke="#854d0e" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M45 66 q3 3 6 0 q-3 2 -6 0" fill="#fde68a">
      <animateTransform attributeName="transform" type="translate" values="0 0;0 1;0 0" dur=".8s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="37" cy="63" rx="2.5" ry="1.6" fill="#fb923c" opacity=".55"/>
    <ellipse cx="60" cy="62" rx="2.5" ry="1.6" fill="#fb923c" opacity=".55"/>
  </g>
</svg>`;
}
