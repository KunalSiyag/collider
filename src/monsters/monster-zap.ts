export interface MonsterOptions {
  size?: number;
}

export function createMonsterZap(options: MonsterOptions = {}): string {
  const { size = 240 } = options;

  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zapling, an electric-type chibi monster">
  <ellipse cx="100" cy="196" rx="58" ry="12" fill="#000" opacity="0.3" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="1.4s" repeatCount="indefinite" />
    <path d="M156 148 L184 138 L172 152 L192 158 L158 166 Z" fill="#facc15">
      <animate attributeName="opacity" values="1;0.55;1" dur="0.9s" repeatCount="indefinite" />
    </path>
    <path d="M58 54 L40 18 L72 36 L66 20 L92 44 Z" fill="#fde047" stroke="#eab308" stroke-width="2" stroke-linejoin="round" />
    <path d="M142 54 L160 18 L128 36 L134 20 L108 44 Z" fill="#fde047" stroke="#eab308" stroke-width="2" stroke-linejoin="round" />
    <path d="M100 42 C140 42 165 70 165 112 C165 156 138 180 100 180 C62 180 35 156 35 112 C35 70 60 42 100 42 Z" fill="#fde047"/>
    <path d="M100 98 C124 98 140 118 140 136 C140 158 122 170 100 170 C78 170 60 158 60 136 C60 118 76 98 100 98 Z" fill="#fefce8" opacity="0.95" />
    <circle cx="72" cy="96" r="14" fill="#ffffff" />
    <circle cx="128" cy="96" r="14" fill="#ffffff" />
    <circle cx="75" cy="99" r="7" fill="#18181b" />
    <circle cx="125" cy="99" r="7" fill="#18181b" />
    <circle cx="72.5" cy="95.5" r="2.8" fill="#ffffff" />
    <circle cx="122.5" cy="95.5" r="2.8" fill="#ffffff" />
    <path d="M88 120 L94 125 L100 119 L106 125 L112 120" stroke="#713f12" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <g>
      <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1.1s" repeatCount="indefinite" />
      <path d="M46 112 L56 106 L52 116 L62 112" stroke="#eab308" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M154 112 L144 106 L148 116 L138 112" stroke="#eab308" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <ellipse cx="74" cy="184" rx="16" ry="8" fill="#ca8a04" />
    <ellipse cx="126" cy="184" rx="16" ry="8" fill="#ca8a04" />
  </g>
</svg>`;
}
