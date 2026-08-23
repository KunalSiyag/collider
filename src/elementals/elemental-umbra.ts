export interface ElementalOptions {
  size?: number;
}

export function createElementalUmbra(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Umbra elemental">
  <ellipse cx="100" cy="200" rx="50" ry="9" fill="#7c3aed" opacity="0.2" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -6; 0 -18; 0 -6" dur="3.4s" repeatCount="indefinite" />
    <path d="M100 36 C136 36 158 62 156 96 C155 118 146 132 134 140 L142 158 L124 150 L120 166 L104 152 L100 168 L92 150 L78 162 L76 144 L58 152 L68 136 C54 126 44 112 44 94 C42 60 64 36 100 36 Z" fill="#1e1b2e" />
    <path d="M100 48 C126 48 144 68 143 94 C142 110 136 120 128 128 L133 141 L122 135 L119 147 L107 137 L103 149 L97 136 L87 145 L85 131 L74 137 L80 125 C66 116 57 106 57 92 C56 66 74 48 100 48 Z" fill="#312e52" />
    <circle cx="80" cy="90" r="10" fill="#c4b5fd">
      <animate attributeName="r" values="9;11;9" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="120" cy="90" r="10" fill="#c4b5fd">
      <animate attributeName="r" values="11;9;11" dur="2.3s" repeatCount="indefinite" />
    </circle>
    <ellipse cx="82" cy="88" rx="4" ry="5" fill="#12101f" />
    <ellipse cx="118" cy="88" rx="4" ry="5" fill="#12101f" />
    <path d="M88 114 Q100 122 112 114" stroke="#a78bfa" stroke-width="4" fill="none" stroke-linecap="round" />
    <g fill="#8b5cf6">
      <circle cx="40" cy="70" r="4"><animate attributeName="cy" values="70;46;70" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="164" cy="84" r="5"><animate attributeName="cy" values="84;56;84" dur="2.6s" begin="0.7s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" /></circle>
      <circle cx="150" cy="170" r="3.5"><animate attributeName="cy" values="170;148;170" dur="2.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" /></circle>
    </g>
  </g>
</svg>`;
}
