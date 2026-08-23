export interface MonsterOptions {
  size?: number;
}

export function createMonsterMimicling(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mimicling, a treasure chest chibi monster">
  <ellipse cx="100" cy="198" rx="56" ry="10" fill="#a16207" opacity=".3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.5s" repeatCount="indefinite"/>
    <rect x="48" y="118" width="104" height="58" rx="8" fill="#92400e"/>
    <rect x="54" y="124" width="92" height="46" rx="6" fill="#b45309"/>
    <path d="M48 122 C48 96 68 84 100 84 C132 84 152 96 152 122 L152 130 C136 122 120 118 100 118 C80 118 64 122 48 130 Z" fill="#a16207">
      <animateTransform attributeName="transform" type="rotate" values="-4 48 126;0 48 126;-4 48 126" dur="2.2s" repeatCount="indefinite"/>
    </path>
    <path d="M60 108 Q100 88 140 108 L140 118 Q100 100 60 118 Z" fill="#d97706"/>
    <circle cx="86" cy="106" r="7" fill="#fff"/><circle cx="114" cy="106" r="7" fill="#fff"/>
    <circle cx="88" cy="108" r="3.4" fill="#450a0a"/><circle cx="112" cy="108" r="3.4" fill="#450a0a"/>
    <path d="M74 128 L82 140 L90 128 L98 141 L106 128 L114 141 L122 129 L126 138 L128 146 L72 146 L76 137 Z" fill="#fff">
      <animateTransform attributeName="transform" type="translate" values="0 12;0 2;0 12" dur="2.2s" repeatCount="indefinite"/>
    </path>
    <rect x="94" y="112" width="12" height="16" rx="3" fill="#facc15"/>
    <g fill="#fef08a"><circle cx="70" cy="70" r="3"><animate attributeName="opacity" values=".2;1;.2" dur="1.5s" repeatCount="indefinite"/></circle>
    <circle cx="132" cy="66" r="2.5"><animate attributeName="opacity" values="1;.2;1" dur="1.9s" repeatCount="indefinite"/></circle></g>
  </g>
</svg>`;
}
