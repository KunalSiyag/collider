export interface CloveroOptions {
  size?: number;
}

export function createClovero(options: CloveroOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="16" ry="3" fill="#000" opacity=".25"/>
  <path d="M46 60 Q44 76 40 86" stroke="#15803d" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M48 44 C40 32 24 36 28 46 C31 54 42 52 48 44 Z" fill="#22c55e"/>
    <path d="M48 44 C56 32 72 36 68 46 C65 54 54 52 48 44 Z" fill="#16a34a"/>
    <path d="M48 44 C36 40 32 54 42 56 C50 57 50 50 48 44 Z" fill="#4ade80"/>
    <path d="M48 44 C60 40 64 54 54 56 C46 57 46 50 48 44 Z" fill="#4ade80"/>
    <circle cx="42" cy="46" r="3.5" fill="#fff"/>
    <circle cx="54" cy="46" r="3.5" fill="#fff"/>
    <circle cx="43" cy="47" r="1.8" fill="#052e16"/>
    <circle cx="55" cy="47" r="1.8" fill="#052e16"/>
    <path d="M45 53 Q48 56 51 53" stroke="#14532d" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </g>
  <path d="M74 24 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" fill="#fef08a">
    <animate attributeName="opacity" values="1;.15;1" dur="1.6s" repeatCount="indefinite"/>
  </path>
  <path d="M20 30 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 Z" fill="#fef08a">
    <animate attributeName="opacity" values=".2;1;.2" dur="2.1s" repeatCount="indefinite"/>
  </path>
</svg>`;
}
