export interface SalamangoOptions {
  size?: number;
}

export function createSalamango(options: SalamangoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="26" ry="3.5" fill="#f97316" opacity=".35"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.5s" repeatCount="indefinite"/>
    <path d="M74 70 Q86 66 88 56 Q78 58 74 64 Z" fill="#f59e0b"/>
    <path d="M20 74 Q10 70 10 60 Q20 64 24 70 Z" fill="#f59e0b"/>
    <ellipse cx="48" cy="70" rx="28" ry="12" fill="#fb923c"/>
    <circle cx="30" cy="60" r="13" fill="#fbbf24"/>
    <circle cx="26" cy="58" r="3.2" fill="#fff"/>
    <circle cx="35" cy="58" r="3.2" fill="#fff"/>
    <circle cx="26.8" cy="59" r="1.6" fill="#7c2d12"/>
    <circle cx="35.8" cy="59" r="1.6" fill="#7c2d12"/>
    <path d="M28 65 Q31 67.5 34 65" stroke="#9a3412" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <g fill="#fde047" opacity=".85">
      <circle cx="52" cy="66" r="2.4"/><circle cx="62" cy="72" r="2.4"/><circle cx="44" cy="74" r="2"/><circle cx="70" cy="66" r="2"/>
    </g>
    <g stroke="#f59e0b" stroke-width="3.4" stroke-linecap="round">
      <line x1="36" y1="80" x2="34" y2="87"/><line x1="60" y1="80" x2="62" y2="87"/>
    </g>
  </g>
</svg>`;
}
