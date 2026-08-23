export interface DewoOptions {
  size?: number;
}

export function createDewo(options: DewoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <path d="M12 84 Q48 74 84 84 L84 90 L12 90 Z" fill="#4ade80"/>
  <path d="M60 82 Q70 76 80 78" stroke="#15803d" stroke-width="2" fill="none" stroke-linecap="round"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.3s" repeatCount="indefinite"/>
    <path d="M48 22 C64 38 68 50 62 62 A19 19 0 0 1 34 62 C28 50 32 38 48 22 Z" fill="#7dd3fc" opacity=".85"/>
    <ellipse cx="41" cy="42" rx="5" ry="8" fill="#e0f2fe" opacity=".9" transform="rotate(20 41 42)"/>
    <circle cx="43" cy="56" r="3.6" fill="#fff"/>
    <circle cx="54" cy="56" r="3.6" fill="#fff"/>
    <circle cx="44" cy="57" r="1.8" fill="#0c4a6e"/>
    <circle cx="55" cy="57" r="1.8" fill="#0c4a6e"/>
    <path d="M45 63 Q48.5 66 52 63" stroke="#0369a1" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="60" rx="2.6" ry="1.7" fill="#67e8f9" opacity=".8"/>
    <ellipse cx="61" cy="60" rx="2.6" ry="1.7" fill="#67e8f9" opacity=".8"/>
  </g>
  <g opacity=".8">
    <path d="M72 30 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 Z">
      <animate attributeName="fill" values="#f472b6;#fbbf24;#4ade80;#f472b6" dur="4s" repeatCount="indefinite"/>
    </path>
    <animateTransform attributeName="transform" type="rotate" values="0 75 39;360 75 39" dur="10s" repeatCount="indefinite"/>
  </g>
</svg>`;
}
