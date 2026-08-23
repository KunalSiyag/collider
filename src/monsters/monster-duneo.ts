export interface DuneoOptions {
  size?: number;
}

export function createDuneo(options: DuneoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="24" ry="3.5" fill="#d97706" opacity=".5"/>
  <path d="M10 88 Q30 78 48 86 Q66 94 86 84 L86 90 L10 90 Z" fill="#fbbf24" opacity=".5"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.6s" repeatCount="indefinite"/>
    <ellipse cx="48" cy="62" rx="22" ry="16" fill="#eab308"/>
    <path d="M30 54 Q40 46 56 50 Q66 54 64 62 Q52 56 40 60 Q32 62 30 54 Z" fill="#fcd34d"/>
    <circle cx="48" cy="44" r="14" fill="#facc15"/>
    <path d="M38 34 L34 26 L44 30 Z" fill="#a16207"/>
    <path d="M58 34 L62 26 L52 30 Z" fill="#a16207"/>
    <path d="M42 40 Q48 44 54 40 L54 44 Q48 47 42 44 Z" fill="#a16207"/>
    <circle cx="43" cy="45" r="2.8" fill="#fff"/>
    <circle cx="53" cy="45" r="2.8" fill="#fff"/>
    <circle cx="43.8" cy="45.8" r="1.4" fill="#713f12"/>
    <circle cx="53.8" cy="45.8" r="1.4" fill="#713f12"/>
    <path d="M45 51 Q48 53.5 51 51" stroke="#92400e" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <g stroke="#d97706" stroke-width="2.4" stroke-linecap="round">
      <line x1="34" y1="76" x2="30" y2="83"/><line x1="48" y1="78" x2="48" y2="85"/><line x1="62" y1="76" x2="66" y2="83"/>
    </g>
  </g>
  <path d="M20 30 q4 -3 8 0 q-4 2 -8 0" fill="#fcd34d" opacity=".8">
    <animate attributeName="x" values="0;8;0" dur="3.4s" repeatCount="indefinite"/>
  </path>
</svg>`;
}
