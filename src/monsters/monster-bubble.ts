export interface MonsterOptions {
  size?: number;
}

export function createMonsterBubble(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bubbling, a bubble chibi monster">
  <ellipse cx="100" cy="198" rx="50" ry="9" fill="#38bdf8" opacity="0.25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -4;0 -14;0 -4" dur="2.7s" repeatCount="indefinite"/>
    <circle cx="100" cy="112" r="62" fill="#bae6fd" opacity="0.35"/>
    <circle cx="100" cy="112" r="62" fill="none" stroke="#7dd3fc" stroke-width="3.5"/>
    <ellipse cx="76" cy="78" rx="20" ry="12" fill="#fff" opacity="0.85" transform="rotate(-28 76 78)"/>
    <path d="M64 104 Q70 96 76 104 M124 104 Q118 96 112 104" stroke="#0369a1" stroke-width="5" fill="none" stroke-linecap="round">
      <animate attributeName="d" values="M64 104 Q70 96 76 104;M64 108 Q70 100 76 108;M64 104 Q70 96 76 104" dur="2.2s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="46" cy="120" rx="7" ry="4.5" fill="#f0abfc" opacity=".7"/>
    <ellipse cx="154" cy="120" rx="7" ry="4.5" fill="#f0abfc" opacity=".7"/>
    <path d="M88 128 Q100 138 112 128" stroke="#0369a1" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <g fill="none" stroke="#7dd3fc" stroke-width="2.5">
      <circle cx="42" cy="60" r="8"><animate attributeName="cy" values="60;30;60" dur="2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;.1;.9" dur="2.6s" repeatCount="indefinite"/></circle>
      <circle cx="160" cy="72" r="6"><animate attributeName="cy" values="72;44;72" dur="2.1s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;.1;.8" dur="2.1s" repeatCount="indefinite"/></circle>
      <circle cx="150" cy="34" r="10"><animate attributeName="cy" values="34;16;34" dur="3s" repeatCount="indefinite"/></circle>
    </g>
  </g>
</svg>`;
}
