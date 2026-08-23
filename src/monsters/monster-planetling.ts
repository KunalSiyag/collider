export interface PlanetlingOptions {
  size?: number;
}

export function createPlanetling(options: PlanetlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="16" ry="3" fill="#1e1b4b" opacity=".7"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.8s" repeatCount="indefinite"/>
    <circle cx="48" cy="52" r="24" fill="#38bdf8"/>
    <path d="M26 44 Q40 34 58 40 Q72 44 70 54 Q58 62 40 58 Q26 54 26 44 Z" fill="#0ea5e9" opacity=".8"/>
    <path d="M28 62 Q44 70 64 62" stroke="#7dd3fc" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>
    <circle cx="36" cy="38" r="3" fill="#e0f2fe" opacity=".8"/>
    <circle cx="60" cy="34" r="2" fill="#e0f2fe" opacity=".7"/>
    <circle cx="42" cy="50" r="4.2" fill="#fff"/>
    <circle cx="55" cy="50" r="4.2" fill="#fff"/>
    <circle cx="43" cy="51" r="2.1" fill="#082f49"/>
    <circle cx="56" cy="51" r="2.1" fill="#082f49"/>
    <path d="M45 59 Q48 62 51 59" stroke="#0c4a6e" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="33" cy="56" rx="2.8" ry="2" fill="#0284c7" opacity=".9"/>
    <ellipse cx="63" cy="56" rx="2.8" ry="2" fill="#0284c7" opacity=".9"/>
  </g>
  <circle cx="78" cy="30" r="4" fill="#cbd5e1">
    <animate attributeName="cx" values="84;70" dur="4.4s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="26;36" dur="4.4s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}
