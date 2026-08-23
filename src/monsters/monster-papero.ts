export interface PaperoOptions {
  size?: number;
}

export function createPapero(options: PaperoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="16" ry="2.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2s" repeatCount="indefinite"/>
    <path d="M34 52 Q14 44 8 28 Q26 34 38 44 Z" fill="#f472b6">
      <animateTransform attributeName="transform" type="rotate" values="0 36 48;-12 36 48;0 36 48" dur="1.1s" repeatCount="indefinite"/>
    </path>
    <path d="M62 52 Q82 44 88 28 Q70 34 58 44 Z" fill="#ec4899">
      <animateTransform attributeName="transform" type="rotate" values="0 60 48;12 60 48;0 60 48" dur="1.1s" repeatCount="indefinite"/>
    </path>
    <path d="M48 84 L34 52 L48 30 L62 52 Z" fill="#f9a8d4"/>
    <path d="M48 84 L34 52 L48 44 Z" fill="#fbcfe8"/>
    <path d="M48 30 L44 18 L52 22 Z" fill="#ec4899"/>
    <path d="M48 30 L52 20 L56 26 Z" fill="#db2777"/>
    <line x1="48" y1="44" x2="48" y2="84" stroke="#be185d" stroke-width="1" opacity=".6"/>
    <circle cx="45" cy="38" r="2.4" fill="#fff"/>
    <circle cx="51" cy="38" r="2.4" fill="#fff"/>
    <circle cx="45.6" cy="39" r="1.2" fill="#831843"/>
    <circle cx="51.6" cy="39" r="1.2" fill="#831843"/>
    <path d="M46 44 Q48 45.8 50 44" stroke="#9d174d" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  </g>
  <path d="M14 70 q5 -4 10 0 M74 74 q5 -4 10 0" stroke="#fbcfe8" stroke-width="1.6" fill="none" opacity=".7"/>
</svg>`;
}
