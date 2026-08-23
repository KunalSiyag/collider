export interface GlitchlingOptions {
  size?: number;
}

export function createGlitchling(options: GlitchlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;3 0;-2 0;0 0" keyTimes="0;.3;.6;1" dur="1.1s" repeatCount="indefinite"/>
    <rect x="28" y="34" width="40" height="36" rx="6" fill="#22d3ee">
      <animate attributeName="fill" values="#22d3ee;#a3e635;#22d3ee" dur="2.2s" repeatCount="indefinite"/>
    </rect>
    <rect x="34" y="28" width="28" height="8" fill="#0ea5e9" opacity=".7"/>
    <rect x="30" y="62" width="14" height="5" fill="#0891b2" opacity=".8"/>
    <rect x="50" y="40" width="12" height="4" fill="#ecfeff" opacity=".9">
      <animate attributeName="x" values="50;40;50" dur="1.3s" repeatCount="indefinite"/>
    </rect>
    <rect x="38" y="46" width="6" height="8" fill="#164e63"/>
    <rect x="54" y="46" width="6" height="8" fill="#164e63">
      <animate attributeName="height" values="8;8;3;8" keyTimes="0;.4;.5;.6" dur="2s" repeatCount="indefinite"/>
    </rect>
    <rect x="42" y="58" width="12" height="3" fill="#164e63"/>
    <rect x="24" y="44" width="4" height="6" fill="#f472b6">
      <animate attributeName="y" values="44;52;44" dur=".9s" repeatCount="indefinite"/>
    </rect>
    <rect x="68" y="48" width="4" height="6" fill="#fbbf24">
      <animate attributeName="y" values="52;44;52" dur="1.1s" repeatCount="indefinite"/>
    </rect>
  </g>
  <g font-family="monospace" font-size="6" fill="#67e8f9" opacity=".8">
    <text x="14" y="26">01</text><text x="74" y="30" opacity=".6">10</text><text x="70" y="80" opacity=".5">01</text>
  </g>
</svg>`;
}
