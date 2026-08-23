export interface CupcakoOptions {
  size?: number;
}

export function createCupcako(options: CupcakoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.2s" repeatCount="indefinite"/>
    <path d="M30 58 L36 86 L60 86 L66 58 Z" fill="#f472b6"/>
    <path d="M38 58 L42 86 M48 58 L48 86 M58 58 L54 86" stroke="#db2777" stroke-width="2" opacity=".7"/>
    <path d="M30 58 Q30 44 48 44 Q66 44 66 58 Q57 52 48 58 Q39 52 30 58 Z" fill="#fda4af"/>
    <path d="M36 50 Q38 38 48 36 Q58 38 60 50 Q54 44 48 50 Q42 44 36 50 Z" fill="#fbcfe8"/>
    <path d="M42 40 Q44 32 50 32 Q56 32 56 38 Q52 36 50 40 Q46 36 42 40 Z" fill="#fda4af"/>
    <circle cx="49" cy="24" r="5" fill="#e11d48">
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <path d="M49 19 Q50 16 52 15" stroke="#4d7c0f" stroke-width="1.5" fill="none"/>
    <g fill="#fde047">
      <rect x="36" y="54" width="3" height="1.6" rx=".8" transform="rotate(20 37 54)"/>
      <rect x="56" y="52" width="3" height="1.6" rx=".8" transform="rotate(-15 57 52)"/>
      <rect x="46" y="50" width="3" height="1.6" rx=".8" transform="rotate(30 47 50)"/>
    </g>
    <circle cx="42" cy="64" r="4" fill="#fff"/>
    <circle cx="55" cy="64" r="4" fill="#fff"/>
    <circle cx="43" cy="65" r="2" fill="#831843"/>
    <circle cx="56" cy="65" r="2" fill="#831843"/>
    <path d="M45 72 Q48.5 75 52 72" stroke="#9f1239" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="70" rx="2.5" ry="1.8" fill="#fb7185" opacity=".7"/>
    <ellipse cx="61" cy="70" rx="2.5" ry="1.8" fill="#fb7185" opacity=".7"/>
  </g>
</svg>`;
}
