export interface MonsterOptions {
  size?: number;
}

export function createMonsterCactling(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cactling, a cactus chibi monster">
  <ellipse cx="100" cy="198" rx="52" ry="9" fill="#65a30d" opacity="0.3"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-1.5 100 190; 1.5 100 190; -1.5 100 190" dur="3.4s" repeatCount="indefinite"/>
    <rect x="76" y="70" width="48" height="118" rx="22" fill="#16a34a"/>
    <path d="M84 74 L84 180" stroke="#22c55e" stroke-width="8" stroke-linecap="round" opacity=".7"/>
    <path d="M76 108 C58 106 50 96 52 84 C64 86 72 94 76 104 Z" fill="#15803d"/>
    <path d="M124 124 C142 122 150 112 148 100 C136 102 128 110 124 120 Z" fill="#15803d"/>
    <g stroke="#14532d" stroke-width="4" stroke-linecap="round">
      <line x1="88" y1="90" x2="80" y2="86"><animate attributeName="opacity" values="1;.3;1" dur="1.5s" repeatCount="indefinite"/></line>
      <line x1="112" y1="98" x2="120" y2="94"><animate attributeName="opacity" values=".3;1;.3" dur="1.8s" repeatCount="indefinite"/></line>
      <line x1="90" y1="130" x2="82" y2="128"/><line x1="110" y1="146" x2="118" y2="144"/>
      <line x1="100" y1="160" x2="100" y2="168"/>
    </g>
    <circle cx="100" cy="92" r="20" fill="#166534"/>
    <circle cx="93" cy="89" r="4" fill="#d9f99d"/><circle cx="107" cy="89" r="4" fill="#d9f99d"/>
    <circle cx="94.5" cy="87.5" r="1.6" fill="#fff"/><circle cx="108.5" cy="87.5" r="1.6" fill="#fff"/>
    <path d="M93 99 Q100 105 107 99" stroke="#052e16" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <circle cx="66" cy="78" r="9" fill="#f472b6">
      <animateTransform attributeName="transform" type="rotate" values="0 66 78;-14 66 78;0 66 78" dur="2.6s" repeatCount="indefinite"/>
    </circle>
    <circle cx="134" cy="116" r="8" fill="#fb923c"><animate attributeName="r" values="7;9;7" dur="2.2s" repeatCount="indefinite"/></circle>
    <polygon points="140,60 168,54 156,76 172,80 146,96 152,78 138,72" fill="#facc15">
      <animate attributeName="opacity" values="1;.55;1" dur="1.3s" repeatCount="indefinite"/>
    </polygon>
  </g>
</svg>`;
}
