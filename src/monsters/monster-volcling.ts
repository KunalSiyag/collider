export interface VolclingOptions {
  size?: number;
}

export function createVolcling(options: VolclingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="24" ry="3.5" fill="#000" opacity=".3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M26 82 L38 46 L58 46 L70 82 Z" fill="#57534e"/>
    <path d="M38 46 L44 62 L50 50 L54 64 L58 46 Z" fill="#f97316">
      <animate attributeName="opacity" values=".9;1;.9" dur="1.4s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="48" cy="45" rx="11" ry="4" fill="#292524"/>
    <path d="M40 44 Q48 36 56 44 Q52 41 48 42 Q44 41 40 44 Z" fill="#fb923c">
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="1.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;.4;1" dur="1.2s" repeatCount="indefinite"/>
    </path>
    <circle cx="42" cy="58" r="4" fill="#fff"/>
    <circle cx="55" cy="58" r="4" fill="#fff"/>
    <circle cx="43" cy="59" r="2" fill="#292524"/>
    <circle cx="56" cy="59" r="2" fill="#292524"/>
    <path d="M45 67 Q48 69.5 51 67" stroke="#292524" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="63" rx="2.6" ry="1.7" fill="#fb923c" opacity=".7"/>
    <ellipse cx="62" cy="63" rx="2.6" ry="1.7" fill="#fb923c" opacity=".7"/>
  </g>
  <rect x="70" y="24" width="3" height="3" fill="#f472b6" transform="rotate(20 71 25)"><animate attributeName="y" values="30;14" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/></rect>
  <rect x="28" y="28" width="3" height="3" fill="#4ade80" transform="rotate(-15 29 29)"><animate attributeName="y" values="32;16" dur="2.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="2.1s" repeatCount="indefinite"/></rect>
  <circle cx="48" cy="20" r="2" fill="#fbbf24"><animate attributeName="cy" values="26;10" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="1.6s" repeatCount="indefinite"/></circle>
</svg>`;
}
