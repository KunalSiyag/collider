export interface AnglertoOptions {
  size?: number;
}

export function createAnglerto(options: AnglertoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="44" cy="89" rx="24" ry="3" fill="#164e63" opacity=".6"/>
  <path d="M44 30 Q40 16 48 10 Q54 18 50 30 Z" fill="#fde047">
    <animate attributeName="opacity" values="1;.5;1" dur="1.6s" repeatCount="indefinite"/>
  </path>
  <circle cx="49" cy="10" r="3" fill="#fef9c3">
    <animate attributeName="r" values="3;4.2;3" dur="1.6s" repeatCount="indefinite"/>
  </circle>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M18 62 Q14 52 22 50 L22 74 Q14 72 18 62 Z" fill="#334155"/>
    <path d="M70 62 Q74 52 66 50 L66 74 Q74 72 70 62 Z" fill="#334155"/>
    <ellipse cx="44" cy="62" rx="27" ry="15" fill="#475569"/>
    <path d="M20 58 Q32 50 48 52 Q62 54 68 60 Q60 66 44 68 Q30 68 20 58 Z" fill="#64748b"/>
    <path d="M30 52 L34 46 L38 52 M48 50 L52 44 L56 50" fill="#94a3b8" stroke="#94a3b8" stroke-width="1"/>
    <circle cx="36" cy="58" r="5" fill="#fff"/>
    <circle cx="52" cy="58" r="5" fill="#fff"/>
    <circle cx="37" cy="59" r="2.5" fill="#0f172a"/>
    <circle cx="53" cy="59" r="2.5" fill="#0f172a"/>
    <circle cx="38" cy="56.5" r="1" fill="#fff"/>
    <circle cx="54" cy="56.5" r="1" fill="#fff"/>
    <path d="M32 68 Q44 74 56 68" stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round"/>
    <g fill="#fef08a"><path d="M36 70 L38 73 L34 73 Z"/><path d="M44 71 L46 74 L42 74 Z"/><path d="M52 70 L54 73 L50 73 Z"/></g>
  </g>
</svg>`;
}
