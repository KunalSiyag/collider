export interface IsoGiftOptions {
  size?: number;
}

export function createIsoGift(options: IsoGiftOptions = {}): string {
  const { size = 260 } = options;
  return `<svg width="${size}" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="120" cy="204" rx="90" ry="18" fill="#000" opacity=".3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2.4s" repeatCount="indefinite"/>
    <polygon points="40,130 120,170 120,200 40,160" fill="#dc2626"/>
    <polygon points="200,130 120,170 120,200 200,160" fill="#b91c1c"/>
    <polygon points="40,130 120,90 200,130 120,170" fill="#ef4444"/>
    <polygon points="72,114 152,154 152,172 72,132" fill="#fbbf24"/>
    <polygon points="40,130 80,110 160,150 120,170" fill="#f59e0b" opacity=".85"/>
    <path d="M112 84 C104 68 88 66 82 74 C78 80 86 90 100 92 Z M128 84 C136 68 152 66 158 74 C162 80 154 90 140 92 Z" fill="#fbbf24"/>
    <circle cx="120" cy="92" r="9" fill="#facc15"/>
  </g>
</svg>`;
}
