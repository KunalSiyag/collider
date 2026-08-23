export interface EclipsoOptions {
  size?: number;
}

export function createEclipso(options: EclipsoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <circle cx="48" cy="46" r="30" fill="#fbbf24" opacity=".55">
    <animate attributeName="r" values="30;34;30" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values=".55;.25;.55" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="48" cy="46" r="24" fill="#fbbf24"/>
  <circle cx="48" cy="46" r="21" fill="#1e1b4b"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2;0 1;0 -2" dur="3.4s" repeatCount="indefinite"/>
    <circle cx="41" cy="43" r="3.6" fill="#fbbf24"/>
    <circle cx="55" cy="43" r="3.6" fill="#fbbf24"/>
    <circle cx="41" cy="43" r="1.6" fill="#1c1917"/>
    <circle cx="55" cy="43" r="1.6" fill="#1c1917"/>
    <path d="M44 52 Q48 49 52 52" stroke="#fbbf24" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="34" cy="50" r="2.4" fill="#f472b6" opacity=".5"/>
    <circle cx="62" cy="50" r="2.4" fill="#f472b6" opacity=".5"/>
  </g>
  <g stroke="#fcd34d" stroke-linecap="round">
    <line x1="48" y1="6" x2="48" y2="13"><animate attributeName="opacity" values="1;.2;1" dur="1.8s" repeatCount="indefinite"/></line>
    <line x1="10" y1="46" x2="17" y2="46"><animate attributeName="opacity" values=".2;1;.2" dur="1.8s" repeatCount="indefinite"/></line>
    <line x1="86" y1="46" x2="79" y2="46"><animate attributeName="opacity" values="1;.2;1" dur="2.2s" repeatCount="indefinite"/></line>
    <line x1="20" y1="18" x2="25" y2="23"><animate attributeName="opacity" values=".6;1;.6" dur="2s" repeatCount="indefinite"/></line>
    <line x1="76" y1="18" x2="71" y2="23"><animate attributeName="opacity" values="1;.6;1" dur="2.4s" repeatCount="indefinite"/></line>
  </g>
</svg>`;
}
