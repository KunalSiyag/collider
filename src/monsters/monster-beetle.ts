export interface MonsterOptions {
  size?: number;
}

export function createMonsterBeetle(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Boltbeetle, an electric beetle chibi monster">
  <ellipse cx="100" cy="198" rx="56" ry="10" fill="#4d7c0f" opacity=".3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.2s" repeatCount="indefinite"/>
    <path d="M100 44 C112 30 130 26 144 32 C138 46 126 54 112 56 Z" fill="#facc15">
      <animate attributeName="opacity" values="1;.5;1" dur="1.1s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="100" cy="128" rx="52" ry="48" fill="#3f6212"/>
    <path d="M100 84 L146 128 L100 172 L54 128 Z" fill="#65a30d"/>
    <path d="M100 92 C118 108 122 148 100 168 C78 148 82 108 100 92 Z" fill="#a3e635"/>
    <g stroke="#365314" stroke-width="3" stroke-linecap="round">
      <line x1="56" y1="104" x2="38" y2="96"/><line x1="56" y1="128" x2="36" y2="128"/><line x1="58" y1="150" x2="40" y2="158"/>
      <line x1="144" y1="104" x2="162" y2="96"/><line x1="144" y1="128" x2="164" y2="128"/><line x1="142" y1="150" x2="160" y2="158"/>
    </g>
    <circle cx="100" cy="72" r="20" fill="#1a2e05"/>
    <circle cx="93" cy="68" r="5.5" fill="#fef08a"><animate attributeName="opacity" values="1;.35;1" dur="1.4s" repeatCount="indefinite"/></circle>
    <circle cx="107" cy="68" r="5.5" fill="#fef08a"><animate attributeName="opacity" values=".35;1;.35" dur="1.4s" repeatCount="indefinite"/></circle>
    <g stroke="#facc15" stroke-width="3" stroke-linecap="round" fill="none">
      <path d="M88 140 l8 -8 -2 12 12 -10"><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/></path>
      <path d="M60 96 q-10 -4 -8 -16 M140 96 q10 -4 8 -16"><animate attributeName="opacity" values=".9;.3;.9" dur="2s" repeatCount="indefinite"/></path>
    </g>
  </g>
</svg>`;
}
