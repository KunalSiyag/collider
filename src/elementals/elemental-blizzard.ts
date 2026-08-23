export interface ElementalOptions {
  size?: number;
}

export function createElementalBlizzard(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const flakes = Array.from({ length: 14 }, (_, i) => {
    const x = 20 + ((i * 61) % 160);
    return `<circle cx="${x}" cy="${40 + ((i * 37) % 140)}" r="${2 + (i % 3)}" fill="#e0f2fe">
      <animate attributeName="cy" values="30;190;30" dur="${(2.4 + (i % 5) * 0.5).toFixed(1)}s" begin="${(i * 0.22).toFixed(1)}s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" values="0 0; ${i % 2 ? 10 : -10}; 0" dur="${(1.8 + (i % 4) * 0.4).toFixed(1)}s" repeatCount="indefinite"/>
    </circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Blizzard elemental">
  <g>
    <path d="M100 60 C130 66 148 88 146 116 C144 142 126 158 100 158 C74 158 56 142 54 116 C52 88 70 66 100 60 Z" fill="#bae6fd" opacity=".9"/>
    <circle cx="100" cy="112" r="26" fill="#f8fafc"/>
    <circle cx="91" cy="108" r="4.5" fill="#0369a1"/><circle cx="109" cy="108" r="4.5" fill="#0369a1"/>
    <path d="M92 120 Q100 127 108 120" stroke="#0369a1" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <g stroke="#7dd3fc" stroke-width="3.5" stroke-linecap="round" fill="none">
      <path d="M28 84 Q44 76 60 86"><animate attributeName="d" values="M28 84 Q44 76 60 86;M28 90 Q44 98 60 88;M28 84 Q44 76 60 86" dur="2.6s" repeatCount="indefinite"/></path>
      <path d="M142 96 Q158 88 174 98"><animate attributeName="d" values="M142 96 Q158 88 174 98;M142 102 Q158 110 174 100;M142 96 Q158 88 174 98" dur="3s" repeatCount="indefinite"/></path>
      <path d="M34 132 Q50 124 64 134"><animate attributeName="d" values="M34 132 Q50 124 64 134;M34 138 Q50 146 64 136;M34 132 Q50 124 64 134" dur="2.9s" begin=".6s" repeatCount="indefinite"/></path>
    </g>
    ${flakes}
  </g>
</svg>`;
}
