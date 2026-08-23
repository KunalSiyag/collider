export interface PopcorningOptions {
  size?: number;
}

export function createPopcorning(options: PopcorningOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="16" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" keyTimes="0;.4;1" dur="1.2s" repeatCount="indefinite"/>
    <g fill="#fef9c3" stroke="#fde047" stroke-width="1.2">
      <circle cx="38" cy="42" r="8"/><circle cx="56" cy="38" r="9"/><circle cx="50" cy="52" r="9"/><circle cx="36" cy="56" r="7"/>
    </g>
    <circle cx="57" cy="34" r="4" fill="#fff"/>
    <circle cx="42" cy="48" r="4" fill="#fff"/>
    <circle cx="54" cy="48" r="3.4" fill="#fff"/>
    <circle cx="43" cy="49" r="1.8" fill="#713f12"/>
    <circle cx="56" cy="49" r="1.8" fill="#713f12"/>
    <path d="M46 57 Q49 60 52 57" stroke="#a16207" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="54" rx="2.2" ry="1.4" fill="#fb923c" opacity=".7"/>
    <ellipse cx="62" cy="53" rx="2.2" ry="1.4" fill="#fb923c" opacity=".7"/>
  </g>
  <circle cx="20" cy="40" r="3" fill="#fef9c3"><animate attributeName="cy" values="44;24" dur="1.4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="1.4s" repeatCount="indefinite"/></circle>
  <circle cx="76" cy="50" r="2.4" fill="#fef9c3"><animate attributeName="cy" values="54;30" dur="1.7s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="1.7s" repeatCount="indefinite"/></circle>
</svg>`;
}
