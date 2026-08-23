export interface ElementalOptions {
  size?: number;
}

export function createElementalGale(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gale elemental">
  <g fill="none" stroke-linecap="round">
    <path d="M40 150 Q100 130 160 150" stroke="#bae6fd" stroke-width="5" opacity="0.5">
      <animate attributeName="d" dur="2.6s" repeatCount="indefinite"
        values="M40 150 Q100 130 160 150;M40 154 Q100 138 160 146;M40 150 Q100 130 160 150" />
    </path>
    <path d="M30 168 Q100 148 170 166" stroke="#7dd3fc" stroke-width="4" opacity="0.4">
      <animate attributeName="d" dur="3.1s" repeatCount="indefinite"
        values="M30 168 Q100 148 170 166;M30 164 Q100 156 170 160;M30 168 Q100 148 170 166" />
    </path>
  </g>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -4; 0 -14; 0 -4" dur="2.8s" repeatCount="indefinite" />
    <path d="M100 44 C134 52 152 78 148 106 C145 128 128 142 108 144 C118 132 120 118 112 108 C104 98 90 96 82 84 C74 72 80 54 100 44 Z" fill="#e0f2fe" />
    <path d="M100 58 C124 66 136 86 133 106 C131 120 121 130 109 133 C116 123 117 113 111 105 C104 96 92 94 85 84 C79 75 84 64 100 58 Z" fill="#ffffff" opacity="0.9" />
    <circle cx="88" cy="88" r="6.5" fill="#0369a1" />
    <circle cx="114" cy="92" r="6.5" fill="#0369a1" />
    <circle cx="90" cy="86" r="2.2" fill="#fff" />
    <circle cx="116" cy="90" r="2.2" fill="#fff" />
    <path d="M94 104 Q102 110 110 103" stroke="#0369a1" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="70" cy="70" rx="16" ry="7" fill="#f0f9ff" opacity="0.9">
      <animate attributeName="cx" values="70;46;70" dur="4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="140" cy="60" rx="13" ry="6" fill="#f0f9ff" opacity="0.8">
      <animate attributeName="cx" values="140;162;140" dur="3.4s" repeatCount="indefinite" />
    </ellipse>
  </g>
</svg>`;
}
