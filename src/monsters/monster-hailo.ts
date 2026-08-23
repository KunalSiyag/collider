export interface HailoOptions {
  size?: number;
}

export function createHailo(options: HailoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#dbeafe" opacity=".8"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="1.3s" repeatCount="indefinite"/>
    <polygon points="48,20 66,32 72,52 60,72 36,72 24,52 30,32" fill="#bae6fd"/>
    <polygon points="48,20 66,32 52,44 36,40" fill="#e0f2fe"/>
    <polygon points="36,40 52,44 60,72 36,72" fill="#93c5fd"/>
    <line x1="48" y1="20" x2="52" y2="44" stroke="#fff" stroke-width="1.4" opacity=".7"/>
    <circle cx="42" cy="50" r="4" fill="#fff"/>
    <circle cx="56" cy="50" r="4" fill="#fff"/>
    <circle cx="43" cy="51" r="2" fill="#0c4a6e"/>
    <circle cx="57" cy="51" r="2" fill="#0c4a6e"/>
    <path d="M44 60 Q48 63 52 60" stroke="#0369a1" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="57" rx="2.6" ry="1.7" fill="#67e8f9" opacity=".9"/>
    <ellipse cx="63" cy="57" rx="2.6" ry="1.7" fill="#67e8f9" opacity=".9"/>
  </g>
  <circle cx="20" cy="30" r="1.6" fill="#e0f2fe"><animate attributeName="cy" values="26;38" dur="1.3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.8;0" dur="1.3s" repeatCount="indefinite"/></circle>
  <circle cx="76" cy="34" r="1.3" fill="#e0f2fe"><animate attributeName="cy" values="30;42" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.7;0" dur="1.6s" repeatCount="indefinite"/></circle>
</svg>`;
}
