export interface TortoisoOptions {
  size?: number;
}

export function createTortoiso(options: TortoisoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="26" ry="4" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1;0 0" dur="3.8s" repeatCount="indefinite"/>
    <path d="M22 62 A26 24 0 0 1 74 62 L74 66 L22 66 Z" fill="#4d7c0f"/>
    <path d="M28 60 A20 19 0 0 1 68 60" stroke="#65a30d" stroke-width="2.5" fill="none"/>
    <g fill="#3f6212"><circle cx="36" cy="50" r="3"/><circle cx="50" cy="44" r="3.4"/><circle cx="62" cy="52" r="3"/></g>
    <circle cx="50" cy="44" r="1.4" fill="#a3e635"/>
    <circle cx="20" cy="66" r="11" fill="#a16207"/>
    <circle cx="16" cy="63" r="3.2" fill="#fff"/>
    <circle cx="24" cy="63" r="3.2" fill="#fff"/>
    <circle cx="16.8" cy="64" r="1.6" fill="#451a03"/>
    <circle cx="24.8" cy="64" r="1.6" fill="#451a03"/>
    <path d="M17 70 Q20 72.5 23 70" stroke="#451a03" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <g fill="#ca8a04">
      <ellipse cx="34" cy="80" rx="6" ry="3"/><ellipse cx="48" cy="82" rx="6" ry="3"/><ellipse cx="62" cy="80" rx="6" ry="3"/>
    </g>
  </g>
</svg>`;
}
