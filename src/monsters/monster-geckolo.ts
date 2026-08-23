export interface GeckoloOptions {
  size?: number;
}

export function createGeckolo(options: GeckoloOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M70 66 Q84 62 86 72 Q80 78 70 74 Z" fill="#4ade80"/>
    <path d="M70 66 Q80 58 88 60 Q82 68 72 70 Z" fill="#4ade80"/>
    <ellipse cx="46" cy="68" rx="22" ry="12" fill="#4ade80"/>
    <circle cx="28" cy="60" r="12" fill="#86efac"/>
    <circle cx="24" cy="56" r="3.4" fill="#fff"/>
    <circle cx="33" cy="56" r="3.4" fill="#fff"/>
    <circle cx="24.8" cy="56.8" r="1.7" fill="#14532d">
      <animate attributeName="ry" values="1.7;1.7;.2;1.7" keyTimes="0;.4;.5;.6" dur="3.4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="33.8" cy="56.8" r="1.7" fill="#14532d"/>
    <circle cx="25.4" cy="54.8" r=".6" fill="#fff"/>
    <circle cx="34.4" cy="54.8" r=".6" fill="#fff"/>
    <path d="M26 65 Q29 67 32 65" stroke="#166534" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <g fill="#166534" opacity=".6">
      <circle cx="46" cy="66" r="1.6"/><circle cx="54" cy="70" r="1.6"/><circle cx="60" cy="65" r="1.6"/><circle cx="50" cy="74" r="1.6"/>
    </g>
    <g stroke="#16a34a" stroke-width="4" stroke-linecap="round">
      <line x1="34" y1="74" x2="30" y2="82"/><line x1="44" y1="78" x2="42" y2="86"/><line x1="56" y1="78" x2="58" y2="86"/><line x1="64" y1="74" x2="68" y2="82"/>
    </g>
    <circle cx="30" cy="83" r="3" fill="#a3e635"/><circle cx="42" cy="87" r="3" fill="#a3e635"/>
    <circle cx="58" cy="87" r="3" fill="#a3e635"/><circle cx="68" cy="83" r="3" fill="#a3e635"/>
  </g>
</svg>`;
}
