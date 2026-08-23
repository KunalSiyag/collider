export interface MonsterOptions {
  size?: number;
}

export function createMonsterSprout(options: MonsterOptions = {}): string {
  const { size = 240 } = options;

  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sproutling, a grass-type chibi monster">
  <ellipse cx="100" cy="196" rx="58" ry="12" fill="#000" opacity="0.3" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="2.4s" repeatCount="indefinite" />
    <path d="M158 152 C180 148 190 132 186 120 C176 130 166 134 154 134 Z" fill="#16a34a">
      <animateTransform attributeName="transform" type="rotate" values="-3 158 150; 3 158 150; -3 158 150" dur="2.8s" repeatCount="indefinite" />
    </path>
    <circle cx="66" cy="52" r="12" fill="#4ade80" />
    <circle cx="134" cy="52" r="12" fill="#4ade80" />
    <path d="M100 40 C140 40 165 70 165 112 C165 156 138 180 100 180 C62 180 35 156 35 112 C35 70 60 40 100 40 Z" fill="#86efac"/>
    <path d="M100 98 C124 98 140 118 140 136 C140 158 122 170 100 170 C78 170 60 158 60 136 C60 118 76 98 100 98 Z" fill="#ecfccb" opacity="0.92" />
    <circle cx="72" cy="98" r="14" fill="#ffffff" />
    <circle cx="128" cy="98" r="14" fill="#ffffff" />
    <circle cx="75" cy="101" r="7" fill="#14532d" />
    <circle cx="125" cy="101" r="7" fill="#14532d" />
    <circle cx="72.5" cy="97.5" r="2.8" fill="#ffffff" />
    <circle cx="122.5" cy="97.5" r="2.8" fill="#ffffff" />
    <path d="M90 122 Q100 131 110 122" stroke="#166534" stroke-width="4" fill="none" stroke-linecap="round" />
    <ellipse cx="52" cy="116" rx="9" ry="5.5" fill="#f87171" opacity="0.45" />
    <ellipse cx="148" cy="116" rx="9" ry="5.5" fill="#f87171" opacity="0.45" />
    <g>
      <animateTransform attributeName="transform" type="rotate" values="-6 100 42; 6 100 42; -6 100 42" dur="3.2s" repeatCount="indefinite" />
      <path d="M100 44 L100 24" stroke="#16a34a" stroke-width="6" stroke-linecap="round" />
      <path d="M100 30 C88 28 80 20 82 10 C94 10 102 18 100 30 Z" fill="#22c55e" />
      <path d="M100 26 C112 24 120 16 118 6 C106 6 98 14 100 26 Z" fill="#4ade80" />
    </g>
    <ellipse cx="74" cy="184" rx="16" ry="8" fill="#22c55e" />
    <ellipse cx="126" cy="184" rx="16" ry="8" fill="#22c55e" />
  </g>
</svg>`;
}
