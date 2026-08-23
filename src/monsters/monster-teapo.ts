export interface TeapoOptions {
  size?: number;
}

export function createTeapo(options: TeapoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#000" opacity=".25"/>
  <path d="M40 16 Q44 22 40 28 M48 14 Q52 20 48 26 M56 16 Q60 22 56 28" stroke="#e2e8f0" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8">
    <animate attributeName="opacity" values=".8;.3;.8" dur="2.4s" repeatCount="indefinite"/>
  </path>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="2.9s" repeatCount="indefinite"/>
    <path d="M24 52 Q22 36 48 36 Q74 36 72 52 L68 68 Q66 78 48 78 Q30 78 28 68 Z" fill="#f472b6"/>
    <path d="M24 50 Q22 38 48 38 L72 38 Q74 38 72 46 L24 46 Z" fill="#f9a8d4"/>
    <path d="M72 48 Q84 44 86 54 Q84 62 70 60" stroke="#ec4899" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M26 50 Q16 48 16 40" stroke="#ec4899" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="48" cy="38" rx="10" ry="3.5" fill="#be185d"/>
    <circle cx="42" cy="56" r="4" fill="#fff"/>
    <circle cx="55" cy="56" r="4" fill="#fff"/>
    <circle cx="43" cy="57" r="2" fill="#831843"/>
    <circle cx="56" cy="57" r="2" fill="#831843"/>
    <path d="M45 64 Q48.5 67 52 64" stroke="#9d174d" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="33" cy="61" rx="2.6" ry="1.7" fill="#fb7185" opacity=".8"/>
    <ellipse cx="63" cy="61" rx="2.6" ry="1.7" fill="#fb7185" opacity=".8"/>
    <circle cx="48" cy="71" r="2" fill="#fce7f3"/>
  </g>
</svg>`;
}
