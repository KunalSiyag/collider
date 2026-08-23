export interface QuilloOptions {
  size?: number;
}

export function createQuillo(options: QuilloOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="2.8s" repeatCount="indefinite"/>
    <g stroke-linecap="round" stroke-width="3.4">
      <line x1="30" y1="42" x2="20" y2="30" stroke="#f472b6"/>
      <line x1="42" y1="34" x2="38" y2="20" stroke="#c084fc"/>
      <line x1="56" y1="34" x2="60" y2="20" stroke="#67e8f9"/>
      <line x1="68" y1="44" x2="78" y2="32" stroke="#a3e635"/>
      <line x1="24" y1="58" x2="10" y2="54" stroke="#fbbf24"/>
      <line x1="74" y1="58" x2="88" y2="54" stroke="#fb7185"/>
      <line x1="32" y1="72" x2="22" y2="82" stroke="#93c5fd"/>
      <line x1="64" y1="72" x2="74" y2="82" stroke="#fda4af"/>
    </g>
    <ellipse cx="48" cy="60" rx="21" ry="18" fill="#9a3412"/>
    <ellipse cx="48" cy="66" rx="14" ry="10" fill="#fcd34d"/>
    <circle cx="42" cy="56" r="3.8" fill="#fff"/>
    <circle cx="54" cy="56" r="3.8" fill="#fff"/>
    <circle cx="43" cy="57" r="1.9" fill="#451a03"/>
    <circle cx="55" cy="57" r="1.9" fill="#451a03"/>
    <ellipse cx="48" cy="62" rx="2.4" ry="1.8" fill="#451a03"/>
    <path d="M44 68 Q48 71 52 68" stroke="#78350f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <circle cx="33" cy="63" r="2.4" fill="#fb923c" opacity=".6"/>
    <circle cx="63" cy="63" r="2.4" fill="#fb923c" opacity=".6"/>
  </g>
</svg>`;
}
