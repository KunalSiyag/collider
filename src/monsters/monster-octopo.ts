export interface OctopoOptions {
  size?: number;
}

export function createOctopo(options: OctopoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="24" ry="3.5" fill="#134e4a" opacity=".6"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.2s" repeatCount="indefinite"/>
    <g stroke="#c026d3" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M32 62 Q24 74 14 76"><animate attributeName="d" values="M32 62 Q24 74 14 76;M32 62 Q20 72 12 70;M32 62 Q24 74 14 76" dur="2s" repeatCount="indefinite"/></path>
      <path d="M40 66 Q38 78 30 84"><animate attributeName="d" values="M40 66 Q38 78 30 84;M40 66 Q34 80 26 82;M40 66 Q38 78 30 84" dur="2.3s" repeatCount="indefinite"/></path>
      <path d="M56 66 Q58 78 66 84"><animate attributeName="d" values="M56 66 Q58 78 66 84;M56 66 Q62 80 70 82;M56 66 Q58 78 66 84" dur="2.1s" repeatCount="indefinite"/></path>
      <path d="M64 62 Q72 74 82 76"><animate attributeName="d" values="M64 62 Q72 74 82 76;M64 62 Q76 72 84 70;M64 62 Q72 74 82 76" dur="2.5s" repeatCount="indefinite"/></path>
    </g>
    <path d="M30 60 Q30 74 40 76 L56 76 Q66 74 66 60 L66 50 Q66 30 48 30 Q30 30 30 50 Z" fill="#d946ef"/>
    <circle cx="41" cy="46" r="5" fill="#fff"/>
    <circle cx="55" cy="46" r="5" fill="#fff"/>
    <circle cx="42" cy="47" r="2.5" fill="#4a044e"/>
    <circle cx="56" cy="47" r="2.5" fill="#4a044e"/>
    <circle cx="43" cy="44" r="1" fill="#fff"/>
    <circle cx="57" cy="44" r="1" fill="#fff"/>
    <path d="M43 57 Q48 62 53 57" stroke="#701a75" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <ellipse cx="33" cy="54" rx="3" ry="2" fill="#f0abfc" opacity=".8"/>
    <ellipse cx="63" cy="54" rx="3" ry="2" fill="#f0abfc" opacity=".8"/>
  </g>
</svg>`;
}
