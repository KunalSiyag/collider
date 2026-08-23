export interface BoltoOptions {
  size?: number;
}

export function createBolto(options: BoltoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".3"/>
  <line x1="48" y1="22" x2="48" y2="32" stroke="#94a3b8" stroke-width="2.4"/>
  <circle cx="48" cy="19" r="3" fill="#fbbf24">
    <animate attributeName="r" values="3;4.4;3" dur="1.4s" repeatCount="indefinite"/>
  </circle>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
    <rect x="30" y="32" width="36" height="30" rx="7" fill="#38bdf8"/>
    <rect x="30" y="32" width="36" height="10" rx="5" fill="#7dd3fc"/>
    <rect x="22" y="40" width="8" height="16" rx="3" fill="#0ea5e9"/>
    <rect x="66" y="40" width="8" height="16" rx="3" fill="#0ea5e9"/>
    <rect x="36" y="42" width="9" height="9" rx="2" fill="#0c4a6e"/>
    <rect x="51" y="42" width="9" height="9" rx="2" fill="#0c4a6e"/>
    <rect x="38" y="44" width="3" height="3" fill="#67e8f9"/>
    <rect x="53" y="44" width="3" height="3" fill="#67e8f9"/>
    <rect x="40" y="56" width="16" height="3" rx="1.5" fill="#0c4a6e"/>
    <rect x="34" y="66" width="28" height="18" rx="5" fill="#0ea5e9"/>
    <circle cx="48" cy="75" r="4" fill="#fef08a">
      <animate attributeName="opacity" values="1;.4;1" dur="1.6s" repeatCount="indefinite"/>
    </circle>
    <rect x="38" y="86" width="8" height="4" rx="2" fill="#0369a1"/>
    <rect x="50" y="86" width="8" height="4" rx="2" fill="#0369a1"/>
  </g>
</svg>`;
}
