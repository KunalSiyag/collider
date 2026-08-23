export interface MonsterOptions {
  size?: number;
}

export function createMonsterMothling(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mothling, a fuzzy moth chibi monster">
  <ellipse cx="100" cy="198" rx="50" ry="9" fill="#a78bfa" opacity=".22"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -6;0 -16;0 -6" dur="2.4s" repeatCount="indefinite"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" values="-6 100 110; 6 100 110; -6 100 110" dur="2.8s" repeatCount="indefinite"/>
      <path d="M92 100 C60 66 28 62 20 84 C14 102 40 122 88 118 Z" fill="#c4b5fd">
        <animateTransform attributeName="transform" type="rotate" values="8 96 112; -4 96 112; 8 96 112" dur="1.1s" repeatCount="indefinite"/>
      </path>
      <path d="M108 100 C140 66 172 62 180 84 C186 102 160 122 112 118 Z" fill="#c4b5fd">
        <animateTransform attributeName="transform" type="rotate" values="-8 104 112; 4 104 112; -8 104 112" dur="1.1s" repeatCount="indefinite"/>
      </path>
      <circle cx="48" cy="86" r="7" fill="#7c3aed"/><circle cx="152" cy="86" r="7" fill="#7c3aed"/>
      <circle cx="70" cy="102" r="5" fill="#8b5cf6"/><circle cx="130" cy="102" r="5" fill="#8b5cf6"/>
    </g>
    <ellipse cx="100" cy="108" rx="24" ry="38" fill="#ddd6fe"/>
    <g stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round">
      <line x1="94" y1="80" x2="86" y2="58"><animate attributeName="opacity" values="1;.3;1" dur="1.3s" repeatCount="indefinite"/></line>
      <line x1="106" y1="80" x2="114" y2="58"><animate attributeName="opacity" values=".3;1;.3" dur="1.3s" repeatCount="indefinite"/></line>
    </g>
    <circle cx="87" cy="56" r="4.5" fill="#7c3aed"/><circle cx="113" cy="56" r="4.5" fill="#7c3aed"/>
    <circle cx="90" cy="98" r="7" fill="#1e1b4b"/><circle cx="113" cy="98" r="7" fill="#1e1b4b"/>
    <circle cx="89" cy="95.5" r="2.4" fill="#fff"/><circle cx="115" cy="95.5" r="2.4" fill="#fff"/>
    <ellipse cx="82" cy="116" rx="6" ry="4" fill="#f0abfc" opacity=".85"/>
    <ellipse cx="118" cy="116" rx="6" ry="4" fill="#f0abfc" opacity=".85"/>
    <path d="M94 120 Q100 126 106 120" stroke="#4c1d95" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
