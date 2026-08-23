export interface LeafoOptions {
  size?: number;
}

export function createLeafo(options: LeafoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="16" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;-4 -3;0 -5;4 -3;0 0" dur="4s" repeatCount="indefinite"/>
    <path d="M48 82 C20 66 20 34 48 20 C76 34 76 66 48 82 Z" fill="#f59e0b"/>
    <path d="M48 82 C20 66 20 34 48 20 C48 40 48 60 48 82 Z" fill="#fbbf24"/>
    <path d="M48 78 L48 26" stroke="#b45309" stroke-width="2"/>
    <g stroke="#d97706" stroke-width="1.4" opacity=".8">
      <line x1="48" y1="34" x2="36" y2="40"/><line x1="48" y1="34" x2="60" y2="40"/>
      <line x1="48" y1="46" x2="32" y2="52"/><line x1="48" y1="46" x2="64" y2="52"/>
      <line x1="48" y1="58" x2="36" y2="64"/><line x1="48" y1="58" x2="60" y2="64"/>
    </g>
    <circle cx="43" cy="48" r="3.6" fill="#fff"/>
    <circle cx="54" cy="48" r="3.6" fill="#fff"/>
    <circle cx="44" cy="49" r="1.8" fill="#7c2d12"/>
    <circle cx="55" cy="49" r="1.8" fill="#7c2d12"/>
    <path d="M45 55 Q48 58 51 55" stroke="#92400e" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="37" cy="54" rx="0" r="0" fill="none"/>
    <ellipse cx="37" cy="54" rx="2.4" ry="1.5" fill="#fb923c" opacity=".7"/>
    <ellipse cx="60" cy="54" rx="2.4" ry="1.5" fill="#fb923c" opacity=".7"/>
  </g>
</svg>`;
}
