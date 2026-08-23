export interface MonsterOptions {
  size?: number;
}

export function createMonsterTide(options: MonsterOptions = {}): string {
  const { size = 240 } = options;

  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tideling, a water-type chibi monster">
  <ellipse cx="100" cy="196" rx="58" ry="12" fill="#000" opacity="0.3" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="2.1s" repeatCount="indefinite" />
    <path d="M160 148 C184 138 188 116 180 104 C176 120 166 128 154 130 Z" fill="#0284c7" />
    <path d="M168 132 C178 126 179 115 175 109 C172 117 167 122 161 123 Z" fill="#7dd3fc" />
    <path d="M56 66 C40 52 42 34 54 26 C58 44 70 50 82 48 Z" fill="#38bdf8" />
    <path d="M144 66 C160 52 158 34 146 26 C142 44 130 50 118 48 Z" fill="#38bdf8" />
    <path d="M60 62 C52 54 52 44 57 39 C59 49 65 53 72 52 Z" fill="#7dd3fc" />
    <path d="M140 62 C148 54 148 44 143 39 C141 49 135 53 128 52 Z" fill="#7dd3fc" />
    <path d="M100 40 C140 40 165 70 165 112 C165 156 138 180 100 180 C62 180 35 156 35 112 C35 70 60 40 100 40 Z" fill="#38bdf8"/>
    <path d="M100 98 C124 98 140 118 140 136 C140 158 122 170 100 170 C78 170 60 158 60 136 C60 118 76 98 100 98 Z" fill="#e0f2fe" opacity="0.92" />
    <circle cx="72" cy="98" r="14" fill="#ffffff" />
    <circle cx="128" cy="98" r="14" fill="#ffffff" />
    <circle cx="75" cy="101" r="7" fill="#18181b" />
    <circle cx="125" cy="101" r="7" fill="#18181b" />
    <circle cx="72.5" cy="97.5" r="2.8" fill="#ffffff" />
    <circle cx="122.5" cy="97.5" r="2.8" fill="#ffffff" />
    <path d="M92 122 Q100 129 108 122" stroke="#0c4a6e" stroke-width="4" fill="none" stroke-linecap="round" />
    <ellipse cx="52" cy="116" rx="9" ry="5.5" fill="#0ea5e9" opacity="0.5" />
    <ellipse cx="148" cy="116" rx="9" ry="5.5" fill="#0ea5e9" opacity="0.5" />
    <ellipse cx="74" cy="184" rx="16" ry="8" fill="#0369a1" />
    <ellipse cx="126" cy="184" rx="16" ry="8" fill="#0369a1" />
  </g>
</svg>`;
}
