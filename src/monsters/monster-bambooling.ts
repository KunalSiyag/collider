export interface BamboolingOptions {
  size?: number;
}

export function createBambooling(options: BamboolingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-3 48 86;3 48 86;-3 48 86" dur="3.4s" repeatCount="indefinite"/>
    <rect x="38" y="38" width="20" height="50" rx="6" fill="#4ade80"/>
    <rect x="38" y="38" width="20" height="50" rx="6" fill="none" stroke="#166534" stroke-width="1.5" opacity=".4"/>
    <line x1="38" y1="56" x2="58" y2="56" stroke="#166534" stroke-width="2" opacity=".5"/>
    <line x1="38" y1="72" x2="58" y2="72" stroke="#166534" stroke-width="2" opacity=".5"/>
    <path d="M58 44 Q78 34 88 42 Q74 50 58 48 Z" fill="#22c55e">
      <animateTransform attributeName="transform" type="rotate" values="0 58 46;6 58 46;0 58 46" dur="2.6s" repeatCount="indefinite"/>
    </path>
    <path d="M38 50 Q18 40 8 48 Q22 56 38 54 Z" fill="#22c55e">
      <animateTransform attributeName="transform" type="rotate" values="0 38 52;-6 38 52;0 38 52" dur="2.9s" repeatCount="indefinite"/>
    </path>
    <path d="M48 30 Q44 20 50 14 Q54 22 50 30 Z" fill="#4ade80"/>
    <circle cx="43" cy="47" r="3.5" fill="#fff"/>
    <circle cx="53" cy="47" r="3.5" fill="#fff"/>
    <circle cx="44" cy="48" r="1.7" fill="#052e16"/>
    <circle cx="54" cy="48" r="1.7" fill="#052e16"/>
    <path d="M45 54 Q48 57 51 54" stroke="#14532d" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="52.5" r="2" fill="#86efac" opacity=".7"/>
    <circle cx="56" cy="52.5" r="2" fill="#86efac" opacity=".7"/>
  </g>
  <circle cx="80" cy="20" r="1.4" fill="#fef08a"><animate attributeName="opacity" values="1;.2;1" dur="1.8s" repeatCount="indefinite"/></circle>
</svg>`;
}
