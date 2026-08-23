export interface HoneyoOptions {
  size?: number;
}

export function createHoneyo(options: HoneyoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <path d="M40 22 Q48 30 56 22 L56 16 Q48 22 40 16 Z" fill="#f59e0b">
    <animate attributeName="d" values="M40 22 Q48 30 56 22 L56 16 Q48 22 40 16 Z;M40 22 Q48 34 56 22 L56 16 Q48 22 40 16 Z;M40 22 Q48 30 56 22 L56 16 Q48 22 40 16 Z" dur="2.4s" repeatCount="indefinite"/>
  </path>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.5s" repeatCount="indefinite"/>
    <circle cx="34" cy="34" r="5" fill="#a16207"/>
    <circle cx="62" cy="34" r="5" fill="#a16207"/>
    <path d="M30 46 Q30 30 48 30 Q66 30 66 46 L64 66 Q64 78 48 78 Q32 78 32 66 Z" fill="#b45309"/>
    <rect x="32" y="52" width="32" height="12" rx="4" fill="#fbbf24"/>
    <circle cx="42" cy="44" r="3.6" fill="#fff7ed"/>
    <circle cx="54" cy="44" r="3.6" fill="#fff7ed"/>
    <circle cx="43" cy="45" r="1.8" fill="#451a03"/>
    <circle cx="55" cy="45" r="1.8" fill="#451a03"/>
    <ellipse cx="48" cy="50" rx="2.6" ry="1.8" fill="#451a03"/>
    <path d="M48 52 Q45.5 55 43 54 M48 52 Q50.5 55 53 54" stroke="#451a03" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="50" rx="2.6" ry="1.7" fill="#f97316" opacity=".6"/>
    <ellipse cx="61" cy="50" rx="2.6" ry="1.7" fill="#f97316" opacity=".6"/>
    <ellipse cx="38" cy="78" rx="6" ry="3" fill="#92400e"/>
    <ellipse cx="58" cy="78" rx="6" ry="3" fill="#92400e"/>
  </g>
</svg>`;
}
