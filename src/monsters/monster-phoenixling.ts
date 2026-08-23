export interface PhoenixlingOptions {
  size?: number;
}

export function createPhoenixling(options: PhoenixlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="1.6s" repeatCount="indefinite"/>
    <path d="M60 68 Q80 66 86 50 Q74 54 68 62" fill="#f97316">
      <animate attributeName="opacity" values="1;.6;1" dur=".9s" repeatCount="indefinite"/>
    </path>
    <path d="M58 72 Q78 76 88 70 Q76 78 62 78" fill="#fbbf24">
      <animate attributeName="opacity" values=".6;1;.6" dur="1.1s" repeatCount="indefinite"/>
    </path>
    <path d="M30 52 Q14 46 12 32 Q26 40 34 46 Z" fill="#f97316">
      <animateTransform attributeName="transform" type="rotate" values="0 32 50;-20 32 50;0 32 50" dur=".7s" repeatCount="indefinite"/>
    </path>
    <path d="M66 52 Q82 46 84 32 Q70 40 62 46 Z" fill="#f97316">
      <animateTransform attributeName="transform" type="rotate" values="0 64 50;20 64 50;0 64 50" dur=".7s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="48" cy="60" rx="16" ry="15" fill="#fb923c"/>
    <circle cx="48" cy="42" r="15" fill="#fdba74"/>
    <path d="M36 32 L32 20 L42 27 L48 16 L54 27 L64 20 L60 32 Z" fill="#ef4444"/>
    <path d="M44 46 L52 46 L48 52 Z" fill="#ea580c"/>
    <circle cx="42" cy="41" r="3.4" fill="#fff"/>
    <circle cx="54" cy="41" r="3.4" fill="#fff"/>
    <circle cx="43" cy="42" r="1.7" fill="#7c2d12"/>
    <circle cx="55" cy="42" r="1.7" fill="#7c2d12"/>
    <ellipse cx="35" cy="47" rx="2.6" ry="1.7" fill="#f87171" opacity=".7"/>
    <ellipse cx="61" cy="47" rx="2.6" ry="1.7" fill="#f87171" opacity=".7"/>
    <path d="M42 80 L38 86 M54 80 L58 86" stroke="#ea580c" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`;
}
