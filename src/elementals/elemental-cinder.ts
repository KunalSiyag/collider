export interface ElementalOptions {
  size?: number;
}

export function createElementalCinder(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const sparks = Array.from({ length: 10 }, (_, i) => {
    const x = 40 + ((i * 37) % 120);
    return `<circle cx="${x}" cy="150" r="${2 + (i % 3)}" fill="${i % 2 ? '#fb923c' : '#fbbf24'}">
      <animate attributeName="cy" values="150;${50 + (i % 4) * 12};150" dur="${(1.8 + (i % 5) * 0.35).toFixed(1)}s" begin="${(i * 0.21).toFixed(1)}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".95;0;.95" dur="${(1.8 + (i % 5) * 0.35).toFixed(1)}s" begin="${(i * 0.21).toFixed(1)}s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" values="0 0;${i % 2 ? 14 : -14};0" dur="${(2 + i % 3).toFixed(1)}s" repeatCount="indefinite"/>
    </circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cinder elemental">
  <g>
    <path d="M100 52 L118 84 L106 88 L128 122 L110 126 L132 160 L88 138 L96 166 L70 134 L84 130 L58 100 L82 98 Z" fill="#7c2d12">
      <animate attributeName="opacity" values="1;.8;1" dur="1.6s" repeatCount="indefinite"/>
    </path>
    <path d="M100 64 L112 88 L102 91 L118 118 L104 121 L120 148 L94 132 L100 152 L82 128 L92 125 L74 102 L90 99 Z" fill="#ea580c"/>
    <circle cx="90" cy="98" r="7.5" fill="#fff"/><circle cx="114" cy="98" r="7.5" fill="#fff"/>
    <circle cx="92.5" cy="100" r="3.6" fill="#431407"/><circle cx="111.5" cy="100" r="3.6" fill="#431407"/>
    <path d="M93 114 Q100 120 107 114" stroke="#fed7aa" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    ${sparks}
  </g>
</svg>`;
}
