export interface ShelmoOptions {
  size?: number;
}

export function createShelmo(options: ShelmoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#fbbf24" opacity=".4"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="2.7s" repeatCount="indefinite"/>
    <path d="M30 70 A22 22 0 0 1 66 62 A18 18 0 0 1 62 76 L34 76 Z" fill="#f59e0b"/>
    <path d="M36 60 A14 14 0 0 1 60 58" stroke="#b45309" stroke-width="2.5" fill="none"/>
    <circle cx="44" cy="52" r="2.6" fill="#b45309"/>
    <circle cx="56" cy="48" r="2.2" fill="#b45309"/>
    <path d="M30 70 L22 74 L28 78 Z" fill="#fbbf24"/>
    <circle cx="26" cy="60" r="8" fill="#fcd34d"/>
    <path d="M22 56 L18 50 L26 54 Z" fill="#fcd34d"/>
    <path d="M30 56 L34 50 L26 54 Z" fill="#fcd34d"/>
    <circle cx="23" cy="60" r="2.4" fill="#fff"/>
    <circle cx="29" cy="60" r="2.4" fill="#fff"/>
    <circle cx="23.6" cy="60.8" r="1.2" fill="#7c2d12"/>
    <circle cx="29.6" cy="60.8" r="1.2" fill="#7c2d12"/>
    <path d="M23 66 Q26 68.5 29 66" stroke="#92400e" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <g stroke="#f59e0b" stroke-width="2.6" stroke-linecap="round">
      <line x1="40" y1="78" x2="38" y2="85"/><line x1="48" y1="79" x2="48" y2="86"/><line x1="56" y1="78" x2="58" y2="85"/>
    </g>
  </g>
</svg>`;
}
