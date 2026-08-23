export interface FrostoOptions {
  size?: number;
}

export function createFrosto(options: FrostoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#bae6fd" opacity=".7"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3.5;0 0" dur="1.9s" repeatCount="indefinite"/>
    <path d="M30 60 Q22 52 26 42 Q30 34 40 36" fill="#a5f3fc" opacity=".7"/>
    <path d="M66 60 Q74 52 70 42 Q66 34 56 36" fill="#a5f3fc" opacity=".7"/>
    <path d="M34 78 Q30 70 36 64 L60 64 Q66 70 62 78 Q54 84 48 84 Q42 84 34 78 Z" fill="#67e8f9"/>
    <circle cx="48" cy="46" r="20" fill="#cffafe"/>
    <g stroke="#22d3ee" stroke-width="1.6" stroke-linecap="round" opacity=".8">
      <line x1="48" y1="30" x2="48" y2="38"/><line x1="34" y1="46" x2="42" y2="46"/><line x1="54" y1="46" x2="62" y2="46"/>
    </g>
    <circle cx="42" cy="47" r="4.2" fill="#fff"/>
    <circle cx="55" cy="47" r="4.2" fill="#fff"/>
    <circle cx="43" cy="48" r="2.1" fill="#155e75"/>
    <circle cx="56" cy="48" r="2.1" fill="#155e75"/>
    <path d="M45 56 Q48 59 51 56" stroke="#0e7490" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="36" cy="53" r="2.2" fill="#a5f3fc"/>
    <circle cx="60" cy="53" r="2.2" fill="#a5f3fc"/>
    <ellipse cx="40" cy="82" rx="5" ry="2.5" fill="#22d3ee"/>
    <ellipse cx="57" cy="82" rx="5" ry="2.5" fill="#22d3ee"/>
  </g>
  <path d="M76 22 l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6 Z" fill="#e0f2fe">
    <animate attributeName="opacity" values="1;.2;1" dur="1.7s" repeatCount="indefinite"/>
  </path>
  <path d="M16 26 l1.2 3 l3 1.2 l-3 1.2 l-1.2 3 l-1.2 -3 l-3 -1.2 l3 -1.2 Z" fill="#e0f2fe">
    <animate attributeName="opacity" values=".2;1;.2" dur="2.3s" repeatCount="indefinite"/>
  </path>
</svg>`;
}
