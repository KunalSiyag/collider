export interface ToastoOptions {
  size?: number;
}

export function createToasto(options: ToastoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="1.5s" repeatCount="indefinite"/>
    <path d="M22 46 Q22 34 32 34 Q34 26 48 26 Q62 26 64 34 Q74 34 74 46 L74 70 Q74 78 64 78 L32 78 Q22 78 22 70 Z" fill="#d97706"/>
    <path d="M27 48 Q27 39 34 39 Q37 32 48 32 Q59 32 62 39 Q69 39 69 48 L69 68 Q69 73 62 73 L34 73 Q27 73 27 68 Z" fill="#fbbf24"/>
    <path d="M30 56 Q40 50 48 56 Q56 62 66 56 L66 62 Q56 68 48 63 Q40 58 30 63 Z" fill="#fef08a"/>
    <path d="M33 58 Q43 53 48 58" stroke="#fde047" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="41" cy="44" r="3.6" fill="#fff"/>
    <circle cx="55" cy="44" r="3.6" fill="#fff"/>
    <circle cx="42" cy="45" r="1.8" fill="#78350f"/>
    <circle cx="56" cy="45" r="1.8" fill="#78350f"/>
    <path d="M44 51 Q48 54 52 51" stroke="#92400e" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="49" rx="2.4" ry="1.6" fill="#fb923c" opacity=".7"/>
    <ellipse cx="62" cy="49" rx="2.4" ry="1.6" fill="#fb923c" opacity=".7"/>
  </g>
</svg>`;
}
