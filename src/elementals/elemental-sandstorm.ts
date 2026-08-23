export interface ElementalOptions {
  size?: number;
}

export function createElementalSandstorm(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const grains = Array.from({ length: 16 }, (_, i) => {
    const y = 60 + ((i * 29) % 110);
    return `<circle cx="${20 + ((i * 47) % 160)}" cy="${y}" r="${1.5 + (i % 3)}" fill="#eab308">
      <animate attributeName="cx" values="${i % 2 ? -10 : 210};${i % 2 ? 210 : -10};${i % 2 ? -10 : 210}" dur="${(1.6 + (i % 5) * 0.4).toFixed(1)}s" begin="${(i * 0.15).toFixed(1)}s" repeatCount="indefinite"/>
    </circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sandstorm elemental">
  <g>
    <path d="M40 120 Q100 96 160 116 Q130 128 100 124 Q70 132 40 120 Z" fill="#d97706" opacity=".8">
      <animate attributeName="d" values="M40 120 Q100 96 160 116 Q130 128 100 124 Q70 132 40 120 Z;M40 112 Q100 136 160 108 Q130 122 100 118 Q70 140 40 112 Z;M40 120 Q100 96 160 116 Q130 128 100 124 Q70 132 40 120 Z" dur="2.2s" repeatCount="indefinite"/>
    </path>
    <path d="M30 148 Q100 126 170 144 Q135 158 100 152 Q65 162 30 148 Z" fill="#b45309" opacity=".7">
      <animate attributeName="d" values="M30 148 Q100 126 170 144 Q135 158 100 152 Q65 162 30 148 Z;M30 140 Q100 164 170 138 Q135 150 100 146 Q65 168 30 140 Z;M30 148 Q100 126 170 144 Q135 158 100 152 Q65 162 30 148 Z" dur="2.6s" repeatCount="indefinite"/>
    </path>
    <circle cx="100" cy="84" r="24" fill="#fbbf24"/>
    <circle cx="92" cy="80" r="4.5" fill="#78350f"/><circle cx="108" cy="80" r="4.5" fill="#78350f"/>
    <path d="M92 94 Q100 101 108 94" stroke="#78350f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    ${grains}
  </g>
</svg>`;
}
