export interface MonsterOptions {
  size?: number;
}

export function createMonsterToxic(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Toxiling, a toxic slime chibi monster">
  <ellipse cx="100" cy="198" rx="58" ry="11" fill="#65a30d" opacity="0.3"/>
  <defs><clipPath id="tox-body"><path d="M100 42 C140 42 164 72 164 112 C164 154 138 180 100 180 C62 180 36 154 36 112 C36 72 60 42 100 42 Z"/></clipPath></defs>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -4;0 2;0 -4" dur="2.5s" repeatCount="indefinite"/>
    <path d="M100 42 C140 42 164 72 164 112 C164 154 138 180 100 180 C62 180 36 154 36 112 C36 72 60 42 100 42 Z" fill="#84cc16"/>
    <g clip-path="url(#tox-body)">
      <circle cx="70" cy="150" r="14" fill="#a3e635" opacity=".8"><animate attributeName="cy" values="150;90;150" dur="3.4s" repeatCount="indefinite"/></circle>
      <circle cx="120" cy="160" r="10" fill="#bef264" opacity=".7"><animate attributeName="cy" values="160;110;160" dur="2.9s" begin=".6s" repeatCount="indefinite"/></circle>
      <circle cx="96" cy="170" r="7" fill="#ecfccb" opacity=".6"><animate attributeName="cy" values="170;130;170" dur="2.4s" begin=".3s" repeatCount="indefinite"/></circle>
    </g>
    <circle cx="74" cy="94" r="13" fill="#1a2e05"/>
    <circle cx="126" cy="94" r="13" fill="#1a2e05"/>
    <circle cx="77" cy="91" r="4" fill="#d9f99d"/><circle cx="123" cy="91" r="4" fill="#d9f99d"/>
    <ellipse cx="76" cy="98" rx="4.5" ry="6" fill="#d9f99d"/><ellipse cx="124" cy="98" rx="4.5" ry="6" fill="#d9f99d"/>
    <path d="M88 122 Q94 128 100 122 Q106 116 112 122" stroke="#365314" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M62 52 C66 44 74 42 80 46 M138 52 C134 44 126 42 120 46" stroke="#a3e635" stroke-width="6" stroke-linecap="round" fill="none">
      <animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite"/>
    </path>
    <circle cx="34" cy="64" r="5" fill="#bef264"><animate attributeName="cy" values="64;40;64" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0;.8" dur="2.8s" repeatCount="indefinite"/></circle>
    <circle cx="166" cy="76" r="4"><animate attributeName="cy" values="76;50;76" dur="2.3s" begin=".5s" repeatCount="indefinite"/><animate attributeName="fill" values="#bef264" dur="2.3s" repeatCount="indefinite"/></circle>
  </g>
</svg>`;
}
