export interface ElementalOptions {
  size?: number;
}

export function createElementalRainveil(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const drops = Array.from({ length: 12 }, (_, i) => {
    const x = 24 + ((i * 53) % 152);
    return `<line x1="${x}" y1="${30 + ((i * 23) % 60)}" x2="${x - 4}" y2="${44 + ((i * 23) % 60)}" stroke="#7dd3fc" stroke-width="2.5" stroke-linecap="round">
      <animate attributeName="y1" values="${30 + ((i * 23) % 50)};190;${30 + ((i * 23) % 50)}" dur="${(1 + (i % 4) * 0.3).toFixed(1)}s" begin="${(i * 0.18).toFixed(1)}s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="${44 + ((i * 23) % 50)};204;${44 + ((i * 23) % 50)}" dur="${(1 + (i % 4) * 0.3).toFixed(1)}s" begin="${(i * 0.18).toFixed(1)}s" repeatCount="indefinite"/>
    </line>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rainveil elemental">
  <g>
    <path d="M100 66 C126 72 140 92 138 116 C136 136 120 148 100 148 C80 148 64 136 62 116 C60 92 74 72 100 66 Z" fill="#0c4a6e" opacity=".9"/>
    <path d="M100 72 C118 78 130 94 128 112 C127 124 116 132 104 133 C110 122 108 110 100 104 C92 110 90 122 96 133 C84 132 73 124 72 112 C70 94 82 78 100 72 Z" fill="#38bdf8" opacity=".65"/>
    <circle cx="88" cy="106" r="5.5" fill="#e0f2fe"/><circle cx="112" cy="106" r="5.5" fill="#e0f2fe"/>
    <circle cx="89.5" cy="107.5" r="2.6" fill="#082f49"/><circle cx="113.5" cy="107.5" r="2.6" fill="#082f49"/>
    <path d="M93 120 Q100 126 107 120" stroke="#bae6fd" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    ${drops}
  </g>
</svg>`;
}
