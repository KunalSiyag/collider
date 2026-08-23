export interface MonsterOptions {
  size?: number;
}

export function createMonsterFangling(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fangling, a bat chibi monster">
  <ellipse cx="100" cy="196" rx="52" ry="9" fill="#7c3aed" opacity="0.25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -6;0 -16;0 -6" dur="2.3s" repeatCount="indefinite"/>
    <g fill="#581c87">
      <path d="M46 84 C24 70 14 48 20 34 C34 44 44 46 56 44 Z">
        <animateTransform attributeName="transform" type="rotate" values="0 60 80; -12 60 80; 0 60 80" dur="1.4s" repeatCount="indefinite"/>
      </path>
      <path d="M154 84 C176 70 186 48 180 34 C166 44 156 46 144 44 Z">
        <animateTransform attributeName="transform" type="rotate" values="0 140 80; 12 140 80; 0 140 80" dur="1.4s" repeatCount="indefinite"/>
      </path>
    </g>
    <g stroke="#3b0764" stroke-width="2.5" fill="none" opacity=".7">
      <path d="M32 48 L40 62 L50 54 M168 48 L160 62 L150 54"/>
    </g>
    <circle cx="100" cy="104" r="42" fill="#6d28d9"/>
    <path d="M78 74 L72 56 L90 68 Z" fill="#6d28d9"/><path d="M122 74 L128 56 L110 68 Z" fill="#6d28d9"/>
    <circle cx="86" cy="98" r="10" fill="#fde047"><animate attributeName="opacity" values="1;.55;1" dur="1.9s" repeatCount="indefinite"/></circle>
    <circle cx="114" cy="98" r="10" fill="#fde047"><animate attributeName="opacity" values=".55;1;.55" dur="1.9s" repeatCount="indefinite"/></circle>
    <circle cx="88" cy="99" r="4" fill="#1e1b4b"/><circle cx="112" cy="99" r="4" fill="#1e1b4b"/>
    <path d="M92 120 L96 126 L100 120 L104 126 L108 120 L106 132 L94 132 Z" fill="#fff"/>
    <path d="M94 120 Q100 127 106 120" stroke="#fde047" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="76" cy="114" rx="6" ry="4" fill="#c084fc" opacity=".8"/><ellipse cx="124" cy="114" rx="6" ry="4" fill="#c084fc" opacity=".8"/>
  </g>
</svg>`;
}
