export interface ElementalOptions {
  size?: number;
}

export function createElementalVolt(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Volt elemental">
  <ellipse cx="100" cy="198" rx="46" ry="9" fill="#facc15" opacity="0.2" />
  <g>
    <path d="M100 36 L128 78 L112 82 L138 122 L120 124 L142 164 L96 140 L104 168 L74 132 L88 130 L58 96 L84 94 L64 62 Z" fill="#facc15">
      <animate attributeName="opacity" values="1;0.75;1" dur="0.55s" repeatCount="indefinite" />
    </path>
    <path d="M100 52 L118 82 L106 85 L126 116 L110 118 L128 150 L98 132 L104 154 L84 128 L96 125 L72 98 L92 95 L76 68 Z" fill="#fef9c3" />
    <circle cx="84" cy="100" r="8" fill="#18181b" />
    <circle cx="120" cy="100" r="8" fill="#18181b" />
    <circle cx="86.5" cy="97.5" r="2.6" fill="#fef08a" />
    <circle cx="117.5" cy="97.5" r="2.6" fill="#fef08a" />
    <path d="M90 116 L100 123 L110 116" stroke="#713f12" stroke-width="4" fill="none" stroke-linecap="round" />
    <g stroke="#fde047" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M40 70 L54 84 L44 86 L60 102"><animate attributeName="opacity" values="0;1;0" dur="1.3s" repeatCount="indefinite" /></path>
      <path d="M160 60 L146 76 L156 80 L138 94"><animate attributeName="opacity" values="0;1;0" dur="1.7s" begin="0.5s" repeatCount="indefinite" /></path>
      <path d="M48 140 L60 132 L56 144 L72 140"><animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.9s" repeatCount="indefinite" /></path>
      <path d="M152 148 L140 140 L144 152 L130 146"><animate attributeName="opacity" values="0;1;0" dur="1.4s" begin="0.2s" repeatCount="indefinite" /></path>
    </g>
  </g>
</svg>`;
}
