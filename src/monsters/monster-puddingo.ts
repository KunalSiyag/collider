export interface PuddingoOptions {
  size?: number;
}

export function createPuddingo(options: PuddingoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#000" opacity=".25"/>
  <g transform-origin="48px 88px">
    <animateTransform attributeName="transform" type="scale" values="1 1;1.08 .92;.96 1.04;1 1" dur="1.8s" repeatCount="indefinite"/>
    <path d="M26 56 Q26 44 48 44 Q70 44 70 56 L70 74 Q70 82 60 82 L36 82 Q26 82 26 74 Z" fill="#fbbf24"/>
    <path d="M24 58 Q24 48 34 50 Q48 56 62 50 Q72 48 72 58 Q60 64 48 64 Q36 64 24 58 Z" fill="#d97706"/>
    <path d="M70 56 Q78 54 76 48" stroke="#d97706" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="48" cy="44" rx="6" ry="2.5" fill="#92400e"/>
    <circle cx="42" cy="66" r="4" fill="#fff"/>
    <circle cx="55" cy="66" r="4" fill="#fff"/>
    <circle cx="43" cy="67" r="2" fill="#78350f"/>
    <circle cx="56" cy="67" r="2" fill="#78350f"/>
    <path d="M45 75 Q48 78 51 75" stroke="#92400e" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="72" rx="2.6" ry="1.7" fill="#fb923c" opacity=".6"/>
    <ellipse cx="62" cy="72" rx="2.6" ry="1.7" fill="#fb923c" opacity=".6"/>
  </g>
</svg>`;
}
