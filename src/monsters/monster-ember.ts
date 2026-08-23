export interface MonsterOptions {
  size?: number;
}

export function createMonsterEmber(options: MonsterOptions = {}): string {
  const { size = 240 } = options;

  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Emberling, a fire-type chibi monster">
  <ellipse cx="100" cy="196" rx="58" ry="12" fill="#000" opacity="0.3" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="1.8s" repeatCount="indefinite" />
    <path d="M158 150 C185 142 190 118 182 104 C176 118 168 122 158 124 Z" fill="#f97316" />
    <path d="M170 132 C180 126 180 114 176 108 C173 116 168 119 163 120 Z" fill="#fbbf24" />
    <path d="M62 52 L48 24 L82 42 Z" fill="#fb923c" />
    <path d="M138 52 L152 24 L118 42 Z" fill="#fb923c" />
    <path d="M66 56 L58 38 L80 48 Z" fill="#fdba74" />
    <path d="M134 56 L142 38 L120 48 Z" fill="#fdba74" />
    <path d="M100 40 C140 40 165 70 165 112 C165 156 138 180 100 180 C62 180 35 156 35 112 C35 70 60 40 100 40 Z" fill="#fb923c"/>
    <path d="M100 96 C126 96 142 116 142 136 C142 160 124 170 100 170 C76 170 58 160 58 136 C58 116 74 96 100 96 Z" fill="#ffedd5" opacity="0.9" />
    <circle cx="72" cy="98" r="14" fill="#ffffff" />
    <circle cx="128" cy="98" r="14" fill="#ffffff" />
    <circle cx="75" cy="101" r="7" fill="#18181b" />
    <circle cx="125" cy="101" r="7" fill="#18181b" />
    <circle cx="72.5" cy="97.5" r="2.8" fill="#ffffff" />
    <circle cx="122.5" cy="97.5" r="2.8" fill="#ffffff" />
    <path d="M90 122 Q100 132 110 122" stroke="#7c2d12" stroke-width="4" fill="none" stroke-linecap="round" />
    <ellipse cx="52" cy="116" rx="9" ry="5.5" fill="#f87171" opacity="0.55" />
    <ellipse cx="148" cy="116" rx="9" ry="5.5" fill="#f87171" opacity="0.55" />
    <path d="M100 44 C102 32 112 28 118 30 C114 36 114 42 110 46" fill="#f97316">
      <animateTransform attributeName="transform" type="rotate" values="-4 100 44; 4 100 44; -4 100 44" dur="1.2s" repeatCount="indefinite" />
    </path>
    <ellipse cx="72" cy="184" rx="16" ry="8" fill="#ea580c" />
    <ellipse cx="128" cy="184" rx="16" ry="8" fill="#ea580c" />
  </g>
</svg>`;
}
