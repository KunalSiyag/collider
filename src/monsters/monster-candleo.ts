export interface CandleoOptions {
  size?: number;
}

export function createCandleo(options: CandleoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3.5" fill="#000" opacity=".25"/>
  <path d="M48 14 Q43 22 48 27 Q53 22 48 14 Z" fill="#fbbf24">
    <animateTransform attributeName="transform" type="scale" values="1 1;1.15 .9;1 1" additive="sum" dur="0.9s" repeatCount="indefinite"/>
  </path>
  <path d="M48 19 Q46 23 48 26 Q50 23 48 19 Z" fill="#fef08a"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="2.5s" repeatCount="indefinite"/>
    <rect x="32" y="30" width="32" height="54" rx="8" fill="#fef3c7"/>
    <path d="M32 38 q-4 8 0 12 q4 4 0 10" stroke="#fde68a" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M64 44 q4 8 0 12 q-4 4 0 10" stroke="#fde68a" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="41" cy="52" r="4.5" fill="#fff"/>
    <circle cx="55" cy="52" r="4.5" fill="#fff"/>
    <circle cx="42" cy="53" r="2.2" fill="#78350f"/>
    <circle cx="56" cy="53" r="2.2" fill="#78350f"/>
    <path d="M44 62 Q48 65 52 62" stroke="#b45309" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="60" rx="3" ry="2" fill="#fb923c" opacity=".6"/>
    <ellipse cx="61" cy="60" rx="3" ry="2" fill="#fb923c" opacity=".6"/>
    <ellipse cx="40" cy="85" rx="7" ry="3" fill="#fcd34d"/>
    <ellipse cx="56" cy="85" rx="7" ry="3" fill="#fcd34d"/>
  </g>
  <circle cx="70" cy="20" r="1.5" fill="#fde68a" opacity=".7">
    <animate attributeName="r" values="1;2;1" dur="1.2s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}
