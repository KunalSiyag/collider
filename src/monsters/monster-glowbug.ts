export interface MonsterOptions {
  size?: number;
}

export function createMonsterGlowbug(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Glowbug, a firefly chibi monster">
  <ellipse cx="100" cy="198" rx="44" ry="8" fill="#facc15" opacity=".2"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -6;0 -18;0 -6" dur="3.1s" repeatCount="indefinite"/>
    <g opacity=".85">
      <ellipse cx="74" cy="92" rx="26" ry="14" fill="#fef08a" opacity=".5" transform="rotate(-32 74 92)">
        <animateTransform attributeName="transform" type="rotate" values="-50 74 92;-16 74 92;-50 74 92" dur="0.22s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="126" cy="92" rx="26" ry="14" fill="#fef08a" opacity=".5" transform="rotate(32 126 92)">
        <animateTransform attributeName="transform" type="rotate" values="50 126 92;16 126 92;50 126 92" dur="0.22s" repeatCount="indefinite"/>
      </ellipse>
    </g>
    <ellipse cx="100" cy="112" rx="30" ry="38" fill="#a16207"/>
    <path d="M100 78 C112 96 114 128 100 146 C86 128 88 96 100 78 Z" fill="#fde047">
      <animate attributeName="opacity" values="1;.45;1" dur="1.9s" repeatCount="indefinite"/>
    </path>
    <circle cx="100" cy="66" r="20" fill="#422006"/>
    <circle cx="92" cy="62" r="6.5" fill="#fff"/><circle cx="108" cy="62" r="6.5" fill="#fff"/>
    <circle cx="93.5" cy="60" r="3" fill="#1c1917"/><circle cx="106.5" cy="60" r="3" fill="#1c1917"/>
    <path d="M90 48 Q84 38 76 36 M110 48 Q116 38 124 36" stroke="#1c1917" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M93 76 Q100 81 107 76" stroke="#fbbf24" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g fill="#fde047"><circle cx="44" cy="70" r="3"><animate attributeName="opacity" values="1;.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
    <circle cx="160" cy="56" r="2.5"><animate attributeName="opacity" values=".3;1;.3" dur="2s" repeatCount="indefinite"/></circle></g>
  </g>
</svg>`;
}
