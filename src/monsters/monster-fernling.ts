export interface FernlingOptions {
  size?: number;
}

export function createFernling(options: FernlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="3.8s" repeatCount="indefinite"/>
    <path d="M48 84 Q46 56 50 26" stroke="#15803d" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g fill="#22c55e">
      <path d="M49 30 Q60 26 64 32 Q56 38 49 34 Z"><animate attributeName="opacity" values=".5;1;.5" dur="2.6s" repeatCount="indefinite"/></path>
      <path d="M48 40 Q36 34 32 42 Q40 48 48 44 Z"/>
      <path d="M49 48 Q62 44 66 52 Q57 58 49 52 Z"/>
      <path d="M47 56 Q35 52 31 60 Q40 65 47 60 Z"/>
      <path d="M48 64 Q59 61 62 68 Q54 72 48 68 Z"/>
      <path d="M48 72 Q39 69 36 75 Q43 79 48 76 Z"/>
    </g>
    <circle cx="48" cy="46" r="11" fill="#4ade80"/>
    <circle cx="45" cy="45" r="2.6" fill="#fff"/>
    <circle cx="52" cy="45" r="2.6" fill="#fff"/>
    <circle cx="45.8" cy="46" r="1.3" fill="#052e16"/>
    <circle cx="52.8" cy="46" r="1.3" fill="#052e16"/>
    <path d="M45 51 Q48 53.5 51 51" stroke="#14532d" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>
  <circle cx="20" cy="30" r="1.4" fill="#bbf7d0" opacity=".8"><animate attributeName="cy" values="34;22" dur="3.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.8;0" dur="3.2s" repeatCount="indefinite"/></circle>
</svg>`;
}
