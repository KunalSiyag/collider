export interface ZigzagoOptions {
  size?: number;
}

export function createZigzago(options: ZigzagoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="16" ry="3" fill="#fde047" opacity=".4"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;2 -2;-1 1;0 0" dur="1.4s" repeatCount="indefinite"/>
    <path d="M54 16 L30 48 L44 48 L36 80 L66 42 L51 42 L62 16 Z" fill="#facc15" stroke="#eab308" stroke-width="1.6"/>
    <path d="M54 20 L38 44 L50 44" stroke="#fef9c3" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <circle cx="42" cy="40" r="3.6" fill="#fff"/>
    <circle cx="52" cy="40" r="3.6" fill="#fff"/>
    <circle cx="43" cy="41" r="1.8" fill="#713f12"/>
    <circle cx="53" cy="41" r="1.8" fill="#713f12"/>
    <circle cx="42" cy="38" r=".8" fill="#fff"/>
    <circle cx="52" cy="38" r=".8" fill="#fff"/>
    <path d="M44 48 Q47 51 50 48" stroke="#a16207" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="44" rx="2.2" ry="1.5" fill="#fb923c" opacity=".7"/>
    <ellipse cx="59" cy="44" rx="2.2" ry="1.5" fill="#fb923c" opacity=".7"/>
  </g>
  <polyline points="10,30 16,30 16,38 22,38" stroke="#fde047" stroke-width="2" fill="none" opacity=".6">
    <animate attributeName="opacity" values=".6;.1;.6" dur="1.8s" repeatCount="indefinite"/>
  </polyline>
  <polyline points="80,64 74,64 74,72 68,72" stroke="#fde047" stroke-width="2" fill="none" opacity=".5">
    <animate attributeName="opacity" values=".1;.7;.1" dur="2.2s" repeatCount="indefinite"/>
  </polyline>
</svg>`;
}
