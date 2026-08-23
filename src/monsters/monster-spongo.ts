export interface SpongoOptions {
  size?: number;
}

export function createSpongo(options: SpongoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#0ea5e9" opacity=".4"/>
  <g transform-origin="48px 88px">
    <animateTransform attributeName="transform" type="scale" values="1 1;1.06 .94;1 1" dur="2s" repeatCount="indefinite"/>
    <rect x="24" y="34" width="48" height="46" rx="8" fill="#facc15"/>
    <path d="M24 62 L72 62 L72 74 Q72 80 66 80 L30 80 Q24 80 24 74 Z" fill="#a3e635"/>
    <g fill="#eab308">
      <circle cx="34" cy="46" r="3"/><circle cx="52" cy="42" r="2.6"/><circle cx="62" cy="52" r="3.2"/><circle cx="42" cy="56" r="2.4"/>
      <circle cx="56" cy="70" r="2.6"/><circle cx="38" cy="72" r="2.2"/>
    </g>
    <circle cx="41" cy="50" r="4" fill="#fff"/>
    <circle cx="55" cy="50" r="4" fill="#fff"/>
    <circle cx="42" cy="51" r="2" fill="#713f12"/>
    <circle cx="56" cy="51" r="2" fill="#713f12"/>
    <path d="M44 60 Q48 63.5 52 60" stroke="#a16207" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="32" cy="57" rx="2.6" ry="1.7" fill="#fb923c" opacity=".6"/>
    <ellipse cx="64" cy="57" rx="2.6" ry="1.7" fill="#fb923c" opacity=".6"/>
  </g>
  <circle cx="20" cy="40" r="2" fill="#bae6fd"><animate attributeName="cy" values="44;28" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="2.2s" repeatCount="indefinite"/></circle>
  <circle cx="78" cy="46" r="1.6" fill="#bae6fd"><animate attributeName="cy" values="50;34" dur="2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0" dur="2.6s" repeatCount="indefinite"/></circle>
</svg>`;
}
