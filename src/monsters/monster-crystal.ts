export interface MonsterOptions {
  size?: number;
}

export function createMonsterCrystal(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Crystaling, a crystal chibi monster">
  <ellipse cx="100" cy="198" rx="54" ry="10" fill="#0891b2" opacity="0.3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -4;0 -12;0 -4" dur="2.8s" repeatCount="indefinite"/>
    <path d="M64 60 L84 34 L100 58 L116 32 L138 62 C150 80 152 104 144 124 L56 124 C48 104 50 78 64 60 Z" fill="#67e8f9" opacity=".95"/>
    <path d="M84 34 L100 58 L88 96 L70 70 Z" fill="#cffafe"/>
    <path d="M116 32 L100 58 L112 98 L130 66 Z" fill="#22d3ee" opacity=".85"/>
    <circle cx="82" cy="102" r="8" fill="#164e63"/><circle cx="118" cy="102" r="8" fill="#164e63"/>
    <circle cx="79.5" cy="99.5" r="2.6" fill="#a5f3fc"/><circle cx="115.5" cy="99.5" r="2.6" fill="#a5f3fc"/>
    <path d="M90 118 Q100 125 110 118" stroke="#155e75" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g stroke="#a5f3fc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40 60 l6 -2 m-6 2 l2 -6"><animate attributeName="opacity" values="1;.2;1" dur="1.7s" repeatCount="indefinite"/></path>
      <path d="M160 52 l6 -2 m-6 2 l2 -6"><animate attributeName="opacity" values=".2;1;.2" dur="2.1s" repeatCount="indefinite"/></path>
      <path d="M46 150 l5 3 m-5 -3 l-1 6"><animate attributeName="opacity" values="1;.25;1" dur="1.9s" begin=".4s" repeatCount="indefinite"/></path>
    </g>
  </g>
</svg>`;
}
