export interface MonsterOptions {
  size?: number;
}

export function createMonsterAcornling(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Acornling, an acorn chibi monster">
  <ellipse cx="100" cy="198" rx="48" ry="9" fill="#92400e" opacity=".28"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-3 100 120;3 100 120;-3 100 120" dur="2.7s" repeatCount="indefinite"/>
    <path d="M64 96 C64 148 78 178 100 178 C122 178 136 148 136 96 Z" fill="#d1a06a"/>
    <path d="M60 98 C60 66 78 50 100 50 C122 50 140 66 140 98 C140 106 124 112 100 112 C76 112 60 106 60 98 Z" fill="#7c4a21"/>
    <rect x="58" y="92" width="84" height="10" rx="5" fill="#5c3517"/>
    <path d="M100 50 Q104 34 118 30 Q114 44 108 52 Z" fill="#22c55e"/>
    <circle cx="86" cy="132" r="8" fill="#292524"/><circle cx="114" cy="132" r="8" fill="#292524"/>
    <circle cx="88.5" cy="129" r="2.6" fill="#fff"/><circle cx="116.5" cy="129" r="2.6" fill="#fff"/>
    <path d="M90 150 Q100 158 110 150" stroke="#57534e" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="72" cy="144" rx="6" ry="4" fill="#fda4af" opacity=".75"/><ellipse cx="128" cy="144" rx="6" ry="4" fill="#fda4af" opacity=".75"/>
  </g>
</svg>`;
}
