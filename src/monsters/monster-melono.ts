export interface MelonoOptions {
  size?: number;
}

export function createMelono(options: MelonoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="24" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.5s" repeatCount="indefinite"/>
    <path d="M16 62 Q48 96 80 62 L80 58 L16 58 Z" fill="#15803d" transform="translate(0,-14)"/>
    <path d="M18 60 L18 52 Q48 20 78 52 L78 60 Q48 76 18 60 Z" fill="#22c55e" transform="translate(0,-8)"/>
    <path d="M20 58 Q48 30 76 58 L76 66 Q48 82 20 66 Z" fill="#f43f5e"/>
    <g fill="#1e293b">
      <ellipse cx="34" cy="58" rx="2" ry="2.8"/><ellipse cx="50" cy="54" rx="2" ry="2.8"/><ellipse cx="63" cy="60" rx="2" ry="2.8"/>
      <ellipse cx="42" cy="66" rx="2" ry="2.8"/><ellipse cx="57" cy="68" rx="2" ry="2.8"/>
    </g>
    <circle cx="42" cy="52" r="4" fill="#fff"/>
    <circle cx="56" cy="52" r="4" fill="#fff"/>
    <circle cx="43" cy="53" r="2" fill="#111827"/>
    <circle cx="57" cy="53" r="2" fill="#111827"/>
    <path d="M45 60 Q48.5 63 52 60" stroke="#7f1d1d" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="57" rx="2.6" ry="1.7" fill="#fb7185" opacity=".8"/>
    <ellipse cx="64" cy="57" rx="2.6" ry="1.7" fill="#fb7185" opacity=".8"/>
  </g>
  <circle cx="82" cy="20" r="8" fill="#fde047" opacity=".9"/>
  <g stroke="#fde047" stroke-width="2" stroke-linecap="round">
    <line x1="82" y1="4" x2="82" y2="9"/><line x1="94" y1="20" x2="99" y2="20"/><line x1="92" y1="10" x2="95" y2="13"/>
  </g>
</svg>`;
}
