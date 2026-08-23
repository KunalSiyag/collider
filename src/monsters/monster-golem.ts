export interface MonsterOptions {
  size?: number;
}

export function createMonsterGolem(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Golemling, a rock chibi monster">
  <ellipse cx="100" cy="198" rx="60" ry="11" fill="#000" opacity="0.3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2.9s" repeatCount="indefinite"/>
    <path d="M100 44 C134 44 158 68 158 104 L152 150 C148 170 128 180 100 180 C72 180 52 170 48 150 L42 104 C42 68 66 44 100 44 Z" fill="#78716c"/>
    <path d="M100 44 C134 44 158 68 158 104 L120 96 L112 50 Z" fill="#8f8880"/>
    <polygon points="58,86 84,78 90,104 64,112" fill="#57534e"/>
    <polygon points="118,124 146,116 150,138 122,146" fill="#44403c"/>
    <rect x="70" y="92" width="22" height="14" rx="7" fill="#fef08a"><animate attributeName="opacity" values="1;.45;1" dur="2.1s" repeatCount="indefinite"/></rect>
    <rect x="110" y="92" width="22" height="14" rx="7" fill="#fef08a"><animate attributeName="opacity" values=".45;1;.45" dur="2.1s" repeatCount="indefinite"/></rect>
    <circle cx="76" cy="99" r="4" fill="#a16207"/><circle cx="116" cy="99" r="4" fill="#a16207"/>
    <path d="M82 126 Q100 136 118 126" stroke="#292524" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M46 132 L30 140 M154 132 L172 138" stroke="#57534e" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="40" cy="106" rx="10" ry="6" fill="#4d7c0f" transform="rotate(-16 40 106)"/>
    <ellipse cx="160" cy="88" rx="9" ry="5" fill="#4d7c0f" transform="rotate(12 160 88)"/>
  </g>
</svg>`;
}
