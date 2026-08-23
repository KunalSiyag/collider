export interface NoodloOptions {
  size?: number;
}

export function createNoodlo(options: NoodloOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="24" ry="3.5" fill="#000" opacity=".25"/>
  <path d="M40 26 Q36 12 46 8 M50 24 Q52 10 60 8 M44 28 Q40 18 32 16" stroke="#fde68a" stroke-width="4" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" values="-2 48 28;2 48 28;-2 48 28" dur="2.4s" repeatCount="indefinite"/>
  </path>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="2.8s" repeatCount="indefinite"/>
    <path d="M22 44 L74 44 L70 66 Q68 76 48 76 Q28 76 26 66 Z" fill="#e2e8f0"/>
    <path d="M22 44 L74 44 L73 50 L23 50 Z" fill="#dc2626"/>
    <ellipse cx="48" cy="44" rx="26" ry="6" fill="#fbbf24"/>
    <path d="M30 42 Q40 38 48 42 Q58 46 66 42" stroke="#fde047" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="38" cy="41" r="3" fill="#f97316"/>
    <ellipse cx="58" cy="40" rx="4" ry="2.4" fill="#4ade80"/>
    <circle cx="42" cy="56" r="3.6" fill="#fff"/>
    <circle cx="54" cy="56" r="3.6" fill="#fff"/>
    <circle cx="43" cy="57" r="1.8" fill="#334155"/>
    <circle cx="55" cy="57" r="1.8" fill="#334155"/>
    <path d="M45 63 Q48 66 51 63" stroke="#475569" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="61" rx="2.4" ry="1.5" fill="#fb7185" opacity=".6"/>
    <ellipse cx="61" cy="61" rx="2.4" ry="1.5" fill="#fb7185" opacity=".6"/>
    <path d="M70 52 L82 46" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`;
}
