export interface ElementalOptions {
  size?: number;
}

export function createElementalQuake(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quake elemental">
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; -2 1; 2 -1; -1 -2; 0 0" dur="0.5s" repeatCount="indefinite"/>
    <path d="M40 150 L60 118 L52 96 L84 108 L100 78 L116 106 L148 94 L140 120 L162 152 Z" fill="#57534e"/>
    <path d="M56 150 L72 128 L66 112 L88 122 L100 100 L114 124 L136 114 L130 132 L146 152 Z" fill="#78716c"/>
    <g stroke="#f97316" stroke-width="4" stroke-linecap="round" fill="none">
      <path d="M74 138 L82 126 L76 116"><animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/></path>
      <path d="M118 142 L110 130 L118 120"><animate attributeName="opacity" values=".3;1;.3" dur="1.6s" repeatCount="indefinite"/></path>
      <path d="M98 148 L102 134"><animate attributeName="opacity" values=".4;1;.4" dur="1.2s" repeatCount="indefinite"/></path>
    </g>
    <circle cx="86" cy="104" r="6" fill="#fef08a"/><circle cx="116" cy="106" r="6" fill="#fef08a"/>
    <circle cx="87" cy="105" r="3" fill="#451a03"/><circle cx="117" cy="107" r="3" fill="#451a03"/>
    <g stroke="#d97706" stroke-linecap="round">
      <line x1="30" y1="170" x2="170" y2="170" stroke-width="5"/>
      <path d="M46 178 L58 172 M92 180 L106 174 M140 179 L154 173" stroke-width="3.5">
        <animate attributeName="transform" attributeType="XML" type="translate" values="0 0;-8 0;8 0;0 0" dur="0.7s" repeatCount="indefinite"/>
      </path>
    </g>
    <g fill="#a8a29e">
      <circle cx="44" cy="164" r="4"><animate attributeName="cy" values="164;156;164" dur="1.1s" repeatCount="indefinite"/></circle>
      <circle cx="158" cy="160" r="5"><animate attributeName="cy" values="160;150;160" dur="1.4s" begin=".3s" repeatCount="indefinite"/></circle>
    </g>
  </g>
</svg>`;
}
