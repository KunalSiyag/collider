export interface PixoOptions {
  size?: number;
}

export function createPixo(options: PixoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#000" opacity=".25"/>
  <g shape-rendering="crispEdges">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="1s" steps="2" repeatCount="indefinite"/>
    <rect x="28" y="36" width="40" height="34" fill="#a3e635"/>
    <rect x="32" y="30" width="32" height="8" fill="#bef264"/>
    <rect x="24" y="42" width="6" height="14" fill="#65a30d"/>
    <rect x="66" y="42" width="6" height="14" fill="#65a30d"/>
    <rect x="34" y="44" width="10" height="10" fill="#fff"/>
    <rect x="52" y="44" width="10" height="10" fill="#fff"/>
    <rect x="38" y="47" width="5" height="6" fill="#1a2e05">
      <animate attributeName="y" values="47;47;49;47" keyTimes="0;.4;.5;.6" dur="2s" repeatCount="indefinite"/>
    </rect>
    <rect x="56" y="47" width="5" height="6" fill="#1a2e05"/>
    <rect x="42" y="60" width="12" height="4" fill="#365314"/>
    <rect x="40" y="62" width="4" height="4" fill="#365314"/>
    <rect x="52" y="62" width="4" height="4" fill="#365314"/>
    <rect x="34" y="70" width="10" height="8" fill="#4d7c0f"/>
    <rect x="52" y="70" width="10" height="8" fill="#4d7c0f"/>
    <rect x="20" y="24" width="4" height="4" fill="#fef08a">
      <animate attributeName="opacity" values="1;0;1" dur="1.3s" repeatCount="indefinite"/>
    </rect>
    <rect x="72" y="28" width="4" height="4" fill="#fef08a">
      <animate attributeName="opacity" values="0;1;0" dur="1.7s" repeatCount="indefinite"/>
    </rect>
  </g>
</svg>`;
}
