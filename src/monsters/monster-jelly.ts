export interface MonsterOptions {
  size?: number;
}

export function createMonsterJelly(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  const tentacles = Array.from({ length: 6 }, (_, i) => {
    const x = 62 + i * 15;
    return `<path d="M${x} 128 C ${x - 6} 148, ${x + 8} 162, ${x} 184" stroke="#67e8f9" stroke-width="4.5" fill="none" stroke-linecap="round">
      <animate attributeName="d" dur="${(1.8 + i * 0.25).toFixed(2)}s" repeatCount="indefinite"
        values="M${x} 128 C ${x - 8} 148, ${x + 10} 164, ${x - 2} 186;M${x} 128 C ${x + 8} 150, ${x - 10} 168, ${x + 3} 190;M${x} 128 C ${x - 8} 148, ${x + 10} 164, ${x - 2} 186"/>
    </path>`;
  }).join('');

  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Jellyling, a jellyfish chibi monster">
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -4;0 -14;0 -4" dur="3s" repeatCount="indefinite"/>
    <path d="M100 40 C138 40 160 68 158 100 C157 116 144 126 126 130 L74 130 C56 126 43 116 42 100 C40 68 62 40 100 40 Z" fill="#a5f3fc" opacity=".92"/>
    <path d="M100 46 C130 46 150 70 149 96 C136 84 118 78 100 78 C82 78 64 84 51 96 C50 70 70 46 100 46 Z" fill="#cffafe"/>
    <circle cx="82" cy="98" r="9" fill="#0e7490"/><circle cx="118" cy="98" r="9" fill="#0e7490"/>
    <circle cx="79.5" cy="95" r="3" fill="#fff"/><circle cx="115.5" cy="95" r="3" fill="#fff"/>
    <path d="M90 114 Q100 121 110 114" stroke="#155e75" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="66" cy="108" rx="6.5" ry="4" fill="#f0abfc" opacity=".75"/><ellipse cx="134" cy="108" rx="6.5" ry="4" fill="#f0abfc" opacity=".75"/>
    ${tentacles}
    <circle cx="36" cy="60" r="5" fill="#cffafe"><animate attributeName="cy" values="60;34;60" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".85;0;.85" dur="2.8s" repeatCount="indefinite"/></circle>
    <circle cx="166" cy="76" r="4"><animate attributeName="cy" values="76;48;76" dur="2.3s" begin=".6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0;.7" dur="2.3s" repeatCount="indefinite"/></circle>
  </g>
</svg>`;
}
