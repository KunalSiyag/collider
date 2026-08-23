export interface MossyoOptions {
  size?: number;
}

export function createMossyo(options: MossyoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="24" ry="3.5" fill="#000" opacity=".3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1;0 0" dur="3.4s" repeatCount="indefinite"/>
    <path d="M22 70 Q18 46 40 36 Q64 28 74 48 Q80 64 68 74 Q56 82 40 80 Q26 78 22 70 Z" fill="#78716c"/>
    <path d="M24 62 Q22 46 42 38 Q58 32 68 44 Q52 40 40 48 Q30 54 30 66 Z" fill="#4ade80"/>
    <circle cx="34" cy="46" r="2.4" fill="#16a34a"/>
    <circle cx="52" cy="40" r="2.4" fill="#16a34a"/>
    <circle cx="62" cy="52" r="2" fill="#166534"/>
    <circle cx="42" cy="58" r="4" fill="#fff"/>
    <circle cx="56" cy="58" r="4" fill="#fff"/>
    <circle cx="43" cy="59" r="2" fill="#1c1917"/>
    <circle cx="57" cy="59" r="2" fill="#1c1917"/>
    <path d="M45 67 Q48 69.5 51 67" stroke="#292524" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="70" r="2.6" fill="#a3e635"/>
    <circle cx="66" cy="68" r="2.2" fill="#65a30d"/>
    <path d="M70 40 Q76 34 74 28" stroke="#65a30d" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
